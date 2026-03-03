'use client';

import Link from 'next/link';
import * as React from 'react';
import { paths } from 'src/routes/paths';
import { Course } from 'src/types/course';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import MyCoursesCard from '../mycourses/mycoursecard';

type MyCoursesPreviewProps = {
  all_courses: Course[];
};

export default function MyCoursesPreview({ all_courses }: MyCoursesPreviewProps) {
  console.log(all_courses);
  // عرض أول 4 كورسـات فقط
  const displayCourses = React.useMemo(() => {
    return Array.isArray(all_courses) ? all_courses.slice(0, 4) : [];
  }, [all_courses]);

  if (!displayCourses.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.neutral' }}>
      <Container maxWidth="xl"> {/* تكبير الحاوية لتناسب 4 كروت بشكل مريح */}

        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            جميع الكورسات
          </Typography>

          <Button
            component={Link}
            href="/all-courses"
            color="primary"
            variant="soft"
            endIcon={<LeftIcon  />}
          >
            عرض الكل
          </Button>
        </Stack>

        {/* Courses Grid - 4 Columns on Desktop */}
        {/* <Grid container spacing={3}>
          {displayCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.courseId}>
              <MyCoursesCard
                image={course.coverImageUrl}
                title={course.title}
                instructor={course.teacherName}
                barStatus={0}
                status="لم يتم البدء بعد"
                link={paths.controlPanel.mycourses.single(course.courseId)}
              />
            </Grid>
          ))}
        </Grid> */}
        <Grid container spacing={3}>
          {displayCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.courseId}>
              <MyCoursesCard
                image={course.coverImageUrl}
                title={course.title}
                instructor={course.teacherName}
                isEnrolled={course.isEnrolled} // تمرير الـ boolean من الداتا
                // barStatus={course.progressPercentage || 0}
                status={course.isEnrolled ? "مستمر" : "متاح للشراء"}
                link={paths.controlPanel.mycourses.single(course.courseId)}
                onAddToCart={() => console.log('Added to cart', course.courseId)}
                onBuyNow={() => console.log('Buy now', course.courseId)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}