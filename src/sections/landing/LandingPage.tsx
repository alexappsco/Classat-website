'use client';
import Header from 'src/layouts/dashboard/header';
import { primary } from 'src/theme/palette';
import HeroSection from './Hero';
import LearningMethods from './learning-methods/LearningMethods';
import SectionHeader from './section-header/SectionHeader';
import SpecializationSection from './specializations/SpecializationSection';

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
      {/* disciplines section >> التخصصات */}
      <SectionHeader
        title="استكشف التخصصات"
        description="اختر من بين مجموعة واسعة من المجالات التعليمية"
      />
      <SpecializationSection />
    </>
  );
};
