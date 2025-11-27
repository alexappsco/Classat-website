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
  // const isNavHorizontal = settings.themeLayout === 'horizontal';
  // const isNavMini = settings.themeLayout === 'mini';
  // const lgUp = useResponsive('up', 'lg');
  // const offset = useOffSetTop(HEADER.H_DESKTOP);
  // // const offsetTop = offset && !isNavHorizontal;

  // const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await currentSubscription();
  //       setSubscription(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const trialEndDate = new Date(subscription?.trialPeriodEndAt || '');
  // const today = new Date();
  // let daysLeft = 0;

  // if (trialEndDate.getTime()) {
  //   const diffInMs = trialEndDate.getTime() - today.getTime();
  //   daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  // }

  // const CartBadge = styled(Badge)`
  //   & .${badgeClasses.badge} {
  //     top: -12px;
  //     right: -6px;
  //   }
  // `;
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
        // ...(lgUp && {
        //   width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
        //   ...(offsetTop && { height: HEADER.H_DESKTOP_OFFSET }),
        //   ...(isNavHorizontal && {
        //     width: 1,
        //     bgcolor: 'background.default',
        //     borderBottom: `dashed 1px ${theme.palette.divider}`,
        //   }),
        //   ...(isNavMini && {
        //     width: `calc(100% - ${NAV.W_MINI + 1}px)`,
        //   }),
        // }),
        // marginBottom: 2,
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
