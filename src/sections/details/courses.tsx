import { Icon } from "@iconify/react";
import { Box, Card, Grid, List, Button, ListItem, Accordion, Container, Typography, CardContent, ListItemText, AccordionDetails, AccordionSummary } from "@mui/material";



// export default function EducationalLessons({ lessonList }: { lessonList: any[] }) {
//   return (
//     <Box>
//     <Box sx={{  }}>
//       <Container>
//         {/* Filters Row */}
//         <Box
//           display="flex"
//           flexDirection={{ xs: 'column', md: 'row-reverse' }}
//           alignItems={{ xs: 'stretch', md: 'start' }}
//           gap={2}
//           justifyContent="start"
//           dir="rtl"
//           sx={{ width: '100%', my: 1 }}
//         >
//           {/* Dropdowns */}
//           {['الصف الثالث', 'المرحلة الايتدائية'].map((item, idx) => (
//             <Select
//               key={idx}
//               defaultValue={item}
//               variant="outlined"
//               sx={{
//                 borderRadius: '50px',
//                 height: { xs: 40, md: 48 },
//                 minWidth: { xs: 120, md: 140 + idx * 10 },
//                 px: 1,
//                 '& fieldset': { border: 'none' },
//                 bgcolor: '#fff',
//                 boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                 fontSize: { xs: 14, md: 16 },
//               }}
//             >
//               <MenuItem value={item}>{item}</MenuItem>
//             </Select>
//           ))}

//           {/* Search Input */}

//         </Box>

//         {/* Categories Row */}
//         <Box
//           sx={{
//             display: 'flex',
//             overflowX: 'auto',
//             justifyContent: 'center',
//             gap: 1,
//             px: 0,
//             '&::-webkit-scrollbar': { height: '6px' },
//             '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '3px' },
//             scrollbarWidth: 'thin',
//             scrollbarColor: '#ccc transparent',
//             mt: 5,
//           }}
//         >
//         </Box>
//       </Container>
//     </Box>
//     <Box display={{xs:'block',md:'flex' }}  justifyContent="space-between">

//       {/* <CourseCurriculum /> */}
//     <Box sx={{ mt: 2,p:2, justifyContent:'end', border: '1px solid', borderColor: 'divider', borderRadius: "25px",mx:2,height:'100%'}} >
//     <Typography textAlign="start" variant="h4" color="warning" sx={{ py: 2 }}>
//     220.40 درهم
//     </Typography>
// xxxx
//       {/* <CourseActions /> */}
//     </Box>
//     </Box>
//     </Box>
//   );
// }
// Updated component to handle multiple courses
export default function EducationalLessons({ lessonList }: { lessonList: any[] }) {
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
        {/* Your existing filter UI */}

        {/* Display all courses */}
        <Grid container spacing={3}>
          {lessonList.map((course, index) => (
            <Grid item xs={12} key={course.courseId || index}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Separate CourseCard component for better organization
function CourseCard({ course }: { course: any }) {
  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          {/* Course Info */}
          <Box sx={{ flex: 1, mr: { md: 3 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {course.courseTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              معرّف الدورة: {course.courseId}
            </Typography>

            {/* Course Sections */}
            {course.sections?.map((section: any, sectionIndex: number) => (
              <Accordion key={section.sectionId} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<Icon icon="expand_more" />}>
                  <Typography>{section.sectionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {section.secsions?.map((lesson: any) => (
                      <ListItem key={lesson.secsionId}>
                        <Icon icon="play_circle"  />
                        <ListItemText
                          primary={lesson.secsionTitle}
                          secondary={
                            <Button
                              size="small"
                              href={lesson.videoUrl}
                              target="_blank"
                            >
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

          {/* Price Sidebar */}
          <Box sx={{
            width: { xs: '100%', md: '250px' },
            mt: { xs: 2, md: 0 },
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <Typography variant="h5" color="warning.main" textAlign="center" gutterBottom>
              {course.coursePrice} درهم
            </Typography>
            <Button variant="contained" fullWidth sx={{ mb: 1 }}>
              اشترك الآن
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}