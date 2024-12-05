import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://almohra-backend.vercel.app/api',
  withCredentials: true,
});

// إضافة Interceptor لتحديث الهيدر تلقائيًا قبل كل طلب
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // جلب التوكن من التخزين المحلي
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // تعيين التوكن في الهيدر
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error); // في حالة حدوث خطأ أثناء الإعداد
  },
);
