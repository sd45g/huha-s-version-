import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/admin/store'; // تعديل المسار حسب مشروعك
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import IconifyIcon from 'components/base/IconifyIcon';
import { api } from 'API/api';
// تعريف واجهة الحجز
interface Reservation {
  id: string; // مطابق لنوع `id` في البيانات
  name: string;
  status: string;
  date: string;
  quantity: number;
  decorName: string;
  eventType: string;
  paymentMethod: string; // طريقة الدفع
  paidAmount: number; // تعديل النوع ليكون رقمًا
  remainingAmount: number;
  totalAmount: number; // تعديل النوع ليكون رقمًا
}

const ViewReservations = () => {
  const { user } = useSelector((state: RootState) => state.auth); // جلب بيانات المستخدم من Redux
  const [reservations, setReservations] = useState<Reservation[]>([]); // حالة الحجوزات
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  // const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  // const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);
  // const [updatedDecorName, setUpdatedDecorName] = useState<string>('');
  // const [decorations, setDecorations] = useState<Decoration[]>([]); // قائمة الديكورات

  useEffect(() => {
    // جلب الحجوزات
    const fetchReservations = async () => {
      if (user?.id) {
        try {
          const response = await api.get('/receipts/customer');
          setReservations(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching reservations:', err);
          setError('فشل في جلب الحجوزات.');
          setLoading(false);
        }
      }
    };

    // جلب أسماء الديكورات

    fetchReservations();
  }, [user]);

  if (loading) {
    return (
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Typography variant="h6" color="text.secondary">
          جاري تحميل البيانات...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, direction: 'rtl' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        حجوزاتي
      </Typography>

      {reservations.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">اسم المستلم</TableCell>
                <TableCell align="center">التاريخ</TableCell>
                <TableCell align="center">عدد الكراسي</TableCell>
                <TableCell align="center">نوع الحفل</TableCell>
                <TableCell align="center">الديكور</TableCell>
                <TableCell align="center">طريقة الدفع</TableCell>
                <TableCell align="center">الحاله</TableCell>
                <TableCell align="center">المبلغ المدفوع</TableCell>
                <TableCell align="center">المبلغ المتبقي</TableCell>
                <TableCell align="center">المبلغ الإجمالي</TableCell>
                {/* <TableCell align="center">إجراءات</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell align="right">{reservation.name}</TableCell>
                  <TableCell align="center">{reservation.date}</TableCell>
                  <TableCell align="center">{reservation.quantity}</TableCell>
                  <TableCell align="center">{reservation.eventType}</TableCell>
                  <TableCell align="center">{reservation.decorName || 'غير محدد'}</TableCell>
                  <TableCell align="center">{reservation.paymentMethod}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', // لجعل التوسيط العمودي يعمل بشكل صحيح
                      }}
                    >
                      <Typography
                        color={
                          reservation.status === 'مؤكد'
                            ? 'green'
                            : reservation.status === 'مؤقت'
                              ? 'orange'
                              : 'gray'
                        }
                      >
                        {reservation.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {reservation.paidAmount.toLocaleString('en-US')} د
                  </TableCell>{' '}
                  <TableCell align="center">
                    {reservation.remainingAmount.toLocaleString('en-US')} د
                  </TableCell>{' '}
                  <TableCell align="center">
                    {reservation.totalAmount.toLocaleString('en-US')} د
                  </TableCell>{' '}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Typography variant="h6" color="text.secondary">
            لا توجد حجوزات
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ViewReservations;
