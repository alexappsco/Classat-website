

// import All from 'src/sections/courses/all';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// // ===== Types =====
// type CourseCategory = {
//   id: string;
//   name: string;
//   logo?: string;
// };

// type CourseCategoriesResponse = {
//   totalCount: number;
//   items: CourseCategory[];
// };

// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
// };

// type Props = {
//   searchParams: {
//     categoryId?: string;
//   };
// };

// const TEST_TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTFmNGU3MS04MTQ5LWE3NWYtYTc2My0wYTgwM2MwNmRlMGEiLCJqdGkiOiJjNjkzMTU0Yi00YmJjLTRhM2UtODA5Ny01N2EzNDgwNDU0NGIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Iis5NjY1MTM0NjM0NjQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibGtzbnN2a2RAZ21haWwuY29tIiwiZXhwIjoxNzcwNTM5NDYwLCJpc3MiOiJDbGFzc2F0IiwiYXVkIjoiQ2xhc3NhdCJ9.0IXSfuJYvkxDLi2rmqg7w73jjcNB--natTroebqDKWk';

// export default async function Page({ searchParams }: Props) {
//   const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
//     endpoints.courseCategory.get
//   );

//   const categories =
//     (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

//   const categoryId = searchParams?.categoryId;

//   if (categoryId) {
//     const coursesRes = await getData(
//       endpoints.courseCategory.getCourses(categoryId),
//       {
//         headers: {
//           Authorization: `Bearer ${TEST_TOKEN}`,
//         },
//       }
//     );

//     console.log('CATEGORY ID:', categoryId);
//     console.log('COURSES:', coursesRes);
//   }

//   return <All categories={categories} />;
// }




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

// const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTFmNGZjMi1lMDhlLTgzMWQtNWI0Ny0wMTcyMmM1MjAyZGYiLCJqdGkiOiIwYmU1YTUwNC1iMWE4LTQ1YWItOTdhZS0yMmU4ZjMxYmE5ZDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Iis5NjY1MTc2MzQ3NDMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic2R2c2ZmZmR2QGdtYWlsLmNvbSIsImV4cCI6MTc3MDU2MTU3MCwiaXNzIjoiQ2xhc3NhdCIsImF1ZCI6IkNsYXNzYXQifQ.OpQlYzrvJxz_EDirQogI8X8s4fMge30wuo5Okacpfxk';

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
      // {
      //   headers: {
      //     Authorization: `Bearer ${TEST_TOKEN}`,
      //   },
      // }
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

