

import Link from 'next/link';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { text, shadow, primary, warning } from 'src/theme/palette';

import { useTranslations } from 'next-intl';

// Define the props type for the main component
import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  Radio,
  Button,
  Dialog,
  Divider,
  ListItem,
  Accordion,
  Container,
  IconButton,
  Typography,
  RadioGroup,
  DialogTitle,
  CardContent,
  FormControl,
  ListItemText,
  DialogContent,
  DialogActions,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Chip,
  CardMedia,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { useEffect, useState } from 'react';
import { FetchTags } from 'src/actions/config-actions';
import { invalidateTag } from 'src/actions/cache-invalidation';
import { Icon } from '@iconify/react';
import { ILiveCourse } from 'src/types/liveCourse';

interface LiveSessionCardProps {
  lessonList: ILiveCourse[];
  teacher_id: string;
  paymentList: any[];
  onAddToCart?: (id: string) => Promise<void>;

}

// Define the props type for the PaymentModal component
interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  lesson: ILiveCourse & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
  paymentList: any[];
  teacherId: string;
  onSuccessPurchase?: () => void;
}
interface LiveSessionCardPropsItem {
  liveCourse: ILiveCourse;
  onAddToCart: (id: string) => Promise<void>;
  paymentList: any[];
  teacherId: string;
}

