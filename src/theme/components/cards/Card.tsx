import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون Card.
const Card: Components<Omit<Theme, 'components'>>['MuiCard'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2), // تعيين حشوة المكون Card بمقدار 2 وحدة من تدرج الحشوة.
    }),
  },
};

export default Card; // تصدير التخصيص لمكون Card للاستخدام في مكان آخر.
