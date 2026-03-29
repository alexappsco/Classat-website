'use client';

import * as React from 'react';
import { Box, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Categories from '../sections/categories';
import FiltersBar from '../sections/FiltersBar';
import LiveSessionsSection from './LiveSessionSection';
import InstructorsSection from '../sections/top-instructor/TopInstructorsSection';
import Hero from '../sections/Hero';
import TimerCard from 'src/components/timer/TimerShow';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type LiveSesionsProps = {
  paymentList?: any;
  liveSubject?: any[];
  title?: string;

};

export default function LiveSesions({ paymentList, title = "بثوث مباشرة الان",liveSubject }: LiveSesionsProps) {

  const router = useRouter();
const searchParams = useSearchParams();
  const t = useTranslations();





  const [selectedStatus, setSelectedStatus] = React.useState(
    searchParams.get('LiveSessionStatus') || ''
  );
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    searchParams.get('Date') ? dayjs(searchParams.get('Date')) : null
  );

  // ✅ تحديث الـ URL
  const handleFilterChange = (
    // category: string,
    status: string,
    date: Dayjs | null
  ) => {
    const params = new URLSearchParams();

    // if (category) {
    //   params.set('CourseCategoryId', category);
    // }

    if (status) {
      params.set('LiveSessionStatus', status);
    }

    if (date) {
      // 👇 مهم جدًا format صح
      params.set('Date', date.format('YYYY-MM-DD'));
    }

    router.push(`?${params.toString()}`);
  };


  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />
        {/* <TimerCard subtitle='بث "تطوير تطبيقات الويب باستخدام React" يبدأ قريبًا' /> */}
        {/* <TimerCard  /> */}

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -80, md: -100 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%',
            maxWidth: 1100,
            zIndex: 10,
            mb: 4,
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              backdropFilter: 'blur(15px)',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr ',
                },
                gap: 3,
              }}
            >

              {/* Status */}
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={selectedStatus}
                  label="الحالة"
                  // startAdornment={<FlagIcon sx={{ mr: 1 }} />}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedStatus(value);
                    handleFilterChange( value, selectedDate);
                  }}
                >
                  <MenuItem value="">كل الحالات</MenuItem>
                  <MenuItem value="Scheduled">{t('Global.Label.Scheduled')}</MenuItem>
                  <MenuItem value="InProgress">{t('Global.Label.InProgress')}</MenuItem>
                  <MenuItem value="Completed">{t('Global.Label.Completed')}</MenuItem>
                  <MenuItem value="Cancelled">{t('Global.Label.Cancelled')}</MenuItem>
                </Select>
              </FormControl>

              {/* Date */}
              <DatePicker
                value={selectedDate}
                onChange={(newValue: Dayjs | null) => {
                  setSelectedDate(newValue);
                  handleFilterChange( selectedStatus, newValue);
                }}

              />
            </Box>
          </Card>
        </Box>
      </Box>



      <>
        <LiveSessionsSection paymentList={paymentList } title={title} liveSubject={liveSubject} />
        {/* <LiveSessionsSection title="بثوث مباشرة قادمة" /> */}
      </>
    </>
  );
}
