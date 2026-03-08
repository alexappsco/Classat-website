'use client';
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/dist/client/components/navigation';

import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { ILiveSubject } from 'src/types/liveSubject';

const LIVE_SESSIONS = [
  {
    image: '/assets/landing-page/live-sessions/courses/live2.png',
    isLive: true,
    category: 'UI UX Desgin', // Note: Corrected typo from image (Design)
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'بدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live2.png',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'بدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live4.png',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'بدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live4.png',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'بدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
];
type Props = {
  // studentAppointments: any;
  // lessonList: any[];
  // id: string;
  paymentList: any[];
  // subjectId: string;
  title: string;
  liveCourse?: ILiveSubject[];

};

export default function LiveSessionsSection({ title, paymentList, liveCourse }: Props) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* 1. Header and Action Button Row */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          {/* Section Title (Right side in RTL) */}
          {/* <Grid item xs={12} sm={8} md={9}> */}
          <Stack spacing={0.5}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: primaryTextColor }}>
              البثوث المباشرة
            </Typography>
            {/* <Typography
                variant="body1"
                sx={{ color: paragraphTextColor, fontSize: 20, fontWeight: 400 }}
              >
                انضم الآن إلى إحدى الجلسات المباشرة
              </Typography> */}
          </Stack>
          {/* </Grid> */}

          {/* Action Button (Left side in RTL) */}
          <Button color="info" sx={{ lineHeight: 1 }} onClick={() => router.push('/curricula/live')}>
            الكل
            <span>
              <LeftIcon />
            </span>
          </Button>
          {/* <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{ textAlign: { xs: 'right', sm: 'left' }, mt: { xs: 2, sm: 0 } }}
            width={'fit-content'}
          >
          </Grid> */}
        </Grid>

        {/* 2. Live Sessions Grid */}
        <Grid container spacing={4} justifyContent={'center'}>
          {/* {liveCourse.map((session, index) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={3} // Four cards per row on desktop
              key={index}
            >
              <LiveSessionCard
                lessonList={session.lessonList}
                teacher_id={session.teacher_id}
                paymentList={session.paymentList}
                key={liveCourse[0]?.id} 
              {...session} />
            </Grid>
          ))} */}
          {liveCourse && liveCourse.length > 0 ? (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={12} // Full width on small screens
              md={12}
              lg={12} // Four cards per row on desktop
            >
              <LiveSessionCard
                lessonList={liveCourse}
                teacher_id={liveCourse[0]?.teacherId || ''}
                paymentList={paymentList}
                key={liveCourse[0]?.id}
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
      </Container>
    </Box>
  );
}
