import React, { useState } from 'react';
import {
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon'; // تأكد من مسار الاستيراد الصحيح
import { api } from 'API/api'; // استيراد ملف API الخاص بك

interface Decoration {
  _id: string;
  dec_name: string;
  description: string;
  status: string;
  pictures: string[];
}

const AddDecorationCard: React.FC<{ addDecoration: (decoration: Decoration) => void }> = ({
  addDecoration,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMessageDialogOpen, setMessageDialogOpen] = useState(false); // لإدارة نافذة الرسائل
  const [dialogMessage, setDialogMessage] = useState(''); // نص الرسالة
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // حقل الوصف
  const [images, setImages] = useState<File[]>([]); // مصفوفة لتخزين الصور
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenMessageDialog = (message: string) => {
    setDialogMessage(message);
    setMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setMessageDialogOpen(false);
  };
  const handleAddDecoration = async () => {
    if (!name || images.length === 0) {
      handleOpenMessageDialog('يرجى ملء الحقول المطلوبة وتحميل الصور.');
      return;
    }

    const formData = new FormData();
    formData.append('dec_name', name);
    formData.append('description', description);

    // إضافة الصور
    images.forEach((image) => {
      formData.append('pictures', image);
    });

    try {
      setLoading(true);
      const response = await api.post('/decorations/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newDecoration = response.data;
      addDecoration(newDecoration); // تحديث قائمة الديكورات
      handleOpenMessageDialog('تمت إضافة الديكور بنجاح!');

      // إعادة تعيين الحقول بعد الإضافة
      setName('');
      setDescription('');
      setImages([]);
      handleCloseDialog();
    } catch (error) {
      console.error('حدث خطأ أثناء إضافة الديكور:', error);
      handleOpenMessageDialog('فشل في إضافة الديكور.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files); // تحويل FileList إلى Array
      setImages((prevImages) => [...prevImages, ...filesArray]); // إضافة الصور الجديدة إلى القائمة
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        height: 380,
        margin: 'auto',
        boxShadow: 1,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        textAlign: 'center',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <IconButton sx={{ color: 'primary.main' }} onClick={handleOpenDialog}>
        <IconifyIcon icon="ic:baseline-add-photo-alternate" fontSize="larger" />
      </IconButton>
      <Typography
        variant="h5"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ cursor: 'pointer', marginTop: 1 }}
      >
        إضافة ديكور جديد
      </Typography>

      {/* مربع الحوار لإضافة ديكور */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            width: '600px', // التحكم في عرض مربع الحوار
            maxWidth: '90%', // ضمان التناسب مع عرض الشاشة
          },
        }}
      >
        <DialogTitle>إضافة ديكور جديد</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'right' }}>
              اسم الديكور
            </Typography>
            <TextField
              fullWidth
              placeholder="أدخل اسم الديكور"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'right' }}>
              وصف الديكور
            </Typography>
            <TextField
              fullWidth
              placeholder="أدخل وصف الديكور"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 1 }}
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              component="label"
              sx={{ display: 'block', marginBottom: 2 }}
            >
              تحميل الصور
              <input type="file" accept="image/*" hidden multiple onChange={handleImageChange} />
            </Button>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', textAlign: 'center' }}>
                  <Avatar
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: 'auto',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: 'error.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'error.dark',
                      },
                    }}
                  >
                    <IconifyIcon icon="mdi:delete" fontSize="1rem" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button onClick={handleCloseDialog} color="secondary">
            إغلاق
          </Button>
          <Button onClick={handleAddDecoration} color="primary" variant="contained">
            {loading ? 'جاري الإضافة...' : 'إضافة'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* نافذة الرسائل */}
      <Dialog open={isMessageDialogOpen} onClose={handleCloseMessageDialog}>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AddDecorationCard;
