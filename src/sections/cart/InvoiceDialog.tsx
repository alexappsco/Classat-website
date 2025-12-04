import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InvoiceDialog({ open, onClose }: Props) {
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
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'left', mb: 2 }}>
        الفاتورة
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'right', mt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: '500' }}>رقم الفاتورة:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>INV-2025-01482</span>
          </Typography>

          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: '500' }}>تاريخ الفاتورة:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>19 أكتوبر 2025</span>
          </Typography>

          <Typography sx={{ display: 'flex', gap: 1, fontSize: '13px' }}>
            <span style={{ color: '#54B0D7', fontWeight: '500' }}>طريقة الدفع:</span>
            <span style={{ color: '#000', fontWeight: 500 }}>بطاقة ائتمان (Visa **** 2458)</span>
          </Typography>
        </Box>

        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'left',
            my: 2,
          }}
        >
          تفاصيل الدفع
        </Typography>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontSize: '14px' }}>باقة دروس مع المعلم أ. أحمد عبد الله</Typography>
            <Typography sx={{ fontSize: '14px' }}>150 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontSize: '14px' }}>
              جلسة خاصة في اللغة العربية - الصف الثامن
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>150 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontSize: '14px' }}>أساسيات برمجة الويب</Typography>
            <Typography sx={{ fontSize: '14px' }}>80 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontSize: '14px' }}>ضريبة القيمة المضافة</Typography>
            <Typography sx={{ fontSize: '14px' }}>150 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>الخصم</Typography>
            <Typography sx={{ fontSize: '14px' }}>0 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>الإجمالي</Typography>
            <Typography sx={{ fontSize: '14px' }}>495 درهم</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
              الإجمالي بعد الخصم
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>495 درهم</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
