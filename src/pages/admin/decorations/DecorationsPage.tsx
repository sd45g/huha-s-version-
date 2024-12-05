import React from 'react';
import { Box, Typography } from '@mui/material';
import DecorationList from 'components/admin/DesignCards/DecorationList'; // تأكد من مسار الاستيراد الصحيح

const DecorationsPage: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom textAlign="center">
        قائمة الديكورات
      </Typography>
      <DecorationList />
    </Box>
  );
};

export default DecorationsPage;
