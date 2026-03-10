// // 'use client';

// // import { useDebounce } from 'use-debounce';
// // import { useState, useEffect } from 'react';
// // import { useQuery } from 'src/components/use-query';
// // import {
// //   Grid2,
// //   TextField,
// //   IconButton,
// //   Autocomplete,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Box,
// //   Chip,
// //   Button,
// //   Slider,
// //   Typography,
// //   Container,
// //   Card,
// // } from '@mui/material';
// // import { ICONS } from 'src/config-icons';

// // // Sort options
// // const SORT_OPTIONS = [
// //   { name: 'الأعلى تقييماً', value: 'HighestRating' },
// //   { name: 'الأقل تقييماً', value: 'LowestRating' },
// //   { name: 'الأعلى سعراً', value: 'HighestPrice' },
// //   { name: 'الأقل سعراً', value: 'LowestPrice' },
// //   { name: 'الأكثر مبيعاً', value: 'HighestSales' },
// //   { name: 'الأقل مبيعاً', value: 'LowestSales' },
// // ];

// // // Price options
// // const PRICE_OPTIONS = [
// //   { name: 'الكل', value: 'all' },
// //   { name: 'مجاني', value: '0' },
// //   { name: 'أقل من 100 درهم', value: '0-100' },
// //   { name: '100 - 300 درهم', value: '100-300' },
// //   { name: '300 - 500 درهم', value: '300-500' },
// //   { name: 'أكثر من 500 درهم', value: '500-1000' },
// // ];

// // // Nationality options
// // const NATIONALITY_OPTIONS = [
// //   { name: 'الكل', value: 'all' },
// //   { name: 'إماراتي', value: 'emirati' },
// //   { name: 'مصري', value: 'egyptian' },
// //   { name: 'سعودي', value: 'saudi' },
// // ];

// // // Enrolled options
// // const ENROLLED_OPTIONS = [
// //   { name: 'الكل', value: '' },
// //   { name: 'مسجل', value: 'true' },
// //   { name: 'غير مسجل', value: 'false' },
// // ];

// // interface CoursesFilterProps {
// //   categories?: Array<{ id: string; name: string }>;
// // }

// // export default function CoursesFilter({ categories = [] }: CoursesFilterProps) {
// //   const { values: queries, changeQueries } = useQuery(
// //     [
// //       'page',
// //       'limit',
// //       'CourseCategoryId',
// //       'SortType',
// //       'PriceFrom',
// //       'PriceTo',
// //       'DurationFrom',
// //       'DurationTo',
// //       'RatingFrom',
// //       'RatingTo',
// //       'Title',
// //       'IsEnrolled',
// //       'Sorting',
// //       'Nationality',
// //     ],
// //     true
// //   );

// //   // Search state with debounce
// //   const [search, setSearch] = useState(queries.Title || '');
// //   const [debouncedSearch] = useDebounce(search, 500);

// //   // Price range state
// //   const [priceRange, setPriceRange] = useState<[number, number]>([
// //     Number(queries.PriceFrom) || 0,
// //     Number(queries.PriceTo) || 1000,
// //   ]);

// //   // Selected values for dropdowns
// //   const selectedCategory = categories.find(c => c.id === queries.CourseCategoryId) || null;
// //   const selectedSort = SORT_OPTIONS.find(opt => opt.value === queries.SortType) || null;
// //   const selectedNationality = NATIONALITY_OPTIONS.find(opt => opt.value === queries.Nationality) || NATIONALITY_OPTIONS[0];
// //   const selectedEnrolled = ENROLLED_OPTIONS.find(opt => opt.value === queries.IsEnrolled) || ENROLLED_OPTIONS[0];

// //   // Handle search debounce
// //   useEffect(() => {
// //     if (debouncedSearch !== queries.Title) {
// //       changeQueries({ Title: debouncedSearch || undefined, page: '1' });
// //     }
// //   }, [debouncedSearch, queries.Title, changeQueries]);

