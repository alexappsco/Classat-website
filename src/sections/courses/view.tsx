'use client';

import * as React from 'react';
import { Box } from '@mui/material';

import Hero from './Hero';
import Categories from './categories';
import MiniSessions from './MiniSessions';
import { SESSIONS } from './data/sessions';
import CustomPagination from './CustomPagination';
import SessionsSection from './sessions/SessionsSection';
import LiveSessionsSection from './live-sessions/LiveSessionSection';

export default function Courses() {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />

        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '90%',
            maxWidth: 1330,
          }}
        >
          <Categories />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        <MiniSessions title="استئناف التعلم" sessions={SESSIONS.sessionsData} />

        <SessionsSection title="موصى به لك" sessions={SESSIONS.RECOMMENDED_SESSIONS} />

        <SessionsSection title="الأعلى تقييماً" sessions={SESSIONS.TOP_RATED_SESSIONS} />

        <LiveSessionsSection />
        <CustomPagination />
      </Box>
    </>
  );
}
