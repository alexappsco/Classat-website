'use client';

import { Box, Container, Typography } from '@mui/material';

export default function Hero() {
  return (
    <Box
  sx={{
    width: "100%",
    height: 650,
    position: "relative",
    backgroundImage: `url('/assets/courses/hero.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  }}
>
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(27, 27, 27, 0.7)",
    }}
  />

  <Container
    sx={{
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography
  variant="h3"
  sx={{
    color: "#fff",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "62px",
    letterSpacing: "0px",
    textAlign: "center",
  }}
>
  اتعلم .. طبق .. تفوق!
</Typography>


    <Typography
  variant="h6"
  sx={{
    color: "#FFBB7A",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "36px",
    letterSpacing: "0px",
    textAlign: "center",
    mt: 2,
    maxWidth: 600,
  }}
>
  قم بتنمية مهاراتك في مختلف المجالات مع دوراتنا المميزة والمختارة خصيصًا لك!
</Typography>

  </Container>
</Box>

  );
}
