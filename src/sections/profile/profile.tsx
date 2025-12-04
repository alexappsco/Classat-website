'use client'
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

const containerWidth = 480;

export default function ProfileSection() {
  const [name, setName] = useState('عبدالله محمد احمد');
  const [email, setEmail] = useState('abdullah@gmail.com');
  const [phone, setPhone] = useState('20103456+');
  const [country, setCountry] = useState('الإمارات');
  const [imageSrc, setImageSrc] = useState('/favicon/studend.jpg');

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,

      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        sx={{ width: '100%', maxWidth: containerWidth }}
      >
        <Box
          sx={{
            position: 'relative',
            mt: {xs:9, md:5,lg:5},
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={imageSrc}
            alt="profile"
            sx={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: 'none',
              display: 'block',
            }}
          />

          <input id="profile-file-input" type="file" style={{ display: 'none' }} />

          <IconButton
            component="label"
            htmlFor="profile-file-input"
            sx={{
              position: 'absolute',
              left: 'calc(50% - 60px - 8px)',
              bottom: -10,
              bgcolor: 'white',
              border: '1px solid #ddd',
              width: 36,
              height: 36,
              '&:hover': { bgcolor: '#fafafa' },
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={1} sx={{ width: '100%' }}>

          <Box>
            <Typography sx={{ fontSize: 14,mb:1,  fontWeight:400 ,color:"rgba(93, 93, 93, 1)" }}>
              الاسم الكامل
            </Typography>

            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              // size="small"
              // inputProps={{
              //   style: { height: 44, padding: '0 16px', direction: 'rtl' },
              // }}
              sx={{
                borderRadius:"15px",
                gap:"10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14,mb:1,  fontWeight:400 ,color:"rgba(93, 93, 93, 1)"}}>
              البريد الإلكتروني
            </Typography>

            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              // size="small"
              // inputProps={{
              //   style: { height: 44, padding: '0 16px', direction: 'rtl' },
              // }}
              sx={{
                borderRadius:"15px",
                gap:"10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, mb:1, fontWeight:400 ,color:"rgba(93, 93, 93, 1)"}}>
              رقم الهاتف
            </Typography>

            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
               sx={{
                borderRadius:"15px",
                gap:"10px",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#ddd' },
                  '&.Mui-focused fieldset': { borderColor: '#ddd' },
                },
              }}
            />

          </Box>

          <Box>
  <Typography sx={{ fontSize: 14, fontWeight: 400, color: "rgba(93, 93, 93, 1)" }}>
    الدولة
  </Typography>

  <Select
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    fullWidth
    sx={{
      borderRadius: "15px",
      gap: "10px",
      backgroundColor: '#fff',

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#ddd',
        },
        '&:hover fieldset': {
          borderColor: '#ddd',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ddd !important',
          borderWidth: '1px !important',
        },
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ddd !important',
        },
      },
    }}
  >
    <MenuItem value="مصر">مصر</MenuItem>
    <MenuItem value="السعودية">السعودية</MenuItem>
    <MenuItem value="الإمارات">الإمارات</MenuItem>
    <MenuItem value="الكويت">الكويت</MenuItem>
  </Select>
</Box>

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'rgba(84, 176, 215, 1)',
                color: 'rgba(255, 255, 255, 1)',
                paddingRight:"32px",
                paddingLeft:"32px",
                borderRadius: "16px",
                textTransform: 'none',
                width: 171,
                height:"50px",
                '&:hover': { bgcolor: '#57aebf' },
              }}
            >
              حفظ
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
