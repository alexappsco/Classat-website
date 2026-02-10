// 'use client';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import Image from 'src/components/image';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import {
//   Box,
//   Grid,
//   Card,
//   Button,
//   Avatar,
//   Divider,
//   Container,
//   Typography,
//   IconButton,
//   CardContent,
// } from '@mui/material';

// interface Props{
//   items:any
// }

// export default function ShoppingCart({items}:Props) {
//   console.log("iteeeeeom",items)
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       title: 'أساسيات تصميم المواقع والتطبيقات',
//       instructor: 'د.خالد محمد',
//       price: 32.0,
//       originalPrice: 65.0,
//       image: '/assets/courses/study.png',
//     },
//     {
//       id: 2,
//       title: 'أساسيات تصميم المواقع والتطبيقات',
//       instructor: 'د.خالد محمد',
//       price: 32.0,
//       originalPrice: 65.0,
//       image: '/assets/courses/study.png',
//     },
//     {
//       id: 3,
//       title: 'أساسيات تصميم المواقع والتطبيقات',
//       instructor: 'د.خالد محمد',
//       price: 32.0,
//       originalPrice: 65.0,
//       image: '/assets/courses/study.png',
//     },
//   ]);

//   const handleDelete = (id: number) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
//   };

//   return (
//     <Container
//       sx={{
//         py: { xs: 4, md: 18 },
//         px: { xs: 2, sm: 3 },
//         // direction: 'rtl',
//       }}
//     >
//       <Box dir="rtl">
//         <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
//           <Grid item xs={12} md={8}>
//             <Box sx={{ mb: { xs: 2, md: 3 }, maxWidth: 710, pb: 1 }}>
//               <Typography
//                 variant="h4"
//                 fontWeight={700}
//                 sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
//               >
//                 السلة
//               </Typography>

//               <Typography color="gray" sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, mt: 0.5 }}>
//                 لديك {cartItems.length} دورات في السلة
//               </Typography>

//               <Divider sx={{ mt: { xs: 1.5, md: 2 }, borderColor: '#ddd' }} />
//             </Box>

//             {cartItems.map((item) => (
//               <Card
//                 key={item.id}
//                 sx={{
//                   mb: { xs: 2, md: 3 },
//                   maxWidth: 710,
//                   border: '1px solid #87878738',
//                   boxShadow: { xs: 2, md: 4 },
//                   transition: '0.2s',
//                   '&:hover': { boxShadow: 6 },
//                 }}
//               >
//                 <CardContent sx={{ p: { xs: 2, md: 3 } }}>
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       gap: { xs: 1.5, md: 2 },
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       src={item.image}
//                       alt={item.title}
//                       sx={{
//                         width: { xs: '100%', sm: 140, md: 160 },
//                         height: { xs: 180, sm: 110, md: 130 },
//                         borderRadius: 2,
//                         objectFit: 'cover',
//                       }}
//                     />

//                     <Box
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         flex: 1,
//                         gap: { xs: 1, md: 1.5 },
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         fontWeight={600}
//                         sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
//                       >
//                         {item.title}
//                       </Typography>

//                       <Box
//                         sx={{
//                           display: 'flex',
//                           flexDirection: { xs: 'column', sm: 'row' },
//                           alignItems: { xs: 'flex-start', sm: 'center' },
//                           justifyContent: 'space-between',
//                           gap: { xs: 1.5, sm: 1 },
//                           mt: { xs: 0.5, md: 1 },
//                         }}
//                       >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'gray' }}>
//                           <Avatar
//                             sx={{
//                               bgcolor: '#54B0D7',
//                               color: '#fff',
//                               fontWeight: 600,
//                               width: { xs: 32, md: 40 },
//                               height: { xs: 32, md: 40 },
//                             }}
//                           >
//                             <Image src="/assets/landing-page/live-sessions/instructors/instructor.png" />
//                           </Avatar>
//                           <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
//                             {item.instructor}
//                           </Typography>
//                         </Box>

//                         <Box
//                           sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             width: { xs: '100%', sm: 'auto' },
//                             gap: { xs: 2, sm: 1 },
//                           }}
//                         >
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Typography
//                               sx={{
//                                 textDecoration: 'line-through',
//                                 color: 'gray',
//                                 fontSize: { xs: '0.875rem', md: '1rem' },
//                               }}
//                             >
//                               ${item.originalPrice.toFixed(2)}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 color: '#54B0D7',
//                                 fontWeight: 700,
//                                 fontSize: { xs: '1.125rem', md: '1.25rem' },
//                               }}
//                             >
//                               ${item.price.toFixed(2)}
//                             </Typography>
//                           </Box>

//                           <IconButton
//                             color="error"
//                             onClick={() => handleDelete(item.id)}
//                             sx={{ p: { xs: 0.5, md: 1 } }}
//                           >
//                             <DeleteOutlineIcon />
//                           </IconButton>
//                         </Box>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 boxShadow: { xs: 2, md: 2 },
//                 position: { xs: 'relative', md: 'sticky' },
//                 top: { md: 20 },
//               }}
//             >
//               <CardContent sx={{ p: { xs: 2, md: 3 } }}>
//                 <Typography
//                   variant="h6"
//                   fontWeight={700}
//                   sx={{
//                     mb: { xs: 2, md: 3 },
//                     fontSize: { xs: '1.125rem', md: '1.25rem' },
//                   }}
//                 >
//                   تفاصيل الدفع
//                 </Typography>

