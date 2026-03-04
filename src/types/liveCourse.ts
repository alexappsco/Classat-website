export interface ILiveCourse {
  id: string;
  title: string;
  totalHours: number;
  totalMinutes: number;
  date: string;          // ISO Date string (e.g. "2026-03-12T17:49:00")
  time: string;          // Time string (e.g. "17:49:00")
  price: number;
  teacherName: string;
  teacherId: string;
  teacherImagePath: string;
  courseCategory: string;
  coverImagePath: string;
  // status: 'Scheduled' | 'Completed' | 'Cancelled' | 'InProgress'; // ممكن تزود حالات تانية لو موجودة
  status: string; // ممكن تزود حالات تانية لو موجودة
  isEnrolled: boolean;
}