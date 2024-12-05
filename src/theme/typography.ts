import { TypographyOptions } from '@mui/material/styles/createTypography';

export const fontFamily = {
  Elmessiri: ['El Messiri', 'sans-serif'].join(','),
  cairo: ['Cairo', 'sans-serif'].join(','),
};

//todo خطوط لاستعمالها
//El Messiri
//Tajawal
//Noto Kufi Arabic
//DroidArabicKufi-Regular', sans-serif, Arial

const typography: TypographyOptions = {
  fontFamily: fontFamily.Elmessiri,
  h1: {
    fontSize: '2.5rem', // حجم مناسب للغة العربية
    fontWeight: 700,
    letterSpacing: 0,
    textAlign: 'right', // ضبط محاذاة النص لليمين
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: 0,
    textAlign: 'right',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'right',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: 0,
    textAlign: 'right',
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: 0,
    textAlign: 'right',
  },
  h6: {
    fontSize: '0.875rem',
    fontWeight: 700,
    textAlign: 'right',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    textAlign: 'right',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'right',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: 0,
    textAlign: 'right',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    letterSpacing: 0,
    textAlign: 'right',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 0,
    textAlign: 'right',
  },
  button: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: 0,
    textAlign: 'right',
  },
};

export default typography;
