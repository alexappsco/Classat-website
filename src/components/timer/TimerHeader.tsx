import { Box, Typography } from '@mui/material';

interface TimerHeaderProps {
  title: string;
  subtitle?: string;
}

export default function TimerHeader({ title, subtitle }: TimerHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '8px',
        zIndex: 1,
      }}
    >
      {/* title */}
      <Typography
        sx={{
          width: { xs: '100%', md: '516px' },
          height: { xs: 'auto', md: '36px' },
          fontStyle: 'bold',
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '28px', md: '32px' },
          lineHeight: { xs: '28px', md: '36px' },
          textAlign: 'center',
          color: '#FFFFFF',
          alignSelf: 'stretch',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        {title}
      </Typography>

      {/*sub title*/}
      <Typography
        sx={{
          width: { xs: '100%', md: '538px' },
          height: { xs: 'auto', md: '27px' },
          fontWeight: 400,
          fontSize: { xs: '18px', sm: '20px', md: '24px' },
          lineHeight: { xs: '22px', md: '27px' },
          textAlign: 'center',
          color: '#FFFFFF',
          opacity: 0.85,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
