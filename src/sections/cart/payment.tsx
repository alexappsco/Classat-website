
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

// Interface matching your JSON structure
interface CartItem {
  cartItemId: string;
  itemType: string;
  title: string;
  imageUrl: string | null;
  price: number;
  rating: number | null;
  sessions: any[];
}

interface PaymentSummary {
  subTotal: number;
  vat: number;
  discount: number;
  total: number;
  totalAfterDiscount: number;
}

interface Props {
  items: {
    cartId: string;
    items: CartItem[];
    paymentSummary: PaymentSummary;
  };
}

export default function Payment({ items: data }: Props) {
  console.log("items",data);
  const [selectedMethod, setSelectedMethod] = useState('master');
  const [openSuccess, setOpenSuccess] = useState(false);

  const handlePay = () => {
    setOpenSuccess(true);
  };

  // Extract list and summary from props
  const cartItemsList = data?.items || [];
  const summary = data?.paymentSummary;

  return (
    <Container sx={{ py: { xs: 12, md: 10 }, px: { xs: 1, sm: 1 },mt:5 } }>
      <Box dir="rtl">
        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>

          {/* LEFT SIDE: Payment Methods & Coupon */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: { xs: 2, md: 3 } }}>
              إتمام الدفع
            </Typography>

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
                  border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #ddd',
                  transition: '0.2s',
                  '&:hover': { boxShadow: 3 },
                }}
                onClick={() => setSelectedMethod(method.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Radio checked={selectedMethod === method.id} />
                  <Image src={method.img} />
                </Box>
              </Card>
            ))}

            <Typography fontWeight={600} sx={{ mt: { xs: 3, md: 4 }, mb: 1, fontSize: { xs: 14, md: 16 } }}>
              كوبون خصم
            </Typography>

            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                placeholder="كود الخصم"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', height: { xs: 48, md: 52 } } }}
              />
              <IconButton sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* RIGHT SIDE: Cart Review & Payment Summary */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: { xs: 2, md: 3 }, boxShadow: 2, position: { md: 'sticky' }, top: { md: 20 } }}>
              <Typography fontWeight={700} sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: 16, md: 18 } }}>
                لديك {cartItemsList.length} عناصر
              </Typography>

              {/* DYNAMIC CART ITEMS */}
              {cartItemsList.map((item) => (
                <Box key={item.cartItemId} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box
                      component="img"
                      src={item.imageUrl || '/assets/courses/study.png'} // Fallback if image is null
                      alt={item.title}
                      sx={{
                        width: { xs: '100%', sm: 130 },
                        height: { xs: 160, sm: 95 },
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600} sx={{ fontSize: { xs: 14, md: 16 } }}>
                        {item.title}
                      </Typography>

                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 34, height: 34 }}>
                             {/* Fixed Instructor icon/image per your original code */}
                             <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
                          </Avatar>
                          <Typography color="gray" sx={{ fontSize: 13 }}>
                            {item.itemType}
                          </Typography>
                        </Box>

                        <Typography fontWeight={700} sx={{ color: '#54B0D7', fontSize: 16 }}>
                          {item.price} درهم
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, fontSize: 17 }}>
                تفاصيل الدفع
              </Typography>

              {/* DYNAMIC PAYMENT DETAILS FROM summary */}
              <Box sx={summaryRowStyle}>
                <Typography color="gray">المجموع الفرعي</Typography>
                <Typography fontWeight={500}>{summary?.subTotal} درهم</Typography>
              </Box>

              <Box sx={summaryRowStyle}>
                <Typography color="gray">ضريبة القيمة المضافة</Typography>
                <Typography fontWeight={500}>{summary?.vat} درهم</Typography>
              </Box>

              <Box sx={summaryRowStyle}>
                <Typography color="gray">خصم</Typography>
                <Typography sx={{ color: 'green' }}>{summary?.discount} درهم</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={summaryRowStyle}>
                <Typography color="gray">الإجمالي</Typography>
                <Typography fontWeight={600}>{summary?.total} درهم</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography fontWeight={700}>الإجمالي بعد الخصم</Typography>
                <Typography variant="h6" fontWeight={800} sx={{ color: '#54B0D7' }}>
                  {summary?.totalAfterDiscount} درهم
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handlePay}
                sx={{
                  mt: 3,
                  backgroundColor: '#00bcd4',
                  py: 1.4,
                  fontSize: 16,
                  '&:hover': { backgroundColor: '#0097a7' },
                }}
              >
                إتمام الدفع
              </Button>
            </Card>
          </Grid>
        </Grid>

        <SuccessPurchaseDialog open={openSuccess} onClose={() => setOpenSuccess(false)} />
      </Box>
    </Container>
  );
}

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: 1.5,
  fontSize: 14,
};