// 'use client';

// import { useRouter } from 'next/navigation';
// import { useSnackbar } from 'notistack';
// import { useState, useEffect } from 'react';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import {
//   Box,
//   Card,
//   Stack,
//   alpha,
//   Avatar,
//   Button,
//   Divider,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   RadioGroup,
//   Radio,
//   FormControl,
//   CircularProgress,
// } from '@mui/material';
// import { postData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// interface Props {
//   course: any;
//   paymentList: any[];
// }

// export default function MyCoursesCard({
//   course,
//   paymentList,
// }: Props) {
//   console.log("course data", course);
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onAddToCart = async (courseId: string) => {
//     const res = await postData(endpoints.cart.addToCart, {
//       itemType: '4',
//       teacherId: course.teacherId || '',
//       courseId: courseId,
//     });

//     if (res.success) {
//       enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
//     } else {
//       enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
//     }
//   };

//   const handleCardClick = () => {
//     if (course.isEnrolled) {
//       router.push(`/mycourses/${course.courseId}`);
//     } else {
//       router.push(`/courses/course/${course.courseId}`);
//     }
//   };

//   const handleBuyNowClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent card click
//     setIsPaymentModalOpen(true);
//   };

//   const handleAddToCartClick = async (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent card click
//     setIsSubmitting(true);
//     try {
//       await onAddToCart(course.courseId);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           p: 1.5,
//           height: '100%',
//           borderRadius: 2.5,
//           display: 'flex',
//           flexDirection: 'column',
//           transition: 'all 0.3s ease',
//           border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//           '&:hover': {
//             transform: 'translateY(-4px)',
//             boxShadow: (theme) => `0 12px 24px -4px ${alpha(theme.palette.common.black, 0.1)}`,
//           },
//           cursor: 'pointer',
//         }}
//         onClick={handleCardClick}
//       >
//         {/* الصورة */}
//         <Box sx={{ position: 'relative', pt: '60%', overflow: 'hidden', borderRadius: 2 }}>
//           <Box
//             component="img"
//             src={course.coverImageUrl || '/assets/placeholder/course.jpg'}
//             alt={course.title}
//             sx={{ top: 0, width: 1, height: 1, position: 'absolute', objectFit: 'cover' }}
//           />
//         </Box>

//         <Stack spacing={2} sx={{ pt: 2, flexGrow: 1 }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, height: 44, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
//             {course.title}
//           </Typography>

//           <Stack direction="row" alignItems="center" spacing={1}>
//             <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>{course.teacherName?.charAt(0)}</Avatar>
//             <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{course.teacherName}</Typography>
//           </Stack>

//           <Box sx={{ flexGrow: 1 }} />
//           <Divider sx={{ borderStyle: 'dashed' }} />

//           {/* قسم الأزرار المشروط */}
//           <Box sx={{ mt: 1 }} onClick={(e) => e.stopPropagation()}>
//             {course.isEnrolled ? (
//               // حالة المشترك: زر استئناف
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="success"
//                 startIcon={<PlayArrowIcon />}
//                 onClick={() => router.push(`/mycourses/${course.courseId}`)}
//                 sx={{ borderRadius: 1.5, fontWeight: 700 }}
//               >
//                 استئناف التعلم
//               </Button>
//             ) : (
//               // حالة غير مشترك: شراء وإضافة للسلة
//               <Stack direction="row" spacing={1}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   onClick={handleBuyNowClick}
//                   sx={{
//                     borderRadius: 1.5,
//                     fontWeight: 700,
//                     whiteSpace: 'nowrap',
//                     backgroundColor: '#56b0d3',
//                     '&:hover': { backgroundColor: '#459dbf' }
//                   }}
//                 >
//                   شراء الآن
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={handleAddToCartClick}
//                   disabled={isSubmitting}
//                   sx={{
//                     borderRadius: 1.5,
//                     minWidth: 48,
//                     px: 0,
//                     borderColor: '#56b0d3',
//                     color: '#2c3e50',
//                     '&:hover': {
//                       borderColor: '#459dbf',
//                       backgroundColor: 'rgba(86, 176, 211, 0.04)',
//                     }
//                   }}
//                 >
//                   {isSubmitting ? <CircularProgress size={20} /> : <ShoppingCartIcon fontSize="small" />}
//                 </Button>
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Card>

//       {/* Payment Modal */}
//       <PaymentModal
//         open={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         course={course}
//         paymentList={paymentList}
//         onSuccess={() => {
//           enqueueSnackbar('تم شراء الكورس بنجاح', { variant: 'success' });
//         }}
//       />
//     </>
//   );
// }

// // Payment Modal Component
// function PaymentModal({
//   open,
//   onClose,
//   course,
//   paymentList,
//   onSuccess
// }: {
//   open: boolean;
//   onClose: () => void;
//   course: any;
//   paymentList: any[];
//   onSuccess?: () => void;
// }) {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   // Calculate VAT and totals
//   const VAT_PERCENTAGE = 0.15; // 15%
//   const subtotal = course?.price || 0;
//   const vatAmount = subtotal * VAT_PERCENTAGE;
//   const total = subtotal + vatAmount;

//   // Set first payment method as default when modal opens
//   useEffect(() => {
//     if (paymentList && paymentList.length > 0 && !selectedMethod) {
//       setSelectedMethod(paymentList[0].id);
//     }
//   }, [paymentList, selectedMethod]);

//   const handleBuyNow = async () => {
//     if (!selectedMethod) {
//       enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const checkoutRes = await postData(endpoints.payment.post_single_item, {
//         paymentMethodId: selectedMethod,
//         itemType: 'Course',
//         courseId: course.courseId,
//         teacherId: course?.teacherId,
//       });

//       if (checkoutRes.success || checkoutRes.status === 204) {
//         enqueueSnackbar('تم شراء الكورس بنجاح', { variant: 'success' });
//         onSuccess?.();
//         onClose();
//       } else {
//         enqueueSnackbar(checkoutRes.error || 'فشلت عملية الدفع', { variant: 'error' });
//       }
//     } catch (error) {
//       enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       dir="rtl"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         إتمام شراء الكورس
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {course?.title}
//           </Typography>
//         </Box>

//         <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
//           اختر وسيلة الدفع
//         </Typography>

//         <FormControl component="fieldset" sx={{ width: '100%' }}>
//           <RadioGroup
//             value={selectedMethod}
//             onChange={(e) => setSelectedMethod(e.target.value)}
//           >
//             {paymentList && paymentList.map((method) => (
//               <Card
//                 key={method.id}
//                 sx={{
//                   mb: 1.5,
//                   p: 1,
//                   border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
//                   borderRadius: 2,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     borderColor: '#00bcd4',
//                   },
//                 }}
//                 onClick={() => setSelectedMethod(method.id)}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Radio checked={selectedMethod === method.id} color="primary" />
//                     <Typography>{method.name}</Typography>
//                   </Box>
//                   {method.logo && (
//                     <Box sx={{ width: 50, height: 30 }}>
//                       <img
//                         src={method.logo}
//                         alt={method.name}
//                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
//                       />
//                     </Box>
//                   )}
//                 </Box>
//               </Card>
//             ))}
//           </RadioGroup>
//         </FormControl>

//         <Divider sx={{ my: 3 }} />

//         {/* Price Breakdown */}
//         <Box sx={{ mb: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">سعر الكورس</Typography>
//             <Typography>{course?.price?.toFixed(2) || 0} درهم</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
//             <Typography>{vatAmount.toFixed(2)} درهم</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">نسبة ربح المنصة {course?.platformProfitPercentage || 0}%</Typography>
//             <Typography>{((course?.platformProfitPercentage || 0) * subtotal).toFixed(2)} درهم</Typography>
//           </Box>
//           <Divider sx={{ my: 1.5 }} />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
//             <Typography variant="h5" color="primary" fontWeight="bold">
//               {course?.priceAfterTaxAndProfit?.toFixed(2) || total.toFixed(2)} درهم
//             </Typography>
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{ borderRadius: '50px', px: 3 }}
//           disabled={isSubmitting}
//         >
//           إلغاء
//         </Button>
//         <Button
//           onClick={handleBuyNow}
//           variant="contained"
//           sx={{
//             borderRadius: '50px',
//             px: 3,
//             bgcolor: '#56b0d3',
//             '&:hover': { bgcolor: '#459dbf' }
//           }}
//           disabled={isSubmitting || !selectedMethod}
//         >
//           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
'use client';

