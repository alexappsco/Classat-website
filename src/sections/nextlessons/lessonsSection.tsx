


"use client";

import { Container, Grid, Typography, Box, Button, Pagination } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  totalCount: number;
  currentPage: number;
  pageSize: number;
  currentStatus: string;
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

const LessonsSection = ({ cards, totalCount, currentPage, pageSize, currentStatus }: IProps) => {
  const t = useTranslations('next_lessons');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(value));
    router.push(`${pathname}?${params.toString()}`);
  };

  // تحويل status لو جاي رقم للعرض فقط في الكروت
  const normalizedCards = cards.map((card) => ({
    ...card,
    status: statusMap[card.status] || card.status,
  }));

  return (
    <Container sx={{ mt: 20, mb: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t('title')}
      </Typography>

      {/* أزرار الفلترة */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant={currentStatus === "All" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("All")}
        >
          {t('all')}
        </Button>

        <Button
          variant={currentStatus === "0" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("0")}
        >
          {t('upcoming')}
        </Button>

        <Button
          variant={currentStatus === "1" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("1")}
        >
          {t('canceled')}
        </Button>

        <Button
          variant={currentStatus === "2" ? "contained" : "outlined"}
          onClick={() => handleFilterChange("2")}
        >
          {t('completed')}
        </Button>
      </Box>

      {/* الكروت */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {normalizedCards.length > 0 ? (
          normalizedCards.map((card, index) => (
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
                enrollmentId={card.id || ""}
                bookingType={card.bookingType || "TeacherPrivateSession"}
              />
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 3, ml: 2 }}>
            {t('no_data')}
          </Typography>
        )}
      </Grid>

      {/* البجينيشن */}
      {totalCount > pageSize && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default LessonsSection;
