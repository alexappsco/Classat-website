import { Container, Grid, Box, Button } from '@mui/material';
// import SectionHeader from './SectionHeader'; // Assuming custom header is available
import InstructorCard from './InstructorCard'; // Assuming the card is imported
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const INSTRUCTORS = [
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    name: 'أ. إبراهيم أحمد',
    category: 'مدرس علوم',
    courses: '15',
    rating: 5, // 5 stars rating
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

export default function InstructorsSection() {
  return (
    // Set background to white (default Box behavior)
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'rtl' }}>
      <Container>
        {/* 2. Instructors Grid */}
        <Grid container rowGap={{ xs: 12, md: 6 }} spacing={{ xs: 2, md: 4 }} sx={{ mt: 5 }}>
          {INSTRUCTORS.map((instructor, index) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={3} // Four cards per row on desktop
              key={index}
            >
              <InstructorCard {...instructor} />
            </Grid>
          ))}
        </Grid>

        {/* 3. View All Instructors Button (Centered CTA) */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            color="info" // Light blue color
            sx={{ minWidth: 200, py: 1.5, borderRadius: 2 }}
            // startIcon={'<'} // Arrow pointing left in RTL
          >
            عرض كل المدرسين
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
