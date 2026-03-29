import All from 'src/sections/courses/all';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';

// ===== Types =====
type CourseCategory = {
  id: string;
  name: string;
  logo?: string;
};

type CourseCategoriesResponse = {
  totalCount: number;
  items: CourseCategory[];
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type CoursesResponse = {
  totalCount: number;
  items: any[];
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  // Extract all possible filter parameters
  const {
    categoryId,
    Name,
    Title,
    IsEnrolled,
    SortType,
    PriceFrom,
    PriceTo,
    DurationFrom,
    DurationTo,
    RatingFrom,
    RatingTo,
    page,
    limit,
  } = params;

  // Set defaults
  const currentPage = page || '1';
  const pageSize = limit || '12';

  // 1. Fetch Categories for the Top Bar
  const categoriesRes = await getData<ApiResponse<CourseCategoriesResponse>>(
    `${endpoints.courseCategory.get}?Name=${Name || ''}`
  );

  const categories = (categoriesRes?.data as CourseCategoriesResponse)?.items ?? [];

  // 2. Build URL Search Params for Courses
  const urlSearchParams = new URLSearchParams();

  // Add pagination
  urlSearchParams.append('SkipCount', `${(Number(currentPage) - 1) * Number(pageSize)}`);
  urlSearchParams.append('MaxResultCount', pageSize);

  // Add filters if they exist
  if (categoryId) urlSearchParams.append('CourseCategoryId', categoryId);
  if (Title) urlSearchParams.append('Title', Title);
  if (IsEnrolled) urlSearchParams.append('IsEnrolled', IsEnrolled);
  if (SortType) urlSearchParams.append('SortType', SortType);
  if (PriceFrom) urlSearchParams.append('PriceFrom', PriceFrom);
  if (PriceTo) urlSearchParams.append('PriceTo', PriceTo);
  if (DurationFrom) urlSearchParams.append('DurationFrom', DurationFrom);
  if (DurationTo) urlSearchParams.append('DurationTo', DurationTo);
  if (RatingFrom) urlSearchParams.append('RatingFrom', RatingFrom);
  if (RatingTo) urlSearchParams.append('RatingTo', RatingTo);

  // 3. Fetch Courses with all filters
  const coursesUrl = `/students/teacher/courses?${urlSearchParams.toString()}`;

  const coursesRes = await getData(coursesUrl);

  const items = (coursesRes?.data as CoursesResponse)?.items ?? [];
  const totalCount = (coursesRes?.data as CoursesResponse)?.totalCount ?? 0;


  // 4. Fetch Payment Methods
  let paymentList: any[] = [];
  const paymentResponse = await getData<any>(
    endpoints.payment.get,
  );
  paymentList = paymentResponse?.data?.items || [];

  return (
    <All
      categories={categories}
      sessions={items}
      paymentList={paymentList}
      totalCount={totalCount}
      currentPage={Number(currentPage)}
      pageSize={Number(pageSize)}
    />
  );
}