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
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 4, md: 6 }, direction: 'ltr' }}>
      <Container>
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
          <SearchIcon sx={{ fontSize: 24, color: "#FDBE34" }} />
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
        <MenuItem value="Programming">Programming</MenuItem>
        <MenuItem value="Design">Design</MenuItem>
        <MenuItem value="Marketing">Marketing</MenuItem>
      </Select>
    </Box>
    </Container>
    </Box>
  );
};

export default SearchBar;
