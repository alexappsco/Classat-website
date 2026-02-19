"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Grid, Stack, Button, Container, Typography, Select, MenuItem, Card } from '@mui/material';

// Helper function to convert English day names to Arabic
const getArabicDayName = (dayOfWeek: string): string => {
  const dayMap: Record<string, string> = {
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
  };
  return dayMap[dayOfWeek] || dayOfWeek;
};

// Helper function to format date from ISO (2026-02-09) to DD/MM
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

// Helper function to convert 24-hour time to Arabic format
const formatTimeToArabic = (time24: string): string => {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const minute = minutes || '00';

  if (hour === 0) {
    return `12:${minute} صباحاً`;
  } else if (hour < 12) {
    return `${hour}:${minute} صباحاً`;
  } else if (hour === 12) {
    return `12:${minute} ظهراً`;
  } else {
    const hour12 = hour - 12;
    return `${hour12}:${minute} مساء`;
  }
};

// Helper function to format time slot (startTime - endTime)
const formatTimeSlot = (startTime: string, endTime: string): string => {
  const start = formatTimeToArabic(startTime);
  const end = formatTimeToArabic(endTime);
  return `${start} - ${end}`;
};
interface Props{
  title:string;
  studentAppointments:any
}
export default function LiveSectionTimeDetails({title:_,studentAppointments}:Props) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  // const mainColor = primary.main;
  // const smDown = useResponsive('down', 'sm');

  // Transform the API data to match the display format
  const availableSlots = (studentAppointments || []).map((appointment: any) => ({
    dayLabel: getArabicDayName(appointment.dayOfWeek),
    dateLabel: formatDate(appointment.date),
    times: appointment.timeSlots.map((slot: any) =>
      formatTimeSlot(slot.startTime, slot.endTime)
    ),
    timeSlots: appointment.timeSlots, // Keep original for potential use
  }));
  return (
    <Box>
      <Container>


        {/* عنوان قسم جدول المواعيد */}
        <Box  sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: primaryTextColor, mb: 1 }}
          >
            جدول المواعيد المتاحة
          </Typography>
        </Box>

        {/* جدول المواعيد المتاحة */}
        <Box
          sx={{
            overflowX: 'auto',
            pb: 2,
          }}

        >
          {availableSlots.length > 0 ? (
            <Stack
              direction={{xs:'column',md:'row'}}
              spacing={2}
            >
              {availableSlots.map((day: any, index: number) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: 202,
                    borderRadius: 4,
                    backgroundColor: '#E5F7FF',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* عنوان اليوم والتاريخ */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: primaryTextColor,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '6px',
                        border: '2px solid #4BA9D8',
                        position: 'relative',
                        mr: 1
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          bgcolor: '#4BA9D8',
                          borderTopLeftRadius: '4px',
                          borderTopRightRadius: '4px',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {day.dateLabel ? `${day.dayLabel} ${day.dateLabel}` : day.dayLabel}
                    </Typography>
                  </Box>

                  {/* الأوقات */}
                  <Stack spacing={1}>
                    {day.times.map((time: string, idx: number) => (
                      <Button
                        key={idx}
                        variant="contained"
                        fullWidth
                        sx={{
                          borderRadius: '999px',
                          backgroundColor: '#28A8DD',
                          '&:hover': { backgroundColor: '#1D8FBF' },
                          py: 0.5,
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: paragraphTextColor }}>
                لا توجد مواعيد متاحة حالياً
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
