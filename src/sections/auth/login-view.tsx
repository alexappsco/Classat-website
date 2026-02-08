// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';

// import Container from '@mui/material/Container';
// import { Box, Stack, Grid2, Button, Dialog } from '@mui/material';
// import Typography from '@mui/material/Typography';

// import { useSettingsContext } from 'src/components/settings';

// import LoginBYEmailView from './login-with-email';
// import { useTranslations, useLocale } from 'next-intl';
// import LoginDialog from './login-with-email';

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }
// export default function LoginView({ open, onClose }: Props) {
//   const settings = useSettingsContext();
//   const t = useTranslations();
//   const locale = useLocale();
//   const [openDialog, setOpenDialog] = useState(false);



//    const handleClose = () => {

//     onClose();
//   };
//   return (
//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" >


//     <Box
//       sx={{
//         width: '100%',
//         minHeight: '100vh',
//         backgroundColor: 'white',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: 4,
//       }}
//       >
//       <Container maxWidth="lg">
//         <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
//           <Image src="/logo/SLogo.png" alt="logo" width={400} height={80} style={{ margin: '0 auto' }} />
//         </Stack>

//         <Box sx={{ width: '100%', textAlign: 'center' }}>
//           <Grid2 container spacing={4}>
//             <Grid2 size={{ xs: 12, md: 6 }}>
//               <Box
//                 sx={{
//                   bgcolor: 'background.neutral',
//                   borderRadius: 4,
//                   p: 2,
//                   pb: 0,
//                   height: '100%',
//                 }}
//                 >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'end',
//                     zIndex: 1,
//                   }}
//                 >
//                   <Image
//                     src="/logo/onTask_black_Logo.svg"
//                     alt="ON-TASK FIELD SERVICES"
//                     width={120}
//                     height={30}
//                     style={{ objectFit: 'contain', marginBottom: '8px' }}
//                     />
//                 </Box>

//                 <Stack
//                   display="flex"
//                   flexDirection="column"
//                   justifyContent="center"
//                   alignItems="start"
//                   width="100%"
//                   >
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     maxWidth="105px"
//                     width="100%"
//                     >
//                     <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '.60rem' }}>
//                       {t('Pages.Auth.scan_qr_download')}
//                     </Typography>

//                     <Box padding={1} bgcolor="white">
//                       <Image
//                         src="/assets/images/auth/qr-code.png"
//                         alt="QR Code to download app"
//                         width={50}
//                         height={50}
//                         />
//                     </Box>
//                   </Box>
//                 </Stack>

//                 <Box
//                   component="img"
//                   src="/assets/images/auth/worker-login.png"
//                   alt="On-Task Worker"
//                   marginTop={-5}
//                   sx={{
//                     objectFit: 'contain',
//                     objectPosition: 'bottom',
//                     maxWidth: '100%',
//                     height: 'auto',
//                     width: '450px',
//                   }}
//                   />
//               </Box>
//             </Grid2>

//             <Grid2 size={{ xs: 12, md: 6 }} alignContent="center">
//               <Stack spacing={2} sx={{ textAlign: 'center' }}>
//                 <Typography variant="h6" textTransform="capitalize" textAlign="center" sx={{ mb: 2 }}>
//                   {t('Description.mas_sign_in')}
//                 </Typography>

//                 <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />

//                 <Typography variant="caption" mx={0.2} sx={{ textAlign: 'center', mt: 2 }}>
//                   {t('Label.Donot_account')}
//                   {' '}
//                   <Link href="/auth/register" style={{ fontSize: '12px', color: 'blue' }}>
//                     {t('Button.creat_account')}
//                   </Link>
//                 </Typography>
//               </Stack>
//             </Grid2>
//           </Grid2>
//         </Box>
//       </Container>
//     </Box>
//                   </Dialog>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import LoginBYEmailView from './login-with-email';
import { useTranslations } from 'next-intl';
import LoginDialog from './login-with-email';

export default function LoginView() {
  const settings = useSettingsContext();
  const t = useTranslations();

  const [currentTab, setCurrentTab] = useState('by_email');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderHead = (
    <Stack sx={{ mb: 2, mt: 4 }}>
      <Typography variant="h6" textTransform="capitalize" textAlign="center">
        {/* {t('Title.sign_in')} */}
        {t('Description.mas_sign_in')}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'center' }}>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Image src="/logo/SLogo.png" alt="logo" width={400} height={80} />
      </Stack>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '50dvh',
          }}
        >
          {renderHead}
          {/* <LoginDialog /> */}
          <Typography variant="caption" mx={0.2} sx={{ textAlign: 'center', mt: 2 }}>
            {t('Label.Donot_account')}

            <Link href="/auth/register" style={{ fontSize: '12px', color: 'blue' }}>
              {t('Button.creat_account')}
            </Link>
          </Typography>
          {/* <LoginBYPhoneView /> */}
        </Box>
      </Container>
    </Box>
  );
}
