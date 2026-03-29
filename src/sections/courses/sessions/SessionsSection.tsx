
'use client';

import Link from 'next/link';
import { text } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import RecommendedSessionCard from './SessionsSectionCard';
import SearchBar from '../SearchBar';

interface SessionsSectionProps {
  title: string;
  buttonText?: string;
  sessions: any[];
  hideButton?: boolean;
  paymentList?: any[];
}


export default function SessionsSection({
  title,
  buttonText = 'اكتشف المزيد',
  sessions,
  hideButton = false,
  paymentList = [],

}: SessionsSectionProps) {
  const primaryTextColor = text.primary;
  const smDown = useResponsive('down', 'sm');

  return (
    <Box sx={{ py: { xs: 8, md: 5 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        <Box sx={{ width: '100%' }}>
          <SearchBar />
        </Box>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ fontWeight: 400, color: primaryTextColor }}>
                {title}
              </Typography>
            </Stack>
          </Grid>

          {!hideButton && (
            <Link href="/ar/courses/all/">
              <Button color="info" sx={{ lineHeight: 1 }}>
                الكل
                <span>
                  <LeftIcon />
                </span>
              </Button>
            </Link>
          )}
        </Grid>

        {/* Grid */}
        <Grid container spacing={4} justifyContent="center">
          {sessions.map((session, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RecommendedSessionCard session={session} paymentList={paymentList} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
