'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import LoginBYEmailView from './login-with-email';
import { useTranslations } from 'next-intl';

export default function LoginView() {
  const settings = useSettingsContext();
  const t = useTranslations();

  const [currentTab, setCurrentTab] = useState('by_email');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderHead = (
    <Stack sx={{ mb: 2, mt: 4 }}>
      <Typography variant="h6" textTransform="capitalize" textAlign="center">
        {/* {t('Title.sign_in')} */}
        {t('Description.mas_sign_in')}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', alignContent: 'center' }}>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Image src="/logo/SLogo.png" alt="logo" width={400} height={80} />
      </Stack>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '50dvh',
          }}
        >
          {renderHead}
          <LoginBYEmailView />
          <Typography variant="caption" mx={0.2} sx={{ textAlign: 'center', mt: 2 }}>
            {t('Label.Donot_account')}

            <Link href="/auth/register" style={{ fontSize: '12px', color: 'blue' }}>
              {t('Button.creat_account')}
            </Link>
          </Typography>
          {/* <LoginBYPhoneView /> */}
        </Box>
      </Container>
    </Box>
  );
}
