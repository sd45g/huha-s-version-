import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تعريف إعدادات الأنماط المخصصة لمكون Badge.
const Badge: Components<Omit<Theme, 'components'>>['MuiBadge'] = {
  styleOverrides: {
    root: {}, // تخصيص الأنماط للجذر (فارغ هنا).
    badge: {
      top: 9, // تحديد المسافة العلوية للشارة.
      right: 8, // تحديد المسافة اليمنى للشارة.
    },
  },
};

export default Badge; // تصدير التخصيص لمكون Badge للاستخدام في مكان آخر.
