
import RecoarLessonsSection from 'src/sections/curricula/recoardlessons/RecoarLessonsSection';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import { StudentLesson } from 'src/sections/curricula/recoardlessons/RecoarLessonsSection';

export default async function Page() {
  const response = await getData(endpoints.studentEducationLesson.get);

  const lessons = (response.data as { items: StudentLesson[] })?.items ?? [];

  return <RecoarLessonsSection lessons={lessons} />;
}