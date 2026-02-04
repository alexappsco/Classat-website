import { Box, Card, Typography, Stack, Button, Chip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { primary, secondary, text } from 'src/theme/palette';

type TeacherItem = {
  teacherName: string;
  teacherImageUrl: string;
  rating: number;
  nearestAvailableTime: string;
  teacherId: string; 
  onBookNow: (teacherId: string) => void; 
};

type InstructorCardProps = TeacherItem;

export default function InstructorCard({
  onBookNow,
  teacherId,
  teacherName,
  teacherImageUrl,
  rating,
  nearestAvailableTime,
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
        mb:10,
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
        <Box
          component="img"
          src={teacherImageUrl}
          alt={teacherName}
          sx={{
            position: 'absolute',
            width: 200,
            height: 'auto',
            top: -30,
            left: '50%',
            transform: 'translateX(-50%)',
            objectFit: 'contain',
            zIndex: 5,
          }}
        />
      </Box>

<Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, alignItems: 'flex-start', pt: 4 }}>
    <Stack
  direction="row"
  spacing={1} 
  alignItems="center" 
  justifyContent="space-between"
  sx={{ width: '100%' }} 
>
  <Typography variant="h6" sx={{ fontWeight: 600, color: primaryTextColor }}>
    الاستاذ / {teacherName}
  </Typography>
  <Stack alignItems={'center'} direction="row" spacing={0.2}>
      <Box
        component="img"
        src="/assets/icons/rating/star.png"
        alt="Star rating"
        sx={{ width: 14, height: 14, objectFit: 'contain' }}
      />
    <Typography color='rgba(127, 132, 144, 1)'>{rating}</Typography>
  </Stack>
</Stack>
 

  <Box display="flex" flexDirection="row" gap="5px" justifyContent="flex-start" alignSelf="stretch">
     <Typography
      variant="caption"
      sx={{ color: '#54B0D7' }}
      fontSize={14}
    >
      أقرب موعد 
    </Typography>
    <Typography
      variant="caption"
      sx={{ fontWeight: '700' }}
      fontSize={14}
    >
      {nearestAvailableTime}
    </Typography>
   
  </Box>

  
</Stack>

      {/* 3. Profile Button */}
      <Button
        variant='contained'
        size="medium"
        sx={{
          py: 1.5,
          color: "white",
          bgcolor: 'rgba(84, 176, 215, 1)',
          '&:hover': {
            borderColor: primaryColor,
            bgcolor: alpha(primaryColor, 0.08),
          },
          borderRadius: '30px',
          width: '90%',
          m: 'auto',
        }}
        onClick={() => onBookNow(teacherId)} 
      >
       احجز الان
      </Button>
    </Card>
  );
}
