'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { enqueueSnackbar } from 'notistack';
import { editData, postData, getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import SelectedMethod from '../selected-method/selectedMethod';

const containerWidth = 480;

type Country = { id: string; name: string };

type Profile = {
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string;
  country?: Country;
  learningPreference?: string;
};

type Props = {
  profile?: Profile;
  countries: Country[];
};

export default function ProfileSection({ profile, countries }: Props) {
  // ===== States =====
  const [name, setName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [phone, setPhone] = useState(profile?.phoneNumber ?? '');
  const [originalEmail, setOriginalEmail] = useState(profile?.email ?? '');
  const [originalPhone, setOriginalPhone] = useState(profile?.phoneNumber ?? '');
  const [countryId, setCountryId] = useState(profile?.country?.id ?? '');
  const [imageSrc, setImageSrc] = useState(profile?.avatarUrl ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [showSelectedMethod, setShowSelectedMethod] = useState(false);

  // OTP
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpType, setOtpType] = useState<'email' | 'phone' | null>(null);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // ===== Load latest profile =====
  const reloadProfile = async () => {
    try {
      const res = await getData(endpoints.student.get);
      if (res?.data) {
        const p = res.data as Profile;
        setName(p.name);
        setEmail(p.email);
        setPhone(p.phoneNumber);
        setOriginalEmail(p.email);
        setOriginalPhone(p.phoneNumber);
        setCountryId(p.country?.id ?? '');
        setImageSrc(p.avatarUrl ?? '');
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('حدث خطأ أثناء جلب البيانات', { variant: 'error' });
    }
  };

  useEffect(() => {
    reloadProfile();
  }, []);

  // ===== Handle Image =====
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  // ===== Update Profile Data =====
  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('CountryId', countryId);
      if (file) formData.append('AvatarUrl', file);

      const res = await editData(endpoints.student.update, 'PUT', formData as any);
      if (res.success) {
        enqueueSnackbar('تم التعديل بنجاح', { variant: 'success' });
        await reloadProfile();
      } else {
        enqueueSnackbar('فشل التعديل', { variant: 'error' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('حدث خطأ أثناء التعديل', { variant: 'error' });
    }
  };

  // ===== Handle Update Click =====
  const handleUpdate = async () => {
    try {
      if (email !== originalEmail) {
        await postData(endpoints.student.changeEmail, { newEmail: email });
        setOtpType('email');
        setOtpOpen(true);
        return;
      }

      if (phone !== originalPhone) {
        await postData(endpoints.student.changePhone, { newPhoneNumber: phone });
        setOtpType('phone');
        setOtpOpen(true);
        return;
      }

      await updateProfile();
    } catch (err) {
      console.error(err);
      enqueueSnackbar('حدث خطأ أثناء التحديث', { variant: 'error' });
    }
  };

  // ===== Confirm OTP =====
  const handleConfirmOtp = async () => {
    try {
      const otpCode = otpValues.join('');
      if (otpType === 'email') {
        await postData(endpoints.student.changeEmailConfirm, { newEmail: email, otpCode });
      }
      if (otpType === 'phone') {
        await postData(endpoints.student.changePhoneConfirm, { newPhoneNumber: phone, otpCode });
      }
      enqueueSnackbar('تم التحقق بنجاح', { variant: 'success' });
      setOtpOpen(false);
      setOtpValues(['', '', '', '']);
      setOtpType(null);
      await reloadProfile();
    } catch (err) {
      console.error(err);
      enqueueSnackbar('الكود غير صحيح', { variant: 'error' });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box
      component="main"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
    >
      <Stack spacing={4} alignItems="center" sx={{ width: '100%', maxWidth: containerWidth }}>
        {/* ===== Image ===== */}
        <Box sx={{ position: 'relative', mt: { xs: 9, md: 5, lg: 5 }, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box component="img" src={imageSrc} alt="profile" sx={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover' }} />
          <input id="profile-file-input" type="file" hidden onChange={handleImageChange} />
          <IconButton
            component="label"
            htmlFor="profile-file-input"
            sx={{ position: 'absolute', left: 'calc(50% - 60px - 8px)', bottom: -10, bgcolor: 'white', border: '1px solid #ddd', width: 36, height: 36 }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={1} sx={{ width: '100%' }}>
          {/* Name */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>الاسم الكامل</Typography>
            <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{
              borderRadius: "15px", gap: "10px",
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#ddd' },
                '&.Mui-focused fieldset': { borderColor: '#ddd' },
              }
            }} />
          </Box>

          {/* Email */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>البريد الإلكتروني</Typography>
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{
              borderRadius: "15px", gap: "10px",
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#ddd' },
                '&.Mui-focused fieldset': { borderColor: '#ddd' },
              }
            }} />
          </Box>

          {/* Phone */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>رقم الهاتف</Typography>
            <TextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth sx={{
              borderRadius: "15px", gap: "10px",
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#ddd' },
                '&.Mui-focused fieldset': { borderColor: '#ddd' },
              }
            }} />
          </Box>

          {/* Country */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>الدولة</Typography>
            <Select value={countryId} onChange={(e) => setCountryId(e.target.value as string)} fullWidth displayEmpty sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              '& .MuiSelect-select': { padding: '14px', backgroundColor: '#fff' },
            }}>
              {countries.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </Box>

          {/* Selected Method */}
          {profile?.learningPreference !== "Courses" && (
            <Box sx={{ mt: 3 }}>
              <Button
                onClick={() => setShowSelectedMethod(true)}
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                sx={{
                  fontSize: 14, fontWeight: 500, mb: 1, mt: 1, alignSelf: 'flex-start',
                  color: 'rgba(84, 176, 215, 1)',
                  borderColor: 'rgba(84, 176, 215, 1)',
                  borderRadius: '12px',
                  px: 2, py: 0.7,
                  textTransform: 'none',
                  backgroundColor: 'rgba(84, 176, 215, 0.08)',
                }}
              >
                تغير المنهج الدراسي
              </Button>
              {showSelectedMethod && <SelectedMethod open={showSelectedMethod} onClose={() => setShowSelectedMethod(false)} onConfirm={() => setShowSelectedMethod(false)} />}
            </Box>
          )}

          {/* Update Button */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleUpdate} sx={{ bgcolor: 'rgba(84, 176, 215, 1)', borderRadius: '16px', width: 171, height: '50px' }}>تعديل</Button>
          </Box>
        </Stack>
      </Stack>

      {/* ===== OTP Dialog with 4 Boxes ===== */}
<Dialog
  open={otpOpen}
  onClose={() => setOtpOpen(false)}
  PaperProps={{
    sx: {
      minWidth: 320,
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3,
    },
  }}
>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 500 }}>تأكيد الكود</DialogTitle>

  <DialogContent
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 2,
      mb: 2,
      px: 0,
      overflow: 'hidden',
    }}
  >
    <Stack direction="row" spacing={2}>
      {[0, 1, 2, 3].map((i) => (
        <TextField
          key={i}
          inputRef={(el) => {
            if (el) inputRefs.current[i] = el;
          }}
          value={otpValues[i]}
          onChange={(e) => handleOtpChange(i, e.target.value)}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 500,
            },
          }}
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderColor: '#555', // لون البوردر واضح
              '&:hover fieldset': { borderColor: '#555' },
              '&.Mui-focused fieldset': { borderColor: 'rgba(84, 176, 215, 1)' },
            },
          }}
        />
      ))}
    </Stack>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
    <Button
      onClick={handleConfirmOtp}
      sx={{
        bgcolor: 'rgba(84, 176, 215, 1)',
        color: '#fff',
        width: 140,
        borderRadius: 2,
        '&:hover': { bgcolor: 'rgba(84, 176, 215, 0.9)' },
      }}
    >
      تأكيد
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
