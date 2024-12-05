import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { forwardRef } from 'react';
// يستبدل href بـ to لدعم التنقل بين الصفحات باستخدام react-router-dom، مما يتيح الانتقال السلس داخل التطبيق.

// تهيئة LinkBehavior لتبديل href بـ to لدعم التنقل الداخلي في التطبيق
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const Link: Components<Omit<Theme, 'components'>>['MuiLink'] = {
  defaultProps: {
    underline: 'none', // إزالة الخط السفلي
    component: LinkBehavior, // استخدام LinkBehavior بدلاً من رابط افتراضي
  },
};

export default Link;
