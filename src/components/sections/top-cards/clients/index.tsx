import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import ClientChart from './ClientChart';
import { api } from 'API/api'; // استيراد الدالة الخاصة بالتواصل مع API

const Clients = () => {
  const [customerCount, setCustomerCount] = useState<number>(0); // حالة لتخزين عدد العملاء
  const [loading, setLoading] = useState<boolean>(true); // حالة لتحميل البيانات

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users/customer-count'); // الاتصال بـ API
        setCustomerCount(response.data.count); // تحديث حالة عدد العملاء
      } catch (error) {
        console.error('Error fetching customer count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerCount();
  }, []);

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 2.5 }}
    >
      <Stack alignItems="flex-end" justifyContent="flex-start" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.gradients.primary.state} 0%, ${theme.palette.gradients.primary.main} 100%)`,
          })}
          borderRadius="50%"
        >
          <IconifyIcon icon="ic:baseline-people-alt" color="info.light" fontSize="h3.fontSize" />
        </Stack>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="text.disabled" fontWeight={500}>
            زبائن جدد
          </Typography>
          {loading ? ( // عرض "تحميل" أثناء انتظار البيانات
            <Typography mt={0.5} variant="h4">
              Loading...
            </Typography>
          ) : (
            <Typography mt={0.5} variant="h4">
              {customerCount}
            </Typography>
          )}
        </Box>
      </Stack>

      <ClientChart data={[15, 12, 50, 45, 60]} sx={{ width: 75, height: '68px !important' }} />
    </Paper>
  );
};

export default Clients;
