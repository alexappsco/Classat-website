

// import Link from 'next/link';
// import Image from 'src/components/image';
// import { useTheme } from '@mui/material/styles';
// import { text, shadow, primary, warning } from 'src/theme/palette';
// import { ILiveSubject } from 'src/types/liveSubject';
// import { useTranslations } from 'next-intl';

// // Define the props type for the main component
// import {
//   Box,
//   Card,
//   Grid,
//   List,
//   Stack,
//   Radio,
//   Button,
//   Dialog,
//   Divider,
//   ListItem,
//   Accordion,
//   Container,
//   IconButton,
//   Typography,
//   RadioGroup,
//   DialogTitle,
//   CardContent,
//   FormControl,
//   ListItemText,
//   DialogContent,
//   DialogActions,
//   AccordionDetails,
//   AccordionSummary,
//   CircularProgress,
//   Chip,
//   CardMedia,
// } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { postData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import { invalidateTag } from 'src/actions/cache-invalidation';
// import { FetchTags } from 'src/actions/config-actions';
// import SessionDialog from './SessionDialog';

// interface LiveSessionCardProps {
//   lessonList: ILiveSubject[];
//   teacher_id: string;
//   paymentList: any[];
//   onAddToCart?: (id: string) => Promise<void>;

// }

// // Define the props type for the PaymentModal component
// interface PaymentModalProps {
//   open: boolean;
//   onClose: () => void;
//   lesson: ILiveSubject & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
//   paymentList: any[];
//   teacherId: string;
//     onSuccessPurchase?: () => void;

// }
// interface LiveSessionCardPropsItem {
//   liveCourse: ILiveSubject;
//   onAddToCart: (id: string) => Promise<void>;
//   paymentList: any[];
//   teacherId: string;
// }

// export default function LiveSessionCard({ lessonList, teacher_id, paymentList }: LiveSessionCardProps) {
//   const { enqueueSnackbar } = useSnackbar();

//   const onAddToCart = async (id: string) => {
//     const res = await postData(endpoints.cart.addToCart, {
//       itemType: '5',
//       teacherId: teacher_id,
//       liveSessionSubjectId: id || '',
//     });

//     if (res.success) {
//       enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
//     } else {
//       enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
//     }
//   };

//   if (!lessonList || lessonList.length === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" textAlign="center" color="text.secondary">
//           لا توجد دروس متاحة
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Container>
//         <Grid container spacing={3}>
//           {lessonList.map((lesson) => (
//             <Grid item xs={12} sm={6} md={4} lg={4} key={lesson.id}>
//               <LiveSessionCards
//                 liveCourse={lesson}
//                 // onAddToCart={onAddToCart}
//                 paymentList={paymentList}
//                 teacherId={teacher_id}
//                 onAddToCart={onAddToCart}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// // Payment Modal Component
// function PaymentModal({ open, onClose, lesson, paymentList, teacherId,onSuccessPurchase }: PaymentModalProps) {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   // Calculate VAT and totals
//   const VAT_PERCENTAGE = 0.15; // 15%
//   const subtotal = lesson.coursePrice || lesson.price || 0;
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
//       // Direct checkout for educational lesson - matching Flutter implementation
//       const checkoutRes = await postData(endpoints.payment.post_single_item, {
//         paymentMethodId: selectedMethod,
//         itemType: '5', // Using EducationalLesson type
//         liveSessionSubjectId: lesson.id || lesson.id, // Send the lesson ID
//         teacherId: teacherId,
//       });

//       if (checkoutRes.success || checkoutRes.status === 204) {
//         try {
//                  invalidateTag(FetchTags.LiveSubject);
//                } catch (e) {
//                  // fail silently; UI will still update locally
//                }
//                // Locally update UI without full page reload
//                onSuccessPurchase?.();
//                onClose();
//         // You might want to redirect to success page or refresh the page
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
//     >
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         إتمام شراء الدرس
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {lesson.courseTitle || lesson.title}
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
//             <Typography color="text.secondary">سعر الدرس</Typography>
//             <Typography>{subtotal.toFixed(2)} درهم</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
//             <Typography>{vatAmount.toFixed(2)} درهم</Typography>
//           </Box>
//           <Divider sx={{ my: 1.5 }} />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
//             <Typography variant="h5" color="primary" fontWeight="bold">
//               {total.toFixed(2)} درهم
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




