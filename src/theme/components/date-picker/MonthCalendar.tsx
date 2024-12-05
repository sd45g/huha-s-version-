import { Theme } from '@mui/material'; // استيراد نوع Theme من مكتبة Material UI.
import { Components } from '@mui/material/styles/components'; // استيراد نوع Components لتخصيص الأنماط.

// تعريف التخصيص لمكون MonthCalendar.
const MonthCalendar: Components<Omit<Theme, 'components'>>['MuiMonthCalendar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      // تخصيص الأنماط الجذرية باستخدام theme.
      '& .MuiPickersMonth-root': {
        // تخصيص مظهر الشهر.
        '& .MuiPickersMonth-monthButton': {
          // تخصيص الزر الخاص بالشهر.
          '&.Mui-selected': {
            // تخصيص الزر عند تحديد الشهر.
            backgroundColor: theme.palette.primary.main, // تعيين لون الخلفية عند التحديد.
          },
        },
      },
    }),
  },
};

export default MonthCalendar; // تصدير التخصيص للاستخدام في المشروع.
