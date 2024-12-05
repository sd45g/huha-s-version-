// استيراد تعريف وظيفة التكوين من Vite
import { defineConfig } from 'vite';
// استيراد إضافة React لتمكين الميزات الخاصة بـ React في Vite
import react from '@vitejs/plugin-react';
// استيراد إضافة لإدارة مسارات TypeScript
import tsconfigPaths from 'vite-tsconfig-paths';
// استيراد إضافة للتحقق من الشيفرة مثل التحقق من TypeScript و ESLint
import checker from 'vite-plugin-checker';

// تصدير إعدادات Vite، حيث يتم تحديد إعدادات المشروع
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    checker({
      typescript: true, // التحقق من TypeScript
    }),
  ],
  preview: {
    port: 5000, // المنفذ الافتراضي لمشاهدة التطبيق
  },
  server: {
    host: '0.0.0.0', // يتيح الوصول من جميع الشبكات
    port: 3000, // المنفذ الافتراضي لخادم التطوير
    proxy: {
      '/api': {
        target: 'https://almohra-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: '/', // مسار الأساس للتطبيق
  build: {
    outDir: 'dist', // Ensure this matches Vercel's output directory
  },
});
