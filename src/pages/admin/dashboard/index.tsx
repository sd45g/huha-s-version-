import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // إضافة useDispatch
import { RootState } from 'store/admin/store'; // تعديل المسار حسب مشروعك
import { setUser, setRole } from 'store/admin/slices/authSlice'; // التأكد من استيراد setUser و setRole
import { parseJwt } from 'utils/tokenUtils'; // التأكد من استيراد parseJwt
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import HorizonLogo from 'assets/images/logo-main.png';
import Image from 'components/base/Image';
import ProfileMenu from '../../../layouts/client/main-layout/topbar/profile-item/ProfileMenu';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import Sidebar from '../../../layouts/client/main-layout/topbar/list-items/Sidebar';
import Drawer from '@mui/material/Drawer';
import { clientSitemap } from 'routes/sitemap';
import { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem, Typography as MuiTypography } from '@mui/material';
import { api } from 'API/api';
import useResizeObserver from 'hooks/useResizeObserver';

interface Notification {
  customerName: string;
  classification: string;
  bookingDate: string;
}

interface ClientSitemapItem {
  id: string;
  path: string;
  subheader: string;
}

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // تعريف dispatch
  const { user, role } = useSelector((state: RootState) => state.auth); // جلب حالة Redux
  const isLoggedIn = Boolean(user && role); // التحقق من تسجيل الدخول
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]); // لتخزين الإشعارات
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // فتح/إغلاق قائمة الإشعارات
  const open = Boolean(anchorEl);
  const topbarRef = useRef<HTMLDivElement>(null);
  const width = useResizeObserver(topbarRef);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // جلب الإشعارات من الخادم
  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await api.get<Notification[]>('/reservations/notifications');
      setNotifications(fetchedNotifications.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (width >= 960) {
      setMobileOpen(false);
    }
  }, [width]);
  // إضافة شرط لإعادة التحقق من التوكن في كل مرة يتم تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = parseJwt(token); // فك التوكن
      if (decodedToken?.id && decodedToken?.role && decodedToken?.email) {
        // إذا لم يكن `name` موجودًا، قم بتعيين قيمة افتراضية
        const userName = decodedToken.name || 'ضيف';
        dispatch(setUser({ id: decodedToken.id, email: decodedToken.email, name: userName }));
        const role = decodedToken.role as 'admin' | 'customer';
        dispatch(setRole(role)); // تحديث الدور
      }
    }
    // جلب الإشعارات عند تحميل الصفحة
    fetchNotifications();
  }, [dispatch]);

  // التعامل مع زر الإشعارات
  const handleNotificationClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    try {
      const fetchedNotifications = await api.get<Notification[]>('/reservations/notifications');
      setNotifications(fetchedNotifications.data); // استخراج البيانات من الاستجابة
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      ref={topbarRef}
      height={90}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="info.darker"
      color="text.primary"
      direction="row"
      paddingX={2}
      borderRadius={12}
      position="relative"
      zIndex={1}
      sx={{
        boxShadow: 10,
        mt: 2,
        mx: 3,
      }}
    >
      {/* الشعار مع زر القائمة (menu) على الشاشات الصغيرة */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0, display: 'flex', alignItems: 'center' }}
        >
          <Image
            src={HorizonLogo}
            alt="logo"
            height={80}
            width={120}
            sx={{
              mr: -3,
              display: { xs: 'none', sm: 'block' },
            }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            قصر المهره
          </Typography>
        </ButtonBase>

        <IconButton
          onClick={handleDrawerToggle}
          size="large"
          aria-label="menu"
          edge="start"
          color="inherit"
          sx={{
            display: { xs: 'flex', md: 'none' },
            bgcolor: 'neutral.light',
            color: 'primary',
            borderRadius: '50%',
            '&:hover': {
              bgcolor: 'info.lighter',
            },
          }}
        >
          <IconifyIcon icon="ic:baseline-menu" />
        </IconButton>
      </Stack>

      {/* الروابط الرئيسية - تظهر فقط على الشاشات الكبيرة */}
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {clientSitemap.map((item: ClientSitemapItem) => (
          <Stack
            key={item.id}
            direction="row"
            alignItems="center"
            spacing={1}
            component={Link}
            href={item.path}
            underline="none"
            sx={{
              padding: '8px 12px',
              borderRadius: 0,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                borderBottom: '2px solid',
                borderColor: 'primary.light',
              },
            }}
          >
            <Typography variant="body1" fontWeight={500} color="text.primary">
              {item.subheader}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* الأدوات الخاصة بتسجيل الدخول والملف الشخصي */}
      <Stack direction="row" spacing={2} alignItems="center">
        {isLoggedIn && (
          <>
            <IconButton
              size="large"
              onClick={handleNotificationClick}
              aria-controls={open ? 'notification-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Badge
                badgeContent={notifications.length}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    minWidth: '5px',
                    height: '13px',
                    fontSize: '12px',
                    mt: -1,
                  },
                }}
              >
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
                    <MuiTypography>
                      {`مرحبًا ${notification.customerName}، لديك مناسبة من نوع ${notification.classification} بتاريخ ${new Date(
                        notification.bookingDate,
                      ).toLocaleDateString('ar-EG')}`}
                    </MuiTypography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <MuiTypography>لا توجد إشعارات حالياً</MuiTypography>
                </MenuItem>
              )}
            </Menu>
            <ProfileMenu /> {/* يحتوي على زر تسجيل الخروج */}
          </>
        )}

        {!isLoggedIn && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/authentication/sign-in')}
          >
            تسجيل الدخول
          </Button>
        )}
      </Stack>

      {/* استخدام Drawer لعرض Sidebar عند فتح mobileOpen */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setIsClosing={() => {}} />
      </Drawer>
    </Stack>
  );
};

export default Topbar;
