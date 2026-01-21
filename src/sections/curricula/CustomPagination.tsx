'use client';

import React from 'react';
import { Box, Button } from '@mui/material';

const StaticPagination = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      dir="rtl"
      sx={{ py: 5 }}
    >
      <Button
        variant="outlined"
        sx={{
          borderRadius: '50px',
          px: 4,
          py: 1.2,
          textTransform: 'none',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        → التالي
      </Button>

      <Box display="flex" alignItems="center" gap={1.2}>
        <Button
          variant="contained"
          sx={{
            width: 48,
            height: 48,
            minWidth: 48,
            borderRadius: '50%',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#54B0D7',
          }}
        >
          1
        </Button>

        {[2, 3, 4].map((num) => (
          <Button
            key={num}
            variant="outlined"
            sx={{
              width: 48,
              height: 48,
              minWidth: 48,
              borderRadius: '50%',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            {num}
          </Button>
        ))}
      </Box>

      <Button
        variant="outlined"
        sx={{
          borderRadius: '50px',
          px: 4,
          py: 1.2,
          textTransform: 'none',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        السابق ←
      </Button>
    </Box>
  );
};

export default StaticPagination;
