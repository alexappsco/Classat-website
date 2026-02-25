'use client';

import { useSnackbar } from 'notistack';
import { text } from 'src/theme/palette';
import { useMemo, useState } from 'react';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

// ===== Helpers =====

// Convert English day names to Arabic
const getArabicDayName = (dayOfWeek: string): string => {
  const dayMap: Record<string, string> = {
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
  };
  return dayMap[dayOfWeek] || dayOfWeek;
};

// Format date from ISO (2026-02-09) → DD/MM
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

// Convert date to ISO format for API (2026-03-01T00:00:00.000Z)
const formatDateForAPI = (dateString: string): string => {
  return new Date(dateString).toISOString();
};

// Convert 24h time to Arabic format
const formatTimeToArabic = (time24: string): string => {
  const [hours, minutes = '00'] = time24.split(':');
  const hour = Number(hours);

  if (hour === 0) return `12:${minutes} صباحاً`;
  if (hour < 12) return `${hour}:${minutes} صباحاً`;
  if (hour === 12) return `12:${minutes} ظهراً`;
  return `${hour - 12}:${minutes} مساء`;
};

// Format time slot
const formatTimeSlot = (startTime: string, endTime: string): string =>
  `${formatTimeToArabic(startTime)} - ${formatTimeToArabic(endTime)}`;

// ===== Types =====

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface Appointment {
  dayOfWeek: string;
  date: string;
  timeSlots: TimeSlot[];
}

interface Props {
  title: string;
  studentAppointments: Appointment[] | null;
  paymentList: any[] | null;
  teacherId: string;
  educationApproachTypeStageGradeSubjectId: string;
}

// Session model with ID from API
interface SelectedSession {
  id: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
}

// ===== Component =====

