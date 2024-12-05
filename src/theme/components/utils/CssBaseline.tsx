import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
import scrollbar from 'theme/styles/scrollbar';
import echart from 'theme/styles/echart';

const CssBaseline: Components<Omit<Theme, 'components'>>['MuiCssBaseline'] = {
  defaultProps: {},
  styleOverrides: (theme) => ({
    '*, *::before, *::after': {
      margin: 0, // إزالة الهوامش الافتراضية
      padding: 0, // إزالة الحشوة الافتراضية
    },
    html: {
      scrollBehavior: 'smooth', // سلاسة التمرير
    },
    body: {
      fontVariantLigatures: 'none', // تعطيل الربط التلقائي بين الحروف
      backgroundColor: theme.palette.info.main, // لون خلفية الجسم
      ...scrollbar(theme), // تطبيق التمرير المخصص
    },
    ...echart(), // تكامل مع مكتبة ECharts
  }),
};

export default CssBaseline;
