import { Box } from '@mui/material';
import Image from 'next/image';
import test from "../../../../public/assets/illustrations/illustration_dashboard.png";

export default function CourseMedia() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        height: 300,
        borderRadius: "30px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      {/* Course media */}
      <Image
        src={test}
        alt="لوحة تحكم الكورس"
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '30px'
        }}
      />
    </Box>
  );
}
