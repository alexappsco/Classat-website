export interface InvoiceItem {
  teacherId: string
  teacherName: string
  title: string
  invoiceItemType: string
  totalPrice: number
}

export interface Invoice {
  invoiceId: string
  invoiceNumber: string
  issuedAt: string
  paymentMethod: string
  subTotal: number
  vatAmount: number
  platformProfitPercentage: number
  discountAmount: number
  totalAmount: number
  invoiceStatus: string
  paidAt: string
  cancelledAt: string | null
  items: InvoiceItem[]
}

export interface PageParams {
  id: string
}