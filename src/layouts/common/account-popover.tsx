// 'use client';
// import { m } from 'framer-motion';
// import { useSnackbar } from 'notistack';
// import { paths } from 'src/routes/paths';
// import { useState, useEffect } from 'react';
// import { useTranslations } from 'next-intl';
// import { useRouter } from 'src/routes/hooks';
// import Iconify from 'src/components/iconify';
// import { endpoints } from 'src/utils/endpoints';
// import { useAuthStore } from 'src/auth/auth-store';
// import { getData } from 'src/utils/crud-fetch-api';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// import { Stack, alpha, Avatar, Button, Divider, IconButton, Typography } from '@mui/material';

// export default function AccountPopover() {
//   const t = useTranslations('');
//   const router = useRouter();
//   const { user, logout } = useAuthStore();
//   const popover = usePopover();
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       // try {
//       setLoading(true);
//       const profileData = await getData<any>(endpoints.auth.viewProf);
//       if (profileData?.data?.image) {
//         setProfileImage(profileData.data.image);
//         // enqueueSnackbar(profileData.data.message, { variant: 'success' });
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchProfileImage();
//   }, [profileImage, enqueueSnackbar]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       enqueueSnackbar(error, { variant: 'error' });
//     }
//   };

//   const handleEdit = () => {
//     popover.onClose();
//     router.push(paths.controlPanel.profile.viewProfileEdit);
//   };

//   return (
//     <>
//       <IconButton
//         component={m.button}
//         whileTap="tap"
//         whileHover="hover"
//         onClick={popover.onOpen}
//         sx={{
//           width: 40,
//           height: 40,
//           background: (theme) => alpha(theme.palette.grey[500], 0.08),
//           ...(popover.open && {
//             background: (theme) =>
//               `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
//           }),
//         }}
//       >
//         <Avatar
//           src={profileImage || user?.image}
//           alt={user?.name}
//           sx={{
//             width: 36,
//             height: 36,
//             border: (theme) => `solid 2px ${theme.palette.background.default}`,
//           }}
//         >
//           {!loading && !profileImage && user?.name?.charAt(0).toUpperCase()}
//         </Avatar>
//       </IconButton>

//       <CustomPopover
//         open={popover.open}
//         onClose={popover.onClose}
//         sx={{
//           width: 250,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: 10,
//           textAlign: 'center',
//         }}
//       >
//         <Stack alignItems="center" spacing={1}>
//           <Avatar
//             src={profileImage || user?.image}
//             alt={user?.name}
//             sx={{ width: 80, height: 80 }}
//           >
//             {!loading && !profileImage && user?.name?.charAt(0).toUpperCase()}
//           </Avatar>

//           <Typography variant="subtitle1" noWrap>
//             {user?.name || 'No Name'}
//           </Typography>

//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//             {user?.email || 'test@senwan.com'}
//           </Typography>
//         </Stack>

//         <Divider sx={{ my: 2 }} />

//         <Stack spacing={1}>
//           <Button
//             fullWidth
//             variant="outlined"
//             color="success"
//             onClick={handleEdit}
//             startIcon={<Iconify icon="eva:edit-2-fill" />}
//             sx={{ justifyContent: 'center', fontWeight: 600 }}
//           >
//             {t('Pages.Notification.status.account_update')}
//           </Button>

//           <Button
//             fullWidth
//             variant="outlined"
//             color="error"
//             onClick={handleLogout}
//             startIcon={<Iconify icon="solar:logout-2-bold-duotone" />}
//             sx={{ justifyContent: 'center', fontWeight: 600 }}
//           >
//             {t('Pages.Notification.status.logout')}
//           </Button>
//         </Stack>
//       </CustomPopover>
//     </>
//   );
// }
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha, Theme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useTranslations } from 'next-intl';
import { getCurrentUser } from 'src/utils/getCurrentUser';
import { paths } from 'src/routes/paths';
<<<<<<< HEAD
import { Button } from '@mui/material';

=======
import Link from 'next/link';
>>>>>>> 1c4e93a5a362196e52c85a54037eec18f2994d26
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = getCurrentUser();
  const router = useRouter();
  const t = useTranslations();

  const { logout } = useAuthContext();

  const popover = usePopover();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     popover.onClose();
  //     router.replace(paths.auth.login);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleLogout = async () => {
    try {
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };
  const OPTIONS = [
    // {
    //   label: t('Nav.main'),
    //   linkTo: '/lisson',
    //   icon:'/favicon/das/!.svg'

    // },
    {
      label: t('Nav.lisson'),
      linkTo: '/lisson',
      icon:'/favicon/das/book.svg'
    },
    {
      label: t('Nav.courses'),
      linkTo: '/courses',
      icon:'/favicon/das/Vector.svg'

    },
    {
      label: t('Nav.upcoming_sessions'),
      linkTo: '/upcoming-sessions',
      icon:'/favicon/das/setting.svg'

    },
    {
      label: t('Nav.mycourses'),
      linkTo: '/mycourses',
      icon:'/favicon/das/book.svg'

    },
    {
      label: t('Pages.ContactUs.title'),
      linkTo: paths.controlPanel.contactUs.list,
      icon:'/favicon/das/call.svg'

    },
    {
      label: t('Pages.Support.title'),
      linkTo: paths.controlPanel.technicalSupport.list,
      icon:'/favicon/das/call.svg'

    },
    {
      label: t('Pages.terms.title'),
      linkTo: '/terms',
      icon:'/favicon/das/!.svg'

    },
    {
      label: t('Nav.privacy-policy'),
      linkTo: '/policy',
      icon:'/favicon/das/!.svg'

    },
    {
      label: t('Nav.setting'),
      linkTo: '/settings',
      icon:'/favicon/das/setting.svg'

    },
  ];
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
          // src={user?.avatar}
          src={'/favicon/studend.jpg'}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme: any) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        
        <Button sx={{ p: 1,display:'flex' }} onClick={() => handleClickItem('/profile')} >

        <Avatar
          // src={user?.avatar}
          src={'/favicon/studend.jpg'}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            mr:1,
            border: (theme: any) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      <Box sx={{justifyItems:'start'}}>
          <Typography variant="subtitle2" noWrap >
            {/* {user?.name} */}
            عبدالله محمد
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user?.email} */}
            abdullah@gmail.com
          </Typography>
        </Box>  
        </Button>
<Divider/>
        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

<<<<<<< HEAD
        <Stack >
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              <span style={{marginLeft:'5px'}}><img src={option.icon} alt=''/></span>{option.label}
            </MenuItem>
          ))}
        </Stack>
=======
        <Stack sx={{ p: 1 }}>
  {OPTIONS.map((option) => (
    <MenuItem
      key={option.label}
      component={Link}
      href={option.linkTo}
      onClick={popover.onClose}
    >
      {option.label}
    </MenuItem>
  ))}
</Stack>

>>>>>>> 1c4e93a5a362196e52c85a54037eec18f2994d26

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
