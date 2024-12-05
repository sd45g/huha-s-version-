import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from 'store/admin/slices/complexTableSlice';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import DataTable from './DataTable';
import { RootState } from '/store/admin/store';
import { ChangeEvent } from 'react';

const ComplexTable = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.complexTable.searchText);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <Box component={Paper} px={0} height={{ xs: 500, sm: 600 }} dir="rtl">
      {' '}
      {/* زيادة الارتفاع هنا */}
      <Stack
        px={3.5}
        spacing={{ xs: 2, sm: 0 }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Typography variant="h4" textAlign={{ xs: 'center', sm: 'right' }}>
          جدول الحجوزات
        </Typography>

        <TextField
          variant="filled"
          size="small"
          placeholder="ابحث هنا"
          value={searchText}
          onChange={handleInputChange}
          sx={{
            mx: { xs: 'auto', sm: 'initial' },
            width: 1,
            maxWidth: { xs: 300, sm: 220 },
            textAlign: 'right',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Box mt={{ xs: 1.25, sm: 3 }} height="calc(100% - 64px)">
        {' '}
        {/* تحديث الارتفاع هنا بشكل نسبي */}
        <DataTable searchText={searchText} />
      </Box>
    </Box>
  );
};

export default ComplexTable;
