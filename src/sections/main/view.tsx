'use client';

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import { Button, Grid, Icon, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useTranslations } from 'next-intl';
import SelectedMethod from '../selected-method/selectedMethod';
import Header from 'src/layouts/mainpage/header';

interface IProps {
  ordersCounts?: {
    totalOrders?: number;
    complateOrders?: number;
    deliveryOrders?: number;
  };
  setupSteps?: any;
  currentSubscription?: any;
}

export default function MainPage({ ordersCounts, setupSteps, currentSubscription }: IProps) {
  const t = useTranslations();

  return (
    <Container sx={{ margin: 0, p: '10%' }}>
      <Header />

      <Stack> sssssss</Stack>
    </Container>
  );
}
