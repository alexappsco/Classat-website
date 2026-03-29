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
