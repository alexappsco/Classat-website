
import { Card, Box, Typography, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BookIcon from "@mui/icons-material/MenuBook";

interface Props {
  img: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  price?: string;
  href?: string;
}

export default function LessonCard({
  img,
  name,
  subject,
  date,
  time,
  href,
}: Props) {
  return (
    <Card
      sx={{
        m: 1,
        p: 2,
        minHeight: 110,
        borderRadius: 2,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
        cursor: href ? "pointer" : "default",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0,0,0,0.16)",
        },
        alignItems: "flex-start",
        gap: 1.5,
      }}
    >
      {/* Avatar + Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar src={img} sx={{ width: 32, height: 32 }} />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: 14,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
      </Box>

      {/* Subject */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mt: 1 }}>
        <BookIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {subject}
        </Typography>
      </Box>

      {/* Date + Time */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 0.4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EventIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
          <Typography sx={{ fontSize: 12 }}>{date}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {time}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
