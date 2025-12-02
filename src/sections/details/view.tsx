'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  Tabs,
  Tab,
  Stack,
  Typography,
  Container,
  Avatar,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { warning } from 'src/theme/palette';
import AboutSection from './aboutSection';
import EducationalLessons from './courses';
import LiveSectionDetails from './LiveSectionDetails';
import { PackagesSection } from './PackagesSection';
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
  const [tab, setTab] = useState('about');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          // aria-label="icon tabs example"
          // textColor='primary'

          // indicatorColor="primary"

          sx={{
            mt: 4,
            // borderBottom: '1px solid #eee',
            backgroundColor: '#919EAB14',
            borderRadius: '10px',
            '& .MuiTab-root': { fontWeight: 600 },
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
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
            sx={{ width: { xs: '50%', md: '17%' } }}
          />
          <Tab
            label="الدروس التعليمية"
            value="courses"
            sx={{ width: { xs: '65%', md: '17%' } }}
            icon={<img src="/favicon/Group.svg" alt="" />}
          />
          <Tab
            label="الباقات"
            value="packages"
            sx={{ width: { xs: '50%', md: '17%' } }}
            icon={<img src="/favicon/Vector.svg" alt="" />}
          />
           <Tab
            label="البث المباشر"
            value="live"
            sx={{ width: { xs: '50%', md: '17%' } }}
            icon={<img src="/favicon/live.svg" alt="" />}

          />
          <Tab
            label="احجز جلسة خاصة"
            value="session"
            sx={{ width: { xs: '65%', md: '17%' } }}
            icon={<img src="/favicon/Mask group.svg" alt="" />}

          />

        </Tabs>

        {/* ---------- المحتوى ---------- */}
        <Box sx={{ mt: 4 }}>
          {tab === 'about' && <AboutSection />}
          {tab === 'courses' && <EducationalLessons />}
          {tab === 'packages' && <PackagesSection  />}
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
