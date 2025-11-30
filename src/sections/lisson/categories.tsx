// import { primary } from 'src/theme/palette';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { Box, Stack, Container, Typography } from "@mui/material";

// export default function Categories() {
//   const primaryTextColor = primary.dark;
//   const smDown = useResponsive('down', 'sm');

//   const categories = [
//     "برمجة التطبيقات",
//     "تكنولوجيا المعلومات",
//     "التصميم",
//     "التسويق",
//     "إدارة الأعمال",
//     "اللغات",
//     "الفن"
//   ];

//   return (
//     <Box sx={{
//         py: { xs: 1, md: 1.4 },
//         px: { xs: 1, md: 2 },
//         // mx: { xs: 5, md: 3},
//         // border: '1px solid #ccc',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//         borderRadius: '23px',
//         backgroundColor: '#fff',
//         maxWidth: 1300,
//         // mx: 'auto',
//         textAlign: 'center',
//       }}>
//       <Container>
//         <Stack spacing={2}>

//           <Typography variant="h4" sx={{ fontWeight: 600, color: primaryTextColor, textAlign: 'start' }}>
//             الفئات
//           </Typography>

//           <Box
//             sx={{
//               display: 'flex',
//               overflowX: 'auto',
//               justifyContent: 'center',
//               gap: 2,
//               // px: 1,
//               '&::-webkit-scrollbar': {
//                 height: '8px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#ccc',
//                 borderRadius: '4px',
//               },
//               scrollbarWidth: 'thin',
//               scrollbarColor: '#ccc transparent',
//             }}
//           >
//             {categories.map((category, index) => (
//               <Typography
//                 key={index}
//                 variant="h4"
//                 sx={{
//                   borderRadius: '25px',
//                   textAlign: 'center',
//                   px: 2,
//                   py: 0.5,
//                   fontWeight: 500,
//                   cursor: 'pointer',
//                   color: '#637381',
//                   backgroundColor: '#FCFCFC',
//                   border: '.5px solid #eaeaea',
//                   whiteSpace: 'nowrap',
//                   '&:hover': { backgroundColor: '#e0e0e0' },
//                   flexShrink: 0,
//                 }}
//               >
//                 {category}
//               </Typography>
//             ))}
//           </Box>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }

import { Box, Stack, Container, Typography, Card, Icon } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LanguageIcon from '@mui/icons-material/Language';
import CalculateIcon from '@mui/icons-material/Calculate';
import BrushIcon from '@mui/icons-material/Brush';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PublicIcon from '@mui/icons-material/Public';

export default function CategoriesClasse() {
  const categories = [
    { name: 'اللغة العربية', icon: '/assets/icons/categories/arbic.svg' },
    { name: 'التربية الاسلامية', icon: '/assets/icons/categories/Vector.svg' },
    { name: 'الرياضيات', icon: '/assets/icons/categories/proicons_math.svg' },
    { name: 'الجغرافيا', icon: '/assets/icons/categories/gis_globe-earth.svg' },
    { name: 'علوم الحاسب', icon: '/assets/icons/categories/hugeicons_computer-programming-01.svg' },
    { name: 'العلوم', icon: '/assets/icons/categories/emojione-monotone_atom-symbol.svg' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: { xs: 'nowrap', md: 'wrap' }, // موبايل NO-WRAP —> Scroll
        overflowX: { xs: 'auto', md: 'visible' }, // Scroll في الموبايل فقط
        scrollSnapType: { xs: 'x mandatory', md: 'none' },
        pb: { xs: 1, md: 0 },
        '& > *': {
          scrollSnapAlign: { xs: 'start', md: 'none' },
          flex: { xs: '0 0 150px', md: '1 1 auto' }, // عرض ثابت للكارت في الموبايل
        },
        '&::-webkit-scrollbar': {
          height: 6,
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#bdbdbd',
          borderRadius: 4,
        },
      }}
    >
      {categories.map((cat, index) => (
        <Card
          key={index}
          sx={{
            width: 150,
            py: 2,
            borderRadius: '18px',
            textAlign: 'center',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #E5E8EB',
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Box>
            <img
              src={cat.icon}
              alt="icon"
              style={{ width: 50, height: '30px', marginBottom: 10 }}
            />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#1C3F60' }}>
            {cat.name}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
