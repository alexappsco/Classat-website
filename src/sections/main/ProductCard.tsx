import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Card, Stack, Button, Divider, Typography, CardProps, Grid } from '@mui/material';
import Image from 'src/components/image';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { shadows } from 'src/theme/shadows';
import { useSettingsContext } from 'src/components/settings';
import { useTranslations } from 'next-intl';

const cards = [
  {
    title: 'ايجمالي الايرادات',
    total: 1023,
    icon: '/assets/icons/dashboard/main2/profile-2user.svg',
    // href: paths.dashboard.ordersGroup.root,
    description: '',
  },
  {
    title: 'ايجمالي الايرادات',
    icon: '/assets/icons/dashboard/main2/battery-empty.svg',
    // href: `${paths.dashboard.ordersGroup.root}?tab=delivered`,
    description: 'جلاسات مياشره هذا الاسبوع',
  },
  {
    title: ' ايجمالي الايرادات',
    total: 745,
    icon: '/assets/icons/dashboard/main2/user-tag.svg',
    // href: `${paths.dashboard.ordersGroup.root}?tab=delivery`,
    description: 'جلاسات مياشره هذا الاسبوع',
  },
  {
    title: 'ايجمالي الايرادات',
    total: 745,
    icon: '/assets/icons/dashboard/main2/diagram.svg',
    // href: `${paths.dashboard.ordersGroup.root}?tab=delivery`,
    // description: ' 1',
  },
];

interface Props extends CardProps {
  title: string;
  description?: string;
  total?: number;
  total_Currency?: number;
  percent?: number;
  icon: string;
  customIcon?: boolean;
  fontWeight?: number;
  href?: string;
}

export default function ProductCard({
  fontWeight = 700,
  title,
  description,
  percent = 0,
  total,
  icon,
  customIcon,
  sx,
  total_Currency,
  href,
  ...other
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const settings = useSettingsContext();

  return (
    <Card
      sx={{
        // display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        minHeight: 260,
        // width: 260,
        p: 1.5,
        '&:hover': {
          boxShadow: shadows(settings.themeMode),
        },
        cursor: href && 'pointer',
        ...sx,
      }}
      onClick={() => href && router.push(href)}
      {...other}
    >
      <Stack spacing={1.5} sx={{ justifyItems: 'center', alignItems: 'center', marginTop: '6%' }}>
        <Box
          sx={{
            // mr: 2,
            display: 'flex',
            alignItems: 'center',
            background: '#54b0d745',
            borderRadius: '25%',
            padding: '15px',
          }}
        >
          {!customIcon && (
            <Iconify
              width={30}
              icon={icon}
              sx={{
                // mr: 1,
                color: '#54B0D7',
              }}
            />
          )}
          {customIcon && (
            <Box sx={{ width: 40 }}>
              <Image
                delayTime={1000}
                effect="blur"
                alt="rocket"
                src={icon || '/assets/icons/dashboard/main/Frame-1.svg'}
              />
            </Box>
            /*   <SvgIcon fontSize="small"  component={svgImport.default} /> */
          )}
        </Box>
        <Box sx={{ paddingBottom: 0.7 }}>
          <Typography variant="h6" fontWeight={fontWeight}>
            {title}
          </Typography>
        </Box>

        <Box>
          {description && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: '14px', paddingBottom: 0.5 }}
            >
              {description || ''}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          // color="primary"
          color="info"
          size="large"
          sx={{ borderRadius: 20, fontSize: { xs: '11px', md: '16px' } }}
          startIcon={<Iconify icon="ic:baseline-plus" />}
          // onClick={() => router.push('/dashboard/products/add')}
        >
          {t('Label.add_new_product')}
        </Button>
      </Stack>
    </Card>
  );
}
