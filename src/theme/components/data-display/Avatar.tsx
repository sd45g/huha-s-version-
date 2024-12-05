import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تعريف إعدادات الأنماط المخصصة لمكون Avatar.
const Avatar: Components<Omit<Theme, 'components'>>['MuiAvatar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.info.lighter, // ضبط لون النص ليكون بتدرج فاتح.
      backgroundColor: theme.palette.primary.main, // تعيين لون الخلفية للون الأساسي.
    }),
  },
};

export default Avatar; // تصدير التخصيص لمكون Avatar للاستخدام في مكان آخر.
