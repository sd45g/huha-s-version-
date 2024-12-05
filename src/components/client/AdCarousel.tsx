import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { api } from 'API/api'; // استخدام API

// تعريف نوع البيانات القادمة من الـ backend
interface AdData {
  _id: string; // معرف الإعلان
  adImage: string; // مسار الصورة
  description: string; // وصف الإعلان
}

const AdCarousel: React.FC = () => {
  const [ads, setAds] = useState<AdData[]>([]); // حالة للإعلانات
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 للتحرك من اليمين إلى اليسار، 1 للتحرك من اليسار إلى اليمين
  const carouselWidth = 400 + 16; // عرض كل بطاقة مع مسافة بينية
  const containerRef = useRef<HTMLDivElement>(null);

  // // جلب البيانات من الـ backend
  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const response = await api.get('/advertisements/public'); // استدعاء الـ API
  //       setAds(response.data); // تخزين البيانات في الحالة
  //     } catch (error) {
  //       console.error('Error fetching advertisements:', error);
  //     }
  //   };

  //   fetchAds();
  // }, []);

  // تحريك الكاروسيل تلقائيًا
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setScrollPosition((prevPosition) => prevPosition + direction * carouselWidth);
  //   }, 7000); // الانتظار 5 ثوانٍ بين كل حركة

  //   return () => clearInterval(intervalId);
  // }, [carouselWidth, direction]);

  // // تغيير اتجاه الحركة عند الوصول إلى النهاية أو البداية
  // useEffect(() => {
  //   if (containerRef.current) {
  //     const totalWidth = carouselWidth * ads.length;

  //     // موضع الصورة الثالثة من النهاية
  //     const thirdLastPosition = -(totalWidth - 3.7 * carouselWidth);

  //     // تغيير الاتجاه عندما يصل إلى الصورة الثالثة من النهاية عند التحرك إلى اليسار
  //     if (scrollPosition <= thirdLastPosition && direction === -1) {
  //       setDirection(1); // تغيير الاتجاه للتحرك من اليسار إلى اليمين
  //     }
  //     // العودة إلى التحرك من اليمين إلى اليسار عندما يصل إلى البداية
  //     else if (scrollPosition >= 0 && direction === 1) {
  //       setDirection(-1); // تغيير الاتجاه للتحرك من اليمين إلى اليسار
  //     }
  //   }
  // }, [scrollPosition, carouselWidth, direction, ads]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        position: 'relative',
        mt: 1,
        p: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(${scrollPosition}px)`,
          transition: 'transform 7s linear', // حركة انسيابية
        }}
      >
        {ads.map((ad) => (
          <Card
            key={ad._id}
            sx={{
              width: '400px',
              height: '300px',
              display: 'inline-block',
              mx: 2,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={ad.adImage}
              alt={ad.description}
              sx={{
                height: '240px',
                objectFit: 'cover',
                borderRadius: '8px 8px 0 0',
              }}
            />
            <CardContent
              sx={{
                textAlign: 'center',
                p: 1,
              }}
            >
              <Typography variant="body1" color="text.primary">
                {ad.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdCarousel;
