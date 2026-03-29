'use client';

import { enqueueSnackbar } from 'notistack';
import { MuiTelInput } from 'mui-tel-input';
import { endpoints } from 'src/utils/endpoints';
import React, { useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// Utils & Endpoints
import { getData, editData, postData } from 'src/utils/crud-fetch-api';
import {
  Box,
  Stack,
  Button,
  Select,
  Dialog,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import SelectedMethod from '../selected-method/selectedMethod';

const containerWidth = 480;

// Types
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

export default function ProfileSection({ profile: initialProfile, countries }: Props) {
  // ===== States =====
  const [name, setName] = useState(initialProfile?.name ?? '');
  const [email, setEmail] = useState(initialProfile?.email ?? '');
  const [phone, setPhone] = useState(initialProfile?.phoneNumber ?? '');
  const [countryId, setCountryId] = useState(initialProfile?.country?.id ?? '');
  const [imageSrc, setImageSrc] = useState(initialProfile?.avatarUrl ?? '');

  // Tracking Originals to detect changes
  const [originalEmail, setOriginalEmail] = useState(initialProfile?.email ?? '');
  const [originalPhone, setOriginalPhone] = useState(initialProfile?.phoneNumber ?? '');

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSelectedMethod, setShowSelectedMethod] = useState(false);

  // OTP States
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpType, setOtpType] = useState<'email' | 'phone' | null>(null);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // ===== Actions =====

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
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  // 1. التحديث العام (اسم، دولة، صورة)
  const updateGeneralProfile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('CountryId', countryId);
      if (file) formData.append('AvatarUrl', file);

      const res = await editData(endpoints.student.update, 'PUT', formData as any);
      if (res.success) {
        enqueueSnackbar(res.message || 'تم التعديل بنجاح', { variant: 'success' });
        await reloadProfile();
      } else {
        enqueueSnackbar(res.error || 'فشل التعديل', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar(err.message || 'حدث خطأ أثناء التعديل', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClick = async () => {
  // Clean the phone number one last time before sending
  const cleanPhone = phone.replace(/\s+/g, '');

  if (email !== originalEmail) {
    // ... email logic
    return;
  }

  if (cleanPhone !== originalPhone) {
    try {
      setIsLoading(true);
      // Use cleanPhone here
      const res = await postData(endpoints.student.changePhone, {
        newPhoneNumber: cleanPhone
      });
      if (res.success) {
        setOtpType('phone');
        setOtpOpen(true);
      } else {
        enqueueSnackbar(res.error || 'فشل إرسال كود الهاتف', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('خطأ في الاتصال', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
    return;
  }

  await updateGeneralProfile();
};

  // 3. تأكيد الـ OTP
  const handleConfirmOtp = async () => {
    const otpCode = otpValues.join('');
    if (otpCode.length < 4) {
      enqueueSnackbar('يرجى إدخال الكود كاملاً', { variant: 'warning' });
      return;
    }

    try {
      setIsLoading(true);
      let res;
      if (otpType === 'email') {
        res = await postData(endpoints.student.changeEmailConfirm, { newEmail: email, otpCode });
      } else {
        res = await postData(endpoints.student.changePhoneConfirm, { newPhoneNumber: phone, otpCode });
      }

      if (res.success) {
        enqueueSnackbar('تم التحقق والتحديث بنجاح', { variant: 'success' });
        setOtpOpen(false);
        setOtpValues(['', '', '', '']);
        // بعد نجاح الـ OTP، نقوم بتحديث باقي البيانات (الاسم والصورة) احتياطاً
        await updateGeneralProfile();
      } else {
        enqueueSnackbar(res?.error || 'الكود غير صحيح', { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar('فشل التحقق', { variant: 'error' });
    } finally {
      setIsLoading(false);
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
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Stack spacing={4} alignItems="center" sx={{ width: '100%', maxWidth: containerWidth }}>

        {/* الصورة الشخصية */}
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box component="img" src={imageSrc || '/default-avatar.png'} sx={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', border: '2px solid #f0f0f0' }} />
          <input id="profile-file-input" type="file" hidden onChange={handleImageChange} accept="image/*" />
          <IconButton
            component="label"
            htmlFor="profile-file-input"
            sx={{ position: 'absolute', left: 'calc(50% - 70px)', bottom: 0, bgcolor: 'white', border: '1px solid #ddd', '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={2.5} sx={{ width: '100%' }}>
          {/* الاسم */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>الاسم الكامل</Typography>
            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
          </Box>

          {/* الإيميل */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>البريد الإلكتروني</Typography>
            <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>

          {/* الهاتف */}
          {/* <Box>
            <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>رقم الهاتف</Typography>
            <TextField fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box> */}
          <Box>
  <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>
    رقم الهاتف
  </Typography>
  <MuiTelInput
    fullWidth
    value={phone}
    onChange={(newValue) => {
      // Remove spaces immediately to prevent the "space error" we saw earlier
      const cleanValue = newValue.replace(/\s+/g, '');
      setPhone(cleanValue);
    }}
    defaultCountry="AE" // Set default based on user's region
    preferredCountries={['AE', 'SA', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'IQ']}
    forceCallingCode
    sx={{
      direction: 'ltr',
      '& .MuiInputBase-root': {
        borderRadius: '8px',
        bgcolor: '#FAFAFA'
      }
    }}
  />
</Box>

          {/* الدولة */}
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>الدولة</Typography>
            <Select fullWidth value={countryId} onChange={(e) => setCountryId(e.target.value)}>
              {countries.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
          </Box>

          {/* تغيير المنهج (يظهر فقط إذا لم يكن المنهج الحالي Courses) */}
          {initialProfile?.learningPreference !== "Courses" && (
            <Button
              onClick={() => setShowSelectedMethod(true)}
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              sx={{ alignSelf: 'flex-start', borderRadius: '12px', textTransform: 'none', mt: 1 }}
            >
              تغيير المنهج الدراسي
            </Button>
          )}

          {/* زر الحفظ */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpdateClick}
              disabled={isLoading}
              sx={{ bgcolor: 'rgba(84, 176, 215, 1)', borderRadius: '16px', width: 171, height: '50px', '&:hover': { bgcolor: 'rgba(84, 176, 215, 0.8)' } }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'تعديل'}
            </Button>
          </Box>
        </Stack>
      </Stack>

      {/* مودال الـ OTP */}
      <Dialog open={otpOpen} onClose={() => setOtpOpen(false)} PaperProps={{ sx: { p: 3, borderRadius: 3, minWidth: 350 } }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          تأكيد رمز التحقق
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontWeight: 400 }}>
            تم إرسال رمز التحقق إلى {otpType === 'email' ? 'بريدك الإلكتروني' : 'رقم هاتفك'} الجديد
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <Stack direction="row" spacing={2}>
            {[0, 1, 2, 3].map((i) => (
              <TextField
                key={i}
                inputRef={(el) => (inputRefs.current[i] = el!)}
                value={otpValues[i]}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: 24, fontWeight: 'bold' } }}
                sx={{ width: 60, height: 60 }}
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmOtp}
            disabled={isLoading}
            sx={{ bgcolor: 'rgba(84, 176, 215, 1)', py: 1.5, borderRadius: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'تأكيد الرمز'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* مودال تغيير المنهج الدراسي */}
      {showSelectedMethod && (
        <SelectedMethod
          open={showSelectedMethod}
          onClose={() => setShowSelectedMethod(false)}
          onConfirm={() => { setShowSelectedMethod(false); reloadProfile(); }}
        />
      )}
    </Box>
  );
}