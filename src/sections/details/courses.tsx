// import { Icon } from '@iconify/react';
// import {
//   Box,
//   Card,
//   Grid,
//   List,
//   Stack,
//   Button,
//   ListItem,
//   Accordion,
//   Container,
//   IconButton,
//   Typography,
//   CardContent,
//   ListItemText,
//   AccordionDetails,
//   AccordionSummary,
// } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { postData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// export default function EducationalLessons({ lessonList, teacher_id }: { lessonList: any[]; teacher_id: string }) {


//   console.log("yyyy", lessonList);

//   const { enqueueSnackbar } = useSnackbar();
//    const addToCart = async () => {
//     const res = await postData(endpoints.cart.addToCart, {
//       itemType: '4',
//       teacherId: teacher_id,
//       courseId: lessonList?.[0]?.courseId || '' as string | undefined | null,
//     });

//     if (res.success) {
//       enqueueSnackbar('تم الاضافة للسلة بنجاح', { variant: 'success' });
//     } else {
//       enqueueSnackbar(
//         res.error || 'حدث خطأ ما',
//         { variant: 'error' }
//       );
//     }
//   };
//   if (!lessonList || lessonList.length === 0) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h6" textAlign="center" color="text.secondary">
//           لا توجد دورات متاحة
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Container>
//         {/* Your existing filter UI */}

//         {/* Display all courses */}
//         <Grid container spacing={3}>
//           {lessonList.map((course, index) => (
//             <Grid item xs={12} key={course.courseId || index}>
//               <CourseCard course={course} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// // Separate CourseCard component for better organization
// function CourseCard({ course }: { course: any }) {
//   return (
//     <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
//           {/* Course Info */}
//           <Box sx={{ flex: 1, mr: { md: 3 } }}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               {course.courseTitle}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph>
//               معرّف الدورة: {course.courseId}
//             </Typography>

//             {/* Course Sections */}
//             {course.sections?.map((section: any, sectionIndex: number) => (
//               <Accordion key={section.sectionId} sx={{ mb: 1 }}>
//                 <AccordionSummary expandIcon={<Icon icon="material-symbols:expand-more" />}>
//                   <Typography>{section.sectionTitle}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <List>
//                     {section.secsions?.map((lesson: any) => (
//                       <ListItem key={lesson.secsionId}>
//                         <Icon icon="material-symbols:play-circle-outline" />
//                         <ListItemText
//                           primary={lesson.secsionTitle}
//                           secondary={
//                             <Button size="small" href={lesson.videoUrl} target="_blank">
//                               مشاهدة الفيديو
//                             </Button>
//                           }
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </Box>
//           <Box
//             sx={{
//               width: { xs: '100%', md: '350px' },
//               p: 3,
//               backgroundColor: '#fff',
//               border: '1px solid #f0f0f0',
//               borderRadius: 4,
//               boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
//             }}
//           >
//             {/* Price Display */}
//             <Typography
//               variant="h4"
//               textAlign="center"
//               sx={{ color: '#e67e22', fontWeight: 'bold', mb: 3 }}
//             >
//               {course.coursePrice} درهم
//             </Typography>
//             {/* Top Row: Wishlist Circle + Purchase Button */}
//             <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
//               {/* The Wishlist Circle Button you highlighted */}
//               <Button
//                 variant="contained"
//                 fullWidth
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
//               <IconButton
//                 sx={{
//                   border: '1px solid #56b0d3', // Thin blue border from your image
//                   color: '#2c3e50', // Darker heart color
//                   width: 45,
//                   height: 45,
//                   p: 0,
//                   '&:hover': {
//                     backgroundColor: 'rgba(86, 176, 211, 0.04)',
//                     borderColor: '#459dbf',
//                   },
//                 }}
//               >
//                 <Icon icon="solar:heart-linear" width="22" height="22" />
//               </IconButton>
//             </Stack>

//             {/* Bottom Row: Outlined Add to Cart Button */}
//             <Button
//               variant="outlined"
//               fullWidth
//               endIcon={<Icon icon="solar:cart-large-minimalistic-outline" width="20" height="20" />}
//               sx={{
//                 py: 1.2,
//                 borderRadius: '50px',
//                 borderColor: '#56b0d3',
//                 color: '#2c3e50',
//                 fontSize: '1rem',
//                 '&:hover': {
//                   borderColor: '#459dbf',
//                   backgroundColor: 'rgba(86, 176, 211, 0.04)',
//                 },
//               }}
//             >
//               أضف إلى السلة
//             </Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';
import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  Button,
  ListItem,
  Accordion,
  Container,
  IconButton,
  Typography,
  CardContent,
  ListItemText,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from '@mui/material';

export default function EducationalLessons({ lessonList, teacher_id }: { lessonList: any[]; teacher_id: string }) {
  const { enqueueSnackbar } = useSnackbar();

  // Function moved here to be shared or passed down
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
          لا توجد دورات متاحة
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          {lessonList.map((course, index) => (
            <Grid item xs={12} key={course.courseId || index}>
              {/* Pass the function down to each card */}
              <CourseCard course={course} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Separate CourseCard component
function CourseCard({ course, onAddToCart }: { course: any; onAddToCart: (id: string) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = async () => {
    setIsSubmitting(true);
    await onAddToCart(course.courseId);
    setIsSubmitting(false);
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
          {/* Course Info Section */}
          <Box sx={{ flex: 1, mr: { md: 3 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {course.courseTitle}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" paragraph>
              معرّف الدورة: {course.courseId}
            </Typography> */}

            {course.sections?.map((section: any) => (
              <Accordion key={section.sectionId} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<Icon icon="material-symbols:expand-more" />}>
                  <Typography>{section.sectionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {section.secsions?.map((lesson: any) => (
                      <ListItem key={lesson.secsionId}>
                        <Icon icon="material-symbols:play-circle-outline" />
                        <ListItemText
                          primary={lesson.secsionTitle}
                          secondary={
                            <Button size="small" href={lesson.videoUrl} target="_blank">
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
              sx={{ color: '#e67e22', fontWeight: 'bold', mb: 3 }}
            >
              {course.coursePrice} درهم
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <Button
                variant="contained"
                fullWidth
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
              onClick={handleAction}
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
  );
}