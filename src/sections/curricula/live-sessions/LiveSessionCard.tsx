"use client"

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { useTheme } from '@mui/material/styles';
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

import Image from 'src/components/image';
import { text, shadow, primary, warning } from 'src/theme/palette';
import { ILiveSubject } from 'src/types/liveSubject';
import { getData, postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { invalidateTag } from 'src/actions/cache-invalidation';
import { FetchTags } from 'src/actions/config-actions';

import SessionDialog from './SessionDialog';
import InvoiceDetails from 'src/sections/invoice/invoiceDetails';

// ----------------------------------------------------------------------

interface LiveSessionCardProps {
  lessonList: ILiveSubject[];
  teacher_id: string;
  paymentList: any[];
  onAddToCart?: (id: string) => Promise<void>;
  enrollments: any[];
}

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  lesson: ILiveSubject & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
  paymentList: any[];
  teacherId: string;
  onSuccessPurchase?: (invoiceData: any) => void;
}

interface LiveSessionCardPropsItem {
  liveCourse: ILiveSubject;
  onAddToCart: (id: string) => Promise<void>;
  paymentList: any[];
  teacherId: string;
  enrollments: any[];
  refreshEnrollments: () => Promise<void>;
}

// ----------------------------------------------------------------------

export default function LiveSessionCard({ lessonList, teacher_id, paymentList, enrollments }: LiveSessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [localEnrollments, setLocalEnrollments] = useState<any[]>(enrollments || []);

  useEffect(() => {
    setLocalEnrollments(enrollments || []);
  }, [enrollments]);

  const refreshEnrollments = useCallback(async () => {
    try {
      const res = await getData<any>(endpoints.liveSessionSubjectEnrollments.get);
      if (res?.success) {
        setLocalEnrollments(res.data.items || []);
      }
    } catch (error) {
      console.error("Failed to refresh subject enrollments:", error);
    }
  }, []);

  const onAddToCart = async (id: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '5',
      teacherId: teacher_id,
      liveSessionSubjectId: id || '',
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
            <Grid item xs={12} sm={6} md={4} lg={4} key={lesson.id}>
              <LiveSessionCards
                liveCourse={lesson}
                paymentList={paymentList}
                teacherId={teacher_id}
                onAddToCart={onAddToCart}
                enrollments={localEnrollments}
                refreshEnrollments={refreshEnrollments}
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

  const VAT_PERCENTAGE = 0.15;
  const subtotal = lesson.coursePrice || lesson.price || 0;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const total = subtotal + vatAmount;

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
        itemType: '5',
        liveSessionSubjectId: lesson.id || '',
        teacherId: teacherId,
      });

      if (checkoutRes.success && checkoutRes.data?.invoiceId) {
        try {
          invalidateTag(FetchTags.LiveSubject);
        } catch (e) { }

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
          <Typography variant="subtitle1" fontWeight="bold">
            {lesson.courseTitle || lesson.title}
          </Typography>
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
            <Typography color="text.secondary">ضريبة (15%)</Typography>
            <Typography>{vatAmount.toFixed(2)} درهم</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">{total.toFixed(2)} درهم</Typography>
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
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const currentEnrollment = enrollments?.find(item => item.liveSessionSubjectId === liveCourse.id);
  const [isEnrolledLocal, setIsEnrolledLocal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsEnrolledLocal(!!currentEnrollment);
  }, [currentEnrollment]);

  const [course, setCourse] = useState(liveCourse);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [purchasedInvoice, setPurchasedInvoice] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const parseStart = () => {
    if (!course.date || !course.time) return null;
    const dateOnly = course.date.split('T')[0];
    return new Date(`${dateOnly}T${course.time}Z`);
  };

  const startsAt = parseStart();
  const localDate = startsAt?.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const localTime = startsAt?.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    await onAddToCart(course.id || '');
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
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: shadow.main, height: '550px', display: 'flex', flexDirection: 'column', p: '20px 16px 16px' }}>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
          <CardMedia component="img" image={course.coverImagePath} alt={course.title} sx={{ height: 270, width: '100%', objectFit: 'fill' }} />
          {liveCourse.status && (
            <Chip label="مباشر" size="small" sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#FFE5E5', color: '#B30505', fontWeight: 700 }} />
          )}
        </Box>

        <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
          <Typography variant="caption" sx={{ backgroundColor: '#FFF6E4', color: warning.main, fontWeight: 600, fontSize: 14, borderRadius: '30px', padding: '14px', width: 'fit-content', display: 'flex', alignItems: 'center' }}>
            <img src={course.educationSubjectImagePath} alt="" width={20} height={20} style={{ marginLeft: '5px' }} />
            {liveCourse.educationSubject}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}>{liveCourse.title}</Typography>

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
                enqueueSnackbar("جاري جلب تفاصيل الاشتراك...", { variant: 'info' });
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

      <SessionDialog
        open={isSessionDialogOpen}
        onClose={() => setIsSessionDialogOpen(false)}
        enrollmentId={currentEnrollment?.id || ""}
        type="subject"
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        lesson={liveCourse}
        paymentList={paymentList}
        teacherId={teacherId}
        onSuccessPurchase={handlePurchaseSuccess}
      />

      {purchasedInvoice && (
        <Dialog open={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} maxWidth="md" fullWidth dir="rtl">
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            تفاصيل الفاتورة
            <IconButton onClick={() => setIsInvoiceOpen(false)} color="error"><Icon icon="mingcute:close-line" /></IconButton>
          </DialogTitle>
          <DialogContent dividers><InvoiceDetails invoice={purchasedInvoice} /></DialogContent>
        </Dialog>
      )}
    </>
  );
}