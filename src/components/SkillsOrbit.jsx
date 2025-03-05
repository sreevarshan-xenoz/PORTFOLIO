import { useState, useRef, useMemo, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized Skill Item component
const SkillItem = memo(({ skill, level }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>{skill}</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
          {level}%
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
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            background: 'currentColor',
            borderRadius: '2px',
          }}
        />
      </Box>
    </Box>
  </motion.div>
));

// Memoized Hexagon component
const Hexagon = memo(({ skill, isHovered, position, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y,
        rotateX: isHovered ? 0 : 20,
        rotateY: isHovered ? 0 : -20,
        zIndex: isHovered ? 2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{
        position: 'absolute',
        width: position.width,
        height: position.height,
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
              {skill.items.map((item) => (
                <SkillItem key={item.name} skill={item.name} level={item.level} />
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const SkillsOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);

  // Memoize skills data
  const skills = useMemo(() => [
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
  ], []);

  // Memoize hexagon size and gap
  const hexagonConfig = useMemo(() => ({
    size: { width: 150, height: 170 },
    gap: 10
  }), []);

  // Memoize position calculation
  const getHexPosition = useMemo(() => (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const offset = row % 2 === 0 ? 0 : hexagonConfig.size.width / 2 + hexagonConfig.gap / 2;
    
    return {
      x: col * (hexagonConfig.size.width + hexagonConfig.gap) + offset,
      y: row * (hexagonConfig.size.height * 0.75 + hexagonConfig.gap),
      width: hexagonConfig.size.width,
      height: hexagonConfig.size.height,
    };
  }, [hexagonConfig]);

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
                  x1={pos1.x + pos1.width / 2}
                  y1={pos1.y + pos1.height / 2}
                  x2={pos2.x + pos2.width / 2}
                  y2={pos2.y + pos2.height / 2}
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

        {/* Hexagons */}
        {skills.map((skill, index) => (
          <Hexagon
            key={skill.name}
            skill={skill}
            isHovered={hoveredSkill === skill.name}
            position={getHexPosition(index)}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          />
        ))}

        {/* Background glow effect */}
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