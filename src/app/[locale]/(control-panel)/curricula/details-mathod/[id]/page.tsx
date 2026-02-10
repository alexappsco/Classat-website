// // src/app/[locale]/(control-panel)/curricula/details-mathod/[id]/page.tsx
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// type Package = {
//   id: string;
//   name: string;
//   hours: number;
//   validityDays: number;
//   price: number;
//   discountPercentage: number;
// };

// type Params = {
//   params: { id: string };
// };

// export default async function Page({ params }: Params) {
//   const id = params.id;

//   // استدعاء الباك اند
//   const response = await getData<{ totalCount: number; items: Package[] }>(
//     endpoints.packages.get(id)
//   );

//   // طباعة البيانات في كونسول السيرفر
//   console.log('Request URL:');
//   // console.log(`https://api-staging.classat.net/api/v1${packages.get(id)}`);
//   console.log('Server response:');
//   console.log(response);

//   // الصفحة تظهر فارغة أو رسالة بسيطة
//   return <div>Data printed in server console ✅</div>;
// }
// page.tsx (Server Component)
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import InstructorProfileUI from 'src/sections/details/view';

// type Package = {
//   id: string;
//   name: string;
//   hours: number;
//   validityDays: number;
//   price: number;
//   discountPercentage: number;
// };

// type Params = {
//   params: { id: string };
// };

// export default async function Page({ params }: Params) {
//   const response = await getData<{ totalCount: number; items: Package[] }>(
//     endpoints.packages.get(params.id)
//   );

//   console.log('SERVER RESPONSE:', response);

//   return (
//     <InstructorProfileUI
//       packagesData={response.data?.items ?? []}
//     />
//   );
// }
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import InstructorProfileUI from 'src/sections/details/view';

// type Package = {
//   id: string;
//   name: string;
//   hours: number;
//   validityDays: number;
//   price: number;
//   discountPercentage: number;
// };

// type ApiResponse = {
//   totalCount: number;
//   items: Package[];
// };

// type GetDataResponse = {
//   data?: ApiResponse;
//   status?: number;
//   message?: string;
// };

// type Params = {
//   params: { id: string };
// };

// export default async function Page({ params }: Params) {
//   const response = await getData<GetDataResponse>(
//     endpoints.packages.get(params.id)
//   );

//   const packagesData = (response.data as ApiResponse)?.items ?? [];

//   return (
//     <InstructorProfileUI
//       packagesData={packagesData}
//     />
//   );
// }





'use server';

import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import InstructorProfileUI from 'src/sections/details/view';

// ===== Types =====
type Package = {
  id: string;
  name: string;
  hours: number;
  validityDays: number;
  price: number;
  discountPercentage: number;
};

type ApiResponse = {
  totalCount: number;
  items: Package[];
};

type GetDataResponse = {
  data?: ApiResponse;
  status?: number;
  message?: string;
};

// ===== Page Component =====
export default async function Page({ params, searchParams }: any) {
  const id = params?.id;
  if (!id) throw new Error('ID is required');

  const response = await getData<GetDataResponse>(endpoints.packages.get(id));

 const packagesData = (response.data as ApiResponse)?.items ?? [];

 let studentAppointments = null;
 if (id) {
   try {
      const appointments = await getData<any>(`/students/teacher/${id}/appointments`);
      console.log("appoin55555555555555555tments",appointments);
      if (response.success && response.data) {
        studentAppointments = appointments.data;
      }
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  }
  console.log("studentAppoi 88 777ntments",studentAppointments);

  return <InstructorProfileUI
     packagesData={packagesData}
    studentAppointments={studentAppointments.items}
    id={id}
    />;
}
