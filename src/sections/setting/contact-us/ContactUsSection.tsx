'use client';

import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ICONS } from 'src/config-icons';
import { getData, postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { useSnackbar } from 'notistack';
import { Send } from '@mui/icons-material';

export default function ContactUsSection() {
  const { enqueueSnackbar } = useSnackbar();
  const [contactUs, setContactUs] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        const data = await getData(endpoints.ContactRequest.get);
        setContactUs(data);
      } catch (error) {
        console.error('Error fetching contact us', error);
      }
    };

    fetchContactUs();
  }, []);
  const handleSubmit = async () => {
    try {
      // Build query string since API expects parameters in query
      const query = new URLSearchParams({
        FullName: formData.fullName,
        Email: formData.email,
        Subject: formData.subject,
        Message: formData.message,
      });

      const res = await postData(
        `${endpoints.ContactRequest.post}?${query.toString()}`,
        undefined // no body, parameters are in query
      );

      if (res.success) {
        enqueueSnackbar('تم إرسال الرسالة بنجاح');
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ py: { xs: 6, md: 6 }, mt: 10 }}>
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

        <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
          {/* Top info cards row (phone & email) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: '#E5F6FD',
                borderRadius: 3,
                p: 3,
                height: '100px',
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
                {contactUs?.data.phones?.map((phone: string, index: number) => (
                  <Typography key={index} color="text.secondary" fontSize={14}>
                    {phone}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: '#E5F6FD',
                borderRadius: 3,
                p: 3,
                height: '100px',
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

                <Typography color="text.secondary" fontSize={14}>
                  {contactUs?.data.email}
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
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" mb={0.5}>
                    الموضوع
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="الموضوع"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" mb={0.5}>
                    الرسالة
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="الرسالة"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Bottom full-width submit button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              endIcon={<Send sx={{ transform: 'rotate(180deg)', mr: 1 }} />} // ليتناسب مع اتجاه العربي
              sx={{
                mt: 2,
                bgcolor: '#3CA7D5',
                '&:hover': {
                  bgcolor: '#3798C2',
                  boxShadow: '0px 8px 15px rgba(60, 167, 213, 0.3)',
                },
                borderRadius: 3,
                py: 1.8,
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              إرسال الرسالة
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
