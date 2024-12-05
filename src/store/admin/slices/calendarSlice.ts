// store/slices/calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface CalendarState {
  currentDate: string;
}

const initialState: CalendarState = {
  currentDate: dayjs().toISOString(), // تخزين التاريخ بصيغة ISO
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload; // حفظ التاريخ كسلسلة
    },
    setMonth: (state, action: PayloadAction<number>) => {
      const current = dayjs(state.currentDate).month(action.payload); // تحديث الشهر
      state.currentDate = current.toISOString(); // حفظه كسلسلة
    },
    setYear: (state, action: PayloadAction<number>) => {
      const current = dayjs(state.currentDate).year(action.payload); // تحديث السنة
      state.currentDate = current.toISOString(); // حفظه كسلسلة
    },
  },
});

export const { setDate, setMonth, setYear } = calendarSlice.actions;
export default calendarSlice.reducer;
