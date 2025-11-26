'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Card, Paper, Container, TextField } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslations } from 'next-intl';

import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import OtpConfirmDialog from './otp-confirm-dialog';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const settings = useSettingsContext();
  const t = useTranslations();
  const [confirm, setConfirm] = useState<null | {}>(null);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const countries = [
    { code: 'AE', name: 'الإمارات' },
    { code: 'SA', name: 'السعودية' },
    { code: 'EG', name: 'مصر' },
    { code: 'KW', name: 'الكويت' },
    { code: 'QA', name: 'قطر' },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required(t('First name required')),
    email: Yup.string()
      .required(t('Email is required'))
      .email(t('Email must be a valid email address')),
    phone: Yup.string()
      .required(t('Phone is required'))
      .min(9, t('Phone number must be 9 digits'))
      .max(9, t('Phone number must be 9 digits')),
    phone_Parent: Yup.string()
      .required(t('Phone is required'))
      .min(9, t('Phone number must be 9 digits'))
      .max(9, t('Phone number must be 9 digits')),
    country: Yup.string().required('Country is required'),

    // domin: Yup.string()
    //   .required(t('Domain is required'))
    //   .matches(/^[a-zA-Z0-9_]+$/, t('Domain can only contain letters, numbers, and underscores')),
  });
  const defaultValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      password: '',
      confirm_password: '',
      key: '+971',
      phone: '',
      phone_Parent: '',
      country: '',

      // domin: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   const user = {
  //     name: data.fullName,
  //     email: data.email,
  //     password: data.password,
  //     phoneNumber: `+966${data.phone}`,
  //     // projectName: data.domin,
  //   };
  //   try {
  //   const res = await Register(user);
  //   if (res) {
  //     setPhone(user?.phoneNumber);
  //     setConfirm({});
  //   }
  //   else {
  //     enqueueSnackbar(typeof res === 'object' && 'error' in res ? res.error : 'Unknown error', {
  //       variant: 'error',
  //     });
  //   }
  //   } catch (erro) {
  //     enqueueSnackbar(`${erro}`, { variant: 'error' });
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    setPhone(`+966${data.phone}`);
    setEmail(`${data.email}`);

    setConfirm({});
    enqueueSnackbar('Temporary: OTP dialog opened', { variant: 'success' });
  });
  const renderHead = (
    <Stack sx={{ my: 1, position: 'relative' }}>
      <Typography variant="h4" textAlign="center">
        {t('Create a new account')}
      </Typography>
      <Typography variant="subtitle2" textAlign="center" color="text.disabled">
        {t('Create your new account, please enter your details')}
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{ mb: 1 }}>
      <RHFTextField name="fullName" label={t('Label.full_name')} />
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 0.2,
          position: 'relative',
        }}
      >
        <TextField name="key" type="text" value="+971" disabled />

        <RHFTextField
          sx={{ width: '100%' }}
          inputProps={{
            maxLength: 9,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          name="phone"
          label={t('Label.phone')}
          type="text"
        />
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 0.2,
          position: 'relative',
        }}
      >
        <TextField name="key" type="text" value="+971" disabled />

        <RHFTextField
          sx={{ width: '100%' }}
          inputProps={{
            maxLength: 9,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          name="phone_Parent"
          label={t('Label.phone_Parent')}
          type="text"
        />
      </Stack>
      <RHFTextField name="email" label={t('Label.email')} />

      <RHFTextField select name="country" label="الدولة" SelectProps={{ native: true }}>
        <option value="" />
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </RHFTextField>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('Create account')}
      </LoadingButton>
    </Stack>
  );

  return (
    <Card sx={{ borderRadius: '0 100px 0 100px', p: 1 }}>
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Logo width={130} height={55.1} />
      </Stack>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minWidth: '100%',
            minHeight: '50dvh',
          }}
        >
          {renderHead}

          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </FormProvider>
          {confirm && (
            <OtpConfirmDialog
              open={!!confirm}
              onClose={() => setConfirm(null)}
              phone={phone}
              email={email}
              type="register"
            />
          )}
        </Box>
      </Container>
      <Paper>
        <Stack
          direction="row"
          width="100%"
          bgcolor={settings?.themeMode === 'light' ? '#FAFAFB' : '#141414db'}
          minHeight="48px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="caption" mx={0.2}>
            {t('Already have an account?')}

            <Link href="/auth/jwt/login" style={{ fontSize: '12px' }}>
              {t('Sign in')}
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Card>
  );
}
