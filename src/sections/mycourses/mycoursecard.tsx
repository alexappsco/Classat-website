'use client';
import { text, shadow, primary, warning } from 'src/theme/palette';
import { Box, Card, Stack, Divider, Typography } from '@mui/material';

export interface MyCoursesCardProps {
  image: string;
  category: string;
  title: string;
  instructor: string;
  status: string;
  barStatus: number;
}

export default function MyCoursesCard({
  image,
  category,
  title,
  instructor,
  status,
  barStatus,
}: MyCoursesCardProps) {
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';

  const getStatusText = () => {
    if (barStatus === 0) return "لم يتم البدء بعد";
    if (barStatus === 100) return "تم إنجاز الكورس بالكامل";
    return `تم إنجاز ${barStatus}% من الكورس`;
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: shadow.main,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: '20px 16px 16px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pt: '56.25%',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
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
        />
      </Box>

      <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
        <Typography
          variant="caption"
          sx={{
            backgroundColor: orangeBg,
            color: orangeColor,
            fontWeight: 600,
            fontSize: 14,
            borderRadius: '30px',
            padding: '14px',
            width: 'fit-content',
          }}
        >
          {category}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: text.primary }}
          display="flex"
          alignItems="center"
          gap="10px"
        >
          <img
            src="/assets/landing-page/live-sessions/instructors/instructor.png"
            alt="instructor"
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          {instructor}
        </Typography>
        <Box sx={{ width: '100%', mt: 1, mb: -1 }}>
          <Box
            sx={{
              height: 4,
              width: `${barStatus}%`,
              bgcolor: 'rgba(34, 197, 94, 1)',
              borderRadius: '23px',
            }}
          />
        </Box>

        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 400,
            color: 'rgba(161, 165, 179, 1)',
            fontSize: '12px',
            lineHeight: '16px',
            textAlign: 'end',
          }}
        >
          {getStatusText()}
        </Typography>
      </Stack>
    </Card>
  );
}
