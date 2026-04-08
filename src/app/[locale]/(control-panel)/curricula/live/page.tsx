// import { FetchTags } from 'src/actions/config-actions';
// import LiveSesions from 'src/sections/curricula/live-sessions/view';
// import { ILiveSubject } from 'src/types/liveSubject';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{
//     courseCategoryId?: string;
//     LiveSessionStatus ?: string;
//         Date?: string;

//   }>;
// }) {

//   const params = await searchParams;


//   let paymentList: any[] = [];
//   let lessonsRes: any = null; // Declare at function scope

//   try {
//  const query = new URLSearchParams();

//     if (params.courseCategoryId) {
//       query.append('CourseCategoryId', params.courseCategoryId || '');
//     }

//     if (params.LiveSessionStatus ) {
//       query.append('LiveSessionStatus', params.LiveSessionStatus  || '');
//     }
//     if (params.Date) {
//       query.append('Date', params.Date || '');
//     }

//         const lessonsUrl = query.toString()
//           ? `${endpoints.liveSubjects.get}?${query.toString()}`
//           : endpoints.liveSubjects.get;
//               lessonsRes = await getData<any>(lessonsUrl, {
//                 cache: 'no-store',
//                 tags: [FetchTags.LiveSubject],
//               });

//     const paymentResponse = await getData<any>(endpoints.payment.get, {
//       cache: 'no-store',
//       tags: [FetchTags.PaymentMethod],
//     });
//     paymentList = paymentResponse?.data?.items || [];
//   } catch (error) {
//     paymentList = [];
//   }

//   const liveSubjectItems = lessonsRes?.success && Array.isArray(lessonsRes?.data?.items) ? lessonsRes.data.items : [];
//   return <LiveSesions paymentList={paymentList} liveSubject={liveSubjectItems} title="Live Sessions" />;
// }



import { FetchTags } from 'src/actions/config-actions';
import LiveSesions from 'src/sections/curricula/live-sessions/view';
import { ILiveSubject } from 'src/types/liveSubject';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    courseCategoryId?: string;
    LiveSessionStatus?: string;
    Date?: string;
  }>;
}) {
  const params = await searchParams;

  let paymentList: any[] = [];
  let enrollments: any[] = [];  
  let lessonsRes: any = null;

  try {
    const query = new URLSearchParams();
    if (params.courseCategoryId) query.append('CourseCategoryId', params.courseCategoryId);
    if (params.LiveSessionStatus) query.append('LiveSessionStatus', params.LiveSessionStatus);
    if (params.Date) query.append('Date', params.Date);

    const lessonsUrl = query.toString()
      ? `${endpoints.liveSubjects.get}?${query.toString()}`
      : endpoints.liveSubjects.get;

    lessonsRes = await getData<any>(lessonsUrl, {
      cache: 'no-store',
      tags: [FetchTags.LiveSubject],
    });

    const paymentResponse = await getData<any>(endpoints.payment.get, {
      cache: 'no-store',
      tags: [FetchTags.PaymentMethod],
    });
    paymentList = paymentResponse?.data?.items || [];

    const enrollmentsRes = await getData<any>(endpoints.liveSessionSubjectEnrollments.get, {
      cache: 'no-store',
    });
    enrollments = enrollmentsRes?.success ? enrollmentsRes.data.items : [];

  } catch (error) {
    console.error("Error fetching data:", error);
    paymentList = [];
    enrollments = [];
  }

  const liveSubjectItems = lessonsRes?.success && Array.isArray(lessonsRes?.data?.items) ? lessonsRes.data.items : [];

  return (
    <LiveSesions 
      paymentList={paymentList} 
      liveSubject={liveSubjectItems} 
      enrollments={enrollments} 
      title="Live Sessions" 
    />
  );
}