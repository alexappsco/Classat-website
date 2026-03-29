import { Category } from 'src/types/categories';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { FetchTags } from 'src/actions/config-actions';
import EducationCourseDetailsView from 'src/sections/curricula/education-course-details/view';

interface Props {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<
    Record<'parentName' | 'page' | 'limit' | 'status' | 'search', string | undefined>
  >;
}


export default async function Page({ params, searchParams }: Props) {
  const { courseId } = await params;
  const { parentName, page, limit, status, search } = await searchParams;

  const CourseById = await getData<any>(endpoints.EducationCourses.getCourseByCourseId(courseId));

  if ('error' in CourseById) {
    throw new Error(CourseById.error);
  }

  const sessions = await getData<any>(endpoints.EducationCourses.getsessions(courseId));
  
  return (
    <EducationCourseDetailsView
      courseDetails={CourseById.data}
      sessions={sessions.data.items}

    />
  );
}
