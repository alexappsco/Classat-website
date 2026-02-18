

// import ProfileSection from "src/sections/profile/profile";
// import { getData } from "src/utils/crud-fetch-api";
// import { endpoints } from "src/utils/endpoints";

// type Country = { id: string; name: string };
// type CountriesResponse = { items: Country[]; totalCount: number };

// type Approach = { id: string; name: string; logo?: string };
// type ApproachesResponse = { items: Approach[]; totalCount: number };

// export default async function Page() {
//   // Profile
//   const profileRes = await getData<typeof endpoints.student.get>(endpoints.student.get);
//   const profile = profileRes?.data || null;

//   // Countries
//   const countriesRes = await getData<CountriesResponse>(endpoints.country.get);
//   const countriesData = countriesRes.data as CountriesResponse;
//   const countries = countriesData?.items || [];

//   // Approaches (المناهج)
//   const approachesRes = await getData<ApproachesResponse>(endpoints.approaches.get);
//   const approachesData = approachesRes.data as ApproachesResponse;
//   const approaches = approachesData?.items || [];

//   return (
//     <ProfileSection
//       profile={profile}
//       countries={countries}
//     />
//   );
// }


import ProfileSection from "src/sections/profile/profile";
import { getData } from "src/utils/crud-fetch-api";
import { endpoints } from "src/utils/endpoints";

type Country = { id: string; name: string };
type CountriesResponse = { items: Country[]; totalCount: number };

type Approach = { id: string; name: string; logo?: string };
type ApproachesResponse = { items: Approach[]; totalCount: number };

export default async function Page() {
  // ===== Profile =====
  const profileRes = await getData(endpoints.student.get);
  // تأكد أن profile يكون من نوع Profile أو undefined
  const profile = profileRes?.data && Object.keys(profileRes.data).length > 0
    ? (profileRes.data as {
        name: string;
        email: string;
        phoneNumber: string;
        avatarUrl?: string;
        country?: Country;
        learningPreference?: string;
      })
    : undefined;

  // ===== Countries =====
 //   // Countries
  const countriesRes = await getData<CountriesResponse>(endpoints.country.get);
  const countriesData = countriesRes.data as CountriesResponse;
  const countries = countriesData?.items || [];

  // ===== Approaches (المناهج) =====
  // const approachesRes = await getData<ApproachesResponse>(endpoints.approaches.get);
  // const approaches = approachesRes?.data?.items ?? [];

  return (
    <ProfileSection
      profile={profile}
      countries={countries}
    />
  );
}
