'use client';

import * as React from 'react';
import { Box } from '@mui/material';

import Hero from '../Hero';
import Categories from '../categories';
import FiltersBar from '../FiltersBar';
import LiveSessionsSection from '../live-sessions/LiveSessionSection';
import InstructorsSection from '../top-instructor/TopInstructorsSection';

export default function LiveSesions() {
  // const [selectedCategory, setSelectedCategory] = React.useState('مباشرة الآن');

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />
        {/* 
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -40, md: -60 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '40%',
            maxWidth: 700,
            minWidth: { xs: 300, sm: 360, md: 400 },
          }}
        >
          <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </Box> */}
      </Box>

      <FiltersBar />

      {/* {selectedCategory === 'جلسات فردية' ? (
        <>
          <InstructorsSection title="المعلمين الاعلى تقييماً" />
          <InstructorsSection title="مقترح لك" />
          <InstructorsSection title="معلمون جدد" />
        </>
      ) : (
      )} */}
      <>
        <LiveSessionsSection title="بثوث مباشرة الان" />
        <LiveSessionsSection title="بثوث مباشرة قادمة" />
      </>
    </>
  );
}
