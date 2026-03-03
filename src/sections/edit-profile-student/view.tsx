// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   Stack,
//   Grid2,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import { enqueueSnackbar } from 'notistack';

// import { Profile } from 'src/types/prof'; // تأكد أن التايب يحتوي على الحقول الجديدة
// import { endpoints } from 'src/utils/endpoints';
// import { editData, postData } from 'src/utils/crud-fetch-api';
// import DialogVerify from './dialog-verify';

// interface Props {
//   profile: Profile;
// }

// export default function EditViewProfile({ profile }: Props) {
//   // ===== States =====
//   const [name, setName] = useState(profile?.name ?? '');
//   const [email, setEmail] = useState(profile?.email ?? '');
//   const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? '');
//   const [localNumber, setLocalNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('966');

//   const [originalPhone, setOriginalPhone] = useState(profile?.phoneNumber ?? '');
//   const [file, setFile] = useState<File | null>(null);

//   const [isLoading, setIsLoading] = useState(false);
//   const [openVerifyModal, setOpenVerifyModal] = useState(false);
//   const [tempPhoneNumber, setTempPhoneNumber] = useState('');

//   // ===== Helpers =====
//   const splitPhoneNumber = (fullNumber: string) => {
//     if (!fullNumber) return { code: '966', local: '' };
//     // إزالة علامة + إذا وجدت
//     let num = fullNumber.startsWith('+') ? fullNumber.substring(1) : fullNumber;

//     if (num.startsWith('966')) {
//       return { code: '966', local: num.substring(3) };
//     }
//     return { code: '966', local: num };
//   };

//   // ===== Initial Load =====
//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || '');
//       setEmail(profile.email || '');
//       setAvatarUrl(profile.avatarUrl || '');
//       setOriginalPhone(profile.phoneNumber || '');

//       const split = splitPhoneNumber(profile.phoneNumber || '');
//       setLocalNumber(split.local);
//       setCountryCode(split.code);
//     }
//   }, [profile]);

//   // ===== Actions =====

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return;
//     setFile(selectedFile);
//     setAvatarUrl(URL.createObjectURL(selectedFile));
//   };

//   const updateProfileData = async (verifiedPhone?: string) => {
//     try {
//       setIsLoading(true);
//       const formData = new FormData();

//       // ملاحظة: تأكد من مسميات الحقول حسب الـ Backend لديك (API)
//       formData.append('Name', name);
//       formData.append('Email', email);

//       const phoneToUse = verifiedPhone || (countryCode + localNumber);
//       formData.append('PhoneNumber', phoneToUse);

//       if (file) {
//         formData.append('AvatarUrl', file);
//       }

//       const res = await editData(endpoints.auth.editProf, 'PUT', formData);

//       if (res.success) {
//         enqueueSnackbar('تم التحديث بنجاح', { variant: 'success' });
//         if (verifiedPhone) setOriginalPhone(verifiedPhone);
//       } else {
//         enqueueSnackbar(res.error?.message || 'فشل التحديث', { variant: 'error' });
//       }
//     } catch (error) {
//       enqueueSnackbar('حدث خطأ في الشبكة', { variant: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveClick = async () => {
//     const fullPhone = countryCode + localNumber;

//     // إذا تغير رقم الهاتف، نرسل OTP أولاً
//     if (fullPhone !== originalPhone.replace('+', '')) {
//       try {
//         setIsLoading(true);
//         const res = await postData('https://api-staging.isthwath.com/auth/send-new-otp', {
//           phoneNumber: fullPhone,
//         });

//         if (res.success) {
//           setTempPhoneNumber(fullPhone);
//           setOpenVerifyModal(true);
//         } else {
//           enqueueSnackbar(res.error?.message || 'فشل إرسال الكود', { variant: 'error' });
//         }
//       } catch (err) {
//         enqueueSnackbar('خطأ في الاتصال', { variant: 'error' });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       await updateProfileData();
//     }
//   };

//   const handleVerifySuccess = async (phone: string, otp: string) => {
//     try {
//       setIsLoading(true);
//       const verifyRes = await postData('https://api-staging.isthwath.com/auth/verify-new-phone', {
//         phoneNumber: phone,
//         otp: otp,
//       });

