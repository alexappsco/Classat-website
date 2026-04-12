
"use client";

import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { primary } from 'src/theme/palette';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
import {
  Box,
  Card,
  Stack,
  Radio,
  Button,
  Dialog,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

type Props = {
  teacherId: string;
  courseId: string;
  paymentList: any[];
  course: any;

};

// Payment Modal Component for Course
function CoursePaymentModal({
  open,
  onClose,
  courseData,
  paymentList,
  teacherId,
  course,
}: {
  open: boolean;
  onClose: () => void;
  courseData: {
    id: string;
    title: string;
    price: number;
  };
  paymentList: any[];
  teacherId: string;
  course: any;

}) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Calculate VAT and totals
  const VAT_PERCENTAGE = 0.15; // 15%
  const subtotal = courseData.price || 0;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const total = subtotal + vatAmount;

  // Set first payment method as default when modal opens
  useEffect(() => {
    if (paymentList && paymentList.length > 0 && open && !selectedMethod) {
      setSelectedMethod(paymentList[0].id);
    }
  }, [paymentList, open, selectedMethod]);

  const handleBuyNow = async () => {
    if (!selectedMethod) {
      enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Direct checkout for course - matching Flutter's DirectCheckoutParams.addCourse
      const checkoutRes = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: 'Course',
        courseId: courseData.id,
        teacherId: teacherId,
      });

      if (checkoutRes.success || checkoutRes.status === 204) {
        enqueueSnackbar('تم شراء الكورس بنجاح', {
          variant: 'success'
        });
        onClose();
        // You might want to redirect to success page or refresh the page
      } else {
        enqueueSnackbar(checkoutRes.error || 'فشلت عملية الدفع', {
          variant: 'error'
        });
      }
    } catch (error) {
      console.error('Purchase Error:', error);
      enqueueSnackbar('حدث خطأ غير متوقع', {
        variant: 'error'
      });
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
        إتمام شراء الكورس
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {courseData.title}
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
            <Typography color="text.secondary">سعر الكورس</Typography>
            <Typography>درهم {course.price.toFixed(2)}</Typography>
          </Box>
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
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد يسرسيرسيريسرسير'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CourseActions({ teacherId, courseId, paymentList ,course}: Props) {

  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState<{ title: string; price: number }>({
    title: 'الكورس',
    price: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  // ===== Add To Cart Function =====
  const addToCart = async () => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '4',
      teacherId: teacherId,
      courseId: courseId,
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(res.error || 'حدث خطأ ما', {
        variant: 'error'
      });
    }
  };

  // ===== Open Payment Modal =====
  const handleBuyClick = () => {
    if (!paymentList || paymentList.length === 0) {
      enqueueSnackbar('لا توجد وسائل دفع متاحة', { variant: 'warning' });
      return;
    }
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        {/* Main action buttons row */}
        <Stack direction="row" spacing={2} alignItems="center" >

          {/* Purchase Button */}
          <Button
            variant="contained"
            sx={{
              width: '207px',
              height: '50px',
              borderRadius: '25px',
              padding: '16px 24px',
              fontSize: "20px",
              fontWeight: "400",
              backgroundColor: '#54B0D7',
              '&:hover': {
                backgroundColor: '#3A8FB8',
              }
            }}
            onClick={handleBuyClick}
            disabled={isPurchasing}
          >
            {isPurchasing ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'شراء الكورس'
            )}
          </Button>
        {/* Add to cart */}
        <Button
          variant="outlined"
          size="large"
          startIcon={<Icon icon="mdi:cart-outline" width={20} />}
          sx={{
            width: '273px',
            height: '50px',
            borderRadius: '25px',
            padding: '16px 24px',
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "22px",
            gap: '8px',
            border: '1px solid #54B0D7',
            color: '#637381',
            mt: 2,
            '&:hover': {
              borderColor: '#3A8FB8',
              backgroundColor: 'rgba(84, 176, 215, 0.04)',
            }
          }}
          onClick={addToCart}
        >
          أضف إلى السلة
        </Button>
        </Stack>
      </Box>

      {/* Payment Modal */}
      <CoursePaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseData={{
          id: courseId,
          title: courseDetails.title,
          price: courseDetails.price,
        }}
        paymentList={paymentList}
        teacherId={teacherId}
        course={course}
      />
    </>
  );
}