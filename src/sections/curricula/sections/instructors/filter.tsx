'use client';
import React, { useState } from 'react';
import { Box, Container, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

type SubjectItem = {
  id: string;
  name: string;
};

type Props = {
  currentSubjectId: string;
  subjects: SubjectItem[]; 
};

export default function TeachersFilters({ currentSubjectId, subjects }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectSubject = (subjectId: string) => {
    if (subjectId === currentSubjectId) return;
    router.push(`/curricula/subjects/${subjectId}/teachers`);
  };

  const handleSearch = () => {
    router.push(
      `/curricula/subjects/${currentSubjectId}/teachers?TeacherName=${encodeURIComponent(
        searchTerm
      )}`
    );
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#fff' }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: '40px',
            boxShadow: '0 0 6px rgba(0,0,0,0.15)',
            px: 2,
            height: 48,
            width: '100%',
          }}
        >
          <InputBase
            placeholder="إبحث عن معلم أو مادة.."
            sx={{ flex: 1, fontSize: 16 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Button onClick={handleSearch}>
            <SearchIcon sx={{ color: '#40A2E3', fontSize: 26 }} />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 1.3,
            mt: 1,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
            scrollbarWidth: 'thin',
          }}
        >
          {subjects.map((subject) => (
            <Box
              key={subject.id}
              onClick={() => handleSelectSubject(subject.id)}
              sx={{
                px: 3,
                py: 0.8,
                borderRadius: '18px',
                border: '1px solid #e0e0e0',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                bgcolor: subject.id === currentSubjectId ? '#40A2E3' : '#fff',
                color: subject.id === currentSubjectId ? '#fff' : '#637381',
                fontWeight: 500,
                fontSize: 15,
                transition: '0.2s',
              }}
            >
              {subject.name}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
