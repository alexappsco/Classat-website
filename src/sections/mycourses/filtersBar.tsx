




"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputBase,
  Container,
  Typography,
} from "@mui/material";

import { useRouter, useSearchParams } from "next/navigation";

const FiltersBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("Sorting") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("Sorting", search);
    } else {
      params.delete("Sorting");
    }

    router.push(`?${params.toString()}`);
  };

  const categories = [
    "الكل (6)",
    "قيد التقدم (4)",
    "مكتمله (2)",
  ];

  return (
    <Box sx={{ pt: { xs: 9, md: 13 }, px: { xs: 2, md: 6 }, }}>
      <Container>
          <Typography mt='20' variant='h4'>دوراتي</Typography>
        {/* Search */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row-reverse" }}
          alignItems={{ xs: "stretch", md: "center" }}
          gap={2}
          justifyContent="center"
          dir="rtl"
          sx={{ width: "100%", my: 2 }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              flex: 1,
              borderRadius: "50px",
              height: { xs: 45, md: 50 },
              px: 2,
              bgcolor: "#fff",
              boxShadow: "0 0 6px rgba(0,0,0,0.12)",
            }}
          >
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: { xs: 14, md: 16 } }}
              placeholder="إبحث عن كورس..."
            />

            <Button
              onClick={handleSearch}
              sx={{ minWidth: "40px" }}
            >
              <SearchIcon
                sx={{ fontSize: 24, color: "#40A2E3" }}
              />
            </Button>
          </Box>
        </Box>

        {/* Categories */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 1,
            mt: 5,
          }}
        >
          {categories.map((category, index) => (
            <Typography
              key={index}
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 0.6,
                cursor: 'pointer',
                backgroundColor: '#FCFCFC',
                border: '.5px solid #eaeaea',
                whiteSpace: 'nowrap',
              }}
            >
              {category}
            </Typography>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default FiltersBar;
