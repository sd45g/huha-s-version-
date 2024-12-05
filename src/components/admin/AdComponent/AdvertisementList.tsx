import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconifyIcon from 'components/base/IconifyIcon';
import { api } from 'API/api'; // استدعاء ملف api
//import { parseJwt } from 'utils/tokenUtils';

interface AdData {
  _id: string; // معرف الإعلان (MongoDB ID)
  adImage: string;
  description: string;
  expiryDate: Date;
}

const AdvertisementList: React.FC = () => {
  const [ads, setAds] = useState<AdData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    message: '',
  });
  const [newAd, setNewAd] = useState<{
    image: string;
    description: string;
    expiryDate: Date | null; // تحديد النوع
  }>({
    image: '',
    description: '',
    expiryDate: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/advertisements');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAds();
  }, []);
  const handleMessageDialogOpen = (message: string) => {
    setMessageDialog({ open: true, message });
  };

  const handleMessageDialogClose = () => {
    setMessageDialog({ open: false, message: '' });
  };

  // إضافة إعلان جديد
  const handleAddAd = async () => {
    if (imageFile && newAd.description && newAd.expiryDate) {
      const formData = new FormData();
      formData.append('adImage', imageFile);
      formData.append('description', newAd.description);
      formData.append('expiryDate', newAd.expiryDate.toISOString());

      try {
        const response = await api.post('/advertisements/create', formData);
        setAds([...ads, response.data]); // تحديث الإعلانات
        setIsDialogOpen(false);
        setNewAd({ image: '', description: '', expiryDate: null });
        setImageFile(null);
        handleMessageDialogOpen('تمت إضافة الإعلان بنجاح!');
      } catch (error) {
        console.error('Error adding advertisement:', error);
        handleMessageDialogOpen('فشل في إضافة الإعلان.');
      }
    }
  };

  // حذف إعلان
  const handleDeleteAd = async (id: string) => {
    try {
      await api.delete(`/advertisements/${id}`);
      setAds(ads.filter((ad) => ad._id !== id)); // حذف الإعلان بناءً على _id
      handleMessageDialogOpen('تم حذف الإعلان بنجاح!');
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      handleMessageDialogOpen('فشل في حذف الإعلان.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={Paper} sx={{ p: 2, direction: 'rtl' }}>
        <Typography variant="h5" gutterBottom>
          قائمة الإعلانات
        </Typography>
        <Grid container spacing={2}>
          {ads.map((ad) => (
            <Grid item xs={12} sm={6} md={4} key={ad._id}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={ad.adImage}
                  alt="إعلان"
                  sx={{ width: '100%', height: 200, borderRadius: 1 }}
                />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {ad.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
                  ينتهي في:{' '}
                  {new Date(ad.expiryDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Typography>

                {/* 'ar-EG' */}
                <IconButton
                  onClick={() => handleDeleteAd(ad._id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8, // مخصص لـ RTL
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' },
                  }}
                >
                  <IconifyIcon icon="ic:baseline-delete" width={24} height={24} />
                </IconButton>
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Box
              onClick={() => setIsDialogOpen(true)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                border: '2px dashed',
                borderColor: 'primary.main',
                cursor: 'pointer',
                borderRadius: 1,
                minHeight: 200,
              }}
            >
              <IconifyIcon icon="material-symbols:campaign" fontSize="2rem" color="primary.main" />
              <Typography variant="h5" color="primary">
                إضافة إعلان جديد
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* مربع الحوار لإضافة الإعلان */}
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          dir="rtl"
          maxWidth="xs" // عرض مربع الحوار
          fullWidth // جعله يأخذ العرض بالكامل
        >
          <DialogTitle>إضافة إعلان جديد</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ textAlign: 'right' }}
              >
                تحميل صورة
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              {imageFile && (
                <Typography variant="body2" sx={{ color: 'green' }}>
                  تم اختيار الصورة: {imageFile.name}
                </Typography>
              )}
              <FormControl fullWidth sx={{ direction: 'rtl', textAlign: 'right' }}>
                <TextField
                  label="وصف الإعلان"
                  variant="filled" // نمط يشبه contained
                  fullWidth
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                  InputLabelProps={{
                    sx: { textAlign: 'right', direction: 'rtl', right: 0 },
                  }}
                  sx={{ marginBottom: 4 }}
                />
                <DatePicker
                  label="تاريخ انتهاء الإعلان"
                  value={newAd.expiryDate}
                  onChange={(date: Date | null) => setNewAd({ ...newAd, expiryDate: date })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: {
                        sx: {
                          textAlign: 'right', // محاذاة النص لليمين
                          direction: 'rtl', // تحديد اتجاه النص
                          right: 0, // ضمان المحاذاة القصوى لليمين
                          transformOrigin: 'top right', // ضبط مكان بداية النص
                        },
                      },
                    },
                  }}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAd}
              disabled={!imageFile || !newAd.description || !newAd.expiryDate}
            >
              إضافة
            </Button>
          </DialogActions>
        </Dialog>
        {/* نافذة الرسائل */}
        <Dialog open={messageDialog.open} onClose={handleMessageDialogClose}>
          <DialogContent>
            <Typography>{messageDialog.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMessageDialogClose} color="primary">
              إغلاق
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default AdvertisementList;
