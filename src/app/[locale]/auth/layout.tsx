'use client';

import { useTranslations } from 'next-intl';
import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const t = useTranslations();
  return (
    <GuestGuard>
      <AuthClassicLayout title={t('Global.title')} image="/logo/logo_single.png">
        {children}
      </AuthClassicLayout>
    </GuestGuard>
  );
}
