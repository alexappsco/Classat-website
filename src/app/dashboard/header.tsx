'use client';

import { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  BottomNavigationAction,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';

import { useSettingsContext } from 'src/components/settings';

import { useTranslations } from 'next-intl';
import Logo from 'src/components/logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge, { badgeClasses } from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/dist/client/components/navigation';
import { HEADER } from 'src/layouts/config-layout';
import AccountPopover from 'src/layouts/common/account-popover';

type SubscriptionState = {
  isInFreeTrial: boolean;
  trialPeriodEndAt: string;
  isSubscriptionActive: boolean;
};

export default function Header() {
  const theme = useTheme();
  // const settings = useSettingsContext();
  const t = useTranslations();
 
  return (
    <AppBar
      sx={{
        height: 'auto',
        // mb: 2,
        // zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({ color: theme.palette.background.default }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        padding: '5px 20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'start',
          // pt: 1,
        }}
      >
        <Box>
          <Logo enableText />
        </Box>
        <Box pt={0.5}>
          <IconButton
          //  onClick={() => router.push('/favorites')}
          >
            <FavoriteIcon />
            {/* <CartBadge badgeContent={2} color="primary" overlap="circular" /> */}
          </IconButton>
          <IconButton
          //  onClick={() => router.push('/favorites')}
          >
            <ShoppingCartIcon fontSize="small" />
            {/* <CartBadge badgeContent={2} color="primary" overlap="circular" /> */}
          </IconButton>
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          {/* <SettingsButton /> */}
          <AccountPopover />
        </Box>
      </Box>
    </AppBar>
  );
}
