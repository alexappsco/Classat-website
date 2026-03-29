'use client';
;
import HeroSection from './Hero';
import LearningMethods from './learning-methods/LearningMethods';
import SectionHeader from './section-header/SectionHeader';
import SpecializationSection from './specializations/SpecializationSection';
import HowItWorksSection from './how-it-works/HowItWorkSection';
import LiveSessionsSection from './live-sessions/LiveSessionSection';
import InstructorsSection from './top-instructor/TopInstructorsSection';
import SuggestedCoursesSection from './suggested-courses/SuggestedCoursesSection';
import { Box } from '@mui/material';
import TestimonialsSection from './testimonials/TestimonialsSection';
import JoinUsSection from './join-us/JoinUsSection';
import { useJwtAuth } from 'src/auth/jwt-context';

import { useEffect } from 'react';

export const LandingPage = () => {
  const { logout } = useJwtAuth();


  // Only logout on the client side and only once when component mounts
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <>
      {/* <Header /> */}
      <HeroSection />
      {/* learning methods section */}
      <SectionHeader
        title="طرق التعلم المتاحة"
        description="اختر الطريقة التي تناسبك من بين خيارات التعلم المتنوعة"
      />
      <LearningMethods />
      <LiveSessionsSection />
      {/* disciplines section >> التخصصات */}
      <SectionHeader
        title="استكشف التخصصات"
        description="اختر من بين مجموعة واسعة من المجالات التعليمية"
      />
      <SpecializationSection />
      <SectionHeader title="كيف يعمل كلاسات؟" description="ثلاث خطوات بسيطة لبدء رحلتك التعليمية" />
      <HowItWorksSection />
      {/* Top instructors */}
      <Box
        sx={{
          backgroundImage: 'url(/assets/landing-page/section-bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '100px 0 180px',
        }}
      >
        <SectionHeader title="المدرسين الاعلي تقييما" description="" />
        <InstructorsSection />
        {/* Suggested Courses */}
        <SectionHeader title="كورساتنا المقترحة" description="" />
        <SuggestedCoursesSection />
      </Box>
      {/* testimonials */}
      <SectionHeader
        title="ماذا يقول طلابنا ؟"
        description="آراء حقيقية من طلاب نجحوا في تحقيق أهدافهم"
      />
      <TestimonialsSection />
      {/* join us section */}
      <JoinUsSection />
    </>
  );
};
