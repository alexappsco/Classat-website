'use client';

import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  Box,
  Card,
  Stack,
  Radio,
  Button,
  Dialog,
  Divider,
  Typography,
  RadioGroup,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  course: any;
  paymentList: any[];
  onSuccess?: () => void;
}

export default function PaymentModal({
  open,
  onClose,
  course,
  paymentList,
  onSuccess,
}: PaymentModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants for calculation
  const VAT_RATE = 0.15;
  const subtotal = course?.price || 0;
  const vatAmount = subtotal * VAT_RATE;
  const platformProfit = (course?.platformProfitPercentage || 0) * subtotal;
  const totalAmount = course?.priceAfterTaxAndProfit || (subtotal + vatAmount + platformProfit);

  useEffect(() => {
    if (paymentList?.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentList[0].id);
    }
  }, [paymentList, selectedMethod]);

  const handleConfirmPurchase = async () => {
    if (!selectedMethod) {
      enqueueSnackbar('يرجى اختيار وسيلة دفع أولاً', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: 'Course',
        courseId: course?.courseId,
        teacherId: course?.teacherId,
      });

      if (response.success || response.status === 204) {
        enqueueSnackbar('تمت عملية الشراء بنجاح!', { variant: 'success' });
        onSuccess?.();
        onClose();
      } else {
        enqueueSnackbar(response.error || 'فشلت عملية الدفع', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('حدث خطأ أثناء الاتصال بالخادم', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      dir="rtl"
      PaperProps={{
        sx: { borderRadius: 3, p: 1 }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: '1.4rem', pt: 3 }}>
        إتمام عملية الشراء
      </DialogTitle>

      <DialogContent>
        {/* Course Summary Card */}
        <Box sx={{ mb: 4, p: 2, bgcolor: '#F4F6F8', borderRadius: 2, border: '1px solid #E5E8EB' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            أنت بصدد شراء:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, color: 'primary.main' }}>
            {course?.title}
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
          اختر وسيلة الدفع المناسبة
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <Stack spacing={2}>
              {paymentList?.map((method) => (
                <Card
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: '0.2s',
                    border: (theme) => `2px solid ${selectedMethod === method.id ? theme.palette.primary.main : '#F4F6F8'}`,
                    boxShadow: selectedMethod === method.id ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                    '&:hover': { bgcolor: alpha('#56b0d3', 0.04) }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Radio checked={selectedMethod === method.id} />
                    <Typography sx={{ fontWeight: 600 }}>{method.name}</Typography>
                  </Stack>

                  {method.logo && (
                    <Box component="img" src={method.logo} sx={{ height: 24, maxWidth: 60, objectFit: 'contain' }} />
                  )}
                </Card>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

        {/* Price Breakdown Section */}
        <Stack spacing={1.5}>
          <PriceRow label="سعر الكورس" value={subtotal} />
          <PriceRow label="ضريبة القيمة المضافة (15%)" value={vatAmount} />
          <PriceRow label="رسوم المنصة" value={platformProfit} />

          <Box sx={{ p: 2, bgcolor: alpha('#56b0d3', 0.1), borderRadius: 2, mt: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 800 }}>الإجمالي النهائي</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {totalAmount.toFixed(2)} درهم
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{ borderRadius: 1.5, py: 1.2, fontWeight: 700 }}
        >
          إلغاء
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirmPurchase}
          disabled={isSubmitting || !selectedMethod}
          sx={{
            borderRadius: 1.5,
            py: 1.2,
            fontWeight: 700,
            bgcolor: '#56b0d3',
            '&:hover': { bgcolor: '#459dbf' }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد ودفع'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Helper component for price rows
function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value.toFixed(2)} درهم</Typography>
    </Stack>
  );
}

// Utility helper for colors
function alpha(color: string, opacity: number) {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}