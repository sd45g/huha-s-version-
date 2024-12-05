// import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // الحصول على السنة الحالية

  return (
    <Typography
      mt={3}
      px={2}
      py={2}
      color="text.secondary"
      variant="body2"
      sx={{
        // textAlign: 'center',
        fontSize: '0.9rem',
        lineHeight: 1.6,
      }}
    >
      <span> جميع الحقوق محفوظة {currentYear} ©</span>
      <br />
      صُمم بكل ❤️ بواسطة{' '}
      <Link
        href="https://romana.com/"
        target="_blank"
        rel="noreferrer"
        sx={{
          textDecoration: 'none',
          fontWeight: 'bold',
          color: 'primary.main',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        CORETECH
      </Link>
    </Typography>
  );
};

export default Footer;
