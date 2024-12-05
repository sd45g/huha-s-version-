// src/layouts/client/main-layout/index.tsx

import { PropsWithChildren } from 'react';

import Stack from '@mui/material/Stack';
import Footer from './footer';
import Topbar from '../../../pages/admin/dashboard';

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack direction="column" flexGrow={1} width={1}>
      {/* شريط التنقل العلوي */}
      <Topbar />

      {/* محتوى الصفحة الرئيسي */}
      <Stack component="main" direction="column" flexGrow={1} width={1} mt={10}>
        {children} {/* عرض أي محتوى يتم تمريره مباشرة كـ children */}
      </Stack>

      {/* التذييل */}
      <Footer />
    </Stack>
  );
};

export default ClientLayout;
