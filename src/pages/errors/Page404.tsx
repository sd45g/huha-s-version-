// Page404.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon'; // تأكد من وجود هذا المكون أو استبدله بأيقونات أخرى

const Page404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        p: 3,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Box
          sx={{
            fontSize: '120px',
            color: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IconifyIcon icon="mdi:alert-circle-outline" />
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '40px', md: '60px' }, fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary">
          الصفحة التي تبحث عنها غير موجودة.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`الرابط الذي طلبته: `}
          <Typography component="span" color="error">
            {location.pathname}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoHome}
          startIcon={<IconifyIcon icon="mdi:home" />}
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </Stack>
    </Box>
  );
};

export default Page404;
