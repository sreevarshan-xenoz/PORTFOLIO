import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsOrbit = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

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

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
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
        {skills.map((skill, index) => {
          const pos = getHexPosition(index);
          const isSelected = selectedSkill === skill.name;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: pos.x,
                y: pos.y,
                rotateX: isSelected ? 0 : 20,
                rotateY: isSelected ? 0 : -20,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: index * 0.1,
              }}
              onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
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
                  border: `2px solid ${skill.color}40`,
                  transition: 'all 0.3s ease',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  '&:hover': {
                    border: `2px solid ${skill.color}`,
                    boxShadow: `0 0 20px ${skill.color}40`,
                    transform: 'translateZ(10px)',
                  },
                }}
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
              </Box>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                width: '300px',
              }}
            >
              <Box
                sx={{
                  background: 'rgba(10, 15, 45, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '15px',
                  p: 3,
                  border: `2px solid ${skills.find(s => s.name === selectedSkill)?.color}`,
                  boxShadow: `0 0 30px ${skills.find(s => s.name === selectedSkill)?.color}40`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Typography variant="h4">
                    {skills.find(s => s.name === selectedSkill)?.icon}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: skills.find(s => s.name === selectedSkill)?.color,
                      textShadow: `0 0 10px ${skills.find(s => s.name === selectedSkill)?.color}40`,
                    }}
                  >
                    {selectedSkill}
                  </Typography>
                </Box>

                {skills
                  .find(s => s.name === selectedSkill)
                  ?.items.map((item, index) => (
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
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{
                              height: '100%',
                              background: skills.find(s => s.name === selectedSkill)?.color,
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
            opacity: selectedSkill ? 0.8 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
};

export default SkillsOrbit; 