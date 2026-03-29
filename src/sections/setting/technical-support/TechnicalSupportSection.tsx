'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslations } from 'next-intl';

type ComplaintOption = 'login' | 'payments' | 'technical';

const iconStyles = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E7F4FF',
  color: '#1E88E5',
};

export default function TechnicalSupportSection() {
  const t = useTranslations('Pages.Support');

  const [complaintType, setComplaintType] = useState<ComplaintOption | ''>('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const complaintOptions = useMemo(
    () => [
      { value: 'login' as ComplaintOption, label: t('form.complaintOptions.login') },
      { value: 'payments' as ComplaintOption, label: t('form.complaintOptions.payments') },
      { value: 'technical' as ComplaintOption, label: t('form.complaintOptions.technical') },
    ],
    [t]
  );

  const supportTopics = useMemo(
    () => [
      {
        title: t('cards.login.title'),
        description: t('cards.login.description'),
        icon: <LockOutlinedIcon fontSize="small" />,
      },
      {
        title: t('cards.billing.title'),
        description: t('cards.billing.description'),
        icon: <CreditCardOutlinedIcon fontSize="small" />,
      },
      {
        title: t('cards.technical.title'),
        description: t('cards.technical.description'),
        icon: <SettingsOutlinedIcon fontSize="small" />,
      },
    ],
    [t]
  );

  return (
    <Container sx={{ py: { xs: 6, md: 6 },mt:10 }}>
      <Box
        sx={{
          maxWidth: 640,
          mx: 'auto',
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.08)',
          p: { xs: 3, md: 5 },
          // direction: 'rtl',
        }}
      >
        <Stack spacing={1} textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight={800}>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('subtitle')}
          </Typography>
        </Stack>

        <Stack spacing={2.5} mb={4}>
          {supportTopics.map((topicCard) => (
            <Box
              key={topicCard.title}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                px: 2.5,
                py: 2,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={iconStyles}>{topicCard.icon}</Box>
                  <Box>
                    <Typography fontWeight={700}>{topicCard.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topicCard.description}
                    </Typography>
                  </Box>
                </Stack>
                <KeyboardArrowLeftRoundedIcon sx={{ color: 'text.secondary' }} />
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" mb={0.5}>
              {t('form.complaintTypeLabel')}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={complaintType}
                onChange={(event) => setComplaintType(event.target.value as ComplaintOption | '')}
                displayEmpty
                // variant='standard'
                sx={{
                  borderRadius: 3,
                  
                  '& .MuiSelect-select': {
                    py: 1.4,
                    pr: 2,
                    // textAlign: 'right',
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography color="text.secondary">
                        {t('form.complaintTypePlaceholder')}
                      </Typography>
                    );
                  }
                  const activeOption = complaintOptions.find((option) => option.value === selected);
                  return activeOption?.label;
                }}
              >
                <MenuItem disabled value="">
                  {t('form.complaintTypePlaceholder')}
                </MenuItem>
                {complaintOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" mb={0.5}>
              {t('form.topicLabel')}
            </Typography>
            <TextField
              fullWidth
              placeholder={t('form.topicPlaceholder')}
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              InputProps={{
                sx: {  borderRadius: 3, py: 0.5 },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" mb={0.5}>
              {t('form.descriptionLabel')}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder={t('form.descriptionPlaceholder')}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              InputProps={{
                sx: { borderRadius: 3 },
              }}
            />
          </Grid>
        </Grid>

        <Stack mt={4} spacing={1}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              borderRadius: 3,
              py: 1.5,
              fontWeight: 700,
              fontSize: 16,
              bgcolor: '#33A9DC',
              '&:hover': {
                bgcolor: '#2C98C5',
              },
            }}
          >
            {t('form.submit')}
          </Button>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {t('form.helper')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

