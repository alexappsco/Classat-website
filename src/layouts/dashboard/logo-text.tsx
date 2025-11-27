import { Stack, Box, Typography } from '@mui/material';
import { primary } from 'src/theme/palette';

export const LogoText = (lgUp: any) => {
  return (
    <Stack direction="row-reverse" alignItems="center" spacing={1}>
      <Box sx={{ textAlign: 'left' }}>
        {' '}
        <Typography
          variant={lgUp ? 'h3' : 'subtitle1'}
          sx={{
            fontWeight: 600,
            lineHeight: 1,
            color: primary.dark,
          }}
        >
          كلاسات
        </Typography>
        <Typography
          variant={lgUp ? 'h3' : 'caption'}
          sx={{
            lineHeight: 1,
            color: primary.dark,
            fontWeight: 600,
          }}
        >
          Classat
        </Typography>
      </Box>
      <Box
        component="img"
        src="/logo/logo_single_image.png"
        sx={{
          maxWidth: lgUp ? '100px' : '80px',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </Stack>
  );
};
