import TopTeacher from 'src/sections/curricula/sections/top-instructor/view';
import { EducationGrade, StudentProfile, SubjectItem, SubjectsResponse } from 'src/types/student';
import { StudentTeacherEducationResponse } from 'src/types/teachers';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

interface Props {
  searchParams: Promise<Record<'page' | 'limit' |'search'| 'rate_from' | 'rate_to' |'subject', string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  let { page, limit, search, rate_from, rate_to , subject} = await searchParams;
  page = page || '1';
  limit = limit || '10';
  search = search || '';
  rate_from = rate_from || '';
  rate_to = rate_to || '';
  subject = subject || '';

  const urlSearchParams = new URLSearchParams({
    SkipCount: `${(Number(page) - 1) * Number(limit)}`,
    MaxResultCount: limit,
    TeacherName: search,
    RateFrom: rate_from,
    RateTo: rate_to,
    EducationApproachTypeStageGradeSubjectId: subject,
  });
  const teacherUrl = `${endpoints.student.getStudentTopTeachers}?${urlSearchParams.toString()}`;
  const teachersResponse = await getData<StudentTeacherEducationResponse>(teacherUrl);
  const teachers = (teachersResponse?.data as StudentTeacherEducationResponse)?.items ?? [];

  const studentResponse = await getData<StudentProfile>(endpoints.student.get);
  const studentData = studentResponse.success && studentResponse.data ? studentResponse.data : null;


  const educationGrade: EducationGrade | undefined =
    studentData?.educationApproach?.educationApproachType?.educationStage?.educationGrade;


    let subjectsResponse: SubjectsResponse | null = null;
  if (educationGrade?.id) {
    const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
    const response = await getData<SubjectsResponse>(url);
    if (response.success && response.data) subjectsResponse = response.data;
  }
  const subjects: SubjectItem[] = subjectsResponse?.items ?? [];
  return (
    <TopTeacher
      subjects={subjects}
      teachers={teachers}
      totalCount={(teachersResponse?.data as StudentTeacherEducationResponse)?.totalCount || 0}
    />
  );
}
