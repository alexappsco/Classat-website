import { Box, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

export default function CourseInfo() {
  return (
    <Box sx={{ mb: 3}}>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">

        {/* Rating section */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Icon icon="mdi:star" width={18} color="#EE7F50" />
          <Typography variant="body2" sx={{ fontWeight: 400, color: '#7F8490', fontSize: "16px" }}>
            4.8/5 (3K+)
          </Typography>
        </Stack>
         {/* Students count */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Icon icon="mdi:account-group-outline" width={18} color='#637381' />
          <Typography variant="body2" sx={{ fontWeight: 400, color: '#7F8490', fontSize: "16px" }}>
            2.5K طالب
          </Typography>
        </Stack>
        {/* Lessons count */}
        <Stack direction="row" spacing={1} alignItems="center" >
          <Icon icon="mdi:play-circle-outline" width={18} color='#637381' />
          <Typography variant="body2" sx={{ fontWeight: 400, color: '#7F8490', fontSize: "16px" }}>
            45 درس
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Icon icon="mdi:clock-outline" width={18} color='#637381'/>
          <Typography variant="body2" sx={{ fontWeight: 400, color: '#7F8490', fontSize: "16px" }}>24h : 40min    </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
