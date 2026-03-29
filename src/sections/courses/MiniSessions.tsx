"use client";

import Link from 'next/link';
import { text } from 'src/theme/palette';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { CoursesEnrolled } from 'src/types/course-enrolled';
import { Box, Card, Grid, Stack, Avatar, Button, Container, Typography, LinearProgress } from "@mui/material";
import { useRouter } from 'next/navigation';

interface MiniSessionsWithHeaderProps {
  title: string;
  sessions: CoursesEnrolled[];
  hideButton?: boolean;
}

export default function MiniSessionsWithHeader({
  title,
  sessions = [],
  hideButton = false,
}: MiniSessionsWithHeaderProps) {
  const router = useRouter();
  const primaryTextColor = text.primary;

  if (!sessions || sessions.length === 0 || !sessions[0]?.courseId) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* Header Section */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: primaryTextColor }}>
              {title}
            </Typography>
          </Grid>

          {!hideButton && (
            <Link href="/ar/mycourses/" passHref style={{ textDecoration: 'none' }}>
              <Button color="info" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                الكل
                <LeftIcon  />
              </Button>
            </Link>
          )}
        </Grid>

        {/* Enrolled Courses Grid */}
        <Grid container spacing={2}>
          {sessions.map((session) => (
            <Grid item key={session.enrollmentId || session.courseId} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 1.5,
                  gap: 1.5,
                  minHeight: 130, // Increased height for the button
                  display: "flex",
                  borderRadius: 2,
                  width: "100%",
                  alignItems: "center",
                  boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #f4f6f8',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                {/* Course Image */}
                <Box
                  component="img"
                  src={session.coverImage}
                  alt={session.courseTitle}
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: 1.5,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                {/* Content Section */}
                <Stack spacing={0.5} flexGrow={1} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontWeight: 700, fontSize: '0.85rem' }}
                  >
                    {session.courseTitle}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={''}
                      sx={{ width: 18, height: 18, fontSize: 9 }}
                    >
                      {session.teacherName?.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ fontSize: 10, color: 'text.secondary' }}
                    >
                      {session.teacherName}
                    </Typography>
                  </Stack>

                  <Typography variant="caption" sx={{ color: "text.disabled", fontSize: 10 }}>
                    {session.numberOfLessons} دروس • {session.totalMinutes} دقيقة
                  </Typography>

                  <Box sx={{ width: '100%', mt: 0.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={session.progressPercentage || 0}
                      sx={{ height: 4, borderRadius: 5, bgcolor: '#edf2f7' }}
                    />
                  </Box>

                  {/* ⚡ The Added Resume Button */}
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{
                      mt: 1,
                      fontSize: '0.75rem',
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 700,
                      boxShadow: 'none'
                    }}
                    onClick={() => router.push(`/mycourses/${session.courseId}`)}
                  >
                    استئناف الكورس
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}