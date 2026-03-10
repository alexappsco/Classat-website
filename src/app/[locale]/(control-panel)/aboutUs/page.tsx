import { getTranslations } from 'next-intl/server';
import AboutUsSection from 'src/sections/setting/aboutus/AboutUsSection';
import PrivacyPolicySection from 'src/sections/setting/policy/PrivacyPolicySection';

export default function AboutUsPage() {
  return <AboutUsSection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('AboutUs.title'),
  };
}
