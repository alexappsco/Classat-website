import ContactUsSection from 'src/sections/setting/contact-us/ContactUsSection';
import { getTranslations } from 'next-intl/server';

export default function ContactUsPage() {
  return <ContactUsSection />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('ContactUs.title'),
  };
}


