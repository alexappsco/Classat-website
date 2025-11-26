'use client';

import { primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { Box, Stack, Container, Typography } from "@mui/material";

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Categories({ selectedCategory, setSelectedCategory }: CategoriesProps) {
  const smDown = useResponsive('down', 'sm');
  const mdDown = useResponsive('down', 'md');

  const categories = [
    "مباشرة الآن",
    "جلسات فردية"
  ];

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 3, md: 4, lg: 5, xl: 6 },
        px: { xs: 1, sm: 1, md: 0, lg: 5, xl: 6 },
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
              '& > *': {
                scrollSnapAlign: 'center',
              },
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
              scrollbarWidth: 'thin',
              scrollbarColor: '#ccc transparent',
            }}
          >
            {categories.map((category, index) => (
              <Typography
                key={index}
                variant={
                  smDown ? 'h6' : mdDown ? 'h5' : 'h4'
                }
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: selectedCategory === category ? '#000' : '#637381',
                  borderBottom: selectedCategory === category ? '3px solid #FFBB7A' : 'none',
                  pb: 0.5,
                  transition: 'color 0.3s, border-bottom 0.3s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
