"use client";

import { useState } from 'react';
import { Box, Grid, Container } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

import { SESSIONS } from '../data/sessions';
import RecommendedSessionCard from './SessionsSectionCard';

type Session = (typeof SESSIONS.RECOMMENDED_SESSIONS)[0];

interface SessionsSectionProps {
  title?: string;
  buttonText?: string;
  sessions: Session[];
}

export default function SessionsSection({
  title,
  buttonText = "اكتشف المزيد",
  sessions,
}: SessionsSectionProps) {

  const smDown = useResponsive('down', 'sm');

  
  const [list, setList] = useState(sessions);

  const handleRemove = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ py: { xs: 8, md: 0 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>

        <Grid container spacing={4} justifyContent="center">
          {list.map((session, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <RecommendedSessionCard
                {...session}
                onRemove={() => handleRemove(index)}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
