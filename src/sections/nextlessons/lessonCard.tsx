
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


  const handleCancel = async () => {
    if (!enrollmentId) {
      alert("في مشكلة في ID");
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
      <Card sx={{ m: 1, p: 2, borderRadius: 2 }}>
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
            إلغاء الحجز
          </Button>
        )}
        {status === "Scheduled" ? (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenCancel(true)}
            sx={{ mt: 2 }}
          >
            إلغاء الحجز
          </Button>
        ) : null}
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