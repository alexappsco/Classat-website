'use client';
import React, { useState } from 'react';
import Image from 'src/components/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Grid,
  Card,
  Radio,
  Button,
  Avatar,
  Divider,
  TextField,
  Container,
  Typography,
  IconButton,
} from '@mui/material';

import SuccessPurchaseDialog from './successPurchaseDialog';

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
    return cartItems
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2);
  };

  return (
    <Container
      sx={{
        py: { xs: 12, md: 10 },
        px: { xs: 1, sm: 1 },
      }}
    >
      <Box dir="rtl" >
        <Grid
          container
          spacing={4}
          sx={{ maxWidth: 1200, mx: 'auto' }}
        >
          {/* LEFT SIDE */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              إتمام الدفع
            </Typography>

            {/* PAYMENT METHODS */}
            {[
              { id: 'master', img: '/assets/courses/icons/visa_mastercard.svg' },
              { id: 'paypal', img: '/assets/courses/icons/paypal.svg' },
              { id: 'apple', img: '/assets/courses/icons/apple_pay.svg' },
            ].map((method) => (
              <Card
                key={method.id}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  mb: 2,
                  cursor: 'pointer',
                  border:
                    selectedMethod === method.id
                      ? '2px solid #00bcd4'
                      : '1px solid #ddd',
                  transition: '0.2s',
                  '&:hover': { boxShadow: 3 },
                }}
                onClick={() => setSelectedMethod(method.id)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Radio checked={selectedMethod === method.id} />
                  <Image src={method.img} />
                </Box>
              </Card>
            ))}

            {/* COUPON */}
            <Typography
              fontWeight={600}
              sx={{
                mt: { xs: 3, md: 4 },
                mb: 1,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              كوبون خصم
            </Typography>

            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                placeholder="كود الخصم"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: { xs: 48, md: 52 },
                  },
                }}
              />

              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                boxShadow: 2,
                position: { xs: 'relative', md: 'sticky' },
                top: { md: 20 },
              }}
            >
              <Typography
                fontWeight={700}
                sx={{
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: 16, md: 18 },
                }}
              >
                لديك {cartItems.length} دورات
              </Typography>

              {/* CART ITEMS */}
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: { xs: '100%', sm: 130 },
                        height: { xs: 160, sm: 95 },
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: { xs: 14, md: 16 } }}
                      >
                        {item.title}
                      </Typography>

                      <Box
                        sx={{
                          mt: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        {/* Instructor */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Avatar sx={{ width: 34, height: 34 }}>
                            <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
                          </Avatar>

                          <Typography
                            color="gray"
                            sx={{ fontSize: { xs: 13, md: 14 } }}
                          >
                            {item.instructor}
                          </Typography>
                        </Box>

                        {/* Price */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              textDecoration: 'line-through',
                              color: 'gray',
                              fontSize: { xs: 12, md: 14 },
                            }}
                          >
                            ${item.originalPrice}
                          </Typography>

                          <Typography
                            fontWeight={700}
                            sx={{
                              color: '#54B0D7',
                              fontSize: { xs: 15, md: 17 },
                            }}
                          >
                            ${item.price}
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
                sx={{ mb: 2, fontSize: { xs: 15, md: 17 } }}
              >
                تفاصيل الدفع
              </Typography>

              {/* STATIC PAYMENT FEES */}
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                    fontSize: { xs: 13, md: 14 },
                  }}
                >
                  <Typography color="gray">
                    تثبيت رسوم الضيف
                  </Typography>
                  <Typography fontWeight={500}>150 درهم</Typography>
                </Box>
              ))}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography color="gray">ضريبة القيمة المضافة</Typography>
                <Typography fontWeight={500}>94 درهم</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography color="gray">خصم</Typography>
                <Typography sx={{ color: 'green' }}>0 درهم</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="gray">الإجمالي</Typography>
                <Typography fontWeight={600}>495 درهم</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Typography fontWeight={700}>
                  الإجمالي بعد الخصم
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ color: '#54B0D7' }}
                >
                  ${calculateTotal()}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#00bcd4',
                  py: { xs: 1.2, md: 1.4 },
                  fontSize: { xs: 14, md: 16 },
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
    </Container>
  );
}
