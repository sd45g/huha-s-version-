import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/admin/store'; // تعديل المسار حسب مشروعك
import paths from 'routes/paths';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  Button,
  Box,
  DialogActions,
} from '@mui/material';

interface DecorationCardProps {
  id: string;
  dec_name: string; // استخدام dec_name بدلاً من name
  pictures: string[];
  description: string; // الوصف
  onClick?: () => void;
}

const DecorationCard: React.FC<DecorationCardProps> = ({
  id,
  dec_name,
  pictures,
  description,
  onClick,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false); // حالة مربع الحوار الخاص بالخطأ
  const { user, role } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(user && role); // التحقق من تسجيل الدخول

  const handleImageClick = () => {
    if (onClick) onClick();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImage(null);
  };

  const handleImageDialogClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      setErrorDialogOpen(true); // فتح مربع الحوار الخاص بالخطأ
      return;
    }
    navigate(paths.clientReservations.replace(':decorationId', id));
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false); // إغلاق مربع الحوار الخاص بالخطأ
    navigate(paths.signin, {
      state: { from: paths.clientReservations.replace(':decorationId', id) },
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 'auto',
        // boxShadow: 3,
        mb: 3,
        borderRadius: 6,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 60,
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={pictures[0]} // عرض الصورة الأولى
        alt={dec_name} // اسم الديكور
        onClick={handleImageClick}
        sx={{
          cursor: 'pointer',
          boxShadow: 3,
        }}
      />
      <CardContent sx={{ paddingBottom: 0, mt: 2 }}>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          {dec_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description} {/* عرض الوصف */}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 2, pb: 2 }}>
        <Button
          onClick={handleBookingClick}
          variant="contained"
          type="submit"
          color="primary"
          sx={{
            fontSize: '0.9rem',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          احجز الآن
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent>
          <Grid container spacing={2}>
            {pictures.map((img, index) => (
              <Grid item xs={6} md={4} key={index}>
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Image ${index + 1}`}
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                  onClick={() => handleImageDialogClick(img)}
                />
              </Grid>
            ))}
          </Grid>
          <Button onClick={handleCloseDialog} fullWidth sx={{ mt: 2 }}>
            إغلاق
          </Button>
        </DialogContent>
      </Dialog>
      {/* مربع حوار عرض الخطأ */}
      <Dialog open={isErrorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogContent>
          <Typography variant="h5" color="text" gutterBottom>
            يرجى تسجيل الدخول أولاً لإتمام الحجز.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary" variant="contained">
            تسجيل الدخول
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <Box
          onClick={() => setSelectedImage(null)}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
        >
          <img
            src={selectedImage || ''}
            alt="Selected"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
        </Box>
      </Dialog>
    </Card>
  );
};

export default DecorationCard;
