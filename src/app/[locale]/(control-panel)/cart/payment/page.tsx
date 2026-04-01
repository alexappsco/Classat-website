
import { CartData } from 'src/types/cart';
import { endpoints } from 'src/utils/endpoints';
import Payment from 'src/sections/cart/payment';
import { getTranslations } from 'next-intl/server';
import { getData } from 'src/utils/crud-fetch-api';
import { ApiResponse } from 'src/types/crud-types';
import { FetchTags } from 'src/actions/config-actions';
import { DEFAULT_LIMIT } from 'src/components/constant';

interface Props {
  searchParams: Promise<Record<'page' | 'limit' | 'status' | 'search', string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  let { page, limit, status, search } = await searchParams;



  const cartResponse = await getData<ApiResponse<CartData>>(
    endpoints.cart.getCarts
    , { tags: [FetchTags.PaymentMethod] }
  );
  const paymentResponse = await getData<ApiResponse<any>>(
    endpoints.payment.get  // What is this endpoint?
  );
  console.log(endpoints.cart.getCarts)

  return <Payment items={cartResponse.data as CartData} paymentList={paymentResponse.data as any} />;
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Payment.title'),
  };
}