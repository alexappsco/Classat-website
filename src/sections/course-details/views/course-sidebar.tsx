import { Box, Typography, Stack, Chip, List, ListItem, Paper, Button } from '@mui/material';
import { Icon } from '@iconify/react';

export default function CourseSidebar() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: "25px",
      }}
    >
      {/* Pricing section */}
      <Box sx={{ mb: 3 }}>
        <Stack sx={{float: "right"}}>
          {/* Price display */}
          <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 1, }}>
            <Typography variant="body1" sx={{ fontWeight: "400",lineHeight:"24px", fontSize: "16px",color: '#7F8490', textDecoration: 'line-through' }}>
            300.13
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '24px', color: "#000000", lineHeight: "31px" }}>
200.43 درهم          </Typography>

        </Stack>
        {/* Discount chip */}
        <Stack   direction="row" spacing={1} alignItems="center">
          <Chip
            label="20% OFF"
            sx={{
              backgroundColor: '#FFAB00',
              color: 'white',
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "21px",
              height: '29px',
              width: "201px",
              borderRadius:"15px",
              padding:"4px",
              gap: "10px",
              mb:2,
              paddingLeft: "100px"
            }}
          />
        </Stack>
        </Stack>
        {/* Purchase button */}
        <Button
          variant="contained"
          sx={{
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "22px",
            height: '50px',
            borderRadius: '25px',
            padding: '16px 24px',
            gap: '4px',
            backgroundColor: '#54B0D7',
            '&:hover': {
              backgroundColor: '#3A8FB8',
            },
            // التعديل النهائي
            width: { xs: '100%', md: '410px' },
            maxWidth: '410px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: { xs: 'auto', md: '0' },
          }}
        >
          شراء الكورس
        </Button>
      </Box>

      {/* Learning objectives section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, fontSize: '20PX', color: "#111827", fontStyle:"bold" }}>
          ما الذي ستنعلمه في هذه الدورة؟
        </Typography>

        <List sx={{ py: 0 }}>
          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Icon icon="mdi:check" width={18} color="#54B0D7" style={{ marginTop: 3 }} />
              <Typography  variant="body2" color='#070A10'>أهم أساسيات البرمجة وكيف تعمل لغات البرمجة</Typography>
            </Stack>
          </ListItem>

          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Icon icon="mdi:check" width={18} color="#54B0D7" style={{ marginTop: 3 }} />
              <Typography variant="body2" color='#070A10'>كتابة أول برنامج بلغة Python</Typography>
            </Stack>
          </ListItem>

          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Icon icon="mdi:check" width={18} color="#54B0D7" style={{ marginTop: 3 }} />
              <Typography variant="body2" color='#070A10'>استخدام الشروط والدلقات للتعامل مع البيانات</Typography>
            </Stack>
          </ListItem>

          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Icon icon="mdi:check" width={18} color="#54B0D7" style={{ marginTop: 3 }} />
              <Typography variant="body2" color='#070A10'>إنشاء دوال وتنظيم الكود بشكل احترافي</Typography>
            </Stack>
          </ListItem>

          <ListItem sx={{ px: 0, py: 0.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Icon icon="mdi:check" width={"18"} color="#54B0D7" style={{ marginTop: 3 }} />
              <Typography variant="body2" color='#070A10'>تطبيق عمل، بناءً أنّه حاسبة بسيطة باستخدام Python</Typography>
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
}
