import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون Button.
const Button: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    disableElevation: true, // تعطيل الظلال الافتراضية للأزرار.
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.info.light, // تعيين لون النص للزر.
      borderRadius: theme.shape.borderRadius * 4, // تعيين نصف قطر الحدود.
      textTransform: 'initial', // الحفاظ على النص كما هو بدون تحويله.
    }),
    text: ({ theme }) => ({
      color: theme.palette.text.disabled, // تعيين لون النص ليكون معطل.
      backgroundColor: 'transparent !important', // تعيين لون الخلفية ليكون شفافًا.
      fontWeight: 500, // جعل النص عريضًا قليلاً.
    }),
    containedPrimary: ({ theme }) => ({
      color: theme.palette.info.light, // لون النص للزر الأساسي.
      backgroundColor: theme.palette.primary.main, // لون الخلفية للزر الأساسي.
      '&:hover': { backgroundColor: theme.palette.primary.main }, // تفعيل نفس اللون عند التمرير.
    }),
    containedSecondary: ({ theme }) => ({
      color: theme.palette.text.primary, // لون النص للزر الثانوي.
      backgroundColor: theme.palette.info.dark, // لون الخلفية للزر الثانوي.
      '&:hover': { backgroundColor: theme.palette.info.dark }, // تفعيل نفس اللون عند التمرير.
    }),
    sizeLarge: ({ theme }) => ({
      padding: theme.spacing(1.25, 3), // حشوة الزر الكبير.
      fontSize: theme.typography.body1.fontSize, // ضبط حجم الخط.
    }),
    sizeMedium: ({ theme }) => ({
      padding: theme.spacing(1, 2.75), // حشوة الزر المتوسط.
      fontSize: theme.typography.body1.fontSize, // ضبط حجم الخط.
    }),
    sizeSmall: ({ theme }) => ({
      padding: theme.spacing(0.75, 2.35), // حشوة الزر الصغير.
      fontSize: theme.typography.caption.fontSize, // ضبط حجم الخط.
      fontWeight: 600, // جعل النص عريضًا للزر الصغير.
    }),
    startIcon: {
      marginRight: 6, // تعيين مسافة بين الأيقونة والنص عند وضع الأيقونة في البداية.
    },
    endIcon: {
      marginLeft: 6, // تعيين مسافة بين الأيقونة والنص عند وضع الأيقونة في النهاية.
    },
  },
};

export default Button; // تصدير التخصيص لمكون Button للاستخدام في مكان آخر.
