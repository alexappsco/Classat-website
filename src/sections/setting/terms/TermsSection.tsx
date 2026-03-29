'use client';

import { Container, Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
export default function TermsSection() {
  const [TermsAndConditions, setTermsAndConditions] = useState<any>(null);

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const data = await getData(`${endpoints.staticPage}?pageType=TermsAndConditions`);

        setTermsAndConditions(data);
      } catch (error) {
        console.error('Error fetching terms and conditions', error);
      }
    };

    fetchTermsAndConditions();
  }, []);
  return (
    <Container sx={{ py: { xs: 6, md: 6 }, mt: 10 }}>
      <Box
        sx={{
          maxWidth: 960,
          mx: 'auto',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.08)',
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography variant="h3" fontWeight={800} textAlign="center" mb={3}>
          {TermsAndConditions?.data.title}
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: TermsAndConditions?.data.content }} />
        {/* <Typography textAlign="center" color="text.secondary" fontSize={{ xs: 13, md: 14 }} mb={4}>
          {privacyPolicy?.content}
        </Typography> */}
      </Box>
    </Container>
  );
}
