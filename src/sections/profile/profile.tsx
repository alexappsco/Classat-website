
'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { enqueueSnackbar } from 'notistack';
import { editData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

const containerWidth = 480;

type Country = { id: string; name: string; };
type Approach = {
  id: string;
  educationApproachTypeName: string;
};
type Props = {
  profile: any;
  countries: Country[];
};

export default function ProfileSection({ profile, countries }: Props) {
  // ===== States =====
  const [name, setName] = useState(profile?.name || '');
  const [email] = useState(profile?.email || '');
  const [phone] = useState(profile?.phoneNumber || '');
  const [countryId, setCountryId] = useState(profile?.country?.id || '');
  const [approachId, setApproachId] = useState('');
  const [imageSrc, setImageSrc] = useState(profile?.avatarUrl || '');
  const [file, setFile] = useState<File | null>(null);
  console.log(profile.learningPreference)
  // ===== Image Change =====
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  // ===== Update =====
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('CountryId', countryId);
      formData.append('AvatarUrl', file || ''); 
      formData.append('GuardianPhoneNumber', '');
      formData.append('EducationApproachTypeStageGradeId', '');

      const res = await editData(
        endpoints.student.update,
        'PUT',
        formData as any
      );

      console.log('Update Response:', res);

      if (res.success) {
        enqueueSnackbar('تم التعديل بنجاح', { variant: 'success' });
        return;
      }

      enqueueSnackbar('فشل التعديل', { variant: 'error' });

    } catch (error) {
      console.error(error);
      enqueueSnackbar('حدث خطأ ما', { variant: 'error' });
    }
  };

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Stack spacing={4} alignItems="center" sx={{ width: '100%', maxWidth: containerWidth }}>

        {/* ===== Image ===== */}
        <Box sx={{ position: 'relative', mt: { xs: 9, md: 5, lg: 5 }, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box component="img" src={imageSrc} alt="profile" sx={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover' }} />
          <input id="profile-file-input" type="file" hidden onChange={handleImageChange} />
          <IconButton component="label" htmlFor="profile-file-input"
            sx={{ position: 'absolute', left: 'calc(50% - 60px - 8px)', bottom: -10, bgcolor: 'white', border: '1px solid #ddd', width: 36, height: 36 }}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={1} sx={{ width: '100%' }}>

          {/* Name */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>الاسم الكامل</Typography>
            <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth
              sx={{
                borderRadius: "15px",
                gap: "10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>البريد الإلكتروني</Typography>
            <TextField value={email} fullWidth disabled
              sx={{
                borderRadius: "15px",
                gap: "10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />
          </Box>

          {/* Phone */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>رقم الهاتف</Typography>
            <TextField value={phone} fullWidth disabled
              sx={{
                borderRadius: "15px",
                gap: "10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />
          </Box>

          {/* Country */}
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>الدولة</Typography>
            <Select value={countryId} onChange={(e) => setCountryId(e.target.value as string)} fullWidth
              sx={{
                borderRadius: "15px",
                gap: "10px",
              }}
            >
              {countries.map((c) => (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>))}
            </Select>
          </Box>
 {profile.learningPreference !== "Courses" ? 
 (<Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
  
 
</Box>) : null  }
          {/* Update */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleUpdate}
              sx={{ bgcolor: 'rgba(84, 176, 215, 1)', borderRadius: '16px', width: 171, height: '50px' }}>
              تعديل
            </Button>
          </Box>

        </Stack>
      </Stack>
    </Box>
  );
}
