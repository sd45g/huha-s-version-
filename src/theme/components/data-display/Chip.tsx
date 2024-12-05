import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تعريف إعدادات الأنماط المخصصة لمكون Chip.
const Chip: Components<Omit<Theme, 'components'>>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0, // إزالة الهوامش حول المكون.
      fontWeight: 700, // جعل النص عريض.
      color: theme.palette.info.lighter, // تعيين لون النص بتدرج فاتح.
    }),
    sizeSmall: ({ theme }) => ({
      height: 24, // ضبط ارتفاع المكون الصغير.
      padding: theme.spacing(0, 1), // تعيين الحشوة حول المكون.
      fontSize: theme.typography.caption.fontSize, // تعيين حجم الخط.
    }),
    sizeMedium: ({ theme }) => ({
      height: 28, // ضبط ارتفاع المكون المتوسط.
      padding: theme.spacing(0, 1.25), // تعيين الحشوة حول المكون.
      fontSize: theme.typography.body2.fontSize, // ضبط حجم الخط.
    }),
    colorPrimary: ({ theme }) => ({
      backgroundColor: theme.palette.info.light, // لون الخلفية لتمييز المكون.
    }),
    colorSuccess: ({ theme }) => ({
      backgroundColor: theme.palette.success.main, // لون الخلفية للنجاح.
    }),
    colorWarning: ({ theme }) => ({
      backgroundColor: theme.palette.warning.main, // لون الخلفية للتحذير.
    }),
    colorError: ({ theme }) => ({
      backgroundColor: theme.palette.error.main, // لون الخلفية للخطأ.
    }),
    iconSmall: {
      width: 12, // حجم الأيقونة الصغيرة.
      margin: '0 !important', // إزالة الهوامش للأيقونة.
    },
    iconMedium: {
      width: 16, // حجم الأيقونة المتوسطة.
      margin: '0 !important', // إزالة الهوامش للأيقونة.
    },
    labelSmall: {
      padding: 0, // إزالة الحشوة حول النص.
      textTransform: 'capitalize', // جعل النص بحروف كبيرة للأحرف الأولى.
    },
    labelMedium: {
      padding: 0, // إزالة الحشوة حول النص.
      textTransform: 'capitalize', // جعل النص بحروف كبيرة للأحرف الأولى.
    },
  },
};

export default Chip; // تصدير التخصيص لمكون Chip للاستخدام في مكان آخر.
