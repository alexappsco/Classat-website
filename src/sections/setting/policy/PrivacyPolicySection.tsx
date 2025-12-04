'use client';

import { Container, Box, Stack, Typography, List, ListItem } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicySection() {
  const t = useTranslations('Pages.PrivacyPolicy');

  return (
    <Container sx={{ py: { xs: 6, md: 6 }, mt: 10 }}>
      <Box
        sx={{
          maxWidth: 960,
          mx: 'auto',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.08)',
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          textAlign="center"
          mb={{ xs: 2, md: 3 }}
        >
          {t('title')}
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          fontSize={{ xs: 13, md: 14 }}
          mb={{ xs: 3, md: 4 }}
        >
          {t('intro')}
        </Typography>

        <Stack spacing={3} color="text.secondary" fontSize={{ xs: 14, md: 15 }}>
          <Box>
            <Typography fontWeight={700} mb={1} color="text.primary">
              {t('sections.introduction.title')}
            </Typography>
            <Typography>{t('sections.introduction.body')}</Typography>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.collectedInfo.title')}
            </Typography>
            <Typography mb={1}>{t('sections.collectedInfo.description')}</Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pr: 2,
                '& .MuiListItem-root': { display: 'list-item' },
              }}
            >
              <ListItem>
                {t('sections.collectedInfo.provided.title')}
                <List
                  sx={{
                    listStyleType: 'circle',
                    pr: 3,
                    mt: 1,
                    '& .MuiListItem-root': { display: 'list-item' },
                  }}
                >
                  <ListItem>{t('sections.collectedInfo.provided.items.1')}</ListItem>
                  <ListItem>{t('sections.collectedInfo.provided.items.2')}</ListItem>
                  <ListItem>{t('sections.collectedInfo.provided.items.3')}</ListItem>
                  <ListItem>{t('sections.collectedInfo.provided.items.4')}</ListItem>
                </List>
              </ListItem>

              <ListItem>
                {t('sections.collectedInfo.automatic.title')}
                <List
                  sx={{
                    listStyleType: 'circle',
                    pr: 3,
                    mt: 1,
                    '& .MuiListItem-root': { display: 'list-item' },
                  }}
                >
                  <ListItem>{t('sections.collectedInfo.automatic.items.1')}</ListItem>
                  <ListItem>{t('sections.collectedInfo.automatic.items.2')}</ListItem>
                  <ListItem>{t('sections.collectedInfo.automatic.items.3')}</ListItem>
                </List>
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.usage.title')}
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pr: 2,
                '& .MuiListItem-root': { display: 'list-item' },
              }}
            >
              <ListItem>{t('sections.usage.intro')}</ListItem>
              <List
                sx={{
                  listStyleType: 'circle',
                  pr: 3,
                  mt: 1,
                  '& .MuiListItem-root': { display: 'list-item' },
                }}
              >
                <ListItem>{t('sections.usage.items.1')}</ListItem>
                <ListItem>{t('sections.usage.items.2')}</ListItem>
                <ListItem>{t('sections.usage.items.3')}</ListItem>
                <ListItem>{t('sections.usage.items.4')}</ListItem>
                <ListItem>{t('sections.usage.items.5')}</ListItem>
              </List>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.protection.title')}
            </Typography>
            <Typography>{t('sections.protection.body')}</Typography>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.sharing.title')}
            </Typography>
            <Typography>{t('sections.sharing.body')}</Typography>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.rights.title')}
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pr: 2,
                '& .MuiListItem-root': { display: 'list-item' },
              }}
            >
              <ListItem>{t('sections.rights.items.1')}</ListItem>
              <ListItem>{t('sections.rights.items.2')}</ListItem>
              <ListItem>{t('sections.rights.items.3')}</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              {t('sections.updates.title')}
            </Typography>
            <Typography>{t('sections.updates.body')}</Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

