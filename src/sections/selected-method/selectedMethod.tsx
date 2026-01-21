


'use client';

import { useEffect, useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { primary } from 'src/theme/palette';
import { editData, getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'next/dist/client/components/navigation';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: {

    EducationApproachTypeStageGradeId
    : string;
  }) => void;
}

export default function SelectedMethod({
  open,
  onClose,
  onConfirm,
}: Props) {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const steps = ['المنهج', 'نوع المنهج', 'المرحلة', 'الصف'];

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // القيم المختارة
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedTypeMapId, setSelectedTypeMapId] = useState('');
  const [selectedTypeStageId, setSelectedTypeStageId] = useState('');
  const [selectedTypeStageGradeId, setSelectedTypeStageGradeId] =
    useState('');

  // بيانات الـ API
  const [type, setType] = useState<any[]>([]);
  const [typeMap, setTypeMap] = useState<any[]>([]);
  const [typeStage, setTypeStage] = useState<any[]>([]);
  const [typeStageGrade, setTypeStageGrade] = useState<any[]>([]);

  // ======================
  // تحميل المناهج
  // ======================
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await getData<any>(
          endpoints.EducationApproach.type
        );


        if (res?.success && Array.isArray(res?.data?.items)) {
          setType(res.data.items);
        } else {
          setType([]);
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchType();
  }, []);


  // ======================
  // تحميل نوع المنهج حسب المنهج المختار
  // ======================
  useEffect(() => {
    if (!selectedTypeId) return;

    const fetchTypeMap = async () => {
      try {
        const res = await getData<any>(
          `${endpoints.EducationApproach.typeMap}?educationApproachId=${selectedTypeId}`
        );

        if (res?.success && Array.isArray(res?.data?.items)) {
          setTypeMap(res.data.items);
        } else {
          setTypeMap([]);
        }
      } catch (error) {
        console.error('Error fetching type map:', error);
      }
    };

    // إعادة التهيئة عند التغيير
    setSelectedTypeMapId('');
    setSelectedTypeStageId('');
    setSelectedTypeStageGradeId('');
    setTypeStage([]);
    setTypeStageGrade([]);

    fetchTypeMap();
  }, [selectedTypeId]);

  // ======================
  // تحميل المراحل حسب نوع المنهج
  // ======================
  useEffect(() => {
    if (!selectedTypeMapId) return;

    const fetchTypeStages = async () => {
      try {
        const res = await getData<any>(
          `${endpoints.EducationApproach.typeStage}?educationApproachTypeMapId=${selectedTypeMapId}`
        );


        if (res?.success && Array.isArray(res?.data?.items)) {
          setTypeStage(res.data.items);
        } else {
          setTypeStage([]);
        }
      } catch (error) {
        console.error('Error fetching stages:', error);
      }
    };

    setSelectedTypeStageId('');
    setSelectedTypeStageGradeId('');
    setTypeStageGrade([]);

    fetchTypeStages();
  }, [selectedTypeMapId]);


  // ======================
  // تحميل الصفوف حسب المرحلة
  // ======================
  useEffect(() => {
    if (!selectedTypeStageId) return;

    const fetchTypeStagesGrade = async () => {
      try {
        const res = await getData<any>(
          `${endpoints.EducationApproach.typeStageGrade}?educationApproachTypeStageId=${selectedTypeStageId}`
        );

        if (res?.success && Array.isArray(res?.data?.items)) {
          setTypeStageGrade(res.data.items);
        } else {
          setTypeStageGrade([]);
        }
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchTypeStagesGrade();
  }, [selectedTypeStageId]);


  


  const handleSubmit = async () => {
    try {
      if (!selectedTypeStageGradeId) {
        alert('الرجاء اختيار الصف أولاً');
        return;
      }

      // ⭐ إرسال كـ query parameters كما هو مطلوب من الـ backend
      const formData = new FormData();
      formData.append('EducationApproachTypeStageGradeId', selectedTypeStageGradeId);

      const response = await editData(
        endpoints.profile.update,
        'PUT',
        formData,
      );


      if (response.success) {
        alert('تم ✅');
        router.push('/curricula');
        onClose();
      } else {
        alert(`خطأ: ${response.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent
        sx={{
          position: 'relative',
          textAlign: 'center',
          minHeight: '525px',
          padding: '20px 24px',
        }}
      >
        {/* زر الرجوع */}
        <Stack sx={{ alignItems: 'start' }}>
          <IconButton onClick={prev}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>

        {/* Progress */}
        <LinearProgress
          variant="determinate"
          value={(step / (steps.length - 1)) * 100}
          sx={{
            height: 6,
            borderRadius: 5,
            mb: 2,
          }}
        />

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* ===== الخطوة 1 ===== */}
        {step === 0 && (
          <Box>
            <Typography variant="h5" mb={3}>
              اختر المنهج الذي تدرسه
            </Typography>

            <Grid container spacing={2}>
              {type.map((c) => (
                <Grid xs={6} key={c.id}>
                  <Card
                    onClick={() => setSelectedTypeId(c.id)}
                    sx={{
                      cursor: 'pointer',
                      border:
                        selectedTypeId === c.id
                          ? '2px solid #1976d2'
                          : '2px solid #e0e0e0',
                      borderRadius: '12px',
                      transition: '0.2s',
                      '&:hover': {
                        border: '2px solid #1976d2',
                        transform: 'scale(1.03)',
                      },
                      width: 175,
                      height: 100,
                      m: 1,
                    }}
                  >
                    <CardActionArea>
                      <CardContent sx={{ py: 2 }}>
                        <img src={c.logo} alt="" width={45} />
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
              disabled={!selectedTypeId}
              onClick={next}
              size="large"
            >
              التالي
            </Button>
          </Box>
        )}

        {/* ===== الخطوة 2 ===== */}
        {step === 1 && (
          <Box>
            <Typography variant="h6" mb={2}>
              نوع المنهج؟
            </Typography>

            {typeMap.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Radio
                    checked={selectedTypeMapId === item.id}
                    onChange={() =>
                      setSelectedTypeMapId(item.id)
                    }
                  />
                }
                label={item.educationApproachTypeName}
                sx={{
                  display: 'flex',
                  px: 2,
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
              disabled={!selectedTypeMapId}
              onClick={next}
              size="large"
            >
              التالي
            </Button>
          </Box>
        )}

        {/* ===== الخطوة 3 ===== */}
        {step === 2 && (
          <Box>
            <Typography variant="h6" mb={2}>
              اختر المرحلة
            </Typography>

            {typeStage.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Radio
                    checked={selectedTypeStageId === item.id}
                    onChange={() =>
                      setSelectedTypeStageId(item.id)
                    }
                  />
                }
                label={item.educationStageName}
                sx={{
                  display: 'flex',
                  px: 2,
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
              disabled={!selectedTypeStageId}
              onClick={next}
              size="large"
            >
              التالي
            </Button>
          </Box>
        )}

        {/* ===== الخطوة 4 ===== */}
        {step === 3 && (
          <Box>
            <Typography variant="h6" mb={2}>
              اختر الصف
            </Typography>

            {typeStageGrade.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Radio
                    checked={
                      selectedTypeStageGradeId ===
                      item.id
                    }
                    onChange={() =>
                      setSelectedTypeStageGradeId(
                        item.id
                      )
                    }
                  />
                }
                label={item.educationGradeName}
                sx={{
                  display: 'flex',
                  px: 2,
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
              disabled={!selectedTypeStageGradeId}
              onClick={handleSubmit}
              size="large"
            >
              تأكيد
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
