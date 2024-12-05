import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, CardMedia, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import paths from 'routes/paths'; // استيراد المسارات
import { api } from 'API/api';

const AllImagesMasonryDisplay: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // حالة لتخزين الصور فقط
  const navigate = useNavigate(); // لإنشاء النيفيجيت

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get('/decorations/active'); // استدعاء الواجهة الخلفية
        const fetchedImages = response.data.map(
          (decoration: { pictures: string[] }) => decoration.pictures[0], // استخدام الصورة الأولى فقط
        );
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          مجموعة الديكورات المميزة
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate(paths.clientDecorations)} // توجيه إلى صفحة الديكورات
        >
          رؤية المزيد
        </Button>
      </Box>

      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} spacing={3}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 4,
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={`صورة ${index + 1}`}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                transition: 'transform 0.4s ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
              }}
            />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};

export default AllImagesMasonryDisplay;
