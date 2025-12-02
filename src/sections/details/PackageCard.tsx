import { Card, Stack, Typography, Button, Box } from '@mui/material';
import { primary, warning } from 'src/theme/palette';

type PackageCardProps = {
  title: string;
  descriptionLine1: string;
  descriptionLine2: string;
  hoursLabel: string;
  price: string;
  discountText: string;
};

function PackageCard({
  title,
  descriptionLine1,
  descriptionLine2,
  hoursLabel,
  price,
  discountText,
}: PackageCardProps) {
  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(145, 158, 171, 0.18)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={2} alignItems="center">
        {/* Icon circle */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#E6F4FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* استخدم أي أيقونة لديك */}
          <Box component="img" src="/favicon/flash.svg" alt="" sx={{ width: 32, height: 32 }} />
        </Box>

        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {descriptionLine1}
          <br />
          {descriptionLine2}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {hoursLabel}
        </Typography>

        <Typography
          variant="h5"
          sx={{ color: warning.main, fontWeight: 700, mt: 1 }}
        >
          {price} درهم
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {discountText}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          borderRadius: 999,
          bgcolor: primary.main,
          ':hover': { bgcolor: primary.dark },
        }}
      >
        اشترِ الآن
      </Button>
    </Card>
  );
}

export default PackageCard;