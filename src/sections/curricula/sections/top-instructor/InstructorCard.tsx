import { Box, Card, Typography, Stack, Button, Chip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { primary, secondary, text } from 'src/theme/palette';
import { StudentTeacherEducationItem } from 'src/types/teachers';

export enum CourseType {
  ONE_TO_ONE = 'OneToOne',
  LIVE_GROUP = 'LiveGroup',
  RECORDED = 'Recorded',
}


export default function InstructorCard({
 teacher

}:{teacher: StudentTeacherEducationItem}) {
  const theme = useTheme();
  const t = useTranslations('Pages.TopTeachers');
  const router = useRouter();

  const primaryColor = primary.main;
  const secondaryColor = secondary.main;
  const primaryTextColor = text.primary;

  const coursePrices = [
    { type: CourseType.ONE_TO_ONE, value: teacher?.priceOneToOne },
    { type: CourseType.LIVE_GROUP, value: teacher?.priceLiveGroup },
    { type: CourseType.RECORDED, value: teacher?.priceRecorded },
  ];


  return (
    <Card
      sx={{
        pb: 2,
        borderRadius: 2,
        boxShadow: theme.customShadows.z12,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        overflow: 'visible',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          height: 150,
          borderRadius: '8px 8px 0 0', // Rounded corners on top only
          overflow: 'visible', // Keeps image overflow visible
          backgroundColor: primary.main,
        }}
      >
        <Chip
          label={teacher?.subjectName}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 10,
            bgcolor: secondaryColor,
            color: theme.palette.common.white,
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(12),
            zIndex: 10,
          }}
        />

        <Box
          component="img"
          src={teacher?.profileImageUrl}
          alt={teacher?.fullName}
          sx={{
            position: 'absolute',
            width: 200,
            height: 'auto', // Fixed height
            top: -93, // Push the image down to exit the card slightly
            left: '50%',
            transform: 'translateX(-50%)', // Center the image horizontally
            objectFit: 'contain',
            zIndex: 5,
          }}
        />
      </Box>

      {/* Content */}
      <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, alignItems: 'flex-end', pt: 2 }}>
        {/* Name + Rating in same row */}
        <Stack direction="row-reverse" justifyContent="space-between" width="100%">
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: primaryTextColor }}>
              {teacher?.averageRating?.toFixed(1)}
            </Typography>
            <Box
              component="img"
              src="/assets/icons/rating/star.png"
              alt="Star"
              sx={{ width: 16, height: 16 }}
            />
          </Stack>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: primaryTextColor }}>
             {t('teacherPrefix')}{teacher?.fullName}
          </Typography>
        </Stack>

        {/* Prices */}
        <Stack width="100%" spacing={0.5}>
          {coursePrices.map((item) => (
            <Stack key={item.type} direction="row-reverse" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: '#54B0D7', fontWeight: 700 }}>
                <Box component="span" sx={{ unicodeBidi: 'plaintext' }}>
                  {item.value}
                </Box>{' '}
                {t('currencyPerHour')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t(`courseTypes.${item.type}`)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Button */}
      <Button
        variant="outlined"
        size="medium"
        onClick={()=> router.push(`/curricula/details-mathod/${teacher?.teacherId}?subjectId=${teacher?.educationApproachTypeStageGradeSubjectId}`)}
        sx={{
          py: 1.5,
          color: primaryTextColor,
          borderColor: primaryColor,
          '&:hover': {
            borderColor: primaryColor,
            bgcolor: alpha(primaryColor, 0.08),
          },
          borderRadius: '30px',
          width: '90%',
          m: 'auto',
        }}
      >
        {t('viewAvailability')}
      </Button>
    </Card>
  );
}
