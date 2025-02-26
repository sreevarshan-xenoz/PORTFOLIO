import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SkillsOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  // Mouse movement tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Create particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Particle animation
  useEffect(() => {
    let animationFrame;
    
    const animateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        return particle;
      });

      animationFrame = requestAnimationFrame(animateParticles);
    };

    animateParticles();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const skills = [
    {
      name: 'Frontend',
      icon: '⚛️',
      color: '#00f5ff',
      items: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Vue.js', level: 80 },
        { name: 'TypeScript', level: 85 },
      ]
    },
    {
      name: 'Backend',
      icon: '🔧',
      color: '#ff0099',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Express', level: 85 },
        { name: 'FastAPI', level: 75 },
      ]
    },
    {
      name: 'Database',
      icon: '🗄️',
      color: '#FFD700',
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Firebase', level: 80 },
      ]
    },
    {
      name: 'DevOps',
      icon: '🚀',
      color: '#7FFF00',
      items: [
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 80 },
        { name: 'Kubernetes', level: 70 },
      ]
    },
    {
      name: 'UI/UX',
      icon: '🎨',
      color: '#FF4500',
      items: [
        { name: 'Figma', level: 85 },
        { name: 'Tailwind', level: 90 },
        { name: 'SCSS', level: 85 },
        { name: 'Material-UI', level: 85 },
      ]
    },
    {
      name: 'Tools',
      icon: '🛠️',
      color: '#9370DB',
      items: [
        { name: 'Git', level: 90 },
        { name: 'Webpack', level: 80 },
        { name: 'Jest', level: 85 },
        { name: 'VS Code', level: 90 },
      ]
    }
  ];

  const hexagonSize = { width: 150, height: 170 };
  const gap = 10;

  const getHexPosition = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const offset = row % 2 === 0 ? 0 : hexagonSize.width / 2 + gap / 2;
    
    return {
      x: col * (hexagonSize.width + gap) + offset,
      y: row * (hexagonSize.height * 0.75 + gap),
    };
  };

  // Calculate rotation based on mouse position
  const calculateRotation = (x, y, mouseX, mouseY) => {
    const deltaX = mouseX - x;
    const deltaY = mouseY - y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      {/* Floating particles */}
      {particlesRef.current.map((particle, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(0, 245, 255, 0.3)',
            zIndex: 0,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          height: '600px',
        }}
      >
        {/* Connecting lines between hexagons */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {skills.map((skill, i) => {
            const pos1 = getHexPosition(i);
            return skills.slice(i + 1).map((_, j) => {
              const pos2 = getHexPosition(i + j + 1);
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={pos1.x + hexagonSize.width / 2}
                  y1={pos1.y + hexagonSize.height / 2}
                  x2={pos2.x + hexagonSize.width / 2}
                  y2={pos2.y + hexagonSize.height / 2}
                  stroke={skill.color}
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              );
            });
          })}
        </svg>

        {skills.map((skill, index) => {
          const pos = getHexPosition(index);
          const isHovered = hoveredSkill === skill.name;
          const rotation = calculateRotation(
            pos.x + hexagonSize.width / 2,
            pos.y + hexagonSize.height / 2,
            mousePosition.x,
            mousePosition.y
          );

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: pos.x,
                y: pos.y,
                rotateX: isHovered ? 0 : 20,
                rotateY: isHovered ? 0 : -20,
                rotateZ: isHovered ? 0 : rotation / 10, // Subtle rotation following mouse
                zIndex: isHovered ? 2 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: index * 0.1,
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              style={{
                position: 'absolute',
                width: hexagonSize.width,
                height: hexagonSize.height,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, rgba(10, 15, 45, 0.4), rgba(10, 15, 45, 0.2))`,
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${isHovered ? skill.color : skill.color + '40'}`,
                  transition: 'all 0.3s ease',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  boxShadow: isHovered ? `0 0 30px ${skill.color}40` : 'none',
                  transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    padding: 2,
                    background: `linear-gradient(135deg, ${skill.color}40, transparent)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {skill.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: skill.color,
                      textShadow: `0 0 10px ${skill.color}40`,
                      textAlign: 'center',
                    }}
                  >
                    {skill.name}
                  </Typography>
                </motion.div>

                {/* Glowing orbs around hexagon when hovered */}
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: skill.color,
                          filter: 'blur(5px)',
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </>
                )}
              </Box>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '250px',
                      zIndex: 10,
                    }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(10, 15, 45, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '15px',
                        p: 3,
                        border: `2px solid ${skill.color}`,
                        boxShadow: `0 0 30px ${skill.color}40`,
                        mt: 2,
                      }}
                    >
                      {skill.items.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography>{item.name}</Typography>
                              <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                {item.level}%
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                height: '4px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '2px',
                                overflow: 'hidden',
                              }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.level}%` }}
                                transition={{ duration: 0.5 }}
                                style={{
                                  height: '100%',
                                  background: skill.color,
                                  borderRadius: '2px',
                                }}
                              />
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Enhanced background glow effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            opacity: hoveredSkill ? 0.8 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
};

export default SkillsOrbit; 