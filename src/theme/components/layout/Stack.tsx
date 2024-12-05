import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// يُستخدم لتخصيص مكون Stack من مكتبة Material UI،
// Flexboxوالذي يُسهل ترتيب العناصر بشكلٍ مرن باستخدام خاصية

const Stack: Components<Omit<Theme, 'components'>>['MuiStack'] = {
  defaultProps: {
    useFlexGap: true, // استخدام خاصية flex gap للمسافة بين العناصر
    direction: 'row', // ترتيب العناصر أفقيًا
  },
};

export default Stack;
