'use client';

import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Grid2,
  TextField,
  IconButton,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  Box,
  Chip,
  Button,
  Typography,
  Container,
  Card,
} from '@mui/material';

// Sort options based on Swagger
const SORT_OPTIONS = [
  { name: 'الأعلى تقييماً', value: 'HighestRating' },
  { name: 'الأقل تقييماً', value: 'LowestRating' },
  { name: 'الأعلى سعراً', value: 'HighestPrice' },
  { name: 'الأقل سعراً', value: 'LowestPrice' },
  { name: 'الأعلى مبيعات', value: 'HighestSales' },
  { name: 'الأقل مبيعات', value: 'LowestSales' },
];

// Enrolled options
const ENROLLED_OPTIONS = [
  { name: 'الكل', value: '' },
  { name: 'مسجل', value: 'true' },
  { name: 'غير مسجل', value: 'false' },
];

// Price options
const PRICE_OPTIONS = [
  { name: 'السعر', value: 'all' },
  { name: 'مجاني', value: '0' },
  { name: 'أقل من 100 درهم', value: '0-100' },
  { name: '100 - 300 درهم', value: '100-300' },
  { name: '300 - 500 درهم', value: '300-500' },
  { name: 'أكثر من 500 درهم', value: '500-1000' },
];

// Duration options
const DURATION_OPTIONS = [
  { name: 'المدة', value: 'all' },
  { name: 'أقل من ساعة', value: '0-60' },
  { name: '1 - 3 ساعات', value: '60-180' },
  { name: '3 - 6 ساعات', value: '180-360' },
  { name: 'أكثر من 6 ساعات', value: '360-1000' },
];

// Rating options
const RATING_OPTIONS = [
  { name: 'التقييم', value: 'all' },
  { name: '4 نجوم فأكثر', value: '4-5' },
  { name: '3 نجوم فأكثر', value: '3-5' },
  { name: 'نجمتين فأكثر', value: '2-5' },
  { name: 'نجمة فأكثر', value: '1-5' },
];

interface CoursesFilterProps {
  categories?: Array<{ id: string; name: string }>;
}

