import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// هو مكون يُستخدم لتقديم عناصر قابلة للنقر داخل القائمة.
//  التصميم يتيح تخصيص لون الخلفية عند التمرير، مما يُحسن تجربة المستخدم. يستخدم في القوائم التي تحتوي على عناصر قابلة للنقر أو التفاعل.
const ListItemButton: Components<Omit<Theme, 'components'>>['MuiListItemButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.disabled, // لون النص الأساسي
      padding: theme.spacing(0.875, 1.25), // مسافة عمودية بسيطة بين الأزرار
      borderRadius: theme.shape.borderRadius * 1.25, // جعل الحواف مستديرة
      '&:hover': { backgroundColor: theme.palette.info.main }, // تغيير لون الخلفية عند التمرير
    }),
  },
};

export default ListItemButton;
