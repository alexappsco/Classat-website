'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

type Student = {
  name: string;
  email: string;
  avatarUrl: string;
};

type ApiResponse<T> = {
  data: T;
};

function AcountInfo() {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await getData<Student>(endpoints.student.get);
        const studentData = response.data as Student;

        setUser({
          name: studentData.name,
          email: studentData.email,
          avatarUrl: studentData.avatarUrl,
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={user?.avatarUrl || '/favicon/studend.jpg'}
        alt={user?.name || 'profile'}
        sx={{
          width: 40,
          height: 40,
          mr: 1,
          border: (theme: any) => `solid 2px ${theme.palette.background.default}`,
          flexShrink: 0,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: "flex-end",
          alignItems:"start",
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            wordBreak: 'break-word',
            fontSize:"11px"
          }}
        >
          {user?.name || '---'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            wordBreak: 'break-word',
            fontSize:"10px"
          }}
        >
          {user?.email || '---'}
        </Typography>
      </Box>
    </Box>
  );
}

export default AcountInfo;
