// src/sections/details/PackagesSection.tsx
import PackageCard from './PackageCard';

type Package = {
  id: string;
  name: string;
  hours: number;
  validityDays: number;
  price: number;
  discountPercentage: number;
};

type Props = {
  packages?: Package[]; // اجعلها optional
};

// export function PackagesSection({ packages = [] }: Props) {
//   if (!packages || packages.length === 0) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 6 }}>
//         لا توجد باقات متاحة حالياً.
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Container>
//         <Stack
//           direction={{ xs: 'column', md: 'row' }}
//           spacing={3}
//           justifyContent="space-between"
//           alignItems="stretch"
//         >
//           {packages.map((pkg) => (
//             <Box key={pkg.id} sx={{ flex: 1 }}>
//               <PackageCard
//                 title={pkg.name}
//                 hoursLabel={`عدد الساعات: ${pkg.hours}`}
//                 price={`${pkg.price}`}
//                 discountText={`وفر %${pkg.discountPercentage}`}
//                 descriptionLine1={`مدة الصلاحية: ${pkg.validityDays} يوم`}
//                 descriptionLine2=""
//               />
//             </Box>
//           ))}
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
import { Box, Container, Grid } from '@mui/material';

export function PackagesSection({ packages = [] }: Props) {
  if (!packages.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        لا توجد باقات متاحة حالياً.
      </Box>
    );
  }

  return (
     <Box>
      <Container>
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid
              key={pkg.id}
              item
              xs={12}   // 📱 موبايل: كارد واحد (مثل الآن)
              md={4}    // 🖥️ ديسكتوب: 3 كروت في الصف
            >
              <PackageCard
                title={pkg.name}
                hoursLabel={`عدد الساعات: ${pkg.hours}`}
                price={`${pkg.price}`}
                discountText={`وفر %${pkg.discountPercentage}`}
                descriptionLine1={`مدة الصلاحية: ${pkg.validityDays} يوم`}
                descriptionLine2=""
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

  {/**
    <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row-reverse' }}
            alignItems={{ xs: 'stretch', md: 'start' }}
            gap={2}
            justifyContent="start"
            dir="rtl"
            sx={{ width: '100%', my: 2 }}
            >
            {/* Dropdowns */}
            // {['الصف الثالث','المرحلة الايتدائية'].map((item, idx) => (
            //     <Select
            //   key={idx}
            //   defaultValue={item}
            //     variant="outlined"
            //     sx={{
            //         borderRadius: '50px',
            //       height: { xs: 40, md: 48 },
            //       minWidth: { xs: 120, md: 140 + idx * 10 },
            //       px: 1,
            //       '& fieldset': { border: 'none' },
            //       bgcolor: '#fff',
            //       boxShadow: '0 0 5px rgba(0,0,0,0.15)',
            //       fontSize: { xs: 14, md: 16 },
            //     }}
            //   >
            //     <MenuItem value={item}>{item}</MenuItem>
            //   </Select>
            // ))}
  
            {/* Search Input */}
       
          // </Box>
    
    // */}