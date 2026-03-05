

"use client";

import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Container, Typography } from '@mui/material';
import MyCoursesCard from './mycoursecard';
import EnrolledCourseCard from './enrolled-course-card';

type Props = {
  courses: any[];
};

export default function MyCoursesSection({ courses }: Props) {
  console.log("courses bxxf", courses)

  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 } }}>
      <Container>
        {/* Courses Grid */}
        <Grid container spacing={4} >
          {courses.map((course, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
            <EnrolledCourseCard course={course} />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
