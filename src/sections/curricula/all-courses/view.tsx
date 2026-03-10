'use client';

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import EducationCourseCard from '../education-course-card/education-course-card';

interface AllCoursesProps {
  courses: any[];
}

export default function AllCourses({ courses }: AllCoursesProps) {
  // Validate that we have courses to display
  if (!courses || courses.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          لا توجد دورات متاحة حالياً
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.default',mt:8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 5,
            textAlign: 'left', // Aligned for RTL
            color: 'text.primary'
          }}
        >
          جميع الدورات
        </Typography>

        {/* Responsive Grid System */}
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid
              item
              key={course.courseId || course.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <EducationCourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}