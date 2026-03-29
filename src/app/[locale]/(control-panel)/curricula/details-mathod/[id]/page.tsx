'use server';

import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import InstructorProfileUI from 'src/sections/details/view';

// ===== Types =====
type Package = {
  id: string;
  name: string;
  hours: number;
  validityDays: number;
  price: number;
  discountPercentage: number;
};

type ApiResponse = {
  totalCount: number;
  items: Package[];
};

interface Props {
  params: Promise<{ id: string }>; // Only id in params
  searchParams: Promise<
  Record<'subjectId' | 'page' | 'limit' | 'StartDate' | 'EndDate', string | undefined>
  >; 


}

// ===== Page Component =====
export default async function Page({ params, searchParams }: Props) {
    const { id } = await params;
    const { subjectId } = await searchParams;

  let { page, limit, StartDate, EndDate } = await searchParams;
  page = page || '1';
  limit = limit || '5';

  const urlSearchParams = new URLSearchParams({
    SkipCount: `${(Number(page) - 1) * Number(limit)}`,
    MaxResultCount: limit,
    StartDate: StartDate || '',
    EndDate: EndDate || '',
  });

  if (!id) throw new Error('Teacher ID is required');

  // 1. Fetch packages
  const response = await getData<ApiResponse>(endpoints.packages.get(id));
  const packagesData = (response.data as any).items || [];

  // 2. Fetch student appointments
  let studentAppointments = null;
  try {
    const appointments = await getData<any>(`/students/teacher/${id}/appointments?${urlSearchParams}`);
    if (response.success && response.data) {
      studentAppointments = appointments.data?.items || appointments.data;
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }

  // 3. Fetch lessons - using subjectId from query params
  let lessonList: any[] = [];
  if (id && subjectId) {
    try {
      const res = await getData<any>(
        `/students/teacher/${id}/education/${subjectId}/lessons`
      );

      if (res.success && res.data) {
        // Handle different response structures
        if (Array.isArray(res.data)) {
          lessonList = res.data;
        } else if (res.data.items && Array.isArray(res.data.items)) {
          lessonList = res.data.items;
        } else {
          lessonList = res.data;
        }
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  }
  let paymentList: any[] = [];
    const paymentResponse = await getData<any>(
      endpoints.payment.get,  // What is this endpoint?
    );
    paymentList = paymentResponse?.data?.items || [];
  return (
    <InstructorProfileUI
      packagesData={packagesData}
      studentAppointments={studentAppointments}
      id={id}
      lessonList={lessonList}
      paymentList={paymentList}
      subjectId={subjectId || ''}
    />
  );
}