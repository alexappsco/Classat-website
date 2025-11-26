"use client";

import { text } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { SESSIONS } from '../data/sessions';
import RecommendedSessionCard from './SessionsSectionCard';

type Session = (typeof SESSIONS.RECOMMENDED_SESSIONS)[0];

interface SessionsSectionProps {
  title: string;
  buttonText?: string;
  sessions: Session[];
}

export default function SessionsSection({
  title,
  buttonText = "اكتشف المزيد",
  sessions,
}: SessionsSectionProps) {
  const primaryTextColor = text.primary;
  const smDown = useResponsive('down', 'sm');

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* Sessions Grid */}
        <Grid container spacing={4} justifyContent="center">
          {sessions.map((session, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RecommendedSessionCard {...session} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
