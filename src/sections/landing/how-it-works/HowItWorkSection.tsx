import { Container, Grid, Box } from '@mui/material';
import HowItWorkCard from './HowItWorkCard';

const SPECIALIZATIONS = [
  // ... (Data structure from above) ...
  {
    title: 'بتحضر',
    subtitle: 'حصص مباشرة تفاعلية مع أفضل المدرسين، تقدر تسأل وتشارك كأنك في الفصل بالضبط.',
    image: '/assets/landing-page/how-it-works/video.png',
  },
  {
    title: 'بتتعلم',
    subtitle: 'دروس منظمة ومبسطة تغطي المناهج الدراسية والدورات الإثرائية خطوة بخطوة.',
    image: '/assets/landing-page/how-it-works/learn.png',
  },
  {
    title: 'بتتطور',
    subtitle: 'حصص فردية مصممة حسب احتياجك تساعدك توصل لهدفك بأفضل طريقة.',
    image: '/assets/landing-page/how-it-works/brain.png',
  },
  {
    title: 'بتميز',
    subtitle: 'نظام متابعة وتقييم مستمر، مع نقاط ومكافآت تشجعك على الاستمرار والتفوق.',
    image: '/assets/landing-page/how-it-works/streamline_star-badge.png',
  },
];

export default function HowItWorksSection() {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        position: 'relative', // Needed for absolute positioning of arrows
        direction: 'rtl',
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center" px={5}>
          {SPECIALIZATIONS.map((spec, index) => (
            <Grid
              item
              xs={12}
              sm={6} // Two cards per row on small tablets
              md={3} // Four cards per row on desktop
              key={index}
            >
              <HowItWorkCard title={spec.title} subtitle={spec.subtitle} image={spec.image} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
