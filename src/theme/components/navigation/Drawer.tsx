import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// هو عنصر جانبي يُستخدم كقائمة تنقل أو منطقة عرض عناصر ثانوية زي لوحة التحكم ،
//  ويُخصص هنا لتكون له خلفية واضحة عند التحويم وتكون غير مشوشة.
const Drawer: Components<Omit<Theme, 'components'>>['MuiDrawer'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      // إظهار شريط التمرير عند التحويم أو التركيز على Drawer
      '&:hover, &:focus': {
        '*::-webkit-scrollbar, *::-webkit-scrollbar-thumb': {
          visibility: 'visible',
        },
      },
      '*::-webkit-scrollbar-track': {
        marginTop: theme.spacing(15), // ازاحة شريط التمرير من اعلى
      },
    }),
    paper: ({ theme }) => ({
      padding: 0, // إزالة الحشوة
      width: '290px', // عرض Drawer
      height: '100vh', // طول Drawer يملأ الشاشة
      border: 0,
      borderRadius: 0,
      backgroundColor: theme.palette.info.lighter, // لون خلفية Drawer
      boxShadow: 'none', // إزالة الظلال
      boxSizing: 'border-box',
    }),
  },
};

export default Drawer;
