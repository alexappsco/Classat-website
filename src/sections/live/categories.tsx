'use client';

import { primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Stack, Container, Typography } from '@mui/material';

import Live from 'public/assets/courses/icons/live.svg';
import Person from 'public/assets/courses/icons/person.svg';

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  const smDown = useResponsive('down', 'sm');
  const mdDown = useResponsive('down', 'md');

  const categories = [
    { label: 'مباشرة الآن', icon: Live },
    { label: 'جلسات فردية', icon: Person },
  ];

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 3, md: 4, lg: 5, xl: 6 },
        px: { xs: 0.5, sm: 1, md: 0, lg: 2, xl: 2 },
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '23px',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <Container>
        <Stack>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              justifyContent: smDown ? 'flex-start' : 'center',
              gap: { xs: 2, sm: 3, md: 4, lg: 6 },
              scrollSnapType: 'x mandatory',
              '& > *': { scrollSnapAlign: 'center' },
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
              scrollbarWidth: 'thin',
              scrollbarColor: '#ccc transparent',
            }}
          >
            {categories.map((category, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1.2}
                onClick={() => setSelectedCategory(category.label)}
                sx={{
                  cursor: 'pointer',
                  borderBottom: selectedCategory === category.label ? '3px solid #FFBB7A' : 'none',
                  pb: 0.5,
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: smDown ? 20 : 24,
                    height: smDown ? 20 : 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    top: '5px',
                  }}
                >
                  <category.icon
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: selectedCategory === category.label ? 1 : 0.5,
                    }}
                  />
                </Box>

                <Typography
                  variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
                  sx={{
                    fontWeight: 500,
                    color: selectedCategory === category.label ? '#000' : '#637381',
                    transition: 'color 0.3s',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.1,
                  }}
                >
                  {category.label}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
