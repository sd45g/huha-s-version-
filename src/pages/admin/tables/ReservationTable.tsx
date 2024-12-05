import React from 'react';
import Box from '@mui/material/Box';
import ComplexTable from 'components/admin/complex-table/index'; // تأكد من مسار الاستيراد الصحيح

const ReservationTable = () => {
  return (
    <Box p={3}>
      <ComplexTable />
    </Box>
  );
};

export default ReservationTable;
