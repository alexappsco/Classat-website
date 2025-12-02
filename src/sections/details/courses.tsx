import { Box, Container, Grid, MenuItem, Select, Typography } from "@mui/material";
import CourseActions from "../course-details/views/course-btn-actions";
import CourseCurriculum from "../course-details/views/course-curriculum";
import { warning } from 'src/theme/palette';


export default function EducationalLessons() {
  return (
    <Box>
    <Box sx={{  }}>
      <Container>
        {/* Filters Row */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          alignItems={{ xs: 'stretch', md: 'start' }}
          gap={2}
          justifyContent="start"
          dir="rtl"
          sx={{ width: '100%', my: 1 }}
        >
          {/* Dropdowns */}
          {['الصف الثالث', 'المرحلة الايتدائية'].map((item, idx) => (
            <Select
              key={idx}
              defaultValue={item}
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: { xs: 40, md: 48 },
                minWidth: { xs: 120, md: 140 + idx * 10 },
                px: 1,
                '& fieldset': { border: 'none' },
                bgcolor: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.15)',
                fontSize: { xs: 14, md: 16 },
              }}
            >
              <MenuItem value={item}>{item}</MenuItem>
            </Select>
          ))}

          {/* Search Input */}
     
        </Box>

        {/* Categories Row */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            justifyContent: 'center',
            gap: 1,
            px: 0,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '3px' },
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent',
            mt: 5,
          }}
        >
        </Box>
      </Container>
    </Box>
    <Box display={{xs:'block',md:'flex' }}  justifyContent="space-between">

      <CourseCurriculum />
    <Box sx={{ mt: 2,p:2, justifyContent:'end', border: '1px solid', borderColor: 'divider', borderRadius: "25px",mx:2,height:'100%'}} >
    <Typography textAlign="start" variant="h4" color="warning" sx={{ py: 2 }}>
    220.40 درهم
    </Typography>

      <CourseActions />
    </Box>
    </Box>
    </Box>
  );
}
