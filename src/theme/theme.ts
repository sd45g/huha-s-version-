import { createTheme } from '@mui/material'; // استيراد الدالة `createTheme` من مكتبة MUI لإنشاء سمة مخصصة.
import type {} from '@mui/x-data-grid/themeAugmentation'; // استيراد أنواع MUI الخاصة بمكتبة DataGrid.
import type {} from '@mui/x-date-pickers/themeAugmentation'; // استيراد أنواع MUI الخاصة بمكتبة Date Pickers.
import palette from './palette'; // استيراد الإعدادات الخاصة بالألوان (palette) من ملف مخصص.
import typography from './typography'; // استيراد إعدادات النصوص (typography) من ملف مخصص.
import customShadows from './shadows'; // استيراد إعدادات الظلال (shadows) من ملف مخصص.
import CssBaseline from './components/utils/CssBaseline'; // استيراد التخصيص الخاص بـ `CssBaseline` من ملف مخصص.
import Stack from './components/layout/Stack'; // استيراد التخصيص الخاص بمكون `Stack` من ملف مخصص.
import Paper from './components/surfaces/Paper'; // استيراد التخصيص الخاص بمكون `Paper`.
import Button from './components/buttons/Button'; // استيراد التخصيص الخاص بمكون `Button`.
import ButtonBase from './components/buttons/ButtonBase'; // استيراد التخصيص الخاص بمكون `ButtonBase`.
import IconButton from './components/buttons/IconButton'; // استيراد التخصيص الخاص بمكون `IconButton`.
import Toolbar from './components/buttons/Toolbar'; // استيراد التخصيص الخاص بمكون `Toolbar`.
import Chip from './components/data-display/Chip'; // استيراد التخصيص الخاص بمكون `Chip`.
import Badge from './components/data-display/Badge'; // استيراد التخصيص الخاص بمكون `Badge`.
import Checkbox from './components/inputs/Checkbox'; // استيراد التخصيص الخاص بمكون `Checkbox`.
import FilledInput from './components/inputs/FilledInput'; // استيراد التخصيص الخاص بمكون `FilledInput`.
import FormControlLabel from './components/inputs/FormControlLabel'; // استيراد التخصيص الخاص بمكون `FormControlLabel`.
import InputAdornment from './components/inputs/InputAdornment'; // استيراد التخصيص الخاص بمكون `InputAdornment`.
import InputBase from './components/inputs/InputBase'; // استيراد التخصيص الخاص بمكون `InputBase`.
import OutlinedInput from './components/inputs/OutlinedInput'; // استيراد التخصيص الخاص بمكون `OutlinedInput`.
import Select from './components/inputs/Select'; // استيراد التخصيص الخاص بمكون `Select`.
import Collapse from './components/list/Collapse'; // استيراد التخصيص الخاص بمكون `Collapse`.
import List from './components/list/List'; // استيراد التخصيص الخاص بمكون `List`.
import ListItemButton from './components/list/ListItemButton'; // استيراد التخصيص الخاص بمكون `ListItemButton`.
import ListItemIcon from './components/list/ListItemIcon'; // استيراد التخصيص الخاص بمكون `ListItemIcon`.
import ListItemText from './components/list/ListItemText'; // استيراد التخصيص الخاص بمكون `ListItemText`.
import MenuItem from './components/list/MenuItem'; // استيراد التخصيص الخاص بمكون `MenuItem`.
import AppBar from './components/navigation/AppBar'; // استيراد التخصيص الخاص بمكون `AppBar`.
import Drawer from './components/navigation/Drawer'; // استيراد التخصيص الخاص بمكون `Drawer`.
import Link from './components/navigation/Link'; // استيراد التخصيص الخاص بمكون `Link`.
import YearCalendar from './components/date-picker/YearCalendar'; // استيراد التخصيص الخاص بمكون `YearCalendar`.
import MonthCalendar from './components/date-picker/MonthCalendar'; // استيراد التخصيص الخاص بمكون `MonthCalendar`.
import PaginationItem from './components/pagination/PaginationItem'; // استيراد التخصيص الخاص بمكون `PaginationItem`.
import DataGrid from './components/data-grid/DataGrid'; // استيراد التخصيص الخاص بمكون `DataGrid`.
import Avatar from './components/data-display/Avatar'; // استيراد التخصيص الخاص بمكون `Avatar`.
import AvatarGroup from './components/data-display/AvatarGroup'; // استيراد التخصيص الخاص بمكون `AvatarGroup`.
import Card from './components/cards/Card'; // استيراد التخصيص الخاص بمكون `Card`.
import CardMedia from './components/cards/CardMedia'; // استيراد التخصيص الخاص بمكون `CardMedia`.
import CardContent from './components/cards/CardContent'; // استيراد التخصيص الخاص بمكون `CardContent`.
import DateCalendar from './components/date-picker/DateCalendar'; // استيراد التخصيص الخاص بمكون `DateCalendar`.
import InputLabel from './components/inputs/InputLabel'; // استيراد التخصيص الخاص بمكون `InputLabel`.
import Divider from './components/data-display/Divider'; // استيراد التخصيص الخاص بمكون `Divider`.

