import { Icon } from '@iconify/react';
import {
  Box,
  Stack,
  Divider,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';

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
export default function AboutSection() {
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
              <img src="/favicon/head.svg" alt="" />
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
