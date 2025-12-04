import { Box, Chip, Stack, Typography } from '@mui/material';

import CategoryBadge from './course-category';

// Course type buttons configuration
const BUTTON_TYPES = [
  'الدروس المسجلة',
  'بث مباشر',
  'الباقات',
  'احجز جلسة خاصة',

]

export default function CourseHero() {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <CategoryBadge category="Web Development" size="medium" />
        {/* Course title and description section */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            color: "#0E0E0F",
            lineHeight:"21px",
            mb: 2,
            marginTop: 2,
            fontStyle:"Regular" ,
            fontSize: { xs: '1.75rem', md: '2.5rem', lg: '32px' }
          }}
        >
          تطوير تطبيقات الويب بـ React
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#637381',
            lineHeight: '21px',
            fontSize: "16px"
          }}
        >
         كورس شامل لتعلم تطوير تطبيقات الويب الحديثة باستخدام React. ستتعلم
          <br />كيفية بناء واجهات مستخدم تفاعلية وديناميكية من الصفر حتى الاحتراف.
        </Typography>
      </Box>
        {/* Course type filter chips */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
      >
        {BUTTON_TYPES.map((button) => (
          <Chip
            key={button}
            label={button}
            variant="outlined"
            clickable
            sx={{
              borderRadius: 16,
              padding:2,
              mb: 1,
              gap:4,
              borderColor: '#E7E8E9',
              color: '#446175',
              '&:hover': {
          borderColor: '#54B0D7',
          backgroundColor: 'rgba(84, 176, 215, 0.04)',
        },
        '&.Mui-focusVisible': {
          borderColor: '#54B0D7',
        }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
