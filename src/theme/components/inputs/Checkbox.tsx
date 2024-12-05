import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
import IconifyIcon from 'components/base/IconifyIcon'; // استيراد ايقونة مخصصة لاستخدامها داخل Checkbox

// (styleOverrides)هنا ليتيح تخصيص عرض مربعات الاختيار داخل المشروع. يحتوي على ثلاثة أيقونات حسب حالة التحديد، كما يحتوي على أنماط
//  لتحديد الألوان وأحجام الأيقونات بما يتناسب مع حجم المربع. تستخدم هذه التعديلات داخل المشروع لتوحيد الشكل بين مكونات مربعات الاختيار.

// تعريف خصائص Component الخاصة بـ MuiCheckbox
const Checkbox: Components<Omit<Theme, 'components'>>['MuiCheckbox'] = {
  defaultProps: {
    // تخصيص الأيقونات لكل حالة في Checkbox
    icon: <IconifyIcon icon="mdi:checkbox-blank" />,
    checkedIcon: <IconifyIcon icon="mdi:checkbox-marked" />,
    indeterminateIcon: <IconifyIcon icon="mdi:indeterminate-check-box" />,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.info.dark, // اللون الأساسي للـ Checkbox
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right', // محاذاة النص إلى اليمين لكي يكون متوافقًا مع النص العربي.
    }),
    sizeMedium: ({ theme }) => ({
      padding: theme.spacing(0.75), // المسافة بين الأيقونة والمحتوى
      '& .MuiBox-root': {
        fontSize: theme.typography.h5.fontSize, // حجم الخط للأيقونة
      },
    }),
    sizeSmall: ({ theme }) => ({
      '& .MuiBox-root': {
        fontSize: theme.typography.h6.fontSize, // حجم خط أصغر
      },
    }),
  },
};

export default Checkbox;
