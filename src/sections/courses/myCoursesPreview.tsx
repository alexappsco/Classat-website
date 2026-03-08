'use client';

import Link from 'next/link';
import * as React from 'react';
import { paths } from 'src/routes/paths';
import { Course } from 'src/types/course';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import MyCoursesCard from '../mycourses/mycoursecard';
import { useRouter } from 'next/navigation';

type MyCoursesPreviewProps = {
  all_courses: Course[];
  paymentList: any[];
};

export default function MyCoursesPreview({ all_courses, paymentList }: MyCoursesPreviewProps) {

  console.log("all courses", all_courses);
  const router = useRouter();
  // عرض أول 4 كورسات فقط
  const displayCourses = React.useMemo(() => {
    return Array.isArray(all_courses) ? all_courses.slice(0, 4) : [];
  }, [all_courses]);

  if (!displayCourses.length) return null;
  console.log("displayCourses", displayCourses);

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
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
            href="/courses/all"
            color="primary"
            variant="soft"
            endIcon={<LeftIcon />}
          >
            عرض الكل
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {displayCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.courseId}>
              <MyCoursesCard
                course={course} // ✅ Pass single course object, not the entire array
                paymentList={paymentList}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}