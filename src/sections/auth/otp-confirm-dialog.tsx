import React, { useCallback, useRef, useState } from 'react';
import {
  Dialog,
  Card,
  Stack,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useRouter } from 'next/dist/client/components/navigation';
import { useTranslations } from 'next-intl';
import { VerifyLoginOtp, SendLoginOtp } from 'src/actions/auth';

type LoginMeta = {
  channel:'Phone'| 'Email' ;
  value: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  loginMeta?: LoginMeta | null;
  type: string;
  onVerify?: (otp: string) => void;
  learningPreference?: string;   // 👈 جديد

}




//----------------------------------------





const OtpInput = styled('input')(({ theme }) => ({
  width: '100%',
  margin: '0 5px',
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


function OtpInputs({
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
      const value = event.target.value;
      if (/[^0-9]/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // Auto focus next
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp, setOtp]
  );

  const handleKeyDown = useCallback(
    (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      // Backspace → go to previous
      if (
        (event.key === 'Backspace' || event.key === 'Delete') &&
        !otp[index] &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <OtpInput
          key={index}
          value={otp[index] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
        />
      ))}
    </Box>
  );
}




//----------------------------------------
export default function OtpConfirmDialog({ open, onClose, loginMeta, type, onVerify, learningPreference }: Props) {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const router = useRouter();
  const t = useTranslations();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const verifyOtp = async (enteredOtp: string) => {
    if (!loginMeta || enteredOtp.length < 4) return;

    try {
      const res = await VerifyLoginOtp({
        channel: loginMeta.channel,
        value: loginMeta.value,
        otp: enteredOtp,
      });

      if ('error' in res) {
        alert(res.error || 'Invalid OTP');
        return;
      }

      alert('Login success 🎉');

      const routeMap: Record<string, string> = {
        Curricula: '/curricula',
        Courses: '/courses',
      };

      const target = routeMap[learningPreference || ''];
      if (target) {
        router.push(target);
      }

      onClose();


    } catch (e: any) {
      alert(e.message || 'Invalid OTP');
    }
  };

  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleResendOtp = async () => {
    if (!loginMeta || isResending || resendDisabled) return;

    try {
      setIsResending(true);
      const resendPayload = {
        channel: loginMeta.channel,
        value: loginMeta.value,
        role: 'Student',
      };

      const res = await SendLoginOtp(resendPayload);

      if ('error' in res) {
        alert(`Resend Error: ${res.error}`);
      } else {
        alert('OTP resent successfully!');
        // Disable resend for 60 seconds
        setResendDisabled(true);
        setTimeout(() => setResendDisabled(false), 60000);
      }
    } catch (error) {
      alert('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card sx={{ p: 3 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
          <Typography variant="h5">
            {type === 'register'
              ? t('Label.please_verify_registration')
              : t('Label.please_verify_login')}
          </Typography>
        </Stack>

        <Typography className="text-gray-600 mt-3 text-sm leading-relaxed">
          {t('Label.we_sent_code')}
          <span className="font-semibold">{loginMeta?.value || ''}</span>
          {t('Label.please_enter_code')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
          {/* {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: 20 },
              }}
              className="w-12 h-14"
              style={{ width: '50px' }}
            />
          ))} */}
          <OtpInputs
            otp={otp}
            setOtp={setOtp}
            disabled={false}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: '100%', borderRadius: 2, mb: 3 }}
          onClick={() => {
            const otpValue = otp.join('');
            if (onVerify && otpValue.length === 4) {
              onVerify(otpValue);
            } else {
              // Fallback to navigation if no onVerify provided
              router.push('/curricula');
            }
          }}
        >
          {t('Button.check_code')}
        </Button>

        <Typography sx={{ textAlign: 'center' }}>{t('Label.check_resend')}</Typography>

        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          {t('Label.donot_code')}
          <Link
            onClick={handleResendOtp}
            style={{
              cursor: 'pointer',
              color: resendDisabled ? '#ccc' : '#1976d2',
              pointerEvents: resendDisabled || isResending ? 'none' : 'auto'
            }}
            underline="hover"
          >
            {isResending ? t('Label.resending') : t('Label.resend_code')}
            {resendDisabled && !isResending && ' (60s)'}
          </Link>
        </Typography>
      </Card>
    </Dialog>
  );
}