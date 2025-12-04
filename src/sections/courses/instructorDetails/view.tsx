'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { warning } from 'src/theme/palette';
import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Avatar,
  useTheme,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';

import AboutSection from './aboutSection';
import { PackagesSection } from './PackagesSection';
import LiveSectionDetails from './LiveSectionDetails';
import LiveSectionTimeDetails from './LiveSectionTimeDetails';

const instructor = {
  name: 'أ. عبد الله احمد',
  image: '/favicon/teacher1.png',
  role: 'متخصص في تعليم المبتدئين من الصفر بخبرة 5 سنوات',
  skills: 'Python - React - Java - HTML - CSS',
  price: 45,
  duration: '60 دقيقة / الساعة',
  bioImage: 'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress',
  bio: `مرّ البرنامج على مدار سنوات بمحاضرين متخصصين في تطوير الويب (Web Development)، يقدم خبرة كبيرة
  بالأفكار و المحتوى في كيفية تطوير مواقع الويب باستخدام أحدث التقنيات.

  كما يعمل المحاضر كـ مبرمج واجهات (Frontend Developer) حيث يمتلك خبرة قوية في مجال
  التطوير الشامل (Full Stack) إضافة لتجربة تدريس متميزة للطلاب.`,
  qualifications: [
    'حاصل على بكالوريوس علوم الحاسب من جامعة القاهرة.',
    ' حاصل على Google Developer Training.',
    ' حاصل على Meta Frontend Certificate.',
    ' Udacity في Full Stack Web Development Nanodegree.',
  ],
};

export default function InstructorProfileUI() {
  const [tab, setTab] = useState('session');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const tabStyle = {
    width: { xs: '50%', md: '17%' },
    fontWeight: 600,

    '&.Mui-selected': {
      backgroundColor: '#54B0D7',
      color: '#fff',
      borderRadius: '25px',
    },

    '&.Mui-selected .MuiTab-iconWrapper': {
      color: '#fff',
    },
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Card sx={{ p: { xs: 2, md: 4 } }}>
        {/* ---------- Header ---------- */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          {/* صورة المحاضر */}
          <Avatar
            src={instructor.image}
            sx={{
              borderRadius: 3,
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
            }}
          />

          {/* معلومات المحاضر */}
          <Stack spacing={1} flexGrow={1} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h5" fontWeight={700}>
              {instructor.name}
            </Typography>

            <Typography color="text.secondary">{instructor.role}</Typography>

            <Typography fontSize={14}> {instructor.skills} </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems="center"
            >
              <Icon icon="ic:round-star" color="#ffb400" width={22} />
              <Typography fontWeight={600}>4.5</Typography>
            </Stack>
            <Typography fontWeight={600} sx={{ color: warning.main }}>
              {instructor.duration}
            </Typography>
            {/* <Chip
              label={`${instructor.price} درهم / الساعة`}
              color="primary"
              sx={{ width: 'fit-content', mx: { xs: 'auto', md: 0 }, mt: 1 }}
            /> */}
          </Stack>
        </Stack>

        {/* ---------- Tabs ---------- */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mt: 4,
            backgroundColor: '#919EAB14',
            borderRadius: '10px',
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px',
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Tab
            label="عن المحاضر"
            value="about"
            icon={<Icon icon="mdi:account" width={20} />}
            iconPosition="start"
            sx={tabStyle}
          />

          <Tab
            label="الباقات"
            value="packages"
            icon={
              <Image
                src="/favicon/Vector.svg"
                alt="packages-icon"
                width={20}
                height={20}
                style={{ objectFit: 'contain' }}
              />
            }
            sx={tabStyle}
          />

          <Tab
            label="احجز جلسة خاصة"
            value="session"
            icon={<Image src="/favicon/Mask group.svg" alt="session-icon" width={20} height={20} />}
            sx={tabStyle}
          />

          <Tab
            label="البث المباشر"
            value="live"
            icon={<Image src="/favicon/live.svg" alt="live-icon" width={20} height={20} />}
            sx={tabStyle}
          />
        </Tabs>

        {/* ---------- المحتوى ---------- */}
        <Box sx={{ mt: 4 }}>
          {tab === 'about' && <AboutSection />}

          {tab === 'packages' && <PackagesSection />}
          {tab === 'live' && <LiveSectionDetails title="البث المباشر" />}
          {tab === 'session' && <LiveSectionTimeDetails title="جلسة خاصة" />}
        </Box>
      </Card>
    </Container>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <Typography textAlign="center" color="text.secondary" sx={{ py: 6 }}>
      قسم {title} سيتوفر قريباً
    </Typography>
  );
}
