'use client';

import * as Yup from 'yup';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { endpoints } from 'src/utils/axios';
import { getData } from 'src/utils/crud-fetch-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input'; // <--- New Library

import {
  Box,
  Stack,
  Dialog,
  Button,
  TextField,
  Container,
  Typography,
  ToggleButton,
  DialogContent,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { ICONS } from 'src/config-icons';
import { useAuthStore } from 'src/auth/auth-store';
import SelectedMethod from '../selected-method/selectedMethod';
import JwtRegisterDialog from './jwt-register-view';

/* ---------------- TYPES ---------------- */

type FormValues = {
  email: string;
  phone: string;
};

type LoginMeta = {
  channel: 'Email' | 'Phone';
  value: string;
};

/* ---------------- VALIDATION ---------------- */

const schema = Yup.object({
  email: Yup.string().email('Invalid email').default(''),
  phone: Yup.string().default(''),
}).test(
  'email-or-phone',
  'Enter email or phone (not both)',
  (v) => !!(v?.email || v?.phone) && !(v?.email && v?.phone)
);

/* ---------------- STYLED COMPONENTS ---------------- */

const OtpInput = styled('input')(({ theme }) => ({
  width: '100%',
  height: '56px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  direction: 'ltr',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[400]}`,
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '&[type=number]': {
    MozAppearance: 'textfield',
  },
}));

/* ---------------- OTP INPUTS COMPONENT ---------------- */

function OtpVerificationInputs({
  otp,
  setOtp,
  disabled,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
}) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (/[^0-9]/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    },
    [otp, setOtp]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasteData = event.clipboardData
        .getData('text')
        .replace(/\D/g, '')
        .slice(0, 4);

      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pasteData[i] || '';
      }
      setOtp(newOtp);

      const nextIndex = pasteData.length >= 4 ? 3 : pasteData.length;
      inputRefs.current[nextIndex]?.focus();
    },
    [otp, setOtp]
  );

  const handleKeyDown = useCallback(
    (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      if ((event.key === 'Backspace' || event.key === 'Delete') && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  return (
    <Stack direction="row" spacing={1.5} sx={{ my: 1 }} dir="ltr">
      {Array.from({ length: 4 }).map((_, index) => (
        <OtpInput
          key={index}
          type="number"
          inputMode="numeric"
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          disabled={disabled}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
        />
      ))}
    </Stack>
  );
}

/* ---------------- MAIN LOGIN DIALOG ---------------- */

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: Props) {
  const { login, verifyOtp } = useAuthStore();
  const t = useTranslations();

  const { register, handleSubmit, reset, setValue, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      phone: '',
    },
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [loginMeta, setLoginMeta] = useState<LoginMeta | null>(null);
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [openRe, setOpenRe] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPostVerificationSelection, setShowPostVerificationSelection] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return;
    if (secondsLeft <= 0) {
      setIsTimerRunning(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, isTimerRunning]);

  const handleSwitchType = (type: 'email' | 'phone') => {
    setInputType(type);
    setValue('phone', '');
    setValue('email', '');
  };

  const onSubmit = async (data: FormValues) => {
    const isEmail = inputType === 'email';
    const payload: {
      channel: 'Email' | 'Phone';
      value: string;
      role: string;
    } = {
      channel: isEmail ? 'Email' : 'Phone',
      value: isEmail ? data.email!.trim() : data.phone!.replace(/\s/g, ''), // Remove spaces from library formatting
      role: 'Student',
    };

    const res = await login(payload);

    if (res && 'error' in res) {
      alert(res.error || 'Failed to send OTP');
      return;
    }

    setLoginMeta({ channel: payload.channel as 'Email' | 'Phone', value: payload.value });
    setStep(2);
    setSecondsLeft(60);
    setIsTimerRunning(true);
  };

  const handleVerifyOtp = async () => {
    if (!loginMeta || otp.join('').length < 4) return;

    if (!isTimerRunning) {
      alert('انتهى وقت الكود، اضغط إعادة إرسال');
      return;
    }

    const res = await verifyOtp({
      channel: loginMeta.channel,
      value: loginMeta.value,
      otp: otp.join(''),
      role: 'Student',
    });

    if (res && 'error' in res) {
      alert(res.error || 'Invalid OTP');
      return;
    }

    try {
      const profileRes = await getData<any>(endpoints.profile.get);
      if (profileRes.success && profileRes.data) {
        const { learningPreference, educationApproach } = profileRes.data;

        if (learningPreference === 'Courses') {
          window.location.href = '/courses';
        } else if (learningPreference === 'Curricula') {
          if (educationApproach === null) {
            setShowPostVerificationSelection(true);
          } else {
            window.location.href = '/curricula';
          }
        } else {
          window.location.href = '/';
        }
      } else {
        window.location.href = '/';
      }
      if (!showPostVerificationSelection) handleClose();
    } catch (e: any) {
      alert(e.message || 'Failed to fetch profile');
    }
  };

  const handleClose = () => {
    reset();
    setOtp(Array(4).fill(''));
    setStep(1);
    setLoginMeta(null);
    onClose();
  };

  const renderHead = (
    <Stack sx={{ mb: 2, mt: 4 }}>
      <Typography variant="h6" textTransform="capitalize" textAlign="center">
        {t('Description.mas_sign_in')}
      </Typography>
    </Stack>
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <Stack spacing={3} sx={{ alignItems: 'center', mt: 3 }}>
          <Image src="/logo/SLogo.png" alt="logo" width={400} height={80} />
        </Stack>

        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '35dvh', my: 4 }}>
            <DialogContent>
              {step === 1 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
                    {renderHead}

                    <ToggleButtonGroup
                      value={inputType}
                      exclusive
                      onChange={(_, newType) => newType && handleSwitchType(newType)}
                      fullWidth
                      size="small"
                      sx={{ mb: 1 }}
                    >
                      <ToggleButton value="email">{t('Global.Label.email')}</ToggleButton>
                      <ToggleButton value="phone">{t('Global.Label.phone')}</ToggleButton>
                    </ToggleButtonGroup>

                    {inputType === 'email' ? (
                      <TextField
                        label={t('Global.Label.email')}
                        {...register('email')}
                        fullWidth
                        type="email"
                        InputProps={{ endAdornment: ICONS.SocialIcons.gmail }}
                      />
                    ) : (
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiTelInput
                            {...field}
                            fullWidth
                            label={t('Global.Label.phone')}
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
                    )}

                    <Button type="submit" variant="contained" fullWidth color="primary">
                      {t('Pages.Auth.login_submit')}
                    </Button>
                  </Stack>
                  <Stack>
                    <Typography variant="caption" sx={{ textAlign: 'center', mt: 2 }}>
                      {t('Label.Donot_account')}
                      <Button sx={{ fontSize: '12px', color: 'blue' }} onClick={() => setOpenRe(true)}>
                        {t('Button.creat_account')}
                      </Button>
                    </Typography>
                  </Stack>
                </form>
              ) : (
                <Stack spacing={2}>
                  <Typography variant="body2" textAlign="center">
                    {t('Label.we_sent_code')} <b>{loginMeta?.value}</b> {t('Label.please_enter_code')}
                  </Typography>

                  <OtpVerificationInputs otp={otp} setOtp={setOtp} disabled={false} />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleVerifyOtp}
                    disabled={otp.join('').length < 4}
                  >
                    {t('Pages.Auth.verify_otp')}
                  </Button>
                  <Stack>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{ color: secondsLeft > 0 ? 'primary.main' : 'error.main' }}
                    >
                      {secondsLeft > 0
                        ? `${t('Label.check_resend')} ${secondsLeft} ${t('Label.second')} `
                        : t('Label.check_resend')}
                    </Typography>

                    <Typography textAlign="center">
                      <span>{t('Label.donot_code')}</span>
                      <Button
                        variant="text"
                        color="primary"
                        disabled={isTimerRunning}
                        onClick={() => onSubmit({ email: loginMeta?.value || '', phone: loginMeta?.value || '' })}
                      >
                        {t('Label.resend_code')}
                      </Button>
                    </Typography>
                  </Stack>

                  <Button
                    variant="text"
                    onClick={() => {
                      setStep(1);
                      setOtp(Array(4).fill(''));
                    }}
                  >
                    {t('Global.Action.back')}
                  </Button>
                </Stack>
              )}
            </DialogContent>
          </Box>
        </Container>
        <JwtRegisterDialog open={openRe} onClose={() => setOpenRe(false)} />
      </Dialog>

      <SelectedMethod
        open={showPostVerificationSelection}
        onClose={() => {
          setShowPostVerificationSelection(false);
          handleClose();
        }}
        onConfirm={(data) => {
          setShowPostVerificationSelection(false);
          window.location.href = '/curricula';
        }}
      />
    </>
  );
}