'use client';

import * as yup from 'yup';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { postData } from 'src/utils/crud-fetch-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Alert, Button, Container, Typography, CircularProgress } from '@mui/material';

import OTPInput from './rhf-otp';

interface DialogVerifyProps {
  phone: string;
  onVerifySuccess: (phone: string, otp: string) => Promise<void>;
  onClose: () => void;
}

interface VerifyFormValues {
  otp: string;
}

export default function DialogVerify({ phone, onVerifySuccess, onClose }: DialogVerifyProps) {
  const t = useTranslations();
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const VerifySchema = yup.object().shape({
    otp: yup.string()
      .required(t('Global.Validation.code_required'))
      .length(4, 'الرجاء إدخال 4 أرقام')
      .matches(/^\d+$/, 'الرجاء إدخال أرقام فقط'),
  });

  const methods = useForm<VerifyFormValues>({
    resolver: yupResolver(VerifySchema),
    defaultValues: { otp: '' },
  });

  const { reset, handleSubmit, setValue, watch, trigger, formState: { isSubmitting, errors } } = methods;
  const otpValue = watch('otp') || '';

  // Send OTP on component mount
  useEffect(() => {
    sendUnregisteredOtp();
  }, []);

  const sendUnregisteredOtp = async () => {
    try {
      setErrorMsg('');

      const res = await postData('https://api-staging.isthwath.com/auth/send-new-otp', {
        phoneNumber: phone,
      });

      if (res.success) {
        setOtpSent(true);
        setSuccessMsg('تم إرسال رمز التحقق بنجاح');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.error  || 'فشل إرسال رمز التحقق');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'فشل إرسال رمز التحقق');
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      setIsVerifying(true);
      setErrorMsg('');


      const res = await postData('https://api-staging.isthwath.com/auth/verify-new-phone', {
        phoneNumber: phone,
        otp: otp,
      });

      if (res.success) {
        // Call parent handler for verification success
        await onVerifySuccess(phone, otp);
        setSuccessMsg('تم التحقق بنجاح');
      } else {
        setErrorMsg(res.error  || 'الرمز غير صحيح');
        reset();
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'فشل التحقق من الرمز');
      reset();
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    await verifyOtp(data.otp);
  });

  const handleOtpChange = (otp: string) => {
    setValue('otp', otp, { shouldValidate: true });

    // Auto-submit when 4 digits entered
    if (otp.length === 4) {
      trigger('otp').then(isValid => {
        if (isValid) {
          verifyOtp(otp);
        }
      });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Image
            src="/logo/black_icon.svg"
            alt="شعار المنصة"
            width={120}
            height={80}
            style={{ margin: 'auto' }}
            priority
          />
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: '#575B6E' }}>
          {t('Pages.Auth.verify_otp')}
        </Typography>

        <Typography component="p" variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          لقد أرسلنا رمز التحقق إلى&nbsp;
          <strong>{phone || '966XXXXXXXXX'}</strong>
        </Typography>

        {/* Success Message */}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        )}

        {/* Error Message */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        {/* OTP Sent Status */}
        {otpSent && !successMsg && (
          <Alert severity="info" sx={{ mb: 2 }}>
            تم إرسال رمز التحقق إلى هاتفك
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <Stack spacing={3} alignItems="center">
            {/* OTP Input */}
            <OTPInput
              value={otpValue}
              onChange={handleOtpChange}
              disabled={isVerifying}
              error={!!errors.otp}
              helperText={errors.otp?.message as string}
              inputCount={4}
            />

            {/* Verify Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting || isVerifying || otpValue.length !== 4}
              sx={{
                height: 50,
                borderRadius: 2,
                fontWeight: 'bold',
                bgcolor: '#1A1A1A',
                '&:disabled': { bgcolor: '#ccc' }
              }}
            >
              {isVerifying ? <CircularProgress size={24} color="inherit" /> : 'تأكيد والاستمرار'}
            </Button>

            {/* Removed: Resend OTP Section */}

            {/* Cancel Button */}
            <Button
              onClick={onClose}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 'bold', color: '#666' }}
            >
              إلغاء
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
}