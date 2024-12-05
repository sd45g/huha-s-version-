import { Box, Typography, Container, Paper, Card, CardContent, Divider } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { styled } from '@mui/system';
import cardImg3 from 'assets/images/cards/cardImg3.png';

// نمط للصورة المضببة
const BlurredImage = styled(Box)(() => ({
  backgroundImage: `url(${cardImg3})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '600px',
  width: '100vw',
  filter: 'blur(2px)',
  position: 'absolute',
  top: -200,
  left: -30,
  zIndex: -3,
}));

// نمط للأيقونات مع تأثير الإضاءة
const IconWrapper = styled(IconifyIcon)(({ theme }) => ({
  fontSize: '40px',
  color: theme.palette.primary.main,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.info.darker,
  },
}));

// نمط للبطاقة مع تأثير التكبير
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease',
  borderRadius: 16,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 10px 20px ${theme.palette.primary.light}`,
  },
  maxWidth: 650,
  margin: '20px auto',
}));

// نمط خاص لبطاقة "أهلاً بكم"
const WelcomeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: 32,
  height: 320,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  marginBottom: theme.spacing(10),
}));

// نمط خاص لبطاقة العنوان
const AddressCard = styled(Paper)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 10px 20px ${theme.palette.primary.light}`,
  },
  padding: theme.spacing(3),
  borderRadius: 24,
}));

const ClientContact = () => {
  return (
    <Box sx={{ position: 'relative', pt: 4 }}>
      {/* الصورة المضببة */}
      <BlurredImage />

      <Container maxWidth="md">
        {/* بطاقة الترحيب */}
        <WelcomeCard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3 }}
          >
            أهلاً بكم في قاعة المهرة
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            في قاعة المهرة، نلتزم بتقديم أفضل الخدمات لضيوفنا. نهتم بأدق التفاصيل لضمان رضا عملائنا،
            ونحرص دائمًا على الالتزام بالمواعيد وتقديم أفضل الخدمات.
          </Typography>
        </WelcomeCard>

        {/* مواعيد العمل */}
        <StyledCard>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center', // لضمان أن النصوص داخل الفقرة كلها في المنتصف
            }}
          >
            <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
              مواعيد العمل
            </Typography>
            <Divider sx={{ mb: 2, width: '80%' }} />
            <Typography variant="body1" color="text.secondary">
              <Box sx={{ mb: 1 }}>
                <strong>من السبت إلى الخميس:</strong> من الساعة 10 صباحاً إلى الساعة 8 مساءً
              </Box>
              <Box>
                <strong>الجمعة:</strong> من الساعة 4 مساءً إلى الساعة 7 مساءً
              </Box>
            </Typography>
          </Box>
          <CardContent sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
            {/* معلومات التواصل */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconWrapper icon="mdi:phone" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                أرقام التواصل
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3, // إضافة مسافة بين كل رقم
                flexWrap: 'wrap', // للسماح بتغليف النص إذا لم تتوفر مساحة كافية
                mt: 1,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                <strong>رجال:</strong> 0931255525
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>نساء 1:</strong> 0931217248
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>نساء 2:</strong> 0920849102
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>

        {/* بطاقة العنوان */}
        <AddressCard sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: 'primary.main', textAlign: 'center' }}
          >
            العنوان: دائري الرويسات قبل جزيرة قرارة بن نص كم يمين الطريق
          </Typography>
        </AddressCard>
      </Container>

      {/* خريطة الموقع */}
      <Box mt={5}>
        <Box
          component="iframe"
          width="100%"
          height="450px"
          style={{ border: 0 }}
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3369.7982210303244!2d15.109744075486955!3d32.37095807383594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a14d5d6670355f%3A0xd1c8b5269816e0ee!2z2YLYp9i52Kkg2YLYtdixINin2YTZhdmH2LHYqSDZhNmE2YXZhtin2LPYqNin2Ko!5e0!3m2!1sen!2sfr!4v1731437753593!5m2!1sen!2sfr"
          allowFullScreen
        ></Box>
      </Box>
    </Box>
  );
};

export default ClientContact;
