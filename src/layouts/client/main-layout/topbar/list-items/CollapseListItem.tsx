import { useState } from 'react';
import { MenuItem } from 'routes/sitemap';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconifyIcon from 'components/base/IconifyIcon';
import { useLocation } from 'react-router-dom';

const CollapseListItem = ({ subheader, items, icon, path }: MenuItem) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive =
    items?.some((item) => item.path === location.pathname) || location.pathname === path;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ pb: 1.5, position: 'relative' }}>
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
        onClick={handleClick}
        sx={{
          justifyContent: 'space-between',
          pr: 2,
          pl: isActive ? 2 : 3,
          backgroundColor: 'transparent', // إزالة الخلفية عند تمرير الماوس
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // إزالة الخلفية الرمادية عند التمرير
          },
        }}
      >
        <ListItemText
          primary={subheader}
          sx={{
            '& .MuiListItemText-primary': {
              color: isActive ? 'primary.main' : 'text.secondary',
              fontWeight: isActive ? 600 : 500,
            },
          }}
        />

        {icon && (
          <ListItemIcon sx={{ minWidth: 'unset', ml: 1 }}>
            <IconifyIcon
              icon={icon}
              sx={{
                fontSize: 24,
                color: isActive ? 'primary.main' : 'text.secondary',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          </ListItemIcon>
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items?.map((route) => (
            <ListItemButton
              key={route.pathName}
              component={Link}
              href={route.path}
              sx={{
                ml: 2.25,
                bgcolor: route.active ? 'info.main' : 'transparent', // إزالة الخلفية الرمادية من العناصر الفرعية
              }}
            >
              <ListItemText
                primary={route.pathName}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: location.pathname === route.path ? 'primary.main' : 'text.secondary',
                    fontWeight: location.pathname === route.path ? 600 : 500,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default CollapseListItem;
