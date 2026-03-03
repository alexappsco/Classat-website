export interface Course {
  courseId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  totalHours: number;
  totalMinutes: number;
  numberOfLessons: number;
  platformProfitPercentage: number;
  taxRate: number;
  price: number;
  priceAfterTaxAndProfit: number;
  averageRating: number;
  numberOfReviews: number;
  teacherName: string;
  teacherId: string;
  teacherImageUrl: string;
  categoryId: string;
  categoryName: string;
  isEnrolled: boolean;
}