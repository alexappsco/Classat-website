
import { Container, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import LessonCard from "./lessonCard";

/* =========================
   Types
========================= */

export interface IStudentCard {
  status:string
  id?: string;
  img: string;
  name: string;
  studentClass: string;
  language: string;
  country: string;
  date: string;
  time: string;
  href?: string;
  bookingType?: "TeacherPrivateSession";

  sessionId?: string; // أي ID حسب النوع
}

interface IProps {
  cards: IStudentCard[];
}

/* =========================
   Component
========================= */

const LessonsSection = ({ cards }: IProps) => {
  const t = useTranslations();

  return (
    <Container
      sx={{
        mt: 20,
        mb: 8,
      }}
    >
      {/* <Typography variant="h4" sx={{ mb: 4,  }}>
        دروسك القادمة
      </Typography> */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {cards.map((card, index) => (
          <Grid
            item
            key={card.id || `${card.name}-${index}`}
            xs={12}
            sm={6}
            md={3}
          >
            <LessonCard
              status={card.status}
              img={card.img}
              name={card.name}
              subject={card.language}
              date={card.date}
              time={card.time}
              enrollmentId={card.id || "" }
              bookingType={card.bookingType || "TeacherPrivateSession"}
              // href={card.href}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LessonsSection;