import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Card,
  Stack,
  alpha,
  Avatar,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import Image from 'src/components/image';


interface Props {
  course: any;
  paymentList: any[];
}

export default function MyCoursesCard({
  course,
  paymentList,
}: Props) {
  console.log("Single course data:", course); // This will now log a single course object
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract course data with fallbacks
  const {
    courseId,
    title,
    coverImageUrl,
    teacherName,
    teacherId,
    price,
    priceAfterTaxAndProfit,
    platformProfitPercentage,
    isEnrolled,
    totalHours,
    totalMinutes,
    numberOfLessons,
    categoryName,
    averageRating,
    teacherImageUrl,
  } = course || {};

  const onAddToCart = async (courseId: string) => {
    const res = await postData(endpoints.cart.addToCart, {
      itemType: '4',
      teacherId: teacherId || '',
      courseId: courseId,
    });

    if (res.success) {
      enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
    }
  };

  const handleCardClick = () => {
    if (isEnrolled) {
      router.push(`/mycourses/${courseId}`);
    } else {
      router.push(`/courses/course/${courseId}`);
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsPaymentModalOpen(true);
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
        sx={{
          p: 1.5,
          height: '100%',
          borderRadius: 2.5,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 12px 24px -4px ${alpha(theme.palette.common.black, 0.1)}`,
          },
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        {/* Image with category badge */}
        <Box sx={{ position: 'relative', pt: '60%', overflow: 'hidden', borderRadius: 2 }}>
          <Box
            component="img"
            src={coverImageUrl || '/assets/placeholder/course.jpg'}
            alt={title}
            sx={{ top: 0, width: 1, height: 1, position: 'absolute', objectFit: 'cover' }}
          />

          {/* Category Badge */}
          {categoryName && (
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#FFA000',
                fontWeight: 600,
                fontSize: 12,
                borderRadius: '30px',
                padding: '4px 12px',
                zIndex: 5,
              }}
            >
              {categoryName}
            </Typography>
          )}
        </Box>

        <Stack spacing={1.5} sx={{ pt: 2, flexGrow: 1 }}>
          {/* Rating */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
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
              ⭐ {averageRating?.toFixed(1) || '0.0'}
            </Typography>
          </Stack>

          {/* Title */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              height: 44,
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>

          {/* Lessons and Time */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ color: 'text.secondary' }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box component="span" sx={{ fontSize: '14px' }}>📚</Box>
              <Typography variant="body2">{numberOfLessons || 0} دروس</Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Box component="span" sx={{ fontSize: '14px' }}>⏱️</Box>
              <Typography variant="body2">{formatTime()}</Typography>
            </Stack>
          </Stack>

          {/* Instructor */}
        <Stack direction="row" alignItems="center" gap={1}>
              <Image
                src={teacherImageUrl || "/assets/landing-page/live-sessions/instructors/instructor.png"}
                alt={teacherName}
                sx={{ width: 32, height: 32, borderRadius: '50%' }}
              />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
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

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Conditional Buttons */}
          <Box sx={{ mt: 1 }} onClick={(e) => e.stopPropagation()}>
            {isEnrolled ? (
              <Button
                fullWidth
                variant="contained"
                color="success"
                startIcon={<PlayArrowIcon />}
                onClick={() => router.push(`/mycourses/${courseId}`)}
                sx={{ borderRadius: 1.5, fontWeight: 700 }}
              >
                استئناف التعلم  
              </Button>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
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
            )}
          </Box>
        </Stack>
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        course={course}
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
  course,
  paymentList,
  onSuccess
}: {
  open: boolean;
  onClose: () => void;
  course: any;
  paymentList: any[];
  onSuccess?: () => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Calculate VAT and totals
  const VAT_PERCENTAGE = 0.15; // 15%
  const subtotal = course?.price || 0;
  const vatAmount = subtotal * VAT_PERCENTAGE;
  const platformProfit = (course?.platformProfitPercentage || 0) * subtotal;
  const total = course?.priceAfterTaxAndProfit || (subtotal + vatAmount + platformProfit);

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
        courseId: course?.courseId,
        teacherId: course?.teacherId,
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
            {course?.title}
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
            <Typography>{course?.price?.toFixed(2) || 0} درهم</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
            <Typography>{(course?.price * 0.15)?.toFixed(2) || 0} درهم</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">نسبة ربح المنصة {((course?.platformProfitPercentage || 0) * 100)}%</Typography>
            <Typography>{((course?.platformProfitPercentage || 0) * (course?.price || 0)).toFixed(2)} درهم</Typography>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              {course?.priceAfterTaxAndProfit?.toFixed(2) || (subtotal + vatAmount + platformProfit).toFixed(2)} درهم
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