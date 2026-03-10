'use client';

import { endpoints } from 'src/utils/endpoints';
import React, { useRef, useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getData, postData } from 'src/utils/crud-fetch-api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box, Grid, List, Chip, Paper, Avatar,
  ListItem, Container, Accordion, Typography, ListItemIcon,
  ListItemText, ListItemButton, AccordionSummary, AccordionDetails
} from '@mui/material';

export default function EducationCourseDetailsView({ courseDetails, sessions: initialSections }: { courseDetails: any, sessions: any[] }) {
  // lessonsMap will store sessions for each sectionId
  const [lessonsMap, setLessonsMap] = useState<Record<string, any[]>>({});
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const markedAsWatchedRef = useRef<Set<string>>(new Set());

  /* ===================== FETCH SESSIONS FOR SECTIONS ===================== */
  useEffect(() => {
    const fetchAllSessions = async () => {
      const results: Record<string, any[]> = {};

      for (const section of initialSections) {
        try {
          const res = await getData<any>(endpoints.EducationCourses.getSessionId(section.sectionId));
          const sessionItems = res?.data?.items || [];
          results[section.sectionId] = sessionItems;

          // Set the first available session as the active one by default
          if (!activeLesson && sessionItems.length > 0) {
            setActiveLesson(sessionItems[0]);
          }
        } catch (error) {
          console.error(`Error fetching sessions for section ${section.sectionId}:`, error);
        }
      }
      setLessonsMap(results);
    };

    if (initialSections?.length) {
      fetchAllSessions();
    }
  }, [initialSections]);

  /* ===================== VIDEO WATCHED LOGIC ===================== */
  const handleMarkAsWatched = async (sessionId: string) => {
    if (markedAsWatchedRef.current.has(sessionId)) return;

    try {
      const res = await postData(endpoints.EducationCourses.markWatched(sessionId), {});
      if (res) {
        markedAsWatchedRef.current.add(sessionId);
        // Update local state to show checkmark immediately
        setLessonsMap(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(key => {
            updated[key] = updated[key].map(s =>
              s.sessionId === sessionId ? { ...s, isWatched: true } : s
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

    // If 90% of video is watched or 10 seconds remaining, mark as watched
    if (video.duration - video.currentTime <= 10) {
      handleMarkAsWatched(activeLesson.sessionId);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 8 }}>
      {/* HEADER SECTION */}
      <Box sx={{ bgcolor: '#1c1d1f', color: 'white', py: { xs: 4, md: 6 }, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            {courseDetails.lessonTitle}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={courseDetails.teacherImage} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2">By {courseDetails.teacherName}</Typography>
            </Box>
            <Chip label={`${courseDetails.progressPercentage.toFixed(2)}% Completed`} color="primary" variant="outlined" sx={{ color: 'white' }} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* LEFT COLUMN: PLAYER */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 3, bgcolor: 'black', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {activeLesson?.videoUrl ? (
                <video
                  key={activeLesson.sessionId}
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  src={activeLesson.videoUrl}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Typography color="grey.600">Select a session to start watching</Typography>
              )}
            </Paper>

            <Typography variant="h5" fontWeight="bold" gutterBottom>About Instructor</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar src={courseDetails.teacherImage} sx={{ width: 64, height: 64 }} />
              <Box>
                <Typography fontWeight="bold" color="primary">{courseDetails.teacherName}</Typography>
                <Typography variant="body2" color="text.secondary">Subject Matter Expert</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: CURRICULUM */}
          <Grid item xs={12} lg={4}>
            <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ p: 2, bgcolor: '#f7f9fa', borderBottom: '1px solid #ddd' }}>
                <Typography fontWeight="bold">Course Content</Typography>
              </Box>

              <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {initialSections.map((section, idx) => (
                  <Accordion key={section.sectionId} defaultExpanded={idx === 0} disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {idx + 1}. {section.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      <List disablePadding>
                        {(lessonsMap[section.sectionId] || []).map((session) => (
                          <ListItem key={session.sessionId} disablePadding>
                            <ListItemButton
                              selected={activeLesson?.sessionId === session.sessionId}
                              onClick={() => setActiveLesson(session)}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                {session.isWatched ? <CheckCircleIcon color="success" fontSize="small" /> : <PlayCircleOutlineIcon fontSize="small" />}
                              </ListItemIcon>
                              <ListItemText
                                primary={session.title}
                                secondary={session.videoDuration}
                                primaryTypographyProps={{ variant: 'body2', fontWeight: activeLesson?.sessionId === session.sessionId ? 'bold' : 'normal' }}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}