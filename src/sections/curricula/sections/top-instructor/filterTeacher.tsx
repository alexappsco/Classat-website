'use client';

import React, { useState } from 'react';
import { Box, Select, MenuItem, InputBase, Button, Typography, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function TeachersFilters() {
  const [nationality, setNationality] = useState('جنسية المعلم');
  const [selectedSubject, setSelectedSubject] = useState('اللغة العربية');

  const subjects = [
    'اللغة العربية',
    'التربية الاسلامية',
    'الرياضيات',
    'العلوم',
    'الجغرافيا',
    'التاريخ',
    'الكيمياء',
    'الفيزياء',
    'اللغة الانجليزية',
  ];

  return (
    <Box
      sx={{
        pt: 4,
        pb: 4,
        px: { xs: 1, md: 4 },
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '23px',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <Container>
        {/* ROW: Nationality + Search */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center',
            mb: 2,
          }}
        >
          {/* Nationality Dropdown */}

          {/* Search Box */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fff',
              borderRadius: '40px',
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
              px: 2,
              height: 48,
            }}
          >
            <InputBase placeholder="إبحث عن معلم أو مادة.." sx={{ flex: 1, fontSize: 16 }} />
            <Button>
              <SearchIcon sx={{ color: '#40A2E3', fontSize: 26 }} />
            </Button>
          </Box>
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            sx={{
              borderRadius: '40px',
              bgcolor: '#fff',
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
              px: 1,
              height: 48,
              '& fieldset': { border: 'none' },
              minWidth: 160,
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <MenuItem value="جنسية المعلم">جنسية المعلم</MenuItem>
            <MenuItem value="عراقي">عراقي</MenuItem>
            <MenuItem value="مصري">مصري</MenuItem>
            <MenuItem value="سوري">سوري</MenuItem>
            <MenuItem value="أردني">أردني</MenuItem>
          </Select>
        </Box>

        {/* SUBJECTS TAGS */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 1.3,
            pt: 1,
            mt: 1,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
            scrollbarWidth: 'thin',
          }}
        >
          {subjects.map((subject, i) => (
            <Box
              key={i}
              onClick={() => setSelectedSubject(subject)}
              sx={{
                px: 3,
                py: 0.8,
                borderRadius: '18px',
                border: '1px solid #e4e4e4',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                bgcolor: selectedSubject === subject ? '#40A2E3' : '#fff',
                color: selectedSubject === subject ? '#fff' : '#637381',
                fontWeight: 500,
                fontSize: 15,
                transition: '0.2s',
              }}
            >
              {subject}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
