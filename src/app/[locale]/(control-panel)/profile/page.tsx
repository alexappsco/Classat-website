


import { Profile } from 'src/types/prof';
import { redirect } from 'next/navigation';
import { endpoints } from 'src/utils/endpoints';
import { getTranslations } from 'next-intl/server';
import { getData } from 'src/utils/crud-fetch-api';
import { FetchTags } from 'src/actions/config-actions';
import EditViewProfile from 'src/sections/edit-profile-student/view';

// Helper function to check if error is authentication related
function isAuthError(error: any): boolean {
  if (!error) return false;

  const errorMessage = error.message || error.error || '';
  const errorString = errorMessage.toString().toLowerCase();

  return (
    errorString.includes('يجب تسجيل الدخول أولاً') ||
    errorString.includes('login') ||
    errorString.includes('authenticate') ||
    errorString.includes('unauthorized') ||
    errorString.includes('forbidden') ||
    error.statusCode === 401 ||
    error.statusCode === 403 ||
    error.status === 401 ||
    error.status === 403
  );
}
 type Country = { id: string; name: string };

type CountriesResponse = { items: Country[]; totalCount: number };



export default async function Page() {
  const profileData = await getData<Profile>(
    endpoints.student.get,
    {
      tags: [FetchTags.UpdateProfile, FetchTags.viewProfile]
    },
  );

  // Check if there's an authentication error
  if ('error' in profileData && isAuthError(profileData)) {
    // This will throw a NEXT_REDIRECT error that Next.js handles internally
    redirect('/auth/login');
  }

  // Handle other errors
  if ('error' in profileData) {
    // This will show an error page for non-auth errors
    throw new Error(profileData.error);
  }

  // Countries
  const countriesRes = await getData<CountriesResponse>(endpoints.country.get);
  const countriesData = countriesRes.data as CountriesResponse;
  const countries = countriesData?.items || [];

  return <EditViewProfile profile={profileData?.data}
      countries={countries}
 />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.editProfile' });

  return {
    title: t('title'),
  };
}

