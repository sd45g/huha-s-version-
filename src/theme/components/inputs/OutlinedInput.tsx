import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
// يُستخدم لتوفير حقل إدخال بحدود بارزة. يتميز بقدرته على تقديم تصميم ذو حواف مستديرة،
// مع ضبط المسافات الداخلية بناءً على حجم الحقل. يستخدم في المشروع لإضفاء طابع أنيق على حقول الإدخال، خاصةً تلك التي تتطلب تمييز الحدود الخارجية.
const OutlinedInput: Components<Omit<Theme, 'components'>>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 3.25, // جعل الحواف مستديرة بدرجة أكبر
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right',
    }),
    input: {
      padding: 0, // إزالة الحشو الداخلي للنص
    },
    sizeSmall: ({ theme }) => ({
      paddingRight: theme.spacing(1.25), // مسافة صغيرة من جهة اليمين لحجم صغير
    }),
  },
};

export default OutlinedInput;
