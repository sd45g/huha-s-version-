import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
// import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
// import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import HorizonLogo from 'assets/images/logo-main.png';
import Image from 'components/base/Image';
import ProfileMenu from './ProfileMenu';
import { useState } from 'react';
import { Menu, MenuItem, IconButton, Badge, Typography } from '@mui/material';
import { api } from 'API/api';

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Notification {
  customerName: string;
  classification: string;
  bookingDate: string;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // تحديد نوع الإشعارات
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // فتح/إغلاق القائمة
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNotificationClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    try {
      const fetchedNotifications = await api.get<Notification[]>('/reservations/notifications');
      setNotifications(fetchedNotifications.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      height={90}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="transparent"
      zIndex={1200}
    >
      {/* الجزء العلوي من الشعار وزر القائمة */}
      <Stack spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
        >
          <Image src={HorizonLogo} alt="logo" height={44} width={44} />
        </ButtonBase>

        <Toolbar sx={{ display: { xm: 'block', lg: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <IconifyIcon icon="ic:baseline-menu" />
          </IconButton>
        </Toolbar>
        {/* 
        <Toolbar sx={{ display: { xm: 'block', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="search">
            <IconifyIcon icon="bx:search" />
          </IconButton>
        </Toolbar>

        <TextField
          variant="filled"
          placeholder="Search"
          sx={{ width: 320, display: { xs: 'none', md: 'flex' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="bx:search" />
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      {/* الإشعارات والملف الشخصي */}
      <Stack spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
        <IconButton
          size="large"
          onClick={handleNotificationClick}
          aria-controls={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Badge badgeContent={notifications.length} color="error">
            <IconifyIcon icon="ic:baseline-notifications-none" />
          </Badge>
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleNotificationClose}
          MenuListProps={{
            'aria-labelledby': 'notification-menu',
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((notification: Notification, index) => (
              <MenuItem key={index} onClick={handleNotificationClose}>
                <Typography>
                  {`مرحبًا ${notification.customerName}، لديك مناسبة من نوع ${notification.classification} بتاريخ ${new Date(
                    notification.bookingDate,
                  ).toLocaleDateString('ar-EG')}`}
                </Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Typography>لا توجد إشعارات حالياً</Typography>
            </MenuItem>
          )}
        </Menu>
        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;
