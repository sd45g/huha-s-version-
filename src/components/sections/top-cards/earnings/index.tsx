import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import { api } from 'API/api'; // استيراد API

const Earnings = () => {
  const [totalEarnings, setTotalEarnings] = useState<number>(0); // حالة لتخزين إجمالي الأرباح
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/reservations/total-earnings'); // الاتصال بالـ API
        setTotalEarnings(response.data.total); // تحديث حالة الأرباح
      } catch (error) {
        console.error('Error fetching total earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEarnings();
  }, []);
  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 3, direction: 'rtl' }}
    >
      <Stack alignItems="center" justifyContent="flex-start" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          bgcolor="info.main"
          borderRadius="50%"
        >
          <IconifyIcon icon="ic:round-bar-chart" color="primary.main" fontSize="h3.fontSize" />
        </Stack>
        <Box>
          <Typography variant="body2" color="text.disabled" fontWeight={500}>
            إجمالي الأرباح
          </Typography>
          {loading ? (
            <Typography mt={1} variant="h3">
              تحميل...
            </Typography>
          ) : (
            <Typography mt={1} variant="h3">
              {totalEarnings.toFixed(2)}د {/* عرض الربح بصيغة عملة */}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default Earnings;
