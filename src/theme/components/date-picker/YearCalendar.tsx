import { Theme } from '@mui/material'; // استيراد نوع Theme من مكتبة Material UI.
import { Components } from '@mui/material/styles/components'; // استيراد نوع Components لتخصيص الأنماط.

// تعريف التخصيص لمكون YearCalendar.
const YearCalendar: Components<Omit<Theme, 'components'>>['MuiYearCalendar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      // تخصيص الأنماط الجذرية باستخدام theme.
      '& .MuiPickersYear-root': {
        // تخصيص مظهر السنة.
        '& .MuiPickersYear-yearButton': {
          // تخصيص الزر الخاص بالسنة.
          '&.Mui-selected': {
            // تخصيص الزر عند تحديد السنة.
            backgroundColor: theme.palette.primary.main, // تعيين لون الخلفية عند التحديد.
          },
        },
      },
    }),
  },
};

export default YearCalendar; // تصدير التخصيص للاستخدام في المشروع.
