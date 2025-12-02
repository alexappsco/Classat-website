
import { Box, Typography, Stack, Paper, Avatar } from '@mui/material';
import { Icon } from '@iconify/react';

export default function CourseReviews() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2
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
          mb: 5,
          color: "#153A52"
        }}
      >
        اراء الدارسين
      </Typography>

      {/* Reviews list */}
      {[1, 2, 3].map((item, index) => (
        <Box key={index} sx={{ mb: 3, pb: 2, borderBottom: index < 2 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {/* Reviewer avatar */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#54B0D7'
              }}
            >
              م
            </Avatar>
            <Box sx={{ flex: 1 }}>
              {/* Reviewer name */}
                <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: "16px" , lineHeight: "20px", gap:"6px",}}>
                  مصعد أحمد
                </Typography>
                {/* Rating stars */}
                <Stack sx={{mb:1}} direction="row" spacing={0.5} alignItems="center">
                  <Icon icon="mdi:star" width={12} color="#EE7F50" />
                  <Typography variant="body2" sx={{ fontWeight: 700, color:"#7F8490",fontSize:"14px", lineHeight:"100%", fontStyle:"bold" }}>
                    4.8
                  </Typography>
                </Stack>
              {/* Review text */}
              <Typography variant="body2" sx={{ color: '#637381', lineHeight: "20px", fontSize:"16px",fontWeight:"400", fontStyle: "Regular" }}>
                كورس ممتاز ومفيد جداً الشرح واضح والاسئله عملية أنصح به بشدة لكل من بريد تعلم React
              </Typography>
            </Box>
          </Stack>
        </Box>
      ))}
      {/* Add review button */}
      <Box sx={{background: "#919EAB14", borderRadius: "25px",}}>
        <Typography
              variant="body2"
              sx={{
                color: '#153A52',
                fontWeight: 400,
                textAlign: 'center',
                fontSize: "16px",
                mt: 2
              }}
            >
              أصف تقييمك
            </Typography>
      </Box>
    </Paper>
  );
}
