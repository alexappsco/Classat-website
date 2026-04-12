// import Link from 'next/link';
// import React, { useState } from 'react';
// import CloseIcon from "@mui/icons-material/Close";
// import Success from 'public/assets/courses/icons/success.svg';
// import {
//   Box,
//   Dialog,
//   Button,
//   Typography,
//   IconButton,
//   DialogTitle,
//   DialogContent
// } from "@mui/material";

// import InvoiceDialog from './InvoiceDialog'

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export default function SuccessPurchaseDialog({
//   open,
//   onClose,
// }: Props) {
//   const [openInvoice, setOpenInvoice] = useState(false);
//   return (
//     <>
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           padding: "16px",
//           textAlign: "center",
//           width: "380px",
//           position: "relative",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//         },
//       }}
//     >

//       <IconButton
//         onClick={onClose}
//         sx={{
//           position: "absolute",
//           top: 8,
//           right: 8,
//         }}
//       >
//         <CloseIcon />
//       </IconButton>


//       <Box sx={{ mt: 2 }}>
//        <Success />
//       </Box>


//       <DialogTitle sx={{ fontWeight: "bold", fontSize: "20px" }}>
//         تم شراء الكورس بنجاح
//       </DialogTitle>

//       <DialogContent>
//         <Typography sx={{ color: "#777", fontSize: "15px", mb: 3 }}>
//           لقد قمت بالدفع بنجاح و شراء الكورس.
//         </Typography>


//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <Link href="/ar/courses/" passHref>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#3bb3ff",
//               paddingX: 4,
//               borderRadius: "25px",
//               textTransform: "none",
//             }}
//           >
//             الرجوع للرئيسية
//           </Button>
//           </Link>

//           <Button
//             variant="outlined"
//             sx={{
//               borderRadius: "25px",
//               paddingX: 4,
//               textTransform: "none",
//             }}
//              onClick={() => {
//     onClose();
//     setOpenInvoice(true);
//   }}
//           >
//             الفاتورة
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//     <InvoiceDialog
//       open={openInvoice}
//       onClose={() => setOpenInvoice(false)}
//     />
//     </>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import CloseIcon from "@mui/icons-material/Close";
// import Success from 'public/assets/courses/icons/success.svg';

// import {
//   Box,
//   Dialog,
//   Button,
//   Typography,
//   IconButton,
//   DialogTitle,
//   DialogContent
// } from "@mui/material";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   invoiceId: string; // 👈 مهم
// }

// export default function SuccessPurchaseDialog({
//   open,
//   onClose,
//   invoiceId,
// }: Props) {

//   const router = useRouter();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           padding: "16px",
//           textAlign: "center",
//           width: "380px",
//           position: "relative",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//         },
//       }}
//     >

//       <IconButton
//         onClick={onClose}
//         sx={{ position: "absolute", top: 8, right: 8 }}
//       >
//         <CloseIcon />
//       </IconButton>

//       <Box sx={{ mt: 2 }}>
//         <Success />
//       </Box>

//       <DialogTitle sx={{ fontWeight: "bold", fontSize: "20px" }}>
//         تم شراء الكورس بنجاح
//       </DialogTitle>

//       <DialogContent>
//         <Typography sx={{ color: "#777", fontSize: "15px", mb: 3 }}>
//           لقد قمت بالدفع بنجاح و شراء الكورس.
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <Link href="/ar/courses/" passHref>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#3bb3ff",
//                 paddingX: 4,
//                 borderRadius: "25px",
//                 textTransform: "none",
//               }}
//             >
//               الرجوع للرئيسية
//             </Button>
//           </Link>

//           <Button
//             variant="outlined"
//             sx={{
//               borderRadius: "25px",
//               paddingX: 4,
//               textTransform: "none",
//             }}
//             onClick={() => {
//               onClose();
//               router.push(`/ar/invoice/${invoiceId}`); 
//             }}
//           >
//             الفاتورة
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }






'use client';

import React, { useState } from "react";
import { Box, Dialog, Button, Typography, IconButton, DialogTitle, DialogContent, Divider, Stack, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Success from 'public/assets/courses/icons/success.svg';
import InvoiceDetails from "src/sections/invoice/invoiceDetails";
import { Invoice } from "src/types/invoice";
import { getData } from "src/utils/crud-fetch-api";
import { endpoints } from "src/utils/endpoints";

interface Props {
  open: boolean;
  onClose: () => void;
  invoiceId: string;
}

export default function SuccessPurchaseDialog({ open, onClose, invoiceId }: Props) {
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenInvoice = async () => {
    onClose(); // اغلق Dialog النجاح
    setLoading(true);
    setOpenInvoice(true);

    try {
     const response = await getData(endpoints.invoice.getDetails(invoiceId));

if (response && response.data) {
  setInvoiceData(response.data as Invoice);
} else {
  setInvoiceData(null);
}
      
    } catch (error) {
      console.error(error);
      setInvoiceData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Dialog النجاح */}
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
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
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
            لقد قمت بالدفع بنجاح وشراء الكورس.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3bb3ff", paddingX: 4, borderRadius: "25px", textTransform: "none" }}
              onClick={onClose}
            >
              الرجوع للرئيسية
            </Button>

            <Button
              variant="outlined"
              sx={{ borderRadius: "25px", paddingX: 4, textTransform: "none" }}
              onClick={handleOpenInvoice}
            >
              الفاتورة
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog الفاتورة */}
      <Dialog
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
      >
        <IconButton onClick={() => setOpenInvoice(false)} sx={{ position: "absolute", top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <InvoiceDetails invoice={invoiceData} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}