// "use client"
// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   Stack,
//   Paper,
//   Collapse,
// } from "@mui/material";
// import { Icon } from "@iconify/react";

// export default function CourseCurriculum() {
//   // State to manage which sections are expanded/collapsed
//   const [openSections, setOpenSections] = useState({
//     s1: true,
//     s2: false,
//     s3: false,
//     s4: false,
//   });

//   // Toggle section expand/collapse  ✅ FIXED
//   const toggle = (key: keyof typeof openSections) => {
//     setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // Course curriculum fake data
//   const courseContent = [
//     {
//       id: "s1",
//       title: "الفصل 1: مقدمة في React",
//       lessons: [
//         {
//           id: 1,
//           title: "ما هو React؟",
//           duration: "15 دقيقة",
//           icon: "mdi:play-circle-outline",
//           locked: false
//         },
//         {
//           id: 2,
//           title: "إعداد بيئة التطوير",
//           duration: "5 دقيقة",
//           icon: "mdi:play-circle-outline",
//           locked: false
//         },
//         {
//           id: 3,
//           title: "أول تطبيق React",
//           duration: "5 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         }
//       ]
//     },
//     {
//       id: "s2",
//       title: "الفصل 2: المكونات والخصائص",
//       lessons: [
//         {
//           id: 1,
//           title: "المكونات الأساسية",
//           duration: "20 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         },

//       ]
//     },
//     {
//       id: "s3",
//       title: "الفصل 3: إدارة الحالة",
//       lessons: [
//         {
//           id: 1,
//           title: "useState Hook",
//           duration: "25 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         },
//         {
//           id: 2,
//           title: "useEffect Hook",
//           duration: "20 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         }
//       ]
//     },
//     {
//       id: "s4",
//       title: "الفصل 4: مقدمة في Back-end",
//       lessons: [
//         {
//           id: 1,
//           title: "ما هو Back-end؟",
//           duration: "10 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         },
//         {
//           id: 2,
//           title: "قواعد البيانات",
//           duration: "15 دقيقة",
//           icon: "mdi:lock-outline",
//           locked: true
//         }
//       ]
//     }
//   ];

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: "16px",
//         width: "100%",
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: "25px",
//       }}
//     >
//       <Typography
//         sx={{
//           fontWeight: 700,
//           fontStyle: "bold",
//           fontSize: "24px",
//           lineHeight: "21px",
//           color: "#153A52",
//           mb: 3,
//           textAlign: "left",
//         }}
//       >
//         محتوى الكورس
//       </Typography>

//       <List sx={{ p: 0 }}>
//         {courseContent.map((section, index) => (
//           <ListItem
//             key={section.id}
//             sx={{
//               px: 0,
//               flexDirection: "column",
//               alignItems: "flex-start",
//               width: "100%",
//               mt: index > 0 ? 1 : 0
//             }}
//           >
//             {/* Section header - clickable to expand/collapse */}
//             <Box
//               onClick={() => toggle(section.id as keyof typeof openSections)}
//               sx={{
//                 width: "100%",
//                 background: "#F7F8F9",
//                 px: 2,
//                 py: 1.5,
//                 borderRadius: "8px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: 400,
//                   fontSize: "14px",
//                   lineHeight: "22px",
//                   textAlign: "right",
//                   color: "#212B36",
//                 }}
//               >
//                 {section.title}
//               </Typography>

//               {/* Expand/collapse icon */}
//               <Icon
//                 icon="mdi:chevron-down"
//                 width={22}
//                 style={{
//                   transform: openSections[section.id as keyof typeof openSections]
//                     ? "rotate(0deg)"
//                     : "rotate(180deg)",
//                   transition: "0.25s",
//                   color: "#637381",
//                 }}
//               />
//             </Box>

