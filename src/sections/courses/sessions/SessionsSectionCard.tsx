
'use client';

import { useSnackbar } from 'notistack';
import Image from 'src/components/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
import Book from 'public/assets/courses/icons/book.svg';
import Star from 'public/assets/courses/icons/star.svg';
import { text, shadow, warning } from 'src/theme/palette';
import Clock from 'public/assets/courses/icons/clock.svg';
import RedHeart from 'public/assets/courses/icons/heart.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

interface Props {
  paymentList: any[];
  session: any;
}

export default function SessionsSectionCard({
  session,
  paymentList,
}: Props) {
  console.log('session missions', session);
  const theme = useTheme();
  const blueColor = '#0D47A1';
  const blueBg = '#E3F2FD';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [liked, setLiked] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract session data
  const {
    courseId,
    title,
    description,
    coverImageUrl,
    totalHours,
    totalMinutes,
    numberOfLessons,
    price,
    priceAfterTaxAndProfit,
    averageRating,
    teacherName,
    teacherId,
    teacherImageUrl,
    categoryName,
    isEnrolled,
  } = session;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };


  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsPaymentModalOpen(true);
  };

  const onAddToCart = async (courseId: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '4',
      teacherId: teacherId,
      courseId: courseId,
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
    }
  };

  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsSubmitting(true);
    try {
      await onAddToCart(courseId);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time display
  const formatTime = () => {
    if (totalHours > 0 && totalMinutes > 0) {
      return `${totalHours}س ${totalMinutes}د`;
    } else if (totalHours > 0) {
      return `${totalHours}س`;
    } else if (totalMinutes > 0) {
      return `${totalMinutes}د`;
    }
    return '0د';
  };

  return (
    <>
      <Card
        onClick={() => {!isEnrolled && router.push(`/courses/course/${courseId}`)}}
        sx={{
          borderRadius: 2,
          boxShadow: shadow.main,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          p: '20px 16px 16px',
          // cursor: "pointer",
          position: 'relative',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            pt: '75%',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <Box
            onClick={handleHeartClick}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.15)',
              },
            }}
          >
            {liked ? <RedHeart /> : <FavoriteBorderIcon />}
          </Box>

          <Box
            component="img"
            src={coverImageUrl || '/assets/placeholder/course.jpg'}
            alt={title}
            sx={{
              position: 'absolute',
              top: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="caption"
              sx={{
                backgroundColor: orangeBg,
                color: orangeColor,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: '30px',
                padding: '8px 14px',
              }}
            >
              {categoryName || 'عام'}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Star width={16} height={16} /> {averageRating?.toFixed(1) || '0.0'}
            </Typography>
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 1, color: theme.palette.text.secondary }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Book width={16} height={16} />
              <Typography variant="body2">{numberOfLessons || 0} دروس</Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Clock width={16} height={16} />
              <Typography variant="body2">{formatTime()}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={1}>
              <Image
                src={teacherImageUrl || "/assets/landing-page/live-sessions/instructors/instructor.png"}
                alt={teacherName}
                sx={{ width: 32, height: 32, borderRadius: '50%' }}
              />
              <Typography variant="body2" sx={{ color: text.primary, fontWeight: 500 }}>
                {teacherName}
              </Typography>
            </Stack>

            {!isEnrolled && (

            <Stack direction="row" alignItems="center" gap={1}>
              {/* {priceAfterTaxAndProfit && priceAfterTaxAndProfit !== price && (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    textDecoration: 'line-through',
                    fontSize: 13,
                  }}
                >
                  {price?.toFixed(0)} درهم
                </Typography>
              )} */}

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#FFA000',
                }}
              >
                {priceAfterTaxAndProfit?.toFixed(0) || price?.toFixed(0)} درهم
              </Typography>
            </Stack>
                        )}

          </Stack>

          {/* Add to Cart and Buy Now Buttons - Only show if not enrolled */}
          {!isEnrolled && (
            <Box onClick={(e) => e.stopPropagation()} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleBuyNowClick}
                  sx={{
                    borderRadius: 1.5,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    backgroundColor: '#56b0d3',
                    '&:hover': { backgroundColor: '#459dbf' }
                  }}
                >
                  شراء الآن
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleAddToCartClick}
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 1.5,
                    minWidth: 48,
                    px: 0,
                    borderColor: '#56b0d3',
                    color: '#2c3e50',
                    '&:hover': {
                      borderColor: '#459dbf',
                      backgroundColor: 'rgba(86, 176, 211, 0.04)',
                    }
                  }}
                >
                  {isSubmitting ? <CircularProgress size={20} /> : <ShoppingCartIcon fontSize="small" />}
                  <Typography variant="body2" sx={{ ml: 1 }}>اضافة الى السلة</Typography>
                </Button>
              </Stack>
            </Box>
          )}

          {/* Show enrolled badge if enrolled */}
          {isEnrolled && (
            <Box sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/mycourses/${courseId}`);
                }}
                sx={{ borderRadius: 1.5, fontWeight: 700 }}
              >
                استئناف التعلم
              </Button>
            </Box>
          )}
        </Stack>
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        session={session}
        paymentList={paymentList}
        onSuccess={() => {
          enqueueSnackbar('تم شراء الكورس بنجاح', { variant: 'success' });
        }}
      />
    </>
  );
}

// Payment Modal Component
function PaymentModal({
  open,
  onClose,
  session,
  paymentList,
  onSuccess
}: {
  open: boolean;
  onClose: () => void;
  session: any;
  paymentList: any[];
  onSuccess?: () => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Calculate VAT and totals
  const VAT_PERCENTAGE = 0.15; // 15%
  const subtotal = session?.price || 0;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const total = subtotal + vatAmount;

  // Set first payment method as default when modal opens
  useEffect(() => {
    if (paymentList && paymentList.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentList[0].id);
    }
  }, [paymentList, selectedMethod]);

  const handleBuyNow = async () => {
    if (!selectedMethod) {
      enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      const checkoutRes = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: 'Course',
        courseId: session.courseId,
        teacherId: session?.teacherId,
      });

      if (checkoutRes.success || checkoutRes.status === 204) {
        enqueueSnackbar('تم شراء الكورس بنجاح', { variant: 'success' });
        onSuccess?.();
        onClose();
      } else {
        enqueueSnackbar(checkoutRes.error || 'فشلت عملية الدفع', { variant: 'error' });
      }
    } catch (error) {
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
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        إتمام شراء الكورس
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {session?.title}
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
            <Typography>{session?.price?.toFixed(2) || 0} درهم</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
            <Typography>{vatAmount.toFixed(2)} درهم</Typography>
          </Box>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">نسبة ربح النصه {session?.platformProfitPercentage || 0}%</Typography>
            <Typography>{(session?.platformProfitPercentage * session?.price).toFixed(2) || 0} درهم</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              {session?.priceAfterTaxAndProfit || 0} درهم
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
            bgcolor: '#56b0d3',
            '&:hover': { bgcolor: '#459dbf' }
          }}
          disabled={isSubmitting || !selectedMethod}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Import PlayArrowIcon for enrolled button
import PlayArrowIcon from '@mui/icons-material/PlayArrow';