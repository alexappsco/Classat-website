 
'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input'; // <--- New Library

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
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints, fetcherAuth } from 'src/utils/axios';
import { Register, RegisterStudent, VerifyLoginOtp, SendLoginOtp } from 'src/actions/auth';
import { useJwtAuth } from 'src/auth/jwt-context';

// ===================== SELECTOR COMPONENT =====================
function LearningPreferenceSelector() {
  const t = useTranslations();

  const { setValue, watch } = useFormContext();
  const selected = watch('learningPreference');

  const options = [
    { value: 'Curricula', label: t('Nav.Curricula') || 'Curricula' },
    { value: 'Courses', label: t('Nav.courses') || 'Courses' },
  ];

  return (
    <Stack spacing={1}>
      <Typography>اختر نوع التعلم</Typography>

      <Stack direction="row" spacing={2}>
        {options.map((opt) => {
          const isActive = selected === opt.value;

          return (
            <Box
              key={opt.value}
              onClick={() => setValue('learningPreference', opt.value, { shouldValidate: true })}
              sx={{
                flex: 1,
                cursor: 'pointer',
                p: 2,
                textAlign: 'center',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: isActive ? 'primary.main' : 'grey.300',
                backgroundColor: isActive ? 'primary.lighter' : '#FAFAFA',
                transition: '0.2s',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              {opt.label}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}


type LoginMeta = {
  channel: 'Email' | 'Phone';
  value: string;
};

// ===================== MAIN COMPONENT =====================
export default function JwtRegisterDialog({ open, onClose }: any) {
  const settings = useSettingsContext();
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  // مرحلة فتح النوافذ
  const [showSelectedMethod, setShowSelectedMethod] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const [confirm, setConfirm] = useState<null | {}>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountryName, setSelectedCountryName] = useState('');


  const [loginMeta, setLoginMeta] = useState<LoginMeta | null>(null);



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
  const [selectedMethodData, setSelectedMethodData] = useState<any>(null);

  const handleMethodConfirm = (data: any) => {
    setSelectedMethodData(data); // حفظ بيانات المنهج المختار
    setShowSelectedMethod(false); // اقفل SelectedMethod
    setShowRegisterDialog(true); // افتح صفحة التسجيل
  };

  const handleCloseAll = () => {
    setShowSelectedMethod(false);
    setShowRegisterDialog(false);
    onClose?.();
  };



  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(t('Global.Validation.full_name_required')),
    email: Yup.string().email(t('Global.Validation.invalid_email')).notRequired(),
    phoneNumber: Yup.string(),
    guardianPhoneNumber: Yup.string().when('learningPreference', {
      is: 'Curricula',
      then: (schema) =>
        schema.required(t('Global.Validation.parent_phone_required')).min(6),
      otherwise: (schema) => schema.notRequired(),
    }),
    countryId: Yup.string().required(t('Global.Validation.country_required')),
    learningPreference: Yup.string().required(t('Global.Validation.learning_preference_required')),
  }
  )
    .test(
      'email-or-phone',
      t('Global.Validation.phone_or_email_required'),
      function (values) {
        if (values?.email || values?.phoneNumber) {
          return true;
        }

        return this.createError({
          path: 'email', // أو 'phoneNumber' أو حتى الاثنين
          message: t('Global.Validation.phone_or_email_required'),
        });
      }
    );


  const defaultValues = useMemo(
    () => ({

      name: '',
      email: '',
      phoneNumber: '',
      guardianPhoneNumber: '',
      countryId: '',
      learningPreference: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const emailValue = methods.watch('email');
  const phoneValue = methods.watch('phoneNumber');


  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const learningPref = methods.watch('learningPreference');




  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getData<any>(endpoints.country.get);


        // نحاول نطلع Array من أي شكل شائع للـ API
        if (res?.success && Array.isArray(res?.data.items)) {
          setCountries(res.data.items);
        } else {
          console.warn('Unexpected countries response format:', res);
          setCountries([]);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  const onSubmit = handleSubmit(async (data) => {
    setConfirm({});
    enqueueSnackbar('OTP opened!', { variant: 'success' });

    // const formatPhoneNumber = (phone: string) => {
    //   if (!phone) return phone; // Return early if phone is undefined/null/empty
    //   if (phone.startsWith('+')) {
    //     return phone; // Already has country code
    //   }
    //   return '+966' + phone;
    // };
    const formatPhoneNumber = (phone: string) => {
      if (!phone) return phone;

      // Remove all spaces from the string
      const cleanPhone = phone.replace(/\s+/g, '');

      if (cleanPhone.startsWith('+')) {
        return cleanPhone; // Already has country code and now no spaces
      }

      // Fallback for logic if '+' is missing
      return '+966' + cleanPhone;
    };

    const registrationPayload: any = {
      name: data.name,
      email: data.email || undefined,
      countryId: data.countryId,
      learningPreference: data.learningPreference,
    };

    if (data.phoneNumber) {
      registrationPayload.phoneNumber = formatPhoneNumber(data.phoneNumber);
    }

    if (data.guardianPhoneNumber) {
      registrationPayload.guardianPhoneNumber = formatPhoneNumber(
        data.guardianPhoneNumber
      );
    }



    const registrationRes = await RegisterStudent(registrationPayload as any);


    if ('error' in registrationRes) {
      alert(`Registration Error: ${registrationRes.error || 'Failed to register'}`);
      setConfirm(null); // Close the OTP dialog
      return;
    }

    // After successful registration, send OTP for verification
    // We'll send OTP to the email or phone that was registered
    const otpPayload = {
      channel: data.email ? 'Email' as const : 'Phone' as const,
      value: data.email ? data.email : data.phoneNumber ? formatPhoneNumber(data.phoneNumber) : '',
      role: 'Student',
    };

    const otpRes = await SendLoginOtp(otpPayload);

    if ('error' in otpRes) {
      alert(`OTP Error: ${otpRes.error || 'Failed to send OTP'}`);
      setConfirm(null); // Close the OTP dialog
      return;
    }

    // Success case - check if response has required fields
    if (!otpRes || !otpRes.channel || !otpRes.value) {
      alert('Invalid response from server');
      setConfirm(null); // Close the OTP dialog
      return;
    }

    // Set the login meta with channel and value from response
    setLoginMeta({ channel: otpRes.channel as 'Email' | 'Phone', value: otpRes.value });


  });

  const { loginWithOtp } = useJwtAuth();


  const [showPostVerificationSelection, setShowPostVerificationSelection] = useState(false);

  const verifyOtp = async (enteredOtp: string) => {
    if (!loginMeta || enteredOtp.length < 4) return;

    try {
      // const res = await VerifyLoginOtp({
      const res = await loginWithOtp({
        channel: loginMeta.channel,
        value: loginMeta.value,
        otp: enteredOtp,
      });

      if ('error' in res) {
        alert(res.error || 'Invalid OTP');
        return;
      }

      // Get the learning preference from the form
      const learningPref = methods.watch('learningPreference');

      if (learningPref === 'Courses') {
        // If user selected Courses, go directly to courses page
        window.location.href = '/courses';
      } else {
        // If user selected Curricula, show the SelectedMethod dialog
        setConfirm(null); // Close the OTP dialog first
        setShowPostVerificationSelection(true); // Show the selection method
      }
    } catch (e: any) {
      alert(e.message || 'Invalid OTP');
    }
  };

  // ======================== RETURN UI =========================

  return (
    <>
      {/* نافذة اختيار المنهج */}
      <SelectedMethod
        open={showSelectedMethod}
        onClose={handleCloseAll}
        onConfirm={(data) => {
          setShowSelectedMethod(false);
          setShowRegisterDialog(true); // فتح نافذة التسجيل بعد التأكيد
        }}
      />

      {/* نافذة تسجيل الحساب */}
      {/* <Dialog maxWidth="sm" fullWidth open={showRegisterDialog} onClose={handleCloseAll}> */}

      <Dialog maxWidth="sm" fullWidth open={showSelectedMethod} onClose={handleCloseAll}>
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

                {/* ====== NEW FIELD HERE ====== */}
                {/* <Stack spacing={2.5}> */}
                <Stack spacing={2.5}>
                  <LearningPreferenceSelector />
                  {learningPref && (
                    <>
                      <RHFTextField
                        name="name"
                        label={t('Label.full_name')}
                        sx={{ bgcolor: '#FAFAFA', borderRadius: '10px' }}
                      />

                      {/* PHONE */}
                      <Stack>
                        <Typography>{t('Label.phone')}</Typography>
                        <Stack direction="row" gap={1}>
                          {/* <RHFTextField
                            name="phoneNumber"
                            inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                            sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}

                          /> */}
                          {/* <RHFTextField
                            name="phoneNumber"
                            inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                            sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}
                            error={!!methods.formState.errors.email}
                            helperText={methods.formState.errors.email?.message}
                          />
                          {/* رقم الهاتف */}
                          {/* <TextField value="966+" disabled sx={{ width: 95 }} /> */}
                          <Controller
                            name="phoneNumber"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                              <MuiTelInput
                                {...field}
                                value={field.value ?? ''}
                                onChange={(newValue) => {
                                  field.onChange(newValue === '' ? undefined : newValue);
                                }}
                                fullWidth
                                label={t('Global.Label.phone')}
                                defaultCountry="AE"
                                disableFormatting // Optional: removes spaces in the UI as the user types
                                preferredCountries={['AE', 'SA', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'IQ']}
                                forceCallingCode
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                // Ensuring LTR for numbers even in RTL languages
                                sx={{ direction: 'ltr' }}
                              />
                            )}
                          />
                        </Stack>
                      </Stack>
                      {errors?.root?.message && (
                        <Typography color="error" variant="caption">
                          {errors.root.message}
                        </Typography>
                      )}

                      {/* Parent PHONE */}
                      {/* <Stack>
                        <Typography>{t('Label.phone_Parent')}</Typography>
                        <Stack direction="row" gap={1}>
                          <RHFTextField
                            name="guardianPhoneNumber"
                            inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                            sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}
                          />
                          <TextField value="+966" disabled sx={{ width: 95 }} />
                        </Stack>
                      </Stack> */}

                      {learningPref === 'Curricula' && (
                        <Stack>
                          <Typography>{t('Label.phone_Parent')}</Typography>
                          {/* <Stack direction="row" gap={1}>
                            <RHFTextField
                              name="guardianPhoneNumber"
                              inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                              sx={{ flex: 1, bgcolor: '#FAFAFA', borderRadius: '10px' }}
                            />
                            رقم الهاتف
                            <TextField value="966+" disabled sx={{ width: 95 }} />
                          </Stack> */}
                          <Controller
                            name="guardianPhoneNumber"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                              <MuiTelInput
                                {...field}
                                value={field.value ?? ''}
                                onChange={(newValue) => {
                                  field.onChange(newValue === '' ? undefined : newValue);
                                }}
                                fullWidth
                                disableFormatting // Optional: removes spaces in the UI as the user types
                                label={t('Global.Label.phone_Parent')}
                                defaultCountry="AE"
                                // Focus on Arab countries at the top
                                preferredCountries={['AE', 'SA', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'IQ']}
                                forceCallingCode
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                // Ensuring LTR for numbers even in RTL languages
                                sx={{ direction: 'ltr' }}
                              />
                            )}
                          />
                        </Stack>
                      )}


                      <RHFTextField
                        name="email"
                        label={t('Label.email')}
                        sx={{ bgcolor: '#FAFAFA', borderRadius: '10px' }}
                      />
                      {errors?.root?.message && (
                        <Typography color="error" variant="caption">
                          {errors.root.message}
                        </Typography>
                      )}

                      {/* <RHFTextField
                    select
                    name="countryId"
                    label={t('Label.country')}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country: any) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </RHFTextField> */}

                      <RHFTextField
                        select
                        name="countryId"
                        label={t('Label.country')}
                        SelectProps={{
                          native: true,
                          onChange: (e: any) => {
                            const selectedId = e.target.value;

                            const country = countries.find(
                              (c) =>
                                String(c.id) === String(selectedId)
                            );

                            setSelectedCountryName(
                              country?.name || ''
                            );

                            // نخزن ID فقط
                            methods.setValue(
                              'countryId',
                              selectedId,
                              {
                                shouldValidate: true,
                              }
                            );
                          },
                        }}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country: any) => (
                          <option
                            key={country.id}
                            value={country.id}
                          >
                            {country.name}
                          </option>
                        ))}
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
                    </>
                  )}
                </Stack>

                {/* </Stack> */}
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
          loginMeta={loginMeta}
          type="register"
          onVerify={verifyOtp}
          learningPreference={methods.watch('learningPreference')}

        />
      )}

      {/* Post-verification selection method for Curricula */}
      <SelectedMethod
        open={showPostVerificationSelection}
        onClose={() => {
          setShowPostVerificationSelection(false);
          handleCloseAll();
        }}
        onConfirm={(data) => {
          setShowPostVerificationSelection(false);
          // Redirect to curricula after selection
          window.location.href = '/curricula';
        }}
      />
    </>
  );
}

