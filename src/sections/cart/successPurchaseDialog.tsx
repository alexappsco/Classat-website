import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Success from 'public/assets/courses/icons/success.svg';
import Link from 'next/link';
import InvoiceDialog from './InvoiceDialog'

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuccessPurchaseDialog({
  open,
  onClose,
}: Props) {
  const [openInvoice, setOpenInvoice] = useState(false);
  return (
    <>
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "16px",
          textAlign: "center",
          width: "380px",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        },
      }}
    >
      
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      
      <Box sx={{ mt: 2 }}>
       <Success />
      </Box>

      
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "20px" }}>
        تم شراء الكورس بنجاح
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: "#777", fontSize: "15px", mb: 3 }}>
          لقد قمت بالدفع بنجاح و شراء الكورس.
        </Typography>

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Link href="/ar/courses/" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3bb3ff",
              paddingX: 4,
              borderRadius: "25px",
              textTransform: "none",
            }}
          >
            الرجوع للرئيسية
          </Button>
          </Link>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "25px",
              paddingX: 4,
              textTransform: "none",
            }}
             onClick={() => {
    onClose();
    setOpenInvoice(true);
  }}
          >
            الفاتورة
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
    <InvoiceDialog
      open={openInvoice}
      onClose={() => setOpenInvoice(false)}
    />
    </>
  );
}
