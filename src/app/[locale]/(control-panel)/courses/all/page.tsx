


import All from 'src/sections/courses/all';
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
};

type CoursesResponse = {
  totalCount: number;
  items: any[];
};

type Props = {
  searchParams: Promise<{
    categoryId?: string;
  }>;
};


export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const categoryId = params?.categoryId;

  // ===== Categories =====
  const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
    endpoints.courseCategory.get
  );

  const categories =
    (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

  let sessions: any[] = [];

  // ===== Courses By Category =====
  if (categoryId) {
    const coursesRes = await getData(
      endpoints.courseCategory.getCourses(categoryId),
    );

   const items =
  (coursesRes?.data as CoursesResponse)?.items ?? [];


    // ===== Mapping to Card Shape =====
    sessions = items.map((course: any) => ({
      id: course.courseId,
      image: course.coverImageUrl,
      category: course.categoryName,
      title: course.title,
      instructor: course.teacherName,
      rate: course.averageRating,
      price: course.price,
      lessons: course.numberOfLessons,
      lessonstime: `${course.durationInHours} ساعة`,
    }));
  }

  // ===== Send to All =====
  return <All categories={categories} sessions={sessions} />;
}

