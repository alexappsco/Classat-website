import LiveSesions from 'src/sections/curricula/sections/live-sessions/view';
import { ILiveSubject } from 'src/types/liveSubject';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

export default async function Page() {
  let paymentList: any[] = [];
  let lessonsRes: any = null; // Declare at function scope

  try {
    lessonsRes = await getData<any>(endpoints.liveSubjects.get);
    console.log('Live Sessions data:', lessonsRes.data.items);
    if (lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)) {
      // console.log('Lessons data:', lessonsRes.data.items);
      (lessonsRes.data.items);
      console.log('Live Sessions data:', lessonsRes.data.items);
    } else {
      (lessonsRes.data.items || []);
    }

    const paymentResponse = await getData<any>(
      endpoints.payment.get,  // What is this endpoint?
    );
    paymentList = paymentResponse?.data?.items || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    paymentList = [];
  }

  const liveSubjectItems = lessonsRes?.success && Array.isArray(lessonsRes?.data?.items) ? lessonsRes.data.items : [];
  return <LiveSesions paymentList={paymentList} liveSubject={liveSubjectItems} title="Live Sessions" />;
}
