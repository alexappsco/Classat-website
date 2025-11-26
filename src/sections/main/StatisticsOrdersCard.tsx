import { Grid } from '@mui/material';

import { useTranslate } from 'src/locales';

import AppWidgetSummary from './cards';

export interface ICard {
  id?: string; // Add unique identifier
  href: string;
  icon: string;
  title: string;
  total: number;
  description: string;
}

interface IProps {
  cards: ICard[];
}
const StatisticsOrdersCard = ({ cards }: IProps) => {
  const { t } = useTranslate();
  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid key={card.id || `${card.title}-${index}`} size={{ xs: 6, md: 3 }}>
          <AppWidgetSummary
            title={card.title}
            total={card.total}
            icon={card.icon}
            href={card.href}
            description={card.description}
            customIcon
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsOrdersCard;
