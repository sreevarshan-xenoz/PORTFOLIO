import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

const CodeTerminal = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const controls = useAnimation();
  const terminalRef = useRef(null);

  const codeLines = [
    '> const developer = {',
    '    name: "Your Name",',
    '    skills: ["React", "Node.js", "TypeScript"],',
    '    passion: "Building amazing web experiences",',
    '    currentlyLearning: "Always something new",',
    '  };',
    '',
    '> developer.createAwesome();',
    '  // Output: Ready to build something incredible!',
  ];

  const cursorVariants = {
    blink: {
      opacity: [1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  useEffect(() => {
    const typeNextLine = async () => {
      if (currentLine < codeLines.length) {
        await controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        });
        setCurrentLine(prev => prev + 1);
      }
    };

    const timeout = setTimeout(typeNextLine, 500);
    return () => clearTimeout(timeout);
  }, [currentLine, controls]);

  return (
    <Box
      ref={terminalRef}
      sx={{
        background: 'rgba(10, 15, 45, 0.9)',
        borderRadius: 2,
        p: 3,
        fontFamily: 'Monaco, monospace',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,245,255,0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '25px',
          background: 'rgba(0,245,255,0.1)',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
      }}
    >
      {/* Terminal Controls */}
      <Box sx={{ 
        position: 'absolute',
        top: '8px',
        left: '12px',
        display: 'flex',
        gap: 1,
      }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((color, index) => (
          <Box
            key={color}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: color,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>

      {/* Terminal Content */}
      <Box sx={{ mt: 3 }}>
        {codeLines.slice(0, currentLine).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            style={{ 
              display: 'flex',
              minHeight: '24px',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: line.startsWith('>')
                  ? '#00f5ff'
                  : line.startsWith('//')
                  ? '#666'
                  : '#fff',
                fontFamily: 'Monaco, monospace',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {line}
            </Typography>
          </motion.div>
        ))}
        <motion.div
          variants={cursorVariants}
          animate="blink"
          style={{
            width: '8px',
            height: '16px',
            backgroundColor: '#00f5ff',
            display: currentLine < codeLines.length ? 'block' : 'none',
          }}
        />
      </Box>

      {/* Glowing Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default CodeTerminal; 