import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// يُستخدم لإضافة عناصر تزيينية إلى حقول الإدخال، مثل أيقونة أو نص مساعد يظهر بجانب حقل الإدخال.
//  هذا الملف يحتوي على تخصيصات لتحديد اللون وحجم النص، مما يجعله متناسقًا مع تصميم المشروع.
//  يُستخدم عادةً لتقديم تلميحات بصرية بجانب الحقل، مثل عملة أو وحدة قياس.

const InputAdornment: Components<Omit<Theme, 'components'>>['MuiInputAdornment'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: '0 !important',
      color: theme.palette.text.primary,
      fontSize: theme.typography.h5.fontSize,
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right', // محاذاة النص إلى اليمين لكي يكون متوافقًا مع النص العربي.

      '&.MuiInputAdornment-sizeSmall': {
        '& .MuiBox-root': {
          fontSize: theme.typography.h6.fontSize,
        },
      },
    }),
    positionStart: ({ theme }) => ({
      paddingRight: theme.spacing(1),
    }),
    positionEnd: ({ theme }) => ({
      paddingRight: theme.spacing(1),
    }),
  },
};

export default InputAdornment;
