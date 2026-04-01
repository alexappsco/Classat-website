// "use client"

// import React from "react"
// import { Card, CardContent, Typography, Button, Stack } from "@mui/material"
// import { useRouter } from "next/navigation"
// import { Invoice } from "src/types/invoice"

// interface Props {
//   invoice: Invoice
// }

// function InvoiceCard({ invoice }: Props) {
//   const router = useRouter()

//   const formattedDate = new Date(invoice.issuedAt).toLocaleString("en-US", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   })

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//         height: "100%",
//       }}
//     >
//       <CardContent>
//         <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             {invoice.invoiceStatus}
//           </Typography>

//           <Typography variant="body2" fontWeight={600}>
//             رقم الفاتورة: {invoice.invoiceNumber}
//           </Typography>
//         </Stack>

//         <Typography variant="caption" color="text.secondary">
//           {formattedDate}
//         </Typography>

//         <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
//           طريقة الدفع: {invoice.paymentMethod}
//         </Typography>

//         <Typography sx={{ mt: 1, fontWeight: 700, color: "#f57c00" }}>
//           الإجمالي: {invoice.totalAmount} درهم
//         </Typography>

//         <Button
//           fullWidth
//           variant="contained"
//           onClick={() => router.push(`/invoice/${invoice.invoiceId}`)}
//           sx={{
//             mt: 2,
//             borderRadius: 2,
//             backgroundColor: "#5ba4b5",
//             "&:hover": {
//               backgroundColor: "#4a94a5",
//             },
//           }}
//         >
//           عرض التفاصيل
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default InvoiceCard


"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { Invoice } from "src/types/invoice"
import InvoiceDetails from "./invoiceDetails"

interface Props {
  invoice: Invoice
}

function InvoiceCard({ invoice }: Props) {
  const [open, setOpen] = useState(false)

  const formattedDate = new Date(invoice.issuedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          height: "100%",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {invoice.invoiceStatus}
            </Typography>

            <Typography variant="body2" fontWeight={600}>
              رقم الفاتورة: {invoice.invoiceNumber}
            </Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            طريقة الدفع: {invoice.paymentMethod}
          </Typography>

          <Typography sx={{ mt: 1, fontWeight: 700, color: "#f57c00" }}>
            الإجمالي: {invoice.totalAmount} درهم
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              mt: 2,
              borderRadius: 2,
              backgroundColor: "#5ba4b5",
              "&:hover": {
                backgroundColor: "#4a94a5",
              },
            }}
          >
            عرض التفاصيل
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <InvoiceDetails invoice={invoice} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InvoiceCard