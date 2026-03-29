"use client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
} from "@mui/material";
import Image from 'next/image';
import lineImage from "../../../../public/assets/line.png";
import { Icon } from '@iconify/react';
import test from "../../../../public/assets/illustrations/illustration_dashboard.png"
import CategoryBadge from './course-category';

//  courses fake data
const courses = [
  {
    id: 1,
    title: "أساسيات التصميم للمواقع والتطبيقات",
    category: "UI/UX Design",
    teacher: "خالد محمد",
    teacherImg: "/images/teacher-1.png",
    image: test,
    rating: 4.8,
    students: "5K+",
    duration: "24 hr 40 mins",
    lessons: 12,
    newPrice: "$60.00",
    oldPrice: "$100.99",
  },
  {
    id: 2,
    title: "تطوير الواجهات الويب | React",
    category: "Web Development",
    teacher: "محمد علي",
    teacherImg: "/images/teacher-2.png",
    image:test,
    rating: 4.8,
    students: "5K+",
    duration: "24 hr 40 mins",
    lessons: 12,
    newPrice: "$60.00",
    oldPrice: "$100.99",
  },
  {
    id: 3,
    title: "React Native تطوير تطبيقات الموبايل",
    category: "Mobile Development",
    teacher: "احمد محمود",
    teacherImg: "/images/teacher-3.png",
    image: test,
    rating: 4.8,
    students: "5K+",
    duration: "24 hr 40 mins",
    lessons: 12,
    newPrice: "$60.00",
    oldPrice: "$100.99",
  },
  {
    id: 4,
    title: "أساسيات التصميم للمواقع والتطبيقات",
    category: "UI/UX Design",
    teacher: "خالد محمد",
    teacherImg: "/images/teacher-1.png",
    image: test,
    rating: 4.8,
    students: "5K+",
    duration: "24 hr 40 mins",
    lessons: 12,
    newPrice: "$60.00",
    oldPrice: "$100.99",
  },
];

export default function RelatedCourses() {
  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      {/* Section header */}
      <Typography variant="h4" fontWeight={700} sx={{color: "#153A52"}}>
        كورسات مشابهة قد <span style={{ color: "#FFAB00" }}>تعجبك</span>
      </Typography>
      <Image
        src={lineImage}
        alt=""
        style={{margin: "20px 0"}}
      />
      {/* Courses grid */}
      <Grid container spacing={3} justifyContent="center">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <Card
              sx={{
                borderRadius: "14px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "14px",
                  width: 39,
                  height: 39,
                  borderRadius: "25px",
                  background: "#FFFFFF",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                  cursor: "pointer",
                  '&:hover': {
                    background: "#F8F8F8",
                  }
                }}
              >
                {/* Favorite heart icon */}
                <Icon
                  icon="mdi:heart-outline"
                  width="21.5px"
                  height="18.72px"
                  color="#637381"
                />
              </Box>
                {/* Course image */}
              <CardMedia
                component="img"
                height="200"
                image={test.src}
                alt={course.title}
                sx={{ objectFit: "cover" }}
              />
                {/* Course content */}
              <CardContent sx={{
                textAlign: "start",
                p: 2.5,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5
              }}>
                {/* Category and rating row */}
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5
                }}>
                  {/* Category badge */}
                  <CategoryBadge category={course.category}size="small" />
                {/* Rating display */}
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5
                  }}>
                  <Typography sx={{
                    color: "#7F8490",
                    fontSize: "12px",
                  }}>
                    (34.8)
                  </Typography>
                  <Icon
                    icon="mdi:star"
                    width="12px"
                    height="12px"
                    color="#EE7F50"
                  />
                  <Typography sx={{
                    fontWeight: 700,
                    color: "#7F8490",
                    fontSize: "14px",
                  }}>
                    {course.rating}
                  </Typography>

                </Box>
                </Box>
                {/* Course title */}
                <Typography
                  sx={{
                    color: "#0E0E0F",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "21px",
                    minHeight: "42px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {course.title}
                </Typography>
                {/* Course duration and lessons */}
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "#7F8490",
                  fontSize: "13px",
                  mb: 1
                }}>
                  {/* Teacher and price section */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Icon icon="mdi:clock-outline" width="13px" height="13px" />
                    <span>{course.duration}</span>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Icon icon="mdi:book-outline" width="13px" height="13px" />
                    <span>{course.lessons} دروس</span>
                  </Box>
                </Box>

                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  mt: "auto",
                  borderTop: "1px solid #f0f0f0"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={course.teacherImg}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Typography sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0E0E0F"
                    }}>
                      {course.teacher}
                    </Typography>
                  </Box>
                  {/* Price display */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        fontWeight: "400",
                        color: "#1B1B1B99",
                        fontSize: "16px"
                      }}
                    >
                      {course.oldPrice}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#54B0D7",
                        fontSize: "16px",
                        fontWeight: "600"
                      }}
                    >
                      {course.newPrice}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
