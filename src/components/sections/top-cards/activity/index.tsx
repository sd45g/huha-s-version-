import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ActivityChart from './ActivityChart';
import { api } from 'API/api'; // استيراد API للتواصل مع الخلفية

const Activity = () => {
  const [reservationCount, setReservationCount] = useState<number>(0); // حالة لتخزين عدد الحجوزات
  const [loading, setLoading] = useState<boolean>(true); // حالة تحميل البيانات

  useEffect(() => {
    const fetchReservationCount = async () => {
      try {
        setLoading(true);
        const response = await api.get('/reservations/all'); // الاتصال بـ API لجلب الحجوزات
        setReservationCount(response.data.length); // تحديث حالة عدد الحجوزات
      } catch (error) {
        console.error('Error fetching reservation count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationCount();
  }, []);

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={(theme) => ({
        px: 3,
        py: 2.5,
        background: `linear-gradient(135deg, ${theme.palette.gradients.primary.state} 0%, ${theme.palette.gradients.primary.main} 100%)`,
        direction: 'rtl', // لضمان الاتجاه من اليمين إلى اليسار
      })}
    >
      <Box>
        <Typography variant="body2" color="info.dark" fontWeight={500}>
          عدد الحجوزات
        </Typography>
        {loading ? (
          <Typography mt={1} variant="h3" color="info.light">
            تحميل...
          </Typography>
        ) : (
          <Typography mt={1} variant="h3" color="info.light">
            {reservationCount}
          </Typography>
        )}
      </Box>

      <ActivityChart data={[15, 50, 30, 45, 50]} sx={{ width: 75, height: '68px !important' }} />
    </Paper>
  );
};

export default Activity;
