'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Box, Link, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useTranslations } from 'next-intl';
// ----------------------------------------------------------------------

type FormValues = {
  email?: string;
  phone?: string;
  password: string;
};

export default function LoginBYEmailView() {
  const t = useTranslations();
  const { login } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object()
    .shape({
      email: Yup.string().email('Invalid email').nullable().notRequired(),
      phone: Yup.string().nullable().notRequired(),
      // password: Yup.string().required('Password is required'),
    })
    .test('email-or-phone', 'You must enter either email or phone', (value: any) => {
      // value is the whole object { email, phone, password }
      return !!(value && (value.email || value.phone));
    });

  const methods = useForm<FormValues>({
    // resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      phone: '',
      // password: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // choose identifier: email first if present, otherwise phone
      const identifier = data.email?.trim() ? data.email.trim() : data.phone?.trim();
      if (!identifier) {
        // should not happen because schema enforces one of them
        setErrorMsg('Please enter email or phone');
        return;
      }

      await login(identifier, data.password);
      // if login resolves, provider handles redirect; otherwise show error
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error?.message || 'Login failed');
    }
  });

  const renderForm = (
    <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t('Label.phone')}
        </Typography>
        <RHFTextField
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'ic:round-phone'} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box mb={1}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t('Label.email')}
        </Typography>
        <RHFTextField
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
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
        color="primary"
      >
        {t('Button.sign_in')}
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
