import { Box, Card, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { text } from 'src/theme/palette';

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

function FeatureCard({ title, description, image }: FeatureCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 4,
        height: 1, // Full height inside the Grid
        boxShadow: '0 0 4px 0 #00000040', // Using a subtle shadow
        borderRadius: 2,
        // Optional: Adding a light hover effect
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Stack spacing={3} alignItems="center">
        {/* Icon/Image Placeholder */}
        <Box
          component="img" // Use Box as an image element
          src={image}
          alt={title}
          sx={{
            width: 80,
            height: 80,
            objectFit: 'contain',
            mb: 2,
          }}
        />

        {/* Title */}
        <Typography variant="h4" sx={{ fontWeight: 700, color: text.main, fontSize: 24 }}>
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, color: text.paragraph, lineHeight: 1, fontSize: 20 }}
        >
          {description}
        </Typography>
      </Stack>
    </Card>
  );
}

export default FeatureCard;