export const theme = createTheme({
  // إنشاء سمة مخصصة باستخدام `createTheme`.
  palette, // تعيين الألوان باستخدام التخصيص الذي استوردناه من ملف `palette`.
  typography, // تعيين الإعدادات الخاصة بالنصوص باستخدام التخصيص الذي استوردناه من ملف `typography`.
  customShadows, // تعيين الظلال باستخدام التخصيص الذي استوردناه من ملف `shadows`.
  direction: 'rtl',
  mixins: {
    // تخصيص المزيج لأنماط مكون `Toolbar`.
    toolbar: {
      minHeight: 130, // تعيين الحد الأدنى للارتفاع الخاص بـ `Toolbar`.
    },
  },
  breakpoints: {
    // تخصيص قيم نقاط التوقف (breakpoints) الخاصة بالتصميم.
    values: {
      xs: 0, // النقطة الصغيرة جدًا (extra small).
      sm: 600, // النقطة الصغيرة (small).
      md: 900, // النقطة المتوسطة (medium).
      lg: 1420, // النقطة الكبيرة (large).
      xl: 1780, // النقطة الأكبر (extra large).
    },
  },
  components: {
    // تخصيص مكونات MUI.
    MuiStack: Stack, // تخصيص مكون `MuiStack` باستخدام التخصيص الخاص به من الملف `Stack`.
    MuiPaper: Paper, // تخصيص مكون `MuiPaper` باستخدام التخصيص الخاص به من الملف `Paper`.
    MuiButton: Button, // تخصيص مكون `MuiButton` باستخدام التخصيص الخاص به من الملف `Button`.
    MuiButtonBase: ButtonBase, // تخصيص مكون `MuiButtonBase` باستخدام التخصيص الخاص به من الملف `ButtonBase`.
    MuiIconButton: IconButton, // تخصيص مكون `MuiIconButton` باستخدام التخصيص الخاص به من الملف `IconButton`.
    MuiToolbar: Toolbar, // تخصيص مكون `MuiToolbar` باستخدام التخصيص الخاص به من الملف `Toolbar`.
    MuiBadge: Badge, // تخصيص مكون `MuiBadge` باستخدام التخصيص الخاص به من الملف `Badge`.
    MuiChip: Chip, // تخصيص مكون `MuiChip` باستخدام التخصيص الخاص به من الملف `Chip`.
    MuiCheckbox: Checkbox, // تخصيص مكون `MuiCheckbox` باستخدام التخصيص الخاص به من الملف `Checkbox`.
    MuiFilledInput: FilledInput, // تخصيص مكون `MuiFilledInput` باستخدام التخصيص الخاص به من الملف `FilledInput`.
    MuiFormControlLabel: FormControlLabel, // تخصيص مكون `MuiFormControlLabel` باستخدام التخصيص الخاص به من الملف `FormControlLabel`.
    MuiInputAdornment: InputAdornment, // تخصيص مكون `MuiInputAdornment` باستخدام التخصيص الخاص به من الملف `InputAdornment`.
    MuiInputBase: InputBase, // تخصيص مكون `MuiInputBase` باستخدام التخصيص الخاص به من الملف `InputBase`.
    MuiOutlinedInput: OutlinedInput, // تخصيص مكون `MuiOutlinedInput` باستخدام التخصيص الخاص به من الملف `OutlinedInput`.
    MuiSelect: Select, // تخصيص مكون `MuiSelect` باستخدام التخصيص الخاص به من الملف `Select`.
    MuiCollapse: Collapse, // تخصيص مكون `MuiCollapse` باستخدام التخصيص الخاص به من الملف `Collapse`.
    MuiList: List, // تخصيص مكون `MuiList` باستخدام التخصيص الخاص به من الملف `List`.
    MuiListItemButton: ListItemButton, // تخصيص مكون `MuiListItemButton` باستخدام التخصيص الخاص به من الملف `ListItemButton`.
    MuiListItemIcon: ListItemIcon, // تخصيص مكون `MuiListItemIcon` باستخدام التخصيص الخاص به من الملف `ListItemIcon`.
    MuiListItemText: ListItemText, // تخصيص مكون `MuiListItemText` باستخدام التخصيص الخاص به من الملف `ListItemText`.
    MuiMenuItem: MenuItem, // تخصيص مكون `MuiMenuItem` باستخدام التخصيص الخاص به من الملف `MenuItem`.
    MuiInputLabel: InputLabel, // تخصيص مكون `MuiInputLabel` باستخدام التخصيص الخاص به من الملف `InputLabel`.
    MuiAppBar: AppBar, // تخصيص مكون `MuiAppBar` باستخدام التخصيص الخاص به من الملف `AppBar`.
    MuiDrawer: Drawer, // تخصيص مكون `MuiDrawer` باستخدام التخصيص الخاص به من الملف `Drawer`.
    MuiLink: Link, // تخصيص مكون `MuiLink` باستخدام التخصيص الخاص به من الملف `Link`.
    MuiCard: Card, // تخصيص مكون `MuiCard` باستخدام التخصيص الخاص به من الملف `Card`.
    MuiCardMedia: CardMedia, // تخصيص مكون `MuiCardMedia` باستخدام التخصيص الخاص به من الملف `CardMedia`.
    MuiCardContent: CardContent, // تخصيص مكون `MuiCardContent` باستخدام التخصيص الخاص به من الملف `CardContent`.
    MuiDivider: Divider, // تخصيص مكون `MuiDivider` باستخدام التخصيص الخاص به من الملف `Divider`.
    MuiAvatar: Avatar, // تخصيص مكون `MuiAvatar` باستخدام التخصيص الخاص به من الملف `Avatar`.
    MuiDataGrid: DataGrid, // تخصيص مكون `MuiDataGrid` باستخدام التخصيص الخاص به من الملف `DataGrid`.
    MuiAvatarGroup: AvatarGroup, // تخصيص مكون `MuiAvatarGroup` باستخدام التخصيص الخاص به من الملف `AvatarGroup`.
    MuiDateCalendar: DateCalendar, // تخصيص مكون `MuiDateCalendar` باستخدام التخصيص الخاص به من الملف `DateCalendar`.
    MuiMonthCalendar: MonthCalendar, // تخصيص مكون `MuiMonthCalendar` باستخدام التخصيص الخاص به من الملف `MonthCalendar`.
    MuiYearCalendar: YearCalendar, // تخصيص مكون `MuiYearCalendar` باستخدام التخصيص الخاص به من الملف `YearCalendar`.
    MuiPaginationItem: PaginationItem, // تخصيص مكون `MuiPaginationItem` باستخدام التخصيص الخاص به من الملف `PaginationItem`.
    MuiCssBaseline: CssBaseline, // تخصيص مكون `MuiCssBaseline` باستخدام التخصيص الخاص به من الملف `CssBaseline`.
  },
});
