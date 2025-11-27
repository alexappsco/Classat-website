'use client';

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Select, Button, MenuItem, InputBase, Container, Typography } from '@mui/material';

const FiltersBar = () => {
  // const categories = [
  //   'برمجة التطبيقات',
  //   'تكنولوجيا المعلومات',
  //   'التصميم',
  //   'التسويق',
  //   'إدارة الأعمال',
  //   'اللغات',
  //   'الفن',
  //   'ترجمة',
  // ];

  return (
    <Box sx={{ pt: { xs: 9, md: 13 }, px: { xs: 2, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* Filters Row */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          gap={2}
          justifyContent="center"
          dir="rtl"
          sx={{ width: '100%', my: 2 }}
        >
          {/* Dropdowns */}
          {['الصف الثالث', 'المرحلة الايتدائية', 'رياضيات', 'التاريخ'].map((item, idx) => (
            <Select
              key={idx}
              defaultValue={item}
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: { xs: 40, md: 48 },
                minWidth: { xs: 100, md: 120 + idx * 10 },
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
          <Box
            display="flex"
            alignItems="center"
            sx={{
              flex: 1,
              borderRadius: '50px',
              height: { xs: 45, md: 50 },
              px: 2,
              mt: { xs: 2, md: 0 },
              bgcolor: '#fff',
              boxShadow: '0 0 6px rgba(0,0,0,0.12)',
            }}
          >
            <InputBase sx={{ flex: 1, fontSize: { xs: 14, md: 16 } }} placeholder="ابحث عن بث.." />

            <Button sx={{ minWidth: '40px' }}>
              <SearchIcon sx={{ fontSize: 24, color: '#40A2E3' }} />
            </Button>
          </Box>
        </Box>

        {/* Categories Row */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            justifyContent: 'center',
            gap: 1,
            px: 0,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '3px' },
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent',
            mt: 5,
          }}
        >
          {/* {categories.map((category, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                borderRadius: '20px',
                textAlign: 'center',
                px: { xs: 3, md: 4 },
                py: { xs: 0.5, md: 0.6 },
                fontWeight: 500,
                cursor: 'pointer',
                color: '#637381',
                backgroundColor: '#FCFCFC',
                border: '.5px solid #eaeaea',
                whiteSpace: 'nowrap',
                '&:hover': { backgroundColor: '#e0e0e0' },
                flexShrink: 0,
                fontSize: { xs: 12, md: 16 },
              }}
            >
              {category}
            </Typography>
          ))} */}
        </Box>
      </Container>
    </Box>
  );
};

export default FiltersBar;
