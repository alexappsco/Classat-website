'use client';

import Link from 'next/link';
import { text } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import { useRouter } from 'next/dist/client/components/navigation';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { SESSIONS } from '../data/sessions';
import RecommendedSessionCard from './SessionsSectionCard';

type Session = (typeof SESSIONS.RECOMMENDED_SESSIONS)[0];

interface SessionsSectionProps {
  title: string;
  buttonText?: string;
  sessions: Session[];
  hideButton?: boolean;
}

export default function SessionsSection({
  title,
  buttonText = 'اكتشف المزيد',
  sessions,
  hideButton = false,
}: SessionsSectionProps) {
  const router = useRouter();
  const primaryTextColor = text.primary;
  const smDown = useResponsive('down', 'sm');

  return (
    <Box sx={{ py: { xs: 8, md: 5 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ fontWeight: 400, color: primaryTextColor }}>
                {title}
              </Typography>
            </Stack>
          </Grid>
          {/* Action Button (Left side in RTL) */}
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
        {/* Sessions Grid */}
        <Grid container spacing={4} justifyContent="center">
          {sessions.map((session, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RecommendedSessionCard {...session} key={session.id} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
