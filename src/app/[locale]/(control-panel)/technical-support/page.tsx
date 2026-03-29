import { getTranslations } from 'next-intl/server';
import TechnicalSupportSection from 'src/sections/setting/technical-support/TechnicalSupportSection';

export default function TechnicalSupportPage() {
  return <TechnicalSupportSection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Support.title'),
  };
}

