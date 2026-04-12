'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  InputBase,
  Button,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'src/components/use-query';
import { useDebounce } from 'use-debounce';
import { SubjectItem } from 'src/types/student';
import { useTranslations } from 'next-intl';

export default function TeachersFilters({
  subjects,
}: {
  subjects: SubjectItem[];
}) {
  const { values, setQueries } = useQuery(
    ['page', 'search', 'rate_from', 'rate_to', 'subject'],
    false,
    false
  );

  const t = useTranslations('Pages.TopTeachers');

  const [search, setSearch] = useState(values.search || '');
  const [searchValue] = useDebounce(search, 500);

  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    values.subject || null
  );

  const [rateFrom, setRateFrom] = useState(values.rate_from || '');
  const [rateTo, setRateTo] = useState(values.rate_to || '');

  useEffect(() => {
    setQueries({
      ...values,
      search: searchValue || null,
      page: '1',
    });
  }, [searchValue]);

  useEffect(() => {
    setQueries({
      ...values,
      subject: selectedSubject || null,
      page: '1',
    });
  }, [selectedSubject]);

  useEffect(() => {
    setQueries({
      ...values,
      rate_from: rateFrom || null,
      rate_to: rateTo || null,
      page: '1',
    });
  }, [rateFrom, rateTo]);

  const handleRateChange = (
    value: string,
    setter: (val: string) => void
  ) => {
    if (
      value === '' ||
      (!isNaN(Number(value)) &&
        Number(value) >= 0 &&
        Number(value) <= 5)
    ) {
      setter(value);
    }
  };

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

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center',
            mb: 2,
          }}
        >
          {/*  SEARCH */}
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
            <InputBase
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 16 }}
            />
            <Button>
              <SearchIcon sx={{ color: '#40A2E3', fontSize: 26 }} />
            </Button>
          </Box>

          {/*  RATE FROM */}
          <Box
            sx={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '40px',
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
              px: 2,
              height: 48,
            }}
          >
            <InputBase
              placeholder={t('rateFrom')}
              value={rateFrom}
              onChange={(e) => handleRateChange(e.target.value, setRateFrom)}
              sx={{ width: '100%', fontSize: 14 }}
              inputProps={{ inputMode: 'decimal' }}
            />
          </Box>

          {/*  RATE TO */}
          <Box
            sx={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '40px',
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
              px: 2,
              height: 48,
            }}
          >
            <InputBase
              placeholder={t('rateTo')}
              value={rateTo}
              onChange={(e) => handleRateChange(e.target.value, setRateTo)}
              sx={{ width: '100%', fontSize: 14 }}
              inputProps={{ inputMode: 'decimal' }}
            />
          </Box>
        </Box>

        {/*  SUBJECTS */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 1.3,
            pt: 1,
            mt: 1,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: '4px',
            },
            scrollbarWidth: 'thin',
          }}
        >
          {/*  All option */}
          <Box
            onClick={() => setSelectedSubject(null)}
            sx={{
              px: 3,
              py: 0.8,
              borderRadius: '18px',
              border: '1px solid #e4e4e4',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              bgcolor: selectedSubject === null ? '#40A2E3' : '#fff',
              color: selectedSubject === null ? '#fff' : '#637381',
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            {t('allSubjects')}
          </Box>

          {subjects.map((subject) => (
            <Box
              key={subject.id}
              onClick={() =>
                setSelectedSubject(
                  selectedSubject === subject.id ? null : subject.id
                )
              }
              sx={{
                px: 3,
                py: 0.8,
                borderRadius: '18px',
                border: '1px solid #e4e4e4',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                bgcolor: selectedSubject === subject.id ? '#40A2E3' : '#fff',
                color: selectedSubject === subject.id ? '#fff' : '#637381',
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              {subject.educationSubjectName}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
