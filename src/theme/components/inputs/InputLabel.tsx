// استيراد Theme و Components من MUI لتخصيص المكون.
import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تخصيص مكون InputLabel الخاص بالحقول النصية في Material UI ليتناسب مع اللغة العربية ويدعم اتجاه RTL.
const InputLabel: Components<Omit<Theme, 'components'>>['MuiInputLabel'] = {
  defaultProps: {
    shrink: true, // تعيين خاصية shrink افتراضيًا لضمان أن التسمية تتحرك عند إدخال النص.
  },
  styleOverrides: {
    // تخصيص الأنماط الجذرية للمكون باستخدام theme.
    root: ({ theme }) => ({
      left: 0, // تحديد موقع التسمية على المحور الأفقي لتكون على اليمين في حال استخدام RTL.
      top: theme.spacing(-3.75), // تعيين موقع التسمية على المحور العمودي باستخدام theme.
      fontSize: theme.typography.body2.fontSize, // تحديد حجم الخط للتسمية باستخدام body2 من theme.
      color: theme.palette.text.primary, // تعيين لون النص للون الأساسي من palette.
      transform: 'none', // إزالة أي تحويلات افتراضية على التسمية.
      fontWeight: 600, // تعيين وزن الخط ليكون سميكًا قليلاً لتوضيح التسمية.
      direction: 'rtl', // تفعيل اتجاه النص ليكون من اليمين إلى اليسار ليتناسب مع اللغة العربية.
      textAlign: 'right', // ضبط محاذاة النص إلى اليمين ليتناسب مع اتجاه RTL.
    }),
  },
};

export default InputLabel; // تصدير المكون للاستخدام في التطبيق.
