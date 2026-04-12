


'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useTranslations } from 'next-intl';
import { alpha, useTheme } from '@mui/material/styles';

type WalletResponse = {
  studentId: string;
  balance: number;
  isActive: boolean;
  totalCount: number;
  items: {
    transactionId: string;
    transactionType: 'Credit' | 'Debit';
    amount: number;
    description: string;
    createdAt: string;
  }[];
};

type Props = {
  data: WalletResponse | null;
};

export default function WalletView({ data }: Props) {
  const theme = useTheme();
  const t = useTranslations();
  if (!data) return null;

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: '#f4f6f8', py: 4, mt:"100px" }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          {/* Balance */}
         <Card
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    p: 6,
    color: '#fff',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,

    '&::before': {
      content: '""',
      position: 'absolute',
      width: 220,
      height: 220,
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '50%',
      top: -60,
      right: -60,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      width: 180,
      height: 180,
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '50%',
      bottom: -50,
      left: -40,
    },
  }}
>
  <Typography  >
    {t('wallet.balance')}
  </Typography>

  <Typography variant="h4" fontWeight={700}>
    {data.balance} {t('wallet.dirham')}
  </Typography>
</Card>

          {/* Title */}
          <Typography variant="h6" fontWeight={700}>
           {t('wallet.transactions')}
          </Typography>

          {/* Items */}
          <Stack spacing={2}>
            {data.items.map((item) => {
              const isCredit = item.transactionType === 'Credit';

              const formattedDate = new Date(item.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              });

              return (
          <Paper
  key={item.transactionId}
  sx={{
    p: 2,
    borderRadius: 2.5,
    border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
    backgroundColor: '#fff',
    boxShadow: 'none',
  }}
>
  <Stack>
    {/* Top Row (icon + description + divider under them) */}
    <Stack
      direction="row"
      spacing={1.2}
      alignItems="center"
      sx={{
        pb: 1.2,
        mb: 1.2,
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(
            isCredit
              ? theme.palette.info.main
              : theme.palette.error.main,
            0.12
          ),
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={isCredit ? '/assets/green.jpeg' : '/assets/red.jpeg'}
          sx={{
            width: 18,
            height: 18,
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          color: '#111827',
          lineHeight: 1.5,
        }}
      >
        {item.description}
      </Typography>
    </Stack>

    {/* Bottom Row (date + amount) */}
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        variant="caption"
        sx={{ color: '#6b7280' }}
      >
        {formattedDate}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          color: '#111827',
          whiteSpace: 'nowrap',
        }}
      >
        {item.amount.toFixed(2)} {t('wallet.dirham')}
      </Typography>
    </Stack>
  </Stack>
</Paper>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}