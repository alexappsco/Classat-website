'use client';

import { Box, Typography, Button, IconButton, Container, Stack } from '@mui/material';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { LogoText } from 'src/layouts/dashboard/logo-text';
// import CloseIcon from '@mui/icons-material/Close';

import { primary, secondary, text } from 'src/theme/palette';

export default function JoinUsSection() {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const secondaryColor = '#FFE9BC';
  const lgUp = useResponsive('up', 'lg');
  return (
    <Container sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          backgroundColor: secondaryColor,
          borderRadius: '100px',
          padding: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '45%' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="/assets/landing-page/join-us.png"
            alt="teacher"
            sx={{
              position: 'relative',
              zIndex: 2,
              width: { xs: '70%', md: '80%' },
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '55%' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant={!lgUp ? 'h3' : 'h2'}
            sx={{
              fontWeight: 800,
              color: primaryTextColor,
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            هل ترغب بالانضمام إلى فريقنا في
            <br />
            {/* <Box>
              <Image
                src="/logo/logo_single_image.png"
                sx={{
                  maxWidth: '120px',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box> */}
          </Typography>
          <Stack
            sx={{ width: 'fit-content', margin: !lgUp ? 'auto' : '' }}
            flexDirection={'row'}
            alignItems={'center'}
            spacing={2}
          >
            <LogoText {...{ lgUp }} /> ?
          </Stack>

          <Typography
            sx={{
              color: paragraphTextColor,
              fontWeight: 700,
              fontSize: !lgUp ? '1.05rem' : '1.5rem',
              lineHeight: 1.8,
              my: 3,
            }}
          >
            انضم الآن إلى فريق المعلمين على المنصة، وشارك في تقديم المناهج والدورات التعليمية
            الموجهة للطلاب في مختلف المراحل الدراسية، وساهم معنا في تطوير تجربة تعليمية مميزة تجمع
            بين البساطة والوضوح!
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: mainColor,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: '12px',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: mainColor,
                opacity: 0.9,
              },
            }}
          >
            ابدأ رحلتك الآن
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
