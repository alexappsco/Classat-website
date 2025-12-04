'use client';

import { Container, Box, Grid, Typography, TextField, Button, Stack } from '@mui/material';
import { ICONS } from 'src/config-icons';

export default function ContactUsSection() {
  return (
    <Container sx={{ py: { xs: 6, md: 6 },mt:10 }}>
      {/* Outer white card to match big rounded box in the design */}
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0 0 20px rgba(0,0,0,0.04)',
          p: { xs: 3, md: 4 },
        }}
      >
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 3, md: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}
          >
            اتصل بنا
          </Typography>
          <Typography color="text.secondary" fontSize={{ xs: 14, md: 15 }}>
            يسعدنا تواصلك معنا
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Top info cards row (phone & email) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: '#E5F6FD',
                borderRadius: 3,
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ICONS.SocialIcons.wats}
              </Box>
              <Box>
                <Typography fontWeight={700}>رقم الهاتف</Typography>
                <Typography color="text.secondary" fontSize={14}>
                  +971567328923
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: '#E5F6FD',
                borderRadius: 3,
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {ICONS.SocialIcons.gmail}
              </Box>
              <Box>
                <Typography fontWeight={700}>البريد الإلكتروني</Typography>
                <Typography color="text.secondary" fontSize={14} sx={{ wordBreak: 'break-all' }}>
                  info@classat.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Contact form below cards */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: { xs: 2, md: 3 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: '#E0E3E7',
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
                // textAlign="right"
              >
                راسلنا
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" mb={0.5}>
                    الاسم الكامل
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="الاسم الكامل"
                    size="medium"
                    InputProps={{ sx: { textAlign: 'right' } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="body2" mb={0.5}>
                    البريد الإلكتروني
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="البريد الإلكتروني"
                    size="medium"
                    InputProps={{ sx: { textAlign: 'right' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" mb={0.5}>
                    الموضوع
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="الموضوع"
                    size="medium"
                    InputProps={{ sx: { textAlign: 'right' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" mb={0.5}>
                    الرسالة
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="الرسالة"
                    size="medium"
                    multiline
                    minRows={4}
                    InputProps={{ sx: { textAlign: 'right' } }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Bottom full-width submit button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: { xs: 1, md: 2 },
                bgcolor: '#3CA7D5',
                '&:hover': { bgcolor: '#3798C2' },
                borderRadius: 2.5,
                py: 1.4,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              إرسال
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}