import { Box, Typography, Button, Stack, Container, Grid } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import { primary, secondary, text, warning } from 'src/theme/palette';
import Link from 'next/link';
const STATS = [
  { value: '1000+', label: 'كورس متاح', color: secondary.light },
  { value: '5000+', label: 'طالب نشط', color: primary.main },
  { value: '200+', label: 'مدرس محترف', color: secondary.dark },
];

export default function HeroSection() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const lgUp = useResponsive('up', 'lg');
  const primaryMain = primary.main;
  const primaryDark = primary.dark;
  const orangeColor = warning.main;
  const MainTextColor = text.main;

  // ----------------------------------------------------------------------
  function Statics({
    singleStat,
  }: {
    singleStat: { value: string; label: string; color: string };
  }) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant={mdUp ? 'h3' : 'h4'}
          sx={{ color: singleStat.color, fontWeight: 700, lineHeight: 1 }}
        >
          {singleStat.value}
        </Typography>
        <Typography variant="body2" sx={{ color: MainTextColor, pt: 0.5, fontSize: 18 }}>
          {singleStat.label}
        </Typography>
      </Box>
    );
  }
  const renderContent = (
    <Stack
      spacing={4}
      sx={{
        textAlign: 'left',
        pt: { xs: 4, md: 8 },
        order: { xs: 2, md: 1 },
      }}
    >
      <Box>
        <Typography
          variant={mdUp ? 'h2' : 'h3'}
          component="h1"
          sx={{
            fontWeight: 700,
            color: primaryMain,
          }}
        >
          منصتك للتعلم المباشر
          <br />
          والتفاعل الحقيقي
        </Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          color: MainTextColor,
          textAlign: 'left',
        }}
      >
        ! تجربة تعليمية تجمع بين المرونة، الجودة، والتفاعل
      </Typography>

      <Stack
        direction="row-reverse"
        spacing={2}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            minWidth: 160,
            backgroundColor: primaryMain,
            borderRadius: 25,
            '&:hover': {
              backgroundColor: primaryDark,
            },
          }}
        >
          المناهج الدراسية
        </Button>

        <Link href="/ar/courses/" passHref>
  <Button
    variant="outlined"
    size="large"
    sx={{
      minWidth: 160,
      borderColor: alpha(primaryMain, 0.5),
      color: primaryMain,
      borderRadius: 25,
      '&:hover': {
        borderColor: primaryMain,
        backgroundColor: alpha(primaryMain, 0.04),
      },
    }}
  >
    الدورات التدريبية
  </Button>
</Link>
      </Stack>
      <Stack
        direction="row-reverse"
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={{ xs: 2, sm: 4 }}
        pt={4}
      >
        {STATS.map((stat) => (
          <Statics key={stat.label} singleStat={stat} />
        ))}
      </Stack>
    </Stack>
  );

  // ----------------------------------------------------------------------
  const renderImage = (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        order: { xs: 1, md: 2 },
        py: { xs: 5, md: 0 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: 300, sm: 400, md: 500, lg: 550 },
          aspectRatio: '1 / 1',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        <Image
          alt="Hero"
          src="/assets/landing-page/hero.png"
          sx={{
            position: 'absolute',
            zIndex: 3,
            width: '110%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
  // ----------------------------------------------------------------------

  return (
    <Container
      sx={{
        py: { xs: 8, md: 12 },
        direction: 'rtl',
      }}
    >
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          {renderImage}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderContent}
        </Grid>
      </Grid>
    </Container>
  );
}
