// استيراد Theme و Components من MUI لتخصيص مكونات واجهة المستخدم.
import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تخصيص مكون FilledInput ليتناسب مع الشكل العربي ويضمن التناسق في المسافات وحواف الإدخال.
const FilledInput: Components<Omit<Theme, 'components'>>['MuiFilledInput'] = {
  styleOverrides: {
    // تخصيص الأنماط الجذرية للمكون باستخدام theme.
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 3.25, // تعيين الحواف لتكون مستديرة باستخدام theme.
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right', // محاذاة النص إلى اليمين لكي يكون متوافقًا مع النص العربي.
    }),
    input: {
      padding: 0, // إزالة الحشو الداخلي لضبط المسافات بشكل دقيق.
    },
    // تخصيص الأنماط للـ sizeSmall.
    sizeSmall: ({ theme }) => ({
      paddingRight: theme.spacing(1.25), // ضبط المسافة اليمنى للنص لتناسب المسافات في اللغة العربية.
    }),
  },
};

export default FilledInput; // تصدير المكون للاستخدام في التطبيق.
