"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';
import MyCoursesCard from './mycoursecard'; // Assuming the card is imported
const LIVE_SESSIONS = [
  {
    image: '/assets/landing-page/live-sessions/courses/live1.jpg',
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ.محمود أحمد',
    attendees: '231 طالب',
    status:"تم انجاز0% من الكورس",
    barStatus: 0
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live2.png',
    category: 'Web Development',
    title: 'تطوير المواقع باستخدام رياكت',
    instructor: 'إبراهيم سعد',
    attendees: '487 طالب',
    status:"تم انجاز 30% من الكورس",
    barStatus: 30

  },
  {
    image: '/assets/landing-page/live-sessions/courses/live3.jpg',
    category: 'UI UX Desgin',
    title: ' تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    attendees: '100 طالب',
    status:"تم انجاز 100% من الكورس",
    barStatus: 100,

  },
  {
    image: '/assets/landing-page/live-sessions/courses/live4.png',
    category: 'React native',
    title: 'أساسيات تصميم التطبيقات',
    instructor: 'أ.أحمد موسى',
    attendees: '15 طالب',
    status:"تم انجاز 60% من الكورس",
    barStatus: 60

  },
];

export default function MyCoursesSection() {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>

        {/*  Sessions Grid */}
        <Grid container spacing={4} justifyContent={'center'}>
          {LIVE_SESSIONS.map((session, index) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={3} // Four cards per row on desktop
              key={index}
            >
              <MyCoursesCard
                image={session.image}
                category={session.category}
                title={session.title}
                instructor={session.instructor}
                barStatus={Number(session.barStatus)}
                status={session.status}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
