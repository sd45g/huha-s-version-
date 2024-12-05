import { Theme } from '@mui/material'; // استيراد نوع `Theme` من مكتبة Material UI لاستخدامه في تخصيص الأنماط.
import { Components } from '@mui/material/styles/components'; // استيراد نوع `Components` لتعريف الأنماط المخصصة للمكونات.

// تعريف إعدادات الأنماط المخصصة لمكون ButtonBase.
const ButtonBase: Components<Omit<Theme, 'components'>>['MuiButtonBase'] = {
  defaultProps: {
    disableRipple: false, // تمكين تأثير التموج عند الضغط على الزر.
  },
};

export default ButtonBase; // تصدير التخصيص لمكون ButtonBase للاستخدام في مكان آخر.
