import { Container, Grid, Box } from '@mui/material';
import InstructorCard from './InstructorCard';
import { text } from 'src/theme/palette';
import { StudentTeacherEducationItem } from 'src/types/teachers';

export default function InstructorsSection({
  teachers,
}: {
  teachers: StudentTeacherEducationItem[];
}) {
  const primaryTextColor = text.primary;

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 }, mt: 12 }}>
      <Container>
        <Grid container rowGap={{ xs: 12, md: 6 }} spacing={{ xs: 2, md: 4 }} sx={{ mt: 5 }}>
          {teachers?.map((teacher) => (
            <Grid item xs={12} sm={6} md={3} key={teacher.teacherId}>
              <InstructorCard
                teacher={teacher}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
