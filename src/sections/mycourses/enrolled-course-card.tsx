"use client";

import { Box, Card, Stack, Avatar, Typography, LinearProgress, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { text, primary } from 'src/theme/palette';

interface Props {
  course: {
    courseId: string;
    courseTitle: string;
    coverImage: string;
    teacherName: string;
    teacherImage: string;
    progressPercentage: number;
    status: string;
  };
}

export default function EnrolledCourseCard({ course }: Props) {
  const { courseTitle, coverImage, teacherName, teacherImage, progressPercentage } = course;
  const router=useRouter();

  // Logic to determine progress text based on API data
  const getStatusText = () => {
    if (progressPercentage === 0) return "لم يتم البدء بعد";
    if (progressPercentage === 100) return "تم إنجاز الكورس";
    return `تم إنجاز ${progressPercentage}% من الكورس`;
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        direction: 'ltr',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* Course Image Section */}
      <Box sx={{ position: 'relative', pt: '60%' }}>
        <Box
          component="img"
          src={coverImage}
          alt={courseTitle}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content Section */}
      <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            color: 'text.primary',
            minHeight: '2.8rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {courseTitle}
        </Typography>

        {/* Instructor Info */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={teacherImage}
            sx={{ width: 28, height: 28 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {teacherName}
          </Typography>
        </Stack>

        {/* Progress Section */}
        <Stack spacing={0.5} sx={{ pt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: progressPercentage === 0 ? 'text.disabled' : 'text.secondary',
              fontWeight: 500,
            }}
          >
            {getStatusText()}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 6,
              borderRadius: 5,
              bgcolor: '#F4F6F8',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                bgcolor: progressPercentage === 100 ? '#4caf50' : primary.main,
              },
            }}
          />
        </Stack>

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{
            mt: 1.5,
            py: 1,
            fontWeight: 700,
            borderRadius: 1.5,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' }
          }}
          onClick={() => router.push(`/mycourses/${course.courseId}`)}
        >
          استئناف الكورس
        </Button>
      </Stack>
    </Card>
  );
}