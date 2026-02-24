
'use client';

import { Grid, Box, Typography, Container } from '@mui/material';
import RecoarLessonCard from './RecoarLessonCard';

export type StudentLesson = {
  enrollmentId: string;
  lessonId: string;
  lessonTitle: string;
  coverImage: string;
  teacherName: string;
  progressPercentage: number;
  status: number;
  lastWatchedSessionId: string | null;
  enrolledAt: string;
  completedAt: string | null;
};

type Props = {
  lessons: StudentLesson[];
  limit?: number;
};

export default function RecoarLessonsSection({ lessons, limit }: Props) {
  const displayedLessons = limit
    ? lessons.slice(0, limit)
    : lessons;

  if (!displayedLessons.length) {
    return (
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography>لا يوجد دروس مسجلة</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 8, md: 15 }, px: { xs: 4, md: 4 } }}>
      <Container>
        <Grid container spacing={5}>
          {displayedLessons.map((lesson) => (
            <Grid item xs={12} sm={6} md={3} key={lesson.enrollmentId}>
              <RecoarLessonCard lesson={lesson} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}