// function LiveSessionCards({ liveCourse, onAddToCart, paymentList, teacherId }: LiveSessionCardPropsItem) {
//   const t = useTranslations();
//   const [course, setCourse] = useState(liveCourse);
//   const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false)

//   const theme = useTheme();
//   const redColor = '#B30505';
//   const padgBg = '#FFE5E5';
//   const orangeColor = warning.main;
//   const orangeBg = '#FFF6E4';
//   const parseStart = () => {
//     if (!course.date || !course.time) return null;

//     const dateOnly = course.date.split('T')[0];

//     return new Date(`${dateOnly}T${course.time}Z`);
//   };
//   const startsAt = parseStart();

//   const localDate = startsAt?.toLocaleDateString(undefined, {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });

//   const localTime = startsAt?.toLocaleTimeString(undefined, {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true, // لو عايز AM/PM
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   const handleAddToCart = async () => {
//     setIsSubmitting(true);
//     await onAddToCart(course.id || course.id);
//     setIsSubmitting(false);
//   };

//   const handleBuyNow = () => {
//     setIsPaymentModalOpen(true);
//   };
//     const handlePurchaseSuccess = () => {
//     setCourse((prev) => ({ ...prev, isEnrolled: true }));
//   };

//   return (
//     <>

//       <Card
//         sx={{
//           borderRadius: 2,
//           boxShadow: shadow.main,
//           height: '550px',
//           // Ensure card content stacks correctly
//           display: 'flex',
//           flexDirection: 'column',
//           p: '20px 16px 16px',

//           // width: 'fit-content',
//         }}
//       >
//         {/* 1. Image and Live Tag Area */}
//         <Box
//           sx={{
//             position: 'relative',
//             // pt: '56.25%', // 16:9 Aspect Ratio
//             overflow: 'hidden',
//             borderRadius: '8px',
//           }}
//         >
//           <CardMedia
//             component="img"
//             image={course.coverImagePath}
//             alt={course.title}
//             sx={{ height: 270, width: '100%', objectFit: 'fill' }}
//           />

//           {/* Live Tag (Chip) - Positioned Absolutely */}
//           {liveCourse.status && (
//             <Chip
//               label="مباشر"
//               size="small"
//               sx={{
//                 position: 'absolute',
//                 top: 10,
//                 left: 10,
//                 bgcolor: padgBg, // Red for 'Live'
//                 color: redColor,
//                 fontWeight: 700,
//                 fontSize: theme.typography.pxToRem(12),
//               }}
//             />
//           )}
//         </Box>

//         {/* 2. Content Area */}
//         <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
//           {/* Category Tag */}
//           <Typography
//             variant="caption"
//             sx={{
//               backgroundColor: orangeBg,
//               color: orangeColor, // Orange color for the tag
//               fontWeight: 600,
//               fontSize: 14,
//               borderRadius: '30px',
//               padding: '14px',
//               width: 'fit-content',
//             }}
//           >
//             <span style={{ margin: '0 3px' }}><img src={course.educationSubjectImagePath} alt={liveCourse.educationSubject} width={20} height={20} /></span>{liveCourse.educationSubject}
//           </Typography>

//           {/* Session Title */}
//           <Typography
//             variant="subtitle1"
//             sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
//           >
//             {liveCourse.title}
//           </Typography>

//           {/* Instructor Name and Avatar (Simple text for now) */}
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Stack direction="row" alignItems="center" spacing={0.5}>

//               <Typography
//                 variant="body2"
//                 sx={{ color: text.primary }}
//                 display={'flex'}
//                 alignItems={'center'}
//                 gap={'10px'}
//               >
//                 <Image src={course.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} />
//                 {course.teacherName}
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>

//                 <span style={{ color: '#666' }}>  {t('Label.time_period')} :</span>  {course.totalHours} {t('Label.hours')}  {liveCourse.totalMinutes} {t('Label.munite')}

//               </Typography>

//             </Stack>
//           </Stack>
//           <Divider sx={{ borderStyle: 'dashed' }} />


//           {/* Metadata (Time and Attendees) */}
//           <Stack direction="row" justifyContent="space-between" alignItems="center">

//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666', display: 'flex' }}>
//                 <img
//                   src={'/assets/icons/app/calendar-event.svg'}
//                   style={{ height: '18px', marginLeft: '5px' }}
//                   alt=""
//                 />
//                 {localDate}
//               </Typography>

//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                 <img
//                   src={'/assets/icons/app/clock.svg'}
//                   style={{ height: '18px', marginLeft: '5px' }}
//                   alt=""
//                 />
//                 {localTime}
//               </Typography>

//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                 {course.price} <span style={{ color: '#666' }}> AED</span>


//               </Typography>

//             </Stack>
//           </Stack>
//         </Stack>

//         {/* 3. Join Button */}

//         {course.isEnrolled ? (
//           // <Link href="/ar/courses/instructor/">
//             // <Button
//             //   variant="contained"
//             //   size="medium"
//             //   sx={{
//             //     backgroundColor: primary.main,
//             //     color: 'white',
//             //     width: '90%',
//             //     m: 'auto',
//             //     borderTopLeftRadius: theme.spacing(4),
//             //     borderTopRightRadius: theme.spacing(4),
//             //     borderBottomLeftRadius: theme.spacing(4),
//             //     borderBottomRightRadius: theme.spacing(4),
//             //   }}
//             // >
//             //   انضم الآن
//             // </Button>
//             <Button
//               variant="contained"
//               size="medium"
//               onClick={() => setIsSessionDialogOpen(true)}
//               sx={{
//                 backgroundColor: primary.main,
//                 color: 'white',
//                 width: '90%',
//                 m: 'auto',
//                 borderRadius: theme.spacing(4),
//               }}
//             >
//               انضم الآن
//             </Button>

//           // </Link>
//         ) : (


//           <Box >
//             <Stack direction="row" spacing={1.5} alignItems="center" >
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={handleBuyNow}
//                 sx={{
//                   borderRadius: '50px',
//                   backgroundColor: '#56b0d3',
//                   height: 45,
//                   boxShadow: 'none',
//                   fontSize: '1rem',
//                   '&:hover': { backgroundColor: '#459dbf', boxShadow: 'none' },
//                 }}
//               >
//                 شراء الدرس
//               </Button>


//               <Button
//                 variant="outlined"
//                 fullWidth
//                 onClick={handleAddToCart}
//                 disabled={isSubmitting}
//                 endIcon={
//                   isSubmitting ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <Icon icon="solar:cart-large-minimalistic-outline" width="20" height="20" />
//                   )
//                 }
//                 sx={{
//                   py: 1.2,
//                   borderRadius: '50px',
//                   borderColor: '#56b0d3',
//                   color: '#2c3e50',
//                   fontSize: '15px',
//                   '&:hover': {
//                     borderColor: '#459dbf',
//                     backgroundColor: 'rgba(86, 176, 211, 0.04)',
//                   },
//                 }}
//               >
//                 {isSubmitting ? 'جاري الإضافة...' : 'أضف إلى السلة'}
//               </Button>
//             </Stack>

//           </Box>
//         )}
//       </Card>
//       <SessionDialog
//         open={isSessionDialogOpen}
//         onClose={() => setIsSessionDialogOpen(false)}
//       />
//       <PaymentModal
//         open={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         lesson={liveCourse}
//         paymentList={paymentList}
//         teacherId={teacherId}
//                 onSuccessPurchase={handlePurchaseSuccess}

//       />
//     </>
//   );
// }







































// "use client"

// import Link from 'next/link';
// import Image from 'src/components/image';
// import { useTheme } from '@mui/material/styles';
// import { text, shadow, primary, warning } from 'src/theme/palette';
// import { ILiveSubject } from 'src/types/liveSubject';
// import { useTranslations } from 'next-intl';
// import {
//   Box,
//   Card,
//   Grid,
//   Stack,
//   Radio,
//   Button,
//   Dialog,
//   Divider,
//   FormControl,
//   RadioGroup,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Chip,
//   CardMedia,
//   Typography
// } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { getData, postData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import { invalidateTag } from 'src/actions/cache-invalidation';
// import { FetchTags } from 'src/actions/config-actions';
// import InvoiceDetails from 'src/sections/invoice/invoiceDetails';

// interface LiveSessionCardProps {
//   lessonList: ILiveSubject[];
//   teacher_id: string;
//   paymentList: any[];
//   onAddToCart?: (id: string) => Promise<void>;
// }

// interface PaymentModalProps {
//   open: boolean;
//   onClose: () => void;
//   lesson: ILiveSubject & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
//   paymentList: any[];
//   teacherId: string;
//   onSuccessPurchase?: (invoiceData: any) => void;
// }

// interface LiveSessionCardPropsItem {
//   liveCourse: ILiveSubject;
//   onAddToCart: (id: string) => Promise<void>;
//   paymentList: any[];
//   teacherId: string;
// }

// export default function LiveSessionCard({ lessonList, teacher_id, paymentList }: LiveSessionCardProps) {
//   const { enqueueSnackbar } = useSnackbar();

//   const onAddToCart = async (id: string) => {
//     const res = await postData(endpoints.cart.addToCart, {
//       itemType: '5',
//       teacherId: teacher_id,
//       liveSessionSubjectId: id || '',
//     });

//     if (res.success) {
//       enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
//     } else {
//       enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
//     }
//   };

//   if (!lessonList || lessonList.length === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" textAlign="center" color="text.secondary">
//           لا توجد دروس متاحة
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Grid container spacing={3}>
//         {lessonList.map((lesson) => (
//           <Grid item xs={12} sm={6} md={4} lg={4} key={lesson.id}>
//             <LiveSessionCards
//               liveCourse={lesson}
//               paymentList={paymentList}
//               teacherId={teacher_id}
//               onAddToCart={onAddToCart}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// // ---------------- Payment Modal -----------------
// function PaymentModal({ open, onClose, lesson, paymentList, teacherId, onSuccessPurchase }: PaymentModalProps) {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   const VAT_PERCENTAGE = 0.15;
//   const subtotal = lesson.coursePrice || lesson.price || 0;
//   const vatAmount = subtotal * VAT_PERCENTAGE;
//   const total = subtotal + vatAmount;

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
//       const checkoutRes : any = await postData(endpoints.payment.post_single_item, {
//         paymentMethodId: selectedMethod,
//         itemType: '5',
//         liveSessionSubjectId: lesson.id || '',
//         teacherId: teacherId,
//       });

//       if (checkoutRes.success && checkoutRes.data?.invoiceId) {
//         // جلب بيانات الفاتورة بعد الدفع
//         const invoiceRes = await getData(
//   endpoints.invoice.getDetails(checkoutRes.data.invoiceId)
// );

//         if (invoiceRes.success && invoiceRes.data) {
//           onSuccessPurchase?.(invoiceRes.data);
//         }

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
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         إتمام شراء الدرس
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {lesson.courseTitle || lesson.title}
//           </Typography>
//         </Box>

//         <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
//           اختر وسيلة الدفع
//         </Typography>

//         <FormControl component="fieldset" sx={{ width: '100%' }}>
//           <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
//             {paymentList && paymentList.map((method) => (
//               <Card
//                 key={method.id}
//                 sx={{
//                   mb: 1.5,
//                   p: 1,
//                   border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
//                   borderRadius: 2,
//                   cursor: 'pointer',
//                   '&:hover': { borderColor: '#00bcd4' },
//                 }}
//                 onClick={() => setSelectedMethod(method.id)}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Radio checked={selectedMethod === method.id} color="primary" />
//                     <Typography>{method.name}</Typography>
//                   </Box>
//                   {method.logo && <img src={method.logo} alt={method.name} style={{ maxWidth: 50, maxHeight: 30 }} />}
//                 </Box>
//               </Card>
//             ))}
//           </RadioGroup>
//         </FormControl>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ mb: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">سعر الدرس</Typography>
//             <Typography>{subtotal.toFixed(2)} درهم</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
//             <Typography>{vatAmount.toFixed(2)} درهم</Typography>
//           </Box>
//           <Divider sx={{ my: 1.5 }} />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" fontWeight="bold">الإجمالي</Typography>
//             <Typography variant="h5" color="primary" fontWeight="bold">{total.toFixed(2)} درهم</Typography>
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button onClick={onClose} variant="outlined" sx={{ borderRadius: '50px', px: 3 }} disabled={isSubmitting}>
//           إلغاء
//         </Button>
//         <Button
//           onClick={handleBuyNow}
//           variant="contained"
//           sx={{ borderRadius: '50px', px: 3, bgcolor: '#56b0d3', '&:hover': { bgcolor: '#459dbf' } }}
//           disabled={isSubmitting || !selectedMethod}
//         >
//           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// // ---------------- LiveSessionCards Component -----------------
// function LiveSessionCards({ liveCourse, onAddToCart, paymentList, teacherId }: LiveSessionCardPropsItem) {
//   const t = useTranslations();
//   const [course, setCourse] = useState(liveCourse);
//   const theme = useTheme();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   // حالة الفاتورة بعد الشراء
//   const [purchasedInvoice, setPurchasedInvoice] = useState<any>(null);
//   const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

//   const handleAddToCart = async () => {
//     setIsSubmitting(true);
//     await onAddToCart(course.id || '');
//     setIsSubmitting(false);
//   };

//   const handleBuyNow = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const handlePurchaseSuccess = (invoiceData: any) => {
//     setCourse((prev) => ({ ...prev, isEnrolled: true }));
//     setPurchasedInvoice(invoiceData);
//     setIsInvoiceOpen(true);
//   };

//   return (
//     <>
//       <Card sx={{ borderRadius: 2, boxShadow: shadow.main, height: '550px', display: 'flex', flexDirection: 'column', p: '20px 16px 16px' }}>
//         <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
//           <CardMedia component="img" image={course.coverImagePath} alt={course.title} sx={{ height: 270, width: '100%', objectFit: 'fill' }} />
//         </Box>

//         <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}>
//             {liveCourse.title}
//           </Typography>
//         </Stack>

//         {course.isEnrolled ? (
//           <Link href="/ar/courses/instructor/">
//             <Button variant="contained" sx={{ backgroundColor: primary.main, color: 'white', width: '90%', m: 'auto', borderRadius: 4 }}>
//               انضم الآن
//             </Button>
//           </Link>
//         ) : (
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             <Button variant="contained" fullWidth onClick={handleBuyNow} sx={{ borderRadius: '50px', backgroundColor: '#56b0d3', height: 45 }}>
//               شراء الدرس
//             </Button>
//             <Button variant="outlined" fullWidth onClick={handleAddToCart} disabled={isSubmitting}>
//               {isSubmitting ? 'جاري الإضافة...' : 'أضف إلى السلة'}
//             </Button>
//           </Stack>
//         )}
//       </Card>

//       <PaymentModal
//         open={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         lesson={liveCourse}
//         paymentList={paymentList}
//         teacherId={teacherId}
//         onSuccessPurchase={handlePurchaseSuccess}
//       />

//       {/* عرض الفاتورة بعد الشراء */}
//       {purchasedInvoice && (
//         <Dialog open={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} maxWidth="sm" fullWidth dir="rtl">
//           <DialogActions>
//             <Button onClick={() => setIsInvoiceOpen(false)}>X</Button>
//           </DialogActions>
//           <DialogContent>
//             <InvoiceDetails invoice={purchasedInvoice} />
//           </DialogContent>
          
//         </Dialog>
//       )}
//     </>
//   );
// }
















































// "use client"

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { Icon } from '@iconify/react';
// import { useSnackbar } from 'notistack';
// import { useTranslations } from 'next-intl';

// import { useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Card,
//   Grid,
//   Stack,
//   Radio,
//   Button,
//   Dialog,
//   Divider,
//   Container,
//   Typography,
//   RadioGroup,
//   DialogTitle,
//   CardContent,
//   FormControl,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Chip,
//   CardMedia,
// } from '@mui/material';

// import Image from 'src/components/image';
// import { text, shadow, primary, warning } from 'src/theme/palette';
// import { ILiveSubject } from 'src/types/liveSubject';
// import { getData, postData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import { invalidateTag } from 'src/actions/cache-invalidation';
// import { FetchTags } from 'src/actions/config-actions';

// import SessionDialog from './SessionDialog';
// import InvoiceDetails from 'src/sections/invoice/invoiceDetails';

// // ----------------------------------------------------------------------

// interface LiveSessionCardProps {
//   lessonList: ILiveSubject[];
//   teacher_id: string;
//   paymentList: any[];
//   onAddToCart?: (id: string) => Promise<void>;
//   enrollments: any[];
// }

// interface PaymentModalProps {
//   open: boolean;
//   onClose: () => void;
//   lesson: ILiveSubject & { coursePrice?: number; courseTitle?: string; lessonId?: string; courseId?: string };
//   paymentList: any[];
//   teacherId: string;
//   onSuccessPurchase?: (invoiceData: any) => void;
// }

// interface LiveSessionCardPropsItem {
//   liveCourse: ILiveSubject;
//   onAddToCart: (id: string) => Promise<void>;
//   paymentList: any[];
//   teacherId: string;
//   enrollments: any[];
// }

// // ----------------------------------------------------------------------

// export default function LiveSessionCard({ lessonList, teacher_id, paymentList, enrollments }: LiveSessionCardProps) {
//   const { enqueueSnackbar } = useSnackbar();

//   const onAddToCart = async (id: string) => {
//     const res = await postData(endpoints.cart.addToCart, {
//       itemType: '5',
//       teacherId: teacher_id,
//       liveSessionSubjectId: id || '',
//     });

//     if (res.success) {
//       enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
//     } else {
//       enqueueSnackbar(res.error || 'حدث خطأ ما', { variant: 'error' });
//     }
//   };

//   if (!lessonList || lessonList.length === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" textAlign="center" color="text.secondary">
//           لا توجد دروس متاحة
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Container>
//         <Grid container spacing={3}>
//           {lessonList.map((lesson) => (
//             <Grid item xs={12} sm={6} md={4} lg={4} key={lesson.id}>
//               <LiveSessionCards
//                 liveCourse={lesson}
//                 paymentList={paymentList}
//                 teacherId={teacher_id}
//                 onAddToCart={onAddToCart}
//                 enrollments={enrollments}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// function PaymentModal({ open, onClose, lesson, paymentList, teacherId, onSuccessPurchase }: PaymentModalProps) {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { enqueueSnackbar } = useSnackbar();

//   const VAT_PERCENTAGE = 0.15;
//   const subtotal = lesson.coursePrice || lesson.price || 0;
//   const vatAmount = subtotal * VAT_PERCENTAGE;
//   const total = subtotal + vatAmount;

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
//       const checkoutRes: any = await postData(endpoints.payment.post_single_item, {
//         paymentMethodId: selectedMethod,
//         itemType: '5',
//         liveSessionSubjectId: lesson.id || '',
//         teacherId: teacherId,
//       });

//       if (checkoutRes.success && checkoutRes.data?.invoiceId) {
//         try {
//           invalidateTag(FetchTags.LiveSubject);
//         } catch (e) {
//           // fail silently
//         }

//         // Fetch Invoice Details
//         const invoiceRes = await getData(endpoints.invoice.getDetails(checkoutRes.data.invoiceId));

//         if (invoiceRes.success && invoiceRes.data) {
//           onSuccessPurchase?.(invoiceRes.data);
//         }
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
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth dir="rtl">
//       <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>إتمام شراء الدرس</DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {lesson.courseTitle || lesson.title}
//           </Typography>
//         </Box>

//         <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
//           اختر وسيلة الدفع
//         </Typography>

//         <FormControl component="fieldset" sx={{ width: '100%' }}>
//           <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
//             {paymentList &&
//               paymentList.map((method) => (
//                 <Card
//                   key={method.id}
//                   sx={{
//                     mb: 1.5,
//                     p: 1,
//                     border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #e0e0e0',
//                     borderRadius: 2,
//                     cursor: 'pointer',
//                     '&:hover': { borderColor: '#00bcd4' },
//                   }}
//                   onClick={() => setSelectedMethod(method.id)}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Radio checked={selectedMethod === method.id} color="primary" />
//                       <Typography>{method.name}</Typography>
//                     </Box>
//                     {method.logo && (
//                       <Box sx={{ width: 50, height: 30 }}>
//                         <img
//                           src={method.logo}
//                           alt={method.name}
//                           style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
//                         />
//                       </Box>
//                     )}
//                   </Box>
//                 </Card>
//               ))}
//           </RadioGroup>
//         </FormControl>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ mb: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">سعر الدرس</Typography>
//             <Typography>{subtotal.toFixed(2)} درهم</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography color="text.secondary">ضريبة القيمة المضافة (15%)</Typography>
//             <Typography>{vatAmount.toFixed(2)} درهم</Typography>
//           </Box>
//           <Divider sx={{ my: 1.5 }} />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" fontWeight="bold">
//               الإجمالي
//             </Typography>
//             <Typography variant="h5" color="primary" fontWeight="bold">
//               {total.toFixed(2)} درهم
//             </Typography>
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button onClick={onClose} variant="outlined" sx={{ borderRadius: '50px', px: 3 }} disabled={isSubmitting}>
//           إلغاء
//         </Button>
//         <Button
//           onClick={handleBuyNow}
//           variant="contained"
//           sx={{
//             borderRadius: '50px',
//             px: 3,
//             bgcolor: '#56b0d3',
//             '&:hover': { bgcolor: '#459dbf' },
//           }}
//           disabled={isSubmitting || !selectedMethod}
//         >
//           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الشراء'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// // ----------------------------------------------------------------------

// function LiveSessionCards({ liveCourse, onAddToCart, paymentList, teacherId, enrollments }: LiveSessionCardPropsItem) {
//   const t = useTranslations();
//   const theme = useTheme();
//   const currentEnrollment = enrollments?.find(
//     (item) => item.liveSessionSubjectId === liveCourse.id
//   );
//   const enrollmentId = currentEnrollment?.id;
//   const isEnrolled = !!enrollmentId;
//   const [course, setCourse] = useState(liveCourse);
//   const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isEnrolledLocal, setIsEnrolledLocal] = useState(false);
//   const [localEnrollmentId, setLocalEnrollmentId] = useState<string | undefined>(undefined);
//   useEffect(() => {
//     const currentEnrollment = enrollments?.find(
//       (item) => item.liveSessionSubjectId === liveCourse.id
//     );
//     setIsEnrolledLocal(!!currentEnrollment);
//     setLocalEnrollmentId(currentEnrollment?.id);
//   }, [enrollments, liveCourse.id]);
//   // Invoice states
//   const [purchasedInvoice, setPurchasedInvoice] = useState<any>(null);
//   const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

//   const redColor = '#B30505';
//   const padgBg = '#FFE5E5';
//   const orangeColor = warning.main;
//   const orangeBg = '#FFF6E4';

//   const parseStart = () => {
//     if (!course.date || !course.time) return null;
//     const dateOnly = course.date.split('T')[0];
//     return new Date(`${dateOnly}T${course.time}Z`);
//   };

//   const startsAt = parseStart();
//   const localDate = startsAt?.toLocaleDateString(undefined, {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });

//   const localTime = startsAt?.toLocaleTimeString(undefined, {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });

//   const handleAddToCart = async () => {
//     setIsSubmitting(true);
//     await onAddToCart(course.id || '');
//     setIsSubmitting(false);
//   };

//   const handleBuyNow = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const handlePurchaseSuccess = (invoiceData: any) => {
//     setIsEnrolledLocal(true);
//     setLocalEnrollmentId(invoiceData.enrollmentId || 'temp_id'); 
//     setCourse((prev) => ({ ...prev, isEnrolled: true }));
//     setPurchasedInvoice(invoiceData);
//     setIsInvoiceOpen(true);
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           borderRadius: 2,
//           boxShadow: shadow.main,
//           height: '550px',
//           display: 'flex',
//           flexDirection: 'column',
//           p: '20px 16px 16px',
//         }}
//       >
//         <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
//           <CardMedia
//             component="img"
//             image={course.coverImagePath}
//             alt={course.title}
//             sx={{ height: 270, width: '100%', objectFit: 'fill' }}
//           />

//           {liveCourse.status && (
//             <Chip
//               label="مباشر"
//               size="small"
//               sx={{
//                 position: 'absolute',
//                 top: 10,
//                 left: 10,
//                 bgcolor: padgBg,
//                 color: redColor,
//                 fontWeight: 700,
//                 fontSize: theme.typography.pxToRem(12),
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
//           <Typography
//             variant="caption"
//             sx={{
//               backgroundColor: orangeBg,
//               color: orangeColor,
//               fontWeight: 600,
//               fontSize: 14,
//               borderRadius: '30px',
//               padding: '14px',
//               width: 'fit-content',
//             }}
//           >
//             <span style={{ margin: '0 3px' }}>
//               <img src={course.educationSubjectImagePath} alt={liveCourse.educationSubject} width={20} height={20} />
//             </span>
//             {liveCourse.educationSubject}
//           </Typography>

//           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}>
//             {liveCourse.title}
//           </Typography>

//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography variant="body2" sx={{ color: text.primary, display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <Image src={course.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} />
//                 {course.teacherName}
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                 <span style={{ color: '#666' }}> {t('Label.time_period')} :</span> {course.totalHours} {t('Label.hours')}{' '}
//                 {liveCourse.totalMinutes} {t('Label.munite')}
//               </Typography>
//             </Stack>
//           </Stack>

//           <Divider sx={{ borderStyle: 'dashed' }} />

//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666', display: 'flex' }}>
//                 <img src="/assets/icons/app/calendar-event.svg" style={{ height: '18px', marginLeft: '5px' }} alt="" />
//                 {localDate}
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                 <img src="/assets/icons/app/clock.svg" style={{ height: '18px', marginLeft: '5px' }} alt="" />
//                 {localTime}
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5}>
//               <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                 {course.price} <span style={{ color: '#666' }}> AED</span>
//               </Typography>
//             </Stack>
//           </Stack>
//         </Stack>

