import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// هو عنصر يمثل خيارًا ضمن قائمة. تصميمه يشمل حشوة وخلفية قابلة للتغيير عند التمرير، مع تأثيرات انتقالية لطيفة.
//  يُستخدم في القوائم التي تحتوي على خيارات متعددة، ويساهم في تحسين تجربة المستخدم عبر التفاعلات البصرية.
const MenuItem: Components<Omit<Theme, 'components'>>['MuiMenuItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontWeight: 500, // سمك النص
      padding: theme.spacing(0.75, 1.25), // حشوة حول العنصر
      fontSize: theme.typography.body2.fontSize, // حجم النص
      borderRadius: theme.shape.borderRadius * 1.5, // جعل الحواف مستديرة
      transition: 'all 0.3s ease-in-out', // تأثير الانتقال
      '&:hover': { backgroundColor: theme.palette.info.dark }, // تغيير الخلفية عند التمرير
    }),
  },
};

export default MenuItem;
