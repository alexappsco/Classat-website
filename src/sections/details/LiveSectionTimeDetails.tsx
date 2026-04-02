'use client';

import { useSnackbar } from 'notistack';
import { endpoints } from 'src/utils/endpoints';
import { getData, postData } from 'src/utils/crud-fetch-api';
import { useMemo, useState, useEffect, useCallback } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box, Card, Stack, Radio, Button, Dialog, Container,
  TextField, Typography, RadioGroup, IconButton, DialogTitle, DialogContent, DialogActions, InputAdornment, CircularProgress
} from '@mui/material';
import InvoiceDialog from '../invoice/InvoiceDialog';

// ===== Helpers =====
const getArabicDayName = (dayOfWeek: string): string => {
  const dayMap: Record<string, string> = {
    Sunday: 'الأحد', Monday: 'الاثنين', Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء', Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت',
  };
  return dayMap[dayOfWeek] || dayOfWeek;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatTimeToArabic = (time24: string): string => {
  const [hours, minutes = '00'] = time24.split(':');
  const hour = Number(hours);
  if (hour === 0) return `12:${minutes} صباحاً`;
  if (hour < 12) return `${hour}:${minutes} صباحاً`;
  if (hour === 12) return `12:${minutes} ظهراً`;
  return `${hour - 12}:${minutes} مساء`;
};

// ===== Types =====
interface PackageSubscription {
  subscriptionId: string;
  packageName: string;
  // Add other fields as needed
}

interface PackageSubscriptionsResponse {
  items: PackageSubscription[];
}

// ===== Main Component =====
interface Props {
  studentAppointments: any[] | null;
  paymentList: any[] | null;
  teacherId: string;
  educationApproachTypeStageGradeSubjectId: string;
  title: string;
}

export default function LiveSectionTimeDetails({
  studentAppointments,
  paymentList,
  teacherId,
  educationApproachTypeStageGradeSubjectId,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedSessions, setSelectedSessions] = useState<{ id: string; date: string }[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherPackages, setTeacherPackages] = useState<any[]>([]);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  // جلب الباقات المتاحة للطالب
  const fetchPackages = useCallback(async () => {
    try {
      const response = await getData<PackageSubscriptionsResponse>(endpoints.payment.packageSubscriptions(teacherId));
      if (response.success && response.data?.items) {
        setTeacherPackages(response.data.items);
      }
    } catch {
      // Silently handle errors - could add logging service here
    }
  }, [teacherId]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const scheduleData = useMemo(() => {
    if (!studentAppointments) return [];
    return studentAppointments.map((apt) => ({
      label: `${getArabicDayName(apt.dayOfWeek)} ${formatDate(apt.date)}`,
      date: apt.date,
      slots: apt.timeSlots,
    }));
  }, [studentAppointments]);

  const toggleSession = (id: string, date: string) => {
    setSelectedSessions((prev) => {
      const exists = prev.find((s) => s.id === id);
      return exists ? prev.filter((s) => s.id !== id) : [...prev, { id, date }];
    });
  };

  const handleFinalSubmit = async (selectionId: string, isPackage: boolean, coupon: string) => {
    setIsSubmitting(true);
    try {
      const sessions = selectedSessions.map(s => ({
        sessionDate: new Date(s.date).toISOString(),
        teacherTimeSlotId: s.id
      }));

      const endpoint = isPackage
        ? endpoints.payment.bookSessions(selectionId)
        : endpoints.payment.post_single_item;

      const body = isPackage
        ? { educationApproachTypeStageGradeSubjectId, sessions }
        : {
            paymentMethodId: selectionId,
            itemType: 'TeacherEducationApproachGrade',
            educationApproachTypeStageGradeSubjectId,
            teacherId,
            sessions,
            couponCode: coupon || null
          };

      // const response = await postData(endpoint, body);
      const response: any = await postData(endpoint, body);

      // if (response.success || response.status === 204) {
      //   enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });
      //   setIsPaymentModalOpen(false);
      //   setSelectedSessions([]);
      //   fetchPackages();
      // } else {
      //   enqueueSnackbar(response.error || 'فشلت العملية', { variant: 'error' });
      // }
      if (response?.data?.invoiceId ) {
  enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });

  setIsPaymentModalOpen(false); // سكّر Dialog الدفع

  setInvoiceId(response.data.invoiceId); // خزّن ID الفاتورة

  setOpenInvoiceDialog(true); // افتح Dialog الفاتورة

  setSelectedSessions([]);
  fetchPackages();
} else {
  enqueueSnackbar('فشلت العملية', { variant: 'error' });
}
    } catch {
      enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container sx={{ py: 4 }} dir="rtl">
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={800}>جدول المواعيد المتاحة</Typography>
        {selectedSessions.length > 0 && (
          <Button
            variant="contained"
            onClick={() => setIsPaymentModalOpen(true)}
            sx={{ borderRadius: 50, px: 4, bgcolor: '#28A8DD' }}
          >
            إتمام الحجز ({selectedSessions.length})
          </Button>
        )}
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {scheduleData.map((day, idx) => (
          <Card key={idx} sx={{ minWidth: 200, p: 2, bgcolor: '#F0F9FF', borderRadius: 3, border: '1px solid #E0F2FE' }}>
            <Typography variant="subtitle2" textAlign="center" fontWeight={700} sx={{ mb: 2 }}>{day.label}</Typography>
            <Stack spacing={1.5}>
              {day.slots.map((slot: any) => {
                const isSelected = selectedSessions.some((s) => s.id === slot.id);
                return (
                  <Button
                    key={slot.id}
                    fullWidth
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => toggleSession(slot.id, day.date)}
                    sx={{
                      borderRadius: 2, fontSize: '0.8rem',
                      bgcolor: isSelected ? '#4CAF50' : 'transparent',
                      color: isSelected ? 'white' : 'primary.main'
                    }}
                  >
                    {formatTimeToArabic(slot.startTime)} {isSelected && '✓'}
                  </Button>
                );
              })}
            </Stack>
          </Card>
        ))}
      </Box>

      <PaymentDialog
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleFinalSubmit}
        paymentList={paymentList}
        packages={teacherPackages}
        isSubmitting={isSubmitting}
      />
      <InvoiceDialog
  open={openInvoiceDialog}
  onClose={() => setOpenInvoiceDialog(false)}
  invoiceId={invoiceId}
/>
    </Container>
  );
}

