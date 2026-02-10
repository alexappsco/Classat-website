import { getTranslations } from 'next-intl/server';
import Payment from 'src/sections/cart/payment';
import { ApiResponse } from 'src/types/crud-types';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

// Define precisely what the API returns based on your log
interface CartItem {
  cartItemId: string;
  itemType: string;
  title: string;
  imageUrl: string | null;
  price: number;
  rating: number | null;
  sessions: any[];
}

interface PaymentSummary {
  subTotal: number;
  vat: number;
  discount: number;
  total: number;
  totalAfterDiscount: number;
}

interface CartData {
  cartId: string;
  items: CartItem[];
  paymentSummary: PaymentSummary;
  sessions: any[]; // Added to match your JSON log
}

export default async function Page() {
  // Explicitly typing the response
  const cartResponse = await getData<ApiResponse<CartData>>(
    endpoints.cart.getCarts
  );

  // Guard clause for type safety and rendering
  if (!cartResponse?.data) {
    return <div>No cart data available.</div>;
  }

  return <Payment items={cartResponse.data as CartData} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Payment.title'),
  };
}