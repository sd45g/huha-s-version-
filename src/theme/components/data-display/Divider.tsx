import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون Divider.
const Divider: Components<Omit<Theme, 'components'>>['MuiDivider'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      height: 2, // تعيين ارتفاع المكون Divider ليكون 2 بيكسل.
      alignItems: 'center', // ضبط محاذاة المكون Divider ليكون في الوسط.
      backgroundColor: 'transparent', // تعيين لون الخلفية ليكون شفافًا.
      borderColor: theme.palette.info.main, // تعيين لون الحدود باستخدام اللون الرئيسي من palette.

      '&.MuiDivider-withChildren': {
        // تخصيص الأنماط عندما يحتوي Divider على عناصر داخلية.
        height: '0 !important', // تعيين ارتفاع Divider ليكون صفر عندما يحتوي على عناصر.
        color: theme.palette.text.disabled, // تعيين لون النص.
        backgroundColor: 'transparent', // لون الخلفية ليكون شفافًا.
        fontWeight: 500, // جعل النص عريضًا قليلاً.

        '&::before': {
          backgroundColor: theme.palette.info.main, // تعيين لون الخلفية قبل Divider.
        },
        '&::after': {
          backgroundColor: theme.palette.info.main, // تعيين لون الخلفية بعد Divider.
        },
      },
    }),
  },
};

export default Divider; // تصدير التخصيص لمكون Divider للاستخدام في مكان آخر.
