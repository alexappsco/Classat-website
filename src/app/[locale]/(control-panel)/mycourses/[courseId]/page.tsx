import { Category } from 'src/types/categories';
import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import { FetchTags } from 'src/actions/config-actions';
import CourseDetailsEnrolledView from 'src/sections/courses/course-enrolled-details/view';
import { CourseEnrolledDetails, sectionsNumber, sessionSection } from 'src/types/course_enrolled';

interface Props {
    params: Promise<{ courseId: string }>;
}


export default async function Page({ params }: Props) {
    const { courseId } = await params;

    let courseDetails: CourseEnrolledDetails = {} as CourseEnrolledDetails;
    const categoryByRes = await getData<{ data: CourseEnrolledDetails }>(endpoints.CourseEnroll.details(courseId));
    courseDetails = categoryByRes.data as CourseEnrolledDetails;

    if ('error' in categoryByRes) {
        throw new Error(categoryByRes.error);
    }
    const section_nums_res = await getData<{ totalCount: number, items: sectionsNumber[] }>(endpoints.CourseEnroll.getCourses_Sections(courseId));
    if ('error' in section_nums_res) {
        throw new Error(section_nums_res.error);
    }

    // const session_sections_res = await getData<{ totalCount: number, items: sessionSection[] }>(endpoints.CourseEnroll.getCourses_Section_Sessions(section_nums_res.data.items.sectionId));
    // if ('error' in session_sections_res) {
    //     throw new Error(session_sections_res.error);
    // }
    // console.log("session_sections_res bb", session_sections_res);

    return (
        <CourseDetailsEnrolledView
            course={courseDetails}
            sections={section_nums_res?.data?.items}
        />
    );
}
