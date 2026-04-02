'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import Hero from './Hero';
import CategoriesClasse from './categories';
import NextLessonsPreview from './nextLessonsPreview';
import InstructorsSection from './sections/top-instructor/TopInstructorsSection';
import RecoarLessonsSection, { StudentLesson } from './recoardlessons/RecoarLessonsSection';
import LiveSessionCard from './live-sessions/LiveSessionCard';
import { ILiveSubject } from 'src/types/liveSubject';
import EducationCourseCard from './education-course-card/education-course-card';
import { paths } from 'src/routes/paths';
import PackageCard from './myPackages/myPackagesCard';
import { IPackageSubscription } from 'src/types/package';
import { StudentTeacherEducationItem } from 'src/types/teachers';

type EducationGrade = { id: string; name: string };

type SubjectItem = {
  id: string;
  educationSubjectId: string;
  educationSubjectName: string;
  educationSubjectLogo: string;
};

type CoursesProps = {
  educationGrade?: EducationGrade;
  subjects: SubjectItem[];
  courses: any[];
  teachers:StudentTeacherEducationItem[]
};

export default function Courses({ educationGrade, subjects, courses, teachers }: CoursesProps) {

  const t = useTranslations();
  const settings = useSettingsContext();
  const router = useRouter();

  // ===== State =====
  const [recordedLessons, setRecordedLessons] = useState<StudentLesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  const [liveCourses, setLiveCourses] = React.useState<ILiveSubject[]>([]);
  const [myPackages, setMyPackages] = React.useState<IPackageSubscription[]>([]);
  const [paymentList, setPaymentList] = React.useState<any[]>([]);


  const refreshData = async () => {
    try {
      // Refresh lessons
      const lessonsRes = await getData<any>(`${endpoints.liveSubjects.get}?MaxResultCount=4`);
      if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
        setLiveCourses(lessonsRes.data.items);
      } else {
        setLiveCourses([]);
      }
      const myPackages = await getData<any>(`${endpoints.packageSubscription.get}?MaxResultCount=4`);
      if (myPackages?.success && Array.isArray(myPackages?.data?.items)) {
        setMyPackages(myPackages.data.items);
      } else {
        setMyPackages([]);
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
            maxWidth: 1300,
          }}
        >
          <CategoriesClasse subjects={subjects} />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        {/* ===== Next Lessons ===== */}
        <Box
          sx={{
            py: { xs: 4, md: 6.5 },
            px: { xs: 4, md: 6.5 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '2%', xl: '8%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              الدروس القادمة
            </Typography>

            <Button color="info" sx={{ lineHeight: 1 }} onClick={() => router.push(paths.controlPanel.Curricula.nextlisson)}>
              الكل
              <LeftIcon />
            </Button>
          </Box>

        <Container>

          <NextLessonsPreview />
        </Container>
        </Box>

        {/* <LiveSessionsSection /> */}
        {/* <Box
          justifyContent={'center'}
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            mx: { md: '0', xs: '0', lg: '2%', xl: '8%' },
          }}
        > */}
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mb: 4,
            }}
          > */}
          <Container>
            <Grid container spacing={4} justifyContent={'center'} p={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {t('Nav.myRecordedLessons')}
                </Typography>
                <Button
                  color="info"
                  sx={{ lineHeight: 1 }}
                  onClick={() => router.push(paths.controlPanel.Curricula.mycourses)}
                >
                  {t('Label.all')}
                  <LeftIcon />
                </Button>
              </Box>
              {courses && courses.length > 0 ? (
                // Use a container here to hold the items
                <Grid container spacing={2}>
                  {courses.slice(0, 4).map((course: any) => (
                    <Grid
                      item
                      key={course.id || course.teacherId}
                      xs={12} // Stacked on mobile
                      sm={6} // 2 per row on small tablets
                      md={4} // 3 per row on medium screens
                      lg={3} // 4 per row on desktop (matches your goal)
                    >
                      <EducationCourseCard course={course} />
                    </Grid>
                  ))}
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
          </Container>
          <Container>
            <Grid container spacing={4} justifyContent={'center'} p={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {t('Nav.myRecordedLessons')}
                </Typography>
                <Button
                  color="info"
                  sx={{ lineHeight: 1 }}
                  onClick={() => router.push(paths.controlPanel.Curricula.myPackages)}
                >
                  {t('Label.all')}
                  <LeftIcon />
                </Button>
              </Box>
              {myPackages && myPackages.length > 0 ? (
                // Use a container here to hold the items
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12} // Stacked on mobile
                    sm={12} // Full width on small screens
                    md={12}
                    lg={12} // 4 per row on d  esktop (matches your goal)
                  >
                    <PackageCard lessonList={myPackages} key={myPackages[0]?.subscriptionId} />
                  </Grid>
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
          </Container>
          {/* ===== Live Sessions ===== */}
          {/* <LiveSessionsSection /> */}
          <Container>
            <Grid container spacing={4} justifyContent={'center'} p={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {t('Label.live_broadcast')}
                </Typography>

                <Button
                  color="info"
                  sx={{ lineHeight: 1 }}
                  // onClick={() => router.push('/curricula/live')}
                  onClick={() => router.push(paths.controlPanel.Curricula.live)}
                >
                  {t('Label.all')}

                  <LeftIcon />
                </Button>
              </Box>
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
            {/* </Box> */}
          </Container>

          {/*

        {/* ===== Top Teachers + Recorded Lessons ===== */}
          <Box
            sx={{
              py: { xs: 4, md: 6 },
              px: { xs: 4, md: 6 },
              direction: 'ltr',
              mx: { md: '0', xs: '0', lg: '2%', xl: '8%' },
            }}
          >
            {/* Top Teachers */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                المعلمين الأعلى تقييمًا
              </Typography>

              <Button
                color="info"
                sx={{ lineHeight: 1 }}
                onClick={() => router.push('/curricula/topTeacher')}
              >
                الكل
                <LeftIcon />
              </Button>
            </Box>
            <InstructorsSection teachers={teachers} />

            {/* Recorded Lessons */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                الدروس المسجلة
              </Typography>

              <Button
                color="info"
                sx={{ lineHeight: 1 }}
                onClick={() => router.push('/recoardlessons')}
              >
                الكل
                <LeftIcon />
              </Button>
            </Box> */}
            {/* {loadingLessons ? (
              <Typography>جاري تحميل الدروس...</Typography>
            ) : (
              <RecoarLessonsSection lessons={recordedLessons} limit={4} />
            )} */}
          </Box>
        </Box>
      {/* </Box> */}
    </>
  );
}
