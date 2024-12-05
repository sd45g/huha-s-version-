// استيراد نوع Theme من مكتبة Material UI
import { Theme } from '@mui/material';
// استيراد نوع Components من مكتبة Material UI لتخصيص الأنماط
import { Components } from '@mui/material/styles/components';

// تعريف تخصيص لمكون Select باستخدام خصائص MUI
const Select: Components<Omit<Theme, 'components'>>['MuiSelect'] = {
  // إضافة تعديلات على الأنماط الافتراضية للمكون
  styleOverrides: {
    // تخصيص النمط الجذري للمكون
    root: ({ theme }) => ({
      padding: theme.spacing(0, 1.25), // إضافة مسافة داخلية على جانبي المكون
      borderRadius: theme.shape.borderRadius * 4.5, // ضبط نصف قطر الحواف ليصبح دائريًا
      // تخصيص العنصر الجذري لمكون InputBase إذا كان ضمن Select
      '&.MuiInputBase-root': {
        border: 'none', // إزالة الحدود
        // تخصيص أي عنصر من نوع Box بداخل InputBase
        '& .MuiBox-root': {
          minWidth: 20, // تعيين عرض أدنى للعنصر Box ليصبح 20 بيكسل
        },
      },
    }),
    // تخصيص نمط العنصر select داخل المكون
    select: ({ theme }) => ({
      padding: theme.spacing(1), // تعيين المسافة الداخلية للمكون
      paddingRight: '0 !important', // ضبط الحشو الأيمن ليكون صفرًا (التجاه اليمين)
      backgroundColor: 'transparent !important', // جعل الخلفية شفافة
      fontSize: theme.typography.body2.fontSize, // تعيين حجم الخط بناءً على إعدادات body2
      color: theme.palette.text.disabled, // تغيير لون النص إلى اللون الرمادي المعطل
      fontWeight: 600, // جعل النص ثقيلًا ليبرز أكثر
      border: 'none', // إزالة الحدود
      direction: 'rtl', // تغيير اتجاه النص ليصبح من اليمين إلى اليسار لدعم اللغة العربية
      textAlign: 'right', // محاذاة النص إلى اليمين
    }),
    // تخصيص نمط الأيقونة داخل المكون Select
    icon: ({ theme }) => ({
      color: theme.palette.text.disabled, // تعيين لون الأيقونة إلى لون النص المعطل
    }),
  },
};

// تصدير المكون Select بعد تخصيصه لاستخدامه في المشروع
export default Select;
