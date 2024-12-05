import { Theme } from '@mui/material';

// يندمج مع CssBaseline، الذي يستدعي scrollbar(theme) لتطبيق هذا التنسيق على مستوى المشروع بأكمله.
// يضيف لمسة تصميمية موحدة لشريط التمرير تتماشى مع الألوان المستخدمة في المشروع، وخاصةً في اللوحة الجانبية أو النوافذ التمريرية الصغيرة.

// تخصيص شريط التمرير (Scrollbar) باستخدام ألوان وخصائص محددة

const scrollbar = (theme: Theme) => ({
  // دعم المتصفحات التي تعتمد على Firefox
  '@supports (-moz-appearance:none)': {
    scrollbarColor: `${theme.palette.grey[300]} transparent`, // لون شريط التمرير
  },
  '*::-webkit-scrollbar': {
    width: 5, // عرض شريط التمرير
    height: 5, // ارتفاع شريط التمرير
    WebkitAppearance: 'none', // إزالة المظهر الافتراضي
    backgroundColor: 'transparent', // لون الخلفية
    visibility: 'hidden', // إخفاء شريط التمرير
  },
  '*::-webkit-scrollbar-track': {
    margin: 0, //إزاحة الشريط ى
  },
  '*::-webkit-scrollbar-thumb': {
    borderRadius: 3, // تدوير زوايا شريط التمرير
    backgroundColor: theme.palette.neutral.light, // لون شريط التمرير
    visibility: 'hidden', // إخفاء شريط التمرير بشكل مبدئي
  },
});

export default scrollbar;
