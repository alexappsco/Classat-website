"this component u can use it to use timer"
import { Box } from '@mui/material';

import TimerHeader from './TimerHeader';
import TimerDisplay from './TimerDisplay';

interface TimerCardProps {
  subtitle?: string;
  title?: string;
}

export default function TimerCard({
  subtitle,
  title = "العد التنازلي للبث القادم"
}: TimerCardProps) {


  return (
    <Box>
      {/* content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 4, md: 10 },
          px: 2,
          minHeight: '80vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: '20px', md: '24px' },
            gap: { xs: '30px', md: '40px' },
            width: { xs: '90%', sm: '500px', md: '598px' },
            minHeight: { xs: 'auto', md: '251px' },
            maxWidth: '598px',
            background: 'rgba(84, 176, 215, 0.2)',
            borderRadius: '25px',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          }}
        >
          <TimerHeader title={title} subtitle={subtitle} />
          <TimerDisplay />
        </Box>
      </Box>
    </Box>
  );
}
