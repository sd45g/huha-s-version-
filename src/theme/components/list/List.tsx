import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// يُستخدم لتنظيم العناصر ضمن مجموعة، كقائمة من الروابط أو الإجراءات. إضافة الحشوة تعزز من تنظيم العناصر وجعلها أكثر تمييزًا. يستخدم في المشروع كعنصر أساسي لعرض القوائم بشكل منظم.

const List: Components<Omit<Theme, 'components'>>['MuiList'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1), // حشوة بسيطة حول القائمة
    }),
  },
};

export default List;
