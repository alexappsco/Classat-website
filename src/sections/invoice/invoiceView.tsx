"use client"

import React from "react"
import { Container, Typography, Grid } from "@mui/material"
import InvoiceCard from "./invoiceCard"
import { Invoice } from "src/types/invoice"

interface Props {
  invoices: Invoice[]
}

function InvoiceView({ invoices }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        الدفع والفواتير
      </Typography>

      <Grid container spacing={2}>
        {invoices.map((invoice) => (
          <Grid item xs={12} sm={6} md={4} key={invoice.invoiceId}>
            <InvoiceCard invoice={invoice} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default InvoiceView

