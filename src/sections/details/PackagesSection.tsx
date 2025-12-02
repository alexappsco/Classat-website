import { Box, Container, MenuItem, Select, Stack } from '@mui/material';
import PackageCard from './PackageCard';

export function PackagesSection() {
    const packages = [
      {
        title: 'الفصل الدراسي الأول (3 أشهر)',
        descriptionLine1: 'يشمل جميع دروس الصف الثالث',
        descriptionLine2: 'من 1 سبتمبر إلى 30 نوفمبر',
        hoursLabel: 'عدد الساعات: ٢',
        price: '150',
        discountText: 'وفر %10',
      },
      {
        title: 'الفصل الدراسي الثاني (3 أشهر)',
        descriptionLine1: 'يشمل جميع دروس الصف الثالث',
        descriptionLine2: 'من 1 ديسمبر إلى 28 فبراير',
        hoursLabel: 'عدد الساعات: ٢',
        price: '150',
        discountText: 'وفر %10',
      },
      {
        title: 'الفصل الدراسي الثالث (3 أشهر)',
        descriptionLine1: 'يشمل جميع دروس الصف الثالث',
        descriptionLine2: 'من 1 مارس إلى 31 مايو',
        hoursLabel: 'عدد الساعات: ٢',
        price: '150',
        discountText: 'وفر %10',
      },
    ];
  
    return (
        <Box>

        <Container>

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
            {['الصف الثالث','المرحلة الايتدائية'].map((item, idx) => (
                <Select
              key={idx}
              defaultValue={item}
                variant="outlined"
                sx={{
                    borderRadius: '50px',
                  height: { xs: 40, md: 48 },
                  minWidth: { xs: 120, md: 140 + idx * 10 },
                  px: 1,
                  '& fieldset': { border: 'none' },
                  bgcolor: '#fff',
                  boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                <MenuItem value={item}>{item}</MenuItem>
              </Select>
            ))}
  
            {/* Search Input */}
       
          </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        justifyContent="space-between"
        alignItems="stretch"
        >
        
        {packages.map((pkg,id) => (
          <Box key={id} sx={{ flex: 1 }}>
            <PackageCard {...pkg} />
          </Box>
        ))}
      </Stack>
        </Container>
        </Box>
    );
  }