import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import { api } from 'API/api';
import { format } from 'date-fns';

interface Decoration {
  id: string;
  dec_name: string;
  description: string;
  status: string;
  pictures: string[]; // تعديل لجعل الصور في مصفوفة واحدة
}

const RedPickersDay = styled(PickersDay)(({ theme }) => ({
  backgroundColor: theme.palette.info.darker,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const ClientReservations = () => {
  const { decorationId } = useParams<{ decorationId: string }>();
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  // تعريف currentImageIndex مع setCurrentImageIndex
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    decoration_id: decorationId || '',
    classification: '',
    numberOfChairs: 0,
    bookingDate: new Date(),
    amountPaid: 0,
    total_amount: 0,
    remainingAmount: 0,
    notes: '',
    paymentMethod: 'localbankcards',
  });

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await api.get('/reservations/reserved-dates');
        setBookedDates(response.data);
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    };
    fetchBookedDates();
  }, []);

  useEffect(() => {
    console.log('Decoration ID:', decorationId); // تحقق من أن decorationId ليس فارغًا
    if (!decoration && decorationId) {
      const fetchDecoration = async () => {
        if (!decorationId) return;
        try {
          const response = await api.get(`/decorations/${decorationId}`);
          console.log('Decoration Data:', response.data); // تحقق من البيانات المستلمة
          setDecoration(response.data);
        } catch (error) {
          console.error('Error fetching decoration:', error);
        }
      };

      fetchDecoration();
    }
  }, [decorationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev };

      if (name === 'paymentMethod') {
        updatedForm.paymentMethod = value === 'إلكترونيًا' ? 'localbankcards' : 'نقدا';
      } else if (
        name === 'classification' ||
        name === 'customerName' ||
        name === 'customerPhone' ||
        name === 'notes'
      ) {
        updatedForm[name] = value;
      } else if (name === 'numberOfChairs' || name === 'amountPaid') {
        updatedForm[name] = parseInt(value, 10) || 0;
      }

      if (name === 'classification' || name === 'numberOfChairs') {
        const chairs = parseInt(updatedForm.numberOfChairs as unknown as string, 10) || 0;
        const eventType = updatedForm.classification;

        let price = 0;
        if (eventType === 'زفة' || eventType === 'صبحية' || eventType === 'حفلة') {
          price = 4000;
        } else if (
          eventType === 'عيد ميلاد' ||
          eventType === 'لمات مواليد' ||
          eventType === 'حفل تخرج'
        ) {
          if (chairs === 100) {
            price = 2000;
          } else if (chairs > 100 && chairs <= 150) {
            price = 2500;
          } else if (chairs > 150 && chairs <= 200) {
            price = 2700;
          } else if (chairs > 200 && chairs <= 300) {
            price = 3000;
          } else {
            price = (chairs * 2000) / 100;
          }
        }
        updatedForm.total_amount = price;
      }

      updatedForm.remainingAmount = updatedForm.total_amount - updatedForm.amountPaid;
      return updatedForm;
    });
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async () => {
    const totalPrice = formData.total_amount;
    const amountPaid = formData.amountPaid;
    const minimumAmount = totalPrice / 10; // الحد الأدنى للعربون

    if (formData.numberOfChairs > 300) {
      setErrorMessage('عدد الكراسي يجب ألا يزيد عن 300.');
      return;
    }

    // التحقق من المبلغ المدفوع
    if (amountPaid < minimumAmount) {
      setErrorMessage(`المبلغ المدفوع يجب ألا يقل عن ${minimumAmount} د.`);
      return;
    }
    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
      const dataToSend = {
        ...formData,
        bookingDate: formattedDate,
      };
      console.log('Data being sent:', dataToSend); // تحقق من البيانات هنا

      const response = await api.post('/reservations/create-reservation', dataToSend);

      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url; // التوجيه إلى بوابة الدفع
      } else {
        setSuccessMessage('تم تقديم الحجز بنجاح!');
        navigate('/reservations');
      }
    } catch (error) {
      console.error('Error during reservation:', error.response || error.message);
      setErrorMessage(' plutu فشل في تقديم الحجز اقصى عدد محاولات لمنصة');
    }
  };
  const handleNextImage = () => {
    if (decoration && decoration.pictures.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % decoration.pictures.length);
    }
  };

  const handlePrevImage = () => {
    if (decoration && decoration.pictures.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? decoration.pictures.length - 1 : prev - 1));
    }
  };

  const renderDay = (pickersDayProps: PickersDayProps<Date>) => {
    const formattedDate = format(pickersDayProps.day, 'yyyy-MM-dd');
    const isReserved = bookedDates.includes(formattedDate);

    if (isReserved) {
      return (
        <RedPickersDay
          {...pickersDayProps}
          disabled // تعطيل اليوم المحجوز
          sx={{
            backgroundColor: 'rgba(128, 128, 128, 0.3)', // خلفية رمادية للأيام المحجوزة
            '&:hover': {
              backgroundColor: 'rgba(128, 128, 128, 0.5)', // تغيير اللون عند التمرير
            },
          }}
        />
      );
    }

    // إذا لم يكن اليوم محجوزًا، اعرض PickersDay العادي
    return <PickersDay {...pickersDayProps} />;
  };
  if (!decoration) return <Typography>جاري التحميل...</Typography>;

  const images = decoration?.pictures || [];

  return (
    <Container dir="rtl">
      <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: -5 }}>
        إكمال عملية الحجز - {decoration.dec_name}
      </Typography>
      {/* نافذة عرض رسائل الخطأ */}
      <Dialog open={!!errorMessage} onClose={() => setErrorMessage(null)}>
        <DialogContent>
          <Typography variant="body1" color="text">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorMessage(null)} color="error">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>

      {/* نافذة تأكيد الحجز */}
      <Dialog open={!!successMessage} onClose={() => setSuccessMessage(null)}>
        <DialogContent>
          <Typography variant="body1" color="primary">
            {successMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessMessage(null)} color="primary">
            موافق
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '40px' }}>
        <IconifyIcon
          icon="mdi:chevron-left"
          onClick={handlePrevImage}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '30px',
            zIndex: 1,
          }}
        />
        <img
          src={images[currentImageIndex]} // الحصول على الصورة الحالية بناءً على index
          alt={`Decoration image ${currentImageIndex + 1}`}
          style={{
            width: '100%',
            maxWidth: '700px',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <IconifyIcon
          icon="mdi:chevron-right"
          onClick={handleNextImage}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '30px',
            zIndex: 1,
          }}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="اسم المستلم"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="رقم الهاتف"
              name="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={handleChange}
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                }}
              >
                نوع الحفل
                <Tooltip title="سعر الزفة والصبحية والحفلة ثابت 4000 د. وسعر باقي المناسبات حسب عدد الكراسي">
                  <IconButton>
                    <IconifyIcon icon="mdi:information-outline" fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputLabel>
              <Select name="classification" value={formData.classification} onChange={handleChange}>
                <MenuItem value="زفة">زفة</MenuItem>
                <MenuItem value="صبحية">صبحية</MenuItem>
                <MenuItem value="حفلة">حفلة</MenuItem>
                <MenuItem value="عيد ميلاد">عيد ميلاد</MenuItem>
                <MenuItem value="لمات مواليد">لمات مواليد</MenuItem>
                <MenuItem value="حفل تخرج">حفل تخرج</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="عدد الكراسي"
              name="numberOfChairs"
              type="number"
              value={formData.numberOfChairs}
              onChange={handleChange}
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="المبلغ المدفوع"
              name="amountPaid"
              type="number"
              value={formData.amountPaid}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip title="يجب دفع نصف المبلغ على الأقل كعربون.">
                    <IconButton>
                      <IconifyIcon icon="mdi:information-outline" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="تاريخ الحجز"
                value={selectedDate}
                onChange={handleDateChange}
                slots={{
                  day: renderDay,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    InputLabelProps: {
                      sx: {
                        right: 0,
                        left: 'auto',
                        textAlign: 'right',
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                }}
              >
                طريقة الدفع
              </InputLabel>
              <Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <MenuItem value="localbankcards">إلكترونيًا</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12} style={{ marginTop: 19 }}>
              <Typography variant="h6">السعر الإجمالي: {formData.total_amount} د</Typography>
              <Typography variant="h6">القيمة المتبقية: {formData.remainingAmount} د</Typography>
              <Typography variant="h5" color="error">
                القيمة المدفوعة لا ترد في حالة إلغاء الحجز
              </Typography>
            </Grid>
          </Grid>

          {/* نقل حقل الملاحظات الإضافية إلى أقصى اليسار تحت حقل تاريخ الحجز */}
          <Grid item xs={12} sm={6} style={{ alignSelf: 'flex-start', marginTop: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                ملاحظات إضافية
              </Typography>
              <Tooltip title="يمكنك إضافة أي إضافات أو خدمات أو أشكال ديكور معينة ترغب في إضافتها.">
                <IconButton size="small">
                  <IconifyIcon icon="mdi:information-outline" fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              fullWidth
              name="notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  textAlign: 'right',
                },
              }}
              placeholder="اكتب أي ملاحظات إضافية هنا (اختياري)"
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '200px',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                padding: '10px',
                marginTop: '20px',
              }}
            >
              حجز الآن
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ClientReservations;
