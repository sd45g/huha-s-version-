// استيراد Theme و Components من MUI لتخصيص مكونات واجهة المستخدم.
import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تخصيص مكون FormControlLabel ليتناسب مع الشكل العربي.
const FormControlLabel: Components<Omit<Theme, 'components'>>['MuiFormControlLabel'] = {
  styleOverrides: {
    // تخصيص الأنماط الجذرية للمكون (root) لجعل المحاذاة متوافقة مع اللغة العربية.
    root: {
      marginLeft: 0, // إزالة المسافة اليسرى لجعل المحاذاة مناسبة لكتابة النصوص من اليمين إلى اليسار.
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right',
    },
    // تخصيص الأنماط للعناصر المسمى label.
    label: ({ theme }) => ({
      marginLeft: 0, // إزالة المسافة اليسرى من التسمية.
      letterSpacing: 0.25, // ضبط التباعد بين الحروف ليكون دقيقًا ومتناسقًا.
      fontSize: theme.typography.body2.fontSize, // استخدام حجم الخط المحدد في theme.
      userSelect: 'none', // منع المستخدم من تحديد النص بشكل غير مقصود.
      fontWeight: 500, // ضبط وزن الخط ليكون متوسطًا.
    }),
  },
};

export default FormControlLabel; // تصدير المكون للاستخدام في التطبيق.
