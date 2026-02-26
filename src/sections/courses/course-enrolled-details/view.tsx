
// 'use client'
// import LockIcon from '@mui/icons-material/Lock';
// import { endpoints } from 'src/utils/endpoints';
// import PeopleIcon from '@mui/icons-material/People';
// import React, { useRef, useState, useEffect } from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { getData, postData } from 'src/utils/crud-fetch-api';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import { CourseLesson, sectionsNumber, sessionSection, CourseEnrolledDetails } from 'src/types/course_enrolled';
// import {
//   Box, Grid, List, Paper, Avatar, Rating, Divider,
//   ListItem, Container, Accordion, Typography,
//   ListItemIcon, ListItemText, ListItemButton, AccordionSummary, AccordionDetails
// } from '@mui/material';

// interface Props {
//   course: CourseEnrolledDetails;
//   sections: sectionsNumber[];
// }

// export default function CourseDetailsEnrolledView({ course, sections }: Props) {
//   console.log("course", course)
//   console.log("sections", sections)

//   const [lessonsMap, setLessonsMap] = useState<Record<string, CourseLesson[]>>({});
//   const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);

//   // Ref to track lessons marked as watched during this session to prevent duplicate API calls
//   const markedAsWatchedRef = useRef<Set<string>>(new Set());

//   // --- API HANDLERS ---

//   const handleMarkAsWatched = async (lessonId: string) => {
//     // Prevent multiple calls for the same lesson
//     if (markedAsWatchedRef.current.has(lessonId)) return;

//     try {
//   const response = await postData<any, {}>(
//       endpoints.CourseEnroll.markWatched(lessonId),
//       {}
//     );
//       if (response) {
//         markedAsWatchedRef.current.add(lessonId);

//         // Update local state to show the green checkmark immediately
//         setLessonsMap((prev) => {
//           const updatedMap = { ...prev };
//           Object.keys(updatedMap).forEach((sectionId) => {
//             updatedMap[sectionId] = updatedMap[sectionId].map((lesson) =>
//               lesson.lessonId === lessonId ? { ...lesson, isWatched: true } : lesson
//             );
//           });
//           return updatedMap;
//         });
//       }
//     } catch (error) {
//       console.error("Error marking lesson as watched:", error);
//     }
//   };

//   const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
//     const video = event.currentTarget;
//     if (!activeLesson || activeLesson.isWatched || markedAsWatchedRef.current.has(activeLesson.lessonId)) return;

//     // Trigger POST if user is within the last 10 seconds of the video
//     const timeLeft = video.duration - video.currentTime;
//     if (video.duration > 0 && timeLeft <= 10) {
//       handleMarkAsWatched(activeLesson.lessonId);
//     }
//   };

//   // --- DATA FETCHING ---

//   useEffect(() => {
//     const fetchAllContent = async () => {
//       const finalResults: Record<string, CourseLesson[]> = {};

//       for (const section of sections) {
//         try {
//           // 1. Fetch list of sessions for the section
//           const res = await getData<any>(endpoints.CourseEnroll.getCourses_Section_Sessions(section.sectionId));
//           const sessionList: sessionSection[] = res?.data?.items || [];

//           // 2. Fetch full details (CourseLesson) for each session to get the videoUrl
//           const detailedLessons = await Promise.all(
//             sessionList.map(async (s) => {
//               try {
//                 const lessonRes = await getData<any>(endpoints.CourseEnroll.getCourssesLesson(s.sessionId));
//                 return lessonRes?.data as CourseLesson;
//               } catch (err) {
//                 return null;
//               }
//             })
//           );

//           const validLessons = detailedLessons.filter((l): l is CourseLesson => l !== null);
//           finalResults[section.sectionId] = validLessons;

//           // Set the first lesson of the first section as the default active video
//           if (!activeLesson && validLessons.length > 0) {
//             setActiveLesson(validLessons[0]);
//           }
//         } catch (error) {
//           console.error(`Error loading content for section ${section.sectionId}:`, error);
//         }
//       }
//       setLessonsMap(finalResults);
//     };

