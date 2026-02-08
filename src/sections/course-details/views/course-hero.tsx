'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';
import CategoryBadge from './course-category';

// Course type buttons configuration
const BUTTON_TYPES = [
  'الدروس المسجلة',
  'بث مباشر',
  'الباقات',
  'احجز جلسة خاصة',
];

type Props = {
  title: string;
  description: string;
  category: string;
  price: number;
};

export default function CourseHero({ title, description, category, price }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <CategoryBadge category={category} size="medium" />

        {/* Course title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            color: '#0E0E0F',
            lineHeight: '21px',
            mb: 2,
            mt: 2,
            fontStyle: 'Regular',
            fontSize: { xs: '1.75rem', md: '2.5rem', lg: '32px' },
          }}
        >
          {title}
        </Typography>

        {/* Course description */}
        <Typography
          variant="body1"
          sx={{
            color: '#637381',
            lineHeight: '21px',
            fontSize: '16px',
          }}
        >
          {description}
        </Typography>
         <Typography
          variant="body1"
          sx={{
            color: 'rgba(232, 139, 51, 1)',
            lineHeight: '21px',
            fontSize: '16px',
          }}
        >
          {price} درهم
        </Typography>
      </Box>

      {/* Course type filter chips */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {BUTTON_TYPES.map((button) => (
          <Chip
            key={button}
            label={button}
            variant="outlined"
            clickable
            sx={{
              borderRadius: 16,
              padding: 2,
              mb: 1,
              gap: 4,
              borderColor: '#E7E8E9',
              color: '#446175',
              '&:hover': {
                borderColor: '#54B0D7',
                backgroundColor: 'rgba(84, 176, 215, 0.04)',
              },
              '&.Mui-focusVisible': {
                borderColor: '#54B0D7',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
