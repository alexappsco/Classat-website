

'use server';
import type {
  SubjectItem,
  StudentProfile,
  EducationGrade,
  SubjectsResponse,
} from 'src/types/student';

import { endpoints } from 'src/utils/endpoints';
import Courses from 'src/sections/curricula/view';
import { getData } from 'src/utils/crud-fetch-api';
import AllCourses from 'src/sections/curricula/all-courses/view';
export default async function Page() {
  const coursesResponse = await getData<any>(endpoints.EducationCourses.get);
  const courses = coursesResponse?.data || [] as unknown as any[];
  // xxyyzz
  return (
    <AllCourses
      courses={courses.items || []}
    />
  );
}
