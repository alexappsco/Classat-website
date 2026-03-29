 'use client';

import { primary } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Stack, Container, Typography } from '@mui/material';

// ===== Types =====
type CourseCategory = {
  id: string;
  name: string;
  logo?: string;
};

type Props = {
  categories: CourseCategory[];
};

export default function Categories({ categories }: Props) {
  const primaryTextColor = primary.dark;
  const smDown = useResponsive('down', 'sm');
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⭐ Active Category
  const activeCategoryId = searchParams.get('categoryId');

  const handleCategoryClick = (id: string) => {
    // If id is empty string, it clears the filter
    router.push(`/ar/courses/all?categoryId=${id}`);
  };

  // Shared styles for the category items
  const getItemStyles = (isActive: boolean) => ({
    borderRadius: '25px',
    textAlign: 'center',
    px: 4,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    color: isActive ? '#fff' : '#637381',
    backgroundColor: isActive ? primary.main : '#FCFCFC',
    border: isActive ? `1px solid ${primary.main}` : '.5px solid #eaeaea',
    '&:hover': {
      backgroundColor: isActive ? primary.dark : '#e0e0e0',
    },
  });

  return (
    <Box
      sx={{
        py: { xs: 1, md: 1.4 },
        px: { xs: 1, md: 0 },
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '23px',
        backgroundColor: '#fff',
        maxWidth: 1330,
        textAlign: 'center',
      }}
    >
      <Container>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: primaryTextColor,
              textAlign: 'start',
            }}
          >
            الفئات
          </Typography>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              justifyContent: 'center',
              gap: 1,
              px: 0,
            }}
          >
            {/* --- "All" Category Button --- */}
            <Typography
              variant="h4"
              onClick={() => handleCategoryClick('')}
              sx={getItemStyles(!activeCategoryId || activeCategoryId === '')}
            >
              الكل
            </Typography>

            {/* --- Dynamic Categories --- */}
            {categories.map((category) => {
              const isActive = activeCategoryId === category.id;

              return (
                <Typography
                  key={category.id}
                  variant="h4"
                  onClick={() => handleCategoryClick(category.id)}
                  sx={getItemStyles(isActive)}
                >
                  {category.name}
                </Typography>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}