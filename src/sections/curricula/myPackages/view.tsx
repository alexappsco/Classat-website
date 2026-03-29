'use client';

import * as React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import LiveSessionsSection from './myPackagesSection';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Card, InputLabel, FormControl } from '@mui/material';

import Hero from '../Hero';
import { useTranslations } from 'next-intl';
import PackageSection from './myPackagesSection';

type LiveSesionsProps = {
  liveSubject?: any[];
  title?: string;
  categories?: any[];
};

export default function MyPackages({
  title = 'Label.my_packages',
  liveSubject,
  categories,
}: LiveSesionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();


  const [selectedStatus, setSelectedStatus] = React.useState(searchParams.get('Status') || '');
  const [selectedEnrollmentStatus, setSelectedEnrollmentStatus] = React.useState(
    searchParams.get('EnrollmentStatus') || ''
  );
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    searchParams.get('Date') ? dayjs(searchParams.get('Date')) : null
  );

  // ✅ تحديث الـ URL
  const handleFilterChange = (Status: string, date: Dayjs | null) => {
    const params = new URLSearchParams();



    if (Status) {
      params.set('Status', Status);
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
                  xs: '1fr 1fr',
                  md: '1fr 1fr 1fr ',
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
                    handleFilterChange(value, selectedDate);
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
                  handleFilterChange(selectedStatus, newValue);
                }}
              />
            </Box>
          </Card>
        </Box>
      </Box>

      {/* ✅ Live Sessions */}
      <PackageSection
        title={t(title)}
        liveSubject={liveSubject}
        // liveCourse={liveSubject}
      />
    </>
  );
}
