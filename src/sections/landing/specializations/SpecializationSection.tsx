import { Container, Grid, Box, IconButton } from '@mui/material';
import SpecializationCard from './SpecializationCard'; // Assuming the component is imported
import { useTheme } from '@mui/material/styles';
import { secondary } from 'src/theme/palette';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

const SPECIALIZATIONS = [
  // ... (Data structure from above) ...
  {
    title: 'لغات',
    subtitle: 'إنجليزي، فرنسي، ألماني',
    count: '500+ كورس',
    image: '/assets/landing-page/specializations/languages.png',
  },
  {
    title: 'برمجة',
    subtitle: 'تطوير ويب، تطبيقات ذكاء اصطناعي',
    count: '1500+ كورس',
    image: '/assets/landing-page/specializations/message-programming.png',
  },
  {
    title: 'تصميم',
    subtitle: 'جرافيك، موشن، UI/UX',
    count: '800+ كورس',
    image: '/assets/landing-page/specializations/path-square.png',
  },
  {
    title: 'مناهج دراسية',
    subtitle: 'رياضيات، علوم، لغات وأكثر',
    count: '2000+ كورس',
    image: '/assets/landing-page/specializations/book.png',
  },
];

export default function SpecializationSection() {
  const theme = useTheme();
  const smDown = useResponsive('down', 'sm');
  // Custom color for the background (Must be defined in your palette)
  const beigeBackground = '#FFAB0040'; // Example color, adjust to match your design

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: beigeBackground, // Background color for the section
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
              <SpecializationCard
                title={spec.title}
                subtitle={spec.subtitle}
                count={spec.count}
                image={spec.image}
              />
            </Grid>
          ))}
        </Grid>

        {/* Navigation Arrows (Optional: For Carousel/Slider if implemented) */}
        {!smDown && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0, // Position on the right side
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: theme.customShadows.z12,
              mx: 1, // Horizontal margin
              zIndex: 10,
            }}
          >
            <Image
              src={'/assets/landing-page/specializations/left-arrow.png'}
              alt={'left-icon'}
              width={30}
            />
          </IconButton>
        )}

        {!smDown && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0, // Position on the left side
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: theme.customShadows.z12,
              mx: 1,
              zIndex: 10,
            }}
          >
            <Image
              src={'/assets/landing-page/specializations/right-arrow.png'}
              alt={'left-icon'}
              width={30}
            />
          </IconButton>
        )}
      </Container>
    </Box>
  );
}
