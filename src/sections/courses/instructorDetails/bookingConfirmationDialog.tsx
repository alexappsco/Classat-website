import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Radio,
  Dialog,
  Button,
  Typography,
  IconButton,
  RadioGroup,
  DialogTitle,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


export default function BookingConfirmationDialog({ open, onClose, onSuccess }: Props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [openInvoice, setOpenInvoice] = useState(false);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '20px',
          width: '420px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseIcon />
      </IconButton>

      {/* Title */}
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'left', mb: 2 }}>
        تأكيد الحجز مع أ. إسماعيل أحمد
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'right', mt: 1 }}>
        {/* Booking Info */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>المادة:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>برمجة – Python</span>
          </Typography>

          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>اليوم:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>الثلاثاء 25 أكتوبر</span>
          </Typography>

          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px' }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>الوقت:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>6:00 م</span>
          </Typography>
        </Box>

        {/* Payment Options Title */}
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'left',
            my: 2,
          }}
        >
          خيارات الدفع
        </Typography>

        {/* Payment Options */}
        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          sx={{ pl: 1 }}
        >
          <FormControlLabel
            value="session"
            control={<Radio />}
            label="جلسة واحدة (60 درهم)"
          />

          <FormControlLabel
            value="package10"
            control={<Radio />}
            label="شراء باقة 10 جلسات (160 درهم)"
          />

          <FormControlLabel
            value="package15"
            control={<Radio />}
            label="شراء باقة 15 جلسة (160 درهم)"
          />

          <FormControlLabel
            value="balance"
            control={<Radio />}
            label="استخدام الرصيد (متبقي 2 ساعة)"
          />
        </RadioGroup>

        {/* Confirm Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
    onSuccess();
  }}
          sx={{
            mt: 3,
            py: 1.2,
            backgroundColor: '#54B0D7',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '10px',
          }}
        >
          الذهاب للدفع وتأكيد الحجز
        </Button>
      </DialogContent>
    </Dialog>
  );
}
