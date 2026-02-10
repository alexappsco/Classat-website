// 'use server';

// import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// // ===== Types =====
// type PageProps = {
//   params: {
//     subjectId: string;
//   };
// };

// type TeachersResponse = {
//   success?: boolean;
//   data?: {
//     items?: any[];
//   };
// };

// export default async function TeachersPage({ params }: PageProps) {
//   const { subjectId } = params;

//   const response = (await getData(
//     endpoints.student.getStudentTeacherEducation(subjectId)
//   )) as TeachersResponse;

//   console.log('===== TEACHERS RESPONSE (RAW) =====');
//   console.log(response);
//   console.log('==================================');

//   const teachers =
//     response?.success && response?.data?.items
//       ? response.data.items
//       : [];

//   return (
//     <InstructorsSection
//       teachers={teachers}
//     />
//   );
// }


// 'use server';

// import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// // ===== Types =====
// type PageProps = {
//   params: {
//     subjectId: string;
//   };
// };

// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
// };

// type TeachersData = {
//   totalCount: number;
//   items: any[];
// };

// export default async function TeachersPage({ params }: PageProps) {
//   const { subjectId } = params;

//   const response = (await getData(
//     endpoints.student.getStudentTeacherEducation(subjectId)
//   )) as ApiResponse<TeachersData>;

//   const teachers = response?.data?.items ?? [];

//   return (
//     <InstructorsSection
//       teachers={teachers}
//       currentSubjectId={subjectId}
//     />
//   );
// }





// 'use server';

// import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// import type { StudentProfile, EducationGrade, SubjectItem, SubjectsResponse } from 'src/types/student';

// type PageProps = {
//   params: { subjectId: string };
// };

// export default async function TeachersPage({ params }: PageProps) {
//   const { subjectId } = params;

//   // 1️⃣ جلب profile الطالب
//   const studentResponse = await getData<StudentProfile>(endpoints.student.get);
//   const studentData = studentResponse.success && studentResponse.data ? studentResponse.data : null;

//   // 2️⃣ استخراج EducationGrade (يحتوي على id للـ EducationApproachTypeStageGradeId)
//   const educationGrade: EducationGrade | undefined =
//     studentData?.educationApproach?.educationApproachType?.educationStage?.educationGrade;

//   console.log('EducationApproachTypeStageGrade (id only lol lol):', educationGrade);

//   // 3️⃣ جلب المواد بناءً على الـ id
//   let subjectsResponse: SubjectsResponse | null = null;
//   if (educationGrade?.id) {
//     const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
//     console.log('Subjects request URL:', url);

//     const response = await getData<SubjectsResponse>(url);
//     console.log('Subjects response (RAW from backend):', response);

//     if (response.success && response.data) {
//       subjectsResponse = response.data;
//     }
//   }

//   const subjects: SubjectItem[] = subjectsResponse?.items ?? [];
//   console.log('Subjects items (AS IS):', subjects);

//   // 4️⃣ هنا نطبع المواد فقط، أو نقدر نرسلها للكمبوننت
//   return (
//     <InstructorsSection
//       teachers={[]} // للآن نرسل قائمة فارغة
//     />
//   );
// }

















// 'use server';

// import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// import type { StudentProfile, EducationGrade, SubjectItem, SubjectsResponse } from 'src/types/student';

// type PageProps = {
//   params: { subjectId: string };
// };

// type ApiResponse<T> = {
//   success: boolean;
//   data: T;
// };

// type TeachersData = {
//   totalCount: number;
//   items: any[];
// };

// export default async function TeachersPage({ params }: PageProps) {
//   const { subjectId } = params;

//   // 1️⃣ جلب profile الطالب
//   const studentResponse = await getData<StudentProfile>(endpoints.student.get);
//   const studentData = studentResponse.success && studentResponse.data ? studentResponse.data : null;

