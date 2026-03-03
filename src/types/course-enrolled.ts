export interface CoursesEnrolled {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  coverImage: string;
  teacherName: string;
  teacherId: string; // Added from new JSON
  numberOfLessons: number; // Added from new JSON
  totalHours: number; // Added from new JSON
  totalMinutes: number; // Added from new JSON
  progressPercentage: number;
  status: 'Active' | 'Completed' | 'Inactive'; // Defined as literal for better type safety
  watchedHours: number; // Handling the float (e.g., 0.3999...)
  lastWatchedSessionId: string | null;
  enrolledAt: string; // ISO Date string
  completedAt: string | null;
}