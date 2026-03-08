


'use client';

import * as React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import LiveSessionsSection from './LiveSessionSection';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Card, InputLabel, FormControl } from '@mui/material';

import Hero from '../Hero';

type LiveSesionsProps = {
  liveCourse?: any[];
  title?: string;
  categories?: any[];
};

export default function MyLiveSesions({
  title = 'بثوث مباشرة الان',
  liveCourse,
  categories,
}: LiveSesionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ States
  const [selectedCategory, setSelectedCategory] = React.useState(
    searchParams.get('courseCategoryId') || ''
  );

  const [selectedStatus, setSelectedStatus] = React.useState(
    searchParams.get('LiveSessionStatus') || ''
  );
  const [selectedEnrollmentStatus, setSelectedEnrollmentStatus] = React.useState(
    searchParams.get('EnrollmentStatus') || ''
  );
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    searchParams.get('Date') ? dayjs(searchParams.get('Date')) : null
  );

  // ✅ تحديث الـ URL
  const handleFilterChange = (
    category: string,
    LiveSessionStatus: string,
    date: Dayjs | null,
    EnrollmentStatus: string
  ) => {
    const params = new URLSearchParams();

    if (category) {
      params.set('CourseCategoryId', category);
    }

    if (LiveSessionStatus) {
      params.set('LiveSessionStatus', LiveSessionStatus);
    }
    if (EnrollmentStatus) {
      params.set('EnrollmentStatus', EnrollmentStatus);
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
                  md: '1fr 1fr 1fr 1fr',
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
                    handleFilterChange(value, selectedStatus, selectedDate, selectedEnrollmentStatus);
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
                    handleFilterChange(selectedCategory, value, selectedDate, selectedEnrollmentStatus);
                  }}
                >
                  <MenuItem value="">كل الحالات</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="InProgress">InProgress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={selectedEnrollmentStatus}
                  label="الحالة"
                  // startAdornment={<FlagIcon sx={{ mr: 1 }} />}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedEnrollmentStatus(value);
                    handleFilterChange(selectedCategory, selectedStatus, selectedDate, value);
                  }}
                >
                  <MenuItem value="">كل الحالات</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>

              {/* Date */}
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  handleFilterChange(selectedCategory, selectedStatus, newValue, selectedEnrollmentStatus);
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
        title={title}
        liveCourse={liveCourse}
      />
    </>
  );
}