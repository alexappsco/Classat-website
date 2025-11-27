import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Button } from '@mui/material';
import { bgBlur } from 'src/theme/css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/dist/client/components/navigation';

import { LogoText } from './logo-text';
import { HEADER } from '../config-layout';
import { AuthButtons } from './auth-buttons';
import AccountPopover from '../common/account-popover';
// ----------------------------------------------------------------------

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const flag = false;

  const settings = useSettingsContext();
  const [isSignIn, setIsSignIn] = useState(false);

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  // remove last slash mark -> / from url
  const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  // landing paths
  const landingPaths = ['/', '/ar'];
  const isLanding = landingPaths.includes(cleanPath);

  const renderContent = (
    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Button onClick={() => router.push('/ar/')} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <LogoText {...{ lgUp }} />
      </Button>
      {isLanding ? (
        <AuthButtons changeSignIn={setIsSignIn} />
      ) : (
        <Box display="flex" alignItems="center" gap={1.5} pt={0.5}>
          <IconButton onClick={() => router.push('/ar/courses/favorites/')}>
            <FavoriteIcon />
          </IconButton>

          <IconButton onClick={() => router.push('/ar/cart/')}>
            <ShoppingCartIcon fontSize="small" />
          </IconButton>

          <AccountPopover />
        </Box>
      )}

      {/* <Box sx={{ maxWidth: '150px' }}>
      </Box> */}
      {/* <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <LanguagePopover />

        <AccountPopover />
      </Stack> */}
    </Box>
  );

  return (
    <AppBar
      sx={{
        boxSizing: 'border-box',
        backgroundColor: '#FDFDFD',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `100%`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `100%`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          backgroundColor: '#FDFDFD',
          boxShadow: '0 0 20px 0 #9C9B9B33',
          overflow: 'hidden',
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