// //   // Handle price range change
// //   const handlePriceChange = (_event: Event, newValue: number | number[]) => {
// //     setPriceRange(newValue as [number, number]);
// //   };

// //   const handlePriceChangeCommitted = () => {
// //     changeQueries({
// //       PriceFrom: priceRange[0].toString(),
// //       PriceTo: priceRange[1].toString(),
// //       page: '1',
// //     });
// //   };

// //   // Handle price preset
// //   const handlePricePreset = (preset: string) => {
// //     if (preset === 'all') {
// //       changeQueries({ PriceFrom: undefined, PriceTo: undefined, page: '1' });
// //       setPriceRange([0, 1000]);
// //     } else if (preset === '0') {
// //       changeQueries({ PriceFrom: '0', PriceTo: '0', page: '1' });
// //       setPriceRange([0, 0]);
// //     } else if (preset.includes('-')) {
// //       const [min, max] = preset.split('-').map(Number);
// //       changeQueries({ PriceFrom: min.toString(), PriceTo: max.toString(), page: '1' });
// //       setPriceRange([min, max]);
// //     }
// //   };

// //   // Clear all filters
// //   const handleClearFilters = () => {
// //     changeQueries({
// //       page: '1',
// //       CourseCategoryId: undefined,
// //       SortType: undefined,
// //       PriceFrom: undefined,
// //       PriceTo: undefined,
// //       DurationFrom: undefined,
// //       DurationTo: undefined,
// //       RatingFrom: undefined,
// //       RatingTo: undefined,
// //       Title: undefined,
// //       IsEnrolled: undefined,
// //       Sorting: undefined,
// //       Nationality: undefined,
// //     });
// //     setSearch('');
// //     setPriceRange([0, 1000]);
// //   };

// //   // Count active filters
// //   const activeFiltersCount = [
// //     queries.CourseCategoryId,
// //     queries.SortType,
// //     queries.PriceFrom || queries.PriceTo,
// //     queries.DurationFrom || queries.DurationTo,
// //     queries.RatingFrom || queries.RatingTo,
// //     queries.Title,
// //     queries.IsEnrolled,
// //     queries.Nationality && queries.Nationality !== 'all',
// //   ].filter(Boolean).length;

// //   return (
// //     <Container sx={{ width: '100%' }}>

// //     <Card>
// //     <Box sx={{ width: '100%', mt: 8 }}>
// //       {/* Search and Filter Row */}
// //       <Grid2 container spacing={2} alignItems="center">
// //         {/* Search Input */}
// //         <Grid2 size={{ xs: 12, md: 4 }}>
// //           <TextField
// //             variant="outlined"
// //             placeholder="إبحث عن كورس أو مدرب..."
// //             fullWidth
// //             onChange={(e) => setSearch(e.target.value)}
// //             value={search}
// //             sx={{
// //               '& .MuiOutlinedInput-root': {
// //                 borderRadius: '50px',
// //                 bgcolor: '#fff',
// //                 boxShadow: '0 0 6px rgba(0,0,0,0.12)',
// //               },
// //             }}
// //             slotProps={{
// //               input: {
// //                 startAdornment: (
// //                   <IconButton sx={{ color: '#54B0D7' }}>
// //                     {/* <ICONS.global.search /> */}
// //                   </IconButton>
// //                 ),
// //                 endAdornment: search ? (
// //                   <IconButton onClick={() => setSearch('')} size="small">
// //                     {/* <ICONS.global.x /> */}
// //                   </IconButton>
// //                 ) : null,
// //               },
// //             }}
// //           />
// //         </Grid2>