//     if (sections.length > 0) fetchAllContent();
//   }, [sections]);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5, mb: 10, direction: 'ltr' }}>

//       {/* 1. HEADER SECTION */}
//       <Box sx={{ mb: 4, textAlign: 'right' }}>
//         <Typography variant="overline" sx={{ color: 'orange', fontWeight: 'bold' }}>Web Development</Typography>
//         <Typography variant="h3" fontWeight="bold" gutterBottom>{course.courseTitle}</Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mb: 2 }}>
//           {course.courseDescription}
//         </Typography>

//         <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//              <Rating value={4.8} readOnly size="small" precision={0.1} />
//              <Typography variant="body2" sx={{ mr: 1 }}>(5.8K+)</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//             <PeopleIcon fontSize="small" /> <Typography variant="body2">8,543 طالب</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//             <AccessTimeIcon fontSize="small" /> <Typography variant="body2">24 hr 40 mins</Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* 2. VIDEO PLAYER SECTION */}
//       <Box sx={{ width: '100%', borderRadius: 6, overflow: 'hidden', bgcolor: 'black', mb: 6, boxShadow: 6 }}>
//         {activeLesson ? (
//           <video
//             key={activeLesson.lessonId} // Force reset player when lesson changes
//             controls
//             onTimeUpdate={handleTimeUpdate}
//             src={activeLesson.videoUrl}
//             style={{ width: '100%', display: 'block', maxHeight: '650px', aspectRatio: '16/9' }}
//             poster={course.coverImage}
//           />
//         ) : (
//           <Box sx={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <img src={course.coverImage} style={{ width: '100%', objectFit: 'cover' }} alt="Course Poster" />
//           </Box>
//         )}
//       </Box>

//       {/* 3. MAIN CONTENT GRID */}
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={12}>

//           {/* COURSE CONTENT ACCORDION */}
//           <Paper variant="outlined" sx={{ borderRadius: 4, mb: 6, overflow: 'hidden' }}>
//             <Box sx={{ p: 3, bgcolor: '#fff' }}>
//               <Typography variant="h5" fontWeight="bold">محتوى الكورس</Typography>
//             </Box>
//             <Divider />
//             {sections.map((section, idx) => (
//               <Accordion key={section.sectionId} elevation={0} defaultExpanded={idx === 0} sx={{ borderBottom: '1px solid #eee' }}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fbfbfb' }}>
//                   <Typography fontWeight="bold">الفصل {idx + 1}: {section.title}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 0 }}>
//                   <List disablePadding>
//                     {lessonsMap[section.sectionId]?.map((lesson) => (
//                       <ListItem key={lesson.lessonId} disablePadding divider>
//                         <ListItemButton
//                            onClick={() => setActiveLesson(lesson)}
//                            selected={activeLesson?.lessonId === lesson.lessonId}
//                            sx={{ py: 2, '&.Mui-selected': { bgcolor: '#e3f2fd' } }}
//                         >
//                           <ListItemText
//                             primary={lesson.title}
//                             secondary={lesson.videoDuration}
//                             sx={{ textAlign: 'right' }}
//                             primaryTypographyProps={{ fontWeight: activeLesson?.lessonId === lesson.lessonId ? 'bold' : 'normal' }}
//                           />
//                           <ListItemIcon sx={{ minWidth: 40, justifyContent: 'flex-end' }}>
//                             {lesson.isWatched || markedAsWatchedRef.current.has(lesson.lessonId) ? (
//                               <CheckCircleIcon color="success" />
//                             ) : (
//                               <PlayCircleOutlineIcon color="primary" />
//                             )}
//                           </ListItemIcon>
//                           {!lesson.videoUrl && <LockIcon fontSize="small" sx={{ mr: 1, color: 'text.disabled' }} />}
//                         </ListItemButton>
//                       </ListItem>
//                     ))}
//                   </List>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </Paper>

