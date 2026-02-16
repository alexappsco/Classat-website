
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
import SelectedMethod from '../selected-method/selectedMethod'; // الكمبوننت الجديد

const containerWidth = 480;

type Country = { id: string; name: string };

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
  const [imageSrc, setImageSrc] = useState(profile?.avatarUrl || '');
  const [showSelectedMethod, setShowSelectedMethod] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
    <Box
      component="main"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
    >
      <Stack spacing={4} alignItems="center" sx={{ width: '100%', maxWidth: containerWidth }}>

        {/* ===== Image ===== */}
        <Box sx={{ position: 'relative', mt: { xs: 9, md: 5, lg: 5 }, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box
            component="img"
            src={imageSrc}
            alt="profile"
            sx={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover' }}
          />
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
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>
              الاسم الكامل
            </Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
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
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>
              البريد الإلكتروني
            </Typography>
            <TextField value={email} fullWidth 
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
            <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>
              رقم الهاتف
            </Typography>
            <TextField value={phone} fullWidth 
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
  <Typography
    sx={{
      fontSize: 14,
      mb: 1,
      fontWeight: 400,
      color: "rgba(93, 93, 93, 1)",
    }}
  >
    الدولة
  </Typography>

    <Select
        value={countryId}
        onChange={(e) => setCountryId(e.target.value as string)}
        fullWidth
        displayEmpty
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          '& .MuiSelect-select': {
            padding: '14px',
            backgroundColor: '#fff',
          },
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&.Mui-focused': {
            backgroundColor: '#fff',
          },
          '&:hover .MuiSelect-select': {
            backgroundColor: '#fff',
          },
          '&.Mui-focused .MuiSelect-select': {
            backgroundColor: '#fff',
          },
        }}
      >
        {countries.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
  </Box>
          {/* Show SelectedMethod */}
          {profile.learningPreference !== "Courses" && (
            <Box sx={{ mt: 3}}>
             <Button
                onClick={() => setShowSelectedMethod(true)}
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  mb: 1,
                  mt: 1,
                  alignSelf: 'flex-start',
                  color: 'rgba(84, 176, 215, 1)',
                  borderColor: 'rgba(84, 176, 215, 1)',
                  borderRadius: '12px',
                  px: 2,
                  py: 0.7,
                  textTransform: 'none',
                  backgroundColor: 'rgba(84, 176, 215, 0.08)',
                  transition: 'all .2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(84, 176, 215, 0.15)',
                    borderColor: 'rgba(84, 176, 215, 1)',
                  },
                }}
              >
                تغير المنهج الدراسي
            </Button>

              {/* هنا يظهر الكمبوننت عند الضغط */}
              {showSelectedMethod && (
               <SelectedMethod
      open={showSelectedMethod}
      onClose={() => setShowSelectedMethod(false)}
      onConfirm={(data) => {
        // تحديث القيم في الصفحة الرئيسية إذا أحببت
        console.log('Selected Data:', data);
        setShowSelectedMethod(false);
      }}
    />
              )}
            </Box>
          )}

          {/* Update */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{ bgcolor: 'rgba(84, 176, 215, 1)', borderRadius: '16px', width: 171, height: '50px' }}
            >
              تعديل
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}










// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Stack,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import { enqueueSnackbar } from 'notistack';
// import { editData, getData } from 'src/utils/crud-fetch-api';
// import { endpoints } from 'src/utils/endpoints';

// const containerWidth = 480;

// type Country = { id: string; name: string };

// type Approach = {
//   id: string;
//   name: string;
//   logo?: string;
// };

// type Item = { id: string; name: string };

// type Props = {
//   profile: any;
//   countries: Country[];
//   approaches: Approach[];
// };

// export default function ProfileSection({
//   profile,
//   countries,
//   approaches,
// }: Props) {
//   // ===== States =====
//   const [name, setName] = useState(profile?.name || '');
//   const [email] = useState(profile?.email || '');
//   const [phone] = useState(profile?.phoneNumber || '');
//   const [countryId, setCountryId] = useState(profile?.country?.id || '');