// //         {/* Price Filter */}
// //         <Grid2 size={{ xs: 12, md: 3 }}>
// //           <FormControl fullWidth>
// //             <Select
// //               value={queries.PriceFrom && queries.PriceTo ? `${queries.PriceFrom}-${queries.PriceTo}` : 'all'}
// //               onChange={(e) => handlePricePreset(e.target.value)}
// //               displayEmpty
// //               sx={{
// //                 borderRadius: '50px',
// //                 height: 48,
// //                 bgcolor: '#fff',
// //                 boxShadow: '0 0 5px rgba(0,0,0,0.15)',
// //               }}
// //             >
// //               {PRICE_OPTIONS.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.name}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         </Grid2>

// //         {/* Nationality Filter */}
// //         <Grid2 size={{ xs: 12, md: 3 }}>
// //           <Autocomplete
// //             value={selectedNationality}
// //             options={NATIONALITY_OPTIONS}
// //             renderInput={(params) => (
// //               <TextField
// //                 {...params}
// //                 variant="outlined"
// //                 placeholder="جنسية المحاضر"
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: '50px',
// //                     bgcolor: '#fff',
// //                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
// //                   },
// //                 }}
// //               />
// //             )}
// //             getOptionLabel={(option) => option.name}
// //             onChange={(_, value) => {
// //               changeQueries({
// //                 Nationality: value?.value !== 'all' ? value?.value : undefined,
// //                 page: '1',
// //               });
// //             }}
// //             isOptionEqualToValue={(option, value) => option.value === value?.value}
// //           />
// //         </Grid2>

// //         {/* Sort Filter */}
// //         <Grid2 size={{ xs: 12, md: 2 }}>
// //           <Autocomplete
// //             value={selectedSort}
// //             options={SORT_OPTIONS}
// //             renderInput={(params) => (
// //               <TextField
// //                 {...params}
// //                 variant="outlined"
// //                 placeholder="ترتيب حسب"
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: '50px',
// //                     bgcolor: '#fff',
// //                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
// //                   },
// //                 }}
// //               />
// //             )}
// //             getOptionLabel={(option) => option.name}
// //             onChange={(_, value) => {
// //               changeQueries({ SortType: value?.value, page: '1' });
// //             }}
// //             isOptionEqualToValue={(option, value) => option.value === value?.value}
// //           />
// //         </Grid2>
// //       </Grid2>

// //       {/* Active Filters Tags */}
// //       {activeFiltersCount > 0 && (
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, alignItems: 'center' }}>
// //           <Typography variant="body2" color="text.secondary">
// //             الفلاتر النشطة:
// //           </Typography>

// //           {queries.Title && (
// //             <Chip
// //               label={`بحث: ${queries.Title}`}
// //               onDelete={() => {
// //                 changeQueries({ Title: undefined, page: '1' });
// //                 setSearch('');
// //               }}
// //               size="small"
// //               sx={{ borderRadius: '50px' }}
// //             />
// //           )}

// //           {queries.CourseCategoryId && categories.find(c => c.id === queries.CourseCategoryId) && (
// //             <Chip
// //               label={categories.find(c => c.id === queries.CourseCategoryId)?.name}
// //               onDelete={() => changeQueries({ CourseCategoryId: undefined, page: '1' })}
// //               size="small"
// //               sx={{ borderRadius: '50px' }}
// //             />
// //           )}

// //           {(queries.PriceFrom || queries.PriceTo) && (
// //             <Chip
// //               label={`السعر: ${queries.PriceFrom || 0} - ${queries.PriceTo || 1000} درهم`}
// //               onDelete={() => {
// //                 changeQueries({ PriceFrom: undefined, PriceTo: undefined, page: '1' });
// //                 setPriceRange([0, 1000]);
// //               }}
// //               size="small"
// //               sx={{ borderRadius: '50px' }}
// //             />
// //           )}

// //           {queries.Nationality && queries.Nationality !== 'all' && (
// //             <Chip
// //               label={NATIONALITY_OPTIONS.find(opt => opt.value === queries.Nationality)?.name || ''}
// //               onDelete={() => changeQueries({ Nationality: undefined, page: '1' })}
// //               size="small"
// //               sx={{ borderRadius: '50px' }}
// //             />
// //           )}

