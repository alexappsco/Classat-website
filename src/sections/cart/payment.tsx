'use client';
import React, { useState } from 'react';
import Image from 'src/components/image';
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Divider,
  Typography,
  Radio,
  TextField,
  IconButton,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SuccessPurchaseDialog from './successPurchaseDialog'
export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('master');
  const [openSuccess, setOpenSuccess] = useState(false);
    const handlePay = () => {
    setOpenSuccess(true);
  };
  const cartItems = [
    {
      id: 1,
      title: 'أساسيات تصميم المواقع والتطبيقات',
      instructor: 'د.خالد محمد',
      price: 32.0,
      originalPrice: 65.0,
      image: '/assets/courses/study.png',
    },
    {
      id: 2,
      title: 'أساسيات تصميم المواقع والتطبيقات',
      instructor: 'د.خالد محمد',
      price: 32.0,
      originalPrice: 65.0,
      image: '/assets/courses/study.png',
    },
    {
      id: 3,
      title: 'أساسيات تصميم المواقع والتطبيقات',
      instructor: 'د.خالد محمد',
      price: 32.0,
      originalPrice: 65.0,
      image: '/assets/courses/study.png',
    },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
       
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            إتمام الدفع
          </Typography>

          
          <Card sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={() => setSelectedMethod('master')}>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              <Radio checked={selectedMethod === 'master'} />
              <Image src="/assets/courses/icons/visa_mastercard.svg" />
            </Box>
          </Card>

          
          <Card sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={() => setSelectedMethod('paypal')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Radio checked={selectedMethod === 'paypal'} />
              <Image src="/assets/courses/icons/paypal.svg" />
            </Box>
          </Card>

          
          <Card sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={() => setSelectedMethod('apple')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Radio checked={selectedMethod === 'apple'} />
              <Image src="/assets/courses/icons/apple_pay.svg" />
            </Box>
          </Card>

          
          <Typography fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            كوبون خصم
          </Typography>

          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              fullWidth
              placeholder="كود الخصم"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            <IconButton
              sx={{
                position: 'absolute',
                right: 5,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </Grid>

       
        <Grid item xs={12} md={5}>
          <Card sx={{ boxShadow: 2, p: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              لديك {cartItems.length} دورات
            </Typography>

           
{cartItems.map((item) => (
  <Box
    key={item.id}
    sx={{
      mb: 2,
      pb: 1,
      borderBottom: '1px solid #eee',
    }}
  >
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: 120,
          height: 90,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{item.title}</Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: '#e0e0e0' }}>
              <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
            </Avatar>
            <Typography color="gray">{item.instructor}</Typography>
          </Box>

          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                textDecoration: 'line-through',
                color: 'gray',
                fontSize: 14,
              }}
            >
              ${item.originalPrice.toFixed(2)}
            </Typography>

            <Typography fontWeight={700} sx={{ color: '#54B0D7', fontSize: 16 }}>
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
))}


            <Divider sx={{ my: 2 }} />

            
<Typography
  variant="h6"
  fontWeight={700}
  sx={{ mb: 2, fontSize: 16 }}
>
  تفاصيل الدفع
</Typography>

{[1, 2, 3, 4].map((i) => (
  <Box
    key={i}
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mb: 1,
    }}
  >
    <Typography color="gray" sx={{ fontSize: 14 }}>
      تثبيت رسوم الضيف
    </Typography>
    <Typography fontWeight={500} sx={{ fontSize: 14 }}>
      150 درهم
    </Typography>
  </Box>
))}

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
  }}
>
  <Typography color="gray" sx={{ fontSize: 14 }}>
    ضريبة القيمة المضافة
  </Typography>
  <Typography fontWeight={500} sx={{ fontSize: 14 }}>
    94 درهم
  </Typography>
</Box>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
  }}
>
  <Typography color="gray" sx={{ fontSize: 14 }}>
    خصم
  </Typography>
  <Typography sx={{ color: 'green', fontSize: 14 }}>0 درهم</Typography>
</Box>

<Divider sx={{ my: 1.5 }} />

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb: 0.5,
  }}
>
  <Typography color="gray" sx={{ fontSize: 14 }}>
    الإجمالي
  </Typography>
  <Typography fontWeight={600} sx={{ fontSize: 15 }}>
    495 درهم
  </Typography>
</Box>

<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1,
  }}
>
  <Typography fontWeight={700} sx={{ fontSize: 15 }}>
    الإجمالي بعد الخصم
  </Typography>
  <Typography fontWeight={800} variant="h6" sx={{ fontSize: 18 }}>
    ${calculateTotal()}
  </Typography>
</Box>


            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#00bcd4',
                mt: 2,
                '&:hover': { backgroundColor: '#0097a7' },
              }}
              onClick={handlePay} 
            >
              إتمام الدفع
            </Button>
          </Card>
        </Grid>
      </Grid>
      <SuccessPurchaseDialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
      />
    </Box>
  );
}