//       if (verifyRes.success) {
//         await updateProfileData(phone);
//         setOpenVerifyModal(false);
//       } else {
//         enqueueSnackbar('الكود غير صحيح', { variant: 'error' });
//       }
//     } catch (error) {
//       enqueueSnackbar('فشل التحقق', { variant: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ mt: 8, px: 2 }}>
//       <Card sx={{ p: 4, borderRadius: 4, maxWidth: 900, mx: 'auto' }}>
//         <Grid2 container spacing={4}>

//           {/* قسم الصورة */}
//           <Grid2 size={{ xs: 12, md: 3 }} sx={{ textAlign: 'center' }}>
//             <Box sx={{ position: 'relative', display: 'inline-block' }}>
//               <Box
//                 component="img"
//                 src={avatarUrl || '/default-avatar.png'}
//                 sx={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
//               />
//               <input id="file-input" type="file" hidden onChange={handleImageChange} accept="image/*" />
//               <IconButton
//                 component="label"
//                 htmlFor="file-input"
//                 sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: 'white', boxShadow: 1, '&:hover': { bgcolor: '#f5f5f5' } }}
//               >
//                 <EditOutlinedIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </Grid2>

//           {/* قسم البيانات */}
//           <Grid2 size={{ xs: 12, md: 9 }}>
//             <Grid2 container spacing={3}>
//               <Grid2 size={{ xs: 12, md: 6 }}>
//                 <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>الاسم</Typography>
//                 <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth />
//               </Grid2>

//               <Grid2 size={{ xs: 12, md: 6 }}>
//                 <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>البريد الإلكتروني</Typography>
//                 <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
//               </Grid2>

//               <Grid2 size={{ xs: 12, md: 6 }}>
//                 <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>الدولة</Typography>
//                 <TextField value={profile?.country?.name || ''} disabled fullWidth />
//               </Grid2>

//               <Grid2 size={{ xs: 12, md: 6 }}>
//                 <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>رقم الهاتف</Typography>
//                 <Stack direction="row" spacing={1}>
//                   <TextField
//                     value={localNumber}
//                     onChange={(e) => setLocalNumber(e.target.value.replace(/\D/g, ''))}
//                     fullWidth
//                     sx={{ flex: 2 }}
//                   />
//                   <TextField value={`+${countryCode}`} disabled sx={{ flex: 1 }} />
//                 </Stack>
//               </Grid2>

//               <Grid2 size={{ xs: 12 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                   <Button
//                     variant="contained"
//                     onClick={handleSaveClick}
//                     disabled={isLoading}
//                     sx={{ bgcolor: '#222', px: 4, py: 1.2, borderRadius: 2, minWidth: 150 }}
//                   >
//                     {isLoading ? <CircularProgress size={24} color="inherit" /> : 'حفظ التغييرات'}
//                   </Button>
//                 </Box>
//               </Grid2>
//             </Grid2>
//           </Grid2>
//         </Grid2>
//       </Card>

//       {/* مودال التحقق */}
//       <Dialog open={openVerifyModal} onClose={() => setOpenVerifyModal(false)} maxWidth="xs" fullWidth>
//         <DialogTitle sx={{ textAlign: 'center' }}>تأكيد رقم الهاتف</DialogTitle>
//         <DialogContent>
//           <DialogVerify
//             phone={tempPhoneNumber}
//             onVerifySuccess={handleVerifySuccess}
//             onClose={() => setOpenVerifyModal(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }
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
  CircularProgress,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { enqueueSnackbar } from 'notistack';

// Utils & Endpoints
import { editData, postData, getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
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

  // 2. معالج زر "تعديل" الرئيسي
  const handleUpdateClick = async () => {
    // أولوية التحقق: إذا تغير الإيميل أولاً
    if (email !== originalEmail) {
      try {
        setIsLoading(true);
        const res = await postData(endpoints.student.changeEmail, { newEmail: email });
        if (res.success) {
          setOtpType('email');
          setOtpOpen(true);
        } else {
          enqueueSnackbar(res.error || 'فشل إرسال كود الإيميل', { variant: 'error' });
        }
      } catch (err) {
        enqueueSnackbar('خطأ في الاتصال', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // ثم التحقق من رقم الهاتف
    if (phone !== originalPhone) {
      try {
        setIsLoading(true);
        const res = await postData(endpoints.student.changePhone, { newPhoneNumber: phone });
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

    // إذا لم يتغير لا إيميل ولا هاتف، نحدث البيانات العادية فقط
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
          <Box>
            <Typography sx={{ fontSize: 14, mb: 1, color: "text.secondary" }}>رقم الهاتف</Typography>
            <TextField fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
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