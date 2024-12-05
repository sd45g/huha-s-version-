import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
import customShadows from 'theme/shadows';
// هو عنصر يُستخدم لإنشاء صندوق يحتوي على محتوى بواجهة واضحة. يساعد في تجميع العناصر في صندوق، ويعزز ترتيب الواجهة. يستخدم لتحسين تجربة العرض وإبراز المكونات مثل البطاقات والقوائم.

const Paper: Components<Omit<Theme, 'components'>>['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3.5), // حشوة حول العنصر
      backgroundColor: theme.palette.info.lighter, // لون خلفية العنصر
      borderRadius: theme.shape.borderRadius * 5, // جعل الحواف مستديرة
      boxShadow: 'none', // إزالة الظلال الافتراضية

      '&.MuiMenu-paper': {
        padding: 0, // إزالة الحشوة للعناصر التي تحتوي على القوائم
        boxShadow: customShadows[0], // إضافة ظل مخصص للقوائم
        borderRadius: theme.shape.borderRadius * 2.5, // جعل الحواف مستديرة
      },
    }),
  },
};

export default Paper;
