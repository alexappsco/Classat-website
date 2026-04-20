"use client"

import Link from 'next/link';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { text, shadow, primary, warning } from 'src/theme/palette';
import { useTranslations } from 'next-intl';

import {
  Box,
  Card,
  Grid,
  Stack,
  Radio,
  Button,
  Dialog,
  Divider,
  Container,
  Typography,
  RadioGroup,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  CardMedia,
  IconButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { postData, getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { useEffect, useState, useCallback } from 'react';
import { FetchTags } from 'src/actions/config-actions';
import { invalidateTag } from 'src/actions/cache-invalidation';
import { Icon } from '@iconify/react';
import { ILiveCourse } from 'src/types/liveCourse';
import SessionDialog from 'src/sections/curricula/live-sessions/SessionDialog';
import InvoiceDetails from 'src/sections/invoice/invoiceDetails';

// ----------------------------------------------------------------------

interface LiveSessionCardProps {
  lessonList: ILiveCourse[];
  teacher_id: string;
  paymentList: any[];
  onAddToCart?: (id: string, teacherId: string) => Promise<void>;
  enrollments?: any[];
}

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  lesson: ILiveCourse & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
  paymentList: any[];
  teacherId: string;
  onSuccessPurchase?: (invoiceData: any) => void;
}

interface LiveSessionCardPropsItem {
  liveCourse: ILiveCourse;
  onAddToCart: (id: string, teacherId: string) => Promise<void>;
  paymentList: any[];
  teacherId: string;
  enrollments: any[];
  refreshEnrollments: () => Promise<void>;
}

export default function LiveSessionCard({ lessonList, paymentList, enrollments }: LiveSessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [localEnrollments, setLocalEnrollments] = useState<any[]>(enrollments || []);

  useEffect(() => {
    setLocalEnrollments(enrollments || []);
  }, [enrollments]);

  const refreshEnrollments = useCallback(async () => {
    try {
      const res = await getData<any>(endpoints.liveCourseEnrollments.get);
      if (res?.success) {
        setLocalEnrollments(res.data.items || []);
      }
    } catch (error) {
      console.error("Failed to refresh enrollments:", error);
    }
  }, []);

  const onAddToCart = async (id: string, teacherId: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '6',
      teacherId: teacherId,
      liveSessionCourseId: id || '',
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
    }
  };

  if (!lessonList || lessonList.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center" color="text.secondary">لا توجد دروس متاحة</Typography>
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
                paymentList={paymentList}
                enrollments={localEnrollments}
                refreshEnrollments={refreshEnrollments}
                onAddToCart={onAddToCart}
                teacherId={lesson.teacherId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PaymentModal({ open, onClose, lesson, paymentList, teacherId, onSuccessPurchase }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const subtotal = lesson.coursePrice || lesson.price || 0;
  const vatAmount = lesson.price * (lesson?.taxRate || 0);
  const platformProfit = lesson.price * (lesson?.platformProfitPercentage || 0);
  const total = lesson.priceAfterTaxAndProfit;

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
      const checkoutRes: any = await postData(endpoints.payment.post_single_item, {
        paymentMethodId: selectedMethod,
        itemType: '6',
        liveSessionCourseId: lesson.id,
        teacherId: teacherId,
      });

      if (checkoutRes.success && checkoutRes.data?.invoiceId) {
        try { invalidateTag(FetchTags.LiveCourse); } catch (e) { }

        const invoiceRes = await getData(endpoints.invoice.getDetails(checkoutRes.data.invoiceId));
        if (invoiceRes.success && invoiceRes.data) {
          onSuccessPurchase?.(invoiceRes.data);
        }
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>إتمام شراء الدرس</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">{lesson.courseTitle || lesson.title}</Typography>
        </Box>
        <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>اختر وسيلة الدفع</Typography>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            {paymentList?.map((method) => (
              <Card
                key={method.id}
                sx={{
                  mb: 1.5, p: 1,
                  border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
                  borderRadius: 2, cursor: 'pointer',
                  '&:hover': { borderColor: '#00bcd4' },
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
                      <img src={method.logo} alt={method.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </Box>
                  )}
                </Box>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">سعر الدرس</Typography>
            <Typography>{subtotal.toFixed(2)} درهم</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">ضريبة ({lesson?.taxRate || 0}%)</Typography>
            <Typography>{vatAmount.toFixed(2)} درهم</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">ربح المنصة ({lesson?.platformProfitPercentage || 0}%)</Typography>
            <Typography>{platformProfit.toFixed(2)} درهم</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">{total ? total.toFixed(2) : '0.00'} درهم</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: '50px', px: 3 }}>إلغاء</Button>
        <Button onClick={handleBuyNow} variant="contained" disabled={isSubmitting || !selectedMethod}
          sx={{ borderRadius: '50px', px: 3, bgcolor: '#56b0d3', '&:hover': { bgcolor: '#459dbf' } }}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function LiveSessionCards({ liveCourse, onAddToCart, paymentList, teacherId, enrollments, refreshEnrollments }: LiveSessionCardPropsItem) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const [course, setCourse] = useState(liveCourse);
  const [isEnrolledLocal, setIsEnrolledLocal] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [purchasedInvoice, setPurchasedInvoice] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  useEffect(() => {
    const isActuallyEnrolled = enrollments?.some((en) => en.liveSessionCourseId === liveCourse.id);
    setIsEnrolledLocal(isActuallyEnrolled || liveCourse.isEnrolled);
  }, [enrollments, liveCourse.id, liveCourse.isEnrolled]);

  const currentEnrollment = enrollments?.find((en) => en.liveSessionCourseId === liveCourse.id);

  const parseStart = () => {
    if (!course.date || !course.time) return null;
    const dateOnly = course.date.split('T')[0];
    return new Date(`${dateOnly}T${liveCourse.time}Z`);
  };

  const startsAt = parseStart();
  const localDate = startsAt?.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const localTime = startsAt?.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    await onAddToCart(course.id, course.teacherId);
    setIsSubmitting(false);
  };

  const handleBuyNow = () => setIsPaymentModalOpen(true);

  const handlePurchaseSuccess = async (invoiceData: any) => {
    setIsEnrolledLocal(true);
    setCourse((prev) => ({ ...prev, isEnrolled: true }));
    setPurchasedInvoice(invoiceData);
    setIsInvoiceOpen(true);
    setIsSyncing(true);
    await refreshEnrollments();
    setIsSyncing(false);

    enqueueSnackbar('تم تفعيل الاشتراك بنجاح', { variant: 'success' });
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: shadow.main, height: '550px', display: 'flex', flexDirection: 'column', p: '20px 16px 16px' }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
          <CardMedia component="img" image={liveCourse.coverImagePath} alt={liveCourse.title} sx={{ height: 270, width: '100%', objectFit: 'fill' }} />
          {liveCourse.status && (
            <Chip label={liveCourse.status} size="small" sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#FFE5E5', color: '#B30505', fontWeight: 700 }} />
          )}
        </Box>

        <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
          <Typography variant="caption" sx={{ backgroundColor: '#FFF6E4', color: warning.main, fontWeight: 600, fontSize: 14, borderRadius: '30px', padding: '14px', width: 'fit-content' }}>
            {course.courseCategory}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}>{course.title}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: text.primary, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image src={course.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} />
              {course.teacherName}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>{course.totalHours} {t('Label.hours')}</Typography>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: '14px', color: '#666' }}>{localDate}</Typography>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>{localTime}</Typography>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>{course.price} AED</Typography>
          </Stack>
        </Stack>

        {isEnrolledLocal ? (
          <Button
            variant="contained"
            disabled={isSyncing}
            onClick={() => {
              if (currentEnrollment?.id) {
                setIsSessionDialogOpen(true);
              } else {
                enqueueSnackbar("جاري مزامنة بيانات الاشتراك...", { variant: 'info' });
                refreshEnrollments();
              }
            }}
            sx={{ backgroundColor: primary.main, color: 'white', width: '90%', m: 'auto', borderRadius: 4 }}
          >
            {isSyncing ? <CircularProgress size={20} color="inherit" /> : 'انضم الآن'}
          </Button>
        ) : (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button variant="contained" fullWidth onClick={handleBuyNow} sx={{ borderRadius: '50px', backgroundColor: '#56b0d3', height: 45 }}>شراء الدرس</Button>
            <Button variant="outlined" fullWidth onClick={handleAddToCart} disabled={isSubmitting} sx={{ py: 1.2, borderRadius: '50px' }}>
              {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'أضف للسلة'}
            </Button>
          </Stack>
        )}
      </Card>

      {purchasedInvoice && (
        <Dialog open={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} maxWidth="md" fullWidth dir="rtl">
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            تفاصيل الفاتورة
            <IconButton onClick={() => setIsInvoiceOpen(false)} color="error">
              <Icon icon="mingcute:close-line" />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <InvoiceDetails invoice={purchasedInvoice} />
          </DialogContent>
        </Dialog>
      )}

      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        lesson={course}
        paymentList={paymentList}
        teacherId={teacherId}
        onSuccessPurchase={handlePurchaseSuccess}
      />

      <SessionDialog
        open={isSessionDialogOpen}
        onClose={() => setIsSessionDialogOpen(false)}
        enrollmentId={currentEnrollment?.id || ""}
        type="course"
      />
    </>
  );
}