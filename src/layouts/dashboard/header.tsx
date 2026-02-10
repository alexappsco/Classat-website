// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { Box } from '@mui/material';
// import { bgBlur } from 'src/theme/css';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { usePathname } from 'next/navigation';
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useOffSetTop } from 'src/hooks/use-off-set-top';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { useSettingsContext } from 'src/components/settings';
// import { useRouter } from 'next/dist/client/components/navigation';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

// import { useAuthContext } from 'src/auth/hooks';
// import { ACCESS_TOKEN } from 'src/auth/constants';

// import { LogoText } from './logo-text';
// import { HEADER } from '../config-layout';
// import { AuthButtons } from './auth-buttons';
// import AccountPopover from '../common/account-popover';
// import Cookies from 'js-cookie';

// // ----------------------------------------------------------------------

// export default function Header() {
//   const router = useRouter();
//   const theme = useTheme();
//   const pathname = usePathname();
//   const flag = false;

//   const settings = useSettingsContext();
//   const [isSignIn, setIsSignIn] = useState(false);
//   const [hasAccessToken, setHasAccessToken] = useState(false);

//   const { authenticated } = useAuthContext();

//   useEffect(() => {
//     // Check for access token in localStorage
//     const checkAccessToken = () => {
//       // if (typeof window !== 'undefined') {
//       //   const token = localStorage.getItem(ACCESS_TOKEN)||Cookies.get(ACCESS_TOKEN);
//       //   setHasAccessToken(!!token);
//       // }
//            if (typeof window !== 'undefined') {
//          const token = localStorage.getItem(ACCESS_TOKEN)||Cookies.get(ACCESS_TOKEN);
//         setHasAccessToken(!!token);
//      }

//     };

//     checkAccessToken();

//     // Listen for storage changes (in case token is added/removed in other tabs)
//     const handleStorageChange = () => {
//       checkAccessToken();
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // Also check periodically in case localStorage is changed programmatically
//     const interval = setInterval(checkAccessToken, 500);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, [authenticated]); // Re-check when authenticated state changes

//   const isNavHorizontal = settings.themeLayout === 'horizontal';

//   const isNavMini = settings.themeLayout === 'mini';

//   const lgUp = useResponsive('up', 'lg');
//   const offset = useOffSetTop(HEADER.H_DESKTOP);

//   const offsetTop = offset && !isNavHorizontal;

//   // remove last slash mark -> / from url
//   const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

//   // landing paths
//   const landingPaths = ['/', '/ar', '/en'];
//   const isLanding = landingPaths.includes(cleanPath);

//   const renderContent = (
//     <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
//       <Link href="/ar/curricula" style={{ textDecoration: 'none' }}>
//         <Box sx={{ display: 'flex', cursor: 'pointer' }}>
//           <LogoText {...{ lgUp }} />
//         </Box>
//       </Link>
//       {!authenticated ? (
//         <AuthButtons changeSignIn={setIsSignIn} />
//       ) : hasAccessToken ? (
//         <Box display="flex" alignItems="center" gap={1.5} pt={0.5}>
//           <Link href="/ar/courses/favorites/">
//             <IconButton>
//               <FavoriteIcon sx={{ color: cleanPath === '/ar/courses/favorites' ? 'red' : 'inherit' }} />
//             </IconButton>
//           </Link>

//           <Link href="/ar/cart/">
//             <IconButton>
//               <ShoppingCartIcon fontSize="small" />
//             </IconButton>
//           </Link>

//           <AccountPopover />
//         </Box>
//       ) : (
//         <AuthButtons changeSignIn={setIsSignIn} />
//       )}
//     </Box>
//   );

//   return (
//     <AppBar
//       sx={{
//         boxSizing: 'border-box',
//         backgroundColor: '#FDFDFD',
//         height: HEADER.H_MOBILE,
//         zIndex: theme.zIndex.appBar + 1,
//         ...bgBlur({
//           color: theme.palette.background.default,
//         }),
//         transition: theme.transitions.create(['height'], {
//           duration: theme.transitions.duration.shorter,
//         }),
//         ...(lgUp && {
//           width: `100%`,
//           height: HEADER.H_DESKTOP,
//           ...(offsetTop && {
//             height: HEADER.H_DESKTOP_OFFSET,
//           }),
//           ...(isNavHorizontal && {
//             width: 1,
//             bgcolor: 'background.default',
//             height: HEADER.H_DESKTOP_OFFSET,
//             borderBottom: `dashed 1px ${theme.palette.divider}`,
//           }),
//           ...(isNavMini && {
//             width: `100%`,
//           }),
//         }),
//       }}
//     >
//       <Toolbar
//         sx={{
//           height: 1,
//           px: { lg: 5 },
//           backgroundColor: '#FDFDFD',
//           boxShadow: '0 0 20px 0 #9C9B9B33',
//           overflow: 'hidden',
//         }}
//       >
//         {renderContent}
//       </Toolbar>
//     </AppBar>
//   );
// }
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { bgBlur } from 'src/theme/css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/dist/client/components/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useAuthContext } from 'src/auth/hooks';
import { ACCESS_TOKEN } from 'src/auth/constants';

import { LogoText } from './logo-text';
import { HEADER } from '../config-layout';
import { AuthButtons } from './auth-buttons';
import AccountPopover from '../common/account-popover';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const flag = false;

  const settings = useSettingsContext();
  const [isSignIn, setIsSignIn] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const { authenticated, user } = useAuthContext();

  useEffect(() => {
    // Check for access token in localStorage
    const checkAccessToken = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(ACCESS_TOKEN)||Cookies.get(ACCESS_TOKEN);
        setHasAccessToken(!!token);
      }
    };

    checkAccessToken();

    // Listen for storage changes (in case token is added/removed in other tabs)
    const handleStorageChange = () => {
      checkAccessToken();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage is changed programmatically
    const interval = setInterval(checkAccessToken, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [authenticated]); // Re-check when authenticated state changes

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  // remove last slash mark -> / from url
  const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  // landing paths
  const landingPaths = ['/', '/ar', '/en'];
  const isLanding = landingPaths.includes(cleanPath);

  const renderContent = (
    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Link href="/ar/curricula" style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', cursor: 'pointer' }}>
          <LogoText {...{ lgUp }} />
        </Box>
      </Link>
      {isLanding ? (
        <AuthButtons changeSignIn={setIsSignIn} />
      ) : hasAccessToken ? (
        <Box display="flex" alignItems="center" gap={1.5} pt={0.5}>
          <Link href="/ar/courses/favorites/">
            <IconButton>
              <FavoriteIcon sx={{ color: cleanPath === '/ar/courses/favorites' ? 'red' : 'inherit' }} />
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
        <AuthButtons changeSignIn={setIsSignIn} />
      )}
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