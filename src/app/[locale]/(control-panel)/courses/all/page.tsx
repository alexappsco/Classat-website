


// // import All from 'src/sections/courses/all';
// // import { endpoints } from 'src/utils/endpoints';
// // import { getData } from 'src/utils/crud-fetch-api';

// // // ===== Types =====
// // type CourseCategory = {
// //   id: string;
// //   name: string;
// //   logo?: string;
// // };

// // type CourseCategoriesResponse = {
// //   totalCount: number;
// //   items: CourseCategory[];
// // };

// // type ApiResponse<T> = {
// //   success: boolean;
// //   data: T;
// // };

// // type CoursesResponse = {
// //   totalCount: number;
// //   items: any[];
// // };

// // interface Props {
// //   searchParams: Promise<
// //     Record<
// //       | 'CourseCategoryId'| string, // Allow other string keys
// //       string | undefined
// //     >
// //   >;
// // }


// // export default async function Page({ searchParams }: Props) {
// //   const params = await searchParams;
// //   const courseCategoryId = params?.CourseCategoryId;

// //   // ===== Categories =====
// //   const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
// //     `${endpoints.courseCategory.get}?Name=${params?.Name || ''}`

// //   );

// //   const categories =
// //     (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

// //   let sessions: any[] = [];

// //   // ===== Courses By Category =====
// //   // if (CourseCategoryId) {
// //     const coursesRes = await getData(
// //       `/students/teacher/courses?CourseCategoryId =${params.CourseCategoryId}`,
// //     );

// //     console.log("coursesRes", coursesRes)
// //    const items =
// //   (coursesRes?.data as CoursesResponse)?.items ?? [];


// //     // ===== Mapping to Card Shape =====
// //     sessions = items.map((course: any) => ({
// //       id: course.courseId,
// //       image: course.coverImageUrl,
// //       category: course.categoryName,
// //       title: course.title,
// //       instructor: course.teacherName,
// //       rate: course.averageRating,
// //       price: course.price,
// //       lessons: course.numberOfLessons,
// //       lessonstime: `${course.durationInHours} ساعة`,
// //     }));

// //     console.log("sessions", sessions)
// //   // ===== Send to All =====
// //   return <All categories={categories} sessions={sessions} />;
// // }

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
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }

// export default async function Page({ searchParams }: Props) {
//   const params = await searchParams;

//   // Ensure this matches the key used in your router.push (categoryId)
//   const categoryId = params?.categoryId || '';

//   // 1. Fetch Categories for the Top Bar
//   const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
//     `${endpoints.courseCategory.get}?Name=${params?.Name || ''}`
//   );

//   const categories = (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

//   // 2. Fetch Courses
//   // If categoryId is empty, it should fetch all courses (depending on your API behavior)
//   const coursesUrl = categoryId
//     ? `/students/teacher/courses?CourseCategoryId=${categoryId}`
//     : `/students/teacher/courses`;

//     const coursesRes = await getData(coursesUrl);
//     console.log("coursesUrl", coursesRes)


//   const items = (coursesRes?.data as CoursesResponse)?.items ?? [];

//   console.log("courses master", items)

//   // 3. Mapping to Card Shape

//   let paymentList: any[] = [];
//     const paymentResponse = await getData<any>(
//       endpoints.payment.get,  // What is this endpoint?
//     );
//     paymentList = paymentResponse?.data?.items || [];

//   return <All categories={categories} sessions={items} paymentList={paymentList} />;
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
  console.log("All search params:", params); // Debug log

  // Extract all possible filter parameters
  const {
    categoryId,
    Name,
    Title,
    IsEnrolled,
    SortType,
    PriceFrom,
    PriceTo,
    DurationFrom,
    DurationTo,
    RatingFrom,
    RatingTo,
    page,
    limit,
  } = params;

  // Set defaults
  const currentPage = page || '1';
  const pageSize = limit || '12';

  // 1. Fetch Categories for the Top Bar
  const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
    `${endpoints.courseCategory.get}?Name=${Name || ''}`
  );

  const categories = (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

  // 2. Build URL Search Params for Courses
  const urlSearchParams = new URLSearchParams();

  // Add pagination
  urlSearchParams.append('SkipCount', `${(Number(currentPage) - 1) * Number(pageSize)}`);
  urlSearchParams.append('MaxResultCount', pageSize);

  // Add filters if they exist
  if (categoryId) urlSearchParams.append('CourseCategoryId', categoryId);
  if (Title) urlSearchParams.append('Title', Title);
  if (IsEnrolled) urlSearchParams.append('IsEnrolled', IsEnrolled);
  if (SortType) urlSearchParams.append('SortType', SortType);
  if (PriceFrom) urlSearchParams.append('PriceFrom', PriceFrom);
  if (PriceTo) urlSearchParams.append('PriceTo', PriceTo);
  if (DurationFrom) urlSearchParams.append('DurationFrom', DurationFrom);
  if (DurationTo) urlSearchParams.append('DurationTo', DurationTo);
  if (RatingFrom) urlSearchParams.append('RatingFrom', RatingFrom);
  if (RatingTo) urlSearchParams.append('RatingTo', RatingTo);

  // 3. Fetch Courses with all filters
  const coursesUrl = `/students/teacher/courses?${urlSearchParams.toString()}`;
  console.log("Final Courses URL:", coursesUrl); // Debug log

  const coursesRes = await getData(coursesUrl);
  console.log("Courses Response:", coursesRes);

  const items = (coursesRes?.data as CoursesResponse)?.items ?? [];
  const totalCount = (coursesRes?.data as CoursesResponse)?.totalCount ?? 0;

  console.log("Courses fetched:", items.length, "Total:", totalCount);

  // 4. Fetch Payment Methods
  let paymentList: any[] = [];
  const paymentResponse = await getData<any>(
    endpoints.payment.get,
  );
  paymentList = paymentResponse?.data?.items || [];

  return (
    <All
      categories={categories}
      sessions={items}
      paymentList={paymentList}
      totalCount={totalCount}
      currentPage={Number(currentPage)}
      pageSize={Number(pageSize)}
    />
  );
}