export default function CoursesFilter({ categories = [] }: CoursesFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values from URL
  const [search, setSearch] = useState(searchParams.get('Title') || '');
  const [categoryId, setCategoryId] = useState(searchParams.get('CourseCategoryId') || '');
  const [sortType, setSortType] = useState(searchParams.get('SortType') || '');
  const [isEnrolled, setIsEnrolled] = useState(searchParams.get('IsEnrolled') || '');

  // Price state
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('PriceFrom')) || 0,
    Number(searchParams.get('PriceTo')) || 1000,
  ]);

  // Duration state
  const [durationRange, setDurationRange] = useState<[number, number]>([
    Number(searchParams.get('DurationFrom')) || 0,
    Number(searchParams.get('DurationTo')) || 1000,
  ]);

  // Rating state
  const [ratingRange, setRatingRange] = useState<[number, number]>([
    Number(searchParams.get('RatingFrom')) || 0,
    Number(searchParams.get('RatingTo')) || 5,
  ]);

  const [debouncedSearch] = useDebounce(search, 2000);

  // Update URL with new params
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Always reset to page 1 when filters change
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle search debounce
  useEffect(() => {
    if (debouncedSearch !== searchParams.get('Title')) {
      updateUrl({ Title: debouncedSearch || null });
    }
  }, [debouncedSearch]);

  // Handle price change
  const handlePriceChange = (value: string) => {
    if (value === 'all') {
      updateUrl({ PriceFrom: null, PriceTo: null });
      setPriceRange([0, 1000]);
    } else if (value === '0') {
      updateUrl({ PriceFrom: '0', PriceTo: '0' });
      setPriceRange([0, 0]);
    } else if (value.includes('-')) {
      const [min, max] = value.split('-');
      updateUrl({ PriceFrom: min, PriceTo: max });
      setPriceRange([Number(min), Number(max)]);
    }
  };

  // Handle duration change
  const handleDurationChange = (value: string) => {
    if (value === 'all') {
      updateUrl({ DurationFrom: null, DurationTo: null });
      setDurationRange([0, 1000]);
    } else if (value.includes('-')) {
      const [min, max] = value.split('-');
      updateUrl({ DurationFrom: min, DurationTo: max });
      setDurationRange([Number(min), Number(max)]);
    }
  };

  // Handle rating change
  const handleRatingChange = (value: string) => {
    if (value === 'all') {
      updateUrl({ RatingFrom: null, RatingTo: null });
      setRatingRange([0, 5]);
    } else if (value.includes('-')) {
      const [min, max] = value.split('-');
      updateUrl({ RatingFrom: min, RatingTo: max });
      setRatingRange([Number(min), Number(max)]);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setCategoryId('');
    setSortType('');
    setIsEnrolled('');
    setPriceRange([0, 1000]);
    setDurationRange([0, 1000]);
    setRatingRange([0, 5]);

    router.push(pathname);
  };

  // Get current price value for select
  const getCurrentPriceValue = () => {
    const from = searchParams.get('PriceFrom');
    const to = searchParams.get('PriceTo');
    if (!from && !to) return 'all';
    if (from === '0' && to === '0') return '0';
    if (from && to) return `${from}-${to}`;
    return 'all';
  };

  // Get current duration value for select
  const getCurrentDurationValue = () => {
    const from = searchParams.get('DurationFrom');
    const to = searchParams.get('DurationTo');
    if (!from && !to) return 'all';
    if (from && to) return `${from}-${to}`;
    return 'all';
  };

  // Get current rating value for select
  const getCurrentRatingValue = () => {
    const from = searchParams.get('RatingFrom');
    const to = searchParams.get('RatingTo');
    if (!from && !to) return 'all';
    if (from && to) return `${from}-${to}`;
    return 'all';
  };

  // Count active filters
  const activeFiltersCount = [
    search,
    categoryId,
    sortType,
    isEnrolled,
    searchParams.get('PriceFrom') || searchParams.get('PriceTo'),
    searchParams.get('DurationFrom') || searchParams.get('DurationTo'),
    searchParams.get('RatingFrom') || searchParams.get('RatingTo'),
  ].filter(Boolean).length;

  return (
    <Container sx={{ width: '100%', mt: 6 }}>
      {/* <Card sx={{ p: 3 }}> */}
        <Box sx={{ width: '100%' }}>
          <Grid2 container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid2 size={{ xs: 12, md: 2.5 }}>
              <TextField
                variant="outlined"
                placeholder="إبحث عن كورس أو مدرب..."
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    bgcolor: '#fff',
                    boxShadow: '0 0 6px rgba(0,0,0,0.12)',
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <IconButton sx={{ color: '#54B0D7' }}>🔍</IconButton>
                    ),
                    endAdornment: search ? (
                      <IconButton onClick={() => setSearch('')} size="small">
                        ✕
                      </IconButton>
                    ) : null,
                  },
                }}
              />
            </Grid2>

            {/* Category Filter */}
            {/* <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    updateUrl({ CourseCategoryId: e.target.value || null });
                  }}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  <MenuItem value="">التصنيف</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2> */}

            {/* Price Filter */}
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={getCurrentPriceValue()}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  {PRICE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Duration Filter */}
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={getCurrentDurationValue()}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  {DURATION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Rating Filter */}
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={getCurrentRatingValue()}
                  onChange={(e) => handleRatingChange(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  {RATING_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Enrolled Filter */}
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={isEnrolled}
                  onChange={(e) => {
                    setIsEnrolled(e.target.value);
                    updateUrl({ IsEnrolled: e.target.value || null });
                  }}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  {ENROLLED_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Sort Filter */}
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <FormControl fullWidth>
                <Select
                  value={sortType}
                  onChange={(e) => {
                    setSortType(e.target.value);
                    updateUrl({ SortType: e.target.value || null });
                  }}
                  displayEmpty
                  sx={{
                    borderRadius: '50px',
                    height: 48,
                    bgcolor: '#fff',
                    boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  }}
                >
                  <MenuItem value="">ترتيب</MenuItem>
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                الفلاتر النشطة:
              </Typography>

              {search && (
                <Chip
                  label={`بحث: ${search}`}
                  onDelete={() => {
                    setSearch('');
                    updateUrl({ Title: null });
                  }}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {categoryId && categories.find(c => c.id === categoryId) && (
                <Chip
                  label={categories.find(c => c.id === categoryId)?.name}
                  onDelete={() => {
                    setCategoryId('');
                    updateUrl({ CourseCategoryId: null });
                  }}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {searchParams.get('PriceFrom') && (
                <Chip
                  label={`السعر: ${searchParams.get('PriceFrom')} - ${searchParams.get('PriceTo')} درهم`}
                  onDelete={() => handlePriceChange('all')}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {searchParams.get('DurationFrom') && (
                <Chip
                  label={`المدة: ${searchParams.get('DurationFrom')} - ${searchParams.get('DurationTo')} دقيقة`}
                  onDelete={() => handleDurationChange('all')}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {searchParams.get('RatingFrom') && (
                <Chip
                  label={`التقييم: ${searchParams.get('RatingFrom')} - ${searchParams.get('RatingTo')} نجوم`}
                  onDelete={() => handleRatingChange('all')}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {sortType && (
                <Chip
                  label={SORT_OPTIONS.find(opt => opt.value === sortType)?.name}
                  onDelete={() => {
                    setSortType('');
                    updateUrl({ SortType: null });
                  }}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              {isEnrolled && (
                <Chip
                  label={isEnrolled === 'true' ? 'مسجل' : 'غير مسجل'}
                  onDelete={() => {
                    setIsEnrolled('');
                    updateUrl({ IsEnrolled: null });
                  }}
                  size="small"
                  sx={{ borderRadius: '50px' }}
                />
              )}

              <Button size="small" onClick={handleClearFilters} sx={{ mr: 1 }}>
                مسح الكل
              </Button>
            </Box>
          )}
        </Box>
      {/* </Card> */}
    </Container>
  );
}