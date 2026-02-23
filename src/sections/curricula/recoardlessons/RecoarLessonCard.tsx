

'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { StudentLesson } from './RecoarLessonsSection';

type Props = {
  lesson: StudentLesson;
};

export default function RecoarLessonCard({ lesson }: Props) {
  const dateObj = new Date(lesson.enrolledAt);

  const formattedDate = dateObj.toLocaleDateString('en-GB');
  const formattedTime = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-6px)',
        },
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <Box sx={{ height: 220 }}>
        <img
          src={lesson.coverImage}
          alt={lesson.lessonTitle}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', 
            mb: 1,
          }}
        >
          <Typography  fontWeight={700} >
            {lesson.lessonTitle}
          </Typography>

          <Typography fontWeight={700}>
            {lesson.teacherName}
          </Typography>
        </Box>
        {/* Date & Time Row */}
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <CalendarTodayIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
    <Typography variant="body2">
      {formattedDate}
    </Typography>
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <AccessTimeIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
    <Typography variant="body2">
      {formattedTime}
    </Typography>
  </Box>
</Box>

        {/* Progress Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb:1 }}>
           <AccessTimeIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {lesson.progressPercentage}% completed
        </Typography>
        </Box>    
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={lesson.progressPercentage}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: '#3B82F6',
            },
          }}
        />
      </CardContent>
    </Card>
  );
}