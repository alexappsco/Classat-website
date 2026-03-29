import { getTranslations } from 'next-intl/server';
import { LandingPage } from 'src/sections/landing/LandingPage';

// ----------------------------------------------------------------------
interface Props {
  searchParams: Promise<
    Record<'page' | 'limit' | 'status' | 'search' | 'StartDate' | 'EndDate', string | undefined>
  >;
}
export default async function HomePage({ searchParams }: Props) {
 
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
