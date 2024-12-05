import { Theme } from '@mui/material'; // استيراد نوع Theme من مكتبة Material UI.
import { Components } from '@mui/material/styles/components'; // استيراد نوع Components لتخصيص الأنماط.

// تعريف التخصيص لمكون DateCalendar.
const DateCalendar: Components<Omit<Theme, 'components'>>['MuiDateCalendar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      // تخصيص الأنماط الجذرية باستخدام theme.
      '& .MuiDayCalendar-header': {
        // تخصيص رأس التقويم لعرض أيام الأسبوع.
        display: 'grid', // استخدام شبكة لعرض العناصر.
        gridTemplateColumns: 'repeat(7, 1fr)', // توزيع الأعمدة بالتساوي على 7 خانات (أيام الأسبوع).
        placeItems: 'center', // توسيط العناصر أفقياً وعمودياً.
        gap: 0, // عدم وجود فراغ بين العناصر.

        '& .MuiDayCalendar-weekDayLabel': {
          // تخصيص مظهر أسماء أيام الأسبوع.
          color: theme.palette.text.primary, // تعيين لون النص.
          fontSize: theme.typography.body2.fontSize, // تعيين حجم الخط بناءً على typography.
          fontWeight: 700, // تعيين وزن الخط ليكون عريضاً.
        },
      },
      '& .MuiPickersSlideTransition-root': {
        // تخصيص منطقة تغيير الشهور.
        '& .MuiDayCalendar-monthContainer': {
          // تخصيص حاوية الشهر.
          '& .MuiDayCalendar-weekContainer': {
            // تخصيص حاوية الأسبوع.
            width: '100%', // تعيين عرض 100% للحاوية.
            display: 'grid', // عرض شبكة للعناصر.
            gridTemplateColumns: 'repeat(7, 1fr)', // توزيع الأعمدة على 7 خانات.
            placeItems: 'center', // توسيط العناصر.
            gap: 0, // عدم وجود فراغ بين العناصر.

            '& .MuiPickersDay-root': {
              // تخصيص الخلية لكل يوم.
              margin: 0, // تعيين الهامش الخارجي ليكون صفر.
            },
            '& .MuiPickersDay-today': {
              // تخصيص اليوم الحالي.
              border: 'none', // إزالة الحدود.
              color: theme.palette.text.primary, // تعيين لون النص.
              backgroundColor: theme.palette.info.main, // تعيين لون الخلفية.
            },
            '& .MuiPickersDay-today.Mui-selected': {
              // تخصيص اليوم الحالي عند تحديده.
              color: theme.palette.info.lighter, // تعيين لون النص.
              backgroundColor: theme.palette.primary.main, // تعيين لون الخلفية.
            },
          },
        },
      },
    }),
  },
};

export default DateCalendar; // تصدير التخصيص للاستخدام في المشروع.
