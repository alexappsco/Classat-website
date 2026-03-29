import LiveSesions from 'src/sections/courses/live-sessions/view';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { FetchTags } from 'src/actions/config-actions';
import MyLiveSesions from 'src/sections/courses/myLive-sessions/view';

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
    courseCategoryId?: string;
    EnrollmentStatus?: string;
    LiveSessionStatus?: string;
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

    if (params.courseCategoryId) {
      query.append('CourseCategoryId', params.courseCategoryId || '');
    }

    if (params.EnrollmentStatus) {
      query.append('EnrollmentStatus', params.EnrollmentStatus || '');
    }
    if (params.LiveSessionStatus ) {
      query.append('LiveSessionStatus', params.LiveSessionStatus|| '');
    }
    if (params.Date) {
      query.append('Date', params.Date || '');
    }

    const lessonsUrl = query.toString()
      ? `${endpoints.liveCourse.getmyCourses}?${query.toString()}`
      : endpoints.liveCourse.getmyCourses ;

    // ✅ Fetch Live Sessions (always fresh + tagged)
    lessonsRes = await getData<any>(lessonsUrl, {
      cache: 'no-store',
      tags: [FetchTags.LiveCourse],
    });

  } catch (error) {
    paymentList = [];
  }

  // ✅ Fetch Categories (always fresh + tagged)
  const response = await getData<ApiResponse<CourseCategoriesResponse>>(
    endpoints.courseCategory.get,
    {
      cache: 'no-store',
      tags: [FetchTags.CategoriesList],
    }
  );

  const categories =
    (response?.data as CourseCategoriesResponse)?.items ?? [];

  const liveSubjectItems =
    lessonsRes?.success && Array.isArray(lessonsRes?.data?.items)
      ? lessonsRes.data.items 
      : [];
      
  return (
    <MyLiveSesions
      // paymentList={paymentList}
      liveCourse={liveSubjectItems}
      categories={categories}
      title="My Live Sessions"
    />
  );
}