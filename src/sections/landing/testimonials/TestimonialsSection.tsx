import { Box, Stack, Grid, IconButton } from '@mui/material';
import TestimonialsCard from './TestimonialsCard';
import { primary, secondary } from 'src/theme/palette';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const orangeColor = secondary.main;
const liteOrangeColor = secondary.lighter;

const TESTIMONIALS = [
  {
    name: 'أحمد خالد',
    role: 'طالب برمجة',
    avatar: '/assets/landing-page/live-sessions/instructors/instructor.png',
    text: 'منصة رائعة! المدرسون محترفون والكورسات منظمة بشكل ممتاز. استطعت تعلم React في شهرين فقط.',
  },
  {
    name: 'أحمد خالد',
    role: 'طالب برمجة',
    avatar: '/assets/landing-page/live-sessions/instructors/instructor.png',
    text: 'منصة رائعة! المدرسون محترفون والكورسات منظمة بشكل ممتاز. استطعت تعلم React في شهرين فقط.',
  },
  {
    name: 'أحمد خالد',
    role: 'طالب برمجة',
    avatar: '/assets/landing-page/live-sessions/instructors/instructor.png',
    text: 'منصة رائعة! المدرسون محترفون والكورسات منظمة بشكل ممتاز. استطعت تعلم React في شهرين فقط.',
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 8 }, direction: 'ltr' }}>
      {/* Cards */}
      <Grid container spacing={3} justifyContent="center">
        {TESTIMONIALS.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TestimonialsCard
              name={item.name}
              role={item.role}
              text={item.text}
              avatar={item.avatar}
            />
          </Grid>
        ))}
      </Grid>

      {/* Bottom Controls */}
      <Stack
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mt={6}
      >
        {/* Dots */}
        <Stack direction="row" spacing={1}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: orangeColor }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#d9d9d9' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#d9d9d9' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#d9d9d9' }} />
        </Stack>

        {/* Arrows */}
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
              padding: '10px 15px',
            }}
          >
            {`<`}
          </IconButton>

          <IconButton
            sx={{
              backgroundColor: orangeColor,
              borderRadius: '12px',
              color: '#fff',
              '&:hover': { backgroundColor: primary.dark },
              padding: '10px 15px',
            }}
          >
            {`>`}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
