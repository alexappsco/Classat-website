
"use client";

import { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BookIcon from "@mui/icons-material/MenuBook";
import { endpoints } from "src/utils/endpoints";
import { postData } from "src/utils/crud-fetch-api";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

interface Props {
  img: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  status: string;

  bookingType: "TeacherPrivateSession"; // 👈 حالياً ثابت
  enrollmentId: string; // 👈 هنا هنحط sessionId
}

export default function LessonCard({
  img,
  name,
  subject,
  date,
  time,
  bookingType,
  enrollmentId,
  status
}: Props) {
  const [openCancel, setOpenCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
    const t = useTranslations('next_lessons');
  


  const handleCancel = async () => {
    if (!enrollmentId) {
      alert(t('error_with_id'));
      return;
    }

    // API expects query params (Swagger): BookingType + StudentEducationApproachSessionEnrollmentId
    const qs = new URLSearchParams({
      BookingType: bookingType,
      StudentEducationApproachSessionEnrollmentId: enrollmentId,
    }).toString();
    const endpoint = `${endpoints.cancelorder}?${qs}`;


    setLoading(true);

    try {
      const res = await postData(endpoint, undefined as unknown as Record<string, never>);


      if (res.success) {
        // alert("تم إلغاء الحجز بنجاح");
        enqueueSnackbar(t('lesson_canceled_successfully'), { variant: "success" });

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
      <Card sx={{ m: 1, p: 2, borderRadius: 2, height: "95%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={img} sx={{ width: 32, height: 32 }} />
          <Typography fontWeight={600}>{name}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <BookIcon fontSize="small" />
          <Typography fontSize={12}>{subject}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EventIcon fontSize="small" />
            <Typography fontSize={12}>{date}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography fontSize={12}>{time}</Typography>
          </Box>
        </Box>
        {status === "Scheduled" && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenCancel(true)}
            sx={{ mt: 2 }}
          >
            {t('cancel_lesson')}
          </Button>
        )}
        {status === "Cancelled" && (
          <Typography fontSize={12} sx={{ color: "error.main", p: 1, borderRadius: 1, width: "fit-content",mt:1 }}>{t('lesson_canceled')}</Typography>
        )}
        {status === "Completed" && (
          <Typography fontSize={12} sx={{ color: "success.main", p: 1, borderRadius: 1, width: "fit-content",mt:1 }}>{t('lesson_completed')}</Typography>
        )}

      </Card>

      <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
        <DialogTitle>{t('confirm_cancel')}</DialogTitle>

        <DialogContent>
          <Typography>
            {t('are_you_sure')}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCancel(false)}>{t('back')}</Button>

          <Button
            onClick={handleCancel}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? t('canceling') : t('confirm_cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}