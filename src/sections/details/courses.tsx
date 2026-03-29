import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
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
} from '@mui/material';

export default function EducationalLessons({ lessonList, teacher_id, paymentList }: { lessonList: any[]; teacher_id: string; paymentList: any[] }) {
  const { enqueueSnackbar } = useSnackbar();

  const onAddToCart = async (courseId: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '1',
      teacherId: teacher_id,
      educationalLessonId: courseId,
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
          {lessonList.map((lesson, index) => (
            <Grid item xs={12} key={lesson.lessonId || lesson.courseId || index}>
              <LessonCard
                lesson={lesson}
                onAddToCart={onAddToCart}
                paymentList={paymentList}
                teacherId={teacher_id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Payment Modal Component
function PaymentModal({ open, onClose, lesson, paymentList, teacherId }: {
  open: boolean;
  onClose: () => void;
  lesson: any;
  paymentList: any[];
  teacherId: string;
}) {
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
        itemType: 'EducationalLesson', // Using EducationalLesson type
        educationalLessonId: lesson.courseId || lesson.lessonId, // Send the lesson ID
        teacherId: teacherId,
      });

      if (checkoutRes.success || checkoutRes.status === 204) {
        enqueueSnackbar('تم شراء الدرس بنجاح', { variant: 'success' });
        onClose();
        // You might want to redirect to success page or refresh the page
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

// Updated LessonCard component (renamed from CourseCard)
function LessonCard({ lesson, onAddToCart, paymentList, teacherId }: {
  lesson: any;
  onAddToCart: (id: string) => Promise<void>;
  paymentList: any[];
  teacherId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    await onAddToCart(lesson.courseId || lesson.lessonId);
    setIsSubmitting(false);
  };

  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
  };

  // Calculate VAT and total for display in the card
  const VAT_PERCENTAGE = 0.15;
  const subtotal = lesson.coursePrice || lesson.price || 0;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const totalWithVat = subtotal + vatAmount;

  return (
    <>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
            {/* Lesson Info Section */}
            <Box sx={{ flex: 1, mr: { md: 3 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {lesson.courseTitle || lesson.title}
              </Typography>

              {lesson.sections?.map((section: any) => (
                <Accordion key={section.sectionId} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<Icon icon="material-symbols:expand-more" />}>
                    <Typography>{section.sectionTitle}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {section.secsions?.map((lessonItem: any) => (
                        <ListItem key={lessonItem.secsionId}>
                          <Icon icon="material-symbols:play-circle-outline" />
                          <ListItemText
                            primary={lessonItem.secsionTitle}
                            secondary={
                              <Button size="small" href={lessonItem.videoUrl} target="_blank">
                                مشاهدة الفيديو
                              </Button>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            {/* Pricing Sidebar */}
            <Box
              sx={{
                width: { xs: '100%', md: '350px' },
                p: 3,
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: 4,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ color: '#e67e22', fontWeight: 'bold', mb: 1 }}
              >
                {subtotal} درهم
              </Typography>

              {/* Show VAT info in the card */}
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                شامل ضريبة القيمة المضافة 15%: {totalWithVat.toFixed(2)} درهم
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
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
                <IconButton
                  sx={{
                    border: '1px solid #56b0d3',
                    color: '#2c3e50',
                    width: 45,
                    height: 45,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(86, 176, 211, 0.04)',
                      borderColor: '#459dbf',
                    },
                  }}
                >
                  <Icon icon="solar:heart-linear" width="22" height="22" />
                </IconButton>
              </Stack>

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
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#459dbf',
                    backgroundColor: 'rgba(86, 176, 211, 0.04)',
                  },
                }}
              >
                {isSubmitting ? 'جاري الإضافة...' : 'أضف إلى السلة'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Payment Modal with VAT */}
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        lesson={lesson}
        paymentList={paymentList}
        teacherId={teacherId}
      />
    </>
  );
}