export default function LiveSectionTimeDetails({
  title: _,
  studentAppointments,
  paymentList,
  teacherId,
  educationApproachTypeStageGradeSubjectId,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;

  // State for selected sessions
  const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transform API data → UI format
  const availableSlots = useMemo(() => {
    if (!studentAppointments?.length) return [];

    return studentAppointments.map((appointment) => ({
      dayLabel: getArabicDayName(appointment.dayOfWeek),
      dateLabel: formatDate(appointment.date),
      dayOfWeek: appointment.dayOfWeek,
      date: appointment.date,
      times: appointment.timeSlots.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        formattedTime: formatTimeSlot(slot.startTime, slot.endTime),
      })),
    }));
  }, [studentAppointments]);

  // Check if a session is selected by its ID
  const isSessionSelected = (id: string) => {
    return selectedSessions.some((session) => session.id === id);
  };

  // Toggle session selection
  const toggleSession = (id: string, dayOfWeek: string, date: string, startTime: string, endTime: string) => {
    setSelectedSessions((prev) => {
      const isSelected = prev.some((session) => session.id === id);

      if (isSelected) {
        // Remove session by ID
        return prev.filter((session) => session.id !== id);
      } else {
        // Add session with all details including ID
        return [
          ...prev,
          {
            id,
            day: dayOfWeek,
            date,
            startTime,
            endTime,
          },
        ];
      }
    });
  };

  // Handle Buy Now - open payment modal if sessions are selected
  const handleBuyNow = () => {
    if (selectedSessions.length === 0) {
      enqueueSnackbar('يرجى اختيار موعد واحد على الأقل', { variant: 'warning' });
      return;
    }

    setIsPaymentModalOpen(true);
  };

  // Handle payment confirmation - UPDATED to match the exact API format
  const handleConfirmPayment = async (paymentMethodId: string) => {
    if (!paymentMethodId) {
      enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert selected sessions to the format expected by the API
      const sessionsForApi = selectedSessions.map((session) => ({
        sessionDate: formatDateForAPI(session.date), // Convert date to ISO format
        teacherTimeSlotId: session.id, // Use the ID from the time slot
      }));

      // Prepare request body matching the exact API format
      const requestBody = {
        paymentMethodId: paymentMethodId,
        itemType: 'TeacherEducationApproachGrade', // Using EducationalLesson as per your example
        educationApproachTypeStageGradeSubjectId: educationApproachTypeStageGradeSubjectId,
        teacherId: teacherId,
        sessions: sessionsForApi,
      };

      console.log('Request Body:', requestBody); // For debugging

      const response = await postData(endpoints.payment.post_single_item, requestBody);

      if (response.success || response.status === 204) {
        enqueueSnackbar('تم شراء الحصص بنجاح', { variant: 'success' });
        setIsPaymentModalOpen(false);
        setSelectedSessions([]); // Clear selected sessions after successful purchase
        // You might want to redirect or refresh the page
      } else {
        enqueueSnackbar(response.error || 'فشلت عملية الدفع', { variant: 'error' });
      }
    } catch (error) {
      console.error('Payment error:', error);
      enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total price (you'll need to get the price from your data)
  const calculateTotalPrice = () => {
    // Implement this based on your pricing logic
    // For example, if each session has a price:
    // return selectedSessions.reduce((total, session) => total + (session.price || 0), 0);
    return 0; // Placeholder - replace with actual price calculation
  };

  return (
    <Box>
      <Container>
        {/* Section Title */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: primaryTextColor }}>
            جدول المواعيد المتاحة
          </Typography>

          {/* Selected count and Buy Now button */}
          {selectedSessions.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: primaryTextColor }}>
                تم اختيار {selectedSessions.length} حصة
              </Typography>
              <Button
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  borderRadius: '50px',
                  backgroundColor: '#28A8DD',
                  '&:hover': { backgroundColor: '#1D8FBF' },
                }}
              >
                شراء المحدد
              </Button>
            </Box>
          )}
        </Box>

        {/* Schedule */}
        <Box sx={{ overflowX: 'auto', pb: 2 }}>
          {availableSlots.length > 0 ? (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {availableSlots.map((day, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: 202,
                    borderRadius: 4,
                    backgroundColor: '#E5F7FF',
                    p: 2,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Day & Date */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      fontWeight: 700,
                      fontSize: 14,
                      color: primaryTextColor,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '6px',
                        border: '2px solid #4BA9D8',
                        position: 'relative',
                        mr: 1,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          bgcolor: '#4BA9D8',
                          borderTopLeftRadius: '4px',
                          borderTopRightRadius: '4px',
                        }}
                      />
                    </Box>

                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {`${day.dayLabel} ${day.dateLabel}`}
                    </Typography>
                  </Box>

                  {/* Time Slots */}
                  <Stack spacing={1}>
                    {day.times.map((time, idx) => {
                      const isSelected = isSessionSelected(time.id);

                      return (
                        <Button
                          key={time.id}
                          variant="contained"
                          fullWidth
                          onClick={() => toggleSession(
                            time.id,
                            day.dayOfWeek,
                            day.date,
                            time.startTime,
                            time.endTime
                          )}
                          sx={{
                            borderRadius: '999px',
                            backgroundColor: isSelected ? '#4CAF50' : '#28A8DD',
                            py: 0.5,
                            '&:hover': {
                              backgroundColor: isSelected ? '#45a049' : '#1D8FBF',
                            },
                          }}
                        >
                          {time.formattedTime}
                          {isSelected && ' ✓'}
                        </Button>
                      );
                    })}
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: paragraphTextColor }}>
                لا توجد مواعيد متاحة حالياً
              </Typography>
            </Box>
          )}
        </Box>

        {/* Payment Modal */}
        <PaymentModal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={handleConfirmPayment}
          paymentList={paymentList}
          totalPrice={calculateTotalPrice()}
          selectedSessionsCount={selectedSessions.length}
          isSubmitting={isSubmitting}
        />
      </Container>
    </Box>
  );
}

// Payment Modal Component
function PaymentModal({
  open,
  onClose,
  onConfirm,
  paymentList,
  totalPrice,
  selectedSessionsCount,
  isSubmitting,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentMethodId: string) => Promise<void>;
  paymentList: any[] | null;
  totalPrice: number;
  selectedSessionsCount: number;
  isSubmitting: boolean;
}) {
  const [selectedMethod, setSelectedMethod] = useState('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        إتمام شراء الحصص
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            عدد الحصص المحددة: {selectedSessionsCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            الإجمالي: {totalPrice} درهم
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
          اختر وسيلة الدفع
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            {paymentList?.map((method) => (
              <Card
                key={method.id}
                sx={{
                  mb: 1.5,
                  p: 1,
                  border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
                  borderRadius: 2,
                  cursor: 'pointer',
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
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: '50px', px: 3 }} disabled={isSubmitting}>
          إلغاء
        </Button>
        <Button
          onClick={() => onConfirm(selectedMethod)}
          variant="contained"
          sx={{ borderRadius: '50px', px: 3, bgcolor: '#56b0d3' }}
          disabled={isSubmitting || !selectedMethod}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Import missing MUI components
import {
  Radio,
  Dialog,
  RadioGroup,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';