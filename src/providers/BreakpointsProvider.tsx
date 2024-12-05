import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'; // استيراد الدوال والمكونات من React.
import { Breakpoint, Theme } from '@mui/material'; // استيراد الأنواع من MUI.
import { useMediaQuery } from '@mui/material'; // استيراد hook لاستخدام استعلامات الوسائط.

interface BreakpointContextInterface {
  currentBreakpoint: Breakpoint; // المتغير الذي يخزن نقطة التوقف الحالية.
  up: (key: Breakpoint | number) => boolean; // دالة للتحقق مما إذا كانت الشاشة أكبر من نقطة معينة.
  down: (key: Breakpoint | number) => boolean; // دالة للتحقق مما إذا كانت الشاشة أصغر من نقطة معينة.
  only: (key: Breakpoint | number) => boolean; // دالة للتحقق من أن الشاشة تتطابق مع نقطة معينة فقط.
  between: (start: Breakpoint | number, end: Breakpoint | number) => boolean; // دالة للتحقق مما إذا كانت الشاشة تقع بين نقطتين.
}

// إنشاء السياق الذي سيتم استخدامه لمشاركة بيانات نقاط التوقف عبر المكونات.
export const BreakpointContext = createContext({} as BreakpointContextInterface);

const BreakpointsProvider = ({ children }: PropsWithChildren) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs'); // حالة لتخزين نقطة التوقف الحالية.

  // دالة للتحقق مما إذا كانت الشاشة أكبر من نقطة معينة.
  const up = (key: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.up(key));

  // دالة للتحقق مما إذا كانت الشاشة أصغر من نقطة معينة.
  const down = (key: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.down(key));

  // دالة للتحقق مما إذا كانت الشاشة تتطابق مع نقطة معينة فقط.
  const only = (key: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.only(key as Breakpoint));

  // دالة للتحقق مما إذا كانت الشاشة تقع بين نقطتين محددتين.
  const between = (start: Breakpoint | number, end: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.between(start, end));

  // متغيرات للتحقق من نقاط التوقف المختلفة.
  const isXs = between('xs', 'sm');
  const isSm = between('sm', 'md');
  const isMd = between('md', 'lg');
  const isLg = between('lg', 'xl');
  const isXl = up('xl');

  // تأثير جانبي لتحديث حالة نقطة التوقف الحالية بناءً على حجم الشاشة.
  useEffect(() => {
    if (isXs) {
      setCurrentBreakpoint('xs');
    }
    if (isSm) {
      setCurrentBreakpoint('sm');
    }
    if (isMd) {
      setCurrentBreakpoint('md');
    }
    if (isLg) {
      setCurrentBreakpoint('lg');
    }
    if (isXl) {
      setCurrentBreakpoint('xl');
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  // تمرير القيم للأطفال من خلال موفر السياق.
  return (
    <BreakpointContext.Provider value={{ currentBreakpoint, up, down, only, between }}>
      {children}
    </BreakpointContext.Provider>
  );
};

// هوك مخصص لاستخدام السياق.
export const useBreakpoints = () => useContext(BreakpointContext);

export default BreakpointsProvider;
