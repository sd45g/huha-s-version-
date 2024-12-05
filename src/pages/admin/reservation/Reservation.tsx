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
  FormControl,
  InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import { api } from 'API/api';
import { format } from 'date-fns';
import IconifyIcon from 'components/base/IconifyIcon';

interface Decoration {
  id: string;
  dec_name: string;
  description: string;
  status: string;
  pictures: string[];
}

const RedPickersDay = styled(PickersDay)(({ theme }) => ({
  backgroundColor: theme.palette.info.darker,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const AdminReservationPage: React.FC = () => {
  const { decorationId } = useParams<{ decorationId: string }>();
  const [decoration, setDecoration] = useState<Decoration | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
    paymentMethod: '',
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
    if (!decoration && decorationId) {
      const fetchDecoration = async () => {
        try {
          const response = await api.get(`/decorations/${decorationId}`);
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
      const updatedForm = {
        ...prev,
        [name]:
          name === 'numberOfChairs' || name === 'amountPaid' ? parseInt(value, 10) || 0 : value,
      };
      if (name === 'numberOfChairs') {
        const chairs = parseInt(value, 10) || 0;
        if (chairs > 300) {
          alert('عدد الكراسي يجب ألا يتجاوز 300 كرسي.');
          return prev; // إعادة النموذج السابق دون أي تغيير
        }
      }

      if (name === 'classification' || name === 'numberOfChairs') {
        const chairs = updatedForm.numberOfChairs || 0;
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

  const handleSubmit = async () => {
    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
      const dataToSend = {
        ...formData,
        bookingDate: formattedDate,
      };

      if (formData.paymentMethod === 'نقدًا') {
        // إذا كانت طريقة الدفع نقدًا
        const response = await api.post('/reservations/create-reservation', dataToSend);
        if (response.status === 201) {
          alert('تم تسجيل الحجز بنجاح باستخدام الدفع النقدي.');
          navigate('/admin/decoration');
        } else {
          alert('فشل في تسجيل الحجز. حاول مرة أخرى.');
        }
      } else if (formData.paymentMethod === 'localbankcards') {
        // إذا كانت طريقة الدفع إلكترونيًا
        const response = await api.post('/reservations/create-reservation', dataToSend);
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url; // التوجيه إلى بوابة الدفع
        } else {
          alert('تم تقديم الحجز بنجاح.');
          navigate('/admin/reservations');
        }
      }
    } catch (error) {
      console.error('Error during reservation:', error.response || error.message);
      alert('فشل في تقديم الحجز.');
    }
  };

  const renderDay = (pickersDayProps: PickersDayProps<Date>) => {
    const formattedDate = format(pickersDayProps.day, 'yyyy-MM-dd');
    const isReserved = bookedDates.includes(formattedDate);

    if (isReserved) {
      return (
        <RedPickersDay
          {...pickersDayProps}
          disabled
          sx={{
            backgroundColor: 'rgba(128, 128, 128, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(128, 128, 128, 0.5)',
            },
          }}
        />
      );
    }

    return <PickersDay {...pickersDayProps} />;
  };

  if (!decoration) return <Typography>جاري التحميل...</Typography>;

  return (
    <Container dir="rtl">
      <Typography variant="h4" align="center" gutterBottom sx={{ marginTop: -5 }}>
        إكمال عملية الحجز - {decoration.dec_name}
      </Typography>

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
          src={decoration.pictures[currentImageIndex]} // عرض الصورة الحالية
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
                <MenuItem value="نقدًا">نقدًا</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12} style={{ marginTop: 19 }}>
              <Typography variant="h6">السعر الإجمالي: {formData.total_amount} د</Typography>
              <Typography variant="h6">القيمة المتبقية: {formData.remainingAmount} د</Typography>
            </Grid>
          </Grid>

          {/* نقل حقل الملاحظات الإضافية إلى أقصى اليسار تحت حقل تاريخ الحجز */}
          <Grid item xs={12} sm={6} style={{ alignSelf: 'flex-start', marginTop: 3 }}>
            <TextField
              fullWidth
              label="ملاحظات إضافية"
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

export default AdminReservationPage;
