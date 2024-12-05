import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/admin/store'; // تعديل المسار حسب مشروعك
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
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // إضافة useNavigate
import ProfileImage from 'assets/images/avatars/avatar1.png';
import paths from 'routes/paths';

interface MenuItems {
  id: number;
  title: string;
  icon: string;
  action?: () => void;
}

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const navigate = useNavigate(); // إنشاء النيفيجيت

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

  const handleViewReservations = () => {
    navigate(paths.clientViewReservations); // توجيه المستخدم إلى صفحة "عرض الحجوزات"
    handleProfileMenuClose();
  };

  const menuItems: MenuItems[] = [
    {
      id: 1,
      title: 'الحجوزات',
      icon: 'material-symbols:book-online',
      action: handleViewReservations,
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
        {/* عرض الاسم والبريد الإلكتروني */}
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

        {/* عناصر القائمة */}
        <Box p={1}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} onClick={item.action || handleProfileMenuClose} sx={{ py: 1 }}>
              <ListItemIcon sx={{ ml: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
