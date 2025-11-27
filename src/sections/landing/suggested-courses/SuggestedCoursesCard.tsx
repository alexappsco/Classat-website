import { Box, Card, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import { primary, secondary, warning, text, shadow } from 'src/theme/palette';

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
  const orangeColor = secondary.main;
  const liteOrangeColor = secondary.lighter;
  const textPrimaryColor = text.primary;
  const textParagraphColor = text.paragraph;
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: shadow.main,
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

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack
          spacing={1}
          sx={{ mt: 2 }}
          direction={'row-reverse'}
          justifyContent={'space-between'}
        >
          {/* Rating */}
          <Stack direction="row-reverse" alignItems="center" spacing={0.5}>
            <Typography sx={{ color: textParagraphColor, fontSize: 14 }}>
              {rating.toFixed(1)}
            </Typography>
            <Typography sx={{ color: 'orange', fontSize: 14 }}>★</Typography>
            <Typography sx={{ color: textParagraphColor, fontSize: 14, direction: 'rtl' }}>
              ({ratingCount})
            </Typography>
          </Stack>

          {/* Category Chip */}
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: liteOrangeColor,
              color: orangeColor,
              width: 'fit-content',
              px: 1.5,
              py: 0.7,
              borderRadius: '20px',
            }}
          >
            {category}
          </Typography>
        </Stack>
        {/* Title */}
        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{title}</Typography>

        {/* Meta: time + lessons */}
        <Stack direction="row-reverse" spacing={2} justifyContent={'space-around'}>
          <Typography sx={{ color: textParagraphColor, direction: 'rtl' }}>{time}</Typography>
          <Typography sx={{ color: textParagraphColor, direction: 'rtl' }}>{attendees}</Typography>
        </Stack>

        {/* Instructor + Price */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              src="/assets/landing-page/live-sessions/instructors/instructor.png"
              sx={{ width: 40, height: 40, borderRadius: '50%' }}
            />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{instructor}</Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: orangeColor,
            }}
          >
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
