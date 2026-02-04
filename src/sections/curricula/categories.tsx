

'use client';

import { Box, Typography, Card } from '@mui/material';
import { useRouter } from 'next/navigation';

// ===== Types =====
type SubjectItem = {
  id: string;
  educationSubjectId: string;
  educationSubjectName: string;
  educationSubjectLogo: string;
};

type Props = {
  subjects: SubjectItem[];
};

export default function CategoriesClasse({ subjects }: Props) {
  const router = useRouter();

  const handleSubjectClick = (subject: SubjectItem) => {
    router.push(`/curricula/subjects/${subject.id}/teachers`);
  };
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          width: '798px',
          height: '153px',
          borderRadius: '25px',
          p: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          border: '1px solid #E7E8E9',
          boxShadow: 'none',
          overflowX: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', gap: '16px' }}>
          {subjects.map((item) => (
            <Card
              key={item.id}
              onClick={() => handleSubjectClick(item)}
              sx={{
                width: '107.66px',
                height: '76px',
                borderRadius: '16px',
                p: '8px',
                border: '1px solid #E7E8E9',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={item.educationSubjectLogo}
                alt={item.educationSubjectName}
                sx={{ width: 24, height: 24 }}
              />

              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#1C3F60',
                  textAlign: 'center',
                }}
              >
                {item.educationSubjectName}
              </Typography>
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
