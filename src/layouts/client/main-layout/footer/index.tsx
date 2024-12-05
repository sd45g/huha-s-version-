import { Stack, Box, Typography, IconButton } from '@mui/material';
import HorizonLogo from 'assets/images/logo-white.png';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';

const Footer = () => {
  const theme = useTheme(); // استدعاء الثيم للوصول إلى الألوان
  const currentYear = new Date().getFullYear(); // الحصول على السنة الحالية
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.gradients.primary.state} 0%, ${theme.palette.gradients.primary.main} 100%)`,
        color: 'white',
        py: 4,
        px: 3,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'column' }}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* الشعار والنص */}
        <Stack direction="column" alignItems="center" mb={{ xs: 2, md: 0 }}>
          <Image src={HorizonLogo} alt="logo" height={150} width={200} />
          <Typography variant="body1" fontWeight={600} mt={1}>
            قاعة قصر المهرة
          </Typography>
        </Stack>

        {/* معلومات التواصل */}
        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography variant="body2">رقم الهاتف: 0931217248</Typography>
          <Stack direction="row" spacing={2} mt={1}>
            <IconButton
              color="inherit"
              href="https://www.facebook.com/people/%D9%82%D8%B5%D8%B1-%D8%A7%D9%84%D9%85%D9%87%D8%B1%D8%A9-%D9%84%D9%84%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA/100095320357362/?mibextid=LQQJ4d"
              target="_blank"
              size="large"
            >
              <IconifyIcon icon="mdi:facebook" />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.instagram.com/qasr_almohra_hall?igsh=N3NsemNjbW13d3Jo"
              target="_blank"
              size="large"
            >
              <IconifyIcon icon="mdi:instagram" />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://wa.me/1234567890"
              target="_blank"
              size="large"
            >
              <IconifyIcon icon="mdi:whatsapp" />
            </IconButton>
          </Stack>
          <Typography
            mt={3}
            px={2}
            py={2}
            color="info.darker"
            variant="body2"
            sx={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
            }}
          >
            <span> جميع الحقوق محفوظة © {currentYear}</span>
            <br />
            صُمم بكل ❤️ بواسطة{' '}
            <Link
              href="https://CORETECH.com/"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'info.light',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              CORETECH
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
