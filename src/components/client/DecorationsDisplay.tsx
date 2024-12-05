import React from 'react';
import { Box, Typography, Card, CardMedia, Grid, Button } from '@mui/material';
import decorationData from 'data/decorationData';

const DecorationsDisplay: React.FC = () => {
  return (
    <Box sx={{ width: '100%', p: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        مجموعة الديكورات المميزة
      </Typography>
      <Card sx={{ position: 'relative', boxShadow: 6, borderRadius: 2, overflow: 'hidden', p: 2 }}>
        {/* زر "See All" في أعلى اليمين */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert('عرض جميع الديكورات')}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            backgroundColor: '#FF6D00',
            '&:hover': { backgroundColor: '#FF8C33' },
          }}
        >
          See All
        </Button>

        {/* شبكة الصور الأساسية */}
        <Grid container spacing={2}>
          {decorationData.map((decoration) => (
            <Grid item xs={6} sm={4} md={3} key={decoration.id}>
              <CardMedia
                component="img"
                image={decoration.image}
                alt={`صورة ${decoration.name}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px', // الحد الأقصى لارتفاع الصورة
                  objectFit: 'cover',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default DecorationsDisplay;
