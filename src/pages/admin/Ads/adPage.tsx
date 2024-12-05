import React from 'react';
import { Paper } from '@mui/material';
import AdvertisementList from 'components/admin/AdComponent/AdvertisementList'; // تأكد من أن المسار صحيح

const AdPage: React.FC = () => {
  return (
    <Paper
      elevation={3} // للتحكم في الظل
      style={{
        padding: '20px', // مسافة داخلية
        margin: '20px auto', // تخصيص الهوامش
        maxWidth: '1000px', // تحديد العرض
      }}
    >
      {/* وضع المكون AdvertisementList داخل Paper */}
      <AdvertisementList />
    </Paper>
  );
};

export default AdPage;
