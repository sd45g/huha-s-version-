import { Theme } from '@mui/material'; // استيراد نوع Theme من مكتبة MUI، والذي يحتوي على خصائص القيم المختلفة المستخدمة في التخصيص.
import { Components } from '@mui/material/styles/components'; // استيراد نوع Components من MUI، الذي يساعد في تخصيص مكونات واجهة المستخدم.

const AppBar: Components<Omit<Theme, 'components'>>['MuiAppBar'] = {
  // تعريف مكون AppBar باستخدام تخصيص مكون MuiAppBar داخل النظام.
  styleOverrides: {
    // بداية التخصيص لأسلوب (CSS) المكون.
    colorPrimary: {
      // تخصيص الأسلوب للمكون الذي يستخدم اللون الأساسي (primary).
      backgroundColor: 'transparent', // جعل خلفية شريط التطبيق (AppBar) شفافة.
      borderRadius: 0, // إزالة الحواف المدورة (التدوير) من شريط التطبيق.
      boxShadow: 'none', // إزالة الظل الذي يظهر تحت شريط التطبيق.
    },
  },
};

export default AppBar; // تصدير التخصيص لاستخدامه في أماكن أخرى من التطبيق.
