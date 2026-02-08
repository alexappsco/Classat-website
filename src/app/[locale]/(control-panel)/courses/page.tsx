'use server';

import Courses from 'src/sections/courses/view';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

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

  const categories =
    (response?.data as CourseCategoriesResponse)?.items ?? [];

  return <Courses categories={categories} />;
}
