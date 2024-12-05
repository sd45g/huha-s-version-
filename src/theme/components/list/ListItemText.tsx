import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// يُستخدم لتحديد النص في عناصر القائمة. يتميز بإمكانية تخصيص اللون والحجم والسمك، مما يعزز تنظيم النصوص داخل القوائم. يُستخدم لتنسيق نصوص عناصر القائمة بحيث تبدو متناسقة ومقروءة.
const ListItemText: Components<Omit<Theme, 'components'>>['MuiListItemText'] = {
  styleOverrides: {
    root: {},
    primary: ({ theme }) => ({
      marginTop: theme.spacing(0.15), // مسافة بسيطة من الأعلى
      color: theme.palette.text.disabled, // لون النص الأساسي
      fontSize: theme.typography.body1.fontSize, // حجم النص الأساسي
      fontWeight: 500, // جعل النص أكثر سماكة
    }),
  },
};

export default ListItemText;
