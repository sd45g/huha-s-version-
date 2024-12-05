import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerItems from './DrawerItems'; // استيراد DrawerItems من list-items

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ mobileOpen, setMobileOpen, setIsClosing }: SidebarProps) => {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box
      component="nav"
      width={{ lg: 290 }}
      flexShrink={{ lg: 0 }}
      display={{ xs: 'none', lg: 'block' }}
    >
      {/* القائمة المؤقتة للهواتف */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', lg: 'none' } }}
      >
        <DrawerItems />
      </Drawer>

      {/* القائمة الثابتة لأجهزة الكمبيوتر */}
      <Drawer variant="permanent" sx={{ display: { xs: 'none', lg: 'block' } }} open>
        <DrawerItems />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
