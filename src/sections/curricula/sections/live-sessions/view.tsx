'use client';

import * as React from 'react';
import { Box } from '@mui/material';

import Categories from '../categories';
import FiltersBar from '../FiltersBar';
import LiveSessionsSection from './LiveSessionSection';
import InstructorsSection from '../top-instructor/TopInstructorsSection';
import Hero from '../Hero';
import TimerCard from 'src/components/timer/TimerShow';

type LiveSesionsProps = {
  paymentList?: any;
  liveSubject?: any[];
  title?: string;

};

export default function LiveSesions({ paymentList, title = "بثوث مباشرة الان",liveSubject }: LiveSesionsProps) {
  // const [selectedCategory, setSelectedCategory] = React.useState('مباشرة الآن');

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {/* <Hero /> */}
        {/* <TimerCard subtitle='بث "تطوير تطبيقات الويب باستخدام React" يبدأ قريبًا' /> */}
        <TimerCard  />

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
          <Categories />
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
        <LiveSessionsSection paymentList={paymentList } title={title} liveSubject={liveSubject} />
        {/* <LiveSessionsSection title="بثوث مباشرة قادمة" /> */}
      </>
    </>
  );
}
