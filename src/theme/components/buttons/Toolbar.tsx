import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون Toolbar.
const Toolbar: Components<Omit<Theme, 'components'>>['MuiToolbar'] = {
  styleOverrides: {
    root: {
      padding: '0 !important', // إزالة الحشوة حول المكون Toolbar وجعلها صفر.
    },
  },
};

export default Toolbar; // تصدير التخصيص لمكون Toolbar للاستخدام في مكان آخر.
