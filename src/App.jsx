import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import throttle from 'lodash/throttle';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';

// Lazy load sections
const Hero = lazy(() => import('./sections/Hero'));
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'));

// Memoize theme creation
const createAppTheme = () => createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5ff', // Cyber blue
      light: '#33f7ff',
      dark: '#00aaad',
      contrastText: '#050714',
    },
    secondary: {
      main: '#ff0099', // Neon pink
      light: '#ff33ad',
      dark: '#b3006b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#050714', // Deep space black
      paper: '#0a0f2d',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.2em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    button: {
      letterSpacing: '0.1em',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          position: 'relative',
          overflow: 'hidden',
          textTransform: 'uppercase',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00f5ff)',
            animation: 'btnBorderAnim 2s linear infinite',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: '#00f5ff',
          color: '#050714',
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#0a0f2d',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#00f5ff',
          borderRadius: '4px',
          '&:hover': {
            background: '#ff0099',
          },
        },
      },
    },
  },
});

const darkTheme = createAppTheme();

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: darkTheme.palette.background.default,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    }}
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: darkTheme.palette.primary.main,
          textShadow: `0 0 10px ${darkTheme.palette.primary.main}`,
        }}
      >
        Loading...
      </Typography>
    </motion.div>
  </Box>
);

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Throttled resize handler
  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 768);
    }, 250);

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {!isMobile && <Cursor />}
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <ParticlesBackground />
            <main>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </main>
          </div>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App; 