//        {isEnrolledLocal ? (
//           <Button
//             variant="contained"
//             size="medium"
//             onClick={() => setIsSessionDialogOpen(true)}
//             sx={{
//               backgroundColor: primary.main,
//               color: 'white',
//               width: '90%',
//               m: 'auto',
//               borderRadius: theme.spacing(4),
//             }}
//           >
//             انضم الآن
//           </Button>
//         ) : (
//           <Box>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={handleBuyNow}
//                 sx={{
//                   borderRadius: '50px',
//                   backgroundColor: '#56b0d3',
//                   height: 45,
//                   boxShadow: 'none',
//                   fontSize: '1rem',
//                   '&:hover': { backgroundColor: '#459dbf', boxShadow: 'none' },
//                 }}
//               >
//                 شراء الدرس
//               </Button>

//               <Button
//                 variant="outlined"
//                 fullWidth
//                 onClick={handleAddToCart}
//                 disabled={isSubmitting}
//                 endIcon={
//                   isSubmitting ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <Icon icon="solar:cart-large-minimalistic-outline" width="20" height="20" />
//                   )
//                 }
//                 sx={{
//                   py: 1.2,
//                   borderRadius: '50px',
//                   borderColor: '#56b0d3',
//                   color: '#2c3e50',
//                   fontSize: '15px',
//                   '&:hover': {
//                     borderColor: '#459dbf',
//                     backgroundColor: 'rgba(86, 176, 211, 0.04)',
//                   },
//                 }}
//               >
//                 {isSubmitting ? 'جاري الإضافة...' : 'أضف إلى السلة'}
//               </Button>
//             </Stack>
//           </Box>
//         )}
//       </Card>

//       {isSessionDialogOpen && (
//         <SessionDialog 
//           open={isSessionDialogOpen} 
//           onClose={() => setIsSessionDialogOpen(false)} 
//           enrollmentId={enrollmentId} 
//           type="subject"
//         />
//       )}

//       <PaymentModal
//         open={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         lesson={liveCourse}
//         paymentList={paymentList}
//         teacherId={teacherId}
//         onSuccessPurchase={handlePurchaseSuccess}
//       />

//       {/* Invoice Modal */}
//       {purchasedInvoice && (
//         <Dialog open={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} maxWidth="md" fullWidth dir="rtl">
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             تفاصيل الفاتورة
//             <Button onClick={() => setIsInvoiceOpen(false)} sx={{ maxWidth: "sm", color: 'error.main' }}>
//               <Icon icon="mingcute:close-line" width="24" />
//             </Button>
//           </DialogTitle>
//           <DialogContent dividers>
//             <InvoiceDetails invoice={purchasedInvoice} />
//           </DialogContent>
//           <DialogActions>
//             {/* <Button onClick={() => setIsInvoiceOpen(false)} variant="contained" sx={{ borderRadius: '50px' }}>
//               إغلاق
//             </Button> */}
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// }

















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
        } catch (e) {}

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