// //           {queries.SortType && (
// //             <Chip
// //               label={SORT_OPTIONS.find(opt => opt.value === queries.SortType)?.name || ''}
// //               onDelete={() => changeQueries({ SortType: undefined, page: '1' })}
// //               size="small"
// //               sx={{ borderRadius: '50px' }}
// //             />
// //           )}

// //           <Button size="small" onClick={handleClearFilters} sx={{ mr: 1 }}>
// //             مسح الكل
// //           </Button>
// //         </Box>
// //       )}
// //     </Box>

// //     </Card>
// //   </Container>

// //   );
// // }
// 'use client';

// import { useDebounce } from 'use-debounce';
// import { useState, useEffect } from 'react';
// import { useQuery } from 'src/components/use-query';
// import {
//   Grid2,
//   TextField,
//   IconButton,
//   Autocomplete,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   Chip,
//   Button,
//   Slider,
//   Typography,
//   Container,
//   Card,
// } from '@mui/material';
// import { ICONS } from 'src/config-icons';

// // Sort options based on Swagger
// const SORT_OPTIONS = [
//   { name: 'الأعلى تقييماً', value: 'HighestRating' },
//   { name: 'الأقل تقييماً', value: 'LowestRating' },
//   { name: 'الأعلى سعراً', value: 'HighestPrice' },
//   { name: 'الأقل سعراً', value: 'LowestPrice' },
// ];

// // Enrolled options based on Swagger (IsEnrolled is boolean)
// const ENROLLED_OPTIONS = [
//   { name: 'الكل', value: '' },
//   { name: 'مسجل', value: 'true' },
//   { name: 'غير مسجل', value: 'false' },
// ];

// // Duration options
// const DURATION_OPTIONS = [
//   { name: 'الكل', value: 'all' },
//   { name: 'أقل من ساعة', value: '0-60' },
//   { name: '1 - 3 ساعات', value: '60-180' },
//   { name: '3 - 6 ساعات', value: '180-360' },
//   { name: 'أكثر من 6 ساعات', value: '360-1000' },
// ];

// // Rating options
// const RATING_OPTIONS = [
//   { name: 'الكل', value: 'all' },
//   { name: '4 نجوم فأكثر', value: '4-5' },
//   { name: '3 نجوم فأكثر', value: '3-5' },
//   { name: 'نجمتين فأكثر', value: '2-5' },
//   { name: 'نجمة فأكثر', value: '1-5' },
// ];

// interface CoursesFilterProps {
//   categories?: Array<{ id: string; name: string }>;
// }

// export default function CoursesFilter({ categories = [] }: CoursesFilterProps) {
//   const { values: queries, changeQueries } = useQuery(
//     [
//       'page',
//       'limit',
//       'CourseCategoryId',
//       'SortType',
//       'PriceFrom',
//       'PriceTo',
//       'DurationFrom',
//       'DurationTo',
//       'RatingFrom',
//       'RatingTo',
//       'Title',
//       'IsEnrolled',
//     ],
//     true
//   );

//   // Search state with debounce
//   const [search, setSearch] = useState(queries.Title || '');
//   const [debouncedSearch] = useDebounce(search, 500);

//   // Price range state
//   const [priceRange, setPriceRange] = useState<[number, number]>([
//     Number(queries.PriceFrom) || 0,
//     Number(queries.PriceTo) || 1000,
//   ]);

//   // Duration range state
//   const [durationRange, setDurationRange] = useState<[number, number]>([
//     Number(queries.DurationFrom) || 0,
//     Number(queries.DurationTo) || 1000,
//   ]);

//   // Rating range state
//   const [ratingRange, setRatingRange] = useState<[number, number]>([
//     Number(queries.RatingFrom) || 0,
//     Number(queries.RatingTo) || 5,
//   ]);

