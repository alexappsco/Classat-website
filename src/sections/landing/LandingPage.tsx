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
      {/* Live sessions */}
      <LiveSessionsSection />
      {/* disciplines section >> التخصصات */}
      <SectionHeader
        title="استكشف التخصصات"
        description="اختر من بين مجموعة واسعة من المجالات التعليمية"
      />
      <SpecializationSection />
      {/* How it work */}
      <SectionHeader title="كيف يعمل كلاسات؟" description="ثلاث خطوات بسيطة لبدء رحلتك التعليمية" />
      <HowItWorksSection />
    </>
  );
};
