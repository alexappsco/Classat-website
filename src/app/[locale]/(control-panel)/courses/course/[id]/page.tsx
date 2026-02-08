// import CourseDetailsView from 'src/sections/course-details/views'

// export default function Page() {
//   return <CourseDetailsView/>;
// }


// import CourseDetailsView from 'src/sections/course-details/views';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// // ===== Types =====
// type CourseResponse = {
//   courseId: string;
//   title: string;
//   description: string;
//   coverImageUrl: string;
//   durationInHours: number;
//   numberOfLessons: number;
//   price: number;
//   averageRating: number;
//   numberOfReviews: number;
//   teacherName: string;
//   teacherImageUrl: string;
//   categoryName: string;
//   sections: {
//     sectionId: string;
//     sectionTitle: string;
//     secsions: {
//       secsionId: string;
//       secsionTitle: string;
//       videoUrl: string;
//     }[];
//   }[];
// };

// type Props = {
//   params: { id: string }; 
// };

// const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTFmNGZhMi04NjcxLWYxMDQtYWMyYS02MjRhOWFmYjk1ODIiLCJqdGkiOiIzY2JkNTAyYy1mNzZjLTQ2Y2MtOGY0MS1iYzk0YTE1N2IwN2EiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Iis5NjY1MTQ1Njc0NzUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic2RmdnNAZ21haS5jb20iLCJleHAiOjE3NzA1NTk0NDksImlzcyI6IkNsYXNzYXQiLCJhdWQiOiJDbGFzc2F0In0.PgFcnl1XmVXPro-gbdj7MZVyJtdWhFi1a4fB62YKJPI';

// export default async function Page({ params }: Props) {
//   const { id: courseId } = params; 
//   console.log('Course ID from params:', courseId);

//   // ===== Fetch course data =====
//   const res = await getData<CourseResponse>(
//     endpoints.courseCategory.getCourse(courseId),
//     {
//       headers: {
//         Authorization: `Bearer ${TEST_TOKEN}`,
//         'Accept-Language': 'ar',
//       },
//     }
//   );

//   console.log('Course Data from API:', res);

//   return <CourseDetailsView course={res.data} />;
// }




// import CourseDetailsView from 'src/sections/course-details/views';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// // ===== Types =====
// type CourseResponse = {
//   courseId: string;
//   title: string;
//   description: string;
//   coverImageUrl: string;
//   durationInHours: number;
//   numberOfLessons: number;
//   price: number;
//   averageRating: number;
//   numberOfReviews: number;
//   teacherName: string;
//   teacherImageUrl: string;
//   categoryName: string;
//   sections: {
//     sectionId: string;
//     sectionTitle: string;
//     secsions: {
//       secsionId: string;
//       secsionTitle: string;
//       videoUrl: string;
//     }[];
//   }[];
// };

// type ApiResponse<T> = {
//   data: T;
//   message?: string;
//   statusCode?: number;
// };

// type Props = {
//   params: { id: string };
// };

// const TEST_TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTFmNGZhMi04NjcxLWYxMDQtYWMyYS02MjRhOWFmYjk1ODIiLCJqdGkiOiIzY2JkNTAyYy1mNzZjLTQ2Y2MtOGY0MS1iYzk0YTE1N2IwN2EiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Iis5NjY1MTQ1Njc0NzUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic2RmdnNAZ21haS5jb20iLCJleHAiOjE3NzA1NTk0NDksImlzcyI6IkNsYXNzYXQiLCJhdWQiOiJDbGFzc2F0In0.PgFcnl1XmVXPro-gbdj7MZVyJtdWhFi1a4fB62YKJPI'; // اختصرته عادي تحط توكنك كامل

// // ===== Page =====
// export default async function Page({ params }: Props) {
//   const { id: courseId } = params;

//   console.log('Course ID from params:', courseId);

//   // ===== Fetch =====
//   const res = await getData(
//     endpoints.courseCategory.getCourse(courseId),
//     {
//       headers: {
//         Authorization: `Bearer ${TEST_TOKEN}`,
//         'Accept-Language': 'ar',
//       },
//     }
//   );
//   console.log('Course Data from API:', res);
//   const courseResponse = res as ApiResponse<CourseResponse>;
//   if (!courseResponse?.data) {
//     throw new Error('Course data not found');
//   }
//   return <CourseDetailsView course={courseResponse.data} />;
// }



import CourseDetailsView from 'src/sections/course-details/views';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

// ===== Types =====
type CourseResponse = {
  courseId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  durationInHours: number;
  numberOfLessons: number;
  price: number;
  averageRating: number;
  numberOfReviews: number;
  teacherName: string;
  teacherImageUrl: string;
  categoryName: string;
  sections: {
    sectionId: string;
    sectionTitle: string;
    secsions: {
      secsionId: string;
      secsionTitle: string;
      videoUrl: string;
    }[];
  }[];
};

type ApiResponse<T> = {
  data: T;
  message?: string;
  statusCode?: number;
};

type Props = {
  params: Promise<{ id: string }>;
};

// const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYTFmNGZjMi1lMDhlLTgzMWQtNWI0Ny0wMTcyMmM1MjAyZGYiLCJqdGkiOiIwYmU1YTUwNC1iMWE4LTQ1YWItOTdhZS0yMmU4ZjMxYmE5ZDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Iis5NjY1MTc2MzQ3NDMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic2R2c2ZmZmR2QGdtYWlsLmNvbSIsImV4cCI6MTc3MDU2MTU3MCwiaXNzIjoiQ2xhc3NhdCIsImF1ZCI6IkNsYXNzYXQifQ.OpQlYzrvJxz_EDirQogI8X8s4fMge30wuo5Okacpfxk';

// ===== Page =====
export default async function Page({ params }: Props) {
  // ✅ لازم await
  const { id: courseId } = await params;

  console.log('Course ID from params:', courseId);

  // ===== Fetch =====
  const res = await getData(
    endpoints.courseCategory.getCourse(courseId),
    // {
    //   headers: {
    //     Authorization: `Bearer ${TEST_TOKEN}`,
    //     'Accept-Language': 'ar',
    //   },
    // }
  );

  console.log('Course Data from API:', res);

  // ===== Cast response =====
  const courseResponse = res as ApiResponse<CourseResponse>;

  if (!courseResponse?.data) {
    throw new Error('Course data not found');
  }

  return <CourseDetailsView course={courseResponse.data} />;
}
