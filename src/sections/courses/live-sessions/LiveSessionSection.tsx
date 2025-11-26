"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported


const LIVE_SESSIONS = [
  {
    image: '/assets/landing-page/live-sessions/courses/live1.png',
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
    image: '/assets/landing-page/live-sessions/courses/live3.png',
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

export default function LiveSessionsSection() {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* 1. Header and Action Button Row */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          {/* Section Title (Right side in RTL) */}
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: primaryTextColor }}>
                البثوث المباشرة الآن علي المنصة
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: paragraphTextColor, fontSize: 20, fontWeight: 400 }}
              >
                انضم الآن إلى إحدى الجلسات المباشرة
              </Typography>
            </Stack>
          </Grid>

          {/* Action Button (Left side in RTL) */}
          <Button
            variant="contained"
            size="medium"
            sx={{
              minWidth: 150,
              p: 2,
              alignSelf: 'flex-start',
              backgroundColor: mainColor,
              mt: smDown ? 2 : 0,
            }}
            endIcon={'>'}
          >
            اكتشف المزيد
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
          {LIVE_SESSIONS.map((session, index) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={3} // Four cards per row on desktop
              key={index}
            >
              <LiveSessionCard {...session} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