//                 {[1, 2, 3, 4].map((i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       mb: { xs: 1.5, md: 2 },
//                       fontSize: { xs: 13, md: 14 },
//                     }}
//                   >
//                     <Typography color="gray">تثبيت رسوم الضيف</Typography>
//                     <Typography fontWeight={500}>150 درهم</Typography>
//                   </Box>
//                 ))}

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     mb: { xs: 1.5, md: 2 },
//                     fontSize: { xs: 13, md: 14 },
//                   }}
//                 >
//                   <Typography color="gray">ضريبة القيمة المضافة</Typography>
//                   <Typography fontWeight={500}>94 درهم</Typography>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     mb: { xs: 1.5, md: 2 },
//                     fontSize: { xs: 13, md: 14 },
//                   }}
//                 >
//                   <Typography color="gray">خصم</Typography>
//                   <Typography sx={{ color: 'green', fontWeight: 500 }}>0 درهم</Typography>
//                 </Box>

//                 <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     mb: 1,
//                     fontSize: { xs: 13, md: 14 },
//                   }}
//                 >
//                   <Typography color="gray">الإجمالي</Typography>
//                   <Typography fontWeight={600}>495 درهم</Typography>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     mb: { xs: 2, md: 2 },
//                   }}
//                 >
//                   <Typography fontWeight={700} sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
//                     الإجمالي بعد الخصم
//                   </Typography>
//                   <Typography fontWeight={800} sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
//                     ${calculateTotal()}
//                   </Typography>
//                 </Box>

//                 <Link href="/ar/cart/payment/">
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       backgroundColor: '#00bcd4',
//                       mt: 2,
//                       py: { xs: 1.25, md: 1.5 },
//                       fontSize: { xs: '0.875rem', md: '1rem' },
//                       '&:hover': { backgroundColor: '#0097a7' },
//                     }}
//                   >
//                     إتمام الدفع
//                   </Button>
//                 </Link>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   sx={{
//                     mt: 2,
//                     py: { xs: 1.25, md: 1.5 },
//                     fontSize: { xs: '0.875rem', md: '1rem' },
//                     borderColor: '#ddd',
//                     color: '#00bcd4',
//                     '&:hover': { borderColor: '#00bcd4' },
//                   }}
//                 >
//                   متابعة التسوق
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Divider,
  Container,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

// Defining the interface based on your JSON structure
interface CartItem {
  cartItemId: string;
  itemType: string;
  title: string;
  imageUrl: string | null;
  price: number;
  rating: number | null;
  sessions: any[];
}

interface PaymentSummary {
  subTotal: number;
  vat: number;
  discount: number;
  total: number;
  totalAfterDiscount: number;
}

interface Props {
  items: {
    cartId: string;
    items: CartItem[];
    paymentSummary: PaymentSummary;
  };
}

export default function ShoppingCart({ items: initialData }: Props) {
  // Use local state to handle deletions instantly in the UI
  const [cartData, setCartData] = useState(initialData);

  const handleDelete = (id: string) => {
    const updatedItems = cartData.items.filter((item) => item.cartItemId !== id);

    // Note: In a real app, you'd call an API here and then update the total
    // For now, we update the local list
    setCartData({
      ...cartData,
      items: updatedItems,
    });
  };

  // Extract variables for cleaner code
  const itemsList = cartData.items || [];
  const summary = cartData.paymentSummary;

  return (
    <Container sx={{ py: { xs: 4, md: 18 }, px: { xs: 2, sm: 3 } }}>
      <Box dir="rtl">
        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Items List */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: { xs: 2, md: 3 }, maxWidth: 710, pb: 1 }}>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                السلة
              </Typography>
              <Typography color="gray" sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, mt: 0.5 }}>
                لديك {itemsList.length} عناصر في السلة
              </Typography>
              <Divider sx={{ mt: { xs: 1.5, md: 2 }, borderColor: '#ddd' }} />
            </Box>

            {itemsList.map((item) => (
              <Card
                key={item.cartItemId}
                sx={{
                  mb: { xs: 2, md: 3 },
                  maxWidth: 710,
                  border: '1px solid #87878738',
                  boxShadow: { xs: 2, md: 4 },
                  '&:hover': { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box
                      component="img"
                      src={item.imageUrl || '/assets/courses/study.png'} // Fallback if null
                      alt={item.title}
                      sx={{
                        width: { xs: '100%', sm: 140, md: 160 },
                        height: { xs: 180, sm: 110, md: 130 },
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {item.title}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.875rem' }}>
                          النوع: {item.itemType}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography sx={{ color: '#54B0D7', fontWeight: 700, fontSize: '1.25rem' }}>
                            {item.price} درهم
                          </Typography>
                          <IconButton color="error" onClick={() => handleDelete(item.cartItemId)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Payment Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: { md: 'sticky' }, top: { md: 20 } }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  تفاصيل الدفع
                </Typography>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">المجموع الفرعي</Typography>
                  <Typography fontWeight={500}>{summary.subTotal} درهم</Typography>
                </Box>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">ضريبة القيمة المضافة</Typography>
                  <Typography fontWeight={500}>{summary.vat} درهم</Typography>
                </Box>

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">خصم</Typography>
                  <Typography sx={{ color: 'green', fontWeight: 500 }}>{summary.discount} درهم</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={summaryRowStyle}>
                  <Typography color="gray">الإجمالي</Typography>
                  <Typography fontWeight={600}>{summary.total} درهم</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontWeight={700}>الإجمالي بعد الخصم</Typography>
                  <Typography fontWeight={800} sx={{ fontSize: '1.5rem', color: '#00bcd4' }}>
                    {summary.totalAfterDiscount} درهم
                  </Typography>
                </Box>

                <Link href="/ar/cart/payment/" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="contained" sx={mainButtonStyle}>
                    إتمام الدفع
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// Reusable styles to keep code clean
const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: 2,
  fontSize: 14,
};

const mainButtonStyle = {
  backgroundColor: '#00bcd4',
  mt: 2,
  py: 1.5,
  '&:hover': { backgroundColor: '#0097a7' },
};