import MyCoursesCard from "src/sections/mycourses/mycoursecard";

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  // AUTH
  auth: {
    login: '/',
    forgotPassword: '/auth/forgot-password',
    register: `${ROOTS.AUTH}/jwt/register`,

  },
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  // Control Panel
  controlPanel: {
    main: '/',
    profile: {
      viewProfileEdit: '/profile'
    },
    technicalSupport: {
      list: '/technical-support',
    },
     mycourses: {
      list: '/mycourses',
      single: (id: string) => `/mycourses/${id}`,
    },
    nextlessons:{
      list: '/nextlessons'
    },
    all_courses:{
      list: (categoryId: string) => `/courses/all/${categoryId}`,
    }


  },
  };
