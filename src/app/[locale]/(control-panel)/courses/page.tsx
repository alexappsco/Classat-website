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
    console.log('Error fetching courses:', getCoursesEnrolled.error);
  }
  const CoursesEnrolled = getCoursesEnrolled.success && getCoursesEnrolled.data ? getCoursesEnrolled.data.items : [];

  const getAllCourses = await getData<{ totalCount: number; items: Course[] }>(
    endpoints.courseCategory.getCourses
  );

  // Handle error case and safely extract courses
  const courses = getAllCourses.success && getAllCourses.data ? getAllCourses.data.items : [];

  if (!getAllCourses.success || 'error' in getAllCourses) {
    console.log('Error fetching courses:', getAllCourses.error);
  }
  console.log("Courses:", courses)

  const categories =
    (response?.data as CourseCategoriesResponse)?.items ?? [];

<<<<<<< HEAD


  return <Courses  categories={categories} />;
=======
  return <Courses categories={categories} getAllCourses={courses} getCoursesEnrolled={CoursesEnrolled} />;
>>>>>>> ed9856ed790d0554f05835354b694cee55574b42
}
