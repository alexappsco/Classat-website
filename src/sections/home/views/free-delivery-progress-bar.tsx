
import React, { useState } from 'react';
import { primary } from 'src/theme/palette';
import { useTranslations } from 'next-intl';
import { Reports, SettingItem } from 'src/types/home';
import { Box, Paper, Button, Typography, CircularProgress } from '@mui/material';

import EditFreeShippingDialog from './edit-free-shipping-dialog';

interface Props {
  reports: Reports;
  freeShipping: SettingItem[];
}

export default function DeliveryFreeProgress({ reports, freeShipping }: Props) {
  const t = useTranslations();
  const { totalOrders } = reports;
  const totalFreeShippingOrders = reports.totalOrdersFreeShoppingCost;
  const paidDeliveryOrders = totalOrders - totalFreeShippingOrders;

  const [openDialog, setOpenDialog] = useState(false);

  // ✅ Extract both items dynamically
  const shippingItem = freeShipping.find((item) => item.nameEn === 'Shipping Cost');
  const vatItem = freeShipping.find((item) => item.nameEn === 'Vat Percentage');

  const freeDeliveryThreshold = shippingItem?.value || '0';
  const vatPercentage = vatItem?.value || '0';

  // ✅ Calculate percentages
  const freeShippingPercentage =
    totalOrders > 0 ? Math.round((totalFreeShippingOrders / totalOrders) * 100) : 0;

  const paidDeliveryPercentage = 100 - freeShippingPercentage;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          width: '100%',
          border: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Section - Button */}
        <Box>
          <Button
            sx={{
              backgroundColor: '#ABBFAB40',
              color: primary.main,
              borderRadius: '16px',
              padding: '6px 12px',
              fontWeight: 500,
              fontSize: '0.875rem',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'none',
                boxShadow: 'none',
                color: '#1976d2',
              },
            }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            {t('Pages.Home.edit_free_shipping_vat')}
          </Button>
        </Box>

        {/* Middle Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: '#1976d2',
              fontSize: '2.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {` (${freeShippingPercentage}%)`}
            <Typography variant="body1" sx={{ color: '#555555' }}>
              {totalFreeShippingOrders} {t('Pages.Home.free_shipping_orders')}
            </Typography>
          </Typography>

          {/* ✅ Minimum Free Shipping */}
          <Typography variant="body1" sx={{ color: '#555555', fontSize: '1rem' }}>
            {t('Pages.Home.min_free_shipping')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#1976d2' }}>
            {freeDeliveryThreshold} {t('Pages.Currency.symbol')}
          </Typography>

          {/* ✅ VAT Percentage */}
          <Typography variant="body1" sx={{ color: '#555555', fontSize: '1rem', mt: 1 }}>
            {t('Pages.Home.vat_percentage')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#1976d2' }}>
            {vatPercentage}
          </Typography>
        </Box>

        {/* Right Section - Circular Progress */}
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            mr: 2,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={100}
            thickness={3}
            sx={{
              color: '#919EAB29',
              position: 'absolute',
              left: 0,
            }}
          />

          <CircularProgress
            variant="determinate"
            value={paidDeliveryPercentage}
            size={100}
            thickness={3}
            sx={{
              color: '#5BE49B',
            }}
          />

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              sx={{ fontSize: '1rem', fontWeight: 600 }}
            >
              {paidDeliveryPercentage}%
            </Typography>
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {paidDeliveryOrders} {t('Pages.Home.total_orders')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ✅ Edit dialog */}
     <EditFreeShippingDialog
        items={freeShipping}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}
