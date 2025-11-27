import { Container, Grid } from '@mui/material';
// import { useTranslate } from 'src/locales';
import { useTranslations } from 'next-intl';
import StudentCard from './teacherCard';

export interface IStudentCard {
  id?: string;
  img: string;
  name: string;
  studentClass: string;
  language: string;
  country: string;
  date: string;
  time: string;
  href?: string;
}

interface IProps {
  cards: IStudentCard[];
}

const StatisticsStudentsCard = ({ cards }: IProps) => {
  const t = useTranslations();

  return (
    <Grid
      sx={{ p: 0 }}
      // spacing={5}
      display={'flex'}
      justifyContent={'space-between'}
      spacing={{ xs: 2, md: 3 }}
      container
    >
      {cards.map((card, index) => (
        <Grid
          key={card.id || `${card.name}-${index}`}
          xs={12}
          sm={6}
          md={3}
          mt={1}
          // sx={{ padding: 1}}
        >
          <StudentCard
            img={card.img}
            name={card.name}
            subject={card.language}
            // studentClass={card.studentClass}
            // ={card.language}
            // country={card.country}
            date={card.date}
            time={card.time}
            href={card.href}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsStudentsCard;
