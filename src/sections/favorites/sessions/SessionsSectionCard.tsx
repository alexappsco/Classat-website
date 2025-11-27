'use client';

import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import Book from 'public/assets/courses/icons/book.svg'
import Star from 'public/assets/courses/icons/star.svg'
import Heart from 'public/assets/courses/icons/heart.svg'
import { text, shadow, warning } from 'src/theme/palette';
import Clock from 'public/assets/courses/icons/clock.svg'
import { Box, Card, Stack, Typography } from '@mui/material';

import { SESSIONS } from '../data/sessions';
type SessionsSectionCardProps = (typeof SESSIONS.RECOMMENDED_SESSIONS)[0];

export default function SessionsSectionCard({
  image,
  category,
  title,
  instructor,
  rate,
  oldPrice,
  price,
  lessons,
  lessonstime,
}: SessionsSectionCardProps) {
  const theme = useTheme();
  const blueColor = '#0D47A1';
  const blueBg = '#E3F2FD';
  const orangeColor = warning.main;
  const orangeBg = '#FFF6E4';
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: shadow.main,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        p: '20px 16px 16px',
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: 'relative',
          pt: '75%',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >

<Box
  sx={{
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    zIndex: 10,
  }}
>
  <Heart />
</Box>

        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          minWidth={'287px'}
        />
      </Box>


      <Stack spacing={1.5} sx={{ py: 2, flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="caption"
            sx={{
              backgroundColor: orangeBg,
              color: orangeColor,
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '30px',
              padding: '8px 14px',
            }}
          >
            {category}
          </Typography>


          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Star width={16} height={16}/> {rate}
          </Typography>
        </Stack>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: text.primary, minHeight: 40 }}
        >
          {title}
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1, color: theme.palette.text.secondary }}
        >

          <Stack direction="row" spacing={0.5} alignItems="center">
            <Book width={16} height={16} />
            <Typography variant="body2">{lessons}</Typography>
          </Stack>


          <Stack direction="row" spacing={0.5} alignItems="center">
            <Clock width={16} height={16} />
            <Typography variant="body2">{lessonstime}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Stack direction="row" alignItems="center" gap={1}>
            <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
            <Typography variant="body2" sx={{ color: text.primary, fontWeight: 500 }}>
              {instructor}
            </Typography>
          </Stack>


          <Stack direction="row" alignItems="center" gap={1}>

            {oldPrice && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.disabled,
                  textDecoration: 'line-through',
                  fontSize: 13,
                }}
              >
                {oldPrice}
              </Typography>
            )}


            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: '#FFA000',
              }}
            >
              {price} درهم
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
