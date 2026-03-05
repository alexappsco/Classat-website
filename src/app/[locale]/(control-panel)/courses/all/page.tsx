


// import All from 'src/sections/courses/all';
// import { endpoints } from 'src/utils/endpoints';
// import { getData } from 'src/utils/crud-fetch-api';

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

// type CoursesResponse = {
//   totalCount: number;
//   items: any[];
// };

// interface Props {
//   searchParams: Promise<
//     Record<
//       | 'CourseCategoryId'| string, // Allow other string keys
//       string | undefined
//     >
//   >;
// }


// export default async function Page({ searchParams }: Props) {
//   const params = await searchParams;
//   const courseCategoryId = params?.CourseCategoryId;

//   // ===== Categories =====
//   const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
//     `${endpoints.courseCategory.get}?Name=${params?.Name || ''}`

//   );

//   const categories =
//     (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

//   let sessions: any[] = [];

//   // ===== Courses By Category =====
//   // if (CourseCategoryId) {
//     const coursesRes = await getData(
//       `/students/teacher/courses?CourseCategoryId =${params.CourseCategoryId}`,
//     );

//     console.log("coursesRes", coursesRes)
//    const items =
//   (coursesRes?.data as CoursesResponse)?.items ?? [];


//     // ===== Mapping to Card Shape =====
//     sessions = items.map((course: any) => ({
//       id: course.courseId,
//       image: course.coverImageUrl,
//       category: course.categoryName,
//       title: course.title,
//       instructor: course.teacherName,
//       rate: course.averageRating,
//       price: course.price,
//       lessons: course.numberOfLessons,
//       lessonstime: `${course.durationInHours} ساعة`,
//     }));

//     console.log("sessions", sessions)
//   // ===== Send to All =====
//   return <All categories={categories} sessions={sessions} />;
// }

import All from 'src/sections/courses/all';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';

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

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  // Ensure this matches the key used in your router.push (categoryId)
  const categoryId = params?.categoryId || '';

  // 1. Fetch Categories for the Top Bar
  const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
    `${endpoints.courseCategory.get}?Name=${params?.Name || ''}`
  );

  const categories = (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

  // 2. Fetch Courses
  // If categoryId is empty, it should fetch all courses (depending on your API behavior)
  const coursesUrl = categoryId
    ? `/students/teacher/courses?CourseCategoryId=${categoryId}`
    : `/students/teacher/courses`;

    const coursesRes = await getData(coursesUrl);
    console.log("coursesUrl", coursesRes)


  const items = (coursesRes?.data as CoursesResponse)?.items ?? [];

  console.log("courses master", items)

  // 3. Mapping to Card Shape

  let paymentList: any[] = [];
    const paymentResponse = await getData<any>(
      endpoints.payment.get,  // What is this endpoint?
    );
    paymentList = paymentResponse?.data?.items || [];

  return <All categories={categories} sessions={items} paymentList={paymentList} />;
}