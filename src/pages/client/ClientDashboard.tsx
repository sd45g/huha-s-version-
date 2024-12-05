import VideoSection from 'components/client/VideoSection';
import AdCarousel from 'components/client/AdCarousel';
// import AdDisplay from 'components/client/AdDisplay';
// import DecorationsDisplay from 'components/client/DecorationsDisplay';
import AllImagesMasonryDisplay from 'components/client/AllImagesMasonryDisplay';
import PromotionalSection from 'components/client/PromotionalSection';
import { Box } from '@mui/material';

const ClientDashboard = () => {
  return (
    <>
      <VideoSection />
      <Box sx={{ mt: 45 }} px={3.5}>
        {' '}
        {/* إضافة مسافة بين المكونات */}
        <AdCarousel />
        {/* <AdDisplay /> */}
        <PromotionalSection />
      </Box>

      <AllImagesMasonryDisplay />
    </>
  );
};

export default ClientDashboard;
