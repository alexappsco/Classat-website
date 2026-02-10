'use client';

import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Grid,
  Card,
  Button,
  Divider,
  Container,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

// Utilities & Hooks
import { deleteData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { useBoolean } from 'src/hooks/use-boolean';

// Components
import ConfirmDeleteDialog from 'src/components/custom-dialog/confirm-delete-dialog';

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

interface Props {
  items: {
    cartId: string;
    items: CartItem[];
    paymentSummary: PaymentSummary;
  };
}

export default function ShoppingCart({ items: initialData }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations();

  // States & Booleans
  const [cartData, setCartData] = useState(initialData);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const isDeleting = useBoolean();
  const deleteDialog = useBoolean();

const handleDelete = useCallback(
  async (id: string) => {
    isDeleting.onTrue();

    try {
      const res = await deleteData(endpoints.cart.deleteCartItem(id));

      if (!res.success) {
        enqueueSnackbar(
          res.error || t('Global.Server.unexpected_error'),
          { variant: 'error' }
        );
        return;
      }

      // ✅ SUCCESS: update UI
      setCartData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.cartItemId !== id),
      }));

      enqueueSnackbar(
        t('Global.Server.Success.var_deleted', {
          var: t('Pages.Cart.item'),
        }),
        { variant: 'success' }
      );

      deleteDialog.onFalse();
    } catch (error) {
      enqueueSnackbar('حدث خطأ غير متوقع', { variant: 'error' });
    } finally {
      isDeleting.onFalse();
      setSelectedItemId(null);
    }
  },
  [deleteDialog, enqueueSnackbar, isDeleting, t]
);

  // استخراج المتغيرات لتبسيط الكود
  const itemsList = cartData.items || [];
  const summary = cartData.paymentSummary;

  return (
    <Container sx={{ py: { xs: 4, md: 18 }, px: { xs: 2, sm: 3 } }}>
      <Box dir="rtl">
        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>

          {/* Items List */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3, maxWidth: 710, pb: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {t('Pages.Cart.title')}
              </Typography>
              <Typography color="gray" sx={{ mt: 0.5 }}>
                لديك {itemsList.length} عناصر في السلة
              </Typography>
              <Divider sx={{ mt: 2, borderColor: '#ddd' }} />
            </Box>

            {itemsList.map((item) => (
              <Card key={item.cartItemId} sx={cardStyle}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box
                      component="img"
                      src={item.imageUrl || '/assets/courses/study.png'}
                      alt={item.title}
                      sx={imageStyle}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {item.title}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.875rem' }}>
                          النوع: {item.itemType}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography sx={{ color: '#54B0D7', fontWeight: 700, fontSize: '1.25rem' }}>
                            {item.price} درهم
                          </Typography>

                          {/* زر الحذف الذي يفتح الـ Dialog */}
                          <IconButton
                            color="error"
                            onClick={() => {
                              setSelectedItemId(item.cartItemId);
                              deleteDialog.onTrue();
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Payment Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: { md: 'sticky' }, top: { md: 20 } }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  تفاصيل الدفع
                </Typography>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">المجموع الفرعي</Typography>
                  <Typography fontWeight={500}>{summary.subTotal} درهم</Typography>
                </Box>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">ضريبة القيمة المضافة</Typography>
                  <Typography fontWeight={500}>{summary.vat} درهم</Typography>
                </Box>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">خصم</Typography>
                  <Typography sx={{ color: 'green', fontWeight: 500 }}>{summary.discount} درهم</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">الإجمالي</Typography>
                  <Typography fontWeight={600}>{summary.total} درهم</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontWeight={700}>الإجمالي بعد الخصم</Typography>
                  <Typography fontWeight={800} sx={{ fontSize: '1.5rem', color: '#00bcd4' }}>
                    {summary.totalAfterDiscount} درهم
                  </Typography>
                </Box>

                <Link href="/ar/cart/payment/" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="contained" sx={mainButtonStyle}>
                    إتمام الدفع
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* حوار تأكيد الحذف */}
      <ConfirmDeleteDialog
        name={t('Pages.Cart.confirm_delete_item')}
        action={() => selectedItemId && handleDelete(selectedItemId)}
        isLoading={isDeleting.value}
        open={deleteDialog.value}
        onClose={() => {
          deleteDialog.onFalse();
          setSelectedItemId(null);
        }}
      />
    </Container>
  );
}

// --- Styles ---
const cardStyle = {
  mb: 3,
  maxWidth: 710,
  border: '1px solid #87878738',
  boxShadow: 4,
  '&:hover': { boxShadow: 6 },
};

const imageStyle = {
  width: { xs: '100%', sm: 140, md: 160 },
  height: { xs: 180, sm: 110, md: 130 },
  borderRadius: 2,
  objectFit: 'cover',
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: 2,
  fontSize: 14,
};

const mainButtonStyle = {
  backgroundColor: '#00bcd4',
  mt: 2,
  py: 1.5,
  color: 'white',
  '&:hover': { backgroundColor: '#0097a7' },
};