import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

const SkillsOrbit = () => {
  const orbitRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const skills = [
    { name: 'React', color: '#61DAFB', level: 90 },
    { name: 'Node.js', color: '#68A063', level: 85 },
    { name: 'TypeScript', color: '#007ACC', level: 80 },
    { name: 'Python', color: '#FFD43B', level: 75 },
    { name: 'MongoDB', color: '#4DB33D', level: 85 },
    { name: 'GraphQL', color: '#E535AB', level: 70 },
    { name: 'Docker', color: '#2496ED', level: 75 },
    { name: 'AWS', color: '#FF9900', level: 80 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = orbitRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      ref={orbitRef}
      sx={{
        height: '600px',
        width: '100%',
        position: 'relative',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Center Sphere */}
      <motion.div
        animate={{
          rotateX: mousePosition.y * 20,
          rotateY: mousePosition.x * 20,
        }}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
          boxShadow: '0 0 30px rgba(0,245,255,0.5)',
          position: 'relative',
        }}
      />

      {/* Orbiting Skills */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: x + mousePosition.x * 20,
              y: y + mousePosition.y * 20,
              rotateX: mousePosition.y * 20,
              rotateY: mousePosition.x * 20,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%)`,
            }}
          >
            <Box
              sx={{
                background: 'rgba(10, 15, 45, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '10px 20px',
                border: `2px solid ${skill.color}`,
                boxShadow: `0 0 20px ${skill.color}40`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: `0 0 30px ${skill.color}80`,
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: skill.color,
                  fontWeight: 600,
                  textShadow: `0 0 10px ${skill.color}80`,
                }}
              >
                {skill.name}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  mt: 1,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: skill.color,
                    borderRadius: '2px',
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        );
      })}

      {/* Connecting Lines */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 200;
          const x = Math.cos(angle) * radius + 300;
          const y = Math.sin(angle) * radius + 300;

          return (
            <motion.line
              key={`line-${skill.name}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.2,
              }}
              transition={{ duration: 1, delay: index * 0.1 }}
              x1="300"
              y1="300"
              x2={x}
              y2={y}
              stroke={skill.color}
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default SkillsOrbit; 