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
    LiveSessionStatus ?: string;
        Date?: string;

  }>;
}) {

  const params = await searchParams;


  let paymentList: any[] = [];
  let lessonsRes: any = null; // Declare at function scope

  try {
 const query = new URLSearchParams();

    if (params.courseCategoryId) {
      query.append('CourseCategoryId', params.courseCategoryId || '');
    }

    if (params.LiveSessionStatus ) {
      query.append('LiveSessionStatus', params.LiveSessionStatus  || '');
    }
    if (params.Date) {
      query.append('Date', params.Date || '');
    }


    // lessonsRes = await getData<any>(endpoints.liveSubjects.get);
    // if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
    //   // console.log('Lessons data:', lessonsRes.data.items);
    //   (lessonsRes.data.items);
    // } else {
    //   (lessonsRes.data.items || []);
    // }

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
  } catch (error) {
    paymentList = [];
  }

  const liveSubjectItems = lessonsRes?.success && Array.isArray(lessonsRes?.data?.items) ? lessonsRes.data.items : [];
  return <LiveSesions paymentList={paymentList} liveSubject={liveSubjectItems} title="Live Sessions" />;
}
