'use client';

import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

interface TimerDisplayProps {
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  isStatic?: boolean;
}

// Main countdown timer component
export default function TimerDisplay({
  initialDays = 3,
  initialHours = 2,
  initialMinutes = 30,
  initialSeconds = 10,
  isStatic = false,
}: TimerDisplayProps) {

  // Convert all time units to total seconds for countdown
  const initialTotalSeconds =
    initialDays * 24 * 60 * 60 +
    initialHours * 60 * 60 +
    initialMinutes * 60 +
    initialSeconds;

  // State to track remaining seconds
  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);

  // Countdown effect - runs every second
  useEffect(() => {
    if (isStatic) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStatic]);

  // Convert total seconds back to time units
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  // Time units data for display
  const timeUnits = [
    { value: days.toString().padStart(2, '0'), label: 'أيام' },
    { value: hours.toString().padStart(2, '0'), label: 'ساعات' },
    { value: minutes.toString().padStart(2, '0'), label: 'دقيقة' },
    { value: seconds.toString().padStart(2, '0'), label: 'ثانية' },
  ];

  // Render time units in boxes
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: { xs: '16px', sm: '24px', md: '32px' },
        width: { xs: '100%', sm: '300px', md: '352px' },
        height: { xs: 'auto', md: '79px' },
        justifyContent: 'center',
        flexWrap: { xs: 'nowrap', sm: 'nowrap' },
        zIndex: 1,
      }}
    >
      {timeUnits.map((unit) => (
        <Box
          key={unit.label}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Time value box */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '10px',
              width: { xs: '56px', sm: '60px', md: '64px' },
              height: { xs: '40px', sm: '42px', md: '44px' },
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '5px',
              alignSelf: 'stretch',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '24px', sm: '28px', md: '32px' },
                lineHeight: '100%',
                textAlign: 'center',
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              }}
            >
              {unit.value}
            </Typography>
          </Box>

          {/* Time unit label */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: '18px', sm: '20px', md: '24px' },
              lineHeight: '100%',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 1)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            {unit.label}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
