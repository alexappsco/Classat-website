import InvoiceView from 'src/sections/invoice/invoiceView'
import { getData } from 'src/utils/crud-fetch-api'
import { endpoints } from 'src/utils/endpoints'
import { Invoice } from 'src/types/invoice'

interface InvoiceResponse {
  totalCount: number
  items: Invoice[]
}

export default async function Page() {
  try {
    const response = await getData(endpoints.invoice.get)

    const data = response?.data as InvoiceResponse
    const invoices = data?.items || []

    return <InvoiceView invoices={invoices} />
  } catch (error) {
    console.error(error)
    return <InvoiceView invoices={[]} />
  }
}

