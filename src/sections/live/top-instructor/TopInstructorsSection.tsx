import { Container, Grid, Box, Button, Stack, Typography } from '@mui/material';

import InstructorCard from './InstructorCard';

import { text, primary } from 'src/theme/palette';
const INSTRUCTORS = [
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    name: 'أ. إبراهيم أحمد',
    category: 'مدرس علوم',
    courses: '15',
    rating: 5,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    name: 'أ. إبراهيم أحمد',
    category: 'Web Development',
    courses: '15',
    rating: 5,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    name: 'أ. إبراهيم أحمد',
    category: 'UI UX Designer',
    courses: '15',
    rating: 5,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    name: 'أ. إبراهيم أحمد',
    category: 'مدرس رياضيات',
    courses: '15',
    rating: 5,
  },
];

export default function InstructorsSection({title}:{title: string}) {
  const primaryTextColor = text.primary;
  return (
    // Set background to white (default Box behavior)
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'rtl' }}>
      <Container>
        <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5} sx={{mb: 15}}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: primaryTextColor, textAlign: 'end' }}>
                {title}
              </Typography>
            </Stack>
          </Grid>
        {/* 2. Instructors Grid */}
        <Grid container rowGap={{ xs: 12, md: 6 }} spacing={{ xs: 2, md: 4 }} sx={{ mt: 5 }}>
          {INSTRUCTORS.map((instructor, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              <InstructorCard {...instructor} />
            </Grid>
          ))}
        </Grid>


      </Container>
    </Box>
  );
}
