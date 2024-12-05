import { useSelector, useDispatch } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconifyIcon from 'components/base/IconifyIcon';
import { RootState } from '/store/admin/store';
import { setMonth, setYear, setDate } from 'store/admin/slices/calendarSlice';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'; // استخدام الألوان
import { api } from 'API/api'; // استيراد api للاتصال بالواجهة الخلفية

interface CalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}
interface ReservedDate {
  date: string;
  status: string;
}

const months = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const years = Array.from({ length: 100 }, (_, i) => dayjs().year() - 50 + i);

const CalendarHeader = ({ currentMonth, onMonthChange, onYearChange }: CalendarHeaderProps) => {
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    onMonthChange(event.target.value as number);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    onYearChange(event.target.value as number);
  };

  return (
    <Stack pb={1} spacing={2} justifyContent="center">
      <FormControl
        variant="filled"
        sx={{
          '& .MuiInputBase-root': {
            '&:focus-within': { borderColor: 'transparent !important', boxShadow: 'none' },
          },
        }}
      >
        <Select
          value={currentMonth.month()}
          onChange={handleMonthChange}
          IconComponent={() => (
            <IconifyIcon icon="ic:round-keyboard-arrow-down" fontSize="h3.fontSize" />
          )}
          sx={(theme) => ({
            '&.MuiInputBase-root': {
              bgcolor: `${theme.palette.info.main} !important`,
              '& .MuiBox-root': { color: 'primary.main' },
            },
            '& .MuiSelect-select': { color: `${theme.palette.primary.main} !important` },
          })}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        variant="filled"
        sx={{
          '& .MuiInputBase-root': {
            bgcolor: 'transparent !important',
            '&:focus-within': { borderColor: 'transparent !important', boxShadow: 'none' },
          },
        }}
      >
        <Select
          value={currentMonth.year()}
          onChange={handleYearChange}
          IconComponent={() => (
            <IconifyIcon icon="ic:round-keyboard-arrow-down" fontSize="h3.fontSize" />
          )}
          sx={(theme) => ({
            '& .MuiSelect-select': { color: `${theme.palette.text.primary} !important` },
          })}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = dayjs(useSelector((state: RootState) => state.calendar.currentDate));
  const theme = useTheme(); // استخدام theme للحصول على الألوان
  const [reservedDates, setReservedDates] = useState<ReservedDate[]>([]); // تخزين التواريخ المحجوزة

  // جلب البيانات من الواجهة الخلفية
  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await api.get('/receipts/reserved-dates-admin'); // استخدام دالة API
        setReservedDates(response.data); // تخزين التواريخ المحجوزة
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    };

    fetchReservedDates();
  }, []);

  const handleMonthChange = (month: number) => {
    dispatch(setMonth(month));
  };

  const handleYearChange = (year: number) => {
    dispatch(setYear(year));
  };

  const handleDateChange = (date: Dayjs) => {
    dispatch(setDate(date.toISOString())); // تخزين كـ string
  };

  // تحديد لون اليوم بناءً على حالته
  const getDayStyle = (day: Dayjs) => {
    const reservation = reservedDates.find((r) => dayjs(r.date).isSame(day, 'day'));
    if (reservation) {
      switch (reservation.status) {
        case 'مؤكد':
          return { backgroundColor: theme.palette.success.main, color: 'white' };
        case 'مؤقت':
          return { backgroundColor: theme.palette.warning.light, color: 'black' };
        case 'ملغية':
          return { backgroundColor: theme.palette.error.main, color: 'white' };
        default:
          return {};
      }
    }
    return {};
  };

  return (
    <Paper sx={{ p: 2, height: 350 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{ width: 1 }}
          slots={{
            calendarHeader: (props: PickersCalendarHeaderProps<Dayjs>) => (
              <CalendarHeader
                currentMonth={props.currentMonth}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
            ),
          }}
          dayOfWeekFormatter={(date: Dayjs) => {
            const dayMap: { [key: string]: string } = {
              Su: 'ح',
              Mo: 'ن',
              Tu: 'ث',
              We: 'ر',
              Th: 'خ',
              Fr: 'ج',
              Sa: 'س',
            };
            return dayMap[date.format('dd')] || date.format('dd');
          }}
          value={currentDate}
          onChange={(date) => handleDateChange(date as Dayjs)}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          slotProps={{
            day: (ownerState) => {
              const day = ownerState.day;
              return {
                style: { ...getDayStyle(day), padding: '8px', borderRadius: '50%' },
                children: day.date(),
              };
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default Calendar;
