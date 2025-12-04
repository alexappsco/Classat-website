
import { Grid, Container } from '@mui/material';

import CourseHero from './course-hero';
import CourseInfo from './course-info';
import CourseMedia from './course-media';
import CourseSidebar from './course-sidebar';
import CourseReviews from './course-reviews';
import RelatedCourses from "./related-courses";
import CourseActions from './course-btn-actions';
import CourseCurriculum from './course-curriculum';
import CourseInstructor from './course-instructor';

export default function CourseDetailsView() {
  return (
    <>
      <Container
        sx={{
          py: 15,
          maxWidth: '1200px !important',
          px: { xs: 2, md: 4 }
        }}
      >
        {/* Main content grid */}
        <Grid container spacing={3}>
          {/* Left column - Course content */}
          <Grid item xs={12} lg={7} order={{ xs: 2, lg: 1 }}>
            <CourseHero />
            <CourseInfo />
            <CourseActions />
            <CourseCurriculum />
            {/* Sidebar on mobile */}
            <Grid sx={{ display: { xs: 'block', lg: 'none' }, mt: 2 }}>
              <CourseSidebar />
            </Grid>
            <CourseInstructor />
            <CourseReviews />
          </Grid>
          {/* Right column - Media and sidebar */}
          <Grid item xs={12} lg={5} order={{ xs: 1, lg: 2 }}>
            <CourseMedia />
            {/* Sidebar on desktop */}
            <Grid sx={{ display: { xs: 'none', lg: 'block' } }}>
              <CourseSidebar />
            </Grid>
          </Grid>
        </Grid>
        <RelatedCourses />
      </Container>
    </>
  );
}
