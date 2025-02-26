import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background lines */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ x: '-100%' }}
            animate={{
              x: '100%',
              transition: {
                duration: 3.5 + index,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{
              position: 'absolute',
              height: '1px',
              width: '100%',
              background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
              top: `${20 + index * 20}%`,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hi, I'm [Your Name]
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                color: 'primary.main',
                mb: 3,
              }}
            >
              Full Stack Developer
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                mb: 4,
              }}
            >
              Crafting digital experiences with code and creativity. Specialized in building
              modern web applications with cutting-edge technologies.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                display: 'inline-block',
                position: 'relative',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: '2px solid #00f5ff',
                  animation: 'pulse 2s infinite',
                },
              }}
            >
              <Typography
                sx={{
                  px: 4,
                  py: 2,
                  color: '#00f5ff',
                  fontWeight: 600,
                  letterSpacing: 2,
                }}
              >
                VIEW MY WORK
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </Box>
  );
};

export default Hero; 