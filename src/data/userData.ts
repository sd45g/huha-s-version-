// تعريف نوع المستخدم
export interface User {
  id: number | string; // حقل id
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

// بيانات المستخدمين الافتراضية
const users: User[] = [
  {
    id: 1, // إضافة رقم فريد
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '#1001', // إضافة رقم فريد
    name: 'ساره أبوشعالة',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
  },
];

export default users;