//   // ===== Hierarchy =====
//   const [approachId, setApproachId] = useState(
//     profile?.educationApproach?.id || ''
//   );

//   const [typeId, setTypeId] = useState(
//     profile?.educationApproach?.educationApproachType?.id || ''
//   );

//   const [stageId, setStageId] = useState(
//     profile?.educationApproach?.educationApproachType?.educationStage?.id || ''
//   );

//   const [gradeId, setGradeId] = useState(
//     profile?.educationApproach?.educationApproachType?.educationStage
//       ?.educationGrade?.id || ''
//   );

//   const [types, setTypes] = useState<Item[]>([]);
//   const [stages, setStages] = useState<Item[]>([]);
//   const [grades, setGrades] = useState<Item[]>([]);

//   // ===== Image (كما هو — بدون أي تعديل) =====
//   const [imageSrc, setImageSrc] = useState(profile?.avatarUrl || '');
//   const [file, setFile] = useState<File | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return;
//     setFile(selectedFile);
//     setImageSrc(URL.createObjectURL(selectedFile));
//   };

//   // =====================================================
//   // ================= Prefill ===========================
//   // =====================================================

//   useEffect(() => {
//     const loadHierarchy = async () => {
//       if (!approachId) return;

//       const typesRes = await getData<any>(
//         `${endpoints.educationApproachType.get}?approachId=${approachId}`
//       );
//       setTypes(typesRes?.data?.items || []);

//       if (!typeId) return;

//       const stagesRes = await getData<any>(
//         `${endpoints.educationApproachTypeStage.get}?approachTypeId=${typeId}`
//       );
//       setStages(stagesRes?.data?.items || []);

//       if (!stageId) return;

//       const gradesRes = await getData<any>(
//         `${endpoints.educationApproachTypeStageGrade.get}?approachTypeStageId=${stageId}`
//       );
//       setGrades(gradesRes?.data?.items || []);
//     };

//     loadHierarchy();
//   }, []);

//   // =====================================================
//   // ================= Handlers ==========================
//   // =====================================================

//   const handleApproachChange = async (id: string) => {
//     setApproachId(id);

//     setTypeId('');
//     setStageId('');
//     setGradeId('');
//     setStages([]);
//     setGrades([]);

//     const res = await getData<any>(
//       `${endpoints.educationApproachType.get}?approachId=${id}`
//     );
//     setTypes(res?.data?.items || []);
//   };

//   const handleTypeChange = async (id: string) => {
//     setTypeId(id);

//     setStageId('');
//     setGradeId('');
//     setGrades([]);

//     const res = await getData<any>(
//       `${endpoints.educationApproachTypeStage.get}?approachTypeId=${id}`
//     );
//     setStages(res?.data?.items || []);
//   };

//   const handleStageChange = async (id: string) => {
//     setStageId(id);

//     setGradeId('');

//     const res = await getData<any>(
//       `${endpoints.educationApproachTypeStageGrade.get}?approachTypeStageId=${id}`
//     );
//     setGrades(res?.data?.items || []);
//   };

//   // =====================================================
//   // ================= Update ============================
//   // =====================================================

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();

//       formData.append('Name', name);
//       formData.append('CountryId', countryId);

//       // ⚠️ نفس كودك — بدون تعديل
//       formData.append('AvatarUrl', file || '');

//       formData.append('GuardianPhoneNumber', '');

//       formData.append(
//         'EducationApproachTypeStageGradeId',
//         gradeId || ''
//       );

//       const res = await editData(
//         endpoints.student.update,
//         'PUT',
//         formData as any
//       );

//       if (res.success) {
//         enqueueSnackbar('تم التعديل بنجاح', { variant: 'success' });
//         return;
//       }

//       enqueueSnackbar('فشل التعديل', { variant: 'error' });

//     } catch (error) {
//       enqueueSnackbar('حدث خطأ ما', { variant: 'error' });
//     }
//   };

//   // =====================================================
//   // ================= UI ================================
//   // =====================================================

