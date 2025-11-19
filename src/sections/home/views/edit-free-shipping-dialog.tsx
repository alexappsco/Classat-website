'use client';

import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useTranslations } from 'next-intl';
import { enqueueSnackbar } from 'notistack';
import { SettingItem } from 'src/types/home';
import { endpoints } from 'src/utils/endpoints';
import { editData } from 'src/utils/crud-fetch-api';
import { FetchTags } from 'src/actions/config-actions';
import { invalidateTag } from 'src/actions/cache-invalidation';
import {
  Grid2,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  items: SettingItem[];
}

export default function EditFreeShippingDialog({ open, onClose, items }: Props) {
  const t = useTranslations();

  // find items by name instead of assuming order
  const shippingItem = items.find(
    (i) => i.nameEn.toLowerCase().includes('shipping')
  );
  const vatItem = items.find(
    (i) => i.nameEn.toLowerCase().includes('vat')
  );

  const [shippingValue, setShippingValue] = useState<string>(
    shippingItem?.value?.toString() || ''
  );
  const [vatValue, setVatValue] = useState<string>(
    vatItem?.value?.toString() || ''
  );
  const [vatError, setVatError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleVatChange = (value: string) => {
    setVatValue(value);

    const num = parseFloat(value);
    if (isNaN(num)) {
      setVatError(t('Global.Validation.required'));
    } else if (num < 0.01) {
      setVatError(t('Global.Validation.vat_min'));
    } else if (num > 1) {
      setVatError(t('Global.Validation.vat_max'));
    } else {
      setVatError('');
    }
  };

  const handleUpdateValues = async () => {
    if (!shippingItem?.id || !vatItem?.id) return;

    // Validation before sending
    const vatNum = parseFloat(vatValue);
    if (vatError || vatNum < 0.01 || vatNum > 1) {
      enqueueSnackbar(t('Global.Validation.vat_invalid'), { variant: 'error' });
      return;
    }

    setLoading(true);
try {
  const responses = await Promise.all([
    editData(endpoints.home.editFreeShipping(shippingItem.id), 'PATCH', {
      value: shippingValue,
    }),
    editData(endpoints.home.editFreeShipping(vatItem.id), 'PATCH', {
      value: vatValue,
    }),
  ]);

  const hasError = responses.some((res) => 'error' in res);

  if (hasError) {
    enqueueSnackbar(t('Global.Server.internal_server_error'), {
      variant: 'error',
    });
  } else {
    enqueueSnackbar(t('Global.Server.Success.var_updated', { var: t('Nav.setting') }), {
      variant: 'success',
    });

    invalidateTag(FetchTags.HomeSettings);
    onClose();
  }
} catch (error) {
  enqueueSnackbar(t('Global.Message.update_error'), { variant: 'error' });
} finally {
  setLoading(false);
}

  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t('Pages.Home.edit_free_shipping_vat')}</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t('Pages.Home.free_shipping_threshold')}
              value={shippingValue}
              onChange={(e) => setShippingValue(e.target.value)}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t('Pages.Home.vat_percentage')}
              value={vatValue}
              onChange={(e) => handleVatChange(e.target.value)}
              type="number"
              inputProps={{ min: 0, max: 1, step: '0.01' }}
              error={!!vatError}
              helperText={vatError}
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('Global.Action.cancel')}
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={handleUpdateValues}
          disabled={
            !shippingValue ||
            !vatValue ||
            vatError !== '' ||
            (shippingValue === shippingItem?.value?.toString() &&
              vatValue === vatItem?.value?.toString())
          }
        >
          {t('Global.Action.save')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
