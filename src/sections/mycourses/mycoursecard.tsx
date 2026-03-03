'use client';

import { useRouter } from 'next/navigation';
import { Box, Card, Stack, Divider, Typography, Avatar, LinearProgress, Button, alpha } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { shadow } from 'src/theme/palette';

interface Props {
  image: string;
  title: string;
  instructor: string;
  status: string;
  // barStatus: number;
  isEnrolled: boolean;
  link: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
}
export default function MyCoursesCard({
  image,
  title,
  instructor,
  // barStatus,
  isEnrolled,
  link,
  onAddToCart,
  onBuyNow,
}:Props) {
  const router = useRouter();
  // const safeProgress = Math.min(Math.max(barStatus || 0, 0), 100);

  return (
    <Card
      sx={{
        p: 1.5,
        height: '100%',
        borderRadius: 2.5,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        // boxShadow: shadow.card,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 12px 24px -4px ${alpha(theme.palette.common.black, 0.1)}`,
        },
      }}
    >
      {/* الصورة */}
      <Box sx={{ position: 'relative', pt: '60%', overflow: 'hidden', borderRadius: 2 }}>
        <Box
          component="img"
          src={image || '/assets/placeholder/course.jpg'}
          alt={title}
          sx={{ top: 0, width: 1, height: 1, position: 'absolute', objectFit: 'cover' }}
        />
      </Box>

      <Stack spacing={2} sx={{ pt: 2, flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, height: 44, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>{instructor?.charAt(0)}</Avatar>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{instructor}</Typography>
        </Stack>

        {/* شريط التقدم يظهر فقط إذا كان مشتركاً */}
        {/* {isEnrolled && (
          <Stack spacing={0.5}>
            <LinearProgress variant="determinate" value={safeProgress} sx={{ height: 4, borderRadius: 5, bgcolor: alpha('#22C55E', 0.1), '& .MuiLinearProgress-bar': { bgcolor: '#22C55E' } }} />
            <Typography variant="caption" sx={{ textAlign: 'end', color: 'text.disabled' }}>{safeProgress}%</Typography>
          </Stack>
        )} */}

        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* قسم الأزرار المشروط */}
        <Box sx={{ mt: 1 }}>
          {isEnrolled ? (
            // حالة المشترك: زر استئناف
            <Button
              fullWidth
              variant="contained"
              color="success"
              startIcon={<PlayArrowIcon />}
              onClick={() => link && router.push(link)}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            >
              استئناف التعلم
            </Button>
          ) : (
            // حالة غير مشترك: شراء وإضافة للسلة
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onBuyNow}
                sx={{ borderRadius: 1.5, fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                شراء الآن
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={onAddToCart}
                sx={{ borderRadius: 1.5, minWidth: 48, px: 0 }}
              >
                <ShoppingCartIcon fontSize="small" />
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
}