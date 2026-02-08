import Image from "next/image";
import { Box } from "@mui/material";

// ===== Props type =====
type Props = {
  coverImageUrl: string;
};

export default function CourseMedia({ coverImageUrl }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        height: 300,
        borderRadius: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 12,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
    <Image
  src={coverImageUrl}
  alt="Course cover"
  fill
  unoptimized
  style={{ objectFit: "cover" }}
/>
    </Box>
  );
}
