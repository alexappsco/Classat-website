'use client'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
import { primary, warning } from 'src/theme/palette';
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
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

type PackageCardProps = {
  title: string;
  descriptionLine1: string;
  descriptionLine2: string;
  hoursLabel: string;
  price: string;
  discountText: string;
  id: string;
  teacher_id: string;
  paymentList?: any[]; // Add paymentList prop
};

// Payment Modal Component for Teacher Package
function PackagePaymentModal({
  open,
  onClose,
  packageData,
  paymentList,
  teacherId,
}: {
  open: boolean;
  onClose: () => void;
  packageData: {
    id: string;
    title: string;
    price: string;
    discountText: string;
    hoursLabel: string;
  };
  paymentList: any[];
  teacherId: string;
}) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Calculate VAT and totals
  const VAT_PERCENTAGE = 0.15; // 15%
  const subtotal = parseFloat(packageData.price) || 0;

  // Extract discount percentage from discountText (e.g., "وفر %20" -> 20)
  const discountMatch = packageData.discountText?.match(/%(\d+)/);
  const discountPercentage = discountMatch ? parseInt(discountMatch[1]) : 0;

  const discountAmount = (subtotal * discountPercentage) / 100;
  const priceAfterDiscount = subtotal - discountAmount;
  const vatAmount = priceAfterDiscount * VAT_PERCENTAGE;
  const total = priceAfterDiscount + vatAmount;

  // Set first payment method as default when modal opens
  useState(() => {
    if (paymentList && paymentList.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentList[0].id);
    }
  });

  const handleBuyNow = async () => {
    if (!selectedMethod) {
      enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Direct checkout for teacher package - matching Flutter implementation
      const checkoutRes = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: 'TeacherPackage', // Using TeacherPackage type
        teacherPackageId: packageData.id,
        teacherId: teacherId,
      });

      if (checkoutRes.success || checkoutRes.status === 204) {
        enqueueSnackbar('تم شراء الباقة بنجاح', { variant: 'success' });
        onClose();
        // You might want to redirect to success page or refresh the page
      } else {
        enqueueSnackbar(checkoutRes.error || 'فشلت عملية الدفع', { variant: 'error' });
      }
    } catch (error) {
      console.error('Purchase Error:', error);
      enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
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
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        إتمام شراء الباقة
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {packageData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {packageData.hoursLabel}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
          اختر وسيلة الدفع
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            {paymentList && paymentList.map((method) => (
              <Card
                key={method.id}
                sx={{
                  mb: 1.5,
                  p: 1,
                  border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#00bcd4',
                  },
                }}
                onClick={() => setSelectedMethod(method.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio checked={selectedMethod === method.id} color="primary" />
                    <Typography>{method.name}</Typography>
                  </Box>
                  {method.logo && (
                    <Box sx={{ width: 50, height: 30 }}>
                      <img
                        src={method.logo}
                        alt={method.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </Box>
                  )}
                </Box>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Price Breakdown */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">سعر الباقة</Typography>
            <Typography>{subtotal.toFixed(2)} درهم</Typography>
          </Box>

          {discountPercentage > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">الخصم ({discountPercentage}%)</Typography>
              <Typography sx={{ color: 'error.main' }}>-{discountAmount.toFixed(2)} درهم</Typography>
            </Box>
          )}

          {discountPercentage > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">السعر بعد الخصم</Typography>
              <Typography>{priceAfterDiscount.toFixed(2)} درهم</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
            <Typography>{vatAmount.toFixed(2)} درهم</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              {total.toFixed(2)} درهم
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: '50px', px: 3 }}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleBuyNow}
          variant="contained"
          sx={{
            borderRadius: '50px',
            px: 3,
            bgcolor: primary.main,
            '&:hover': { bgcolor: primary.dark }
          }}
          disabled={isSubmitting || !selectedMethod}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PackageCard({
  title,
  descriptionLine1,
  descriptionLine2,
  hoursLabel,
  price,
  discountText,
  id,
  teacher_id,
  paymentList = [], // Default to empty array
}: PackageCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const addToCart = async () => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '2',
      teacherPackageId: id,
      teacherId: teacher_id,
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(
        res.error || 'حدث خطأ ما',
        { variant: 'error' }
      );
    }
  };

  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          boxShadow: '0 0 20px rgba(145, 158, 171, 0.18)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={2} alignItems="center">
          {/* Icon circle */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: '#E6F4FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box component="img" src="/favicon/flash.svg" alt="" sx={{ width: 32, height: 32 }} />
          </Box>

          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {descriptionLine1}
            <br />
            {descriptionLine2}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {hoursLabel}
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: warning.main, fontWeight: 700, mt: 1 }}
          >
            {price} درهم
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {discountText}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 3, width: '100%' }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleBuyNow} // Add onClick handler
            sx={{
              borderRadius: 999,
              bgcolor: primary.main,
              ':hover': { bgcolor: primary.dark },
            }}
          >
            اشترِ الآن
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              borderRadius: 999,
              bgcolor: primary.main,
              ':hover': { bgcolor: primary.dark },
            }}
            endIcon={<Icon icon="solar:cart-large-2-bold" />}
            onClick={addToCart}
          >
            أضف الى السلة
          </Button>
        </Stack>
      </Card>

      {/* Payment Modal */}
      <PackagePaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        packageData={{
          id,
          title,
          price,
          discountText,
          hoursLabel,
        }}
        paymentList={paymentList}
        teacherId={teacher_id}
      />
    </>
  );
}

export default PackageCard;