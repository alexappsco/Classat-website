'use client';

import { useTheme } from '@mui/material/styles';
import { text, primary, secondary } from 'src/theme/palette';
import { Box, Card, Chip, Stack, Button, Typography } from '@mui/material';

type InstructorCardProps = (typeof INSTRUCTORS)[0];

const INSTRUCTORS = [
  {
    image: '/assets/instructors/instructor_1.jpg',
    name: 'أ. إبراهيم أحمد',
    category: 'مدرس علوم',
    courses: '15',
    rating: 5,
  },
];

export default function InstructorCard({
  image,
  name,
  category,
  courses,
  rating,
}: InstructorCardProps) {
  const theme = useTheme();
  const primaryColor = primary.main;
  const secondaryColor = secondary.main;
  const primaryTextColor = text.primary;

  return (
    <Card
      sx={{
        pb: 2,
        borderRadius: 2,
        boxShadow: theme.customShadows.z12,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',

        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 150,
          borderRadius: '8px 8px 0 0',
          overflow: 'visible',
          backgroundColor: primary.main,
        }}
      >
        {/* Category Chip - Positioned Absolutely */}
        <Chip
          label={category}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 10,
            bgcolor: secondaryColor,
            color: theme.palette.common.white,
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(12),
            zIndex: 10,
          }}
        />

        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            position: 'absolute',
            width: 200,
            height: 'auto',
            top: -93,
            left: '50%',
            transform: 'translateX(-50%)',
            objectFit: 'contain',
            zIndex: 5,
          }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, alignItems: 'flex-end', pt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: primaryTextColor }}>
          الاستاذ / {name}
        </Typography>

        {/* Rating and Course Count */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          width={'100%'}
        >
          <Stack direction="row">
            {Array.from({ length: rating }).map((_, i) => (
              <Box
                key={i}
                component="img"
                src="/assets/icons/rating/star.png"
                alt="Star rating"
                sx={{ width: 16, height: 16, objectFit: 'contain', mx: 0.2 }}
              />
            ))}
          </Stack>

          {/* Course Count */}
          <Box display={'flex'} flexDirection={'row-reverse'} gap={'5px'}>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
              fontSize={14}
            >
              {courses}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
              fontSize={14}
            >
              كورس
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* 3. Profile Button */}
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
        احجز الآن
      </Button>
    </Card>
  );
}
