import Link from 'next/link';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { text, shadow, primary, warning } from 'src/theme/palette';
import { Box, Card, Chip, Stack, Button, Divider, Typography, CardMedia } from '@mui/material';
import { ILiveCourse } from 'src/types/liveCourse';
// const LIVE_SESSIONS = [
//   {
//     image: '/assets/sessions/mobile_dev.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'يبدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/ux_design.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'يبدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/coding_basics.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'يبدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/design_diff.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'يبدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
// ];

interface LiveSessionCard {
  liveCourse: ILiveCourse;
}
export default function LiveSessionCard({ liveCourse }: LiveSessionCard) {
  const theme = useTheme();
  const redColor = '#B30505';
  const padgBg = '#FFE5E5';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  const parseStart = () => {
    if (!liveCourse.date || !liveCourse.time) return null;

    const dateOnly = liveCourse.date.split('T')[0];

    return new Date(`${dateOnly}T${liveCourse.time}Z`);
  };
  const startsAt = parseStart();

  const localDate = startsAt?.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const localTime = startsAt?.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // لو عايز AM/PM
  });

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: shadow.main,
        height: 'auto',
        // Ensure card content stacks correctly
        display: 'flex',
        flexDirection: 'column',
        p: '20px 16px 16px',

        // width: 'fit-content',
      }}
    >
      {/* 1. Image and Live Tag Area */}
      <Box
        sx={{
          position: 'relative',
          // pt: '56.25%', // 16:9 Aspect Ratio
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {/* Session Image */}
        {/* <Box
          component="img"
          src={liveCourse.coverImagePath}
          alt={liveCourse.title}
          sx={{
            position: 'absolute',
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          minWidth={'287px'}
        /> */}
        <CardMedia
          component="img"
          image={liveCourse.coverImagePath}
          alt={liveCourse.title}
          sx={{ height: 270, width: '100%', objectFit: 'fill' }}
        />

        {/* Live Tag (Chip) - Positioned Absolutely */}
        {liveCourse.status && (
          <Chip
            label="مباشر"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: padgBg, // Red for 'Live'
              color: redColor,
              fontWeight: 700,
              fontSize: theme.typography.pxToRem(12),
            }}
          />
        )}
      </Box>

      {/* 2. Content Area */}
      <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
        {/* Category Tag */}
        <Typography
          variant="caption"
          sx={{
            backgroundColor: orangeBg,
            color: orangeColor, // Orange color for the tag
            fontWeight: 600,
            fontSize: 14,
            borderRadius: '30px',
            padding: '14px',
            width: 'fit-content',
          }}
        >
          {liveCourse.courseCategory}
        </Typography>

        {/* Session Title */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
        >
          {liveCourse.title}
        </Typography>

        {/* Instructor Name and Avatar (Simple text for now) */}
        <Typography
          variant="body2"
          sx={{ color: text.primary }}
          display={'flex'}
          alignItems={'center'}
          gap={'10px'}
        >
          <Image src={liveCourse.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} />
          {liveCourse.teacherName}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Metadata (Time and Attendees) */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Time/Start Status */}
          {/* <Stack direction="row" alignItems="center" spacing={0.5}>

            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {liveCourse.time}
            </Typography>
          </Stack> */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography sx={{ fontSize: '14px', color: '#666', display: 'flex' }}>
              <img
                src={'/assets/icons/app/calendar-event.svg'}
                style={{ height: '18px', marginLeft: '5px' }}
                alt=""
              />
              {localDate}
            </Typography>

          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              <img
                src={'/assets/icons/app/clock.svg'}
                style={{ height: '18px', marginLeft: '5px' }}
                alt=""
              />
              {localTime}
            </Typography>

          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              {liveCourse.price} <span style={{ color: '#666' }}> AED</span>
            </Typography>

          </Stack>

          {/* Attendees Count */}
          {/* <Stack direction="row" alignItems="center" spacing={0.5}>

            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {liveCourse.isEnrolled ? 'Enrolled' : 'Not Enrolled'}
            </Typography>
          </Stack> */}
        </Stack>
      </Stack>

      {/* 3. Join Button */}
      <Link href="/ar/courses/instructor/">
        <Button
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: primary.main,
            color: 'white',
            width: '90%',
            m: 'auto',
            borderTopLeftRadius: theme.spacing(4),
            borderTopRightRadius: theme.spacing(4),
            borderBottomLeftRadius: theme.spacing(4),
            borderBottomRightRadius: theme.spacing(4),
          }}
        >
          انضم الآن
        </Button>
      </Link>
    </Card>
  );
}
