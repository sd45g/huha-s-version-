import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون CardMedia.
const CardMedia: Components<Omit<Theme, 'components'>>['MuiCardMedia'] = {
  styleOverrides: {
    root: {}, // تخصيص الأنماط للجذر (فارغ هنا).
    img: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2.5, // تعيين نصف قطر الحدود للصور داخل المكون لزيادة التداخل.
    }),
  },
};

export default CardMedia; // تصدير التخصيص لمكون CardMedia للاستخدام في مكان آخر.
