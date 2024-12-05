import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import TotalSpentChart from './TotalSpentChart';
import { api } from 'API/api'; // استيراد API
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';

const TotalSpent = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear); // السنة المختارة
  const [monthlyEarnings, setMonthlyEarnings] = useState<number[]>(Array(12).fill(0)); // حالة الأرباح الشهرية
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل
  const [totalSpent, setTotalSpent] = useState<number>(0); // إجمالي الأرباح السنوية

  useEffect(() => {
    const fetchMonthlyEarnings = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/reservations/monthly-earnings/${selectedYear}`); // جلب الأرباح الشهرية
        setMonthlyEarnings(response.data.monthlyEarnings); // تحديث الأرباح الشهرية
        setTotalSpent(
          response.data.monthlyEarnings.reduce((acc: number, value: number) => acc + value, 0),
        ); // حساب الإجمالي السنوي
      } catch (error) {
        console.error('Error fetching monthly earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyEarnings();
  }, [selectedYear]);

  return (
    <Paper sx={{ height: 355, px: 2, py: 3, direction: 'rtl' }}>
      <Stack alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color="text.disabled" fontWeight={600}>
            إجمالي الأرباح السنوية
          </Typography>
          {loading ? (
            <Typography variant="h2" color="text.primary" mt={0.25}>
              جاري التحميل...
            </Typography>
          ) : (
            <Typography variant="h2" color="text.primary" mt={0.25}>
              {totalSpent.toFixed(2)}د
            </Typography>
          )}
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['year']}
              value={dayjs().set('year', selectedYear)} // تحديد السنة الحالية
              onChange={(value) => setSelectedYear(value?.year() || currentYear)} // تحديث السنة عند الاختيار
              format="YYYY"
              sx={{
                boxShadow: 'none',
                '& .MuiInputBase-root': {
                  p: 0,
                  border: 'none',
                  background: `${theme.palette.info.dark} !important`,
                  borderRadius: 1.5,
                },
                '& .MuiOutlinedInput-root': {
                  pr: 1.75,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 0,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 0,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 0,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  p: 1,
                  color: theme.palette.text.secondary,
                  fontSize: theme.typography.caption.fontSize,
                  fontWeight: 500,
                  width: 60,
                },
                '& .MuiIconButton-edgeEnd': {
                  color: theme.palette.text.secondary,
                  backgroundColor: 'transparent !important',
                  '& .MuiSvgIcon-fontSizeMedium': {
                    fontSize: theme.typography.subtitle1.fontSize,
                  },
                },
              }}
              slotProps={{
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      p: 0,
                      boxShadow: theme.shadows[2],
                      borderRadius: 2.5,
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
          <Stack
            alignItems="center"
            justifyContent="center"
            height={42}
            width={42}
            bgcolor="info.main"
            borderRadius={1.75}
          >
            <IconifyIcon icon="ic:round-bar-chart" color="primary.main" fontSize="h3.fontSize" />
          </Stack>
        </Stack>
      </Stack>

      <TotalSpentChart
        data={monthlyEarnings} // تمرير البيانات إلى الرسم البياني
        sx={{ height: '230px !important' }}
      />
    </Paper>
  );
};

export default TotalSpent;