//   // Selected values for dropdowns
//   const selectedCategory = categories.find(c => c.id === queries.CourseCategoryId) || null;
//   const selectedSort = SORT_OPTIONS.find(opt => opt.value === queries.SortType) || null;
//   const selectedEnrolled = ENROLLED_OPTIONS.find(opt => opt.value === queries.IsEnrolled) || ENROLLED_OPTIONS[0];

//   // Handle search debounce
//   useEffect(() => {
//     if (debouncedSearch !== queries.Title) {
//       changeQueries({ Title: debouncedSearch || undefined, page: '1' });
//     }
//   }, [debouncedSearch, queries.Title, changeQueries]);

//   // Handle price range change
//   const handlePriceChange = (_event: Event, newValue: number | number[]) => {
//     setPriceRange(newValue as [number, number]);
//   };

//   const handlePriceChangeCommitted = () => {
//     changeQueries({
//       PriceFrom: priceRange[0].toString(),
//       PriceTo: priceRange[1].toString(),
//       page: '1',
//     });
//   };

//   // Handle duration range change
//   const handleDurationChange = (_event: Event, newValue: number | number[]) => {
//     setDurationRange(newValue as [number, number]);
//   };

//   const handleDurationChangeCommitted = () => {
//     changeQueries({
//       DurationFrom: durationRange[0].toString(),
//       DurationTo: durationRange[1].toString(),
//       page: '1',
//     });
//   };

//   // Handle rating range change
//   const handleRatingChange = (_event: Event, newValue: number | number[]) => {
//     setRatingRange(newValue as [number, number]);
//   };

//   const handleRatingChangeCommitted = () => {
//     changeQueries({
//       RatingFrom: ratingRange[0].toString(),
//       RatingTo: ratingRange[1].toString(),
//       page: '1',
//     });
//   };

//   // Handle duration preset
//   const handleDurationPreset = (preset: string) => {
//     if (preset === 'all') {
//       changeQueries({ DurationFrom: undefined, DurationTo: undefined, page: '1' });
//       setDurationRange([0, 1000]);
//     } else if (preset.includes('-')) {
//       const [min, max] = preset.split('-').map(Number);
//       changeQueries({ DurationFrom: min.toString(), DurationTo: max.toString(), page: '1' });
//       setDurationRange([min, max]);
//     }
//   };

//   // Handle rating preset
//   const handleRatingPreset = (preset: string) => {
//     if (preset === 'all') {
//       changeQueries({ RatingFrom: undefined, RatingTo: undefined, page: '1' });
//       setRatingRange([0, 5]);
//     } else if (preset.includes('-')) {
//       const [min, max] = preset.split('-').map(Number);
//       changeQueries({ RatingFrom: min.toString(), RatingTo: max.toString(), page: '1' });
//       setRatingRange([min, max]);
//     }
//   };

//   // Clear all filters
//   const handleClearFilters = () => {
//     changeQueries({
//       page: '1',
//       CourseCategoryId: undefined,
//       SortType: undefined,
//       PriceFrom: undefined,
//       PriceTo: undefined,
//       DurationFrom: undefined,
//       DurationTo: undefined,
//       RatingFrom: undefined,
//       RatingTo: undefined,
//       Title: undefined,
//       IsEnrolled: undefined,
//     });
//     setSearch('');
//     setPriceRange([0, 1000]);
//     setDurationRange([0, 1000]);
//     setRatingRange([0, 5]);
//   };

//   // Count active filters
//   const activeFiltersCount = [
//     queries.CourseCategoryId,
//     queries.SortType,
//     queries.PriceFrom || queries.PriceTo,
//     queries.DurationFrom || queries.DurationTo,
//     queries.RatingFrom || queries.RatingTo,
//     queries.Title,
//     queries.IsEnrolled,
//   ].filter(Boolean).length;

