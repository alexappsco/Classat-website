'use client';

// TEMPORARY: Auth disabled for UI development
// import { GuestGuard } from 'src/auth/guard';
import RegisterLayout from 'src/layouts/auth/registerLayout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    // TEMPORARY: Guest guard disabled for UI development
    // <GuestGuard>
    <RegisterLayout title="Manage the job more effectively with Minimal">{children}</RegisterLayout>
    // </GuestGuard>
  );
}
//
