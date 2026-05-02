"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize"
import { getData } from "src/utils/crud-fetch-api"
import { endpoints } from "src/utils/endpoints"
import { useTranslations } from "next-intl"

interface LessonDialogProps {
  open: boolean;
  onClose: () => void;
  educationSessionId: string;
}

export default function LessonDialog({ open, onClose, educationSessionId }: LessonDialogProps) {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('next_lessons');

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!educationSessionId) return;
      setLoading(true);

      try {
        const res = await getData<any>(endpoints.studentEducationSession.details(educationSessionId));
        if (res.success) {
          setSessionData(res.data);
        } else {
          setSessionData(null);
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
        setSessionData(null);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchSessionDetails();
    }
  }, [open, educationSessionId]);

  const formatDateTime = () => {
    if (!sessionData?.sessionDate || !sessionData?.startTime) return { date: "", time: "" };
    const dateObj = new Date(sessionData.sessionDate);

    // We can use a simpler formatting or match the card style
    return {
      date: dateObj.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: sessionData.startTime // You might want to format this if it's 24h
    };
  };

  const { date, time } = formatDateTime();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      dir="rtl"
      PaperProps={{ sx: { borderRadius: 4, bgcolor: "#f8f9fa", minHeight: '400px' } }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={2.5} bgcolor="white" sx={{ borderBottom: "1px solid #edf2f7" }}>
        <Typography variant="h6" fontWeight={700} color="#334155">{t('details_title') || "تفاصيل الحصة"}</Typography>
        {/* <Typography variant="h6" fontWeight={700} color="#334155">{sessionData.educationSubjectName}</Typography> */}
        <IconButton onClick={onClose} size="small"><CloseIcon fontSize="small" /></IconButton>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress size={40} sx={{ color: "#56a9cd" }} />
        </Box>
      ) : sessionData ? (
        <Box p={3}>
          {/* Cover Image */}
          {(sessionData.teacherLogo || sessionData.coverImagePath) && (
            <Box sx={{ height: 200, borderRadius: 3, overflow: "hidden", mb: 2.5, boxShadow: "0px 4px 16px rgba(0,0,0,0.08)" }}>
              <img
                src={sessionData.teacherLogo || sessionData.coverImagePath}
                alt={sessionData.teacherName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}

          <Box p={3} sx={{ background: "white", borderRadius: 3, border: "1px solid #edf2f7" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h6" fontWeight={800} sx={{ color: "#1e293b" }}>{sessionData.subjectName || sessionData.title}</Typography>
              {sessionData.endTime && (
                <Typography variant="body2" color="#64748b">
                  {sessionData.startTime} - {sessionData.endTime}
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" color="primary" fontWeight={600} mt={0.5}>المعلم: {sessionData.teacherName}</Typography>
            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
            <Stack direction="row" justifyContent="space-between" color="#64748b">
              <Stack direction="row" spacing={1} alignItems="center">
                <DashboardCustomizeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                <Typography variant="caption" fontWeight={700}>{sessionData.educationSubjectName}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                <Typography variant="caption" fontWeight={700}>{date}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                <Typography variant="caption" fontWeight={700}>{time}</Typography>
              </Stack>
            </Stack>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              const url = `/curricula/meeting/${sessionData.videoSessionId}`
              if (sessionData.videoSessionId) window.open(url, '_blank');
              else alert("رابط الحصة غير متوفر حالياً.");
            }}
            sx={{ mt: 3, py: 1.5, borderRadius: 3, fontWeight: 700, background: "#56a9cd", "&:hover": { background: "#4698bc" } }}
          >
            {t('join_now') || "انضم الآن"}
          </Button>
        </Box>
      ) : (
        <Box p={5} textAlign="center"><Typography>عذراً، فشل تحميل البيانات. تأكد من الانترنت.</Typography></Box>
      )}
    </Dialog>
  );
}
