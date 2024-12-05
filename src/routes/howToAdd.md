مثال لإضافة صفحة جديدة
لإضافة صفحة جديدة مثل صفحة "الأحداث" (Events)، اتبعي هذه الخطوات:

في paths.js، أضيفي مسار جديد:

javascript
نسخ الكود
export const rootPaths = {
  ...rootPaths,
  eventsRoot: 'events', // مسار جديد للأحداث
};

export default {
  ...paths,
  events: `/${rootPaths.eventsRoot}`, // مسار صفحة الأحداث
};
في routes.js، أضيفي صفحة جديدة في routes:

javascript
نسخ الكود
const Events = lazy(() => import('pages/events/Events')); // تحميل صفحة الأحداث

export const routes = [
  ...routes,
  {
    path: rootPaths.eventsRoot,
    element: <MainLayout><Events /></MainLayout>,
  },
];
في sitemap.js، أضيفي رابطًا في القائمة الجانبية:

javascript
نسخ الكود
sitemap.push({
  id: 8,
  subheader: 'الأحداث',
  path: paths.events,
  icon: 'ic:event-icon',
});
بهذا الشكل، ستكون صفحة "الأحداث" جاهزة ويمكن الوصول إليها من القائمة الجانبية.
------------------------------------------------------
ستحتاج إلى إضافة منطق للتحقق من تسجيل الدخول عند الوصول إلى صفحات العميل وصفحات الإداريين. في هذه الحالة، من الأفضل استخدام حماية المسارات (Route Protection) لمنع الوصول غير المصرح به إلى الصفحات الخاصة.

كيفية إضافة الحماية للمسارات
يمكننا إضافة حراسة على المسارات باستخدام مكونات الحماية (Protected Routes) التي تتحقق من حالة تسجيل الدخول، وتوجه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً دخوله.

خطوات تنفيذ الحماية للمسارات
إنشاء مكون ProtectedRoute:

هذا المكون يقوم بالتحقق مما إذا كان المستخدم قد قام بتسجيل الدخول.
إذا لم يكن مسجلاً دخوله، يتم توجيهه إلى صفحة تسجيل الدخول.
إذا كان مسجلاً دخوله، يتم السماح له بالوصول إلى الصفحة.
فصل الحماية بين العميل والإداري:

يمكن تخصيص حماية المسارات لتحديد ما إذا كان المستخدم إداريًا أو عميلًا.
مثلًا، إذا كان المستخدم إداريًا، يمكن السماح له بالوصول فقط إلى الصفحات الخاصة بالإداريين.
مثال على إنشاء مكون ProtectedRoute
typescript
نسخ الكود
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// مكون الحماية العام
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, isAdmin = false, requireAdmin = false }) => {
  // التحقق من حالة تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" />;
  }

  // التحقق من حالة المستخدم إذا كانت الصفحة تتطلب إذنًا إداريًا
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/not-authorized" />; // توجيه المستخدم إذا لم يكن لديه الصلاحيات
  }

  return <Outlet />;
};

export default ProtectedRoute;