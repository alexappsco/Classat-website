import TermsSection from 'src/sections/setting/terms/TermsSection';
import { getTranslations } from 'next-intl/server';

export default function TermsPage() {
  return <TermsSection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Terms.title'),
  };
}


