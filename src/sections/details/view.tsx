
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


const instructor = {
  name: 'أ. عبد الله احمد',
  image: '/favicon/teacher1.png',
  role: 'متخصص في تعليم المبتدئين من الصفر بخبرة 5 سنوات',
  skills: 'Python - React - Java - HTML - CSS',
  price: 45,
  duration: '60 دقيقة / الساعة',
  bioImage:
    'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress',
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
              <Typography fontWeight={600} sx={{color:warning.main}}>{instructor.duration}</Typography>
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
            backgroundColor:'#919EAB14',
            borderRadius:'10px',
            '& .MuiTab-root': { fontWeight: 600 },
            alignItems:'center',
            justifyContent:'space-between',
padding:'10px',
margin:'10px',
marginLeft:'20px',
marginRight:'20px',
marginTop:'20px',
marginBottom:'20px',

          }}
        >
          <Tab
            label="عن المحاضر"
            value="about"
            icon={<Icon icon="mdi:account" width={20} />}
            iconPosition="start"
            sx={{width:{xs:'50%',md:'17%'}}}
          />
          <Tab label="الدروس التعليمية" value="courses" sx={{width:{xs:'50%',md:'17%'}}} icon={<img src='/favicon/Group.svg' />} />
          <Tab label="الباقات" value="packages"  sx={{width:{xs:'50%',md:'17%'}}} icon={<img src='/favicon/Vector.svg' />}/>
          <Tab label="احجز جلسة خاصة" value="session" sx={{width:{xs:'50%',md:'17%'}}}  icon={<img src='/favicon/live.svg' />}        />
          <Tab label="البث المباشر" value="live"         sx={{width:{xs:'50%',md:'17%'}}}   icon={<img src='/favicon/Mask group.svg' />}       />
        </Tabs>

        {/* ---------- المحتوى ---------- */}
        <Box sx={{ mt: 4 }}>
          {tab === 'about' && <AboutSection />}
          {tab === 'courses' && <ComingSoon title="الدروس التعليمية" />}
          {tab === 'packages' && <ComingSoon title="الباقات" />}
          {tab === 'session' && <ComingSoon title="جلسة خاصة" />}
          {tab === 'live' && <ComingSoon title="البث المباشر" />}
        </Box>
      </Card>
    </Container>
  );
}

function AboutSection() {
  const t = instructor;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* محتوى النص */}
        <Stack spacing={3} flex={1}>
          {/* نبذة */}
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              نبذة عن المدرس
            </Typography>

            <Typography color="text.secondary" lineHeight={1.9}>
              {t.bio}
            </Typography>
          </Box>

          <Divider />

          {/* المؤهلات */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              {/* <Icon icon="mdi:certificate" color="#1976d2" width={22} /> */}
              <img src='/favicon/head.svg'/>
              <Typography variant="h6" fontWeight={700}>
                المؤهلات العلمية
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              {t.qualifications.map((q, i) => (
                <Stack direction="row" spacing={1} key={i}>
                  <Icon icon="mdi:check-circle" color="#00b074" width={20} />
                  <Typography color="text.secondary">{q}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>

        {/* صورة جانبية */}
        {!isMobile && (
          <img
            src="/favicon/class.png"
            alt="about"
            style={{
              width: 570,
              height: 'auto',
              borderRadius: 12,
              objectFit: 'cover',
            }}
          />
        )}

        {/* صورة للموبايل (فوق النص) */}
        {isMobile && (
          <img
            src="/favicon/class.png"
            alt="about"
            style={{
              width: '100%',
              height: 220,
              borderRadius: 12,
              objectFit: 'cover',
              marginTop: 8,
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <Typography textAlign="center" color="text.secondary" sx={{ py: 6 }}>
      قسم {title} سيتوفر قريباً
    </Typography>
  );
}
