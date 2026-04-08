'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Card, Stack, alpha, Typography, CardContent, LinearProgress } from '@mui/material';

export default function EducationCourseCard({ course }: { course: any }) {
    const router = useRouter();
  // دالة بسيطة لتنسيق التاريخ من الـ API
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en'); 
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  


  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
        m: 1
      }}
      onClick={() => router.push(`/curricula/${course.lessonId}`)}
    >
      {/* قسم الصورة العلوية */}
      <Box sx={{ position: 'relative', pt: '70%', overflow: 'hidden', m: 1.5, borderRadius: 3 }}>
        <Box
          component="img"
          src={course.coverImage || '/assets/placeholder/course.jpg'}
          alt={course.lessonTitle}
          sx={{
            position: 'absolute',
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent sx={{ pt: 1, dir: 'rtl' }}>
        {/* اسم المدرس والمادة */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
            أ. {course.teacherName}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A2027', fontSize: '1.1rem', 
            backgroundColor: 'rgba(104, 99, 99, 0.5)',
             padding: '4px 8px', 
             borderRadius: '4px'
              }}>
            {course.lessonTitle}
          </Typography>
        </Stack>

        {/* التاريخ والوقت */}
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
           <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarMonthIcon sx={{ fontSize: 20, color: '#FFAB00' }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {formatDate(course.enrolledAt)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 20, color: '#FFAB00' }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {formatTime(course.enrolledAt)}
            </Typography>
          </Stack>
        </Stack>

        {/* إحصائيات المشاهدة */}
        {(() => {
  // 1. Calculate total duration from the two raw fields
  const totalDurationInMinutes = (course.totalHours * 60) + course.totalMinutes;
  const totalHrs = Math.floor(totalDurationInMinutes / 60);
  const totalMins = totalDurationInMinutes % 60;

  // 2. Handle watched time (Assuming watchedHours is a decimal like 0.5)
  // Convert watched hours to total minutes so we can extract clean H and M
  const watchedInMinutes = Math.round(course.watchedHours * 60);
  const watchedHrs = Math.floor(watchedInMinutes / 60);
  const watchedMins = watchedInMinutes % 60;

  // 3. Clean percentage
  const cleanPercentage = Math.round(course.progressPercentage);
 return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" sx={{ mb: 1.5 }}>
      <AccessTimeIcon sx={{ fontSize: 20, color: '#FFAB00' }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {/* Shows: 0 س و 30 د من 1 س و 15 د */}
        {watchedHrs} س و {watchedMins} د من {totalHrs} س و {totalMins} د ({cleanPercentage}%)
      </Typography>
    </Stack>
  );
})()}
        {/* شريط التقدم */}
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(course.progressPercentage || 0).toFixed(2)} // قيمة افتراضية بسيطة للجمال لو كانت 0
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: alpha('#36B37E', 0.1),
              '& .MuiLinearProgress-bar': {
                bgcolor: '#36B37E',
                borderRadius: 5,
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}