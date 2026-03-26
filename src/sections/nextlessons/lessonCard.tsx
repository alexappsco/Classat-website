
// // import { Card, Box, Typography, Avatar } from "@mui/material";
// // import AccessTimeIcon from "@mui/icons-material/AccessTime";
// // import EventIcon from "@mui/icons-material/Event";
// // import BookIcon from "@mui/icons-material/MenuBook";

// // interface Props {
// //   img: string;
// //   name: string;
// //   subject: string;
// //   date: string;
// //   time: string;
// //   price?: string;
// //   href?: string;
// // }

// // export default function LessonCard({
// //   img,
// //   name,
// //   subject,
// //   date,
// //   time,
// //   href,
// // }: Props) {
// //   return (
// //     <Card
// //       sx={{
// //         m: 1,
// //         p: 2,
// //         minHeight: 110,
// //         borderRadius: 2,
// //         boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
// //         cursor: href ? "pointer" : "default",
// //         transition: "0.2s",
// //         "&:hover": {
// //           boxShadow: "0px 4px 12px rgba(0,0,0,0.16)",
// //         },
// //         alignItems: "flex-start",
// //         gap: 1.5,
// //       }}
// //     >
// //       {/* Avatar + Name */}
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         <Avatar src={img} sx={{ width: 32, height: 32 }} />

// //         <Typography
// //           variant="subtitle1"
// //           sx={{
// //             fontWeight: 600,
// //             fontSize: 14,
// //             whiteSpace: "nowrap",
// //             overflow: "hidden",
// //             textOverflow: "ellipsis",
// //           }}
// //         >
// //           {name}
// //         </Typography>
// //       </Box>

// //       {/* Subject */}
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mt: 1 }}>
// //         <BookIcon sx={{ fontSize: 18, color: "text.secondary" }} />
// //         <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
// //           {subject}
// //         </Typography>
// //       </Box>

// //       {/* Date + Time */}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           mt: 0.4,
// //         }}
// //       >
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //           <EventIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
// //           <Typography sx={{ fontSize: 12 }}>{date}</Typography>
// //         </Box>

// //         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //           <AccessTimeIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
// //           <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
// //             {time}
// //           </Typography>
// //         </Box>
// //       </Box>
// //     </Card>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import {
//   Card,
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EventIcon from "@mui/icons-material/Event";
// import BookIcon from "@mui/icons-material/MenuBook";
// import { postData } from "src/utils/crud-fetch-api";
// import { endpoints } from "src/utils/endpoints";

// interface Props {
//   img: string;
//   name: string;
//   subject: string;
//   date: string;
//   time: string;

//   // 👇 مهمين للـ cancel API
//   bookingType?:
//     | "TeacherPackage"
//     | "TeacherPrivateSession"
//     | "LiveSessionSubject"
//     | "LiveSessionCourse";

//   sessionId?: string; // أي ID حسب النوع
// }

// export default function LessonCard({
//   img,
//   name,
//   subject,
//   date,
//   time,
//   bookingType,
//   sessionId,
// }: Props) {
//   const [openCancel, setOpenCancel] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 🔥 تحديد اسم الـ field حسب bookingType
//   // const getRequestBody = () => {
//   //   switch (bookingType) {
//   //     case "TeacherPackage":
//   //       return {
//   //         bookingType,
//   //         studentPackageSubscriptionId: sessionId,
//   //       };

//   //     case "TeacherPrivateSession":
//   //       return {
//   //         bookingType,
//   //         studentEducationApproachSessionEnrollmentId: enrollmentId,
//   //       };

//   //     case "LiveSessionSubject":
//   //       return {
//   //         bookingType,
//   //         studentLiveSessionSubjectEnrollmentId: enrollmentId,
//   //       };

//   //     case "LiveSessionCourse":
//   //       return {
//   //         bookingType,
//   //         studentLiveSessionCourseEnrollmentId: enrollmentId,
//   //       };

//   //     default:
//   //       return { bookingType };
//   //   }
//   // };

//   const handleCancel = async () => {
//     setLoading(true);

//     try {
//       const res = await postData(
//         endpoints.payment.cancelorder,
//         { BookingType: "TeacherPrivateSession",
//           StudentEducationApproachSessionEnrollmentId: sessionId
//          },
//         // getRequestBody()
//       );

//       if (res.success) {
//         alert("تم إلغاء الحجز بنجاح");
//         setOpenCancel(false);
//       } else {
//         alert(res.error || "حدث خطأ");
//       }
//     } catch (error) {
//       alert("حدث خطأ غير متوقع");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           m: 1,
//           p: 2,
//           minHeight: 140,
//           borderRadius: 2,
//           boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
//           transition: "0.2s",
//           "&:hover": {
//             boxShadow: "0px 4px 12px rgba(0,0,0,0.16)",
//           },
//         }}
//       >
//         {/* Avatar + Name */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Avatar src={img} sx={{ width: 32, height: 32 }} />

//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 600,
//               fontSize: 14,
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {name}
//           </Typography>
//         </Box>

//         {/* Subject */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mt: 1 }}>
//           <BookIcon sx={{ fontSize: 18, color: "text.secondary" }} />
//           <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
//             {subject}
//           </Typography>
//         </Box>

//         {/* Date + Time */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mt: 0.4,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             <EventIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
//             <Typography sx={{ fontSize: 12 }}>{date}</Typography>
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             <AccessTimeIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
//             <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
//               {time}
//             </Typography>
//           </Box>
//         </Box>

//         {/* 🔥 زر الإلغاء */}
//         <Button
//           variant="outlined"
//           color="error"
//           onClick={() => setOpenCancel(true)}
//           sx={{ mt: 1 }}
//         >
//           إلغاء الحجز
//         </Button>
//       </Card>

//       {/* ✅ Dialog */}
//       <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
//         <DialogTitle>تأكيد الإلغاء</DialogTitle>

//         <DialogContent>
//           <Typography>
//             هل أنت متأكد من أنك تريد إلغاء هذا الحجز؟
//           </Typography>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOpenCancel(false)}>
//             رجوع
//           </Button>

//           <Button
//             onClick={handleCancel}
//             color="error"
//             variant="contained"
//             disabled={loading}
//           >
//             {loading ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

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

interface Props {
  img: string;
  name: string;
  subject: string;
  date: string;
  time: string;

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
}: Props) {
  const [openCancel, setOpenCancel] = useState(false);
  const [loading, setLoading] = useState(false);

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

      console.log("🔥 RESPONSE:", res);

      if (res.success) {
        alert("تم إلغاء الحجز بنجاح");
        setOpenCancel(false);
      } else {
        alert(res.error || "حدث خطأ");
      }
    } catch (error) {
      console.error(error);
      alert("خطأ غير متوقع");
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