// 'use client';

// import * as React from 'react';
// import { Box } from '@mui/material';

// import Hero from './Hero';
// import SearchBar from './SearchBar'
// import Categories from './categories';
// import { SESSIONS } from './data/sessions';
// import CustomPagination from './CustomPagination';
// import SessionsSection from './sessions/SessionsSection';

// export default function All() {
//   return (
//     <>
//       <Box sx={{ position: 'relative' }}>
//         <Hero />

//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: -60,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 10,
//             width: '90%',
//             maxWidth: 1330,
//           }}
//         >
//           <Categories />
//         </Box>
//       </Box>

//       <Box>
//         <SearchBar />

//         <SessionsSection title="جميع الكورسات" sessions={SESSIONS.ALL_SESSIONS} hideButton />

//         <CustomPagination />
//       </Box>
//     </>
//   );
// }
// 'use client';

// import * as React from 'react';
// import { Box } from '@mui/material';

// import Hero from './Hero';
// import SearchBar from './SearchBar';
// import Categories from './categories';
// import { SESSIONS } from './data/sessions';
// import CustomPagination from './CustomPagination';
// import SessionsSection from './sessions/SessionsSection';

// // ===== Types =====
// type CourseCategory = {
//   id: string;
//   name: string;
//   logo?: string;
// };

// type Props = {
//   categories: CourseCategory[];
// };

// export default function All({ categories }: Props) {
//   return (
//     <>
//       <Box sx={{ position: 'relative' }}>
//         <Hero />

//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: -60,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 10,
//             width: '90%',
//             maxWidth: 1330,
//           }}
//         >
//           <Categories categories={categories} />
//         </Box>
//       </Box>

//       <Box>
//         <SearchBar />

//         <SessionsSection
//           title="جميع الكورسات"
//           sessions={SESSIONS.ALL_SESSIONS}
//           hideButton
//         />

//         <CustomPagination />
//       </Box>
//     </>
//   );
// }






'use client';

import * as React from 'react';
import { Box } from '@mui/material';

import Hero from './Hero';
import SearchBar from './SearchBar';
import Categories from './categories';
import CustomPagination from './CustomPagination';
import SessionsSection from './sessions/SessionsSection';

// ===== Types =====
type CourseCategory = {
  id: string;
  name: string;
  logo?: string;
};

type Props = {
  categories: CourseCategory[];
  sessions: any[];
  paymentList: any[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
};


export default function All({ categories, sessions, paymentList, totalCount, currentPage, pageSize }: Props) {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Hero />

        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '90%',
            maxWidth: 1330,
          }}
        >
          <Categories categories={categories} />
        </Box>
      </Box>

      <Box>
        {/* <SearchBar /> */}
        <SessionsSection
          title="جميع الكورسات"
          sessions={sessions}
          hideButton
          paymentList={paymentList}
        />
        <CustomPagination />
      </Box>
    </>
  );
}