//           {/* INSTRUCTOR SECTION */}
//           <Paper variant="outlined" sx={{ borderRadius: 4, p: 4 }}>
//             <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>عن المحاضر</Typography>
//             <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
//               <Avatar src="/instructor.jpg" sx={{ width: 80, height: 80, border: '2px solid #eee' }}>
//                 {course.teacherName?.[0]}
//               </Avatar>
//               <Box>
//                 <Typography variant="h6" fontWeight="bold">{course.teacherName}</Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                   مطور ويب خبير مع أكثر من 8 سنوات من الخبرة في تطوير التطبيقات الحديثة
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                     <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       ⭐ 4.8
//                     </Typography>
//                     <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       👥 1500 طالب
//                     </Typography>
//                     <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       📚 12 دورة
//                     </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>

//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
'use client'
import React, { useRef, useState, useEffect } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box, Grid, List, Paper, Avatar, Rating, Divider,
  ListItem, Container, Accordion, Typography,
  ListItemIcon, ListItemText, ListItemButton, AccordionSummary, AccordionDetails
} from '@mui/material';

import { endpoints } from 'src/utils/endpoints';
import { getData, postData } from 'src/utils/crud-fetch-api';
import { CourseLesson, sectionsNumber, sessionSection, CourseEnrolledDetails } from 'src/types/course_enrolled';

interface Props {
  course: CourseEnrolledDetails;
  sections: sectionsNumber[];
}

