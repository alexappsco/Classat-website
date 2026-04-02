'use client';

import * as React from 'react';
import { Box, Pagination } from '@mui/material';

import Hero from '../Hero';
import InstructorsSection from './TopInstructorsSection';
import TeachersFilters from './filterTeacher';

import { StudentTeacherEducationItem } from 'src/types/teachers';
import { SubjectItem } from 'src/types/student';
import { useQuery } from 'src/components/use-query';

interface Props {
  subjects: SubjectItem[];
  teachers: StudentTeacherEducationItem[];
  totalCount: number;
}

export default function TopTeacher({
  subjects,
  teachers,
  totalCount,
}: Props) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const { values, setQueries } = useQuery(
    ['page'],
    false,
    false
  );

  const page = parseInt(values.page as string) || 1;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setQueries({ page: value.toString() });
  };

  return (
    <>
      {/* HERO + FILTER */}
      <Box sx={{ position: 'relative' }}>
        <Hero />

        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -20, md: -40 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '64%',
          }}
        >
          <TeachersFilters subjects={subjects} />
        </Box>
      </Box>

      {/* ONE SECTION ONLY - NO TITLE */}
      <InstructorsSection teachers={teachers} />

      {/* PAGINATION */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          showFirstButton
          showLastButton
          onChange={handlePageChange}
          color='info'
        />
      </Box>
    </>
  );
}
