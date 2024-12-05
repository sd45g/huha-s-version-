import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import complexTableReducer from 'store/admin/slices/complexTableSlice';
import trendingNftsReducer from 'store/admin/slices/trendingNftsSlice';
import calendarReducer from 'store/admin/slices/calendarSlice';
import reservationReducer from 'store/admin/slices/reservationSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  // whitelist: ['auth'], // تحديد القطع التي تريد تخزينها
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    complexTable: complexTableReducer,
    trendingNfts: trendingNftsReducer,
    calendar: calendarReducer,
    reservation: reservationReducer,
    reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // تجاهل الإجراءات المتعلقة بـ persist
      },
    }),
});

// تعريف RootState بناءً على store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
