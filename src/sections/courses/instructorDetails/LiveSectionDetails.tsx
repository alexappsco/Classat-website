"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Select, MenuItem, Container } from '@mui/material';

import LiveSessionCard from '../../live/live-sessions/LiveSessionCard';

// import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported


const LIVE_SESSIONS = [
  {
    image: '/assets/landing-page/live-sessions/courses/live1.jpg',
    isLive: true,
    category: 'UI UX Desgin',
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
    image: '/assets/landing-page/live-sessions/courses/live3.jpg',
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

export default function LiveSectionDetails({title}:{title: string}) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  return (
    <Box>
      <Container>
      <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          alignItems={{ xs: 'stretch', md: 'start' }}
          gap={2}
          justifyContent="start"
          dir="rtl"
          sx={{ width: '100%', my: 2 }}
        >
          {/* Dropdowns */}
          {['ريأكت','فرونت اند','البرمجة','التاريخ'].map((item, idx) => (
            <Select
              key={idx}
              defaultValue={item}
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: { xs: 40, md: 48 },
                minWidth: { xs: 120, md: 140 + idx * 10 },
                px: 1,
                '& fieldset': { border: 'none' },
                bgcolor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                fontSize: { xs: 14, md: 16 },
              }}
            >
              <MenuItem value={item}>{item}</MenuItem>
            </Select>
          ))}

          {/* Search Input */}

        </Box>
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
