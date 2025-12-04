"use client";
import { text, primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Card, Stack, Button, Select, MenuItem, Container, Typography } from '@mui/material';

const AVAILABLE_SLOTS = [
  {
    dayLabel: 'اليوم',
    dateLabel: '',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
  {
    dayLabel: 'الأحد',
    dateLabel: '26/10',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
  {
    dayLabel: 'الاثنين',
    dateLabel: '27/10',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
  {
    dayLabel: 'الثلاثاء',
    dateLabel: '28/10',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
  {
    dayLabel: 'الأربعاء',
    dateLabel: '29/10',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
  {
    dayLabel: 'الخميس',
    dateLabel: '30/10',
    times: ['05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء', '05:00 مساء'],
  },
];

export default function LiveSectionTimeDetails({title}:{title: string}) {
  const primaryTextColor = text.primary;
  const paragraphTextColor = text.paragraph;
  const mainColor = primary.main;
  const smDown = useResponsive('down', 'sm');
  return (
    <Box>
      <Container>
      <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          alignItems={{ xs: 'stretch', md: 'start' }}
          gap={2}
          justifyContent="start"
          // dir="rtl"
          sx={{ width: '100%', my: 2 }}
        >
          {/* Dropdowns */}
          {['ريأكت','فرونت اند','البرمجة','التاريخ'].map((item, idx) => (
            <Select
              key={idx}
              defaultValue={item}
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: { xs: 40, md: 48 },
                minWidth: { xs: 120, md: 140 + idx * 10 },
                px: 1,
                '& fieldset': { border: 'none' },
                bgcolor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                fontSize: { xs: 14, md: 16 },
              }}
            >
              <MenuItem value={item}>{item}</MenuItem>
            </Select>
          ))}

          {/* Search Input */}

        </Box>

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
          <Stack
            direction={{xs:'column',md:'row'}}
            spacing={2}

            // sx={{ minWidth: 'fit-content' }}
          >
            {AVAILABLE_SLOTS.map((day, index) => (
              <Card
                key={index}

                sx={{
                  // columnCount:2.5,
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
                      mr:1
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
                    {day.dateLabel ? ` ${day.dayLabel} ${day.dateLabel}` : day.dayLabel}
                  </Typography>
                  {/* أيقونة تقويم بسيطة */}
                </Box>

                {/* الأوقات */}
                <Stack spacing={1}>
                  {day.times.map((time, idx) => (
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
        </Box>
      </Container>
    </Box>
  );
}
