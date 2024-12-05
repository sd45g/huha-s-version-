//تم استعماله ف هدا المكون HistoryCard و TrendingNFTs

// استيراد useState و useEffect من React، و RefObject لتحديد نوع المرجع
import { useState, useEffect, RefObject } from 'react';
// استيراد ResizeObserver (أداة لمراقبة تغييرات حجم العنصر)
import ResizeObserver from 'resize-observer-polyfill';

// تعريف هوك useResizeObserver الذي يقبل مرجعًا لعنصر HTML
const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  // تعريف حالة width، والتي سيتم تحديثها عند تغيّر عرض العنصر
  const [width, setWidth] = useState(0);

  // استخدام useEffect لضبط ResizeObserver عندما يتم تحميل المكون
  useEffect(() => {
    // دالة handleResize يتم استدعاؤها عند تغيّر حجم العنصر
    const handleResize = (entries: ResizeObserverEntry[]) => {
      // الدخول في كل عنصر تم رصده للحصول على التغيرات
      for (const entry of entries) {
        // التحقق من وجود contentRect (التفاصيل حول حجم العنصر)
        if (entry.contentRect) {
          // تحديث حالة width ليعكس العرض الجديد للعنصر
          setWidth(entry.contentRect.width);
        }
      }
    };

    // إنشاء ResizeObserver ومراقبة التغيرات عبر handleResize
    const observer = new ResizeObserver(handleResize);
    // إذا كان ref مرتبطًا بعنصر حقيقي، يبدأ مراقبته
    if (ref.current) {
      observer.observe(ref.current);
    }

    // دالة تنظيف لتوقف المراقبة عند إزالة المكون
    return () => {
      // التحقق من ref ووقف المراقبة إذا كان مرتبطًا بعنصر
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]); // سيتم إعادة تنفيذ useEffect عند تغيّر ref

  // إرجاع العرض الحالي للعنصر
  return width;
};

// تصدير useResizeObserver ليتم استخدامه في مكونات أخرى
export default useResizeObserver;
