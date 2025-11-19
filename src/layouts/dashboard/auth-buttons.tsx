import { Stack, Button, darken } from '@mui/material';
import React from 'react';
import { primary } from 'src/theme/palette';

export const AuthButtons = () => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Button
        variant="contained"
        sx={{
          borderRadius: '8px',
          backgroundColor: primary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: darken('#52ADDA', 0.1),
          },
          boxShadow: 'none',
          minWidth: { xs: 100, sm: 130 },
        }}
      >
        تسجيل دخول
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: '8px',
          backgroundColor: primary.dark,
          color: 'white',
          '&:hover': {
            backgroundColor: darken('#163148', 0.1),
          },
          minWidth: { xs: 100, sm: 130 },
        }}
      >
        تسجيل حساب جديد
      </Button>
    </Stack>
  );
};
