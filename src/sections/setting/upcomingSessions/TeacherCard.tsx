import { Card, Box, Typography, Stack, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { primary, secondary, shadow, text } from 'src/theme/palette';


interface Props {
  image: string;
  title: string;
  instructor: string;
  time: string;
  rating: number;
  isBooked?: boolean;
}

export default function TeacherCard({
  image,
  title,
  instructor,
  time,
  rating,
  isBooked = false,
}: Props) {

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
        // Critical: Allows child elements (instructor image) to slightly overflow
        overflow: 'visible',
      }}
    >
      {/* الصورة */}
      <Box sx={{           position: 'relative',
          height: 150,
          borderRadius: '8px 8px 0 0', // Rounded corners on top only
          overflow: 'visible', // Keeps image overflow visible
          backgroundColor: primary.main, }}>
        <Box
          component="img"
          src={image}
          alt={instructor}
          sx={{
            position: 'absolute',
            width: 200,
            height: 'auto', // Fixed height
            top: -93, // Push the image down to exit the card slightly
            left: '50%',
            transform: 'translateX(-50%)', // Center the image horizontally
            objectFit: 'contain',
            zIndex: 5,
          }}
        />

        {/* التخصص */}
        <Chip
          label="Web Development"
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
      </Box>

      {/* الاسم + التقييم */}
      <Stack spacing={1.5}  sx={{ p: 2, flexGrow: 1, alignItems: 'flex-start', pt: 4 }}>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: 16 }}
        >
          {instructor}
        </Typography>

        {/* التقييم */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {[...Array(rating)].map((_, i) => (
            <Box
              key={i}
              component="img"
              src="/assets/icons/rating/star.png"
              sx={{ width: 18, height: 18 }}
            />
          ))}
          <Typography color="#777" sx={{ fontSize: 14 }}>
            {rating}.8
          </Typography>
        </Stack>

        {/* الوقت */}
        <Typography color="#777"  fontSize={14}>
          {time}
        </Typography>

        {/* زر */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            bgcolor: isBooked ? '#ddd' : '#2EA6FF',
            color: isBooked ? '#000' : '#fff',
            borderRadius: 2,
            fontWeight: 'bold',
          }}
        >
          {isBooked ? 'إلغاء الحجز' : 'انضم الآن'}
        </Button>
      </Stack>
    </Card>
  );
}