export default function LiveSessionCard({ lessonList, teacher_id, paymentList }: LiveSessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const onAddToCart = async (id: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '6',
      teacherId: teacher_id,
      liveSessionCourseId: id || '',
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
    }
  };

  console.log('lessonList:', lessonList);
  if (!lessonList || lessonList.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          لا توجد دروس متاحة
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          {lessonList.map((lesson) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={lesson.id}>
              <LiveSessionCards
                liveCourse={lesson}
                // onAddToCart={onAddToCart}
                paymentList={paymentList}
                teacherId={teacher_id}
                onAddToCart={onAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Payment Modal Component
function PaymentModal({ open, onClose, lesson, paymentList, teacherId, onSuccessPurchase }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Calculate VAT and totals
  const VAT_PERCENTAGE = 0.15; // 15%
  const subtotal = lesson.coursePrice || lesson.price || 0;
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
      // Direct checkout for educational lesson - matching Flutter implementation
      const checkoutRes = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: '6', // Using EducationalLesson type
        liveSessionCourseId: lesson.id || lesson.id, // Send the lesson ID
        teacherId: teacherId,
      });

      if (checkoutRes.success || checkoutRes.status === 204) {
        enqueueSnackbar('تم شراء الدرس بنجاح', { variant: 'success' });
        // Invalidate server cache for live courses so future navigations are fresh
        try {
          invalidateTag(FetchTags.LiveCourse);
        } catch (e) {
          // fail silently; UI will still update locally
        }
        // Locally update UI without full page reload
        onSuccessPurchase?.();
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
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        إتمام شراء الدرس
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {lesson.courseTitle || lesson.title}
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
            <Typography color="text.secondary">سعر الدرس</Typography>
            <Typography>{subtotal.toFixed(2)} درهم</Typography>
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




function LiveSessionCards({ liveCourse, onAddToCart, paymentList, teacherId }: LiveSessionCardPropsItem) {
  const t = useTranslations();

  const theme = useTheme();
  const redColor = '#B30505';
  const padgBg = '#FFE5E5';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  const [course, setCourse] = useState(liveCourse);

  const parseStart = () => {
    if (!course.date || !course.time) return null;

    const dateOnly = course.date.split('T')[0];

    return new Date(`${dateOnly}T${liveCourse.time}Z`);
  };
  const startsAt = parseStart();

  const localDate = startsAt?.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const localTime = startsAt?.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // لو عايز AM/PM
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    await onAddToCart(course.id || course.id);
    setIsSubmitting(false);
  };

  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePurchaseSuccess = () => {
    setCourse((prev) => ({ ...prev, isEnrolled: true }));
  };

  return (
    <>

      <Card
        sx={{
          borderRadius: 2,
          boxShadow: shadow.main,
          height: '550px',
          // Ensure card content stacks correctly
          display: 'flex',
          flexDirection: 'column',
          p: '20px 16px 16px',

          // width: 'fit-content',
        }}
      >
        {/* 1. Image and Live Tag Area */}
        <Box
          sx={{
            position: 'relative',
            // pt: '56.25%', // 16:9 Aspect Ratio
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <CardMedia
            component="img"
            image={liveCourse.coverImagePath}
            alt={liveCourse.title}
            sx={{ height: 270, width: '100%', objectFit: 'fill' }}
          />

          {/* Live Tag (Chip) - Positioned Absolutely */}
          {liveCourse.status && (
            <Chip
              // label="مباشر"
              label={liveCourse.status}
              
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: padgBg, // Red for 'Live'
                color: redColor,
                fontWeight: 700,
                fontSize: theme.typography.pxToRem(12),
              }}
            />
          )}
        </Box>

        {/* 2. Content Area */}
        <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
          {/* Category Tag */}
          <Typography
            variant="caption"
            sx={{
              backgroundColor: orangeBg,
              color: orangeColor, // Orange color for the tag
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '30px',
              padding: '14px',
              width: 'fit-content',
            }}
          >
          {course.courseCategory}
          </Typography>

          {/* Session Title */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
          >
            {course.title}
          </Typography>

          {/* Instructor Name and Avatar (Simple text for now) */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>

              <Typography
                variant="body2"
                sx={{ color: text.primary }}
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
              >
                <Image src={course.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} />
                {course.teacherName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>

                <span style={{ color: '#666' }}>  {t('Label.time_period')} :</span>  {course.totalHours} {t('Label.hours')}  {course.totalMinutes} {t('Label.munite')}

              </Typography>

            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />


          {/* Metadata (Time and Attendees) */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666', display: 'flex' }}>
                <img
                  src={'/assets/icons/app/calendar-event.svg'}
                  style={{ height: '18px', marginLeft: '5px' }}
                  alt=""
                />
                {localDate}
              </Typography>

            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>
                <img
                  src={'/assets/icons/app/clock.svg'}
                  style={{ height: '18px', marginLeft: '5px' }}
                  alt=""
                />
                {localTime}
              </Typography>

            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>
                {course.price} <span style={{ color: '#666' }}> AED</span>


              </Typography>

            </Stack>
          </Stack>
        </Stack>

        {/* 3. Join Button */}

        {course.isEnrolled ? (
          <Link href="/ar/courses/instructor/">
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: primary.main,
                color: 'white',
                width: '90%',
                m: 'auto',
                borderTopLeftRadius: theme.spacing(4),
                borderTopRightRadius: theme.spacing(4),
                borderBottomLeftRadius: theme.spacing(4),
                borderBottomRightRadius: theme.spacing(4),
              }}
            >
              انضم الآن
            </Button>

          </Link>
        ) : (


          <Box >
            <Stack direction="row" spacing={1.5} alignItems="center" >
              <Button
                variant="contained"
                fullWidth
                onClick={handleBuyNow}
                sx={{
                  borderRadius: '50px',
                  backgroundColor: '#56b0d3',
                  height: 45,
                  boxShadow: 'none',
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: '#459dbf', boxShadow: 'none' },
                }}
              >
                شراء الدرس
              </Button>


              <Button
                variant="outlined"
                fullWidth
                onClick={handleAddToCart}
                disabled={isSubmitting}
                endIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Icon icon="solar:cart-large-minimalistic-outline" width="20" height="20" />
                  )
                }
                sx={{
                  py: 1.2,
                  borderRadius: '50px',
                  borderColor: '#56b0d3',
                  color: '#2c3e50',
                  fontSize: '15px',
                  '&:hover': {
                    borderColor: '#459dbf',
                    backgroundColor: 'rgba(86, 176, 211, 0.04)',
                  },
                }}
              >
                {isSubmitting ? 'جاري الإضافة...' : <Typography variant="body2" sx={{ display: { md: 'none', lg: 'block', sm: 'none', xs: 'block' } }}>أضف إلى السلة</Typography>}
              </Button>
            </Stack>

          </Box>
        )}
      </Card>
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        lesson={course}
        paymentList={paymentList}
        teacherId={teacherId}
        onSuccessPurchase={handlePurchaseSuccess}
      />
    </>
  );
}
