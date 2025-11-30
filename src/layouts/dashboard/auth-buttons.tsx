import { Stack, Button, darken, Box, SvgIcon } from '@mui/material';
import React, { useState } from 'react';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import JwtRegisterDialog from 'src/sections/auth/jwt-register-view';
import LoginBYEmailDialog from 'src/sections/auth/login-with-email';
import { primary } from 'src/theme/palette';

export const AuthButtons = ({ changeSignIn }: any) => {
  const smDown = useResponsive('down', 'sm');
  const mainWidth = smDown ? {} : { xs: 100, sm: 130 };
  const [open, setOpen] = useState(false);
  const [openRe, setOpenRe] = useState(false);

  return (
    <Stack direction={'row'} spacing={1.5} alignItems="center">
      <Button
        variant="contained"
        sx={{
          borderRadius: '16px',
          backgroundColor: primary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: darken('#52ADDA', 0.1),
          },
          boxShadow: 'none',
          pb: '10px',
          minWidth: mainWidth,
        }}
        onClick={() => setOpen(true)}
      >
        {smDown ? <Image src="/assets/header/login-icon.svg" /> : 'تسجيل دخول'}
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: '16px',
          backgroundColor: primary.dark,
          color: 'white',
          '&:hover': {
            backgroundColor: darken('#163148', 0.1),
          },
          textAlign: 'center',
          pb: '10px',
          minWidth: mainWidth,
        }}
        onClick={() => setOpenRe(true)}
      >
        {smDown ? <Image src="/assets/header/register-icon.png" /> : 'تسجيل حساب جديد'}
      </Button>
      <LoginBYEmailDialog open={open} onClose={() => setOpen(false)} />
      <JwtRegisterDialog open={openRe} onClose={() => setOpenRe(false)} />
    </Stack>
  );
};
