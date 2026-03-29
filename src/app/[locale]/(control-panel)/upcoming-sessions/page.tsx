import UpcomingSessions from 'src/sections/setting/upcomingSessions/UpcomingSessions';
import { getTranslations } from 'next-intl/server';

export default function UpcomingSessionsPage() {
  return <UpcomingSessions />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('UpcomingSessions.title'),
  };
}

