import { useDispatch, useSelector } from 'react-redux';
import { setUser, setRole, toggleShowPassword } from 'store/admin/slices/authSlice';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { RootState } from '/store/admin/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from 'API/api'; // استدعاء ملف api
import { parseJwt } from 'utils/tokenUtils'; // استدعاء الدالة الجديدة

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword } = useSelector((state: RootState) => state.auth);
  const [identifier, setIdentifier] = useState<string>(''); // البريد أو الهاتف
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone_number'>('email'); // الافتراضي بريد
  const [password, setPassword] = useState<string>('');
  const location = useLocation(); // الحصول على المسار الذي كان يحاول المستخدم الوصول إليه
  const from = location.state?.from || '/client'; // استخدم المسار المحفوظ أو المسار الافتراضي
  console.log(location);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'identifier') setIdentifier(value);
    if (name === 'password') setPassword(value);
  };

  const handleLoginMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginMethod(e.target.value as 'email' | 'phone_number');
    setIdentifier(''); // إعادة تعيين الإدخال
  };
  const currentYear = new Date().getFullYear(); // الحصول على السنة الحالية

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // إرسال بيانات تسجيل الدخول إلى الواجهة الخلفية
      const response = await api.post('/users/login', {
        identifier,
        password,
      });

      // استخراج التوكن من الاستجابة
      const { token } = response.data;

      // حفظ التوكن في التخزين المحلي
      localStorage.setItem('authToken', token);

      // فك التوكن باستخدام الدالة parseJwt
      const decodedToken = parseJwt(token);
      if (!decodedToken) {
        alert('Invalid token');
        return;
      }

      const { id, role } = decodedToken;

      // تحديث بيانات المستخدم في Redux
      dispatch(setUser({ id, email: decodedToken.email || '', name: decodedToken.name || 'ضيف' }));
      // التحقق من صحة قيمة role قبل تمريرها إلى setRole
      if (role === 'admin' || role === 'customer') {
        dispatch(setRole(role));
      } else {
        console.error(`Invalid role: ${role}`);
        alert('دور المستخدم غير صالح');
        return;
      }

      // توجيه المستخدم بناءً على دوره
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'customer') {
        navigate(from); // التوجيه إلى المسار المحفوظ
      } else {
        console.error(`Invalid role: ${role}`);
        alert('دور المستخدم غير صالح');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('بيانات تسجيل الدخول غير صحيحة');
    }
  };

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

      <Box width={1} sx={{ mb: 4, textAlign: 'left' }}>
        <Typography variant="h3">تسجيل الدخول</Typography>
        <Typography mt={1.5} variant="body2" color="text.disabled">
          أدخل معلومات تسجيل الدخول
        </Typography>

        <Divider sx={{ my: 3 }}></Divider>

        <RadioGroup
          row
          value={loginMethod}
          onChange={handleLoginMethodChange}
          sx={{ justifyContent: 'flex-start', ml: 4, mb: 4 }} // استخدم ml (margin-left) للإزاحة
        >
          <FormControlLabel value="email" control={<Radio />} label="البريد الإلكتروني" />
          <FormControlLabel value="phone_number" control={<Radio />} label="رقم الهاتف" />
        </RadioGroup>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="identifier"
            name="identifier"
            type={loginMethod === 'email' ? 'email' : 'text'}
            label={loginMethod === 'email' ? 'البريد الإلكتروني' : 'رقم الهاتف'}
            value={identifier}
            onChange={handleInputChange}
            variant="filled"
            placeholder={loginMethod === 'email' ? 'Email@gmail.com' : '05XXXXXXXX'}
            autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
            fullWidth
            required
            sx={{
              mt: 6,
              '& .MuiInputLabel-root': { textAlign: 'right', right: 0, left: 'auto' },
              '& .MuiInputBase-root': { textAlign: 'right' },
            }}
          />
          <TextField
            id="password"
            name="password"
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            value={password}
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

          <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
            تسجيل الدخول
          </Button>
        </Box>

        <Typography mt={3} variant="body2" textAlign="right">
          لم تسجل بعد؟{' '}
          <Link href={paths.signup} color="primary.main" fontWeight={600}>
            إنشاء حساب جديد
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

export default SignIn;
