'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  CircularProgress,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import InvoiceDetails from 'src/sections/invoice/invoiceDetails';
import { Invoice } from 'src/types/invoice';

interface Props {
  open: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

export default function InvoiceDialog({ open, onClose, invoiceId }: Props) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!invoiceId || !open) return;

    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const res = await getData(endpoints.invoice.getDetails(invoiceId));
        setInvoice(res?.data as Invoice || null);
      } catch (error) {
        console.error(error);
        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <InvoiceDetails invoice={invoice} />
        )}
      </DialogContent>
    </Dialog>
  );
}