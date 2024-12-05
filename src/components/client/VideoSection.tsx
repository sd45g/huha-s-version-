// src/components/VideoSection.tsx

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import videoSource from 'assets/images/512_reactions_52_comments_qasr_ulmuhra_qasr_almohra_qasru_lmuhra.mp4';

const VideoSection = () => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100vw"
      height="calc(100vh - 90px)" // ارتفاع الفيديو ناقص ارتفاع Topbar
      zIndex={-1}
      overflow="hidden"
    >
      <Box
        component="video"
        src={videoSource}
        autoPlay
        loop
        muted
        width="100%"
        height="100%"
        sx={{
          objectFit: 'cover',
        }}
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgcolor="rgba(0, 0, 0, 0.6)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" color="white" fontWeight={600} textAlign="center">
          مرحبًا بكم في قاعة قصر المهره
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoSection;
