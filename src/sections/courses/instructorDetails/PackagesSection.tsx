import { Box, Stack, Container } from '@mui/material';

import PackageCard from './PackageCard';

export function PackagesSection() {
  const packages = [
    {
      title: 'الباقة المميزة',
      descriptionLine1: 'صلاحية لمدة 90 يومًا',
      hoursLabel: '12 ساعة تعليمية',
      price: '480',
      discountText: 'وفر %30',
    },
    {
      title: 'الباقة المتوسطة',
      descriptionLine1: 'الباقة المتوسطة',

      hoursLabel: '6 ساعات تعليمية',
      price: '270',
      discountText: 'وفر %20',
    },
    {
      title: 'الباقة الأساسية',
      descriptionLine1: 'صلاحية لمدة 30 يومًا',
      hoursLabel: '3 ساعات تعليمية',
      price: '150',
      discountText: 'وفر %10',
    },
  ];

  return (
    <Box>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems="stretch"
        >
          {packages.map((pkg, id) => (
            <Box key={id} sx={{ flex: 1 }}>
              <PackageCard {...pkg} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
