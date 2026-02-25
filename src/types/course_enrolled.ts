export interface CourseEnrolledDetails {
    enrollmentId: string;
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    coverImage: string;
    teacherName: string;
    progressPercentage: number;
    status: number;
    lastWatchedSessionId: null;
    videoDuration: string;
    isWatched: boolean;
    enrolledAt: Date;
    completedAt: null;
}

export interface sectionsNumber {

    sectionId: string;
    title: string;
}
export interface sessionSection {
    sessionId: string;
    title: string;
    videoUrl: string;
    isLastWatched: boolean;
    videoDuration: string;
    isWatched: boolean;
}
export interface CourseLesson {
  lessonId: string;
  title: string;
  videoUrl: string;
  videoDuration: string;
  isWatched: boolean;

}

