// 'use client';

// import { useState } from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   TextField,
//   InputAdornment,
//   IconButton,
//   ToggleButtonGroup,
//   ToggleButton,
//   Typography,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import LiveSessionCard from 'src/sections/lisson/live-sessions/LiveSessionCard';

// const UPCOMING_SESSIONS = [
//   {
//     image: '/assets/sessions/mobile_dev.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/ux_design.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/coding_basics.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/design_diff.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   // second row (to mimic screenshot)
//   {
//     image: '/assets/sessions/mobile_dev.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/ux_design.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/coding_basics.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/sessions/design_diff.jpg',
//     isLive: false,
//     category: 'Web Development',
//     title: 'أساسيات تطوير الويب للمبتدئين',
//     instructor: 'أ. إبراهيم أحمد',
//     time: 'اليوم، 6:00 مساءً',
//     attendees: '15 طالب',
//   },
// ];

// export default function UpcomingSessions() {
//   const [tab, setTab] = useState<'upcoming' | 'current' | 'past'>('upcoming');
//   const [search, setSearch] = useState('');

//   const filtered = UPCOMING_SESSIONS.filter((session) =>
//     session.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <Box sx={{ py: { xs: 4, md: 6 }, mt: 8, bgcolor: '#F5F7FB' }}>
//       <Container>
//         {/* Top bar: filters + search */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', md: 'row' },
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 2,
//             mb: 4,
//           }}
//         >
//           {/* Tabs */}


//           {/* Search + date filter */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 2,
//               width: { xs: '100%', md: '60%' },
//             }}
//           >
//             <TextField
//               fullWidth
//               placeholder="ابحث عن معلم..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: '#9CA3AF' }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 bgcolor: '#FFFFFF',
//                 borderRadius: '999px',
//                 '& fieldset': { border: 'none' },
//               }}
//             />
            

//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 bgcolor: '#FFFFFF',
//                 px: 2,
//                 py: 1,
//                 borderRadius: '999px',
//                 cursor: 'pointer',
//                 boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)',
//               }}
//             >
//               <Typography sx={{ ml: 1 }}>التاريخ</Typography>
//               <IconButton size="small">
//                 <KeyboardArrowDownIcon />
//               </IconButton>
//             </Box>
//           </Box>
          
//         </Box>
//         <Box>

//         <ToggleButtonGroup
//             value={tab}
//             exclusive
//             onChange={(_, value) => value && setTab(value)}
//             sx={{
//                 bgcolor: '#FFFFFF',
//               borderRadius: '999px',
//               boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
//               p: 0.5,
//             }}
//             >
//             <ToggleButton
//               value="upcoming"
//               sx={{
//                   border: 'none',
//                 borderRadius: '999px',
//                 px: 3,
//               }}
//               >
//               القادمة
//             </ToggleButton>
//             <ToggleButton
//               value="current"
//               sx={{
//                 border: 'none',
//                 borderRadius: '999px',
//                 px: 3,
//               }}
//               >
//               الحالية
//             </ToggleButton>
//             <ToggleButton
//               value="past"
//               sx={{
//                 border: 'none',
//                 borderRadius: '999px',
//                 px: 3,
//               }}
//               >
//               المنتهية
//             </ToggleButton>
//           </ToggleButtonGroup>
//                 </Box>

//         {/* Grid of upcoming sessions */}
//         <Grid container spacing={3}>
//           {filtered.map((session, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <LiveSessionCard {...session} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }


'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TeacherCard from './TeacherCard';

type SessionTab = 'upcoming' | 'current' | 'past';

type Teacher = {
  image: string;
  title: string;
  instructor: string;
  time: string;
  rating: number;
  tab: SessionTab;
  isBooked?: boolean;
};

const TEACHERS: Teacher[] = [
  // Upcoming
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'اليوم - الساعة 6:00 م',
    rating: 5,
    tab: 'upcoming',
    isBooked: false,
  },
  // Current (booked example)
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'الآن - الجلسة جارية',
    rating: 5,
    tab: 'current',
    isBooked: true,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'الآن - الجلسة جارية',
    rating: 5,
    tab: 'current',
    isBooked: true,
  },
  // Past
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'أمس - الساعة 6:00 م',
    rating: 5,
    tab: 'past',
    isBooked: true,
  },
  {
    image: '/assets/landing-page/top-instructors/instructor1.png',
    title: 'Web Development',
    instructor: 'أ. إبراهيم أحمد',
    time: 'أمس - الساعة 6:00 م',
    rating: 5,
    tab: 'past',
    isBooked: true,
  },
];

