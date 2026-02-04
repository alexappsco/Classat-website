// // ===== Education Hierarchy =====
// export type EducationGrade = {
//   id: string;
//   name: string;
// };

// export type EducationStage = {
//   id: string;
//   name: string;
//   educationGrade?: EducationGrade;
// };

// export type EducationApproachType = {
//   id: string;
//   name: string;
//   educationStage?: EducationStage;
// };

// export type EducationApproach = {
//   id: string;
//   name: string;
//   educationApproachType?: EducationApproachType;
// };

// // ===== Student =====
// export type StudentProfile = {
//   userId: string;
//   studentId: string;
//   avatarUrl: string | null;
//   name: string;
//   phoneNumber: string;
//   guardianPhoneNumber: string;
//   email: string;
//   learningPreference: string;
//   country: {
//     id: string;
//     name: string;
//   };
//   educationApproach?: EducationApproach;
// };

// // ===== Subjects =====
// export type SubjectItem = {
//   id: string;
//   educationSubjectId: string;
//   educationSubjectName: string;
//   educationSubjectLogo: string;
// };

// export type SubjectsResponse = {
//   totalCount: number;
//   items: SubjectItem[];
// };


// ===== Student Types =====
export type EducationGrade = { id: string; name: string };
export type EducationStage = { id: string; name: string; educationGrade?: EducationGrade };
export type EducationApproachType = { id: string; name: string; educationStage?: EducationStage };
export type EducationApproach = { id: string; name: string; educationApproachType?: EducationApproachType };

export type StudentProfile = {
  userId: string;
  studentId: string;
  avatarUrl: string | null;
  name: string;
  phoneNumber: string;
  guardianPhoneNumber: string;
  email: string;
  learningPreference: string;
  country: { id: string; name: string };
  educationApproach?: EducationApproach;
};

export type SubjectItem = {
  id: string;
  educationSubjectId: string;
  educationSubjectName: string;
  educationSubjectLogo: string;
};

export type SubjectsResponse = {
  totalCount: number;
  items: SubjectItem[];
};


