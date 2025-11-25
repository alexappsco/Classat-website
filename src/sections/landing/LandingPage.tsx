'use client';
import Header from 'src/layouts/dashboard/header';
import { primary } from 'src/theme/palette';
import HeroSection from './Hero';
import LearningMethods from './learning-methods/LearningMethods';
import SectionHeader from './section-header/SectionHeader';
import SpecializationSection from './specializations/SpecializationSection';
import HowItWorkCard from './how-it-works/HowItWorkCard';
import HowItWorksSection from './how-it-works/HowItWorkSection';
import LiveSessionsSection from './live-sessions/LiveSessionSection';
import InstructorsSection from './top-instructor/TopInstructorsSection';
import SuggestedCoursesSection from './suggested-courses/SuggestedCoursesSection';

export const LandingPage = () => {
  return (
    <>
      <Header />
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
      <SectionHeader title="المدرسين الاعلي تقييما" description="" />
      <InstructorsSection />
      {/* Suggested Courses */}
      <SectionHeader title="كورساتنا المقترحة" description="" />
      <SuggestedCoursesSection />
    </>
  );
};
