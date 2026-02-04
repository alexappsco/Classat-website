// 'use client';

// import { Container, Grid, Box, Stack, Typography } from '@mui/material';
// import { text } from 'src/theme/palette';
// import InstructorCard from './InstructorCard';
// import Hero from 'src/sections/courses/Hero';
// import TeachersFilters from './filter';
// import { useRouter } from 'next/navigation';
// type TeacherItem = {
//   teacherId: string;
//   teacherName: string;
//   teacherImageUrl: string;
//   rating: number;
//   nearestAvailableDate: string;
//   nearestAvailableTime: string; 
//   educationApproachId: string;
//   educationApproachTypeId: string;
//   educationStageId: string;
//   educationGradeId: string;
//   educationSubjectId: string;
// };


// type Props = {
//   title?: string;
//   teachers: TeacherItem[];
// };

// export default function InstructorsSection({ title, teachers }: Props) {
//   const router = useRouter();
//   const primaryTextColor = text.primary;
//   const handleBookNow = (teacherId: string) => {
//     router.push(`/curricula/details-mathod/${teacherId}`);
//   };
//   return (
//     <>
//     <Hero />
//     <TeachersFilters
  
//     />
//     <Box sx={{ mt: 10, mb: 10, py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 }}}>
//       <Container>
//         <Grid container rowGap={{ xs: 4, md: 6 }} spacing={{ xs: 2, md: 4 }}>
//           {teachers.map((teacher) => (
//             <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
//              <InstructorCard
//                 teacherImageUrl={teacher.teacherImageUrl}
//                 teacherName={teacher.teacherName}
//                 rating={teacher.rating}
//                 nearestAvailableTime={teacher.nearestAvailableTime}
//                 teacherId={teacher.teacherId}
//                 onBookNow={handleBookNow} // تمرير الدالة للكارد
//             />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//     </>
    
//   );
// }

// هاد الكو الشغال
// 'use client';

// import { Container, Grid, Box } from '@mui/material';
// import InstructorCard from './InstructorCard';
// import Hero from 'src/sections/courses/Hero';
// import TeachersFilters from './filter';
// import { useRouter } from 'next/navigation';

// type TeacherItem = {
//   teacherId: string;
//   teacherName: string;
//   teacherImageUrl: string;
//   rating: number;
//   nearestAvailableDate: string;
//   nearestAvailableTime: string;
//   educationSubjectId: string;
// };

// type Props = {
//   teachers: TeacherItem[];
//   currentSubjectId: string;
// };

// export default function InstructorsSection({
//   teachers,
//   currentSubjectId,
// }: Props) {
//   const router = useRouter();

//   const handleBookNow = (teacherId: string) => {
//     router.push(`/curricula/details-mathod/${teacherId}`);
//   };

//   return (
//     <>
//       <Hero />

//       <TeachersFilters currentSubjectId={currentSubjectId} />

//       <Box sx={{ mt: 8, mb: 10 }}>
//         <Container>
//           <Grid container spacing={4}>
//             {teachers.map((teacher) => (
//               <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
//                 <InstructorCard
//                   teacherImageUrl={teacher.teacherImageUrl}
//                   teacherName={teacher.teacherName}
//                   rating={teacher.rating}
//                   nearestAvailableTime={teacher.nearestAvailableTime}
//                   teacherId={teacher.teacherId}
//                   onBookNow={handleBookNow}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// }







'use client';

import { Container, Grid, Box } from '@mui/material';
import InstructorCard from './InstructorCard';
import Hero from 'src/sections/courses/Hero';
import TeachersFilters from './filter';
import { useRouter } from 'next/navigation';

type TeacherItem = {
  teacherId: string;
  teacherName: string;
  teacherImageUrl: string;
  rating: number;
  nearestAvailableDate: string;
  nearestAvailableTime: string;
  educationSubjectId: string;
};

type SubjectItem = {
  id: string;
  name: string;
};

type Props = {
  teachers: TeacherItem[];
  subjects: { id: string; name: string }[];
  currentSubjectId: string;
};

export default function InstructorsSection({
  teachers,
  subjects,
  currentSubjectId,
}: Props) {
  const router = useRouter();

  const handleBookNow = (teacherId: string) => {
    router.push(`/curricula/details-mathod/${teacherId}`);
  };

  return (
    <>
      <Hero />

      <TeachersFilters
        currentSubjectId={currentSubjectId}
        subjects={subjects} 
      />

      <Box sx={{ mt: 8, mb: 10 }}>
        <Container>
          <Grid container spacing={4}>
            {teachers.map((teacher) => (
              <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
                <InstructorCard
                  teacherImageUrl={teacher.teacherImageUrl}
                  teacherName={teacher.teacherName}
                  rating={teacher.rating}
                  nearestAvailableTime={teacher.nearestAvailableTime}
                  teacherId={teacher.teacherId}
                  onBookNow={handleBookNow}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
































// 'use client';

// import { useState } from 'react';
// import { Container, Grid, Box } from '@mui/material';
// import InstructorCard from './InstructorCard';
// import TeachersFilters from './filter';
// import Hero from 'src/sections/courses/Hero';
// import { getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// type TeacherItem = {
//   teacherId: string;
//   teacherName: string;
//   teacherImageUrl: string;
//   rating: number;
//   nearestAvailableDate: string;
//   nearestAvailableTime: string;
//   educationSubjectId: string;
// };

// type SubjectItem = {
//   id: string;
//   educationSubjectId: string;
//   educationSubjectName: string;
//   educationSubjectLogo: string;
// };

// type Props = {
//   educationGradeId?: string;
//   subjects: SubjectItem[];
//   teachers: TeacherItem[];
//   defaultSubjectId?: string;
// };

// export default function InstructorsSection({
//   educationGradeId,
//   subjects,
//   teachers: initialTeachers,
//   defaultSubjectId,
// }: Props) {
//   const [teachers, setTeachers] = useState<TeacherItem[]>(initialTeachers);
//   const [selectedSubject, setSelectedSubject] = useState(defaultSubjectId);

//   const handleFilterChange = async (subjectId: string) => {
//     setSelectedSubject(subjectId);

//     if (!subjectId) return;
//     const res = (await getData(
//       endpoints.student.getStudentTeacherEducation(subjectId)
//     )) as { success?: boolean; data?: { items?: TeacherItem[] } };

//     setTeachers(res?.success && res.data?.items ? res.data.items : []);
//   };

//   return (
//     <>
//       <Hero />
//       <TeachersFilters
//         educationGradeId={educationGradeId!}
//         selectedSubjectId={selectedSubject!}
//         onChange={handleFilterChange}
//       />
//       <Box sx={{ mt: 10, mb: 10, py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
//         <Container>
//           <Grid container spacing={{ xs: 2, md: 4 }} rowGap={{ xs: 4, md: 6 }}>
//             {teachers.map((teacher) => (
//               <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
//                 <InstructorCard
//                   teacherImageUrl={teacher.teacherImageUrl}
//                   teacherName={teacher.teacherName}
//                   rating={teacher.rating}
//                   nearestAvailableTime={teacher.nearestAvailableTime}
//                   teacherId={teacher.teacherId}
//                   onBookNow={(id) => window.location.assign(`/curricula/details-mathod/${id}`)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// }


