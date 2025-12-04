import { Box, Container, Grid, Typography, Stack, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LogoText } from './logo-text';
import { useResponsive } from 'src/hooks/use-responsive';
import { primary, text } from 'src/theme/palette';
import RightArrow from '../../../public/assets/icons/footer/right-arrow.svg';
import Phone from '../../../public/assets/icons/footer/phone.svg';
import Mail from '../../../public/assets/icons/footer/mail.svg';
import Location from '../../../public/assets/icons/footer/location.svg';
import Facebook from '../../../public/assets/icons/footer/facebook.svg';
import LinkedIn from '../../../public/assets/icons/footer/linkedIn.svg';
import Instagram from '../../../public/assets/icons/footer/instagrame.svg';
import AppStore from '../../../public/assets/images/footer/appstore.svg';
import GooglePlay from '../../../public/assets/images/footer/googleplay.svg';
/**
 * Footer component with four main columns and a copyright section.
 * The layout is fully responsive and based on the provided design.
 */
export default function Footer() {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  // Define colors based on the design (blue/orange accents)
  const blueAccent = theme.palette.info.main; // Light blue accent for links/text
  const orangeAccent = theme.palette.warning.main; // Orange accent for title underline
  const primaryTextColor = text.primary;
  const mainColor = primary.main;
  const lightMainColor = primary.lighter;
  // Data structure for the footer links (Simplified)
  const quickLinks = [
    { title: 'الكورسات الخارجية', href: '#' },
    { title: 'المناهج الدراسية', href: '#' },
    { title: 'البث المباشر', href: '#' },
    { title: 'حجز جلسة فردية', href: '#' },
    { title: 'سياسة الخصوصية', href: '#' },
    { title: 'الشروط والأحكام', href: '#' },
    { title: 'الدعم الفني', href: '#' },
  ];

  // Helper component for column headers to apply consistent styling
  const FooterHeader = ({ title }: any) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
        {title}
      </Typography>
      {/* Orange underline effect from the design */}
      <Box
        sx={{
          width: 60,
          height: 2,
          bgcolor: orangeAccent,
          mt: 0.5,
          borderRadius: 1,
        }}
      />
    </Box>
  );

  // Helper component for contact/social links
  const ContactItem = ({ text, link, iconPlaceholder }: any) => (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: blueAccent,
          fontSize: 18,
          backgroundColor: lightMainColor,
          padding: '0 5px',
          borderRadius: '5px',
        }}
      >
        {iconPlaceholder}
      </Typography>
      <Link
        href={link}
        color="inherit"
        underline="hover"
        sx={{
          color: primaryTextColor,
          fontSize: theme.typography.pxToRem(14),
        }}
      >
        {text}
      </Link>
    </Stack>
  );

  return (
    <Box sx={{ pt: 6, pb: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Logo and Platform Description */}
          <Grid item xs={12} md={4} lg={3}>
            <Stack spacing={2} sx={{ pr: { xs: 0, md: 4 } }}>
              {/* Logo (Image Component Placeholder) */}
              <Box
                sx={{
                  direction: 'ltr',
                  width: 'fit-content',
                }}
              >
                <LogoText {...{ lgUp }} />
              </Box>

              <Typography variant="body2" sx={{ color: primaryTextColor }}>
                منصة تعليمية تفاعلية تضم كورسات ومناهج متنوعة لتسهيل التعلم بطريقة مرنة وممتعة.
              </Typography>
            </Stack>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={6} sm={4} md={2} lg={2}>
            <FooterHeader title="روابط سريعة" />
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  underline="none"
                  color="inherit"
                  sx={{
                    color: primaryTextColor,
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { color: blueAccent },
                    fontSize: theme.typography.pxToRem(14),
                  }}
                >
                  <Box sx={{ color: blueAccent, mr: 2, mt: 0.5 }}>
                    <RightArrow />
                  </Box>
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Contact Us */}
          <Grid item xs={6} sm={4} md={3} lg={3}>
            <FooterHeader title="تواصل معنا" />
            <Stack spacing={1}>
              <ContactItem
                text="971567328923+"
                link="tel:+971567328923"
                iconPlaceholder={<Phone />}
              />
              <ContactItem
                text="info@classat.com"
                link="mailto:info@classat.com"
                iconPlaceholder={<Mail />} // Mail icon placeholder
              />
              <ContactItem
                text="الإمارات"
                link="#"
                iconPlaceholder={<Location />} // Location icon placeholder
              />
            </Stack>

            {/* Social Media Links */}
            <Typography variant="body2" sx={{ mt: 2, mb: 1, color: theme.palette.text.secondary }}>
              تابعنا على
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {/* Instagram icon */}
              <Typography
                variant="body2"
                sx={{
                  color: blueAccent,
                  fontSize: 18,
                  backgroundColor: lightMainColor,
                  borderRadius: '5px',
                  width: '25px',
                  height: '25px',
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Facebook />
              </Typography>
              {/* Instagram icon */}
              <Typography
                variant="body2"
                sx={{
                  color: blueAccent,
                  fontSize: 18,
                  backgroundColor: lightMainColor,
                  borderRadius: '5px',
                  width: '25px',
                  height: '25px',
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Instagram />
              </Typography>
              {/* LinkedIn icon */}
              <Typography
                variant="body2"
                sx={{
                  color: blueAccent,
                  fontSize: 18,
                  backgroundColor: lightMainColor,
                  borderRadius: '5px',
                  width: '25px',
                  height: '25px',
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <LinkedIn />
              </Typography>
            </Stack>
          </Grid>

          {/* Column 4: Mobile App CTA */}
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={4}
            // sx={{ textAlign: { xs: 'right', sm: 'left', md: 'right' } }}
          >
            <FooterHeader title="حمّل تطبيقنا الآن وتعلّم في أي مكان!" />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
              استمتع بتجربة تعليمية متكاملة على هاتفك المحمول. احضر الحصص، تابع تقدمك، وتفاعل مع
              المدرسين أينما كنت.
            </Typography>

            {/* App Store Buttons */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', sm: 'flex-end', md: 'flex-start' }}
            >
              <Box sx={{ width: 120, cursor: 'pointer', height: 'auto' }}>
                <GooglePlay />
              </Box>

              <Box sx={{ width: 120, cursor: 'pointer', height: 'auto' }}>
                <AppStore />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Copyright ©Classat 2025. All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
