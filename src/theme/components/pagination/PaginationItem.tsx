import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// هو عنصر يمثل أزرار التحكم في الترقيم. التصميم هنا يضيف لونًا مميزًا للخلفية عند التحديد، ويسمح بتغيير لون النص وفق حالة الاختيار.
//  يُستخدم للتحكم في صفحات المحتوى عند الحاجة إلى عرض طويل في الواجهة.

const PaginationItem: Components<Omit<Theme, 'components'>>['MuiPaginationItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary, // لون النص الرئيسي
      fontSize: theme.typography.body2.fontSize, // حجم النص
      '&.Mui-selected': {
        color: theme.palette.info.lighter, // لون النص عند الاختيار
        backgroundColor: theme.palette.primary.main, // لون الخلفية عند الاختيار
        '&:hover': { backgroundColor: theme.palette.primary.main }, // استمرارية اللون عند التحويم
      },
    }),
  },
};

export default PaginationItem;
