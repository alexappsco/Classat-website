

// export default Page
import InvoiceDetails from 'src/sections/invoice/invoiceDetails'
import { Invoice } from 'src/types/invoice'
import { getData } from 'src/utils/crud-fetch-api'
import { endpoints } from 'src/utils/endpoints'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function Page({ params }: PageProps) {
  const { id } = await params  
  try {
    const response = await getData(endpoints.invoice.getDetails(id))

    const invoice = response?.data as Invoice | null

    if (!invoice) {
      return <InvoiceDetails invoice={null} />
    }

    return <InvoiceDetails invoice={invoice} />
  } catch (error) {
    console.error(error)
    return <InvoiceDetails invoice={null} />
  }
}

export default Page