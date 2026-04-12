


"use client";

import { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import LessonCard from "./lessonCard";

/* =========================
   Types
========================= */

export interface IStudentCard {
  status: string;
  id?: string;
  img: string;
  name: string;
  studentClass: string;
  language: string;
  country: string;
  date: string;
  time: string;
  href?: string;
  bookingType?: "TeacherPrivateSession";
  sessionId?: string;
}

interface IProps {
  cards: IStudentCard[];
}

/* =========================
   Status Mapping (لو API بيرجع أرقام)
========================= */

const statusMap: Record<string, "Scheduled" | "Cancelled" | "Completed"> = {
  "1": "Scheduled",
  "2": "Completed",
  "3": "Cancelled",
};

/* =========================
   Component
========================= */

const LessonsSectionMain = ({ cards }: IProps) => {
    const t = useTranslations('next_lessons');

  const [filter, setFilter] = useState<
    "All" | "Scheduled" | "Cancelled" | "Completed"
  >("All");

  // تحويل status لو جاي رقم
  const normalizedCards = cards.map((card) => ({
    ...card,
    status: statusMap[card.status] || card.status,
  }));

  // فلترة
  const filteredCards = normalizedCards.filter((card) => {
    if (filter === "All") return true;
    return card.status === filter;
  });

  return (
    <Container sx={{ mt: 20, mb: 8 }}>
      {/* أزرار الفلترة */}
       <Grid container spacing={{ xs: 2, md: 3 }}>
        {cards.map((card, index) => (
          <Grid
            item
            key={card.id || `${card.name}-${index}`}
            xs={12}
            sm={6}
            md={3}
          >
            <LessonCard
              status={card.status}
              img={card.img}
              name={card.name} 
              subject={card.language}
              date={card.date}
              time={card.time}
              enrollmentId={card.id || "" }
              bookingType={card.bookingType || "TeacherPrivateSession"}
              
              // href={card.href}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default LessonsSectionMain;
