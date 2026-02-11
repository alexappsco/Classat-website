

'use server';
import type { SubjectItem, StudentProfile, EducationGrade, SubjectsResponse } from 'src/types/student';

import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';

type ApiResponse<T> = { success: boolean; data: T };
type TeachersData = { totalCount: number; items: any[] };

export default async function TeachersPage({ params, searchParams }: any) {
  const subjectId = params?.subjectId;
  const teacherName = searchParams?.TeacherName;

  if (!subjectId) throw new Error('subjectId is required');

  // جلب بروفايل الطالب
  const studentResponse = await getData<StudentProfile>(endpoints.student.get);
  const studentData = studentResponse.success && studentResponse.data ? studentResponse.data : null;

  // استخراج EducationGrade
  const educationGrade: EducationGrade | undefined =
    studentData?.educationApproach?.educationApproachType?.educationStage?.educationGrade;

  // جلب المواد
  let subjectsResponse: SubjectsResponse | null = null;
  if (educationGrade?.id) {
    const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
    const response = await getData<SubjectsResponse>(url);
    if (response.success && response.data) subjectsResponse = response.data;
  }
  const subjects: SubjectItem[] = subjectsResponse?.items ?? [];

  // جلب المدرسين
  const teachersResponse = await getData<ApiResponse<TeachersData>>(
    endpoints.student.getStudentTeacherEducation(subjectId, teacherName)
  );
  const teachers = (teachersResponse?.data as TeachersData)?.items ?? [];

  // تجهيز المواد للفلتر
  const subjectsForFilter = subjects.map(s => ({
    id: s.id,
    name: s.educationSubjectName,
  }));

  return (
    <InstructorsSection
      teachers={teachers}
      currentSubjectId={subjectId}
      subjects={subjectsForFilter}
      subjectId={subjectId}
    />
  );
}
