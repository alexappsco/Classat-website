import { Box, Typography, Stack, Paper, Divider, Avatar } from '@mui/material';
import { Icon } from '@iconify/react';

export default function CourseInstructor() {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: "16px",
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: "25px",
        marginTop: 4
      }}
    >
      {/* Section title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontStyle: "bold",
          fontSize: "24px",
          lineHeight: "21px",
          mb: 3,
          color: "#153A52"
        }}
      >
        عن المحاضر
      </Typography>
      <Box sx={{ mb: 2, borderRadius: "100px" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 1.5 }}>
          {/* Instructor avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#54B0D7'
            }}
          >
            ع
          </Avatar>
          <Box sx={{ flex: 1 }}>
            {/* Instructor name only */}
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px", fontStyle: "bold", mb: 1 }}>
              أ. خالد محمد
            </Typography>

            {/* Rating under the name */}
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
              <Icon icon="mdi:star" width={12} color="#EE7F50" />
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#7F8490", fontSize: "14px", fontStyle:"bold"}}>
                4.8
              </Typography>
            </Stack>

            {/* Instructor bio */}
            <Typography variant="body2" sx={{ color: '#637381', mb: 2, fontSize: "14px", fontWeight: "400" }}>
              مطور ويب خبير مع أكثر من 8 سنوات من الخبرة في تطوير التطبيقات الحديثة
            </Typography>

            {/* Instructor stats */}
            <Stack direction="row" spacing={3} alignItems="center">
              {/* Students count */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="mdi:account-group" color="#7F8490" />
                <Typography variant="body2" sx={{ color: '#7F8490', fontWeight:"400", fontSize: "16px", lineHeight: "26px" }}>
                  1500 طالب
                </Typography>
              </Stack>
              {/* Courses count */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="mdi:book-open" width={18} color="#7F8490" />
                <Typography variant="body2" sx={{ color: '#7F8490', fontWeight:"400", fontSize: "16px", lineHeight: "26px" }}>
                  دورة 12
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Paper>
  );
}
