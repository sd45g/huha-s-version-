import React from 'react';
import { Box, Typography } from '@mui/material';

const PromotionalSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        backgroundColor: '#ede7f6',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#003366', // لون العنوان
          mb: 2,
        }}
      >
        صالة قصر المهرة
      </Typography>

      <Typography
        variant="body1"
        textAlign={'center'}
        sx={{
          fontSize: { xs: '1.1rem', md: '1.3rem' },
          maxWidth: '600px',
          color: '#555',
          mb: 4,
          lineHeight: 1.8,
        }}
      >
        اكتشفوا روعة الجمال والفخامة في صالة قصر المهرة حيث الأناقة تتجسد في كل زاوية، وحيث تصاميم
        استثنائية تناسب مختلف المناسبات والأذواق.
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: '1rem',
          color: '#777',
          maxWidth: '500px',
          lineHeight: 1.5,
        }}
      >
        انضموا إلينا لتجربة لا تُنسى تجمع بين الفخامة والتفاصيل الدقيقة، في قصر مميز بكل ما فيه.
      </Typography>
    </Box>
  );
};

export default PromotionalSection;
