// "use client"

// import { useState, useRef } from "react"
// import {
//   Dialog,
//   Box,
//   Typography,
//   IconButton,
//   Stack,
//   Button,
//   Divider,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import AccessTimeIcon from "@mui/icons-material/AccessTime"
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize"

// export default function SessionDialog({ open, onClose }: any) {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const videoRef = useRef<HTMLVideoElement>(null)

//   const placeholderImageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
//   const sampleVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"

//   const handlePlayVideo = () => {
//     if (videoRef.current) {
//       videoRef.current.play()
//       setIsPlaying(true)
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       dir="rtl"
//       PaperProps={{
//         sx: {
//           borderRadius: 4,
//           bgcolor: "#f8f9fa",
//           overflow: "hidden",
//           minHeight: '70vh',
//         },
//       }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         p={2.5}
//         bgcolor="white"
//         sx={{ borderBottom: "1px solid #edf2f7" }}
//       >
//         <Typography variant="h6" fontWeight={700} color="#334155">
//           تفاصيل البث
//         </Typography>
//         <IconButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </Stack>

//       <Box p={3}>
//         <Box
//           sx={{
//             height: 240,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
//           }}
//         >
//           <img
//             src={placeholderImageUrl}
//             alt="Session Cover"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         </Box>

//         <Box
//           mt={2.5}
//           p={3}
//           sx={{
//             background: "white",
//             borderRadius: 3,
//             border: "1px solid #edf2f7",
//             boxShadow: "0px 2px 8px rgba(0,0,0,0.03)",
//           }}
//         >
//           <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//             <Typography variant="h6" fontWeight={800} sx={{ color: "#1e293b", fontSize: "1.25rem" }}>
//               شرح قوانين حل المعادلات
//             </Typography>
//             <Typography variant="body1" color="#64748b" mt={0.5}>
//               ساعتين
//             </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="center" mt={1.5} spacing={1}>
//             <Typography variant="body1" fontWeight={500} color="#64748b">
//               سعر الساعة:
//             </Typography>
//             <Typography variant="h6" fontWeight={700} sx={{ color: "#38bdf8" }}>
//               20 درهم
//             </Typography>
//           </Stack>

//           <Divider sx={{ my: 2.5, borderStyle: "dashed" }} />

//           <Stack direction="row" justifyContent="space-between" color="#64748b">
//             <Stack direction="row" spacing={1} alignItems="center">
//               <DashboardCustomizeIcon sx={{ fontSize: 20, color: "#f59e0b" }} />
//               <Typography variant="subtitle2" fontWeight={600}>الرياضيات</Typography>
//             </Stack>

//             <Stack direction="row" spacing={1} alignItems="center">
//               <CalendarMonthIcon sx={{ fontSize: 20, color: "#f59e0b" }} />
//               <Typography variant="subtitle2" fontWeight={600}>26/10/2025</Typography>
//             </Stack>

//             <Stack direction="row" spacing={1} alignItems="center">
//               <AccessTimeIcon sx={{ fontSize: 20, color: "#f59e0b" }} />
//               <Typography variant="subtitle2" fontWeight={600}>الآن</Typography>
//             </Stack>
//           </Stack>
//         </Box>

//         <Box
//           mt={2.5}
//           sx={{
//             height: 200,
//             borderRadius: 3,
//             overflow: "hidden",
//             position: "relative",
//             border: "2px solid #e2e8f0",
//             bgcolor: "black"
//           }}
//         >
//           <video
//             ref={videoRef}
//             src={sampleVideoUrl}
//             controls={isPlaying}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />

//           {!isPlaying && (
//             <Box
//               onClick={handlePlayVideo}
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 background: "rgba(0,0,0,0.3)",
//                 zIndex: 2
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 90,
//                   height: 90,
//                   borderRadius: "50%",
//                   border: "3px solid rgba(255,255,255,0.9)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "rgba(255,255,255,0.1)",
//                   backdropFilter: "blur(4px)",
//                 }}
//               >
//                 <PlayArrowOutlinedIcon sx={{ fontSize: 65, color: "#fff", ml: -0.5 }} />
//               </Box>
//             </Box>
//           )}
//         </Box>

