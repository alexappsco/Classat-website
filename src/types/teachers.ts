export interface StudentTeacherEducationResponse {
  items: StudentTeacherEducationItem[];
  totalCount: number;
}

export interface StudentTeacherEducationItem {
  teacherId: string;
  fullName: string;
  subjectName: string;
  educationApproachTypeStageGradeSubjectId: string;
  profileImageUrl: string;
  priceOneToOne: number;
  priceLiveGroup: number;
  priceRecorded: number;
  platformProfitPercentage: number;
  taxRate: number;
  priceOneToOneAfterTaxAndProfit: number;
  priceRecordedAfterTaxAndProfit: number;
  numberOfReviews: number;
  averageRating: number;
  reviewsCount: number;
}
