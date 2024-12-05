import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete, onView }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <IconifyIcon icon="solar:menu-dots-bold" color="text.primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* زر العرض */}
        <MenuItem
          onClick={() => {
            handleClose();
            onView(); // الدالة الصحيحة لزر العرض
          }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ic:outline-remove-red-eye" />
          </ListItemIcon>
          <ListItemText primary="عرض" />
        </MenuItem>

        {/* زر التعديل */}
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit(); // الدالة الصحيحة لزر التعديل
          }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ic:baseline-edit" />
          </ListItemIcon>
          <ListItemText primary="تعديل" />
        </MenuItem>

        {/* زر الحذف */}
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete(); // الدالة الصحيحة لزر الحذف
          }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ic:baseline-delete" />
          </ListItemIcon>
          <ListItemText primary="حذف" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionMenu;
