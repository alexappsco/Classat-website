'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { text } from 'src/theme/palette';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import MyCoursesCard from '../mycourses/mycoursecard';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

type Course = {
  id: string;
  coverImage: string;
  courseTitle: string;
  teacherName: string;
  progressPercentage: number;
  status: string;
};

export default function MyCoursesPreview() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const primaryTextColor = text.primary;

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getData(endpoints.studentCourse.getCourses);

        const items: Course[] = (response as any)?.data?.items ?? [];

        setCourses(items.slice(0, 4));
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return null;
  if (!courses.length) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 5 }, px: { xs: 4, md: 6 } }}>
      <Container>
        {/* Header */}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 400, color: primaryTextColor }}
              >
                دوراتي
              </Typography>
            </Stack>
          </Grid>

          <Link href="/mycourses">
            <Button color="info" sx={{ lineHeight: 1 }}>
              الكل
              <span>
                <LeftIcon />
              </span>
            </Button>
          </Link>
        </Grid>

        {/* Courses Grid */}
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <MyCoursesCard
                image={course.coverImage}
                title={course.courseTitle}
                instructor={course.teacherName}
                barStatus={Number(course.progressPercentage)}
                status={`تم انجاز ${course.progressPercentage}% من الكورس`}
                statusText={course.status}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}