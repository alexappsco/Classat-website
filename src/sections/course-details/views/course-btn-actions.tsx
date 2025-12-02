
import { Box, Button, Stack, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

export default function CourseActions() {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Main action buttons row */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Primary purchase button */}
        <Button
          variant="contained"
          sx={{
            width: '207px',
            height: '50px',
            borderRadius: '25px',
            padding: '16px 24px',
            fontSize: "20px",
            fontWeight: "400",
            backgroundColor: '#54B0D7',
            '&:hover': {
              backgroundColor: '#3A8FB8',
            }
          }}
        >
          شراء الكورس
        </Button>

        {/* Wishlist icon button */}
        <IconButton
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            border: '1px solid #54B0D7',
            color: '#54B0D7',
            '&:hover': {
              backgroundColor: 'rgba(84, 176, 215, 0.1)',
            }
          }}
        >
          <Icon icon="mdi:heart-outline" width={24} height={24}  color='#153A52'/>
        </IconButton>
      </Stack>

      {/* Add to cart button */}
      <Button
        variant="outlined"
        size="large"
        startIcon={<Icon icon="mdi:cart-outline" width={20} />}
        sx={{
          width: '273px',
          height: '50px',
          borderRadius: '25px',
          padding: '16px 24px',
          fontSize: "20px",
          fontWeight: "400",
          lineHeight: "22px",
          gap: '8px',
          border: '1px solid #54B0D7',
          color: '#637381',
          mt: 2,
          '&:hover': {
            borderColor: '#3A8FB8',
            backgroundColor: 'rgba(84, 176, 215, 0.04)',
          }
        }}
      >
        أضف إلى السلة
      </Button>
    </Box>
  );
}
