import { Grid } from '@mui/material';
import { useTranslate } from 'src/locales';
import StudentCard from '../components/StudentCard';
import { useTranslations } from 'next-intl';

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
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid key={card.id || `${card.name}-${index}`} size={{ xs: 12, sm: 6, md: 3 }}>
          <StudentCard
            img={card.img}
            name={card.name}
            studentClass={card.studentClass}
            language={card.language}
            country={card.country}
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
