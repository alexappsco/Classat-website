'use client'
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
  teacher_id:string;
  paymentList:any[];

};

import { Box, Grid, Container } from '@mui/material';

export function PackagesSection({ packages = [],teacher_id,paymentList }: Props) {
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
              xs={12}
              md={4}
            >
              <PackageCard
                title={pkg.name}
                hoursLabel={`عدد الساعات: ${pkg.hours}`}
                price={`${pkg.price}`}
                discountText={`وفر %${pkg.discountPercentage}`}
                descriptionLine1={`مدة الصلاحية: ${pkg.validityDays} يوم`}
                descriptionLine2=""
                id={pkg.id}
                teacher_id={teacher_id}
                paymentList={paymentList}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
