'use server';

import { Course } from 'src/types/course';
import Courses from 'src/sections/courses/view';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { CoursesEnrolled } from 'src/types/course-enrolled';

// ===== Types =====
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

export default async function Page() {
  const response = await getData<ApiResponse<CourseCategoriesResponse>>(
    endpoints.courseCategory.get
  );

  const getCoursesEnrolled = await getData<{ totalCount: number; items: CoursesEnrolled[] }>(
   endpoints.CourseEnroll.get
 );
  if (!getCoursesEnrolled.success || 'error' in getCoursesEnrolled) {
  }
  const CoursesEnrolled = getCoursesEnrolled.success && getCoursesEnrolled.data ? getCoursesEnrolled.data.items : [];

  const getAllCourses = await getData<{ totalCount: number; items: Course[] }>(
    endpoints.courseCategory.getCourses
  );

  // Handle error case and safely extract courses
  const courses = getAllCourses.success && getAllCourses.data ? getAllCourses.data.items : [];

  if (!getAllCourses.success || 'error' in getAllCourses) {
  }

  const categories =
    (response?.data as CourseCategoriesResponse)?.items ?? [];

      let paymentList: any[] = [];
        const paymentResponse = await getData<any>(
          endpoints.payment.get,  // What is this endpoint?
        );
        paymentList = paymentResponse?.data?.items || [];

  return <Courses categories={categories} getAllCourses={courses} getCoursesEnrolled={CoursesEnrolled}  />;
}