//   return (
//     <Container sx={{ width: '100%' }}>
//       <Card sx={{ p: 3 }}>
//         <Box sx={{ width: '100%' }}>
//           {/* Search and Filter Row */}
//           <Grid2 container spacing={2} alignItems="center">
//             {/* Search Input */}
//             <Grid2 size={{ xs: 12, md: 3 }}>
//               <TextField
//                 variant="outlined"
//                 placeholder="إبحث عن كورس أو مدرب..."
//                 fullWidth
//                 onChange={(e) => setSearch(e.target.value)}
//                 value={search}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '50px',
//                     bgcolor: '#fff',
//                     boxShadow: '0 0 6px rgba(0,0,0,0.12)',
//                   },
//                 }}
//                 slotProps={{
//                   input: {
//                     startAdornment: (
//                       <IconButton sx={{ color: '#54B0D7' }}>
//                         🔍
//                       </IconButton>
//                     ),
//                     endAdornment: search ? (
//                       <IconButton onClick={() => setSearch('')} size="small">
//                         ✕
//                       </IconButton>
//                     ) : null,
//                   },
//                 }}
//               />
//             </Grid2>

//             {/* Category Filter */}
//             <Grid2 size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth>
//                 <Select
//                   value={queries.CourseCategoryId || ''}
//                   onChange={(e) => changeQueries({ CourseCategoryId: e.target.value || undefined, page: '1' })}
//                   displayEmpty
//                   sx={{
//                     borderRadius: '50px',
//                     height: 48,
//                     bgcolor: '#fff',
//                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                   }}
//                 >
//                   <MenuItem value="">كل التصنيفات</MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid2>

