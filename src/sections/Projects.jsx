import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip, IconButton } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { GitHub, Launch, Code } from '@mui/icons-material';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse movement tracking for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse movement into rotation
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Smooth spring animations
  const springConfig = { stiffness: 150, damping: 15 };
  const scaleSpring = useSpring(1, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scaleSpring.set(1);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        x: 0,
        y: 0,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: 'relative',
          background: 'rgba(10, 15, 45, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s ease',
          boxShadow: isHovered 
            ? '0 0 30px rgba(0, 245, 255, 0.2), inset 0 0 30px rgba(0, 245, 255, 0.1)'
            : '0 0 20px rgba(0, 0, 0, 0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(125deg, 
              rgba(255,255,255,0.2) 0%, 
              rgba(255,255,255,0.05) 40%, 
              transparent 60%, 
              rgba(255,255,255,0.1) 100%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: -2,
            background: `linear-gradient(125deg,
              #00f5ff40,
              #ff009940)`,
            borderRadius: 4,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: -1,
          },
        }}
      >
        {/* Project Image with Parallax Effect */}
        <motion.div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '16px 16px 0 0',
              filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(1)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(0, 245, 255, 0.1)',
            }}
          />
          {/* Image Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '250px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 45, 0.8) 100%)',
              opacity: isHovered ? 0.8 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          />
        </motion.div>

        {/* Content Container */}
        <Box 
          sx={{ 
            p: 3,
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease',
            background: 'linear-gradient(180deg, rgba(10, 15, 45, 0.4) 0%, rgba(10, 15, 45, 0.8) 100%)',
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              color: 'primary.main',
              textShadow: isHovered 
                ? '0 0 15px rgba(0,245,255,0.8), 0 0 30px rgba(0,245,255,0.4)'
                : '0 0 10px rgba(0,245,255,0.5)',
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
              transition: 'all 0.3s ease',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {project.title}
          </Typography>

          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2,
              color: 'rgba(255,255,255,0.9)',
              transform: isHovered ? 'translateZ(35px)' : 'translateZ(0)',
              transition: 'all 0.3s ease',
              lineHeight: 1.6,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {project.description}
          </Typography>

          {/* Technologies */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 3,
              transform: isHovered ? 'translateZ(45px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  background: isHovered 
                    ? 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(255,0,153,0.2))'
                    : 'rgba(0, 245, 255, 0.1)',
                  color: '#00f5ff',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,245,255,0.3)',
                  fontWeight: 500,
                  '&:hover': {
                    background: 'rgba(0, 245, 255, 0.3)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 15px rgba(0,245,255,0.3)',
                  },
                }}
              />
            ))}
          </Box>

          {/* Action Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease',
              pt: 1,
              borderTop: '1px solid rgba(0,245,255,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {project.github && (
                <IconButton
                  component="a"
                  href={project.github}
                  target="_blank"
                  sx={{
                    color: '#00f5ff',
                    background: isHovered ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0,245,255,0.3)',
                    '&:hover': {
                      background: 'rgba(0, 245, 255, 0.2)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 15px rgba(0,245,255,0.3)',
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
              )}
              {project.live && (
                <IconButton
                  component="a"
                  href={project.live}
                  target="_blank"
                  sx={{
                    color: '#00f5ff',
                    background: isHovered ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0,245,255,0.3)',
                    '&:hover': {
                      background: 'rgba(0, 245, 255, 0.2)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 15px rgba(0,245,255,0.3)',
                    },
                  }}
                >
                  <Launch />
                </IconButton>
              )}
            </Box>

            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ 
                transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  color: '#ff0099',
                  cursor: 'pointer',
                  textShadow: isHovered ? '0 0 20px rgba(255,0,153,0.8)' : 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  '&:hover': {
                    color: '#ff3366',
                  },
                }}
              >
                Learn More
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Enhanced glowing dots in corners when hovered */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  background: '#00f5ff',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px #00f5ff, 0 0 30px #00f5ff',
                  animation: 'pulse 2s infinite',
                  ...{
                    0: { top: '15px', left: '15px' },
                    1: { top: '15px', right: '15px' },
                    2: { bottom: '15px', left: '15px' },
                    3: { bottom: '15px', right: '15px' },
                  }[i],
                }}
              />
            ))}
          </>
        )}
      </Box>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A modern web application built with React and Node.js, featuring real-time updates and a responsive design.",
      image: "https://via.placeholder.com/400x250",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      id: 2,
      title: "Project Two",
      description: "An e-commerce platform with advanced filtering and search capabilities.",
      image: "https://via.placeholder.com/400x250",
      category: "frontend",
      technologies: ["Vue.js", "Vuex", "TailwindCSS", "Firebase"],
      github: "https://github.com",
      live: "https://example.com",
    },
    // Add more projects as needed
  ];

  const filters = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.category === selectedFilter);

  return (
    <Box
      ref={containerRef}
      id="projects"
      sx={{
        py: 10,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(5,7,20,1) 0%, rgba(10,15,45,0.9) 50%, rgba(5,7,20,1) 100%)',
        perspective: '1000px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.05), transparent)',
          transform: 'translateY(-50%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0,245,255,0.3)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
              },
            }}
          >
            Projects
          </Typography>

          {/* Filter Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 6,
              flexWrap: 'wrap',
            }}
          >
            {filters.map((filter) => (
              <motion.div
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  onClick={() => setSelectedFilter(filter)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '25px',
                    cursor: 'pointer',
                    background: selectedFilter === filter
                      ? 'linear-gradient(45deg, rgba(0,245,255,0.2), rgba(255,0,153,0.2))'
                      : 'transparent',
                    border: '1px solid',
                    borderColor: selectedFilter === filter ? '#00f5ff' : 'rgba(0,245,255,0.3)',
                    color: selectedFilter === filter ? '#00f5ff' : 'white',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s ease',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    '&:hover': {
                      borderColor: '#00f5ff',
                      boxShadow: '0 0 20px rgba(0,245,255,0.3)',
                      background: 'rgba(0,245,255,0.1)',
                    },
                  }}
                >
                  {filter}
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Projects Grid */}
          <Grid container spacing={4}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.id}>
                <ProjectCard project={project} index={index} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Add a global style for the pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Projects; 