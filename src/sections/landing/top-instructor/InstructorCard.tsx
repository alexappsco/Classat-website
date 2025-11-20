import { Box, Card, Typography, Stack, Button, Chip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { repeat } from 'lodash';
import Image from 'src/components/image';
import { primary, secondary, shadow, text } from 'src/theme/palette';
// import StarIcon from '@mui/icons-material/Star'; // Placeholder for the star icon

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
  // Define light blue and orange colors based on the design
  const primaryColor = primary.main;
  const secondaryColor = secondary.main;
  const primaryTextColor = text.primary; // Light blue for button
  //   function Rating(rating) {
  //     let stars = [];
  //     for (let counter = 0; counter < rating; counter++) stars.push();
  //   }

  return (
    // <Card
    //   sx={{
    //     p: 0,
    //     borderRadius: 2,
    //     boxShadow: shadow.main,
    //     height: 1,
    //     // Ensures content stacks correctly for the card
    //     display: 'flex',
    //     flexDirection: 'column',
    //     textAlign: 'center',
    //     overflow: 'visible',
    //   }}
    //   style={{ overflow: 'visible' }}
    // >
    //   {/* 1. Image and Category Tag Area */}
    //   <Box sx={{ position: 'relative', pt: '100%' }}>
    //     {/* Instructor Image */}
    //     <Box
    //       component="img"
    //       src={image}
    //       alt={name}
    //       sx={{
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         width: 1,
    //         height: 1,
    //         objectFit: 'cover',
    //       }}
    //     />

    //     {/* Category Chip - Positioned Absolutely */}
    //     <Chip
    //       label={category}
    //       size="small"
    //       sx={{
    //         position: 'absolute',
    //         top: 10,
    //         left: 10, // Position on the left side in RTL
    //         bgcolor: secondaryColor, // Use a light blue color
    //         color: theme.palette.common.white,
    //         fontWeight: 500,
    //         fontSize: theme.typography.pxToRem(12),
    //       }}
    //     />
    //   </Box>

    //   {/* 2. Content and Rating Area */}
    //   <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, alignItems: 'center' }}>
    //     {/* Instructor Name */}
    //     <Typography variant="h6" sx={{ fontWeight: 600, color: primaryColor }}>
    //       {name}
    //     </Typography>
    //     {/* Rating and Course Count */}
    //     <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
    //       {/* Rating Stars */}
    //       <Stack direction="row" alignItems={'flex-start'}>
    //         {Array.from({ length: rating }).map((_, i) => (
    //           <Box
    //             key={i}
    //             component="img"
    //             // Local path for the star image
    //             src="/assets/icons/rating/star.png"
    //             alt="Star rating"
    //             sx={{ width: 16, height: 16, objectFit: 'contain', mx: 0.2 }}
    //           />
    //         ))}
    //       </Stack>

    //       {/* Course Count */}
    //       <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
    //         {courses}
    //       </Typography>
    //     </Stack>
    //   </Stack>

    //   {/* 3. Profile Button */}
    //   <Button
    //     variant="outlined"
    //     size="large"
    //     sx={{
    //       py: 1.5,
    //       color: secondaryColor,
    //       borderColor: secondaryColor,
    //       '&:hover': {
    //         borderColor: secondaryColor,
    //         bgcolor: alpha(secondaryColor, 0.08),
    //       },
    //       borderTopLeftRadius: 0,
    //       borderTopRightRadius: 0,
    //       // Push button to the bottom edge
    //       mt: 'auto',
    //     }}
    //   >
    //     عرض الملف الشخصي
    //   </Button>
    // </Card>
    <Card
      sx={{
        py: 2,
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
      {/* 1. Image and Category Tag Area (Composite Background) */}
      <Box
        sx={{
          position: 'relative',
          height: 150,
          borderRadius: '8px 8px 0 0', // Rounded corners on top only
          overflow: 'visible', // Keeps image overflow visible
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
            left: 16,
            bgcolor: secondaryColor,
            color: theme.palette.common.white,
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(12),
            zIndex: 10,
          }}
        />

        {/* Instructor Image (PNG) - Positioned to slightly exit the card boundary */}
        <Box
          component="img"
          src={image}
          alt={name}
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
      </Box>

      {/* 2. Content and Rating Area (Below the image, padded to clear the image overlap) */}
      <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, alignItems: 'flex-end', pt: 4 }}>
        {/* Instructor Name */}
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
          {/* Rating Stars (PNG Image) */}
          <Stack direction="row">
            {Array.from({ length: rating }).map((_, i) => (
              <Box
                key={i}
                component="img"
                // Local path for the star image
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
        variant="outlined"
        size="medium"
        sx={{
          py: 1.5,
          color: primaryTextColor,
          borderColor: primaryColor,
          '&:hover': {
            borderColor: primaryColor,
            bgcolor: alpha(primaryColor, 0.08),
          },
          borderRadius: '30px',
          width: '90%',
          m: 'auto',
        }}
      >
        عرض الملف الشخصي
      </Button>
    </Card>
  );
}
