'use client';

import { Container, Grid, Box } from '@mui/material';
import InstructorCard from './InstructorCard';
import Hero from 'src/sections/courses/Hero';
import TeachersFilters from './filter';
import { useRouter } from 'next/navigation';

type TeacherItem = {
  teacherId: string;
  teacherName: string;
  teacherImageUrl: string;
  rating: number;
  nearestAvailableDate: string;
  nearestAvailableTime: string;
  educationSubjectId: string;
};

type SubjectItem = {
  id: string;
  name: string;
};

type Props = {
  teachers: TeacherItem[];
  subjects: { id: string; name: string }[];
  currentSubjectId: string;
  subjectId: string;
};

export default function InstructorsSection({
  teachers,
  subjects,
  currentSubjectId,
  subjectId
}: Props) {
  const router = useRouter();

  const handleBookNow = (teacherId: string) => {
      router.push(`/curricula/details-mathod/${teacherId}?subjectId=${subjectId}`);
  };

  return (

    <>
      <Hero />

      <TeachersFilters
        currentSubjectId={currentSubjectId}
        subjects={subjects}
      />

      <Box sx={{ mt: 8, mb: 10 }}>
        <Container>
          <Grid container spacing={4}>
            {teachers.map((teacher) => (
              <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
                <InstructorCard
                  teacherImageUrl={teacher.teacherImageUrl}
                  teacherName={teacher.teacherName}
                  rating={teacher.rating}
                  nearestAvailableTime={teacher.nearestAvailableTime}
                  teacherId={teacher.teacherId}
                  onBookNow={handleBookNow}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}