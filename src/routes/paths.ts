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
    mainCourse: '/courses',
    mainCurricula: '/curricula',
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
     mylivecourses: {
      list: '/courses/myLive',
      single: (id: string) => `/courses/myLive/${id}`,
    },
     myliveSubject: {
      list: '/curricula/myLive',
      single: (id: string) => `/curricula/myLive/${id}`,
    },
    nextlessons:{
      list: '/nextlessons'
    },
    all_courses:{
      list: (categoryId: string) => `/courses/all/${categoryId}`,
    }


  },
  };
