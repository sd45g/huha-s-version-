import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SpentChart from './SpentChart';
import { api } from 'API/api'; // استيراد API

const Spent = () => {
  const [currentMonthEarnings, setCurrentMonthEarnings] = useState<number>(0); // حالة للأرباح الشهرية
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل

  useEffect(() => {
    const fetchCurrentMonthEarnings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/reservations/current-month-earnings'); // استدعاء API لجلب الأرباح
        setCurrentMonthEarnings(response.data.totalEarnings); // تحديث حالة الأرباح
      } catch (error) {
        console.error('Error fetching current month earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentMonthEarnings();
  }, []);

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5, direction: 'rtl' }}
    >
      <Box>
        <Typography variant="body2" color="text.disabled" fontWeight={500}>
          الأرباح لهذا الشهر
        </Typography>
        {loading ? (
          <Typography mt={1} variant="h3">
            جاري التحميل...
          </Typography>
        ) : (
          <Typography mt={1} variant="h3">
            {currentMonthEarnings.toFixed(2)}د
          </Typography>
        )}
      </Box>

      <SpentChart
        data={[160, 100, 210, 270, currentMonthEarnings]} // عرض بيانات عشوائية مع القيمة الفعلية للأرباح
        sx={{ width: 75, height: '68px !important' }}
      />
    </Paper>
  );
};

export default Spent;
