import { useRef, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TimelineEvent = ({ event, index, isLeft }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: springY,
        rotateY: springRotate,
        zIndex: isHovered ? 2 : 1,
      }}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Paper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          p: 3,
          background: 'rgba(10, 15, 45, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 245, 255, 0.1)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          transform: 'perspective(1000px)',
          position: 'relative',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 30px rgba(0,245,255,0.2)',
            background: 'rgba(10, 15, 45, 0.6)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,245,255,0.1), rgba(255,0,153,0.1))',
            borderRadius: 2,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#00f5ff',
            mb: 1,
            textShadow: '0 0 10px rgba(0,245,255,0.5)',
          }}
        >
          {event.year}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {event.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {event.description}
        </Typography>
        {event.technologies && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {event.technologies.map((tech) => (
              <Box
                key={tech}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: '15px',
                  background: 'rgba(0,245,255,0.1)',
                  color: '#00f5ff',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(0,245,255,0.3)',
                }}
              >
                {tech}
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

const Timeline3D = () => {
  const timelineEvents = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      description: 'Developed and maintained multiple client projects with modern tech stack.',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      description: 'Specialized in creating responsive and interactive user interfaces.',
      technologies: ['React', 'TypeScript', 'Sass'],
    },
    {
      year: '2021',
      title: 'Junior Developer',
      description: 'Started professional journey in web development.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
    },
  ];

  return (
    <Box sx={{ position: 'relative', py: 8 }}>
      {/* Center Line */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, #00f5ff, #ff0099)',
          transform: 'translateX(-50%)',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#00f5ff',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(0,245,255,0.5)',
          },
          '&::before': {
            top: 0,
          },
          '&::after': {
            bottom: 0,
          },
        }}
      />

      {/* Timeline Events */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
        {timelineEvents.map((event, index) => (
          <Box
            key={event.year}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
              mb: 6,
              perspective: '1000px',
            }}
          >
            {index % 2 === 0 ? (
              <>
                <TimelineEvent event={event} index={index} isLeft={true} />
                <Box />
              </>
            ) : (
              <>
                <Box />
                <TimelineEvent event={event} index={index} isLeft={false} />
              </>
            )}
          </Box>
        ))}
      </Box>

      {/* Glowing Orbs */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          sx={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#00f5ff',
            filter: 'blur(5px)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </Box>
  );
};

export default Timeline3D; 