//             {/* lesson - Collapse */}
//             <Collapse
//               in={openSections[section.id as keyof typeof openSections]}
//               timeout={300}
//               unmountOnExit
//               sx={{ width: "100%" }}
//             >
//               <Box sx={{ width: "100%" }}>
//                 {section.lessons.map((lesson, lessonIndex) => (
//                   <Stack
//                     key={lesson.id}
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     sx={{
//                       py: 1.5,
//                       width: "100%",
//                       borderBottom: lessonIndex < section.lessons.length - 1
//                         ? "1px dashed #E0E0E0"
//                         : "none",
//                     }}
//                   >
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                       {/* Lesson icon (play or lock) */}
//                       <Icon
//                         icon={lesson.icon}
//                         width={20}
//                         color={lesson.locked ? "#637381" : "#153A52"}
//                       />
//                       <Typography
//                         sx={{
//                           fontSize: "14px",
//                           lineHeight: "22px",
//                           color: lesson.locked ? "#637381" : "#212B36"
//                         }}
//                       >
//                         {lesson.title}
//                       </Typography>
//                     </Stack>

//                     {/* Lesson duration */}
//                     <Typography
//                       sx={{ color: "#637381", fontSize: "14px", fontWeight: "400", lineHeight: "22px" }}
//                     >
//                       {lesson.duration}
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Box>
//             </Collapse>
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// }



// "use client";
// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   Stack,
//   Paper,
//   Collapse,
// } from "@mui/material";
// import { Icon } from "@iconify/react";

// // ===== Props =====
// type Lesson = {
//   secsionId: string;
//   secsionTitle: string;
//   videoUrl: string;
// };

// type Section = {
//   sectionId: string;
//   sectionTitle: string;
//   secsions: Lesson[];
// };

// type Props = {
//   sections: Section[];
// };

// export default function CourseCurriculum({ sections }: Props) {
//   const [openSections, setOpenSections] = useState<Record<string, boolean>>(
//     sections.reduce((acc, section, idx) => {
//       acc[section.sectionId] = idx === 0;
//       return acc;
//     }, {} as Record<string, boolean>)
//   );

//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   const toggle = (key: string) => {
//     setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: "16px",
//         width: "100%",
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: "25px",
//       }}
//     >
//       <Typography
//         sx={{
//           fontWeight: 700,
//           fontStyle: "bold",
//           fontSize: "24px",
//           lineHeight: "21px",
//           color: "#153A52",
//           mb: 3,
//           textAlign: "left",
//         }}
//       >
//         محتوى الكورس
//       </Typography>

//       <List sx={{ p: 0 }}>
//         {sections.map((section, index) => (
//           <ListItem
//             key={section.sectionId}
//             sx={{
//               px: 0,
//               flexDirection: "column",
//               alignItems: "flex-start",
//               width: "100%",
//               mt: index > 0 ? 1 : 0,
//             }}
//           >
//             {/* Section header */}
//             <Box
//               onClick={() => toggle(section.sectionId)}
//               sx={{
//                 width: "100%",
//                 background: "#F7F8F9",
//                 px: 2,
//                 py: 1.5,
//                 borderRadius: "8px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: 400,
//                   fontSize: "14px",
//                   lineHeight: "22px",
//                   textAlign: "right",
//                   color: "#212B36",
//                 }}
//               >
//                 {section.sectionTitle}
//               </Typography>

//               <Icon
//                 icon="mdi:chevron-down"
//                 width={22}
//                 style={{
//                   transform: openSections[section.sectionId] ? "rotate(0deg)" : "rotate(180deg)",
//                   transition: "0.25s",
//                   color: "#637381",
//                 }}
//               />
//             </Box>

//             {/* Lessons */}
//             <Collapse in={openSections[section.sectionId]} timeout={300} unmountOnExit>
//               <Box sx={{ width: "100%" }}>
//                 {section.secsions.map((lesson) => (
//                   <Box key={lesson.secsionId} sx={{ mb: 2 }}>
//                     <Stack
//                       direction="row"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       sx={{ py: 1.5, width: "100%" }}
//                     >
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Icon
//                           icon="mdi:play-circle-outline"
//                           width={20}
//                           color="#153A52"
//                         />
//                         <Typography sx={{ fontSize: "14px", lineHeight: "22px", color: "#212B36" }}>
//                           {lesson.secsionTitle}
//                         </Typography>
//                       </Stack>

//                       <Typography sx={{ color: "#637381", fontSize: "14px", lineHeight: "22px" }}>
//                         00:00
//                       </Typography>
//                     </Stack>

//                     {/* Video player */}
//                     {activeVideo === lesson.secsionId && (
//                      <video
//                       src={lesson.videoUrl}
//                       controls
//                       width="100%"
//                       style={{ borderRadius: 12 }}
//                     />
//                     )}

//                     {/* Click to open video */}
//                     <Box
//                       onClick={() =>
//                         setActiveVideo(
//                           activeVideo === lesson.secsionId ? null : lesson.secsionId
//                         )
//                       }
//                       sx={{
//                         cursor: "pointer",
//                         fontSize: 12,
//                         color: "#54B0D7",
//                         mt: 0.5,
//                       }}
//                     >
//                       {activeVideo === lesson.secsionId ? "إخفاء الفيديو" : "تشغيل الفيديو"}
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </Collapse>
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// }





"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Stack,
  Paper,
  Collapse,
} from "@mui/material";
import { Icon } from "@iconify/react";

// ===== Types =====
type Lesson = {
  secsionId: string;
  secsionTitle: string;
  videoUrl: string;
};

type Section = {
  sectionId: string;
  sectionTitle: string;
  secsions: Lesson[];
};

type Props = {
  sections: Section[];
};

export default function CourseCurriculum({ sections }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section, idx) => {
      acc[section.sectionId] = idx === 0;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // ===== durations state =====
  const [durations, setDurations] = useState<Record<string, string>>({});

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== format time =====
  const formatDuration = (seconds: number) => {
    if (!seconds) return "00:00";

    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: "16px",
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "25px",
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
          color: "#153A52",
          mb: 3,
        }}
      >
        محتوى الكورس
      </Typography>

      <List sx={{ p: 0 }}>
        {sections.map((section, index) => (
          <ListItem
            key={section.sectionId}
            sx={{
              px: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              mt: index > 0 ? 1 : 0,
            }}
          >
            {/* ===== Section Header ===== */}
            <Box
              onClick={() => toggle(section.sectionId)}
              sx={{
                width: "100%",
                background: "#F7F8F9",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#212B36",
                }}
              >
                {section.sectionTitle}
              </Typography>

              <Icon
                icon="mdi:chevron-down"
                width={22}
                style={{
                  transform: openSections[section.sectionId]
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                  transition: "0.25s",
                  color: "#637381",
                }}
              />
            </Box>

            {/* ===== Lessons ===== */}
            <Collapse
              in={openSections[section.sectionId]}
              timeout={300}
              unmountOnExit
            >
              <Box sx={{ width: "100%" }}>
                {section.secsions.map((lesson) => (
                  <Box key={lesson.secsionId} sx={{ mb: 2 }}>
                    {/* ===== Lesson Row ===== */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        py: 1.5,
                        width: "100%",
                      }}
                    >
                      {/* Left side */}
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ flex: 1 }}
                      >
                        <Icon
                          icon="mdi:play-circle-outline"
                          width={20}
                          color="#153A52"
                        />

                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#212B36",
                          }}
                        >
                          {lesson.secsionTitle}
                        </Typography>
                      </Stack>

                      {/* Right side → duration */}
                      <Typography
                        sx={{
                          color: "#637381",
                          fontSize: "14px",
                          minWidth: 60,
                          textAlign: "right",
                        }}
                      >
                        {durations[lesson.secsionId] || "00:00"}
                      </Typography>
                    </Stack>

                    {/* ===== Hidden video loader (duration only) ===== */}
                    {!durations[lesson.secsionId] && (
                      <video
                        src={lesson.videoUrl}
                        preload="metadata"
                        style={{ display: "none" }}
                        onLoadedMetadata={(e) => {
                          const seconds =
                            e.currentTarget.duration;

                          setDurations((prev) => ({
                            ...prev,
                            [lesson.secsionId]:
                              formatDuration(seconds),
                          }));
                        }}
                      />
                    )}

                    {/* ===== Active Video Player ===== */}
                    {activeVideo === lesson.secsionId && (
                      <video
                        src={lesson.videoUrl}
                        controls
                        width="100%"
                        style={{ borderRadius: 12 }}
                      />
                    )}

                    {/* ===== Toggle button ===== */}
                    <Box
                      onClick={() =>
                        setActiveVideo(
                          activeVideo === lesson.secsionId
                            ? null
                            : lesson.secsionId
                        )
                      }
                      sx={{
                        cursor: "pointer",
                        fontSize: 12,
                        color: "#54B0D7",
                        mt: 0.5,
                        width: "fit-content",
                      }}
                    >
                      {activeVideo === lesson.secsionId
                        ? "إخفاء الفيديو"
                        : "تشغيل الفيديو"}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
