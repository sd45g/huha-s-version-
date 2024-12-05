import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Switch,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  DialogActions,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { api } from 'API/api'; // تأكد من مسار API الخاص بك
import { useNavigate } from 'react-router-dom';
import AddDecorationCard from './AddDecorationCard'; // استيراد المكون

interface Decoration {
  _id: string;
  dec_name: string;
  description: string;
  status: string;
  pictures: string[]; // الصور تكون عبارة عن روابط
}

const DecorationList: React.FC = () => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [selectedDecoration, setSelectedDecoration] = useState<Decoration | null>(null);
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // لإدارة حالة مربع حوار التأكيد
  const [decorationToDelete, setDecorationToDelete] = useState<string | null>(null); // لتحديد الديكور الذي سيتم حذفه

  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // جلب الديكورات من الخلفية
  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const response = await api.get('/decorations/all');
        setDecorations(response.data);
      } catch (error) {
        console.error('Error fetching decorations:', error);
      }
    };
    fetchDecorations();
  }, []);

  const addDecoration = (newDecoration: Decoration) => {
    setDecorations((prevDecorations) => [newDecoration, ...prevDecorations]);
  };

  const toggleActivation = async (id: string, currentStatus: string) => {
    try {
      const response = await api.put(`/decorations/toggle-status/${id}`, {
        status: !currentStatus,
      });
      setDecorations((prev) =>
        prev.map((decoration) =>
          decoration._id === id
            ? { ...decoration, status: response.data.decoration.status }
            : decoration,
        ),
      );
    } catch (error) {
      console.error('Error toggling decoration status:', error);
      showDialog('فشل في تغيير حالة الديكور.');
    }
  };

  const handleReservationClick = (id: string, image: string) => {
    navigate(`/admin/reservation/${id}`, { state: { image } }); // تمرير id والصورة إلى صفحة الحجز
  };

  const showDialog = (message: string) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogMessage(null);
  };

  const handleAddImages = async (files: FileList | null) => {
    if (!files || !selectedDecoration) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('pictures', file));

    try {
      const response = await api.put(
        `/decorations/${selectedDecoration._id}/add-images`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      // تحديث selectedDecoration بالديكور المُعدل من الواجهة الخلفية
      const updatedDecoration = response.data.decoration;
      setSelectedDecoration(updatedDecoration);

      // تحديث قائمة الديكورات لتشمل الصور الجديدة
      setDecorations((prev) =>
        prev.map((decoration) =>
          decoration._id === selectedDecoration._id ? updatedDecoration : decoration,
        ),
      );

      showDialog('تمت إضافة الصور بنجاح!');
    } catch (error) {
      console.error('Error adding images:', error);
      showDialog('فشل في إضافة الصور.');
    }
  };

  const handleDeleteImage = async (index: number) => {
    if (!selectedDecoration) return;

    const imagePath = selectedDecoration.pictures[index];

    try {
      const response = await api.put(`/decorations/${selectedDecoration._id}/delete-image`, {
        imagePath,
      });

      setSelectedDecoration((prev) => ({
        ...prev!,
        pictures: prev!.pictures.filter((_, i) => i !== index),
      }));
      setDecorations((prev) =>
        prev.map((decoration) =>
          decoration._id === selectedDecoration._id ? response.data.decoration : decoration,
        ),
      );

      showDialog('تم حذف الصورة بنجاح!');
    } catch (error) {
      console.error('Error deleting image:', error);
      showDialog('فشل في حذف الصورة.');
    }
  };

  const handleUpdateDecoration = async () => {
    if (!selectedDecoration) return;

    const { _id, dec_name, description, pictures } = selectedDecoration;

    try {
      const formData = new FormData();
      formData.append('dec_name', dec_name);
      formData.append('description', description);

      pictures.forEach((file: File | string) => {
        if (file instanceof File) {
          formData.append('pictures', file);
        }
      });

      const response = await api.put(`/decorations/${_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setDecorations((prev) =>
        prev.map((decoration) => (decoration._id === _id ? response.data.decoration : decoration)),
      );

      showDialog('تم تحديث الديكور بنجاح!');
      setSelectedDecoration(null);
    } catch (error) {
      console.error('Error updating decoration:', error);
      showDialog('فشل في تحديث الديكور.');
    }
  };

  const handleDeleteDecoration = async (id: string) => {
    try {
      await api.delete(`/decorations/${id}`);
      setDecorations((prev) => prev.filter((decoration) => decoration._id !== id));
      showDialog('تم حذف الديكور بنجاح.');
    } catch (error) {
      console.error('Error deleting decoration:', error);
      showDialog('فشل في حذف الديكور.');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {/* إضافة المكون الخاص بإضافة ديكور */}
        <Grid item xs={12} sm={6} md={4}>
          <AddDecorationCard addDecoration={addDecoration} />
        </Grid>
        {/* عرض جميع الديكورات */}
        {decorations.map((decoration) => (
          <Grid item xs={12} sm={6} md={4} key={decoration._id}>
            <Card
              sx={{
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                p: 2,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={decoration.pictures[0]} // عرض الصورة الأولى
                alt={decoration.dec_name}
                sx={{
                  borderRadius: '8px',
                  cursor: 'pointer',
                  mb: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => setSelectedDecoration(decoration)}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 0, fontWeight: 'bold' }}>
                  {decoration.dec_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, mb: 2 }}>
                  {decoration.description || 'لا يوجد وصف متاح.'} {/* عرض الوصف */}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {/* زر احجز الآن */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReservationClick(decoration._id, decoration.pictures[0])}
                  >
                    احجز الآن
                  </Button>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setDecorationToDelete(decoration._id); // تعيين الديكور الذي سيتم حذفه
                        setConfirmDialogOpen(true); // فتح مربع الحوار
                      }}
                      sx={{
                        mr: 10,
                        backgroundColor: 'neutral.main',
                        '&:hover': {
                          backgroundColor: 'primary.lighter',
                        },
                      }}
                    >
                      <IconifyIcon icon="mdi:delete" />
                    </IconButton>

                    {/* زر تفعيل/تعطيل */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">
                        {decoration.status === 'مفعل' ? 'مفعل' : 'معطل'}
                      </Typography>
                      <Switch
                        checked={decoration.status === 'مفعل'}
                        onChange={() => toggleActivation(decoration._id, decoration.status)}
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)} // إغلاق مربع الحوار عند الضغط على إلغاء
      >
        <DialogContent>
          <Typography>هل تريد حذف الديكور؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button
            onClick={async () => {
              if (decorationToDelete) {
                await handleDeleteDecoration(decorationToDelete); // تنفيذ الحذف
                setDecorationToDelete(null); // إعادة تعيين الديكور
              }
              setConfirmDialogOpen(false); // إغلاق مربع الحوار
            }}
            color="error"
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>

      {/* مربع الحوار لعرض الصور التابعة */}
      {selectedDecoration && (
        <Dialog
          open={Boolean(selectedDecoration)}
          onClose={() => setSelectedDecoration(null)}
          disableEnforceFocus
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right', mb: 2 }}>
              اسم الديكور
            </Typography>
            <TextField
              fullWidth
              value={selectedDecoration.dec_name}
              onChange={(e) =>
                setSelectedDecoration((prev) => prev && { ...prev, dec_name: e.target.value })
              }
              sx={{ mb: 3 }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right', mb: 2 }}>
              وصف الديكور
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={selectedDecoration.description || ''}
              onChange={(e) =>
                setSelectedDecoration((prev) => prev && { ...prev, description: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <Grid container spacing={2}>
              {selectedDecoration.pictures.map((img, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <CardMedia
                    component="img"
                    image={img} // عرض الصورة باستخدام مسار كامل
                    alt={`Image ${index + 1}`}
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                  <IconButton onClick={() => handleDeleteImage(index)} color="error" sx={{ mt: 1 }}>
                    <IconifyIcon icon="mdi:delete" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>

            {/* تحميل الصور من الجهاز */}
            <Button variant="contained" component="label" sx={{ mt: 2, mr: 1 }}>
              تحميل صورة جديدة
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={(e) => handleAddImages(e.target.files)}
              />
            </Button>
            <Button
              onClick={handleUpdateDecoration}
              color="primary"
              variant="contained"
              sx={{ mt: 2 }}
            >
              تحديث
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default DecorationList;
