'use client';
import { Stack, Paper, Typography, Switch, Divider, Chip, IconButton, Box } from '@mui/material';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

export default function SettingsSection() {
  return (
    <Box
      sx={{
        width: '100%',
        p: { xs: 2, md: 4 },
        boxSizing: 'border-box',
        direction: 'rtl',
        mt: 10,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: "25px",
          p: { xs: 2.5, md: 3 },
          border: '1px solid #e5e7eb',
          direction: 'rtl',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 3,
          }}
        >
          <Typography sx={{color:"rgba(51, 51, 51, 1)",fontStyle: "bold", fontSize: "32px", lineHeight:"22px"}} variant="h5" fontWeight={700}>
            الأعدادات
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Switch defaultChecked sx={{ transform: 'scale(1.1)' }} />
          <Stack direction="row"  alignItems="center">
            <Typography fontFamily={'IBM Plex Sans Arabic'} fontSize={16} fontWeight={400} color={'rgba(51, 51, 51, 1)'} >
              الاشعارات
            </Typography>
            <IconButton sx={{ color: 'rgba(84, 176, 215, 1)' }}>
              <NotificationsNoneRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <Chip
              label="EN"
              variant="outlined"
              sx={{
                height: 32,
                fontSize: 12,
                color: 'rgba(68, 97, 117, 1)',
                borderRadius:"16px",
                gap:"8px",
                cursor:"pointer"
              }}
            />
             <Chip
              label="العربيه"
              variant="outlined"
              sx={{
                height: 32,
                fontSize: 12,
                borderColor: 'rgba(84, 176, 215, 1)',
                background:"rgba(238, 247, 251, 1)",
                color: 'rgba(68, 97, 117, 1)',
                borderRadius:"16px",
                gap:"8px",
                cursor:"pointer"
              }}
            />
          </Stack>
          <Stack direction="row"  alignItems="center">
            <Typography fontFamily={'IBM Plex Sans Arabic'} fontSize={16} fontWeight={400} color={'rgba(51, 51, 51, 1)'} >
              اللغة
            </Typography>
            <IconButton sx={{ color: 'rgba(84, 176, 215, 1)' }}>
              <LanguageRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
