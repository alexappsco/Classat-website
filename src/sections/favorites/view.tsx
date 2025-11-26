'use client';

import * as React from 'react';
import { Typography } from '@mui/material';
import { SESSIONS } from './data/sessions';
import SessionsSection from './sessions/SessionsSection';
import SearchBar from './SearchBar'
import CustomPagination from './CustomPagination';

export default function Favorites() {
  return (
     <>
        <SearchBar />
        <SessionsSection sessions={SESSIONS.TOP_RATED_SESSIONS} />
        <CustomPagination />

    </>
  );
}
