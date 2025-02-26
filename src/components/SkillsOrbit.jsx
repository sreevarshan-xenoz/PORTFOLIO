import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SkillsOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    {
      category: 'Languages',
      items: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Python', level: 80 },
      ]
    },
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'HTML/CSS', level: 90 },
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'Django', level: 75 },
      ]
    },
    {
      category: 'Database',
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 75 },
      ]
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {skills.map((skillGroup) => (
            <Paper
              key={skillGroup.category}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                p: 3,
                background: 'rgba(10, 15, 45, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 0 30px rgba(0,245,255,0.2)',
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: '#00f5ff',
                  textShadow: '0 0 10px rgba(0,245,255,0.3)',
                }}
              >
                {skillGroup.category}
              </Typography>

              {skillGroup.items.map((skill) => (
                <Box
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  sx={{ mb: 2, cursor: 'pointer' }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: hoveredSkill === skill.name ? '#00f5ff' : 'white',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: hoveredSkill === skill.name ? '#00f5ff' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {skill.level}%
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
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut',
                      }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #00f5ff, #ff0099)',
                        borderRadius: '2px',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default SkillsOrbit; 