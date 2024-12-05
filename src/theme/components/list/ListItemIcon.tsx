import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// يُستخدم لإضافة أيقونات إلى عناصر القائمة، مع تخصيص حجم ولون الأيقونة ومسافة بينها وبين النص.
//  يُستخدم لإضفاء طابع بصري أفضل على عناصر القائمة وتسهيل تمييزها.
const ListItemIcon: Components<Omit<Theme, 'components'>>['MuiListItemIcon'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minWidth: '0 !important', // إزالة العرض الافتراضي
      marginRight: theme.spacing(1.75), // مسافة بين الأيقونة والنص
      color: theme.palette.text.disabled, // لون الأيقونة
      fontSize: theme.typography.h5.fontSize, // حجم الأيقونة
    }),
  },
};

export default ListItemIcon;
