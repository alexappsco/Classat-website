import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { FetchTags } from 'src/actions/config-actions';
import MyPackages from 'src/sections/curricula/myPackages/view';

export const dynamic = 'force-dynamic';

type CourseCategory = {
  id: string;
  name: string;
  logo?: string;
};

type CourseCategoriesResponse = {
  totalCount: number;
  items: CourseCategory[];
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  status?: number;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    Status?: string;
    Date?: string;
  }>;
}) {
  // ✅ Await the searchParams promise
  const params = await searchParams;

  let paymentList: any[] = [];
  let lessonsRes: any = null;

  try {
    // ✅ تجهيز Query Params
    const query = new URLSearchParams();

    if (params.Status) {
      query.append('LiveSessionStatus', params.Status || '');
    }
    if (params.Date) {
      query.append('Date', params.Date || '');
    }

    const lessonsUrl = query.toString()
      ? `${endpoints.packageSubscription.get}?${query.toString()}`
      : endpoints.packageSubscription.get;

    // ✅ Fetch Live Sessions (always fresh + tagged)
    lessonsRes = await getData<any>(lessonsUrl, {
      cache: 'no-store',
      tags: [FetchTags.LiveCourse],
    });
  } catch (error) {
    paymentList = [];
  }
  const packageItems =
    lessonsRes?.success && Array.isArray(lessonsRes?.data?.items) ? lessonsRes.data.items : [];

  return (
    <MyPackages
      // paymentList={paymentList}
      liveSubject={packageItems}
      // categories={categories}
    />
  );
}
