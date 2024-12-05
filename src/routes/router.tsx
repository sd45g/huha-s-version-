// src/routes/router.tsx

import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import PrivateRoute from './PrivateRoute';

const App = lazy(() => import('App'));

// تخطيط وتصميمات المدير
const AdminLayout = lazy(() => import('layouts/admin/main-layout'));
const Dashboard = lazy(() => import('pages/admin/dashboard/Dashboard'));
const Reservation = lazy(() => import('pages/admin/reservation/Reservation'));
const Decoration = lazy(() => import('pages/admin/decorations/DecorationsPage'));
const ReservationTable = lazy(() => import('pages/admin/tables/ReservationTable'));
const AdPage = lazy(() => import('pages/admin/Ads/adPage'));

// تخطيط وتصميمات الزبون
const ClientLayout = lazy(() => import('layouts/client/main-layout'));
const ClientDashboard = lazy(() => import('pages/client/ClientDashboard'));
const ClientContact = lazy(() => import('pages/client/ClientContact')); // إضافة الصفحة الجديدة
const ClientDecoration = lazy(() => import('pages/client/ClientDecoration')); // إضافة الصفحة الجديدة
const ClientReservations = lazy(() => import('pages/client/ClientReservations')); // إضافة الصفحة الجديدة
const ViewReservations = lazy(() => import('pages/client/ViewReservations'));

// صفحات المصادقة
const AuthLayout = lazy(() => import('layouts/client/auth-layout'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));

// صفحة الخطأ 404
const Page404 = lazy(() => import('pages/errors/Page404'));

// مكونات التحميل
import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      // توجيه الجذر إلى واجهة الزبون بشكل افتراضي
      {
        path: '/',
        element: <Navigate to="/client" replace />,
      },

      // تعيين ClientLayout كصفحة افتراضية للمسار الجذري (`/`)
      {
        path: rootPaths.clientRoot,
        element: (
          <ClientLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ClientLayout>
        ),
        children: [
          {
            index: true,
            element: <ClientDashboard />,
          },
          {
            path: paths.clientDecorations, // مسار صفحة الديكورات
            element: <ClientDecoration />,
          },
          {
            path: paths.clientReservations, // مسار صفحة الحجوزات
            element: (
              <PrivateRoute role="customer">
                <ClientReservations />
              </PrivateRoute>
            ),
          },
          {
            path: paths.clientContact, // مسار صفحة تواصل معنا
            element: <ClientContact />,
          },
          {
            path: paths.clientViewReservations, // مسار صفحة "عرض الحجوزات"
            element: <ViewReservations />,
          },
        ],
      },

      // مسارات المصادقة (مشتركة)
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.signin,
            element: <SignIn />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
        ],
      },

      // مسارات المدير
      {
        path: rootPaths.adminRoot,
        element: (
          <PrivateRoute role="admin">
            <Suspense fallback={<PageLoader />}>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            path: paths.adminDashboard,
            element: <Dashboard />,
          },
          {
            path: paths.AdminReservation,
            element: <Reservation />,
          },
          {
            path: paths.adminDecoration,
            element: <Decoration />,
          },
          {
            path: paths.adminReservationTable,
            element: <ReservationTable />,
          },
          {
            path: paths.adminAdPage,
            element: <AdPage />,
          },
        ],
      },

      // صفحة الخطأ 404
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/' });

export default router;
