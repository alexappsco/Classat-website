'use client';

import * as React from 'react';

import SearchBar from './SearchBar'
import { SESSIONS } from './data/sessions';
import CustomPagination from './CustomPagination';
import SessionsSection from './sessions/SessionsSection';

export default function Favorites() {
  return (
     <>
        <SearchBar />
        <SessionsSection sessions={SESSIONS.TOP_RATED_SESSIONS} />
        <CustomPagination />
    </>
  );
}
