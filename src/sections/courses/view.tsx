'use client';

import * as React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import Hero from './Hero';
import Categories from './categories';
import MiniSessions from './MiniSessions';
import { SESSIONS } from './data/sessions';
import CustomPagination from './CustomPagination';
import SessionsSection from './sessions/SessionsSection';
import LiveSessionsSection from './live-sessions/LiveSessionSection';
import MyCoursesPreview from './myCoursesPreview';
import LiveSessionCard from './live-sessions/LiveSessionCard';
import { ILiveCourse } from 'src/types/liveCourse';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { useRouter } from 'next/navigation';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { useTranslations } from 'next-intl';
import { Course } from 'src/types/course';
import { get } from 'lodash';
import { CoursesEnrolled } from 'src/types/course-enrolled';

// ===== Types =====
type CourseCategory = {
  id: string;
  name: string;
  logo?: string;
};

// type Props = {
// };

type Props = {

  title?: string;
  liveCourse?: ILiveCourse[];

  categories: CourseCategory[];
  getAllCourses: Course[];
  getCoursesEnrolled: CoursesEnrolled[];

};


export default function Courses({ categories, getAllCourses, getCoursesEnrolled }: Props) {

const [liveCourses, setLiveCourses] = React.useState<ILiveCourse[]>([]);
  const [paymentList, setPaymentList] = React.useState<any[]>([]);
  const router = useRouter();
  const t = useTranslations();

  // Function to refresh data
  const refreshData = async () => {
    try {



      // Refresh lessons
      const lessonsRes = await getData<any>(`${endpoints.liveCourse.get}?MaxResultCount=4`);
      if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
        setLiveCourses(lessonsRes.data.items);
      } else {
        setLiveCourses([]);
      }

      const paymentResponse = await getData<any>(endpoints.payment.get);
      if (paymentResponse?.success && Array.isArray(paymentResponse?.data?.items)) {
        setPaymentList(paymentResponse.data.items);
      } else {
        setPaymentList([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  };
  React.useEffect(() => {
    refreshData();
  }, []);
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />

        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '90%',
            maxWidth: 1330,
          }}
        >
          <Categories categories={categories} />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        <MiniSessions title="استئناف التعلم " sessions={getCoursesEnrolled} />
          <MyCoursesPreview all_courses={getAllCourses} paymentList={paymentList} />
        {/* <SessionsSection
          title="موصى به لك"
          sessions={SESSIONS.RECOMMENDED_SESSIONS}
        />

        <SessionsSection
          title="الأعلى تقييماً"
          sessions={SESSIONS.TOP_RATED_SESSIONS}
        /> */}

        {/* <LiveSessionsSection /> */}
        <Grid container spacing={4} justifyContent={'center'} p={4}>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
 {t('Label.live_broadcast')}  
             </Typography>

              <Button
                color="info"
                sx={{ lineHeight: 1 }}
                onClick={() => router.push('/courses/live')}
              >
                {t('Label.all')}

                <LeftIcon />
              </Button>
            </Box>
          </Container>

          {liveCourses && liveCourses.length > 0 ? (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={12} // Full width on small screens
              md={12}
              lg={12} // Four cards per row on desktop
            >
              <LiveSessionCard
                lessonList={liveCourses}
                teacher_id={liveCourses[0]?.teacherId || ''}
                paymentList={paymentList}
                key={liveCourses[0]?.id}

              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  لا توجد جلسات مباشرة متاحة
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        <CustomPagination />
      </Box>
    </>
  );
}