export default function CourseDetailsEnrolledView({ course, sections }: Props) {
  const [lessonsMap, setLessonsMap] = useState<Record<string, CourseLesson[]>>({});
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const markedAsWatchedRef = useRef<Set<string>>(new Set());

  // --- API HANDLERS ---
  const handleMarkAsWatched = async (lessonId: string) => {
    if (markedAsWatchedRef.current.has(lessonId)) return;

    try {
      const response = await postData<any, {}>(
        endpoints.CourseEnroll.markWatched(lessonId),
        {}
      );
      if (response.success) {
        markedAsWatchedRef.current.add(lessonId);
        setLessonsMap((prev) => {
          const updatedMap = { ...prev };
          Object.keys(updatedMap).forEach((sectionId) => {
            updatedMap[sectionId] = updatedMap[sectionId].map((lesson) =>
              lesson.lessonId === lessonId ? { ...lesson, isWatched: true } : lesson
            );
          });
          return updatedMap;
        });
      }
    } catch (error) {
      console.error("Error marking lesson as watched:", error);
    }
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (!activeLesson || activeLesson.isWatched || markedAsWatchedRef.current.has(activeLesson.lessonId)) return;

    const timeLeft = video.duration - video.currentTime;
    if (video.duration > 0 && timeLeft <= 10) {
      handleMarkAsWatched(activeLesson.lessonId);
    }
  };

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchAllContent = async () => {
      const finalResults: Record<string, CourseLesson[]> = {};

      for (const section of sections) {
        try {
          const res = await getData<any>(endpoints.CourseEnroll.getCourses_Section_Sessions(section.sectionId));
          const sessionList: sessionSection[] = res?.data?.items || [];

          const detailedLessons = await Promise.all(
            sessionList.map(async (s) => {
              try {
                const lessonRes = await getData<any>(endpoints.CourseEnroll.getCourssesLesson(s.sessionId));
                return lessonRes?.data as CourseLesson;
              } catch (err) { return null; }
            })
          );

          const validLessons = detailedLessons.filter((l): l is CourseLesson => l !== null);
          finalResults[section.sectionId] = validLessons;

          if (!activeLesson && validLessons.length > 0) {
            setActiveLesson(validLessons[0]);
          }
        } catch (error) {
          console.error(`Error loading content for section ${section.sectionId}:`, error);
        }
      }
      setLessonsMap(finalResults);
    };

    if (sections.length > 0) fetchAllContent();
  }, [sections]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 10, direction: 'ltr' }}>

      {/* 1. HEADER SECTION (Dynamic) */}
      <Box sx={{ mb: 4, textAlign: 'right' }}>
        <Typography variant="overline" sx={{ color: 'orange', fontWeight: 'bold' }}>
           {/* You can make this dynamic if the course object has a category field */}
           Web Development
        </Typography>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {course.courseTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mb: 2 }}>
          {course.courseDescription}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
             <Rating value={4.8} readOnly size="small" precision={0.1} />
             <Typography variant="body2" sx={{ mr: 1 }}>(5.8K+)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PeopleIcon fontSize="small" />
            <Typography variant="body2">
                {/* Fallback to static if student count isn't in this specific object */}
                {course.progressPercentage > 0 ? `${course.progressPercentage}% مكتمل` : '8,543 طالب'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{course.videoDuration || "24 hr 40 mins"}</Typography>
          </Box>
        </Box>
      </Box>

      {/* 2. VIDEO PLAYER SECTION */}
      <Box sx={{ width: '100%', borderRadius: 6, overflow: 'hidden', bgcolor: 'black', mb: 6, boxShadow: 6 }}>
        {activeLesson?.videoUrl ? (
          <video
            key={activeLesson.lessonId}
            controls
            onTimeUpdate={handleTimeUpdate}
            src={activeLesson.videoUrl}
            style={{ width: '100%', display: 'block', maxHeight: '650px', aspectRatio: '16/9' }}
            poster={course.coverImage}
          />
        ) : (
          <Box sx={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1a1a1a' }}>
            <img src={course.coverImage} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Course Poster" />
          </Box>
        )}
      </Box>

      {/* 3. MAIN CONTENT */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ borderRadius: 4, mb: 6, overflow: 'hidden' }}>
            <Box sx={{ p: 3, bgcolor: '#fff' }}>
              <Typography variant="h5" fontWeight="bold">محتوى الكورس</Typography>
            </Box>
            <Divider />
            {sections.map((section, idx) => (
              <Accordion key={section.sectionId} elevation={0} defaultExpanded={idx === 0} sx={{ borderBottom: '1px solid #eee' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fbfbfb' }}>
                  <Typography fontWeight="bold">الفصل {idx + 1}: {section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List disablePadding>
                    {lessonsMap[section.sectionId]?.map((lesson) => (
                      <ListItem key={lesson.lessonId} disablePadding divider>
                        <ListItemButton
                           onClick={() => setActiveLesson(lesson)}
                           selected={activeLesson?.lessonId === lesson.lessonId}
                           sx={{ py: 2, '&.Mui-selected': { bgcolor: '#e3f2fd' } }}
                        >
                          <ListItemText
                            primary={lesson.title}
                            secondary={lesson.videoDuration}
                            sx={{ textAlign: 'right' }}
                            primaryTypographyProps={{ fontWeight: activeLesson?.lessonId === lesson.lessonId ? 'bold' : 'normal' }}
                          />
                          <ListItemIcon sx={{ minWidth: 40, justifyContent: 'flex-end' }}>
                            {lesson.isWatched || markedAsWatchedRef.current.has(lesson.lessonId) ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <PlayCircleOutlineIcon color="primary" />
                            )}
                          </ListItemIcon>
                          {!lesson.videoUrl && <LockIcon fontSize="small" sx={{ mr: 1, color: 'text.disabled' }} />}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          {/* INSTRUCTOR SECTION (Dynamic) */}
          <Paper variant="outlined" sx={{ borderRadius: 4, p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>عن المحاضر</Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Avatar
                src={course.teacherName === "mahmoud" ? "/mahmoud-profile.jpg" : "/instructor.jpg"}
                sx={{ width: 80, height: 80, border: '2px solid #eee' }}
              >
                {course.teacherName?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">{course.teacherName}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  مدرس معتمد في منصة Classat متخصص في {course.courseTitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      ⭐ 4.8
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      👥 1500 طالب
                    </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}