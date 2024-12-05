// src/routes/paths.ts

// تعريف مسارات رئيسية ثابتة
export const rootPaths = {
  root: '/', // المسار الأساسي للرئيسية
  authRoot: 'authentication', // مسار مصادقة المستخدم
  adminRoot: 'admin', // مسار صفحات المدير
  clientRoot: 'client', // مسار صفحات الزبون
};

// تصدير المسارات لاستخدامها في ملفات أخرى
export default {
  // مسارات المصادقة (مشتركة)
  signin: `/${rootPaths.authRoot}/sign-in`,
  signup: `/${rootPaths.authRoot}/sign-up`,

  // مسارات المدير
  adminDashboard: `/${rootPaths.adminRoot}/dashboard`,
  AdminReservation: `/${rootPaths.adminRoot}/reservation/:decorationId`,
  adminDecoration: `/${rootPaths.adminRoot}/decoration`,
  adminReservationTable: `/${rootPaths.adminRoot}/reservation-table`,
  adminAdPage: `/${rootPaths.adminRoot}/ad-page`,

  // مسارات الزبون
  clientDashboard: `/${rootPaths.clientRoot}`,
  clientDecorations: `/${rootPaths.clientRoot}/decorations`, // مسار صفحة "ديكوراتي"
  clientReservations: `/${rootPaths.clientRoot}/reservations/:decorationId`, // مسار صفحة "الحجز"
  clientContact: `/${rootPaths.clientRoot}/contact`, // مسار صفحة "تواصل معنا"
  clientViewReservations: `/${rootPaths.clientRoot}/view-reservations`, // مسار صفحة "عرض الحجوزات"
};