//   return (
//     <Box component="main"
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         p: 2,
//       }}
//     >
//       <Stack spacing={4} alignItems="center"
//         sx={{ width: '100%', maxWidth: containerWidth }}
//       >

//         {/* ===== Image (كما هو 100%) ===== */}
//         <Box sx={{
//           position: 'relative',
//           mt: { xs: 9, md: 5, lg: 5 },
//           display: 'flex',
//           justifyContent: 'center',
//           width: '100%',
//         }}>
//           <Box component="img"
//             src={imageSrc}
//             alt="profile"
//             sx={{
//               width: 160,
//               height: 160,
//               borderRadius: '50%',
//               objectFit: 'cover',
//             }}
//           />

//           <input
//             id="profile-file-input"
//             type="file"
//             hidden
//             onChange={handleImageChange}
//           />

//           <IconButton
//             component="label"
//             htmlFor="profile-file-input"
//             sx={{
//               position: 'absolute',
//               left: 'calc(50% - 60px - 8px)',
//               bottom: -10,
//               bgcolor: 'white',
//               border: '1px solid #ddd',
//               width: 36,
//               height: 36,
//             }}
//           >
//             <EditOutlinedIcon fontSize="small" />
//           </IconButton>
//         </Box>

//         <Stack spacing={1} sx={{ width: '100%' }}>

//           {/* Name */}
//           <Box>
//             <Typography>الاسم الكامل</Typography>
//             <TextField
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               fullWidth
//             />
//           </Box>

//           {/* Email */}
//           <Box>
//             <Typography>البريد الإلكتروني</Typography>
//             <TextField value={email} fullWidth  />
//           </Box>

//           {/* Phone */}
//           <Box>
//             <Typography>رقم الهاتف</Typography>
//             <TextField value={phone} fullWidth  />
//           </Box>

//           {/* Country */}
//           <Box>
//             <Typography>الدولة</Typography>
//             <Select
//               value={countryId}
//               onChange={(e) => setCountryId(e.target.value as string)}
//               fullWidth
//             >
//               {countries.map((c) => (
//                 <MenuItem key={c.id} value={c.id}>
//                   {c.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Box>

//           {/* Curriculum */}
//           {profile.learningPreference !== 'Courses' && (
//             <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
//               <Select
//                 value={approachId}
//                 onChange={(e) =>
//                   handleApproachChange(e.target.value)
//                 }
//                 fullWidth
//               >
//                 {approaches.map((a) => (
//                   <MenuItem key={a.id} value={a.id}>
//                     {a.name}
//                   </MenuItem>
//                 ))}
//               </Select>

//               <Select
//                 value={typeId}
//                 onChange={(e) =>
//                   handleTypeChange(e.target.value)
//                 }
//                 fullWidth
//               >
//                 {types.map((t) => (
//                   <MenuItem key={t.id} value={t.id}>
//                     {t.name}
//                   </MenuItem>
//                 ))}
//               </Select>

//               <Select
//                 value={stageId}
//                 onChange={(e) =>
//                   handleStageChange(e.target.value)
//                 }
//                 fullWidth
//               >
//                 {stages.map((s) => (
//                   <MenuItem key={s.id} value={s.id}>
//                     {s.name}
//                   </MenuItem>
//                 ))}
//               </Select>

//               <Select
//                 value={gradeId}
//                 onChange={(e) =>
//                   setGradeId(e.target.value)
//                 }
//                 fullWidth
//               >
//                 {grades.map((g) => (
//                   <MenuItem key={g.id} value={g.id}>
//                     {g.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Box>
//           )}

//           {/* Update */}
//           <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button
//               variant="contained"
//               onClick={handleUpdate}
//               sx={{
//                 bgcolor: 'rgba(84, 176, 215, 1)',
//                 borderRadius: '16px',
//                 width: 171,
//                 height: '50px',
//               }}
//             >
//               تعديل
//             </Button>
//           </Box>

//         </Stack>
//       </Stack>
//     </Box>
//   );
// }
