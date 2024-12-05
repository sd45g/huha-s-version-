import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون CardContent.
const CardContent: Components<Omit<Theme, 'components'>>['MuiCardContent'] = {
  styleOverrides: {
    root: {
      padding: 0, // إزالة الحشوة حول المكون.
      '&:last-child': {
        paddingBottom: 0, // إزالة الحشوة السفلية لآخر عنصر في المكون.
      },
    },
  },
};

export default CardContent; // تصدير التخصيص لمكون CardContent للاستخدام في مكان آخر.
