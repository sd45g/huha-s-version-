import { Outlet } from 'react-router-dom'; // استيراد المخرج (Outlet) من مكتبة react-router-dom.
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/admin/store';
import { useEffect } from 'react';

const App = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user, role, navigate]);
  return <Outlet />; // عرض المكونات الفرعية (child components) بناءً على المسار الحالي.
};

export default App; // تصدير المكون App للاستخدام في أجزاء أخرى من المشروع.
