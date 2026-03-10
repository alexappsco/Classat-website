import { getTranslations } from 'next-intl/server';
import CancellationPolicySection from 'src/sections/setting/CancellationPolicy/CancellationPolicySection';

export default function CancellationPolicyPage() {
  return <CancellationPolicySection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('CancellationPolicySection.title'),
  };
}