//   // 2️⃣ استخراج EducationGrade (يحتوي على id للـ EducationApproachTypeStageGradeId)
//   const educationGrade: EducationGrade | undefined =
//     studentData?.educationApproach?.educationApproachType?.educationStage?.educationGrade;

//   console.log('EducationApproachTypeStageGrade (id only):', educationGrade);

//   // 3️⃣ جلب المواد بناءً على الـ id
//   let subjectsResponse: SubjectsResponse | null = null;
//   if (educationGrade?.id) {
//     const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
//     console.log('Subjects request URL:', url);

//     const response = await getData<SubjectsResponse>(url);
//     console.log('Subjects response (RAW from backend):', response);

//     if (response.success && response.data) {
//       subjectsResponse = response.data;
//     }
//   }

//   const subjects: SubjectItem[] = subjectsResponse?.items ?? [];
//   console.log('Subjects items (AS IS):', subjects);

//   // 4️⃣ جلب المدرسين حسب المادة الحالية
//   const teachersResponse = await getData<ApiResponse<TeachersData>>(
//     endpoints.student.getStudentTeacherEducation(subjectId)
//   );
//   const teachers = teachersResponse?.data?.items ?? [];

//   console.log('Teachers items (AS IS):', teachers);

//   // 5️⃣ تمرير المواد والمدرسين للكمبوننت
//   // بعد ما تجيب subjects من الـ API
// const subjectsForFilter = subjects.map(s => ({
//   id: s.id,
//   name: s.educationSubjectName, // هنا الاسم الصح
// }));

// return (
//   <InstructorsSection
//     teachers={teachers} // أو [] اذا ما عندك المدرسين بعد
//     currentSubjectId={subjectId}
//     subjects={subjectsForFilter} // تبعته للكمبوننت
//   />
// );

// }


// 'use server';
// import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';
// import type { StudentProfile, EducationGrade, SubjectItem, SubjectsResponse } from 'src/types/student';

// type PageProps = {
//   params: { subjectId: string };
//   searchParams?: { TeacherName?: string };
// };

// type ApiResponse<T> = { success: boolean; data: T };
// type TeachersData = { totalCount: number; items: any[] };

// export default async function TeachersPage({ params, searchParams }: PageProps) {
//   const { subjectId } = params;
//   const teacherName = searchParams?.TeacherName;

//   const studentResponse = await getData<StudentProfile>(endpoints.student.get);
//   const studentData = studentResponse.success && studentResponse.data ? studentResponse.data : null;

//   const educationGrade: EducationGrade | undefined =
//     studentData?.educationApproach?.educationApproachType?.educationStage?.educationGrade;

//   let subjectsResponse: SubjectsResponse | null = null;
//   if (educationGrade?.id) {
//     const url = `${endpoints.student.getEducationTypeStageGradeSubject}?EducationApproachTypeStageGradeId=${educationGrade.id}`;
//     const response = await getData<SubjectsResponse>(url);
//     if (response.success && response.data) subjectsResponse = response.data;
//   }
//   const subjects: SubjectItem[] = subjectsResponse?.items ?? [];

//   const teachersResponse = await getData<ApiResponse<TeachersData>>(
//     endpoints.student.getStudentTeacherEducation(subjectId, teacherName)
//   );
//   // const teachers = teachersResponse?.data?.items ?? [];
//   const teachers = (teachersResponse?.data as TeachersData)?.items ?? [];

//   const subjectsForFilter = subjects.map(s => ({
//     id: s.id,
//     name: s.educationSubjectName,
//   }));

//   return (
//     <InstructorsSection
//       teachers={teachers}
//       currentSubjectId={subjectId}
//       subjects={subjectsForFilter}
//     />
//   );
// }





'use server';
import InstructorsSection from 'src/sections/curricula/sections/instructors/InstructorsSection';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import type { StudentProfile, EducationGrade, SubjectItem, SubjectsResponse } from 'src/types/student';

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
