import { Card, Stack, Typography, Box } from '@mui/material';
import Image from 'src/components/image';
import { secondary, text, shadow } from 'src/theme/palette';

const orangeColor = secondary.main;
const liteOrangeColor = secondary.lighter;
const textPrimaryColor = text.primary;
const textParagraphColor = text.paragraph;

type Props = {
  name: string;
  role: string;
  text: string;
  avatar: string;
};

export default function TestimonialsCard({ name, role, text, avatar }: Props) {
  return (
    <Card
      sx={{
        borderRadius: '24px',
        backgroundColor: '#fff',
        boxShadow: shadow.main,
        py: 5,
        px: 3,
        width: '100%',
        height: '100%',
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={2} direction={'row-reverse'} justifyContent={'space-between'}>
          {/* Quote Icon */}
          <Image
            src="/assets/landing-page/Qutes.png"
            alt={name}
            sx={{
              width: 68,
            }}
          />
          {/* <Typography
          sx={{
            color: orangeColor,
            fontSize: 40,
            fontWeight: 'bold',
            lineHeight: 1,
          }}
        >
          ”
        </Typography> */}

          {/* Name + Avatar */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Image
              src={avatar}
              alt={name}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
            />
            <Stack>
              <Typography sx={{ fontWeight: 700, fontSize: 18, color: textPrimaryColor }}>
                {name}
              </Typography>
              <Typography sx={{ color: textParagraphColor, fontSize: 14 }}>{role}</Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* Testimonial Text */}
        <Typography
          sx={{
            color: textParagraphColor,
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Card>
  );
}
