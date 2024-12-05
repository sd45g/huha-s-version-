import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';
import { useLocation } from 'react-router-dom';

const ListItem = ({ subheader, icon, path }: MenuItem) => {
  const location = useLocation();
  const isActive = location.pathname === path; // تحديد إذا كان العنصر هو الصفحة الحالية

  return (
    <Stack
      mb={1}
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      position="relative"
    >
      {/* الشريط الجانبي النشط إلى أقصى اليسار يظهر فقط عندما يكون العنصر نشطًا */}
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: 4,
            bgcolor: 'primary.main',
            borderRadius: '0 4px 4px 0',
            transition: 'background-color 0.3s ease',
          }}
        />
      )}

      <ListItemButton
        component={Link}
        href={path}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          pr: 2,
          pl: 3, // التباعد بين النص والأيقونة
          backgroundColor: 'transparent', // إزالة الخلفية الافتراضية
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // إضافة تأثير خفيف عند تمرير الماوس
          },
        }}
      >
        {/* النص الخاص بالعنصر */}
        <ListItemText
          primary={subheader}
          sx={{
            '& .MuiListItemText-primary': {
              color: isActive ? 'primary.main' : 'text.secondary', // اللون حسب الحالة
              fontWeight: isActive ? 600 : 500, // تغيير سمك الخط حسب الحالة
            },
          }}
        />

        {/* الأيقونة إلى أقصى اليمين */}
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 'unset',
              ml: 1,
              color: isActive ? 'primary.main' : 'text.secondary', // اللون حسب الحالة
              transition: 'color 0.3s ease', // تأثير الانتقال للون الأيقونة
            }}
          >
            <IconifyIcon
              icon={icon}
              sx={{
                fontSize: 24,
              }}
            />
          </ListItemIcon>
        )}
      </ListItemButton>
    </Stack>
  );
};

export default ListItem;
