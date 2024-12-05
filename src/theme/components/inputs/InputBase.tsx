import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

// و مكون أساسي يمكن تخصيصه بسهولة لتصميم حقول الإدخال. يتمتع بالقدرة على التحكم في ألوان الحدود والخلفية، والتعامل مع حجم الحقل، بالإضافة إلى دعم خيارات النص التجريبي. يستخدم في المشروع كأساس لبناء مكونات إدخال ذات تصميم متماسك.
const InputBase: Components<Omit<Theme, 'components'>>['MuiInputBase'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: 1, // تعيين عرض الحدود
      borderStyle: 'solid', // تعيين نوع الحدود إلى خط صلب
      borderColor: theme.palette.info.darker, // لون الحدود الأساسي
      borderRadius: theme.shape.borderRadius, // جعل الحواف مستديرة
      backgroundColor: `${theme.palette.info.lighter} !important`, // لون الخلفية مع تأكيد الأهمية
      fontSize: theme.typography.subtitle2.fontSize, // حجم الخط
      color: theme.palette.text.secondary, // لون النص الأساسي
      padding: theme.spacing(1.45, 2), // المسافة الداخلية بين النص والحواف
      direction: 'rtl', // تغيير اتجاه النص إلى اليمين ليتناسب مع اللغة العربية (RTL).
      textAlign: 'right', // محاذاة النص إلى اليمين لكي يكون متوافقًا مع النص العربي.

      '&:focus-within': {
        borderColor: theme.palette.primary.main, // لون الحدود عند التركيز
      },

      '&:before, &:after': {
        display: 'none', // إخفاء الخطوط الافتراضية
      },
    }),
    colorSecondary: ({ theme }) => ({
      backgroundColor: `${theme.palette.info.dark} !important`,
    }),
    sizeSmall: ({ theme }) => ({
      padding: theme.spacing(1, 1.25), // مسافات صغيرة لداخل الحقل
      paddingLeft: `${theme.spacing(1.75)} !important`, // مسافة أكبر من اليسار
      fontSize: theme.typography.caption.fontSize, // حجم أصغر للنص
    }),
    input: ({ theme }) => ({
      '&::placeholder': {
        color: theme.palette.text.secondary, // لون النص التجريبي (Placeholder)
        opacity: 1, // ظهور كامل للنص التجريبي
      },
    }),
    inputSizeSmall: ({ theme }) => ({
      marginBottom: theme.spacing(0.2), // مسافة بسيطة من الأسفل
    }),
  },
};

export default InputBase;
