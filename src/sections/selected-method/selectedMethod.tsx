'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Radio,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { primary } from 'src/theme/palette';

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function SelectedMethod({ open, onClose }: Props) {
  const [opened, setOpened] = useState(true);
  const [step, setStep] = useState(0);

  // لحفظ القيم المختارة
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const steps = ['المنهج', 'نوع المنهج', 'المرحلة', 'الصف'];

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const countries = [
    { name: 'مصري', flag: 'https://flagcdn.com/w40/eg.png' },
    { name: 'إماراتي', flag: 'https://flagcdn.com/w40/ae.png' },
    { name: 'سعودي', flag: 'https://flagcdn.com/w40/sa.png' },
    { name: 'كويتي', flag: 'https://flagcdn.com/w40/kw.png' },
  ];
  const handleSubmit = () => {
    console.log({
      country: selectedCountry,
      type: selectedType,
      stage: selectedStage,
      class: selectedClass,
    });

    onClose(); // إغلاق القائمة بعد الإرسال
  };
  console.log();
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogContent
          sx={{
            position: 'relative',
            textAlign: 'center',
            minHeight: '525px',
            justifyContent: 'center',
            padding: '20px 24px',
          }}
        >
          {/* زر السهم ← رجوع فقط */}
          {/* {step > 0 && ( */}
          <Stack sx={{ alignItems: 'start' }}>
            <IconButton
              onClick={prev}
              sx={
                {
                  //   position: 'absolute',
                  //   left: 10,
                  //   top: 10,
                  // bgcolor: '#f5f5f5',
                }
              }
            >
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
          {/* )} */}

          {/* Stepper */}
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* ======== الخطوة 1: اختيار الدولة ======== */}
          {step === 0 && (
            <Box>
              <Typography variant="h5" mb={2}>
                اختر المنهج الذي تدرسه
              </Typography>

              <Grid container spacing={2}>
                {countries.map((c) => (
                  <Grid xs={6} key={c.name}>
                    <Card
                      onClick={() => setSelectedCountry(c.name)}
                      sx={{
                        cursor: 'pointer',
                        border:
                          selectedCountry === c.name ? '2px solid #1976d2' : '2px solid #e0e0e0',
                        borderRadius: '12px',
                        transition: '0.2s',
                        '&:hover': {
                          border: '2px solid #1976d2',
                          transform: 'scale(1.03)',
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardContent sx={{ py: 2 }}>
                          <img src={c.flag} alt="" width={45} />
                          <Typography mt={1} fontWeight="bold">
                            {c.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: primary.main,
                  ':hover': { backgroundColor: primary.lighter },
                }}
                disabled={!selectedCountry}
                onClick={next}
                size="large"
                // color="primary"
              >
                التالي
              </Button>
            </Box>
          )}

          {/* ======== الخطوة 2: نوع المنهج ======== */}
          {step === 1 && (
            <Box>
              <Typography variant="h6" mb={2}>
                نوع المنهج؟
              </Typography>

              {['علمي', 'أدبي', 'متقدم'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Radio checked={selectedType === item} onChange={() => setSelectedType(item)} />
                  }
                  label={item}
                  sx={{
                    display: 'flex',
                    // justifyContent: 'space-between',
                    px: 2,
                    // border: '1px solid #ddd',
                    borderRadius: '8px',
                    mb: 2,
                    height: 50,
                    ':hover': { backgroundColor: primary.light },
                  }}
                />
              ))}

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={!selectedType}
                onClick={next}
                color="primary"
                size="large"
              >
                التالي
              </Button>
            </Box>
          )}

          {/* ======== الخطوة 3: المرحلة ======== */}
          {step === 2 && (
            <Box>
              <Typography variant="h6" mb={2}>
                اختر المرحلة
              </Typography>

              {['ابتدائي', 'إعدادي', 'ثانوي'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Radio
                      checked={selectedStage === item}
                      onChange={() => setSelectedStage(item)}
                    />
                  }
                  label={item}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    px: 2,
                    // border: '1px solid #ddd',
                    borderRadius: '8px',
                    mb: 2,
                    height: 50,
                    ':hover': { backgroundColor: primary.light },
                  }}
                />
              ))}

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={!selectedStage}
                onClick={next}
                color="primary"
                size="large"
              >
                التالي
              </Button>
            </Box>
          )}

          {/* ======== الخطوة 4: الصف ======== */}
          {step === 3 && (
            <Box>
              <Typography variant="h6" mb={2}>
                اختر الصف
              </Typography>

              {['الأول', 'الثاني', 'الثالث'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Radio
                      checked={selectedClass === item}
                      onChange={() => setSelectedClass(item)}
                    />
                  }
                  label={item}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    px: 2,
                    // border: '1px solid #ddd',
                    borderRadius: '8px',
                    mb: 2,
                    height: 50,
                    ':hover': { backgroundColor: primary.light },
                  }}
                />
              ))}

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={!selectedClass}
                onClick={handleSubmit}
                color="primary"
                size="large"
              >
                تأكيد
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
