// // import ProfileSection from "src/sections/profile/profile"

// // function page() {
// //   return <ProfileSection />
// // }

// // export default page


// import ProfileSection from "src/sections/profile/profile";

// import { getData } from "src/utils/crud-fetch-api";
// import { endpoints } from "src/utils/endpoints";

// // ===== Types =====
// type StudentProfileResponse = {
//   userId: string;
//   studentId: string;
//   avatarUrl: string;
//   name: string;
//   phoneNumber: string;
//   guardianPhoneNumber: string;
//   email: string;
//   learningPreference: string;
//   country: {
//     id: string;
//     name: string;
//   };
// };

// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
//   message?: string;
//   status?: number;
// };

// // ===== Page =====
// export default async function Page() {

//   // ===== Fetch profile =====
//   const res = await getData<StudentProfileResponse>(
//     endpoints.student.get
//   );

//   console.log("Student Profile Response:", res);

//   const profileResponse = res as ApiResponse<StudentProfileResponse>;

//   return (
//     <ProfileSection
//       profile={profileResponse.data}
//     />
//   );
// }



// import ProfileSection from 'src/sections/profile/profile';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// type Country = {
//   id: string;
//   name: string;
// };

// type CountriesResponse = {
//   items: Country[];
//   totalCount: number;
// };

// export default async function Page() {

//   // Profile
//   const profileRes = await getData(
//     endpoints.student.get
//   );

//   // Countries (Typed)
//   const countriesRes = await getData<CountriesResponse>(
//     endpoints.country.get
//   );

//   const profile = profileRes?.data || null;
//   const countries = countriesRes?.data?.items || [];

//   return (
//     <ProfileSection
//       profile={profile}
//       countries={countries}
//     />
//   );
// }




// app/profile/page.tsx  (أو مسارك)

// import ProfileSection from "src/sections/profile/profile";
// import { getData } from "src/utils/crud-fetch-api";
// import { endpoints } from "src/utils/endpoints";

// type Country = {
//   id: string;
//   name: string;
// };

// type CountriesResponse = {
//   items: Country[];
//   totalCount: number;
// };

// type Approach = {
//   id: string;
//   educationApproachTypeName: string;
// };

// export default async function Page() {
//   const profileRes = await getData(
//     endpoints.student.get
//   );
//   const approaches = await getData(
//     endpoints.approaches.get
//   )
// console.log( approaches)


//   const countriesRes = await getData<CountriesResponse>(
//     endpoints.country.get
//   );

//   const profile = profileRes?.data || null;
//   const countries = countriesRes?.data?.items || [];
  
// console.log(profile)
//   return (
//     <ProfileSection
//       profile={profile}
//       countries={countries}
//       approaches={approaches}
//     />
//   );
// }



//this this code

// import ProfileSection from "src/sections/profile/profile";
// import { getData } from "src/utils/crud-fetch-api";
// import { endpoints } from "src/utils/endpoints";

// type Country = {
//   id: string;
//   name: string;
// };

// type CountriesResponse = {
//   items: Country[];
//   totalCount: number;
// };

// type Approach = {
//   id: string;
//   name: string;
// };

// type ApproachesResponse = {
//   items: Approach[];
//   totalCount: number;
// };

// export default async function Page() {
//   const profileRes = await getData(endpoints.student.get);

//   const approachesRes = await getData<ApproachesResponse>(
//     endpoints.approaches.get
//   );

//   const countriesRes = await getData<CountriesResponse>(
//     endpoints.country.get
//   );

//   const profile = profileRes?.data || null;
//   const countries = countriesRes?.data?.items || [];
//   const approaches = approachesRes?.data?.items || [];

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

type Country = {
  id: string;
  name: string;
};

type CountriesResponse = {
  items: Country[];
  totalCount: number;
};

export default async function Page() {
  // Profile
  const profileRes = await getData<typeof endpoints.student.get>(endpoints.student.get);
  const profile = profileRes?.data || null;
  // Countries
  const countriesRes = await getData<CountriesResponse>(endpoints.country.get);
  const countriesData = countriesRes.data as CountriesResponse;
  const countries = countriesData?.items || [];
  return (
    <ProfileSection
      profile={profile}
      countries={countries}
    />
  );
}

