import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// تعريف إعدادات الأنماط المخصصة لمكون AvatarGroup.
const AvatarGroup: Components<Omit<Theme, 'components'>>['MuiAvatarGroup'] = {
  styleOverrides: {
    root: {}, // تخصيص الأنماط للجذر (فارغ هنا).
    avatar: ({ theme }) => ({
      border: 3, // ضبط حجم الحدود ليكون 3 بيكسل.
      marginLeft: theme.spacing(-2), // ضبط الهامش الأيسر ليكون سالب لزيادة تداخل الصور الرمزية.
      borderStyle: 'solid', // نمط الحدود صلب.
      borderColor: theme.palette.info.lighter, // ضبط لون الحدود.
      fontSize: theme.typography.body2.fontSize, // ضبط حجم الخط.
      '&:nth-of-type(1)': {
        // تخصيص أول صورة رمزية.
        zIndex: 99, // رفع ترتيب العرض للصورة الأولى لتكون أعلى.
        backgroundColor: theme.palette.info.dark, // تعيين لون الخلفية للون داكن.
      },
    }),
  },
};

export default AvatarGroup; // تصدير التخصيص لمكون AvatarGroup للاستخدام في مكان آخر.
