// 'use client';

// import React, { useState } from 'react';
// import { Box, Select, MenuItem, InputBase, Button, Typography, Container } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// export default function TeachersFilters() {
//   const [selectedSubject, setSelectedSubject] = useState('اللغة العربية');

//   const subjects = [
//     'اللغة العربية',
//     'التربية الاسلامية',
//     'الرياضيات',
//     'العلوم',
//     'الجغرافيا',
//     'التاريخ',
//     'الكيمياء',
//     'الفيزياء',
//     'اللغة الانجليزية',
//   ];

//   return (
//     <Box
//       sx={{
//         pt: 4,
//         pb: 4,
//         px: { xs: 1, md: 4 },
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//         borderRadius: '23px',
//         backgroundColor: '#fff',
//         textAlign: 'center',
//       }}
//     >
//       <Container>
//         {/* ROW: Nationality + Search */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', md: 'row' },
//             gap: 2,
//             alignItems: 'center',
//             mb: 2,
//           }}
//         >
//           {/* Nationality Dropdown */}

//           {/* Search Box */}
//           <Box
//             sx={{
//               flex: 1,
//               display: 'flex',
//               alignItems: 'center',
//               bgcolor: '#fff',
//               borderRadius: '40px',
//               boxShadow: '0 0 6px rgba(0,0,0,0.15)',
//               px: 2,
//               height: 48,
//             }}
//           >
//             <InputBase placeholder="إبحث عن معلم أو مادة.." sx={{ flex: 1, fontSize: 16 }} />
//             <Button>
//               <SearchIcon sx={{ color: '#40A2E3', fontSize: 26 }} />
//             </Button>
//           </Box>
//         </Box>

//         {/* SUBJECTS TAGS */}
//         <Box
//           sx={{
//             display: 'flex',
//             overflowX: 'auto',
//             gap: 1.3,
//             pt: 1,
//             mt: 1,
//             '&::-webkit-scrollbar': { height: '6px' },
//             '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
//             scrollbarWidth: 'thin',
//           }}
//         >
//           {subjects.map((subject, i) => (
//             <Box
//               key={i}
//               onClick={() => setSelectedSubject(subject)}
//               sx={{
//                 px: 3,
//                 py: 0.8,
//                 borderRadius: '18px',
//                 border: '1px solid #e4e4e4',
//                 whiteSpace: 'nowrap',
//                 cursor: 'pointer',
//                 bgcolor: selectedSubject === subject ? '#40A2E3' : '#fff',
//                 color: selectedSubject === subject ? '#fff' : '#637381',
//                 fontWeight: 500,
//                 fontSize: 15,
//                 transition: '0.2s',
//               }}
//             >
//               {subject}
//             </Box>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// }

//هاد الكود التمم
// 'use client';

// import { Box, Container } from '@mui/material';
// import { useRouter } from 'next/navigation';

// type SubjectItem = {
//   id: string;
//   name: string;
// };

// type Props = {
//   currentSubjectId: string;
// };

// export default function TeachersFilters({ currentSubjectId }: Props) {
//   const router = useRouter();

//   // ⚠️ لازم تجيبهم من API عندك (مثلاً مواد الطالب)
//   const subjects: SubjectItem[] = [
//     { id: 'de5cc192-7213-4918-adc6-cfe0c16d72f1', name: 'الرياضيات' },
//     { id: '226abbdc-7357-4876-ac8f-d40d121c6778', name: 'اللغة العربية' },
//   ];

//   const handleSelectSubject = (subjectId: string) => {
//     if (subjectId === currentSubjectId) return;

//     router.push(`/curricula/subjects/${subjectId}/teachers`);
//   };

