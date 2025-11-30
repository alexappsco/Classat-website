'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Stack,
  IconButton,
  Typography,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations } from 'next-intl';
import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import OtpConfirmDialog from './otp-confirm-dialog';
import Image from 'next/image';
import SelectedMethod from '../selected-method/selectedMethod';
import { primary } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function JwtRegisterDialog({ open, onClose }: any) {
  const settings = useSettingsContext();
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  // مرحلة فتح النوافذ
  const [showSelectedMethod, setShowSelectedMethod] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  // فتح السلكتد ميثود أول ما الـ open يصبح true
  useEffect(() => {
    if (open) {
      setShowSelectedMethod(true); // افتح الصفحة الأولى
      setShowRegisterDialog(false); // اقفل صفحة التسجيل
    } else {
      setShowSelectedMethod(false);
      setShowRegisterDialog(false);
    }
  }, [open]);

  // عند تأكيد اختيار المنهج
  const handleMethodConfirm = (data: any) => {
    setShowSelectedMethod(false); // اقفل SelectedMethod
    setShowRegisterDialog(true); // افتح صفحة التسجيل
  };

  const handleCloseAll = () => {
    setShowSelectedMethod(false);
    setShowRegisterDialog(false);
    onClose?.();
  };

  // ======================== VALIDATION =========================
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('First name required'),
    email: Yup.string().required('Email is required').email('Email must be valid'),
    phone: Yup.string().required('Phone required').min(9).max(9),
    phone_Parent: Yup.string().required('Phone required').min(9).max(9),
    country: Yup.string().required('Country required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      phone_Parent: '',
      country: '',
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

  const [confirm, setConfirm] = useState<null | {}>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    setPhone('+971' + data.phone);
    setEmail(data.email);
    setConfirm({});
    enqueueSnackbar('OTP opened!', { variant: 'success' });
  });

  // ======================== RETURN UI =========================

  return (
    <>
      {/* نافذة اختيار المنهج */}
      <SelectedMethod
        open={showSelectedMethod}
        onClose={handleCloseAll}
        onConfirm={(data) => {
          console.log('اختار الطالب:', data);
          setShowSelectedMethod(false);
          setShowRegisterDialog(true); // فتح نافذة التسجيل بعد التأكيد
        }}
      />

      {/* نافذة تسجيل الحساب */}
      <Dialog maxWidth="sm" fullWidth open={showRegisterDialog} onClose={handleCloseAll}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleCloseAll}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
            <Image src="/favicon/Frame.png" alt="logo" width={160} height={35} />
          </Stack>

          <Container>
            <Box sx={{ minHeight: '40dvh' }}>
              <Typography variant="h6" textAlign="center" fontWeight={700} sx={{ mb: 2 }}>
                {t('Description.mas_sign_in')}
              </Typography>

              <FormProvider methods={methods} onSubmit={onSubmit}>
                {/* FORM */}
                <Stack spacing={2.5}>
                  <RHFTextField
                    name="fullName"
                    label={t('Label.full_name')}
                    sx={{ bgcolor: '#FAFAFA', borderRadius: '10px' }}
                  />

                  {/* PHONE */}
                  <Stack>
                    <Typography>{t('Label.phone')}</Typography>
                    <Stack direction="row" gap={1}>
                      <RHFTextField
                        name="phone"
                        inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                        sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}
                      />
                      <TextField value="+971" disabled sx={{ width: 95 }} />
                    </Stack>
                  </Stack>

                  {/* Parent PHONE */}
                  <Stack>
                    <Typography>{t('Label.phone_Parent')}</Typography>
                    <Stack direction="row" gap={1}>
                      <RHFTextField
                        name="phone_Parent"
                        inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                        sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}
                      />
                      <TextField value="+971" disabled sx={{ width: 95 }} />
                    </Stack>
                  </Stack>

                  <RHFTextField
                    name="email"
                    label={t('Label.email')}
                    sx={{ bgcolor: '#FAFAFA', borderRadius: '10px' }}
                  />

                  <RHFTextField
                    select
                    name="country"
                    label={t('Label.country')}
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="AE">الإمارات</option>
                    <option value="SA">السعودية</option>
                    <option value="EG">مصر</option>
                  </RHFTextField>

                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    loading={isSubmitting}
                    type="submit"
                    sx={{
                      mb: 2,
                      backgroundColor: primary.main,
                      ':hover': { backgroundColor: primary.lighter },
                    }}
                  >
                    {t('Label.create_an_account')}
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>

      {/* OTP */}
      {confirm && (
        <OtpConfirmDialog
          open={!!confirm}
          onClose={() => setConfirm(null)}
          phone={phone}
          email={email}
          type="register"
        />
      )}
    </>
  );
}
