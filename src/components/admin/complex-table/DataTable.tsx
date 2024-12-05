import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import IconifyIcon from 'components/base/IconifyIcon';
import { LocalizationProvider, DatePicker, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
// import { GridLogicOperator } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'; // استيراد Grid المفقود
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { api } from 'API/api';
import ActionMenu from './ActionMenu';

interface Reservation {
  id: string;
  displayId?: string; // الحقل المضاف لصيغة العرض
  name: string;
  decorId: string;
  date: string;
  quantity: number;
  decorName: string;
  eventType: string;
  paymentMethod: string;
  paidAmount: number;
  totalAmount: number;
  status: string;
  notes?: string; // إضافة الملاحظات
}
interface Decoration {
  id: string;
  name: string;
}
interface TaskOverviewTableProps {
  searchText: string;
}
interface DecorationResponse {
  _id: string; // الحقل الذي يمثل معرف الديكور
  dec_name: string; // اسم الديكور
}

const RedPickersDay = styled(PickersDay)(({ theme }) => ({
  backgroundColor: theme.palette.info.darker,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));
const DataTable = ({ searchText }: TaskOverviewTableProps) => {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<Reservation | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // لإدارة حالة مربع الحوار
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null); // لتحديد الحجز الذي سيتم حذفه

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); // لتخزين الصفوف المختارة

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };
  // دالة لإظهار نافذة الحوار برسالة معينة
  const showDialog = (message: string) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogMessage('');
  };

  useEffect(() => {
    // Fetch reservations
    const fetchReservations = async () => {
      try {
        const response = await api.get('/receipts/admin');
        const formattedRows = response.data.map((row: Reservation, index: number) => ({
          ...row,
          displayId: `1-${index + 1}`,
        }));
        setRows(formattedRows);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        showDialog('حدث خطأ أثناء جلب بيانات الحجز.'); // استخدام setError هنا
        setLoading(false);
      }
    };

    // Fetch decorations
    const fetchDecorations = async () => {
      try {
        const response = await api.get('/decorations/name');
        const formattedDecorations = response.data.map((decor: DecorationResponse) => ({
          id: decor._id,
          name: decor.dec_name, // تأكد من استخدام الحقول الصحيحة
        }));
        setDecorations(formattedDecorations);
      } catch (err) {
        console.error('Error fetching decorations:', err);
      }
    };

    // استدعاء الدوال
    fetchReservations();
    fetchDecorations();
  }, []); // تم تعديل القوس لإغلاق الدالة بشكل صحيح

  const filteredRows = rows.filter((row) => {
    const searchValue = searchText.toLowerCase();
    return (
      row.name.toLowerCase().includes(searchValue) || // البحث بالاسم
      row.date.toLowerCase().includes(searchValue) || // البحث بالتاريخ
      row.decorName.toLowerCase().includes(searchValue) || // البحث باسم الديكور
      row.eventType.toLowerCase().includes(searchValue) || // البحث بنوع الحفل
      row.status.toLowerCase().includes(searchValue) // البحث بالحالة
    );
  });

  const handleDeleteSelectedRows = async () => {
    try {
      // حذف الصفوف المحددة
      await Promise.all(
        selectedRows.map((rowId) =>
          api
            .delete(`/receipts/${rowId}`)
            .catch((err) => console.error(`Error deleting row ${rowId}:`, err)),
        ),
      );

      // تحديث واجهة المستخدم
      setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]); // إعادة تعيين الصفوف المحددة
      showDialog('تم حذف الصفوف المحددة بنجاح!');
    } catch (err) {
      console.error('Error deleting selected rows:', err);
      showDialog('حدث خطأ أثناء حذف الصفوف.');
    }
  };

  // Edit action
  const handleEditClick = (row: Reservation) => {
    setCurrentRow(row);
    setOpenEditDialog(true);
  };

  const handleViewClick = (row: Reservation) => {
    setCurrentRow(row);
    setOpenViewDialog(true);
  };

  const handleDeleteClick = async (rowId: string) => {
    try {
      await api.delete(`/receipts/${rowId}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
      showDialog('تم حذف الحجز بنجاح!');
    } catch (err) {
      console.error('Error deleting reservation:', err);
      showDialog('فشل في حذف الحجز.');
    }
  };

  // Handle total amount and status change
  const handleFieldChange = (field: keyof Reservation, value: string | number) => {
    setCurrentRow((prev) => {
      if (!prev) return null; // الحماية من null
      const updatedRow: Reservation = { ...prev, [field]: value };

      // تحديث `totalAmount` بناءً على النوع والعدد
      if (field === 'eventType' || field === 'quantity') {
        const chairs = parseInt(updatedRow.quantity?.toString() || '0', 10) || 0;
        const eventType = updatedRow.eventType;

        let price = 0;
        if (['زفة', 'صبحية', 'حفلة'].includes(eventType)) {
          price = 4000;
        } else if (['عيد ميلاد', 'لمات مواليد', 'حفل تخرج'].includes(eventType)) {
          if (chairs === 100) price = 2000;
          else if (chairs > 100 && chairs <= 150) price = 2500;
          else if (chairs > 150 && chairs <= 200) price = 2700;
          else if (chairs > 200 && chairs <= 300) price = 3000;
          else price = (chairs * 2000) / 100;
        }
        updatedRow.totalAmount = price;
      }

      if (field === 'paidAmount') {
        // Check if paidAmount matches totalAmount
        updatedRow.status = value === updatedRow.totalAmount ? 'مؤكد' : 'مؤقت';
      }

      return updatedRow;
    });
  };

  // Handle reservation cancel
  const handleCancelReservation = () => {
    setCurrentRow((prev) => {
      if (!prev) return null; // الحماية من null
      return { ...prev, status: 'ملغية' };
    });
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await api.get('/reservations/reserved-dates');
        const reservedDates = response.data.map((date: string) =>
          format(new Date(date), 'yyyy-MM-dd'),
        );
        setBookedDates(reservedDates);
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    };
    fetchBookedDates();
  }, []);

  const handleEditSubmit = async () => {
    try {
      if (currentRow) {
        const newDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : currentRow.date;

        // تحقق إذا تم تغيير التاريخ
        const isDateChanged = newDate !== currentRow.date;

        // إذا تم تغيير التاريخ، قم بتحديث الحالة إلى "مؤجل"
        if (isDateChanged) {
          currentRow.status = 'مؤجلة';
        }

        console.log('Updating Reservation:', currentRow);
        await api.put(`/receipts/${currentRow.id}`, {
          name: currentRow.name,
          date: newDate,
          quantity: currentRow.quantity,
          decorId: currentRow.decorId, // إرسال معرف الديكور الجديد
          eventType: currentRow.eventType,
          paymentMethod: currentRow.paymentMethod,
          paidAmount: currentRow.paidAmount,
          totalAmount: currentRow.totalAmount,
          status: currentRow.status,
        });

        // تحديث البيانات محليًا مباشرة
        setRows((prev) =>
          prev.map((row) =>
            row.id === currentRow.id
              ? {
                  ...row,
                  ...currentRow,
                  date: newDate, // تحديث التاريخ
                  decorName:
                    decorations.find((decor) => decor.id === currentRow.decorId)?.name ||
                    currentRow.decorName, // تحديث اسم الديكور
                  status: currentRow.status, // تحديث الحالة
                }
              : row,
          ),
        );
        setOpenEditDialog(false);
        showDialog('تم تحديث معلومات الحجز بنجاح!');
      }
    } catch (err) {
      console.error('Error updating reservation:', err);
      showDialog('فشل في تحديث معلومات الحجز.');
    }
  };

  const renderDay = (pickersDayProps: PickersDayProps<Date>) => {
    const formattedDate = format(pickersDayProps.day, 'yyyy-MM-dd');
    const isReserved = bookedDates.includes(formattedDate);

    if (isReserved) {
      return (
        <RedPickersDay
          {...pickersDayProps}
          disabled
          sx={{
            backgroundColor: 'rgba(128, 128, 128, 0.3)',
            '&:hover': { backgroundColor: 'rgba(128, 128, 128, 0.5)' },
          }}
        />
      );
    }

    return <PickersDay {...pickersDayProps} />;
  };

  // إذا لم يكن اليوم محجوزًا، اعرض PickersDay العادي

  const columns: GridColDef[] = [
    {
      field: 'displayId',
      headerName: 'ID',
      editable: false,
      align: 'right',
      flex: 1,
      minWidth: 100,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 2 }}>
          ID
        </Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ paddingRight: 2 }} height={1} direction="column" justifyContent="center">
          <Typography variant="body2" fontWeight={600}>
            {params.value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'name',
      headerName: 'الاسم',
      editable: false,
      align: 'right',
      flex: 1.5,
      minWidth: 140,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 2 }}>
          الاسم
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'الحالة',
      headerAlign: 'left',
      align: 'left',
      editable: false,
      flex: 1.2,
      minWidth: 130,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 1 }}>
          الحالة
        </Typography>
      ),
      renderCell: (params) => {
        const status = params.value.toLowerCase();
        let color = '';
        let icon = '';

        if (status === 'مؤكد') {
          color = 'success.main';
          icon = 'ic:baseline-check-circle';
        } else if (status === 'مؤقت') {
          color = 'warning.main';
          icon = 'ic:baseline-error';
        } else if (status === 'ملغية') {
          color = 'error.main';
          icon = 'ic:baseline-cancel';
        } else if (status === 'مؤجلة') {
          color = 'secondary.main';
          icon = 'ic:baseline-watch-later'; // أيقونة للتأجيل
        }

        return (
          <Stack alignItems="center" spacing={0.8} height={1}>
            <IconifyIcon icon={icon} color={color} fontSize="h5.fontSize" />
            <Typography variant="body2" fontWeight={600}>
              {params.value}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'date',
      headerName: 'التاريخ',
      editable: false,
      align: 'right',
      flex: 1,
      minWidth: 140,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 2 }}>
          التاريخ
        </Typography>
      ),
    },
    {
      field: 'quantity',
      headerName: 'عدد الكراسي',
      editable: false,
      align: 'right',
      flex: 1,
      minWidth: 120,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 0 }}>
          عدد الكراسي
        </Typography>
      ),
    },
    {
      field: 'decorName',
      headerName: 'اسم الديكور',
      editable: false,
      align: 'right',
      flex: 1.2,
      minWidth: 160,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 2 }}>
          اسم الديكور
        </Typography>
      ),
    },
    {
      field: 'eventType',
      headerName: 'نوع الحفله',
      editable: false,
      align: 'right',
      flex: 1.2,
      minWidth: 130,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 2 }}>
          نوع الحفله
        </Typography>
      ),
    },
    {
      field: 'paidAmount',
      headerName: 'المبلغ المدفوع',
      editable: false,
      align: 'right',
      flex: 1.2,
      minWidth: 140,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 0 }}>
          المبلغ المدفوع
        </Typography>
      ),
    },
    {
      field: 'remainingAmount',
      headerName: 'المبلغ المتبقي',
      editable: false,
      align: 'right',
      flex: 1.2,
      minWidth: 120,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 0 }}>
          المبلغ المتبقي
        </Typography>
      ),
    },

    {
      field: 'totalAmount',
      headerName: 'السعر كاملا',
      editable: false,
      align: 'right',
      flex: 1.2,
      minWidth: 110,
      renderHeader: () => (
        <Typography variant="body2" color="text.disabled" fontWeight={500} sx={{ paddingRight: 0 }}>
          السعر كاملا
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'الإجراءات',
      headerAlign: 'left',
      align: 'right',
      editable: false,
      flex: 1,
      minWidth: 90,
      renderCell: (params) => (
        <ActionMenu
          onEdit={() => handleEditClick(params.row)}
          onDelete={() => {
            setReservationToDelete(params.row.id); // تخزين معرف الحجز الذي سيتم حذفه
            setConfirmDialogOpen(true); // فتح مربع الحوار
          }}
          onView={() => handleViewClick(params.row)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography>جاري تحميل البيانات...</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Stack dir="rtl" height="100%" width="100%">
        {selectedRows.length > 0 && (
          <IconifyIcon
            icon="mdi:delete"
            onClick={handleDeleteSelectedRows}
            sx={{
              position: 'absolute',
              top: 180,
              right: 76,
              fontSize: 25,
              color: 'neutral.main',
              cursor: 'pointer',
              '&:hover': {
                color: 'error.dark',
              },
            }}
          />
        )}
        <DataGrid
          density="standard"
          columns={columns}
          rows={filteredRows}
          rowHeight={52}
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          autosizeOptions={{
            includeOutliers: true,
            includeHeaders: false,
            outliersFactor: 1,
            expand: true,
          }}
          slots={{
            pagination: DataGridFooter,
          }}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)} // تحديث الصفوف المختارة
          pageSizeOptions={[4]}
        />
      </Stack>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)} // إغلاق مربع الحوار عند الضغط على إلغاء
      >
        <DialogContent>
          <Typography>هل تريد حذف هذا الحجز؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button
            onClick={async () => {
              if (reservationToDelete) {
                await handleDeleteClick(reservationToDelete); // استدعاء وظيفة الحذف
                setReservationToDelete(null); // إعادة تعيين الحجز
              }
              setConfirmDialogOpen(false); // إغلاق مربع الحوار
            }}
            color="error"
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle dir="rtl" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          تعديل الحجز
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {currentRow && (
            <Grid container spacing={4} dir="rtl">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الاسم"
                  value={currentRow.name}
                  onChange={(e) => setCurrentRow((prev) => ({ ...prev!, name: e.target.value }))}
                  fullWidth
                  variant="filled"
                  sx={{
                    mt: 6,
                    '& .MuiInputBase-root': {
                      paddingTop: 1, // تأكد من وجود مسافة كافية فوق النص
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      position: 'absolute',
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                      transformOrigin: 'top right',
                      transform: 'translateY(-50%)', // لضمان وضعية أفضل
                      pr: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="تاريخ الحجز"
                    value={selectedDate}
                    onChange={handleDateChange}
                    slots={{ day: renderDay }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'filled',
                        sx: {
                          mt: 6,
                          '& .MuiInputBase-root': {
                            paddingTop: 1, // تأكد من وجود مسافة كافية فوق النص
                          },
                        },
                        InputLabelProps: {
                          sx: {
                            position: 'absolute',
                            right: 0,
                            left: 'auto',
                            textAlign: 'right',
                            transformOrigin: 'top right',
                            transform: 'translateY(-50%)', // لضمان وضعية أفضل
                            pr: 1,
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="عدد الكراسي"
                  value={currentRow.quantity}
                  onChange={(e) =>
                    setCurrentRow((prev) => ({
                      ...prev!,
                      quantity: parseInt(e.target.value, 10),
                    }))
                  }
                  fullWidth
                  type="number"
                  variant="filled"
                  sx={{ mb: 2, mt: 2 }}
                  InputLabelProps={{
                    sx: {
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                      transformOrigin: 'right',
                      pr: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <InputLabel
                    sx={{
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                    }}
                  >
                    اسم الديكور
                  </InputLabel>
                  <Select
                    value={currentRow?.decorId || ''}
                    onChange={(e) =>
                      setCurrentRow((prev) => ({ ...prev!, decorId: e.target.value }))
                    }
                  >
                    {decorations.map((decor) => (
                      <MenuItem key={decor.id} value={decor.id}>
                        {decor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                    }}
                  >
                    نوع الحفل
                  </InputLabel>
                  <Select
                    value={currentRow.eventType || ''}
                    onChange={(e) => handleFieldChange('eventType', e.target.value)}
                  >
                    <MenuItem value="زفة">زفة</MenuItem>
                    <MenuItem value="صبحية">صبحية</MenuItem>
                    <MenuItem value="حفلة">حفلة</MenuItem>
                    <MenuItem value="عيد ميلاد">عيد ميلاد</MenuItem>
                    <MenuItem value="لمات مواليد">لمات مواليد</MenuItem>
                    <MenuItem value="حفل تخرج">حفل تخرج</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="المبلغ المدفوع"
                  value={currentRow.paidAmount}
                  onChange={(e) => handleFieldChange('paidAmount', parseFloat(e.target.value))}
                  fullWidth
                  type="number"
                  variant="filled"
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: {
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                      transformOrigin: 'right',
                      pr: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="المبلغ الإجمالي"
                  value={currentRow.totalAmount}
                  fullWidth
                  type="number"
                  variant="filled"
                  disabled
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: {
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                      transformOrigin: 'right',
                      pr: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الحالة"
                  value={currentRow.status}
                  fullWidth
                  variant="filled"
                  disabled
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: {
                      right: 0,
                      left: 'auto',
                      textAlign: 'right',
                      transformOrigin: 'right',
                      pr: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCancelReservation} color="error" variant="contained">
            إلغاء الحجز
          </Button>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary" variant="contained">
            إلغاء
          </Button>
          <Button onClick={handleEditSubmit} color="primary" variant="contained">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle dir="rtl" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          تفاصيل الحجز
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {currentRow && (
            <Grid container spacing={2} dir="rtl">
              <Grid item xs={12}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                  معلومات العميل
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  الاسم:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  تاريخ المناسبة:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  عدد الكراسي:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.quantity}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  اسم الديكور:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.decorName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                  تفاصيل الحجز
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  تصنيف المناسبة:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.eventType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  طريقة الدفع:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.paymentMethod}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  المبلغ المدفوع:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.paidAmount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  المبلغ الإجمالي:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.totalAmount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  حالة الحجز:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.status}
                </Typography>
              </Grid>
              {/* إضافة الملاحظات */}
              <Grid item xs={12}>
                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  الملاحظات:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentRow.notes || 'لا توجد ملاحظات'}{' '}
                  {/* عرض النص الافتراضي إذا لم توجد ملاحظات */}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => setOpenViewDialog(false)} color="primary" variant="contained">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
