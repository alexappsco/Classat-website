// 'use server';

// import Courses from 'src/sections/curricula/view';
// import { getData } from 'src/utils/crud-fetch-api';

// // ===== Types =====
// type EducationGrade = { id: string; name: string };
// type EducationStage = { id: string; name: string; educationGrade?: EducationGrade };
// type EducationApproachType = { id: string; name: string; educationStage?: EducationStage };
// type EducationApproach = { id: string; name: string; educationApproachType?: EducationApproachType };

// type StudentProfile = {
//   userId: string;
//   studentId: string;
//   avatarUrl: string | null;
//   name: string;
//   phoneNumber: string;
//   guardianPhoneNumber: string;
//   email: string;
//   learningPreference: string;
//   country: { id: string; name: string };
//   educationApproach?: EducationApproach;
// };

// type SubjectItem = {
//   id: string;
//   educationSubjectId: string;
//   educationSubjectName: string;
//   educationSubjectLogo: string;
// };

// type SubjectsResponse = {
//   totalCount: number;
//   items: SubjectItem[];
// };

// // ===== Page Server Component =====
// export default async function Page() {
//   // 1️⃣ جلب بيانات الطالب
//   const studentResponse = await getData<StudentProfile>('/students/profile');

//   const studentData =
//     studentResponse.success && studentResponse.data
//       ? studentResponse.data
//       : null;

//   const educationGrade: EducationGrade | undefined =
//     studentData?.educationApproach
//       ?.educationApproachType
//       ?.educationStage
//       ?.educationGrade;

//   console.log('Education Grade:', educationGrade);

//   // 2️⃣ جلب المواد
//   let subjects: SubjectItem[] = [];

//   if (educationGrade?.id) {
//     const subjectsResponse = await getData<SubjectsResponse>(
//       `/shared/education/mappings/approach-type-stage-grade-subjects?educationGradeId=${educationGrade.id}`
//     );

//     subjects =
//       subjectsResponse.success && subjectsResponse.data?.items
//         ? subjectsResponse.data.items
//         : [];
//   }

//   // 3️⃣ إزالة التكرار (حسب educationSubjectId)
//   const uniqueSubjects: SubjectItem[] = Array.from(
//     new Map(subjects.map((item) => [item.educationSubjectId, item])).values()
//   );

//   console.log('Unique Subjects:', uniqueSubjects);

//   return (
//     <Courses
//       educationGrade={educationGrade}
//       subjects={uniqueSubjects}
//     />
//   );
// }

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
