import { Outlet } from 'react-router-dom';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import Image from 'components/base/Image';
import Logo from 'assets/images/logo-white.png';
import AuthBg from 'assets/images/auth/auth-bg.png';

const AuthLayout = () => {
  return (
    <Stack justifyContent="space-between" height="100vh" bgcolor="info.lighter">
      <Stack px={3.5} py={2} flex={1} height={1} overflow="scroll">
        <Outlet />
      </Stack>
      <Stack
        flex={1}
        height={1}
        direction="column"
        alignItems="center"
        justifyContent="center" // أضف هذه الخاصية لتوسيط الشعار عموديًا
        display={{ xs: 'none', md: 'flex' }}
        sx={(theme) => ({
          backgroundImage: `url('${AuthBg}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: theme.shape.borderRadius * 24,
        })}
      >
        <Stack
          direction="column"
          spacing={3}
          alignItems="center"
          justifyContent="center" // يوسّط الصور عموديًا
          height="100vh" // يضبط الارتفاع ليشغل الشاشة كاملة
        >
          <Image src={Logo} height={330} width={400} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
