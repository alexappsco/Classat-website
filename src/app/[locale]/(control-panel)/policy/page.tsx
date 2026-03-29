import { getTranslations } from 'next-intl/server';
import PrivacyPolicySection from 'src/sections/setting/policy/PrivacyPolicySection';

export default function PrivacyPolicyPage() {
  return <PrivacyPolicySection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('PrivacyPolicy.title'),
  };
}


