'use client';

import { text } from 'src/theme/palette';
import { useResponsive } from 'src/hooks/use-responsive';
import {
  Box,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  LinearProgress,
} from '@mui/material';

import { SESSIONS } from './data/sessions';

type MiniSession = (typeof SESSIONS.sessionsData)[0];

interface MiniSessionsWithHeaderProps {
  title: string;
  buttonText?: string;
  sessions: MiniSession[];
}

export default function MiniSessionsWithHeader({
  title,
  buttonText = 'اكتشف المزيد',
  sessions,
}: MiniSessionsWithHeaderProps) {
  const primaryTextColor = text.primary;
  const smDown = useResponsive('down', 'sm');

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8} md={9}>
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: primaryTextColor }}>
                {title}
              </Typography>
            </Stack>
          </Grid>

          <Button
            variant="contained"
            size="medium"
            sx={{
              minWidth: 150,
              p: 2,
              alignSelf: 'flex-start',
              mt: smDown ? 2 : 0,
            }}
            endIcon={'>'}
          >
            {buttonText}
          </Button>
        </Grid>

        <Grid container spacing={2}>
          {sessions.map((session, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  width: '100%',
                  height: 108,
                  borderRadius: 2,
                  p: 1,
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={session.image}
                  alt={session.title}
                  sx={{
                    width: 100,
                    height: '100%',
                    borderRadius: 1.5,
                    objectFit: 'cover',
                  }}
                />

                <Stack spacing={0.5} flexGrow={1}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {session.title}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar src={session.instructorAvatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant="body2" sx={{ fontSize: 12 }}>
                      {session.instructorName}
                    </Typography>
                  </Stack>

                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {session.details}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={session.progress}
                    sx={{
                      height: 6,
                      borderRadius: 5,
                    }}
                  />
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
