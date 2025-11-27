import { endpoints } from 'src/utils/endpoints';
import { getTranslations } from 'next-intl/server';
import { getData } from 'src/utils/crud-fetch-api';
import { NoPermissionView } from 'src/sections/error';
import { FetchTags } from 'src/actions/config-actions';
import { DEFAULT_LIMIT } from 'src/components/constant';
import HomeView from 'src/sections/home/views/list-view';
import { Reports, SettingData, SalesRevenue, PurchasedProduct } from 'src/types/home';
import Loading from 'src/app/loading';
import Header from 'src/layouts/dashboard/header';
import { LandingPage } from 'src/sections/landing/LandingPage';

// ----------------------------------------------------------------------
interface Props {
  searchParams: Promise<
    Record<'page' | 'limit' | 'status' | 'search' | 'StartDate' | 'EndDate', string | undefined>
  >;
}
export default async function HomePage({ searchParams }: Props) {
  // let { page, limit, status, search, StartDate, EndDate } = await searchParams;

  // const urlSearchParams = new URLSearchParams({
  //   page: page || '1',
  //   limit: limit || `${DEFAULT_LIMIT}`,
  //   ...(status && { IsActive: status }),
  //   ...(search && { Name: search }),
  //   StartDate: StartDate || '',
  //   EndDate: EndDate || '',

  // });

  // const mostPurchaseProducts = await getData<{ totalCount: number; items: PurchasedProduct[] }>(
  //   `${endpoints.home.mostPurchasedProducts}?${urlSearchParams.toString()}`,
  //   { tags: [FetchTags.MostPurchased] }
  // );
  // if ('error' in mostPurchaseProducts) {
  //   if (mostPurchaseProducts.status === 403) {
  //     return <NoPermissionView />;
  //   }
  //   throw new Error(mostPurchaseProducts.error);
  // }

  // const reports = await getData<Reports>(
  //   endpoints.home.reports
  // );
  // if ('error' in reports) {
  //   if (reports.status === 403) {
  //     return <NoPermissionView />;
  //   }
  //   throw new Error(reports.error);
  // }

  // const SalesRenveu = await getData<SalesRevenue>(
  //   `${endpoints.home.salesRenveu}?${urlSearchParams.toString()}`,
  //   { tags: [FetchTags.SalesRenveu] }
  // );
  // if ('error' in SalesRenveu) {
  //   if (SalesRenveu.status === 403) {
  //     return <NoPermissionView />;
  //   }
  //   throw new Error(SalesRenveu.error);
  // }

  // const freeShipping = await getData<{ totalCount: number; data: SettingData }>(
  //   endpoints.home.freeShipping
  // );
  // if ('error' in freeShipping) {
  //   if (freeShipping.status === 403) {
  //     return <NoPermissionView />;
  //   }
  //   throw new Error(freeShipping.error);
  // }

  return (
    <>
      {/* <Loading /> */}
      <LandingPage />
    </>
  );
}
export async function generateMetadata({ params }: { params: Promise<any> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
  };
}
