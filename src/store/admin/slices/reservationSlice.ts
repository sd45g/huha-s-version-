import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReservationState {
  numberOfSeats: number; // عدد الكراسي
  phoneNumber: string; // رقم الهاتف
  category: 'Wedding' | 'Graduation' | 'BabyShower' | 'Birthday' | 'Corporate' | 'Other'; // نوع الحفل
  status: 'Temporary' | 'Confirmed'; // حالة الحجز
  recipientName: string; // اسم المستلم
  price: number; // السعر الإجمالي
  paymentMethod: 'Online' | 'Cash'; // طريقة الدفع
  amountPaid: number; // المبلغ المدفوع
  amountRemaining: number; // المبلغ المتبقي
  eventDate?: string; // تاريخ الحفل (اختياري)
  UserID?: string; // معرف المستخدم (اختياري)
  DecorationID?: string; // معرف الديكور (اختياري)
}

const initialState: ReservationState = {
  numberOfSeats: 0,
  phoneNumber: '',
  category: 'Wedding',
  status: 'Temporary',
  recipientName: '',
  price: 0,
  paymentMethod: 'Cash',
  amountPaid: 0,
  amountRemaining: 0,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setFieldValue: <T extends keyof ReservationState>(
      state: ReservationState,
      action: PayloadAction<{ field: T; value: ReservationState[T] }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;

      // تحديث السعر بناءً على عدد الكراسي ونوع الحفل
      if (field === 'numberOfSeats' || field === 'category') {
        const seats = field === 'numberOfSeats' ? (value as number) : state.numberOfSeats;
        const category = field === 'category' ? (value as string) : state.category;

        if (category === 'Wedding') {
          state.price = 4000; // سعر ثابت للزفاف
        } else if (
          category === 'Graduation' ||
          category === 'BabyShower' ||
          category === 'Birthday'
        ) {
          if (seats < 100) {
            state.price = (seats * 2000) / 100;
          } else if (seats <= 150) {
            state.price = 2500;
          } else if (seats <= 200) {
            state.price = 2700;
          } else if (seats <= 300) {
            state.price = 3000;
          }
        } else {
          state.price = 0; // الافتراضي
        }
      }

      // تحديث المبلغ المتبقي وحالة الحجز
      if (field === 'amountPaid' || field === 'price') {
        state.amountRemaining = (state.price || 0) - (state.amountPaid || 0);
        state.status = state.amountPaid >= state.price ? 'Confirmed' : 'Temporary';
      }
    },
  },
});

export const { setFieldValue } = reservationSlice.actions;
export default reservationSlice.reducer;
