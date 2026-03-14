// import { m } from 'framer-motion';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
// import { alpha, Theme } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';

// import { useRouter } from 'src/routes/hooks';

// // import { useAuthContext } from 'src/auth/hooks';

// import { varHover } from 'src/components/animate';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// import { useTranslations } from 'next-intl';
// import { getCurrentUser } from 'src/utils/getCurrentUser';
// import { paths } from 'src/routes/paths';
// import { Button } from '@mui/material';
// import { useJwtAuth } from 'src/auth/jwt-context';
// import AcountInfo from 'src/sections/profile/AcountInfo';
// // ----------------------------------------------------------------------

// // ----------------------------------------------------------------------

// export default function AccountPopover() {
//   const user = getCurrentUser();
//   const router = useRouter();
//   const t = useTranslations();

//   const { logout } =useJwtAuth();

//   const popover = usePopover();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       popover.onClose();
//       router.replace(paths.auth.login);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleClickItem = (path: string) => {
//     popover.onClose();
//     router.push(path);
//   };
//   const OPTIONS = [

//     {
//       label: t('Pages.ContactUs.title'),
//       linkTo: paths.controlPanel.contactUs.list,
//       icon:'/favicon/das/call.svg'

//     },
//       {
//       label: 'دوراتي',
//       linkTo: paths.controlPanel.mycourses.list,
//       icon:''

//     },
//      {
//       label: 'دروسي القادمة',
//       linkTo: paths.controlPanel.nextlessons.list,
//       icon:''

//     },

//     {
//       label: t('Pages.Support.title'),
//       linkTo: paths.controlPanel.technicalSupport.list,
//       icon:'/favicon/das/call.svg'

//     },
//     {
//       label: t('Pages.terms.title'),
//       linkTo: '/terms',
//       icon:'/favicon/das/!.svg'

//     },
//     {
//       label: t('Nav.privacy-policy'),
//       linkTo: '/policy',
//       icon:'/favicon/das/!.svg'

//     },
//     {
//       label: t('Nav.setting'),
//       linkTo: '/settings',
//       icon:'/favicon/das/setting.svg'

//     },
//   ];
//   return (
//     <>
//       <IconButton
//         component={m.button}
//         whileTap="tap"
//         whileHover="hover"
//         variants={varHover(1.05)}
//         onClick={popover.onOpen}
//         sx={{
//           width: 40,
//           height: 40,
//           background: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
//           ...(popover.open && {
//             background: (theme: Theme) =>
//               `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
//           }),
//         }}
//       >
//         <Avatar
//           src={'/favicon/studend.jpg'}
//           alt={user?.name}
//           sx={{
//             width: 36,
//             height: 36,
//             border: (theme: any) => `solid 2px ${theme.palette.background.default}`,
//           }}
//         >
//           {user?.name?.charAt(0).toUpperCase()}
//         </Avatar>
//       </IconButton>

//       <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>

//         <Button sx={{ p: 1,display:'flex' }} onClick={() => handleClickItem('/profile')} >
//             <AcountInfo />

//         </Button>

//             <Divider/>
//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Stack >
//           {OPTIONS.map((option) => (
//             <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
//               <span style={{marginLeft:'5px'}}><img src={option.icon} alt=''/></span>{option.label}
//             </MenuItem>
//           ))}
//         </Stack>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <MenuItem
//           onClick={handleLogout}
//           sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
//         >
//           {t('Label.logout')}
//         </MenuItem>
//       </CustomPopover>
//     </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha, Theme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useTranslations } from 'next-intl';
import { getCurrentUser } from 'src/utils/getCurrentUser';
import { paths } from 'src/routes/paths';
import { Button } from '@mui/material';
import { useJwtAuth } from 'src/auth/jwt-context';
import AcountInfo from 'src/sections/profile/AcountInfo';
import { useAuthStore } from 'src/auth/auth-store';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
// ----------------------------------------------------------------------

type StudentProfile = {
  learningPreference: string;
};

// ----------------------------------------------------------------------

export default function AccountPopover() {
  // const user = getCurrentUser();
  const user = getCurrentUser();
  const router = useRouter();
  const t = useTranslations();

  const { logout } = useAuthStore();

  const popover = usePopover();

  const [learningPreference, setLearningPreference] = useState<string | null>(null);

  // ---------------- Fetch Student Profile ----------------

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await getData<StudentProfile>(endpoints.student.get);

        // حل مشكلة unknown بدون تعديل getData
        const student = response.data as StudentProfile;

        setLearningPreference(student.learningPreference);
      } catch (error) {
        console.error('Failed to fetch student profile', error);
      }
    };

    fetchStudentProfile();
  }, []);

  // ---------------- Handlers ----------------

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace(paths.auth.login);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  // ---------------- Build OPTIONS Array ----------------

  const conditionalOptions =
    learningPreference === 'Courses'
      ? [
          {
            label: t('Nav.main'),
            linkTo: paths.controlPanel.mylivecourses,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Nav.mycourse'),
            linkTo: paths.controlPanel.mycourses.list,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Nav.mylive'),
            linkTo: paths.controlPanel.mylivecourses.list,
            icon: '/favicon/das/laptop.svg',
          },
        ]
      : [
          {
            label: t('Nav.main'),
            linkTo: paths.controlPanel.mainCurricula,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Nav.myRecordedLessons'),
            linkTo: paths.controlPanel.Curricula.mycourses,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Nav.nextlessons'),
            linkTo: paths.controlPanel.nextlessons.list,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Nav.mylive'),
            linkTo: paths.controlPanel.myliveSubject.list,
            icon: '/favicon/das/laptop.svg',
          },
          {
            label: t('Label.my_packages'),
            linkTo: paths.controlPanel.Curricula.myPackages,
            icon: '/favicon/das/laptop.svg',
          },
        ];
  const baseOptions = [
    {
      label: t('Pages.ContactUs.title'),
      linkTo: '/contact-us',
      icon: '/favicon/das/call.svg',
    },
    // {
    //   label: t('Pages.Support.title'),
    //   linkTo: paths.controlPanel.technicalSupport.list,
    //   icon: '/favicon/das/call.svg',
    // },
    {
      label: t('Nav.AboutUs'),
      linkTo: '/aboutUs',
      icon: '/favicon/das/!.svg',
    },
    {
      label: t('Pages.terms.title'),
      linkTo: '/terms',
      icon: '/favicon/das/!.svg',
    },
    {
      label: t('Nav.privacy-policy'),
      linkTo: '/policy',
      icon: '/favicon/das/!.svg',
    },
    {
      label: t('Nav.CancellationPolicy'),
      linkTo: '/cancellationPolicy',
      icon: '/favicon/das/!.svg',
    },
    {
      label: t('Nav.setting'),
      linkTo: '/settings',
      icon: '/favicon/das/setting.svg',
    },
  ];

  const OPTIONS = [...conditionalOptions, ...baseOptions];

  if (!learningPreference) return null;

  // ---------------- UI ----------------

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme: Theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={'/favicon/studend.jpg'}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme: any) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Button sx={{ p: 1, display: 'flex' }} onClick={() => handleClickItem('/profile')}>
          <AcountInfo />
        </Button>

        <Divider />
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo as string)}>
              <span style={{ marginLeft: '5px' }}>
                <img src={option.icon} alt="" />
              </span>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          {t('Label.logout')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
