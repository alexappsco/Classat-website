// "use client"

// import React from "react"
// import { Box, Typography, Divider, Button, Stack } from "@mui/material"

// interface InvoiceItem {
//   teacherId: string
//   teacherName: string
//   title: string
//   invoiceItemType: string
//   totalPrice: number
// }

// interface Invoice {
//   invoiceId: string
//   invoiceNumber: string
//   issuedAt: string
//   paymentMethod: string
//   subTotal: number
//   vatAmount: number
//   platformProfitPercentage: number
//   discountAmount: number
//   totalAmount: number
//   invoiceStatus: string
//   paidAt: string | null
//   cancelledAt: string | null
//   items: InvoiceItem[]
// }

// interface InvoiceDetailsProps {
//   invoice: Invoice | null
// }

// function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
//   if (!invoice) return null

//   const formattedDate = new Date(invoice.issuedAt).toLocaleDateString("en-GB")
//   const item = invoice.items?.[0]

//   // الحسابات الصحيحة
//   const finalVat = (invoice.totalAmount - invoice.subTotal).toFixed(2)

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 400,
//           width: "100%",
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
//           الفاتورة
//         </Typography>

//         <Stack spacing={0.5} sx={{ mb: 2 }}>
//           <Typography variant="body2">
//             <strong style={{ color: "#64b5f6" }}>رقم الفاتورة:</strong>{" "}
//             {invoice.invoiceNumber}
//           </Typography>
//           <Typography variant="body2">
//             <strong style={{ color: "#64b5f6" }}>تاريخ الفاتورة:</strong>{" "}
//             {formattedDate}
//           </Typography>
//           <Typography variant="body2">
//             <strong style={{ color: "#64b5f6" }}>طريقة الدفع:</strong>{" "}
//             {invoice.paymentMethod}
//           </Typography>
//         </Stack>

//         <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
//           تفاصيل الدفع
//         </Typography>

//         <Box>
//           <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
//             <Typography variant="body2">{item?.title}</Typography>
//             <Typography variant="body2">{item?.totalPrice.toFixed(2)} درهم</Typography>
//           </Stack>

//           <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
//             <Typography variant="body2">ضريبة القيمة المضافة</Typography>
//             <Typography variant="body2">{finalVat} درهم</Typography>
//           </Stack>

//           <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
//             <Typography variant="body2" fontWeight={600}>
//               الإجمالي
//             </Typography>
//             <Typography variant="body2" fontWeight={600}>
//               {invoice.subTotal.toFixed(2)} درهم
//             </Typography>
//           </Stack>

//           <Divider sx={{ my: 1 }} />

//           <Stack direction="row" justifyContent="space-between">
//             <Typography variant="body1" fontWeight={700}>
//               الإجمالي شامل الضريبة
//             </Typography>
//             <Typography variant="body1" fontWeight={700}>
//               {invoice.totalAmount.toFixed(2)} درهم
//             </Typography>
//           </Stack>
//         </Box>

//         <Button
//           fullWidth
//           variant="outlined"
//           sx={{ mt: 3, color: "#2196f3", borderColor: "#2196f3", borderRadius: 2 }}
//         >
//           تحميل الفاتورة
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default InvoiceDetails

"use client"

import React from "react"
import { Box, Typography, Divider, Button, Stack } from "@mui/material"

interface InvoiceItem {
  teacherId: string
  teacherName: string
  title: string
  invoiceItemType: string
  totalPrice: number
}

interface Invoice {
  invoiceId: string
  invoiceNumber: string
  issuedAt: string
  paymentMethod: string
  subTotal: number
  vatAmount: number
  invoiceDocumentUrl?: string
  platformProfitPercentage: number
  discountAmount: number
  totalAmount: number
  invoiceStatus: string
  paidAt: string | null
  cancelledAt: string | null
  items: InvoiceItem[]
}

interface InvoiceDetailsProps {
  invoice: Invoice | null
}

function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  if (!invoice) return null

  const formattedDate = new Date(invoice.issuedAt).toLocaleDateString("en-GB")
  const item = invoice.items?.[0]

  const finalVat = (invoice.totalAmount - invoice.subTotal).toFixed(2)

  return (
    <Box
      sx={{
        width: "100%",
        p: 1,
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        الفاتورة
      </Typography>

      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong style={{ color: "#64b5f6" }}>رقم الفاتورة:</strong>{" "}
          {invoice.invoiceNumber}
        </Typography>
        <Typography variant="body2">
          <strong style={{ color: "#64b5f6" }}>تاريخ الفاتورة:</strong>{" "}
          {formattedDate}
        </Typography>
        <Typography variant="body2">
          <strong style={{ color: "#64b5f6" }}>طريقة الدفع:</strong>{" "}
          {invoice.paymentMethod}
        </Typography>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        تفاصيل الدفع
      </Typography>

      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="body2">{item?.title}</Typography>
          <Typography variant="body2">
            {item?.totalPrice.toFixed(2)} درهم
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="body2">ضريبة القيمة المضافة</Typography>
          <Typography variant="body2">{finalVat} درهم</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            الإجمالي
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {invoice.subTotal.toFixed(2)} درهم
          </Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={700}>
            الإجمالي شامل الضريبة
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {invoice.totalAmount.toFixed(2)} درهم
          </Typography>
        </Stack>
      </Box>

    <Button
    fullWidth
    variant="outlined"
    sx={{
      mt: 3,
      color: "#2196f3",
      borderColor: "#2196f3",
      borderRadius: 2,
    }}
    onClick={() => {
      if (!invoice.invoiceDocumentUrl) return
      window.open(invoice.invoiceDocumentUrl, "_blank")
    }}
  >
    تحميل الفاتورة
  </Button>
    </Box>
  )
}

export default InvoiceDetails