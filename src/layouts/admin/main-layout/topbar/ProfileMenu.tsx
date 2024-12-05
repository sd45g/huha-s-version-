import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/admin/store';
import { useNavigate } from 'react-router-dom';
import { resetAuthState } from 'store/admin/slices/authSlice';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import ProfileImage from 'assets/images/avatars/avatar1.png';
import Alert from '@mui/material/Alert';
import { AxiosError } from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem as DropdownItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { api } from 'API/api';

interface MenuItems {
  id: number;
  title: string;
  icon: string;
  action?: () => void; // مخصص لتحديد الإجراءات (مثلاً: تسجيل الخروج)
}

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // حالة للأخطاء
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // حالة للرسائل الناجحة
  const [openAddDialog, setOpenAddDialog] = useState(false); // حالة فتح مربع الحوار
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    role: '', // القيمة الافتراضية
  }); // تخزين بيانات المدير الجديد

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(resetAuthState());
    localStorage.removeItem('authToken');
    navigate('/');
    handleProfileMenuClose();
  };
  const handleAddUser = async () => {
    try {
      await api.post('/users/register', {
        user_name: newUser.name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        password: newUser.password,
        role: newUser.role,
      });
      setSuccessMessage('تم إضافة المستخدم بنجاح!'); // ضبط رسالة النجاح
      setOpenAddDialog(false); // إغلاق نافذة الإضافة
      setNewUser({ name: '', email: '', phone_number: '', password: '', role: '' }); // إعادة تعيين الحقول
      setTimeout(() => {
        setSuccessMessage(null); // إخفاء رسالة النجاح بعد مدة
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        // فحص إذا كان الخطأ من Axios ويحتوي على استجابة
        setErrorMessage(error.response.data?.message || 'حدث خطأ أثناء إضافة المستخدم.');
      } else {
        setErrorMessage('حدث خطأ غير متوقع.');
      }
    }
  };
  const menuItems: MenuItems[] = [
    {
      id: 1,
      title: 'إضافة مستخدم',
      icon: 'material-symbols:account-circle-outline',
      action: () => setOpenAddDialog(true),
    },
    {
      id: 2,
      title: 'تسجيل الخروج',
      icon: 'material-symbols:logout',
      action: handleLogout,
    },
  ];

  return (
    <>
      <ButtonBase
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <IconifyIcon
          icon="mdi:account-circle"
          style={{
            fontSize: 35,
            color: theme.palette.primary.main,
          }}
        />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 230,
          },
          direction: 'rtl',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.dark' } }}>
            <Avatar src={ProfileImage} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600} sx={{ mr: 1 }}>
                {user?.name || 'ضيف'}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400} sx={{ mr: 1 }}>
                {user?.email || 'example@example.com'}
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          {menuItems.map((item: MenuItems) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                handleProfileMenuClose();
                item.action?.();
              }}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle>إضافة مستخدم جديد</DialogTitle>
        <DialogContent>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Box>
            <TextField
              label="الاسم"
              value={newUser.name}
              onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{
                sx: {
                  right: 0,
                  left: 'auto',
                  transformOrigin: 'top right',
                  textAlign: 'right',
                },
              }}
              sx={{
                mt: 5,
                mb: 3,
              }}
            />
            <TextField
              label="البريد الإلكتروني"
              value={newUser.email}
              onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{
                sx: { right: 0, left: 'auto', transformOrigin: 'top right' },
              }}
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="كلمة المرور"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{
                sx: { right: 0, left: 'auto', transformOrigin: 'top right', mb: 30 },
              }}
              sx={{
                mb: 3,
              }}
            />
            <TextField
              label="رقم الهاتف"
              value={newUser.phone_number}
              onChange={(e) => setNewUser((prev) => ({ ...prev, phone_number: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{
                sx: { right: 0, left: 'auto', transformOrigin: 'top right' },
              }}
              sx={{
                mb: 3,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel
                sx={{
                  right: 0,
                  left: 'auto',
                  transformOrigin: 'top right',
                }}
              >
                الدور
              </InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
                sx={{
                  mb: 3,
                }}
              >
                <DropdownItem value="admin">مدير</DropdownItem>
                <DropdownItem value="customer">زبون</DropdownItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileMenu;
