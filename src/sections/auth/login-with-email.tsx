// 'use client';

// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useSnackbar } from 'notistack';
// import { useForm } from 'react-hook-form';

// import { Box, Link, Typography } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';

// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import { useTranslations } from 'next-intl';
// // ----------------------------------------------------------------------

// type FormValues = {
//   email?: string;
//   phone?: string;
//   password: string;
// };

// export default function LoginBYEmailView() {
//   const t = useTranslations();
//   const { login } = useAuthContext();

//   const [errorMsg, setErrorMsg] = useState('');
//   const { enqueueSnackbar } = useSnackbar();

//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo');

//   const password = useBoolean();

//   const LoginSchema = Yup.object()
//     .shape({
//       email: Yup.string().email('Invalid email').nullable().notRequired(),
//       phone: Yup.string().nullable().notRequired(),
//       // password: Yup.string().required('Password is required'),
//     })
//     .test('email-or-phone', 'You must enter either email or phone', (value: any) => {
//       // value is the whole object { email, phone, password }
//       return !!(value && (value.email || value.phone));
//     });

//   const methods = useForm<FormValues>({
//     // resolver: yupResolver(LoginSchema),
//     defaultValues: {
//       email: '',
//       phone: '',
//       // password: '',
//     },
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       // choose identifier: email first if present, otherwise phone
//       const identifier = data.email?.trim() ? data.email.trim() : data.phone?.trim();
//       if (!identifier) {
//         // should not happen because schema enforces one of them
//         setErrorMsg('Please enter email or phone');
//         return;
//       }

//       await login(identifier, data.password);
//       // if login resolves, provider handles redirect; otherwise show error
//     } catch (error: any) {
//       console.error('Login error:', error);
//       setErrorMsg(error?.message || 'Login failed');
//     }
//   });

//   const renderForm = (
//     <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
//       <Box>
//         <Typography variant="body2" sx={{ mb: 1 }}>
//           {t('Label.phone')}
//         </Typography>
//         <RHFTextField
//           name="phone"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon={'ic:round-phone'} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <Box mb={1}>
//         <Typography variant="body2" sx={{ mb: 1 }}>
//           {t('Label.email')}
//         </Typography>
//         <RHFTextField
//           name="email"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon={'ic:round-email'} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         variant="contained"
//         loading={isSubmitting}
//         color="primary"
//       >
//         {t('Button.sign_in')}
//       </LoadingButton>
//     </Stack>
//   );

//   return (
//     <>
//       {!!errorMsg && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {errorMsg}
//         </Alert>
//       )}

//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         {renderForm}
//       </FormProvider>
//     </>
//   );
// }

'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  IconButton,
  InputAdornment,
  Container,
  Link,
  Button,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import JwtRegisterDialog from './jwt-register-view';
import { primary } from 'src/theme/palette';

// ---------------------------------------------------------------

type FormValues = {
  email?: string;
  phone?: string;
};

// ---------------------------------------------------------------

export default function LoginBYEmailDialog({ open, onClose }: any) {
  const t = useTranslations();
  const router = useRouter();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');

  const LoginSchema = Yup.object()
    .shape({
      email: Yup.string().email('Invalid email').nullable().notRequired(),
      phone: Yup.string().nullable().notRequired(),
    })
    .test('email-or-phone', 'You must enter either email or phone', (value: any) => {
      return !!(value && (value.email || value.phone));
    });

  const methods = useForm<FormValues>({
    // resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      phone: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const identifier = data.email?.trim() || data.phone?.trim();

      if (!identifier) {
        setErrorMsg('Please enter email or phone');
        return;
      }

      // await login(identifier, '');

      enqueueSnackbar('تم تسجيل الدخول بنجاح 🎉');

      // ⭐ تحويل الصفحة بعد تسجيل الدخول
      router.push('/lisson'); // ← عدلها لصفحتك المطلوبة

      onClose();
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error?.message || 'Login failed');
    }
  });

  const [openRe, setOpenRe] = useState(false);

  // ------------------------------ FORM UI

  const renderForm = (
    <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
      {/* Phone */}
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t('Label.phone')}
        </Typography>
        <RHFTextField
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Iconify icon={'ic:round-phone'} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Email */}
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t('Label.email')}
        </Typography>
        <RHFTextField
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Iconify icon={'ic:round-email'} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ backgroundColor: primary.main, ':hover': { backgroundColor: primary.lighter } }}
      >
        {t('Button.sign_in')}
      </LoadingButton>
    </Stack>
  );

  // ------------------------------ UI

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', p: '0', pt: '5px' }}>
          {/* {t('Button.sign_in')} */}

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box sx={{ width: '100%', height: '100%' }}>
            {/* Logo */}
            <Stack
              spacing={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Image src="/favicon/Frame.png" alt="logo" width={160} height={35} />
            </Stack>

            <Container>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '40dvh',
                }}
              >
                {/* Title */}
                <Stack sx={{ mb: 2, mt: 4 }}>
                  <Typography variant="h6" textAlign="center">
                    {t('Description.mas_sign_in')}
                  </Typography>
                </Stack>

                {/* FORM */}
                <FormProvider methods={methods} onSubmit={onSubmit}>
                  {renderForm}
                </FormProvider>

                {/* Register link */}
                <Typography variant="caption" mx={0.2} sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                  {t('Label.Donot_account')}

                  <Button
                    // href="/auth/jwt/register"
                    style={{ fontSize: '12px', color: 'blue' }}
                    onClick={() => setOpenRe(true)}
                  >
                    {t('Button.creat_account')}
                  </Button>
                </Typography>
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
      <JwtRegisterDialog open={openRe} onClose={() => setOpenRe(false)} />
    </>
  );
}