//         <Button
//           fullWidth
//           variant="contained"
//           disableElevation
//           sx={{
//             mt: 4,
//             py: 1.8,
//             borderRadius: 3,
//             fontSize: "1.15rem",
//             fontWeight: 700,
//             background: "#56a9cd",
//             "&:hover": {
//               background: "#4698bc",
//             },
//             textTransform: "none",
//           }}
//         >
//           بدء البث
//         </Button>
//       </Box>
//     </Dialog>
//   )
// }









// "use client"

// import { useState, useEffect } from "react"
// import {
//   Dialog,
//   Box,
//   Typography,
//   IconButton,
//   Stack,
//   Button,
//   Divider,
//   CircularProgress,
// } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import AccessTimeIcon from "@mui/icons-material/AccessTime"
// import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize"
// import { getData } from "src/utils/crud-fetch-api"
// import { endpoints } from "src/utils/endpoints"

// interface SessionDialogProps {
//   open: boolean;
//   onClose: () => void;
//   enrollmentId: string; // المعرف الذي مررناه من الكرت
// }

// export default function SessionDialog({ open, onClose, enrollmentId }: SessionDialogProps) {
//   const [sessionData, setSessionData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // 1. جلب بيانات الجلسة عند فتح الديالوج
//   useEffect(() => {
//     const fetchSessionDetails = async () => {
//       if (!enrollmentId) return;
//       setLoading(true);
//       try {
//         const res = await getData<any>(endpoints.liveSessionSubjectEnrollments.details(enrollmentId));
//         if (res.success) {
//           setSessionData(res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching session details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (open) {
//       fetchSessionDetails();
//     }
//   }, [open, enrollmentId]);

//   // 2. تنسيق التاريخ والوقت
//   const formatDateTime = () => {
//     if (!sessionData?.date || !sessionData?.time) return { date: "", time: "" };

//     // دمج التاريخ والوقت
//     const dateObj = new Date(`${sessionData.date.split('T')[0]}T${sessionData.time}`);

//     return {
//       date: dateObj.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
//       time: dateObj.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true })
//     };
//   };

//   const { date, time } = formatDateTime();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       dir="rtl"
//       PaperProps={{
//         sx: {
//           borderRadius: 4,
//           bgcolor: "#f8f9fa",
//           overflow: "hidden",
//           minHeight: '400px',
//         },
//       }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         p={2.5}
//         bgcolor="white"
//         sx={{ borderBottom: "1px solid #edf2f7" }}
//       >
//         <Typography variant="h6" fontWeight={700} color="#334155">
//           تفاصيل البث المباشر
//         </Typography>
//         <IconButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </Stack>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
//           <CircularProgress size={40} sx={{ color: "#56a9cd" }} />
//         </Box>
//       ) : sessionData ? (
//         <Box p={3}>
//           {/* صورة الغلاف من الباك أند */}
//           <Box
//             sx={{
//               height: 200,
//               borderRadius: 3,
//               overflow: "hidden",
//               boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
//               mb: 2.5
//             }}
//           >
//             <img
//               src={sessionData.coverImagePath}
//               alt={sessionData.title}
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </Box>

//           <Box
//             p={3}
//             sx={{
//               background: "white",
//               borderRadius: 3,
//               border: "1px solid #edf2f7",
//               boxShadow: "0px 2px 8px rgba(0,0,0,0.03)",
//             }}
//           >
//             <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//               <Typography variant="h6" fontWeight={800} sx={{ color: "#1e293b", fontSize: "1.25rem" }}>
//                 {sessionData.title}
//               </Typography>
//               <Typography variant="body2" color="#64748b" mt={0.5}>
//                 {sessionData.totalHours > 0 && `${sessionData.totalHours} ساعة `}
//                 {sessionData.totalMinutes} دقيقة
//               </Typography>
//             </Stack>

//             <Typography variant="body2" color="primary" fontWeight={600} mt={0.5}>
//               المعلم: {sessionData.teacherName}
//             </Typography>

//             <Divider sx={{ my: 2, borderStyle: "dashed" }} />

//             <Stack direction="row" justifyContent="space-between" color="#64748b">
//               <Stack direction="row" spacing={1} alignItems="center">
//                 <DashboardCustomizeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
//                 <Typography variant="caption" fontWeight={700}>{sessionData.educationSubject}</Typography>
//               </Stack>

//               <Stack direction="row" spacing={1} alignItems="center">
//                 <CalendarMonthIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
//                 <Typography variant="caption" fontWeight={700}>{date}</Typography>
//               </Stack>

