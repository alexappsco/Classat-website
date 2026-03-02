


import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import CourseDetailsView from 'src/sections/course-details/views';

// ===== Types =====
type CourseResponse = {
  courseId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  durationInHours: number;
  numberOfLessons: number;
  price: number;
  averageRating: number;
  numberOfReviews: number;
  teacherName: string;
  teacherId: string;
  teacherImageUrl: string;
  categoryName: string;
  sections: {
    sectionId: string;
    sectionTitle: string;
    secsions: {
      secsionId: string;
      secsionTitle: string;
      videoUrl: string;
    }[];
  }[];
};

type ApiResponse<T> = {
  data: T;
  message?: string;
  statusCode?: number;
};

type Props = {
  params: Promise<{ id: string }>;
};


export default async function Page({ params }: Props) {
  const { id: courseId } = await params;

  console.log('Course ID from params:', courseId);

  const res = await getData(
    endpoints.courseCategory.getCourse(courseId),
  );

    let paymentList: any[] = [];
      const paymentResponse = await getData<any>(
        endpoints.payment.get,  // What is this endpoint?
      );
      paymentList = paymentResponse?.data?.items || [];
  console.log('Course Data from API:', res);

  const courseResponse = res as ApiResponse<CourseResponse>;
  if (!courseResponse?.data) {
    throw new Error('Course data not found');
  }
  console.log(" Course Response:",courseResponse)

  return <CourseDetailsView course={courseResponse.data}
    paymentList={paymentList}
  />;
}
