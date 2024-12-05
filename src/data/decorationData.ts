// استيراد الصور
import cardImg1 from 'assets/images/cards/cardImg1.png';
import cardImg2 from 'assets/images/cards/cardImg2.png';
import cardImg3 from 'assets/images/cards/cardImg3.png';
import cardImg4 from 'assets/images/cards/cardImg4.png';
import cardImg5 from 'assets/images/cards/cardImg5.png';
import cardImg7 from 'assets/images/cards/cardImg7.jpg';
import cardImg8 from 'assets/images/cards/cardImg8.jpg';
import cardImg9 from 'assets/images/cards/cardImg9.jpg';
import cardImg10 from 'assets/images/cards/cardImg10.jpg';
import cardImg11 from 'assets/images/cards/cardImg11.jpg';

// تعريف نوع البيانات
type Decoration = {
  id: string;
  image: string; // الصورة الأساسية
  relatedImages: string[]; // الصور التابعة
  name: string; // اسم الديكور
  description: string; // وصف الديكور
};

// بيانات الديكورات
const decorationData: Decoration[] = [
  {
    id: '1',
    image: cardImg1,
    relatedImages: [cardImg2, cardImg3],
    name: 'ديكور الزفاف الفاخر',
    description: 'تصميم فاخر يناسب حفلات الزفاف والمناسبات الرسمية مع تفاصيل راقية وألوان مبهجة.',
  },
  {
    id: '2',
    image: cardImg2,
    relatedImages: [cardImg4, cardImg5],
    name: 'ديكور الحدائق',
    description: 'تصميم طبيعي يناسب حفلات الهواء الطلق مع ألوان مستوحاة من الطبيعة.',
  },
  {
    id: '3',
    image: cardImg3,
    relatedImages: [cardImg7, cardImg8],
    name: 'ديكور كلاسيكي',
    description: 'لمسة كلاسيكية تضفي على المكان إحساسًا بالفخامة والأناقة التقليدية.',
  },
  {
    id: '4',
    image: cardImg4,
    relatedImages: [cardImg9],
    name: 'ديكور عصري',
    description: 'تصميم عصري بألوان جريئة وخطوط نظيفة يعكس جمال البساطة الحديثة.',
  },
  {
    id: '5',
    image: cardImg5,
    relatedImages: [cardImg10, cardImg11],
    name: 'ديكور باللون الذهبي',
    description: '',
  },
  // يمكنك إضافة المزيد من الديكورات هنا
];

export type { Decoration };
export default decorationData;
