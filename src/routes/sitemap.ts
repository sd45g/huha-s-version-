// src/routes/sitemap.tsx

import paths from './paths';

export interface SubMenuItem {
  subheader: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: number | string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

// مسارات القائمة الجانبية للمدير
const adminSitemap: MenuItem[] = [
  {
    id: 1,
    subheader: 'لوحة التحكم',
    path: paths.adminDashboard,
    icon: 'material-symbols:dashboard', // أيقونة تشير إلى لوحة التحكم
    active: true,
  },
  {
    id: 2,
    subheader: 'الديكورات',
    path: paths.adminDecoration,
    icon: 'mdi:palette', // أيقونة تعبر عن الألوان أو التصميم
    active: true,
  },
  {
    id: 3,
    subheader: 'الحجوزات',
    path: paths.adminReservationTable,
    icon: 'mdi:table', // أيقونة تمثل الجداول
    active: true,
  },
  {
    id: 4,
    subheader: 'ادارة الاعلانات',
    path: paths.adminAdPage,
    icon: 'material-symbols:ads-click', // أيقونة تعبر عن الإعلانات
    active: true,
  },
];

// مسارات القائمة الجانبية للزبون
const clientSitemap: MenuItem[] = [
  {
    id: 1,
    subheader: 'الصفحة الرئيسية',
    path: paths.clientDashboard,
    icon: 'mdi:home',
    active: true,
  },
  {
    id: 2,
    subheader: 'الديكورات',
    path: paths.clientDecorations, // تم إضافة مسار "ديكوراتي"
    icon: 'mdi:palette',
    active: true,
  },
  {
    id: 3,
    subheader: 'تواصل معنا',
    path: paths.clientContact, // تم إضافة مسار "تواصل معنا"
    icon: 'mdi:email',
    active: true,
  },
];

export { adminSitemap, clientSitemap };
