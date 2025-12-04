import React from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import Success from 'public/assets/courses/icons/success.svg';
import {
  Box,
  Dialog,
  Button,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuccessBookingDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '16px',
          textAlign: 'center',
          width: '380px',
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Success Icon */}
      <Box sx={{ mt: 2 }}>
        <Success />
      </Box>

      {/* Title */}
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px' }}>تم حجز جلستك بنجاح!</DialogTitle>

      {/* Instructor */}
      <Typography sx={{ fontSize: '15px', color: '#333', mb: 3 }}>مع أ. عبد الله احمد</Typography>

      <DialogContent sx={{ textAlign: 'center' }}>
        {' '}
        {/* ← وسط */}
        {/* Booking Info */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>المادة:</span>
            &nbsp;
            <span style={{ color: '#000', fontWeight: 500 }}>برمجة – Python</span>
          </Typography>

          <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>اليوم:</span>
            &nbsp;
            <span style={{ color: '#000', fontWeight: 500 }}>الثلاثاء 25 أكتوبر</span>
          </Typography>

          <Typography sx={{ fontSize: '13px' }}>
            <span style={{ color: '#54B0D7', fontWeight: 500 }}>الوقت:</span>
            &nbsp;
            <span style={{ color: '#000', fontWeight: 500 }}>6:00 م</span>
          </Typography>
        </Box>
        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: '20px',
              color: "#797979",
              paddingX: 2.5,
              paddingY: 1,
              fontSize: '13px',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              minWidth: '140px',
            }}
          >
            عرض جلساتي القادمة
          </Button>

          <Link href="/ar" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#3bb3ff',
                paddingX: 2.5,
                paddingY: 1,
                borderRadius: '20px',
                textTransform: 'none',
                fontSize: '13px',
                whiteSpace: 'nowrap',
                minWidth: '120px',
              }}
            >
              العودة إلى الرئيسية
            </Button>
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
