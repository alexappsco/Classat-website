"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Select,
  MenuItem,
  InputBase,
  Container,
  SelectChangeEvent,
} from "@mui/material";

const SearchBar = () => {
  const [category, setCategory] = React.useState("Programming");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container
      sx={{
        pt: { xs: 8, md: 4 },
        direction: 'rtl',
      }}
    >
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      justifyContent="center"
      dir="rtl"
      sx={{ width: "100%" }}
    >
      {/* Search Input */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          flex: 1,
          borderRadius: "50px",
          height: 50,
          px: 2,
          bgcolor: "#fff",
          boxShadow: "0 0 6px rgba(0,0,0,0.12)",
        }}
      >
        <Button
          sx={{
            minWidth: "40px",
          }}
        >
          <SearchIcon sx={{ fontSize: 24, color: "#54B0D7" }} />
        </Button>

        <InputBase
          sx={{ flex: 1, fontSize: "16px" }}
          placeholder="إبحث عن كورس أو مدرب.."
        />
      </Box>
      {/* Dropdown */}
      <Select
        value={category}
        onChange={handleChange}
        variant="outlined"
        sx={{
          borderRadius: "50px",
          height: 48,
          minWidth: 160,
          px: 2,
          "& fieldset": { border: "none" },
          bgcolor: "#fff",
          boxShadow: "0 0 5px rgba(0,0,0,0.15)",
        }}
      >
        <MenuItem value="Programming">السعر</MenuItem>
      </Select>
      <Select
        value={category}
        onChange={handleChange}
        variant="outlined"
        sx={{
          borderRadius: "50px",
          height: 48,
          minWidth: 160,
          px: 2,
          "& fieldset": { border: "none" },
          bgcolor: "#fff",
          boxShadow: "0 0 5px rgba(0,0,0,0.15)",
        }}
      >
        <MenuItem value="Programming">جنسية المحاضر</MenuItem>
        <MenuItem value="Design">اماراتي</MenuItem>
        <MenuItem value="Design">مصري</MenuItem>
        <MenuItem value="Marketing">سعودي</MenuItem>
      </Select>
    </Box>
    </Container>
    </Box>
  );
};

export default SearchBar;
