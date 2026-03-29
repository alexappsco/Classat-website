import { Box } from '@mui/material';

interface CategoryBadgeProps {
  category: string;
  size?: 'small' | 'medium' | 'large';
}

const CategoryBadge = ({
  category,
  size = "medium"
}: CategoryBadgeProps) => {

  const sizes = {
    small: {
      fontSize: "11px",
      padding: "4px 8px",
    },
    medium: {
      fontSize: "12px",
      padding: "6px 12px",
    },
    large: {
      fontSize: "14px",
      padding: "8px 16px",
    }
  };

  const currentSize = sizes[size];

  return (
    <Box
      sx={{
        background: "#FFF5D2",
        color: "#FF9800",
        fontSize: currentSize.fontSize,
        fontWeight: 700,
        padding: currentSize.padding,
        borderRadius: "30px",
        whiteSpace: "nowrap",
        textAlign: "center",
        display: "inline-block",
        lineHeight: 1.2,
        // إزالة القطع والتحديد الثابت للعرض
        width: "auto",
        minWidth: "fit-content",
        maxWidth: "none", // إزالة الحد الأقصى للعرض
        overflow: "visible", // إزالة الإخفاء
      }}
    >
      {category}
    </Box>
  );
};

export default CategoryBadge;
