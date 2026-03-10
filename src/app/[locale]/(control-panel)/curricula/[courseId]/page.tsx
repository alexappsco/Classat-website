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
  console.log("sessions", sessions)
  /*output
{
  "totalCount": 2,
  "items": [
    {
      "sectionId": "6c5c92b7-0a47-4bc4-9396-be2c5f93182f",
      "title": "تش"
    },
    {
      "sectionId": "eb25754a-9ce7-45c0-a947-4bd9f00c5c84",
      "title": "kkk"
    }
  ]
}
  */

console.log("categoryById", CourseById)
/*

Response body
Download
{
  "enrollmentId": "ea537f50-cf1e-478a-aee5-77c3ae6ded73",
  "lessonId": "599f295f-d17a-4fdd-834d-57971487eb1b",
  "lessonTitle": "math",
  "coverImage": "https://api-staging.classat.net/uploads/educational-lesson/images_20260302_092705.jfif",
  "teacherName": "ahmed naguib",
  "teacherImage": "https://api-staging.classat.net/uploads/teachers/profile/pngtree-male-teacher-graphic-character-png-image_14821056_20260302_092139.png",
  "progressPercentage": 0,
  "status": 1,
  "lastWatchedSessionId": null,
  "enrolledAt": "2026-03-08T08:56:11.729674",
  "completedAt": null
}*/
  return (
    <EducationCourseDetailsView
      courseDetails={CourseById.data}
      sessions={sessions.data.items}

    />
  );
}
