import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { primary, text } from 'src/theme/palette';

type SpecializationCardProps = {
  title: string;
  subtitle: string;
  count: string;
  image: string;
};

/**
 * Custom card component for displaying a single specialization.
 * It features a subtle hover effect and bottom-aligned course count.
 */
export default function SpecializationCard({
  title,
  subtitle,
  count,
  image,
}: SpecializationCardProps) {
  const theme = useTheme();

  // Define the blue color for the course count based on the design
  const courseCountColor = primary.main; // Assuming info.main is the light blue

  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: '20px 0',
        height: 1, // Full height for alignment in the Grid
        boxShadow: '0 0 4px 0 #00000040',
        borderRadius: 2,
        position: 'relative',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.customShadows.z20,
        },
      }}
    >
      <Stack spacing={1} alignItems="center" sx={{ height: 1 }}>
        {/* Icon/Image Placeholder */}
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: 83,
            height: 83,
            objectFit: 'contain',
            mb: 1,
            // Custom blue color for the line-art icon if it's an SVG that supports currentColor
            // color: theme.palette.primary.main,
          }}
        />

        {/* Title */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: text.main, mt: 2, fontSize: 24 }}>
          {title}
        </Typography>

        {/* Subtitle/Description */}
        <Typography
          variant="body2"
          sx={{
            color: text.paragraph,
            fontWeight: '400',
            // Using flexGrow: 1 to push the course count to the bottom
            flexGrow: 1,
            mt: 1,
            fontSize: theme.typography.pxToRem(20),
          }}
        >
          {subtitle}
        </Typography>

        {/* Course Count (Link/Button styled as text) */}
        <Button
          variant="text"
          sx={{
            color: courseCountColor,
            fontWeight: 700,
            // Set the specific font size based on the design (e.g., 14px or 16px)
            fontSize: theme.typography.pxToRem(20),
          }}
        >
          {count}
        </Button>
      </Stack>
    </Card>
  );
}
