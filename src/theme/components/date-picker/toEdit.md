إضافة بيانات الحجز: أضف قائمة من التواريخ المحجوزة (مع معلومات عن حالة الحجز: مؤكد أو مؤقت) كخاصية للمكون DateCalendar.

تحديث التخصيص: في جزء styleOverrides الخاص بـ MuiPickersDay-root في DateCalendar، أضف منطقًا يتحقق من حالة كل يوم بناءً على بيانات الحجز.

إضافة المنطق اللوني: استخدم theme.palette لتعيين ألوان مخصصة بناءً على حالة الحجز.

مثال على إضافة المنطق في DateCalendar
نفترض أن لدينا قائمة bookedDates تحتوي على تواريخ محجوزة وألوانها كالتالي:

الأيام المحجوزة بحجز مؤكد: theme.palette.success.light
الأيام المحجوزة بحجز مؤقت: theme.palette.warning.light
يمكننا تعديل DateCalendar كالتالي:

typescript
نسخ الكود
const DateCalendar = (props) => {
  const { bookedDates } = props; // جلب تواريخ الحجز مع حالة الحجز لكل يوم.
  
  const getBackgroundColor = (day) => {
    // تحقق من حالة اليوم المحدد بناءً على بيانات الحجز.
    if (bookedDates[day] === 'confirmed') return theme.palette.success.light;
    if (bookedDates[day] === 'tentative') return theme.palette.warning.light;
    return 'transparent'; // الأيام غير المحجوزة.
  };

  return {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPickersDay-root': {
          backgroundColor: getBackgroundColor(day), // تعيين لون الخلفية بناءً على حالة الحجز.
        },
        // باقي الأنماط هنا.
      }),
    },
  };
};