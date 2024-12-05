interface RowsProps {
  id: string; // افترضنا دائمًا أن `id` سيكون نصًا
  name: string;
  status: string;
  date: string;
  quantity: number;
  decorName: string;
  balance: number;
  eventType: string;
  paymentMethod: string;
  paidAmount: number;
  totalAmount: number;
}

export const rows: RowsProps[] = [
  {
    id: '#1001',
    name: 'سارة أبوشعالة',
    status: 'Approved',
    date: '2 Nov 2024',
    quantity: 220,
    balance: 1200,
    eventType: 'Wedding',
    decorName: 'Floral Decor',
    paymentMethod: 'Credit Card',
    paidAmount: 600,
    totalAmount: 1200,
  },
  {
    id: '#1002',
    name: 'محمد الكعبي',
    status: 'Approved',
    date: '20 Nov 2024',
    quantity: 150,
    balance: 800,
    eventType: 'Graduation',
    decorName: 'School Colors',
    paymentMethod: 'Cash',
    paidAmount: 400,
    totalAmount: 800,
  },
  {
    id: '#1003',
    name: 'علي القذافي',
    status: 'Disable',
    date: '25 Nov 2024',
    quantity: 100,
    balance: 500,
    eventType: 'Birthday',
    decorName: 'Balloon Theme',
    paymentMethod: 'Credit Card',
    paidAmount: 250,
    totalAmount: 500,
  },
  {
    id: '#1004',
    name: 'أمينة عيسى',
    status: 'Error',
    date: '10 Nov 2024',
    quantity: 90,
    balance: 400,
    eventType: 'BabyShower',
    decorName: 'Cute Decorations',
    paymentMethod: 'Bank Transfer',
    paidAmount: 200,
    totalAmount: 400,
  },
  {
    id: '#1005',
    name: 'هند المرغني',
    status: 'Approved',
    date: '18 Nov 2024',
    quantity: 300,
    balance: 2000,
    eventType: 'Wedding',
    decorName: 'Luxury Theme',
    paymentMethod: 'Cash',
    paidAmount: 1000,
    totalAmount: 2000,
  },
  {
    id: '#1006',
    name: 'زينب الكوني',
    status: 'Approved',
    date: '25 Nov 2024',
    quantity: 200,
    balance: 1500,
    eventType: 'Zaffa',
    decorName: 'Traditional Setup',
    paymentMethod: 'Credit Card',
    paidAmount: 750,
    totalAmount: 1500,
  },
  {
    id: '#1007',
    name: 'ليلى الدرسي',
    status: 'Disable',
    date: '30 Nov 2024',
    quantity: 50,
    balance: 300,
    eventType: 'Sabahiya',
    decorName: 'Morning Decorations',
    paymentMethod: 'Cash',
    paidAmount: 150,
    totalAmount: 300,
  },
];