export default function UpcomingSessions() {
  const [tab, setTab] = useState<SessionTab>('upcoming');
  const [search, setSearch] = useState('');

  const filteredTeachers = TEACHERS.filter(
    (teacher) =>
      teacher.tab === tab &&
      teacher.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#F5F7FB', py: 4, mt: 10 }}>
      <Container>
        {/* الشريط العلوي: التابات + البحث + التاريخ */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            // justifyContent: 'space-between',
            gap: 2,
            mb: 5,
          }}
        >
          {/* التابات */}


          {/* البحث + التاريخ */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: { xs: '100%', md: '100%' },
            }}
          >
            <TextField
              fullWidth
              placeholder="ابحث عن معلم..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '999px',
                '& fieldset': { border: 'none' },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#FFFFFF',
                px: 2,
                py: 1,
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.08)',
              }}
            >
              <Typography sx={{ ml: 1 }}>التاريخ</Typography>
              <IconButton size="small">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* <Box mb={2}>
        <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={(_, value) => value && setTab(value)}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '999px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
              p: 0.5,
              alignSelf: { xs: 'stretch', md: 'flex-start' },
            }}
          >
            <ToggleButton
              value="upcoming"
              sx={{
                border: 'none',
                borderRadius: '999px',
                px: 3,
              }}
            >
              القادمة
            </ToggleButton>
            <ToggleButton
              value="current"
              sx={{
                border: 'none',
                borderRadius: '999px',
                px: 3,
              }}
            >
              الحالية
            </ToggleButton>
            <ToggleButton
              value="past"
              sx={{
                border: 'none',
                borderRadius: '999px',
                px: 3,
              }}
            >
              المنتهية
            </ToggleButton>
          </ToggleButtonGroup>
        </Box> */}

<Box mb={2}>
<Box
  sx={{
    display: "flex",
    gap: 1,
    bgcolor: "#FFFFFF",
    p: 1,
    borderRadius: "999px",
    boxShadow: "0 0 0 1px #d1e6ff inset",
    width: "fit-content",
  }}
>
  {/* القادمة */}
  <Box
    onClick={() => setTab("upcoming")}
    sx={{
      px: 3,
      py: 1,
      borderRadius: "999px",
      cursor: "pointer",
      color: tab === "upcoming" ? "#2563EB" : "#6B7280",
      bgcolor: tab === "upcoming" ? "#E8F3FF" : "transparent",
      fontWeight: tab === "upcoming" ? 600 : 400,
      transition: "0.25s",
    }}
  >
    القادمة
  </Box>

  {/* الحالية */}
  <Box
    onClick={() => setTab("current")}
    sx={{
      px: 3,
      py: 1,
      borderRadius: "999px",
      cursor: "pointer",
      color: tab === "current" ? "#2563EB" : "#6B7280",
      bgcolor: tab === "current" ? "#E8F3FF" : "transparent",
      fontWeight: tab === "current" ? 600 : 400,
      transition: "0.25s",
    }}
  >
    الحالية
  </Box>

  {/* المنتهية */}
  <Box
    onClick={() => setTab("past")}
    sx={{
      px: 3,
      py: 1,
      borderRadius: "999px",
      cursor: "pointer",
      color: tab === "past" ? "#2563EB" : "#6B7280",
      bgcolor: tab === "past" ? "#E8F3FF" : "transparent",
      fontWeight: tab === "past" ? 600 : 400,
      transition: "0.25s",
    }}
  >
    المنتهية
  </Box>

  
</Box>

</Box>

        {/* الشبكة */}
        <Grid container spacing={3}>
          {filteredTeachers.map((teacher, i) => (
            <Grid item xs={12} sm={6} md={3} key={i} mt={10}>
              <TeacherCard {...teacher} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

