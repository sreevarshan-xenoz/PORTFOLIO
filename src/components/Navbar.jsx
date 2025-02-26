import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      backgroundColor: scrolled ? 'rgba(10, 15, 45, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
    });
  }, [scrolled, controls]);

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <motion.div
      animate={controls}
      initial={{ backgroundColor: 'transparent' }}
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
      }}
    >
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: 'Orbitron',
                fontSize: '1.5rem',
                color: '#00f5ff',
                textShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
              }}
            >
              Portfolio
            </Box>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button
                  color="primary"
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00f5ff)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                  }}
                >
                  {item}
                </Button>
              </motion.div>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar; 