import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import router from 'routes/router';
import { theme } from 'theme/theme';
import { Provider } from 'react-redux'; // استيراد Provider من react-redux
import store, { persistor } from 'store/admin/store'; // استيراد store من المسار الصحيح
import { PersistGate } from 'redux-persist/integration/react'; // استيراد PersistGate

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BreakpointsProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </BreakpointsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
