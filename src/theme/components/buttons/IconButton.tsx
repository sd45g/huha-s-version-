import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون IconButton.
const IconButton: Components<Omit<Theme, 'components'>>['MuiIconButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary, // تعيين لون النص الأساسي للزر.
      backgroundColor: theme.palette.info.darker, // تعيين لون الخلفية للزر.
      marginLeft: 0, // ضبط المسافة اليسرى لتكون صفر.
    }),
    sizeLarge: ({ theme }) => ({
      padding: theme.spacing(1), // تعيين حشوة الزر بحجم كبير.
      fontSize: theme.typography.h3.fontSize, // تعيين حجم الخط وفقًا لحجم `h3` من typography.
    }),
    sizeMedium: ({ theme }) => ({
      padding: theme.spacing(0.75), // تعيين حشوة الزر بحجم متوسط.
      fontSize: theme.typography.h4.fontSize, // تعيين حجم الخط وفقًا لحجم `h4` من typography.
    }),
    sizeSmall: ({ theme }) => ({
      padding: theme.spacing(0.5), // تعيين حشوة الزر بحجم صغير.
      fontSize: theme.typography.h6.fontSize, // تعيين حجم الخط وفقًا لحجم `h6` من typography.
    }),
  },
};

export default IconButton; // تصدير التخصيص لمكون IconButton للاستخدام في مكان آخر.
