'use client';

// import { AuthGuard } from 'src/auth/guard/jwt';
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
  // <AuthGuard>
  // </AuthGuard>
}
