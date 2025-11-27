'use client';

import * as React from 'react';
import { Typography } from '@mui/material';


export default function Favorites() {
  return (
     <>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
          search
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
          favorites
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
          pagination
        </Typography>

    </>
  );
}
