import Cart from 'src/sections/cart/view';
import { endpoints } from 'src/utils/endpoints';
import { getTranslations } from 'next-intl/server';
import { ApiResponse } from 'src/types/crud-types';
import { getData } from 'src/utils/crud-fetch-api';
import { CartData } from 'src/types/cart';

export default async function Page() {
  // جلب المدرسين
  const cartResponse = await getData<ApiResponse<any>>(
    endpoints.cart.getCarts
  );


  return <Cart
  items={cartResponse.data as CartData}/>;

}

  // جلب المواد



  export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
      title: t('Cart.title'),
    };
  }
