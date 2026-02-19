'use client';

import { endpoints } from 'src/utils/endpoints';
import React, { useState, useEffect } from 'react';
import { postData } from 'src/utils/crud-fetch-api';
// الاستيرادات الخاصة بمشروعك (تأكد من صحة المسارات)
import { useSnackbar } from 'src/components/snackbar';
import { FetchTags } from 'src/actions/config-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { invalidateTag } from 'src/actions/cache-invalidation';
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
  CircularProgress,
} from '@mui/material';

import SuccessPurchaseDialog from './successPurchaseDialog';

// --- Interfaces ---
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

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

interface Props {
  items: {
    cartId: string;
    items: CartItem[];
    paymentSummary: PaymentSummary;
  };
  paymentList: {
    totalCount: number;
    items: PaymentMethod[];
  };
}

export default function Payment({ items: data, paymentList }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  // استخراج البيانات من الـ Props
  const paymentMethods = paymentList?.items || [];
  const cartItemsList = data?.items || [];
  const summary = data?.paymentSummary;

  // الحالات (States)
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // اختيار أول وسيلة دفع تلقائياً
  useEffect(() => {
    if (paymentMethods.length > 0 && !selectedMethod) {
      setSelectedMethod(paymentMethods[0].id);
    }
  }, [paymentMethods, selectedMethod]);

const handlePaySubmit = async () => {
  if (!selectedMethod) {
    enqueueSnackbar('يرجى اختيار وسيلة دفع', { variant: 'warning' });
    return;
  }

  // Check if cart has items
  if (!data?.items || data.items.length === 0) {
    enqueueSnackbar('السلة فارغة', { variant: 'warning' });
    return;
  }

  setIsSubmitting(true);
  try {
    const requestBody = {
      paymentMethodId: selectedMethod,
    };

    const response = await postData(
      endpoints.payment.post_all_payment,
      requestBody
    );

    if (response && !('error' in response)) {
      enqueueSnackbar('تم الدفع بنجاح', { variant: 'success' });
      setOpenSuccess(true);
      invalidateTag(FetchTags.PaymentMethod);
        // router.push(paths.controlPanel.products.list);
    } else if ('error' in response) {
      enqueueSnackbar(response.error || 'فشلت عملية الدفع', { variant: 'error' });
    } else {
      // If we get here, assume success (since 204 returns empty response)
      enqueueSnackbar('تم الدفع بنجاح', { variant: 'success' });
      setOpenSuccess(true);
    }
  } catch (error) {
    enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <Container sx={{ py: { xs: 12, md: 10 }, px: { xs: 1, sm: 1 }, mt: 5 }}>
      <Box dir="rtl">
        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>

          {/* الجانب الأيمن: وسائل الدفع */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              إتمام الدفع
            </Typography>

            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                sx={{
                  p: 2.5,
                  mb: 2,
                  cursor: isSubmitting ? 'default' : 'pointer',
                  border: selectedMethod === method.id ? '2px solid #00bcd4' : '1px solid #ddd',
                  transition: '0.2s',
                  opacity: isSubmitting ? 0.7 : 1,
                  '&:hover': { boxShadow: isSubmitting ? 0 : 3 },
                }}
                onClick={() => !isSubmitting && setSelectedMethod(method.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Radio checked={selectedMethod === method.id} color="primary" />
                    <Typography fontWeight={600} sx={{ fontSize: 16 }}>{method.name}</Typography>
                  </Box>

                  <Box sx={{ width: 70, height: 40, display: 'flex', alignItems: 'center' }}>
                    <img
                      src={method.logo}
                      alt={method.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Box>
              </Card>
            ))}

            <Typography fontWeight={600} sx={{ mt: 4, mb: 1 }}>كوبون خصم</Typography>
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                placeholder="أدخل كود الخصم"
                disabled={isSubmitting}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              />
              <IconButton sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
                <ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
            </Box>
          </Grid>

          {/* الجانب الأيسر: ملخص الطلب */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3, boxShadow: 2, position: { md: 'sticky' }, top: 100 }}>
              <Typography fontWeight={700} sx={{ mb: 3, fontSize: 18 }}>
                ملخص الطلب ({cartItemsList.length} عناصر)
              </Typography>

              <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
                {cartItemsList.map((item) => (
                  <Box key={item.cartItemId} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee', display: 'flex', gap: 2 }}>
                    <Avatar
                      src={item.imageUrl || ''}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} noWrap>{item.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.itemType}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#00bcd4', mt: 0.5 }}>{item.price} درهم</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={summaryRowStyle}>
                <Typography color="text.secondary">المجموع الفرعي</Typography>
                <Typography fontWeight={600}>{summary?.subTotal} درهم</Typography>
              </Box>
              <Box sx={summaryRowStyle}>
                <Typography color="text.secondary">الضريبة</Typography>
                <Typography fontWeight={600}>{summary?.vat} درهم</Typography>
              </Box>
              <Box sx={summaryRowStyle}>
                <Typography color="text.secondary">الخصم</Typography>
                <Typography sx={{ color: 'error.main', fontWeight: 600 }}>-{summary?.discount} درهم</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography fontWeight={800}>الإجمالي النهائي</Typography>
                <Typography variant="h5" fontWeight={800} color="primary">{summary?.totalAfterDiscount} درهم</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handlePaySubmit}
                disabled={isSubmitting || !selectedMethod}
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  bgcolor: '#00bcd4',
                  fontSize: 17,
                  '&:hover': { bgcolor: '#0097a7' }
                }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الدفع الآن'}
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
};