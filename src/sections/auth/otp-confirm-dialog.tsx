// 'use client';

// import CloseIcon from '@mui/icons-material/Close';
// import { Card, Stack, Dialog, IconButton } from '@mui/material';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   phone?: string;
//   type: string;
// }

// export default function OtpConfirmDialog({ open, onClose, phone, type }: Props) {
//   const handleClose = (event: object, reason: string) => {
//     if (reason && reason === 'backdropClick') {
//       return;
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth disableEscapeKeyDown>
//       <Card>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" m={1}>
//           <IconButton onClick={onClose} aria-label="close">
//             <CloseIcon />
//           </IconButton>
//         </Stack>
//       </Card>
//     </Dialog>
//   );
// }

import React, { useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useRouter } from 'next/dist/client/components/navigation';
import { useTranslations } from 'next-intl';

interface Props {
  open: boolean;
  onClose: () => void;
  phone?: string;
  email?: string;
  type: string;
}
export default function OtpConfirmDialog({ open, onClose, phone, email }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const t = useTranslations();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card sx={{ p: 3 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
          <Typography variant="h5">يرجى التحقق من بريدك الإلكتروني</Typography>
        </Stack>

        <Typography className="text-gray-600 mt-3 text-sm leading-relaxed">
          {t('Label.we_sent_code')}
          <span className="font-semibold">{email}</span>
          {t('Label.please_enter_code')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
          {otp.map((digit, index) => (
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
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: '100%', borderRadius: 2, mb: 3 }}
          onClick={() => router.push('/lisson')}
        >
          {t('Button.check_code')}
        </Button>

        <Typography sx={{ textAlign: 'center' }}>{t('Label.check_resend')}</Typography>

        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          {t('Label.donot_code')} <Link>{t('Label.resend_code')}</Link>
        </Typography>
      </Card>
    </Dialog>
  );
}
