

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
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { useState } from 'react';
import { ILiveSubject } from 'src/types/liveSubject';
import SessionDialog from 'src/sections/curricula/live-sessions/SessionDialog';
import { endpoints } from 'src/utils/endpoints';
import { postData } from 'src/utils/crud-fetch-api';


interface LiveSessionCardProps {
  lessonList: ILiveSubject[];
  bookingType?: "LiveSessionSubject"; // 👈 حالياً ثابت
  enrollmentId?: string; // 👈 هنا هنحط sessionId
}

// Define the props type for the PaymentModal component

interface LiveSessionCardPropsItem {
  liveCourse: ILiveSubject;
  bookingType: "LiveSessionSubject"; // 👈 حالياً ثابت
  enrollmentId: string; // 👈 هنا هنحط sessionId

}

export default function LiveSessionCard({ lessonList }: LiveSessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();



  if (!lessonList || lessonList.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          لا توجد دروس متاحة
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          {lessonList.map((lesson) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={lesson.id}>
              <LiveSessionCards
                liveCourse={lesson}
                bookingType="LiveSessionSubject"
                enrollmentId={lesson.id || ''}
              // onAddToCart={onAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}






function LiveSessionCards({ liveCourse, bookingType, enrollmentId }: LiveSessionCardPropsItem) {
  const t = useTranslations();

  const theme = useTheme();
  const redColor = '#B30505';
  const padgBg = '#FFE5E5';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  const [course, setCourse] = useState(liveCourse);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);

  const parseStart = () => {
    if (!course.date || !course.time) return null;

    const dateOnly = course.date.split('T')[0];

    return new Date(`${dateOnly}T${liveCourse.time}Z`);
  };
  const startsAt = parseStart();

  const localDate = startsAt?.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const localTime = startsAt?.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // لو عايز AM/PM
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);



  const handleBuyNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePurchaseSuccess = () => {
    setCourse((prev) => ({ ...prev, isEnrolled: true }));
  };

  //-----------------------------------------------------

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
      StudentLiveSessionSubjectEnrollmentId: enrollmentId,
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
  //-----------------------------------------------------
  return (
    <>

      <Card
        sx={{
          borderRadius: 2,
          boxShadow: shadow.main,
          height: '550px',
          // Ensure card content stacks correctly
          display: 'flex',
          flexDirection: 'column',
          p: '20px 16px 16px',

          // width: 'fit-content',
        }}
      >
        {/* 1. Image and Live Tag Area */}
        <Box
          sx={{
            position: 'relative',
            // pt: '56.25%', // 16:9 Aspect Ratio
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <CardMedia
            component="img"
            image={liveCourse.coverImagePath}
            alt={liveCourse.title}
            sx={{ height: 270, width: '100%', objectFit: 'fill' }}
          />

          {/* Live Tag (Chip) - Positioned Absolutely */}
          {liveCourse.status && (
            <Chip
              // label="مباشر"
              label={liveCourse.status}

              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: padgBg, // Red for 'Live'
                color: redColor,
                fontWeight: 700,
                fontSize: theme.typography.pxToRem(12),
              }}
            />
          )}
        </Box>

        {/* 2. Content Area */}
        <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
          {/* Category Tag */}
          <Typography
            variant="caption"
            sx={{
              backgroundColor: orangeBg,
              color: orangeColor, // Orange color for the tag
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '30px',
              padding: '14px',
              width: 'fit-content',
            }}
          >
            {course.educationSubject}
          </Typography>

          {/* Session Title */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
          >
            {course.title}
          </Typography>

          {/* Instructor Name and Avatar (Simple text for now) */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>

              <Typography
                variant="body2"
                sx={{ color: text.primary }}
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
              >
                {/* <Image src={course.teacherImagePath} sx={{ width: 38, height: 38, borderRadius: '50%' }} /> */}
                {course.teacherName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>

                <span style={{ color: '#666' }}>  {t('Label.time_period')} :</span>  {course.totalHours} {t('Label.hours')}  {course.totalMinutes} {t('Label.munite')}

              </Typography>

            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />


          {/* Metadata (Time and Attendees) */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666', display: 'flex' }}>
                <img
                  src={'/assets/icons/app/calendar-event.svg'}
                  style={{ height: '18px', marginLeft: '5px' }}
                  alt=""
                />
                {localDate}
              </Typography>

            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>
                <img
                  src={'/assets/icons/app/clock.svg'}
                  style={{ height: '18px', marginLeft: '5px' }}
                  alt=""
                />
                {localTime}
              </Typography>

            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontSize: '14px', color: '#666' }}>
                {course.price} <span style={{ color: '#666' }}> AED</span>


              </Typography>

            </Stack>
          </Stack>
        </Stack>
          
        {/* 3. Join Button */}
                {course.status === "Active" ? (

        <Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center' }}>
          {/* <Link href="/ar/courses/instructor/" > */}
            <Button
              variant="contained"
              size="medium"
              onClick={() => setIsSessionDialogOpen(true)}
              sx={{
                backgroundColor: primary.main,
                color: 'white',
                width: '65%',
                m: 'auto',
              }}
            >
              انضم الآن
            </Button>

          {/* </Link> */}
          <Button
            variant="outlined"
            color="error"
              size="medium"
            onClick={() => setOpenCancel(true)}
            sx={{}}
          >
            إلغاء الحجز
          </Button>
        </Box>
                ):(<></>)}
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
      ``
      <SessionDialog
        open={isSessionDialogOpen}
        onClose={() => setIsSessionDialogOpen(false)}
        enrollmentId={enrollmentId || ""}
        type="subject"
      />
    </>
  );
}
