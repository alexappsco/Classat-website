'use client';

import * as React from 'react';
import { Box, Button, Container, Grid, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Components
import Hero from './Hero';
import Categories from './categories';
import MiniSessions from './MiniSessions';
import CustomPagination from './CustomPagination';
import MyCoursesPreview from './myCoursesPreview';
import LiveSessionCard from './live-sessions/LiveSessionCard';

// Tools & Types
import { ILiveCourse } from 'src/types/liveCourse';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

type Props = {
  categories: any[];
  getAllCourses: any[];
  getCoursesEnrolled: any[]; // الاشتراكات الأولية من السيرفر
};

export default function Courses({ categories, getAllCourses, getCoursesEnrolled }: Props) {
  const [liveCourses, setLiveCourses] = useState<ILiveCourse[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>(getCoursesEnrolled); // إضافة state للاشتراكات
  const [paymentList, setPaymentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const t = useTranslations();

  const refreshData = async () => {
    setLoading(true);
    try {
      const coursesRes = await getData<any>(`${endpoints.liveCourse.get}?MaxResultCount=4`);
      if (coursesRes?.success) {
        setLiveCourses(coursesRes.data.items || []);
      }

      const paymentRes = await getData<any>(endpoints.payment.get);
      if (paymentRes?.success) {
        setPaymentList(paymentRes.data.items || []);
      }

      const enrollRes = await getData<any>(endpoints.liveCourseEnrollments.get);
      if (enrollRes?.success) {
        setEnrollments(enrollRes.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching courses data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />
        <Box sx={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%', maxWidth: 1330 }}>
          <Categories categories={categories} />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        <MiniSessions title="استئناف التعلم" sessions={enrollments} />

        <MyCoursesPreview all_courses={getAllCourses} paymentList={paymentList} />

        <Grid container spacing={4} justifyContent={'center'} p={4}>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {t('Label.live_broadcast')}
              </Typography>
              <Button color="info" onClick={() => router.push('/courses/live')}>
                {t('Label.all')} <LeftIcon />
              </Button>
            </Box>
          </Container>

          {loading ? (
            <CircularProgress sx={{ m: 5 }} />
          ) : liveCourses.length > 0 ? (
            <Grid item xs={12}>
              <LiveSessionCard
                teacher_id={liveCourses[0]?.teacherId || ''}
                lessonList={liveCourses}
                enrollments={enrollments}
                paymentList={paymentList}
              />
            </Grid>
          ) : (
            <Typography variant="h6" color="text.secondary" sx={{ p: 5 }}>
              لا توجد جلسات مباشرة متاحة حالياً
            </Typography>
          )}
        </Grid>

        <CustomPagination />
      </Box>
    </>
  );
}