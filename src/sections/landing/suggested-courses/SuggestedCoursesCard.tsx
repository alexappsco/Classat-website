import { Box, Card, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import { warning } from 'src/theme/palette';

type LiveSessionCardProps = {
  image: string;
  category: string;
  title: string;
  instructor: string;
  time: string;
  attendees: string;
  rating: number;
  price: string;
  ratingCount: string;
};

export default function LiveSessionCard({
  image,
  category,
  title,
  instructor,
  time,
  attendees,
  rating,
  price,
  ratingCount,
}: LiveSessionCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: '#FFF7EB',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        width: 280,
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: '100%',
          height: 0,
          paddingTop: '70%',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          alt={title}
          src={image}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <Stack spacing={1} sx={{ mt: 2 }}>
        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography sx={{ color: '#848484', fontSize: 14 }}>{rating.toFixed(1)}</Typography>
          <Typography sx={{ color: 'orange', fontSize: 14 }}>★</Typography>
          <Typography sx={{ color: '#848484', fontSize: 14 }}>({ratingCount})</Typography>
        </Stack>

        {/* Category Chip */}
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: '#FFEEC4',
            color: '#D29500',
            width: 'fit-content',
            px: 1.5,
            py: 0.7,
            borderRadius: '20px',
          }}
        >
          {category}
        </Typography>

        {/* Title */}
        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{title}</Typography>

        {/* Meta: time + lessons */}
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontSize: 13, color: '#7D7D7D' }}>{time}</Typography>
          <Typography sx={{ fontSize: 13, color: '#7D7D7D' }}>{attendees}</Typography>
        </Stack>

        {/* Instructor + Price */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              src="/assets/landing-page/live-sessions/instructors/instructor.png"
              sx={{ width: 34, height: 34, borderRadius: '50%' }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{instructor}</Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#F4A100',
            }}
          >
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
