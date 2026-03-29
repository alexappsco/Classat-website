'use client';

import { endpoints } from 'src/utils/endpoints';
import PeopleIcon from '@mui/icons-material/People';
import React, { useRef, useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getData, postData } from 'src/utils/crud-fetch-api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  CourseLesson,
  sectionsNumber,
  sessionSection,
  CourseEnrolledDetails
} from 'src/types/course_enrolled';
import {
  Box,
  Grid,
  List,
  Chip,
  Fade,
  Paper,
  Avatar,
  Rating,
  Divider,
  ListItem,
  Container,
  Accordion,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';


interface Props {
  course: CourseEnrolledDetails;
  sections: sectionsNumber[];
}

export default function CourseDetailsEnrolledView({ course, sections }: Props) {
  const [lessonsMap, setLessonsMap] = useState<Record<string, CourseLesson[]>>({});
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const markedAsWatchedRef = useRef<Set<string>>(new Set());

  /* ===================== MARK AS WATCHED ===================== */
  const handleMarkAsWatched = async (lessonId: string) => {
    if (markedAsWatchedRef.current.has(lessonId)) return;

    try {
      const res = await postData(endpoints.CourseEnroll.markWatched(lessonId), {});
      if (res) {
        markedAsWatchedRef.current.add(lessonId);
        setLessonsMap(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(sectionId => {
            updated[sectionId] = updated[sectionId].map(lesson =>
              lesson.lessonId === lessonId
                ? { ...lesson, isWatched: true }
                : lesson
            );
          });
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!activeLesson || activeLesson.isWatched) return;

    if (video.duration - video.currentTime <= 10) {
      handleMarkAsWatched(activeLesson.lessonId);
    }
  };

  /* ===================== FETCH CONTENT ===================== */
  useEffect(() => {
    const fetchContent = async () => {
      const results: Record<string, CourseLesson[]> = {};

      for (const section of sections) {
        const res = await getData(
          endpoints.CourseEnroll.getCourses_Section_Sessions(section.sectionId)
        );


     const sessions: sessionSection[] = Array.isArray(
          (res as any)?.data?.items
        )
          ? (res as any).data.items
          : [];
        const lessons = await Promise.all(
          sessions.map(async s => {
            try {
              const lessonRes = await getData(
                endpoints.CourseEnroll.getCourssesLesson(s.sessionId)
              );
              return lessonRes?.data as CourseLesson;
            } catch {
              return null;
            }
          })
        );

        results[section.sectionId] = lessons.filter(Boolean) as CourseLesson[];

        if (!activeLesson && results[section.sectionId].length) {
          setActiveLesson(results[section.sectionId][0]);
        }
      }

      setLessonsMap(results);
    };

    if (sections.length) fetchContent();
  }, [sections]);

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 8, mt: 8 }}>
      {/* ===================== HEADER ===================== */}
      <Box sx={{ bgcolor: '#1c1d1f', color: 'white', py: { xs: 4, md: 6 }, mb: 4 }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={8}>
              <Chip label={course.courseCategoryName} color="warning" size="small" sx={{ mb: 2 }} />

              <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
                {course.courseTitle}
              </Typography>

              <Typography sx={{ opacity: 0.8, mb: 3 }}>
                {course.courseDescription}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={4.8} readOnly size="small" />
                  <Typography variant="body2" sx={{ color: '#f3ca8c' }}>
                    (5,842 ratings)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PeopleIcon fontSize="small" />
                  <Typography variant="body2">
                    {course.progressPercentage}% Progress
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">Last updated 2024</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===================== MAIN CONTENT ===================== */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 6, lg: 10, xl: 14 }
        }}
      >
        <Grid container spacing={4}>
          {/* VIDEO & DETAILS */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 3 }}>
              {activeLesson?.videoUrl ? (
                <Fade in>
                  <video
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    src={activeLesson.videoUrl}
                    poster={course.coverImage}
                    style={{ width: '100%', aspectRatio: '16/9' }}
                  />
                </Fade>
              ) : null}
            </Paper>

            <Typography variant="h5" fontWeight="bold" mb={2}>
              About this course
            </Typography>

            <Typography mb={5} color="text.secondary">
              {course.courseDescription}
            </Typography>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                Instructor
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography fontWeight="bold" color="primary">
                    {course.teacherName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Senior Web Developer & Instructor
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* SIDEBAR */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { lg: 'sticky' }, top: 24 }}>
              <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                <Box sx={{ p: 2, bgcolor: '#f7f9fa' }}>
                  <Typography fontWeight="bold">Course Content</Typography>
                </Box>

                <Divider />

                <Box sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
                  {sections.map((section, idx) => (
                    <Accordion key={section.sectionId} disableGutters>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight="bold">
                          Section {idx + 1}: {section.title}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails sx={{ p: 0 }}>
                        <List disablePadding>
                          {lessonsMap[section.sectionId]?.map(lesson => (
                            <ListItem key={lesson.lessonId} disablePadding>
                              <ListItemButton
                                selected={activeLesson?.lessonId === lesson.lessonId}
                                onClick={() => setActiveLesson(lesson)}
                              >
                                <ListItemIcon>
                                  {lesson.isWatched ? (
                                    <CheckCircleIcon color="success" />
                                  ) : (
                                    <PlayCircleOutlineIcon />
                                  )}
                                </ListItemIcon>

                                <ListItemText
                                  primary={lesson.title}
                                  secondary={lesson.videoDuration}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}