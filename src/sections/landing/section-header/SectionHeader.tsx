import { Box, Typography, Stack, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { secondary, text } from 'src/theme/palette';

// Define the component's props
type SectionHeaderProps = {
  title: string;
  description?: string; // Optional description
  separatorImage?: string;
};

/**
 * Custom component for section titles with an orange separator and an optional description.
 * It's designed to be centered and responsive.
 */
export default function SectionHeader({
  title,
  description,
  separatorImage = '/assets/line.png',
}: SectionHeaderProps) {
  const theme = useTheme();

  const titleParts = title.split(' ');
  const firstPart = titleParts.slice(0, 1).join(' ');
  const lastPart = titleParts.slice(1).join(' ');

  const darkTextColor = text.main;
  const orangeColor = secondary.main;

  return (
    <Container
      maxWidth="md" // Restrict max width to center the title better
      sx={{
        textAlign: 'center',
        py: { xs: 4, md: 6 }, // Responsive top/bottom padding
        direction: 'rtl',
      }}
    >
      <Stack spacing={{ xs: 2, md: 3 }} alignItems="center">
        {/* Title */}
        <Typography
          variant="h3" // Large heading for visibility and responsiveness
          component="h2"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {/* First part of the title (Dark color) */}
          <Box component="span" sx={{ color: darkTextColor }}>
            {firstPart}
          </Box>
          {/* Space separator */} {/* Last word (Orange color) */}
          <Box component="span" sx={{ color: orangeColor }}>
            {lastPart}
          </Box>
        </Typography>

        {/* Separator Image (The orange line) */}
        <Box
          component="img"
          src={separatorImage}
          alt="Separator line"
          sx={{
            width: { xs: 150, sm: 200, md: 250 }, // Responsive width for the line
            height: 'auto',
            objectFit: 'contain',
            mt: 1, // Slight margin top
          }}
        />

        {/* Optional Description */}
        {description && (
          <Typography
            variant="h4" // Slightly larger body text for description
            sx={{
              color: text.paragraph,
              fontWeight: 'normal',
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
    </Container>
  );
}
