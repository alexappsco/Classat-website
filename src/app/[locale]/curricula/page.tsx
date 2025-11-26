// import { redirect } from 'next/navigation';
// import { hasServerPermission } from 'src/utils/hasServerPermission';

import Header from 'src/app/mainpage/header';
import MainPage from 'src/sections/main/view';

export const metadata = {
  title: 'Main Page',
};

export default async function Page() {
  // if (!hasServerPermission('General.ViewHomePage')) {
  //   redirect('/dashboard/orders');
  // }

  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}
