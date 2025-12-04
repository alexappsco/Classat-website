'use client';

import { Container, Box, Stack, Typography, List, ListItem } from '@mui/material';

export default function TermsSection() {
  return (
    <Container sx={{ py: { xs: 6, md: 6 }, mt: 10 }}>
      <Box
        sx={{
          maxWidth: 960,
          mx: 'auto',
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.08)',
          p: { xs: 3, md: 5 },

        }}
      >
        <Typography
          variant="h3"
          fontWeight={800}
          textAlign="center"
          mb={{ xs: 2, md: 3 }}
        >
          الشروط والأحكام
        </Typography>

        <Stack spacing={3} color="text.secondary" fontSize={{ xs: 14, md: 15 }}>
          <Box>
            <Typography fontWeight={700} mb={1} color="text.primary">
              مرحباً بك في تطبيق كلاسات
            </Typography>
            <Typography>
              باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها
              بعناية قبل استخدام التطبيق أو التسجيل فيه.
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              التعريفات
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>التطبيق: يقصد به تطبيق &quot;كلاسات&quot; وجميع الخدمات المرتبطة به.</ListItem>
              <ListItem>المستخدم: أي شخص يقوم باستخدام التطبيق أو التسجيل فيه.</ListItem>
              <ListItem>المحتوى: يشمل جميع البيانات والمعلومات والمواد التي يتم عرضها أو مشاركتها من خلال التطبيق.</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              استخدام التطبيق
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>يجب ألا يقل عمر المستخدم عن 13 عامًا أو أن يتم استخدام التطبيق بإشراف ولي أمر.</ListItem>
              <ListItem>يتعهد المستخدم باستخدام التطبيق لأغراض قانونية ومشروعة فقط.</ListItem>
              <ListItem>يمنع استخدام التطبيق في أي نشاط ينتهك القوانين أو الحقوق الخاصة بالآخرين أو يعرضهم لأي ضرر.</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              الحسابات والأمان
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات تسجيل الدخول الخاصة به.</ListItem>
              <ListItem>يجب إبلاغ فريق &quot;كلاسات&quot; فوراً في حال الاشتباه بأي استخدام غير مصرح به للحساب.</ListItem>
              <ListItem>يحق للتطبيق إيقاف أو إلغاء أي حساب يخالف الشروط والأحكام.</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              المحتوى والتحديثات
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>قد يقوم تطبيق &quot;كلاسات&quot; بتحديث أو تعديل المحتوى والخدمات بشكل دوري لتحسين جودة التجربة.</ListItem>
              <ListItem>قد يتم إضافة أو إزالة بعض المزايا دون إشعار مسبق.</ListItem>
              <ListItem>المحتوى التعليمي المقدم عبر التطبيق مخصص لأغراض تعليمية فقط ولا يعد بديلاً عن الاستشارات المتخصصة.</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              حقوق الملكية الفكرية
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>جميع الحقوق المتعلقة بالتصميم، والمحتوى، والشعارات، والبرمجيات، مملوكة لتطبيق &quot;كلاسات&quot; أو لمرخصيها.</ListItem>
              <ListItem>يمنع إعادة نشر أو نسخ أو توزيع أي جزء من محتوى التطبيق دون إذن خطي مسبق.</ListItem>
            </List>
          </Box>

          <Box>
            <Typography fontWeight={700} mb={0.5} color="text.primary">
              المسؤولية وحدود الضمان
            </Typography>
            <List sx={{ listStyleType: 'disc', pr: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
              <ListItem>يبذل فريق &quot;كلاسات&quot; جهده لضمان عمل التطبيق بشكل سليم، لكنه لا يضمن خلوه من الأخطاء بشكل كامل.</ListItem>
              <ListItem>لا يتحمل التطبيق أي مسؤولية عن الأضرار الناتجة عن سوء استخدام المستخدم للتطبيق أو اعتماده الكامل على المحتوى.</ListItem>
            </List>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}


