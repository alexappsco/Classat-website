
export const endpoints = {
  home:{
    reports:"/admin/home/report",
    mostPurchasedProducts:"/admin/home/most-purchased-products",
    salesRenveu:"/admin/home/sales",
    freeShipping:"/admin/settings",
    editFreeShipping:(id:string)=>`/admin/settings/${id}`
  },
  auth: {
    // login: '/auth/login',
    // refreshToken: '/auth/refresh-token',
    // sendOtp: '/otps/resend-otp',
    // verifyOtp: '/otps/verify-otp',
    // changePassword: '/auth/change-password',
    // viewProf:"/admin/profile/get-profile",
    editProf:"/admin/profile/update-profile",
    sendOtp: '/shared/auth/otp/send',
    register: '/students/register',
    verifyOtpLogin: '/shared/auth/otp/verify',
    refreshToken: '/shared/auth/token/refresh',
  },
paynentMethod: {
    list: '/payment-methods',
  },

  offers: {
    list: '/admin/product-unit-of-measure-offers',
    details: (id: string) => `/admin/product-unit-of-measure-offers/${id}`,
    post: '/admin/product-unit-of-measure-offers',
    single: (id: string) => `/admin/product-unit-of-measure-offers/${id}`,
    patch: (id: string) => `/admin/product-unit-of-measure-offers/${id}`,
    delete: (id: string) => `/admin/product-unit-of-measure-offers/${id}`,
  },


    student:{
    teacherid_appoint:(teacherId:string)=>`/students/teacher/${teacherId}/appointments`,
    get:'/students/profile',
    update: '/students/profile/update',
    changeEmailConfirm:"/shared/auth/email/change/confirm",
    changePhoneConfirm: "/shared/auth/phone/change/confirm",
    changePhone: "/shared/auth/phone/change/request",
    changeEmail:"/shared/auth/email/change/request",
    getEducationTypeStageGradeSubject:'/shared/education/mappings/approach-type-stage-grade-subjects',
    getStudentTeacherEducation: (id: string, teacherName?: string) => {
      let url = `/students/subject/${id}/teachers`;
  if (teacherName) url += `?TeacherName=${teacherName}`;
  return url;
},

  },
  packages: {
    get:(id: string) => `/students/teacher/${id}/packages`,
  },
education_lesson: {
  list: (teacherId: string, subjectId: string) =>
`/students/teacher/${teacherId}/education/${subjectId}/lessons`},
  // courseCategory:{
  //   get:'/shared/course-categories',
  //   getCourses:'/students/teacher/courses',
  // },
  courseCategory: {
  get: '/shared/course-categories',
  getCourses:
    `/students/teacher/courses`,
  getCourse:(courseId: string) =>
    `/students/teacher/course/${courseId}`,
},
cart:{
  getCarts:'/students/cart',
  addToCart:'/students/cart/items',
  deleteCartItem: (cartItemId: string) => `/students/cart/items/${cartItemId}`,

},
country:{
  get: '/shared/location/countries',
},
approaches: {
  get: "/shared/education/approaches"
},
educationApproachType:{
  get:"/shared/education/approach-types"
},
educationApproachTypeStage:{
  get: "/shared/education/mappings/approach-type-stages"
},
educationApproachTypeStageGrade:{
  get: "/shared/education/mappings/approach-type-stage-grades"
},
studentCourse:{
  getCourses: "/students/courses",
},
payment:{
  get: '/shared/payment-methods',
  post_all_payment: '/students/cart/checkout',
  post_single_item: '/students/cart/checkout/direct-booking',
},
studentEducationSession:{
  get: "/students/education-sessions"
},
Lives:{
  get: "/students/lives"
},
studentEducationLesson:{
  get:"/students/education-lessons"
},
CourseEnroll:{
  get:"/students/courses",
  details: (courseId: string) => `/students/courses/${courseId}`,
  getCourses_Sections: (courseId: string) => `/students/courses/${courseId}/sections`,
  getCourses_Section_Sessions: (sectionId: string) => `/students/courses/sections/${sectionId}/sessions`,
  getCourssesLesson: (lessonId: string) => `/students/courses/lessons/${lessonId}`,
  markWatched: (lessonId: string) => `/students/courses/lessons/${lessonId}/mark-watched`,
},
liveCourse:{
  get: "/students/live-session-courses",
  getmyCourses: "/students/live-session-course-enrollments"
},
liveSubjects:{
  get: "/students/live-session-subjects"
},

};