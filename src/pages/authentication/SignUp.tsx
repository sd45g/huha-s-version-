import { useDispatch, useSelector } from 'react-redux';
import { setUser, toggleShowPassword } from 'store/admin/slices/authSlice';
import { ChangeEvent, FormEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { RootState } from '/store/admin/store';
import { api } from 'API/api';

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const SignUp = () => {
  const dispatch = useDispatch();
  const { showPassword } = useSelector((state: RootState) => state.auth);

  const [localUser, setLocalUser] = useState({
    user_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/register', localUser);
      const user = response.data.user;
      dispatch(setUser(user));
      alert(response.data.message);
    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.response?.data?.error) {
        alert(apiError.response.data.error);
      } else if (error instanceof Error) {
        console.error('خطأ أثناء التسجيل:', error.message);
        alert('حدث خطأ أثناء التسجيل');
      } else {
        console.error('خطأ غير معروف:', error);
        alert('حدث خطأ غير معروف أثناء التسجيل');
      }
    }
  };

  const currentYear = new Date().getFullYear();
  return (
    <Stack
      dir="rtl"
      mx="auto"
      width={410}
      height="auto"
      minHeight={800}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box width={1} sx={{ mb: 4, textAlign: 'left' }}>
        <Button
          variant="text"
          component={Link}
          href="/"
          sx={{
            ml: -1.75, // حرك الزر ليكون أقصى اليسار
            pr: 25,
            pl: 2,
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          endIcon={
            <IconifyIcon
              icon="ic:round-keyboard-arrow-left"
              sx={(theme) => ({ fontSize: `${theme.typography.h3.fontSize} !important` })}
            />
          }
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </Box>

      <Box width={1}>
        <Typography variant="h3">إنشاء حساب</Typography>
        <Typography mt={1.5} variant="body2" color="text.disabled">
          انضم إلينا وابدأ رحلتك اليوم
        </Typography>

        <Divider sx={{ my: 3 }}></Divider>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="user_name"
            name="user_name"
            type="text"
            label="الاسم"
            value={localUser.user_name}
            onChange={handleInputChange}
            variant="filled"
            placeholder="ادخل اسمك"
            autoComplete="name"
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
            fullWidth
            autoFocus
            required
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="البريد الالكتروني"
            value={localUser.email}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Email@gmail.com"
            autoComplete="email"
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
            fullWidth
            required
          />
          <TextField
            id="phone_number"
            name="phone_number"
            type="tel"
            label="رقم الهاتف"
            value={localUser.phone_number}
            onChange={handleInputChange}
            variant="filled"
            placeholder="ادخل رقم الهاتف"
            autoComplete="tel"
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
            fullWidth
            required
          />
          <TextField
            id="password"
            name="password"
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            value={localUser.password}
            onChange={handleInputChange}
            variant="filled"
            placeholder="8 أحرف كحد أدنى"
            autoComplete="current-password"
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="إظهار كلمة المرور"
                    onClick={() => dispatch(toggleShowPassword())}
                    sx={{ border: 'none', bgcolor: 'transparent !important' }}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                      color="neutral.main"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            value={localUser.confirmPassword}
            onChange={handleInputChange}
            variant="filled"
            placeholder="أعد كتابة كلمة المرور"
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="إظهار كلمة المرور"
                    onClick={() => dispatch(toggleShowPassword())}
                    sx={{ border: 'none', bgcolor: 'transparent !important' }}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                      color="neutral.main"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
            إنشاء حساب
          </Button>
        </Box>

        <Typography mt={3} variant="body2" textAlign={{ xs: 'center', md: 'right' }}>
          لديك حساب بالفعل؟{' '}
          <Link href={paths.signin} color="primary.main" fontWeight={600}>
            تسجيل الدخول
          </Link>
        </Typography>
      </Box>

      <Typography
        mt={3}
        px={2}
        py={2}
        color="text.secondary"
        variant="body2"
        sx={{
          fontSize: '0.9rem',
          lineHeight: 1.6,
        }}
      >
        <span>© {currentYear} جميع الحقوق محفوظة.</span>
        <br />
        صُمم بكل ❤️ بواسطة{' '}
        <Link
          href="https://romana.com/"
          target="_blank"
          rel="noreferrer"
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'primary.main',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          CORETECH
        </Link>
      </Typography>
    </Stack>
  );
};

export default SignUp;
