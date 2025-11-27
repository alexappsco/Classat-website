'use client';

import * as React from 'react';
import { Box } from '@mui/material';

import Hero from '../Hero';
import Categories from '../categories';
import FiltersBar from '../FiltersBar';
import LiveSessionsSection from '../live-sessions/LiveSessionSection';
import InstructorsSection from '../top-instructor/TopInstructorsSection';
import TeachersFilters from './filterTeacher';

export default function TopTeacher() {
  const [selectedCategory, setSelectedCategory] = React.useState('مباشرة الآن');

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -40, md: -60 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '64%',
            Width: { xs: 300, sm: 360, md: 400 },
            // maxWidth: 700,
            // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            // backgroundColor: 'white',
          }}
        >
          {/* <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          /> */}
          <TeachersFilters />
        </Box>
      </Box>

      <>
        <InstructorsSection title="المعلمين الاعلى تقييماً" />
        <InstructorsSection title="مقترح لك" />
        <InstructorsSection title="معلمون جدد" />
      </>
      {/* {selectedCategory === 'جلسات فردية' ? (
      ) : (
        <>
          <LiveSessionsSection title="بثوث مباشرة الان"/>
          <LiveSessionsSection title="بثوث مباشرة قادمة"/>
        </>
      )} */}
    </>
  );
}