//   return (
//     <Box sx={{ py: 4, backgroundColor: '#fff' }}>
//       <Container
//         sx={{
//           display: 'flex',
//           gap: 1.5,
//           overflowX: 'auto',
//         }}
//       >
//         {subjects.map((subject) => (
//           <Box
//             key={subject.id}
//             onClick={() => handleSelectSubject(subject.id)}
//             sx={{
//               px: 3,
//               py: 1,
//               borderRadius: '18px',
//               cursor: 'pointer',
//               whiteSpace: 'nowrap',
//               border: '1px solid #e0e0e0',
//               backgroundColor:
//                 subject.id === currentSubjectId ? '#40A2E3' : '#fff',
//               color:
//                 subject.id === currentSubjectId ? '#fff' : '#637381',
//               transition: '0.2s',
//             }}
//           >
//             {subject.name}
//           </Box>
//         ))}
//       </Container>
//     </Box>
//   );
// }



// 'use client';

// import { Box, Container } from '@mui/material';
// import { useRouter } from 'next/navigation';

// type SubjectItem = {
//   id: string;
//   name: string;
// };

// type Props = {
//   currentSubjectId: string;
//   subjects: SubjectItem[]; // ⚡ المواد الديناميكية
// };

// export default function TeachersFilters({ currentSubjectId, subjects }: Props) {
//   const router = useRouter();

//   const handleSelectSubject = (subjectId: string) => {
//     if (subjectId === currentSubjectId) return;
//     router.push(`/curricula/subjects/${subjectId}/teachers`);
//   };

//   return (
//     <Box sx={{ py: 4, backgroundColor: '#fff' }}>
//       <Container
//         sx={{
//           display: 'flex',
//           gap: 1.5,
//           overflowX: 'auto',
//         }}
//       >
//         {subjects.map((subject) => (
//   <Box
//     key={subject.id}
//     onClick={() => handleSelectSubject(subject.id)}
//     sx={{
//       px: 3,
//       py: 1,
//       borderRadius: '18px',
//       cursor: 'pointer',
//       whiteSpace: 'nowrap',
//       border: '1px solid #e0e0e0',
//       backgroundColor: subject.id === currentSubjectId ? '#40A2E3' : '#fff',
//       color: subject.id === currentSubjectId ? '#fff' : '#637381',
//       transition: '0.2s',
//     }}
//   >
//     {subject.name} {/* هنا الاسم يظهر صح */}
//   </Box>
// ))}
//       </Container>
//     </Box>
//   );
// }
'use client';
import React, { useState } from 'react';
import { Box, Container, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

type SubjectItem = {
  id: string;
  name: string;
};

type Props = {
  currentSubjectId: string;
  subjects: SubjectItem[]; 
};

export default function TeachersFilters({ currentSubjectId, subjects }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectSubject = (subjectId: string) => {
    if (subjectId === currentSubjectId) return;
    router.push(`/curricula/subjects/${subjectId}/teachers`);
  };

  const handleSearch = () => {
    router.push(
      `/curricula/subjects/${currentSubjectId}/teachers?TeacherName=${encodeURIComponent(
        searchTerm
      )}`
    );
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#fff' }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: '40px',
            boxShadow: '0 0 6px rgba(0,0,0,0.15)',
            px: 2,
            height: 48,
            width: '100%',
          }}
        >
          <InputBase
            placeholder="إبحث عن معلم أو مادة.."
            sx={{ flex: 1, fontSize: 16 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Button onClick={handleSearch}>
            <SearchIcon sx={{ color: '#40A2E3', fontSize: 26 }} />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 1.3,
            mt: 1,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' },
            scrollbarWidth: 'thin',
          }}
        >
          {subjects.map((subject) => (
            <Box
              key={subject.id}
              onClick={() => handleSelectSubject(subject.id)}
              sx={{
                px: 3,
                py: 0.8,
                borderRadius: '18px',
                border: '1px solid #e0e0e0',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                bgcolor: subject.id === currentSubjectId ? '#40A2E3' : '#fff',
                color: subject.id === currentSubjectId ? '#fff' : '#637381',
                fontWeight: 500,
                fontSize: 15,
                transition: '0.2s',
              }}
            >
              {subject.name}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
