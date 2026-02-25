// import React from 'react'
// import FiltersBar from 'src/sections/mycourses/filtersBar'
// import MyCoursesSection from 'src/sections/mycourses/mycoursesection'
// function page() {
//   return (
//     <>
//     <FiltersBar />
//     <MyCoursesSection/>
//     </>
//   )
// }
// export default page

// import React from 'react';
// import FiltersBar from 'src/sections/mycourses/filtersBar';
// import MyCoursesSection from 'src/sections/mycourses/mycoursesection';

// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// type Props = {
//   searchParams: {
//     Sorting?: string;
//   };
// };

// async function page({ searchParams }: Props) {
//   let courses: any[] = [];

//   try {
//     const query = searchParams.Sorting
//       ? `${endpoints.studentCourse.getCourses}?Sorting=${searchParams.Sorting}`
//       : endpoints.studentCourse.getCourses;

//     const response = await getData<any>(query);

//     if (response.success) {
//       courses = response.data.items;
//     }

//   } catch (error) {
//     console.error(error);
//   }

//   return (
//     <>
//       <FiltersBar />
//       <MyCoursesSection courses={courses} />
//     </>
//   );
// }

// export default page;





import FiltersBar from 'src/sections/mycourses/filtersBar';
import MyCoursesSection from 'src/sections/mycourses/mycoursesection';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams?: any }) {
  let courses: any[] = [];

  try {
    const query = searchParams?.Sorting
      ? `${endpoints.studentCourse.getCourses}?Sorting=${searchParams.Sorting}`
      : endpoints.studentCourse.getCourses;
    const response = await getData<any>(query, {
      cache: "no-store",
    });

    if (response.success) {
      courses = response.data.items;
    }

  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <FiltersBar />
      <MyCoursesSection courses={courses} />
    </>
  );
}