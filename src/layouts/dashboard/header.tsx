import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SvgColor from 'src/components/svg-color';
import IconButton from '@mui/material/IconButton';
import { darken, useTheme } from '@mui/material/styles';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';
import { Box } from '@mui/material';
import Image from 'src/components/image';
import { AuthButtons } from './auth-buttons';
import { LogoText } from './logo-text';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <LogoText {...{ lgUp }} />
      <AuthButtons />

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
