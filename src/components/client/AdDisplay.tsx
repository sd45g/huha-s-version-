import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Fade } from '@mui/material';
import adListData from 'data/adData';

const AdDisplay: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // تتبع الإعلان الحالي
  const displayDuration = 7000; // مدة عرض كل إعلان (بالملي ثانية)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adListData.length); // الانتقال إلى الإعلان التالي
    }, displayDuration);

    return () => clearInterval(intervalId); // تنظيف المؤقت عند إزالة المكون
  }, [displayDuration]);

  return (
    <Box sx={{ width: '100%', mt: -80, p: 80, display: 'flex', justifyContent: 'center' }}>
      {adListData.map((ad, index) => (
        <Fade
          in={index === currentAdIndex} // تفعيل التلاشي للإعلان الحالي فقط
          timeout={{ enter: 1000, exit: 1000 }} // مدة تأثير التلاشي
          unmountOnExit
          key={index}
        >
          <Card sx={{ width: 1200, boxShadow: 3, borderRadius: 2, position: 'absolute' }}>
            <CardMedia
              component="img"
              image={ad.image}
              alt={ad.description}
              sx={{ height: '440px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body1" color="text.primary">
                {ad.description}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );
};

export default AdDisplay;
