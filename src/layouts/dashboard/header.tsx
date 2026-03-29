import Link from 'next/link';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

import { bgBlur } from 'src/theme/css';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import { useAuthStore } from 'src/auth/auth-store';

import { LogoText } from './logo-text';
import { HEADER } from '../config-layout';
import { AuthButtons } from './auth-buttons';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const pathname = usePathname();
  const settings = useSettingsContext();

  // 1. Get the authenticated state directly from your Auth Context
  const { authenticated, loading } = useAuthStore();

  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);
  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';
  const offsetTop = offset && !isNavHorizontal;

  // Clean path logic
  const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const landingPaths = ['/', '/ar', '/en'];
  const isLanding = landingPaths.includes(cleanPath);
  const renderContent = (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Link href="/ar/curricula" style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', cursor: 'pointer' }}>
          <LogoText {...{ lgUp }} />
        </Box>
      </Link>

      {/* 2. Logic Check: Use 'authenticated' instead of interval/localStorage checks */}
      {authenticated ? (
        <Box display="flex" alignItems="center" gap={1.5} pt={0.5}>
          <Link href="/ar/courses/favorites/">
            <IconButton>
              <FavoriteIcon
                sx={{ color: cleanPath === '/ar/courses/favorites' ? 'red' : 'inherit' }}
              />
            </IconButton>
          </Link>

          <Link href="/ar/cart/">
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
          </Link>

          <AccountPopover />
        </Box>
      ) : (
        // Show AuthButtons if not authenticated or on landing
        <AuthButtons />
      )}
    </Box>
  );

  // Optional: Return null or a skeleton if auth is still 'loading' to prevent layout shift
  if (loading) return null;

  return (
    <AppBar
      sx={{
        boxSizing: 'border-box',
        backgroundColor: '#FDFDFD',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({ color: theme.palette.background.default }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: '100%',
          height: HEADER.H_DESKTOP,
          ...(offsetTop && { height: HEADER.H_DESKTOP_OFFSET }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && { width: '100%' }),
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