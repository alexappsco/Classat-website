// 'use client';
// import { text, primary } from 'src/theme/palette';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

// import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported

// const LIVE_SESSIONS = [
//   {
//     image: '/assets/landing-page/live-sessions/courses/live1.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'بدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/landing-page/live-sessions/courses/live2.png',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'بدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/landing-page/live-sessions/courses/live3.jpg',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'بدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
//   {
//     image: '/assets/landing-page/live-sessions/courses/live4.png',
//     isLive: true,
//     category: 'UI UX Desgin',
//     title: 'أساسيات تصميم المواقع والتطبيقات',
//     instructor: 'أ. خالد محمد',
//     time: 'بدأ منذ 5 دقائق',
//     attendees: '15 طالب',
//   },
// ];

// export default function LiveSessionsSection({ title }: { title: string }) {
//   const primaryTextColor = text.primary;
//   const paragraphTextColor = text.paragraph;
//   const mainColor = primary.main;
//   const smDown = useResponsive('down', 'sm');
//   return (
//     <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
//       <Container>
//         {/* 1. Header and Action Button Row */}
//         <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
//           {/* Section Title (Right side in RTL) */}
//           <Grid item xs={12} sm={8} md={9}>
//             <Stack spacing={0.5}>
//               <Typography variant="h4" sx={{ fontWeight: 700, color: primaryTextColor }}>
//                 {title}
//               </Typography>
//             </Stack>
//           </Grid>

//           {/* Action Button (Left side in RTL) */}
//           {/* <Button
//             variant="contained"
//             size="medium"
//             sx={{
//               minWidth: 150,
//               p: 2,
//               alignSelf: 'flex-start',
//               backgroundColor: mainColor,
//               mt: smDown ? 2 : 0,
//             }}
//             endIcon={'>'}
//           >
//             اكتشف المزيد
//           </Button> */}
//           {/* <Grid
//             item
//             xs={12}
//             sm={4}
//             md={3}
//             sx={{ textAlign: { xs: 'right', sm: 'left' }, mt: { xs: 2, sm: 0 } }}
//             width={'fit-content'}
//           >
//           </Grid> */}
//         </Grid>

//         {/* 2. Live Sessions Grid */}
//         <Grid container spacing={4} justifyContent={'center'}>
//           {LIVE_SESSIONS.map((session, index) => (
//             <Grid
//               item
//               xs={12} // Full width on mobile
//               sm={6} // Two cards per row on small screens
//               md={3} // Four cards per row on desktop
//               key={index}
//             >
//               <LiveSessionCard {...session} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }


"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported
import { useEffect, useState } from 'react';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { ILiveCourse } from 'src/types/liveCourse';
import { ILiveSubject } from 'src/types/liveSubject';

type Props = {
  // studentAppointments: any;
  // lessonList: any[];
  // id: string;
  paymentList: any[];
  // subjectId: string;
  title: string;
  liveSubject?: ILiveSubject[];

};
export default function LiveSessionsSection({ title, paymentList, liveSubject }: Props) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');

  // const [liveSessions, setLiveSessions] = useState<ILiveSubject[]>([]);

  // // Function to refresh data
  // const refreshData = async () => {
  //   try {



  //     // Refresh lessons
  //     const lessonsRes = await getData<any>(endpoints.liveSubjects.get);
  //     console.log('Live Sessions data:', lessonsRes.data.items);
  //     if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
  //       // console.log('Lessons data:', lessonsRes.data.items);
  //       setLiveSessions(lessonsRes.data.items);
  //       console.log('Live Sessions data:', lessonsRes.data.items);
  //     } else {
  //       setLiveSessions([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

    
  // };
  //   useEffect(() => {
  //   refreshData();
  // }, []);
  console.log('liveSubjectسسسسسسسس:', liveSubject);
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* 1. Header and Action Button Row */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          {/* Section Title (Right side in RTL) */}
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: primaryTextColor }}>
                {title}
              </Typography>
            </Stack>
          </Grid>

          {/* Action Button (Left side in RTL) */}
          {/* <Button
            variant="contained"
            size="medium"
            sx={{
              minWidth: 150,
              p: 2,
              alignSelf: 'flex-start',
              backgroundColor: mainColor,
              mt: smDown ? 2 : 0,
            }}
            endIcon={'>'}
          >
            اكتشف المزيد
          </Button> */}
          {/* <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{ textAlign: { xs: 'right', sm: 'left' }, mt: { xs: 2, sm: 0 } }}
            width={'fit-content'}
          >
          </Grid> */}
        </Grid>

        {/* 2. Live Sessions Grid */}
        <Grid container spacing={4} justifyContent={'center'}>
          {liveSubject && liveSubject.length > 0 ? (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={12} // Full width on small screens
              md={12}
              lg={12} // Four cards per row on desktop
            >
              <LiveSessionCard 
                lessonList={liveSubject} 
                teacher_id={liveSubject[0]?.teacherId || ''} 
                paymentList={paymentList} 
                key={liveSubject[0]?.id} 
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  لا توجد جلسات مباشرة متاحة
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