// ===== Payment Dialog (المحاكاة للصورة المطلوبة) =====
function PaymentDialog({ open, onClose, onConfirm, paymentList, packages, isSubmitting }: any) {
  const [method, setMethod] = useState({ id: '', isPackage: false });
  const [coupon, setCoupon] = useState('');

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" dir="rtl" sx={{ '& .MuiDialog-paper': { borderRadius: 4, p: 1 } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 800 }}>اختر طريقة الدفع</DialogTitle>

      <DialogContent>
        {/* طرق الدفع الإلكتروني */}
        <RadioGroup value={method.isPackage ? '' : method.id}>
          {paymentList?.map((item: any) => (
            <Card
              key={item.id}
              onClick={() => setMethod({ id: item.id, isPackage: false })}
              sx={{
                mb: 1.5, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                border: (!method.isPackage && method.id === item.id) ? '2px solid #28A8DD' : '1px solid #EEE',
                borderRadius: 3, cursor: 'pointer', boxShadow: 'none'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {item.logo && <Box component="img" src={item.logo} sx={{ width: 28 }} />}
                <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
              </Stack>
              <Radio checked={!method.isPackage && method.id === item.id} />
            </Card>
          ))}
        </RadioGroup>

        {/* الدفع بالباقة (كما في الصورة) */}
        {packages.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>أو دفع باستخدام الباقة</Typography>
            {packages.map((pkg: any) => (
              <Card
                key={pkg.subscriptionId}
                onClick={() => setMethod({ id: pkg.subscriptionId, isPackage: true })}
                sx={{
                  p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: (method.isPackage && method.id === pkg.subscriptionId) ? '2px solid #4CAF50' : '1px solid #EEE',
                  borderRadius: 3, cursor: 'pointer', boxShadow: 'none',mb:1.5
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ bgcolor: '#4CAF50', width: 30, height: 30, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>P</Box>
                  <Typography variant="body2" fontWeight={600}>{pkg.packageName}</Typography>
                </Stack>
                <Radio checked={method.isPackage && method.id === pkg.subscriptionId} color="success" />
              </Card>
            ))}
          </Box>
        )}

        {/* كويون الخصم */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>كوبون الخصم</Typography>
          <TextField
            fullWidth
            placeholder="كود الخصم"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end"><ArrowBackIosNewIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} /></IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3, bgcolor: '#F9FAFB' }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onConfirm(method.id, method.isPackage, coupon)}
          disabled={!method.id || isSubmitting}
          sx={{ bgcolor: '#0B3547', py: 1.5, borderRadius: 3, fontSize: '1.1rem', fontWeight: 700, '&:hover': { bgcolor: '#082836' } }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'ادفع'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}