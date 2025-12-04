import Link from 'next/link';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { text, shadow, primary, warning } from 'src/theme/palette';
import { Box, Card, Chip, Stack, Button, Divider, Typography } from '@mui/material';
type LiveSessionCardProps = (typeof LIVE_SESSIONS)[0]; // Reuse the type
const LIVE_SESSIONS = [
  {
    image: '/assets/sessions/mobile_dev.jpg',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'يبدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/sessions/ux_design.jpg',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'يبدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/sessions/coding_basics.jpg',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'يبدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
  {
    image: '/assets/sessions/design_diff.jpg',
    isLive: true,
    category: 'UI UX Desgin',
    title: 'أساسيات تصميم المواقع والتطبيقات',
    instructor: 'أ. خالد محمد',
    time: 'يبدأ منذ 5 دقائق',
    attendees: '15 طالب',
  },
];

export default function LiveSessionCard({
  image,
  isLive,
  category,
  title,
  instructor,
  time,
  attendees,
}: LiveSessionCardProps) {
  const theme = useTheme();
  const redColor = '#B30505';
  const padgBg = '#FFE5E5';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: shadow.main,
        height: 1,
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
          pt: '56.25%', // 16:9 Aspect Ratio
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {/* Session Image */}
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          minWidth={'287px'}
        />

        {/* Live Tag (Chip) - Positioned Absolutely */}
        {isLive && (
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
          {category}
        </Typography>

        {/* Session Title */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
        >
          {title}
        </Typography>

        {/* Instructor Name and Avatar (Simple text for now) */}
        <Typography
          variant="body2"
          sx={{ color: text.primary }}
          display={'flex'}
          alignItems={'center'}
          gap={'10px'}
        >
          <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
          {instructor}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Metadata (Time and Attendees) */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Time/Start Status */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {/* Using a placeholder icon for simplicity */}
            {/* <AccessTimeIcon sx={{ width: 16, height: 16, color: theme.palette.text.secondary }} /> */}
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {time}
            </Typography>
          </Stack>

          {/* Attendees Count */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {/* Using a placeholder icon for simplicity */}
            {/* <PeopleIcon sx={{ width: 16, height: 16, color: theme.palette.text.secondary }} /> */}
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {attendees}
            </Typography>
          </Stack>
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
