'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import Hero from './Hero';
import LiveSessionsSection from './live-sessions/LiveSessionSection';
import CategoriesClasse from './categories';
import InstructorsSection from './sections/top-instructor/TopInstructorsSection';
import NextLessonsPreview from './nextLessonsPreview';
import RecoarLessonsSection, {
  StudentLesson,
} from './recoardlessons/RecoarLessonsSection';

import { useTranslations } from 'next-intl';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/navigation';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

type EducationGrade = { id: string; name: string };

type SubjectItem = {
  id: string;
  educationSubjectId: string;
  educationSubjectName: string;
  educationSubjectLogo: string;
};

type CoursesProps = {
  educationGrade?: EducationGrade;
  subjects: SubjectItem[];
};

export default function Courses({ educationGrade, subjects }: CoursesProps) {
  const t = useTranslations();
  const settings = useSettingsContext();
  const router = useRouter();

  // ===== State =====
  const [recordedLessons, setRecordedLessons] = useState<StudentLesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  // ===== Fetch Recorded Lessons =====
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getData<{
          items: StudentLesson[];
        }>(endpoints.studentEducationLesson.get);

          const lessons = (response.data as { items: StudentLesson[] })?.items ?? [];

        setRecordedLessons(lessons);
      } catch (error) {
        console.error('Error fetching recorded lessons:', error);
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchLessons();
  }, []);

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
          <CategoriesClasse subjects={subjects} />
        </Box>
      </Box>

      <Box sx={{ pt: 16 }}>
        {/* ===== Next Lessons ===== */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '2%', xl: '8%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              الدروس القادمة
            </Typography>

            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              onClick={() => router.push('/nextlessons')}
            >
              الكل
              <LeftIcon />
            </Button>
          </Box>

          <NextLessonsPreview />
        </Box>

        {/* ===== Live Sessions ===== */}
        <LiveSessionsSection />

        {/* ===== Top Teachers + Recorded Lessons ===== */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 6 },
            direction: 'ltr',
            mx: { md: '0', xs: '0', lg: '2%', xl: '8%' },
          }}
        >
          {/* Top Teachers */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              المعلمين الأعلى تقييمًا
            </Typography>

            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              onClick={() => router.push('/curricula/topTeacher')}
            >
              الكل
              <LeftIcon />
            </Button>
          </Box>
          <InstructorsSection />

          {/* Recorded Lessons */}
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              الدروس المسجلة
            </Typography>

            <Button
              color="info"
              sx={{ lineHeight: 1 }}
              onClick={() => router.push('/recoardlessons')}
            >
              الكل
              <LeftIcon />
            </Button>
          </Box>
          {loadingLessons ? (
            <Typography>جاري تحميل الدروس...</Typography>
          ) : (
            <RecoarLessonsSection
              lessons={recordedLessons}
              limit={4}
            />
          )}
        </Box>
      </Box>
    </>
  );
}