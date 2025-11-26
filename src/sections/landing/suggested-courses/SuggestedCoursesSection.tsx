import { Container, Grid, Box, Typography, Button, Stack } from '@mui/material';
import LiveSessionCard from './SuggestedCoursesCard'; // Assuming the card is imported
import theme from 'src/theme';
import { useTheme } from '@emotion/react';
import { primary, text } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import SuggestedCoursesCard from './SuggestedCoursesCard';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SUGGESTED_COURSES = [
  {
    image: '/assets/landing-page/live-sessions/courses/live1.jpg',
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: '24 hr 40 mins', // Updated time format based on new design
    attendees: '12 Lessons', // Updated attendees to lessons count
    rating: 4.8, // New: Rating score
    price: '60.00 درهم', // New: Price field
    ratingCount: '5.8K+',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live2.png',
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: '24 hr 40 mins', // Updated time format based on new design
    attendees: '12 Lessons', // Updated attendees to lessons count
    rating: 4.8, // New: Rating score
    price: '60.00 درهم', // New: Price field
    ratingCount: '5.8K+',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live3.jpg',
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: '24 hr 40 mins', // Updated time format based on new design
    attendees: '12 Lessons', // Updated attendees to lessons count
    rating: 4.8, // New: Rating score
    price: '60.00 درهم', // New: Price field
    ratingCount: '5.8K+',
  },
  {
    image: '/assets/landing-page/live-sessions/courses/live4.png',
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: '24 hr 40 mins', // Updated time format based on new design
    attendees: '12 Lessons', // Updated attendees to lessons count
    rating: 4.8, // New: Rating score
    price: '60.00 درهم', // New: Price field
    ratingCount: '5.8K+',
  },
];

export default function SuggestedCoursesSection() {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* 1. Header and Action Button Row */}
        {/* 2. Live Sessions Grid */}
        <Grid container spacing={4} justifyContent={'center'}>
          {SUGGESTED_COURSES.map((course, index) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={4} // Four cards per row on desktop
              lg={3}
              key={index}
            >
              <SuggestedCoursesCard {...course} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            color="info" // Light blue color
            sx={{ minWidth: 200, py: 1.5, borderRadius: 2 }}
            // startIcon={'<'} // Arrow pointing left in RTL
          >
            عرض كل الكورسات
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