//             {/* Price Filter */}
//             <Grid2 size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth>
//                 <Select
//                   value={
//                     queries.PriceFrom !== undefined || queries.PriceTo !== undefined
//                       ? `${queries.PriceFrom || 0}-${queries.PriceTo || 1000}`
//                       : 'all'
//                   }
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === 'all') {
//                       changeQueries({ PriceFrom: undefined, PriceTo: undefined, page: '1' });
//                       setPriceRange([0, 1000]);
//                     } else if (value === '0') {
//                       changeQueries({ PriceFrom: '0', PriceTo: '0', page: '1' });
//                       setPriceRange([0, 0]);
//                     } else if (value.includes('-')) {
//                       const [min, max] = value.split('-').map(Number);
//                       changeQueries({ PriceFrom: min.toString(), PriceTo: max.toString(), page: '1' });
//                       setPriceRange([min, max]);
//                     }
//                   }}
//                   displayEmpty
//                   sx={{
//                     borderRadius: '50px',
//                     height: 48,
//                     bgcolor: '#fff',
//                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                   }}
//                 >
//                   <MenuItem value="all">السعر (الكل)</MenuItem>
//                   <MenuItem value="0">مجاني</MenuItem>
//                   <MenuItem value="0-100">أقل من 100 درهم</MenuItem>
//                   <MenuItem value="100-300">100 - 300 درهم</MenuItem>
//                   <MenuItem value="300-500">300 - 500 درهم</MenuItem>
//                   <MenuItem value="500-1000">أكثر من 500 درهم</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid2>

//             {/* Duration Filter */}
//             <Grid2 size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth>
//                 <Select
//                   value={
//                     queries.DurationFrom !== undefined || queries.DurationTo !== undefined
//                       ? `${queries.DurationFrom || 0}-${queries.DurationTo || 1000}`
//                       : 'all'
//                   }
//                   onChange={(e) => handleDurationPreset(e.target.value)}
//                   displayEmpty
//                   sx={{
//                     borderRadius: '50px',
//                     height: 48,
//                     bgcolor: '#fff',
//                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                   }}
//                 >
//                   {DURATION_OPTIONS.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid2>

//             {/* Rating Filter */}
//             <Grid2 size={{ xs: 12, md: 2 }}>
//               <FormControl fullWidth>
//                 <Select
//                   value={
//                     queries.RatingFrom !== undefined || queries.RatingTo !== undefined
//                       ? `${queries.RatingFrom || 0}-${queries.RatingTo || 5}`
//                       : 'all'
//                   }
//                   onChange={(e) => handleRatingPreset(e.target.value)}
//                   displayEmpty
//                   sx={{
//                     borderRadius: '50px',
//                     height: 48,
//                     bgcolor: '#fff',
//                     boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                   }}
//                 >
//                   {RATING_OPTIONS.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid2>

//             {/* Sort Filter */}
//             <Grid2 size={{ xs: 12, md: 1 }}>
//               <Autocomplete
//                 value={selectedSort}
//                 options={SORT_OPTIONS}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     variant="outlined"
//                     placeholder="ترتيب"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: '50px',
//                         bgcolor: '#fff',
//                         boxShadow: '0 0 5px rgba(0,0,0,0.15)',
//                       },
//                     }}
//                   />
//                 )}
//                 getOptionLabel={(option) => option.name}
//                 onChange={(_, value) => {
//                   changeQueries({ SortType: value?.value, page: '1' });
//                 }}
//                 isOptionEqualToValue={(option, value) => option.value === value?.value}
//               />
//             </Grid2>
//           </Grid2>

//           {/* Active Filters Tags */}
//           {activeFiltersCount > 0 && (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, alignItems: 'center' }}>
//               <Typography variant="body2" color="text.secondary">
//                 الفلاتر النشطة:
//               </Typography>

//               {queries.Title && (
//                 <Chip
//                   label={`بحث: ${queries.Title}`}
//                   onDelete={() => {
//                     changeQueries({ Title: undefined, page: '1' });
//                     setSearch('');
//                   }}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {queries.CourseCategoryId && categories.find(c => c.id === queries.CourseCategoryId) && (
//                 <Chip
//                   label={categories.find(c => c.id === queries.CourseCategoryId)?.name}
//                   onDelete={() => changeQueries({ CourseCategoryId: undefined, page: '1' })}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {(queries.PriceFrom || queries.PriceTo) && (
//                 <Chip
//                   label={`السعر: ${queries.PriceFrom || 0} - ${queries.PriceTo || 1000} درهم`}
//                   onDelete={() => {
//                     changeQueries({ PriceFrom: undefined, PriceTo: undefined, page: '1' });
//                     setPriceRange([0, 1000]);
//                   }}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {(queries.DurationFrom || queries.DurationTo) && (
//                 <Chip
//                   label={`المدة: ${queries.DurationFrom || 0} - ${queries.DurationTo || 1000} دقيقة`}
//                   onDelete={() => {
//                     changeQueries({ DurationFrom: undefined, DurationTo: undefined, page: '1' });
//                     setDurationRange([0, 1000]);
//                   }}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {(queries.RatingFrom || queries.RatingTo) && (
//                 <Chip
//                   label={`التقييم: ${queries.RatingFrom || 0} - ${queries.RatingTo || 5} نجوم`}
//                   onDelete={() => {
//                     changeQueries({ RatingFrom: undefined, RatingTo: undefined, page: '1' });
//                     setRatingRange([0, 5]);
//                   }}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {queries.SortType && (
//                 <Chip
//                   label={SORT_OPTIONS.find(opt => opt.value === queries.SortType)?.name || ''}
//                   onDelete={() => changeQueries({ SortType: undefined, page: '1' })}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               {queries.IsEnrolled && (
//                 <Chip
//                   label={queries.IsEnrolled === 'true' ? 'مسجل' : 'غير مسجل'}
//                   onDelete={() => changeQueries({ IsEnrolled: undefined, page: '1' })}
//                   size="small"
//                   sx={{ borderRadius: '50px' }}
//                 />
//               )}

//               <Button size="small" onClick={handleClearFilters} sx={{ mr: 1 }}>
//                 مسح الكل
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Card>
//     </Container>
//   );
// }
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