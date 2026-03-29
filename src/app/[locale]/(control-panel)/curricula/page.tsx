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
export default async function Page() {
  const studentResponse = await getData<StudentProfile>(
    endpoints.student.get
  );
  const studentData =
    studentResponse.success && studentResponse.data
      ? studentResponse.data
      : null;
  const educationGrade: EducationGrade | undefined =
    studentData?.educationApproach
      ?.educationApproachType
      ?.educationStage
      ?.educationGrade;
  let subjectsResponse: SubjectsResponse | null = null;

  if (educationGrade?.id) {
    const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
    const response = await getData<SubjectsResponse>(url);
    if (response.success && response.data) {
      subjectsResponse = response.data;
    }
  }

  const coursesResponse = await getData<any>(endpoints.EducationCourses.get);
  const courses = coursesResponse?.data || [] as unknown as any[];
  // xxyyzz
  const subjects: SubjectItem[] = subjectsResponse?.items ?? [];
  return (
    <Courses
      educationGrade={educationGrade}
      subjects={subjects}
      courses={courses.items || []}
    />
  );
}
