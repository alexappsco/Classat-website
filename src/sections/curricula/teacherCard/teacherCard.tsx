import { Card, Box, Typography, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import BookIcon from '@mui/icons-material/MenuBook';
import TranslateIcon from '@mui/icons-material/Translate';
import { useRouter } from 'next/navigation';

interface Props {
  img: string;
  name: string;
  subject: string; // مثل: اللغة العربية
  date: string; // مثال: 12/11/2025
  time: string; // مثال: 2:00 م
  price?: string; // مثال: ر.س 2.00
  href?: string;
}

export default function StudentCard({ img, name, subject, date, time, href }: Props) {
  const router = useRouter();

  return (
    <Card
      sx={{
        m: 1,
        p: 2,
        // width: 240,
        height: 110,
        borderRadius: 3,
        direction: 'ltr',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
        cursor: href ? 'pointer' : 'default',
        transition: '0.2s',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.16)',
        },
        alignItems: 'flex-start',
        gap: 1.5,
      }}
      onClick={() => href && router.push(href)}
    >
      {/* الصورة + الاسم */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={img} sx={{ width: 32, height: 32 }} />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
      </Box>

      {/* المادة */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 1 }}>
        <BookIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
          {subject}
        </Typography>
      </Box>

      {/* التاريخ */}

      {/* الوقت + السعر */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 0.4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 0.6,
            color: 'text.secondary',
          }}
        >
          <EventIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
          <Typography sx={{ fontSize: 12 }}>{date}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{time}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
