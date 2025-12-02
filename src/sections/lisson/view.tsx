'use client';

import * as React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import Hero from './Hero';
import Categories from './categories';
import MiniSessions from './MiniSessions';
import { SESSIONS } from './data/sessions';
import CustomPagination from './CustomPagination';
import SessionsSection from './sessions/SessionsSection';
import LiveSessionsSection from './live-sessions/LiveSessionSection';
import CategoriesClasse from './categories';
import { useTranslations } from 'next-intl';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/dist/client/components/navigation';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import StudentCardSimple from './teacherCard/nextSecion';
import StatisticsStudentsCard from './teacherCard/nextSecion';
// import PrettyLiveBroadcastsCard from '../liveBroadcasts/prettyLiveBroadcastsCard';
// import SectionHeader from '../landing/section-header/SectionHeader';
// import InstructorsSection from '../landing/top-instructor/TopInstructorsSection';
import InstructorsSections from './TopInstructorsSection';
import InstructorsSection from './sections/top-instructor/TopInstructorsSection';

export default function Courses() {
  const studentsData = [
    {
      img: '/favicon/teacher1.png',
      name: 'أحمد علي',
      studentClass: 'الصف الخامس الابتدائي',
      language: 'اللغة الإنجليزية',
      country: ' المنهج المصري',
      date: '13/11/2025',
      time: '3:00 م',
      href:'/lisson/details-mathod'
    },
    {
      img: '/favicon/teacher1.png',
      name: 'لينا محمد',
      studentClass: 'الصف الرابع الابتدائي',
      language: 'اللغة العربية',
      country: ' المنهج الإماراتي',
      date: '12/11/2025',
      time: '2:00 م',
      href:'/lisson/details-mathod'

    },
    {
      img: '/favicon/teacher1.png',
      name: 'أحمد علي',
      studentClass: 'الصف الخامس الابتدائي',
      language: 'اللغة الإنجليزية',
      country: ' المنهج المصري',
      date: '13/11/2025',
      time: '3:00 م',
      href:'/lisson/details-mathod'

    },
    {
      img: '/favicon/teacher1.png',
      name: 'أحمد علي',
      studentClass: 'الصف الخامس الابتدائي',
      language: 'اللغة الإنجليزية',
      country: ' المنهج المصري',
      date: '13/11/2025',
      time: '3:00 م',
      href:'/lisson/details-mathod'

    },
  ];
  const fakeLiveBroadcasts = [
    {
      image: '/favicon/teacher.png',
      title: 'شرح قوانين حل المعادلات',
      date: 222,
      // time: 2222,
      category: 'الرياضيات ',
      icon: '/favicon/proicons_math.svg',
      limt: '20',
      name: 'أحمد علي',
      avatar: '/favicon/mana.png',
    },
    {
      image: '/favicon/teacher.png',
      title: 'شرح قوانين حل المعادلات',
      date: 222,
      // time: 2222,
      category: 'الرياضيات ',
      icon: '/favicon/proicons_math.svg',
      limt: '20',
      name: 'أحمد علي',
      avatar: '/favicon/mana.png',
    },
    {
      image: '/favicon/teacher.png',
      title: 'شرح قوانين حل المعادلات',
      date: 222,
      // time: 2222,
      category: 'الرياضيات ',
      icon: '/favicon/proicons_math.svg',
      limt: '20',
      name: 'أحمد علي',
      avatar: '/favicon/mana.png',
    },
    {
      image: '/favicon/teacher.png',
      title: 'شرح قوانين حل المعادلات',
      date: 222,
      // time: 2222,
      category: 'الرياضيات ',
      icon: '/favicon/proicons_math.svg',
      limt: '20',
      name: 'أحمد علي',
      avatar: '/favicon/mana.png',
    },
  ];
  const t = useTranslations();

  const settings = useSettingsContext();

  const router = useRouter();
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
            maxWidth: 1300,
          }}
        >
          <CategoriesClasse />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '2%', sx: 'auto', xl: '8%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t('Nav.upcoming_sessions')}
            </Typography>
            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              // onClick={() => router.push('/lisson/live')}
            >
              الكل
              <span>
                <LeftIcon />
              </span>
            </Button>
          </Box>
          <StatisticsStudentsCard cards={studentsData} />
        </Box>

        <LiveSessionsSection />
        {/* 
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '8%', sx: 'auto' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t('Nav.live_broadcasts')}
            </Typography>
            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              onClick={() => router.push('/dashboard/live_broadcasts')}
            >
              الكل
              <span>
                <LeftIcon />
              </span>
            </Button>
          </Box>
          <PrettyLiveBroadcastsCard
            cards={fakeLiveBroadcasts}
            gridSize={{ xs: 12, sm: 6, md: 3 }}
          />
        </Box> */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '2%', sx: '0', xl: '8%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              المعلميين الأعلى تقييمًا
            </Typography>
            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              onClick={() => router.push('/lisson/topTeacher')}
            >
              الكل
              <span>
                <LeftIcon />
              </span>
            </Button>
          </Box>

          <InstructorsSection />
          {/* <InstructorsSections /> */}
        </Box>
        {/* <MiniSessions title="استئناف التعلم" sessions={SESSIONS.sessionsData} />

        <SessionsSection title="موصى به لك" sessions={SESSIONS.RECOMMENDED_SESSIONS} />

        <SessionsSection title="الأعلى تقييماً" sessions={SESSIONS.TOP_RATED_SESSIONS} />

        <CustomPagination /> */}
      </Box>
    </>
  );
}