//               <Stack direction="row" spacing={1} alignItems="center">
//                 <AccessTimeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
//                 <Typography variant="caption" fontWeight={700}>{time}</Typography>
//               </Stack>
//             </Stack>
//           </Box>

//           {/* زر الانضمام للبث */}
//           <Button
//             fullWidth
//             variant="contained"
//             disableElevation
//             onClick={() => {
//                 // هنا يتم وضع الرابط القادم من الباك أند للجلسة (مثل رابط زووم)
//                 if (sessionData.zoomStartUrl || sessionData.meetingUrl) {
//                     window.open(sessionData.zoomStartUrl || sessionData.meetingUrl, '_blank');
//                 } else {
//                     alert("رابط البث غير متوفر حالياً، يرجى المحاولة قبل موعد الحصة بقليل.");
//                 }
//             }}
//             sx={{
//               mt: 3,
//               py: 1.5,
//               borderRadius: 3,
//               fontSize: "1.1rem",
//               fontWeight: 700,
//               background: "#56a9cd",
//               "&:hover": { background: "#4698bc" },
//               textTransform: "none",
//             }}
//           >
//             انضم إلى الحصة الآن
//           </Button>
//         </Box>
//       ) : (
//         <Box p={5} textAlign="center">
//           <Typography>عذراً، تعذر تحميل بيانات الجلسة.</Typography>
//         </Box>
//       )}
//     </Dialog>
//   )
// }




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

interface SessionDialogProps {
  open: boolean;
  onClose: () => void;
  enrollmentId: string;
  type: 'subject' | 'course';
}

export default function SessionDialog({ open, onClose, enrollmentId, type }: SessionDialogProps) {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!enrollmentId) return;
      setLoading(true);

      const endpoint = type === 'course'
        ? endpoints.liveCourseEnrollments.details(enrollmentId)
        : endpoints.liveSessionSubjectEnrollments.details(enrollmentId);

      try {
        const res = await getData<any>(endpoint);
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
  }, [open, enrollmentId, type]);

  const formatDateTime = () => {
    if (!sessionData?.date || !sessionData?.time) return { date: "", time: "" };
    const dateObj = new Date(`${sessionData.date.split('T')[0]}T${sessionData.time}`);
    return {
      date: dateObj.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
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
        <Typography variant="h6" fontWeight={700} color="#334155">تفاصيل البث المباشر</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon fontSize="small" /></IconButton>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress size={40} sx={{ color: "#56a9cd" }} />
        </Box>
      ) : sessionData ? (
        <Box p={3}>
          <Box sx={{ height: 200, borderRadius: 3, overflow: "hidden", mb: 2.5, boxShadow: "0px 4px 16px rgba(0,0,0,0.08)" }}>
            <img src={sessionData.coverImagePath} alt={sessionData.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>

          <Box p={3} sx={{ background: "white", borderRadius: 3, border: "1px solid #edf2f7" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h6" fontWeight={800} sx={{ color: "#1e293b" }}>{sessionData.title}</Typography>
              <Typography variant="body2" color="#64748b">
                {sessionData.totalHours > 0 && `${sessionData.totalHours} ساعة `} {sessionData.totalMinutes} دقيقة
              </Typography>
            </Stack>
            <Typography variant="body2" color="primary" fontWeight={600} mt={0.5}>المعلم: {sessionData.teacherName}</Typography>
            <Divider sx={{ my: 2, borderStyle: "dashed" }} />
            <Stack direction="row" justifyContent="space-between" color="#64748b">
              <Stack direction="row" spacing={1} alignItems="center">
                <DashboardCustomizeIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                <Typography variant="caption" fontWeight={700}>{sessionData.educationSubject || sessionData.courseCategory}</Typography>
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
              // const url = sessionData.zoomStartUrl || sessionData.meetingUrl || sessionData.joinUrl;
              const url = `/curricula/meeting/${sessionData.videoSessionId}`
              if (url) window.open(url, '_blank');
              else alert("رابط البث غير متوفر حالياً.");
            }}
            sx={{ mt: 3, py: 1.5, borderRadius: 3, fontWeight: 700, background: "#56a9cd", "&:hover": { background: "#4698bc" } }}
          >
            انضم إلى الحصة الآن
          </Button>
        </Box>
      ) : (
        <Box p={5} textAlign="center"><Typography>عذراً، فشل تحميل البيانات. تأكد من الانترنت.</Typography></Box>
      )}
    </Dialog>
  );
}