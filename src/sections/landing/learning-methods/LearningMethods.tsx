import { Container, Grid, Box } from '@mui/material';
import FeatureCard from './FeatureCard'; // Assuming the component is imported

const FEATURES = [
  {
    title: 'مجموعات جماعية',
    description: 'انضم إلى مجموعات تعليمية تفاعلية وتعلم مع زملائك في بيئة محفزة',
    image: '/assets/landing-page/learning-methods/people.png',
  },
  {
    title: 'بث مباشر فردي',
    description: 'جلسات تعليمية فردية مباشرة مع أفضل المدرسين لتجربة تعلم شخصية',
    image: '/assets/landing-page/learning-methods/video.png',
  },
  {
    title: 'كورسات مسجلة',
    description: 'مكتبة ضخمة من الكورسات المسجلة بجودة عالية يمكنك الوصول إليها في أي وقت',
    image: '/assets/landing-page/learning-methods/video-circle.png',
  },
];

export default function LearningMethods() {
  return (
    <Container sx={{ py: { xs: 4, md: 6 }, px: { xs: 6, md: 8 }, direction: 'rtl' }}>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {FEATURES.map((feature, index) => (
          <Grid
            item
            xs={12} // Full width on small screens
            sm={6} // Two columns on small-to-medium screens
            md={4} // Three columns on medium and large screens
            key={index}
          >
            {/* The actual FeatureCard component would be here */}
            {/* For demonstration, we'll use the Card structure directly */}

            <FeatureCard
              title={feature.title}
              description={feature.description}
              image={feature.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
