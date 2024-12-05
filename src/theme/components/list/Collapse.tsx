import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
//todo
// هو مكون يُستخدم لعرض وإخفاء المحتوى بشكل متحرك. يُستعمل غالبًا مع القوائم أو الأقسام القابلة للتوسيع والانطواء في الواجهة، حيث يوفر تجربة مستخدم أكثر سلاسة عند عرض وإخفاء عناصر إضافية.

const Collapse: Components<Omit<Theme, 'components'>>['MuiCollapse'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(0, 2), // حشوة من اليمين واليسار

      '& .MuiList-root': {
        padding: 0, // إزالة الحشوة الافتراضية
        margin: theme.spacing(1, 0), // إضافة مسافة عمودية بين العناصر
      },
    }),
  },
};

export default Collapse;
