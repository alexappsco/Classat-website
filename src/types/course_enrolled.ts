// export interface CourseEnrolledDetails {
//     enrollmentId: string;
//     courseId: string;
//     courseTitle: string;
//     courseDescription: string;
//     coverImage: string;
//     teacherName: string;
//     progressPercentage: number;
//     status: number;
//     lastWatchedSessionId: null;
//     videoDuration: string;
//     isWatched: boolean;
//     enrolledAt: Date;
//     completedAt: null;
// }
export interface CourseEnrolledDetails {
  enrollmentId: string;
  courseId: string;
  courseCategoryId: string; // Added from API
  courseCategoryName: string; // Added from API
  courseTitle: string;
  courseDescription: string;
  coverImage: string;
  teacherName: string;
  progressPercentage: number;
  status: number;
  lastWatchedSessionId: string | null; // Changed to allow string or null
  videoDuration: string;
  isWatched: boolean;
  enrolledAt: string; // API returns ISO string, usually handled as string in TS
  completedAt: string | null; // Changed to allow string or null
}

export interface sectionsNumber {

    sectionId: string;
    title: string;
}
export interface sessionSection {
    isLastWatched: boolean;
    isWatched: boolean;
    sessionId: string;
    title: string;
    videoUrl: string;
    videoDuration: string;
}
export interface CourseLesson {
  lessonId: string;
  title: string;
  videoUrl: string;
  videoDuration: string;
  isWatched: boolean;

}

