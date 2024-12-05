import { useState, useRef, useEffect } from 'react';
import { Grid, Box, Typography, TextField, InputAdornment } from '@mui/material';
import DecorationCard from 'components/client/DecorationCard';
import { api } from 'API/api';
import useResizeObserver from 'hooks/useResizeObserver';
import IconifyIcon from 'components/base/IconifyIcon';

// تعريف نوع البيانات
interface Decoration {
  _id: string;
  dec_name: string;
  description: string;
  pictures: string[];
}

const ClientDecoration = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [filteredDecorations, setFilteredDecorations] = useState<Decoration[]>([]);
  const containerRef = useRef(null);
  const width = useResizeObserver(containerRef);

  // جلب البيانات من الواجهة الخلفية
  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const response = await api.get('/decorations/active');
        setDecorations(response.data);
        setFilteredDecorations(response.data);
      } catch (error) {
        console.error('Error fetching decorations:', error);
      }
    };
    fetchDecorations();
  }, []);

  // تحديث الصور الدوارة كل 3 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === decorations.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [decorations]);

  // البحث عن الديكورات
  useEffect(() => {
    const filtered = decorations.filter((decoration) =>
      decoration.dec_name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredDecorations(filtered);
  }, [searchText, decorations]);

  return (
    <Box ref={containerRef} position="relative">
      {/* خلفية الصور الدوارة */}
      {decorations.length > 0 && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '80vh',
            backgroundImage: `url(${decorations[currentImageIndex]?.pictures[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
            zIndex: -1,
            transition: 'background-image 0.8s ease-in-out',
          }}
        />
      )}

      {/* المحتوى الرئيسي */}
      <Box p={3} position="relative" zIndex={1}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="white" textAlign="center">
          تصفح الديكورات
        </Typography>
        <Typography variant="body1" color="white" mb={3} textAlign="center">
          اختر الديكور المناسب لأي نوع من الاحتفالات سواءً كان زفاف، تخرج، أو مواليد.
        </Typography>

        {/* مربع البحث */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="filled"
            placeholder="ابحث عن اسم الديكور"
            sx={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '& .MuiFilledInput-root': {
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0 0 10px rgba(126, 87, 194, 0.5)',
                },
              },
              '& .MuiInputBase-root': {
                paddingLeft: '10px',
              },
              '& .MuiFilledInput-underline:before': {
                borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
              },
              '& .MuiFilledInput-underline:hover:before': {
                borderBottom: '2px solid rgba(255, 255, 255, 0.8)',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottom: '2px solid #7e57c2',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon
                    icon="mdi:magnify"
                    fontSize={24}
                    style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3} justifyContent={width < 600 ? 'center' : 'flex-start'}>
          {filteredDecorations.map((decoration) => (
            <Grid item xs={12} sm={6} md={4} key={decoration._id}>
              <DecorationCard
                id={decoration._id}
                dec_name={decoration.dec_name}
                pictures={decoration.pictures}
                description={decoration.description} // تمرير الوصف
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientDecoration;
