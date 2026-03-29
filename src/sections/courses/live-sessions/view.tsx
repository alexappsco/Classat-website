


'use client';

import * as React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import LiveSessionsSection from './LiveSessionSection';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Card, InputLabel, FormControl } from '@mui/material';

import Hero from '../Hero';
import { useTranslations } from 'next-intl';

type LiveSesionsProps = {
  paymentList?: any;
  liveCourse?: any[];
  title?: string;
  categories?: any[];
};

export default function LiveSesions({
  paymentList,
  title = 'بثوث مباشرة الان',
  liveCourse,
  categories,
}: LiveSesionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
    const t = useTranslations();


  // ✅ States
  const [selectedCategory, setSelectedCategory] = React.useState(
    searchParams.get('courseCategoryId') || ''
  );

  const [selectedStatus, setSelectedStatus] = React.useState(
    searchParams.get('Status') || ''
  );
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    searchParams.get('Date') ? dayjs(searchParams.get('Date')) : null
  );

  // ✅ تحديث الـ URL
  const handleFilterChange = (
    category: string,
    status: string,
    date: Dayjs | null
  ) => {
    const params = new URLSearchParams();

    if (category) {
      params.set('CourseCategoryId', category);
    }

    if (status) {
      params.set('Status', status);
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
        {/* <TimerCard /> */}
                <Hero />
        
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
                  md: '1fr 1fr 1fr',
                },
                gap: 3,
              }}
            >
              {/* Category */}
              <FormControl fullWidth>
                <InputLabel>التصنيف</InputLabel>
                <Select
                  value={selectedCategory}
                  label="التصنيف"
                  // startAdornment={<CategoryIcon sx={{ mr: 1 }} />}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategory(value);
                    handleFilterChange(value, selectedStatus, selectedDate);
                  }}
                >
                  <MenuItem value="">كل التصنيفات</MenuItem>
                  {categories?.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                    handleFilterChange(selectedCategory, value, selectedDate);
                  }}
                >
             <MenuItem value="Scheduled">{t('Global.Label.Scheduled')}</MenuItem>
                  <MenuItem value="InProgress">{t('Global.Label.InProgress')}</MenuItem>
                  <MenuItem value="Completed">{t('Global.Label.Completed')}</MenuItem>
                  <MenuItem value="Cancelled">{t('Global.Label.Cancelled')}</MenuItem>
                </Select>
              </FormControl>

              {/* Date */}
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  handleFilterChange(selectedCategory, selectedStatus, newValue);
                }}
              // slotProps={{
              //   textField: {
              //     label: 'التاريخ',
              //     fullWidth: true,
              //     // InputProps: {
              //     //   startAdornment: <EventIcon sx={{ mr: 1 }} />,
              //     // },
              //   },
              // }}
              />
            </Box>
          </Card>
        </Box>
      </Box>

      {/* ✅ Live Sessions */}
      <LiveSessionsSection
        paymentList={paymentList}
        title={title}
        liveCourse={liveCourse}
      />
    </>
  );
}