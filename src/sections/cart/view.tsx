'use client';
import React, { useState } from 'react';
import Image from 'src/components/image';
import Pin from 'public/assets/courses/icons/bin.svg';
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Divider,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import Payment from './payment';
import Link from 'next/link';


export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
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
  ]);

  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
        
        <Grid item xs={12} md={8}>
          
          <Box sx={{ mb: 3, maxWidth: 710, pb: 1 }}>
  <Typography variant="h4" fontWeight={700}>
    السلة
  </Typography>

  <Typography color="gray">
    لديك {cartItems.length} دورات في السلة
  </Typography>

  <Divider sx={{ mt: 2, borderColor: '#ddd' }} />
</Box>


          
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 3,
                maxWidth: 710,
                border: '1px solid #87878738',
                boxShadow: 4,
                transition: '0.2s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 160,
                      height: 130,
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 1,
                      }}
                    >
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'gray' }}>
                        <Avatar sx={{ bgcolor: '#e0e0e0', color: '#666', fontWeight: 600 }}>
                          <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
                        </Avatar>
                        <Typography>{item.instructor}</Typography>
                      </Box>

                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>
                          ${item.originalPrice.toFixed(2)}
                        </Typography>
                        <Typography sx={{ color: '#54B0D7', fontWeight: 700 }} variant="h6">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>

                      
                      <IconButton color="error" onClick={() => handleDelete(item.id)}>
                        <Pin />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 2, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                تفاصيل الدفع
              </Typography>

              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    fontSize: 14,
                  }}
                >
                  <Typography color="gray">تثبيت رسوم الضيف</Typography>
                  <Typography fontWeight={500}>150 درهم</Typography>
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="gray">ضريبة القيمة المضافة</Typography>
                <Typography fontWeight={500}>94 درهم</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="gray">خصم</Typography>
                <Typography sx={{ color: 'green', fontWeight: 500 }}>0 درهم</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="gray">الإجمالي</Typography>
                <Typography fontWeight={600}>495 درهم</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography fontWeight={700}>الإجمالي بعد الخصم</Typography>
                <Typography fontWeight={800} variant="h5">
                  ${calculateTotal()}
                </Typography>
              </Box>
              <Link href="/ar/cart/payment/" passHref>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#00bcd4',
                  mt: 2,
                  '&:hover': { backgroundColor: '#0097a7' },
                }}
              >
                إتمام الدفع
              </Button>
              </Link>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: '#ddd',
                  color: '#00bcd4',
                  '&:hover': { borderColor: '#00bcd4' },
                }}
              >
                متابعة التسوق
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Payment />
    </Box>
  );
}
