import Link from 'next/link';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { text, shadow, primary, warning } from 'src/theme/palette';

import { useTranslations } from 'next-intl';

// Define the props type for the main component
import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  Radio,
  Button,
  Dialog,
  Divider,
  Container,
  Typography,
  Chip,
  CardMedia,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { useState } from 'react';
import { ILiveSubject } from 'src/types/liveSubject';
import { LinearProgress, Avatar } from '@mui/material';
import { AccessTime, FlashOn } from '@mui/icons-material';
import { format } from 'path';
import { IPackageSubscription } from 'src/types/package';
import { postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

interface LiveSessionCardProps {
  lessonList: IPackageSubscription[];
  bookingType?: "TeacherPackage"; // 👈 حالياً ثابت
  enrollmentId?: string; // 👈 هنا هنحط sessionId
}

// Define the props type for the PaymentModal component

interface LiveSessionCardPropsItem {
  pkg: IPackageSubscription;
  bookingType: "TeacherPackage"; // 👈 حالياً ثابت
  enrollmentId: string; // 👈 هنا هنحط sessionId
}

export default function PackageCard({ lessonList }: LiveSessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations('Label');

  if (!lessonList || lessonList.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          {t('no_packages_available')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          {lessonList.map((lesson) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={lesson.subscriptionId}>
              <LiveSessionCards
                pkg={lesson}
                bookingType="TeacherPackage"
                enrollmentId={lesson.subscriptionId}

              // onAddToCart={onAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function LiveSessionCards({ pkg, bookingType, enrollmentId }: LiveSessionCardPropsItem) {
  const t = useTranslations();
  const theme = useTheme();

  // حساب نسبة الاستهلاك لشريط التقدم
  const usedHours = pkg.totalHours - pkg.remainingHours;
  const progressValue = (usedHours / pkg.totalHours) * 100;
  const [openCancel, setOpenCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleCancel = async () => {
    if (!enrollmentId) {
      alert("في مشكلة في ID");
      return;
    }

    // API expects query params (Swagger): BookingType + StudentEducationApproachSessionEnrollmentId
    const qs = new URLSearchParams({
      BookingType: bookingType,
      StudentPackageSubscriptionId: enrollmentId,
    }).toString();
    const endpoint = `${endpoints.cancelorder}?${qs}`;


    setLoading(true);

    try {
      const res = await postData(endpoint, undefined as unknown as Record<string, never>);


      if (res.success) {
        // alert("تم إلغاء الحجز بنجاح");
        enqueueSnackbar("تم إلغاء الحجز بنجاح", { variant: "success" });

        setOpenCancel(false);
      } else {
        enqueueSnackbar(res.error || "حدث خطأ", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("خطأ غير متوقع", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          bgcolor: 'background.paper',
          position: 'relative',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* الرأس: اسم الباقة والأيقونة */}
        <Stack justifyContent="space-between" alignItems="start" mb={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: '#E3F2FD', width: 40, height: 40 }}>
              <FlashOn sx={{ color: '#3CA7D5' }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700} color="#1A2027">
              {pkg.packageName}
            </Typography>
          </Stack>
        </Stack>

        {/* البيانات: عدد الساعات */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary" fontWeight={500}>
              عدد الساعات:
            </Typography>
            <Typography fontWeight={700} sx={{ color: '#E67E22' }}>
              {pkg.totalHours} ساعة
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary" fontWeight={500}>
              نسبة الخصم
            </Typography>
            <Typography fontWeight={700} sx={{ color: '#E67E22' }}>
              {pkg.discountPercentage}%
            </Typography>
          </Stack>

          {/* إضافة وقت البداية والنهاية */}
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary" variant="body2">
              الصلاحية:
            </Typography>
            <Typography variant="caption" fontWeight={600} sx={{ color: '#E67E22' }}>
              من {new Date(pkg.startDate).toLocaleDateString('en-GB')} إلى{' '}
              {new Date(pkg.endDate).toLocaleDateString('en-GB')}
            </Typography>
          </Stack>
        </Stack>

        {/* شريط التقدم والمعلومات السفلية */}
        <Box sx={{ mt: 'auto' }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} mb={1}>
            <AccessTime sx={{ fontSize: 18, color: '#E67E22' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {usedHours} ساعة من {pkg.totalHours} ساعة ({Math.round(progressValue)}%)
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: '#EEEEEE',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#3CA7D5',
                borderRadius: 5,
              },
            }}
          />
        </Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenCancel(true)}
                  sx={{ mt: 2 }}
                >
                  إلغاء الحجز
                </Button>
      </Card>
      <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
        <DialogTitle>تأكيد الإلغاء</DialogTitle>

        <DialogContent>
          <Typography>
            هل أنت متأكد من أنك تريد إلغاء هذا الحجز؟
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCancel(false)}>رجوع</Button>

          <Button
            onClick={handleCancel}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
