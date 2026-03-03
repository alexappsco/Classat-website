"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import LiveSessionCard from './LiveSessionCard'; // Assuming the card is imported
import { useEffect, useState } from 'react';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { ILiveCourse } from 'src/types/liveCourse';


export default function LiveSessionsSection({title}:{title: string}) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');

  const [liveSessions, setLiveSessions] = useState<ILiveCourse[]>([]);

  // Function to refresh data
  const refreshData = async () => {
    try {



      // Refresh lessons
      const lessonsRes = await getData<any>(endpoints.liveCourse.get);
      console.log('Live Sessions data:', lessonsRes.data.items);
      if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
        // console.log('Lessons data:', lessonsRes.data.items);
        setLiveSessions(lessonsRes.data.items);
        console.log('Live Sessions data:', lessonsRes.data.items);
      } else {
        setLiveSessions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    useEffect(() => {
    refreshData();
  }, []);
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
          <Button
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
          </Button>
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
          {liveSessions.map((session) => (
            <Grid
              item
              xs={12} // Full width on mobile
              sm={6} // Two cards per row on small screens
              md={4}
              lg={3} // Four cards per row on desktop
              key={session.id}
            >
              <LiveSessionCard liveCourse={session}  />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
