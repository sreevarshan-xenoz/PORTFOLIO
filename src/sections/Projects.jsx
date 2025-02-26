import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip, IconButton } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { GitHub, Launch, Code } from '@mui/icons-material';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
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
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      <Box
        sx={{
          position: 'relative',
          background: 'rgba(10, 15, 45, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,245,255,0.1), rgba(255,0,153,0.1))',
            transform: 'translateZ(-1px)',
          },
        }}
      >
        <motion.div
          style={{
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              transform: 'translateZ(20px)',
            }}
          />
          <Box sx={{ p: 3, transform: 'translateZ(30px)' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                color: 'primary.main',
                textShadow: '0 0 10px rgba(0,245,255,0.5)',
              }}
            >
              {project.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    background: 'rgba(0, 245, 255, 0.1)',
                    color: '#00f5ff',
                    transform: 'translateZ(40px)',
                    '&:hover': {
                      background: 'rgba(0, 245, 255, 0.2)',
                    },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              transform: 'translateZ(40px)',
            }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  component="a"
                  href={project.github}
                  target="_blank"
                  sx={{
                    color: '#00f5ff',
                    '&:hover': {
                      transform: 'translateZ(50px) scale(1.1)',
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href={project.live}
                  target="_blank"
                  sx={{
                    color: '#00f5ff',
                    '&:hover': {
                      transform: 'translateZ(50px) scale(1.1)',
                    },
                  }}
                >
                  <Launch />
                </IconButton>
              </Box>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{ transform: 'translateZ(50px)' }}
              >
                <Typography
                  variant="button"
                  sx={{
                    color: '#ff0099',
                    cursor: 'pointer',
                    '&:hover': {
                      textShadow: '0 0 10px rgba(255,0,153,0.5)',
                    },
                  }}
                >
                  Learn More
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
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
      description: "A modern web application built with React and Node.js",
      image: "https://via.placeholder.com/400x250",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      live: "https://example.com",
    },
    // Add more projects...
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
        background: 'linear-gradient(180deg, rgba(5,7,20,1) 0%, rgba(10,15,45,0.8) 100%)',
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
              textShadow: '0 0 20px rgba(0,245,255,0.3)',
            }}
          >
            Projects
          </Typography>

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
                    px: 3,
                    py: 1,
                    borderRadius: '20px',
                    cursor: 'pointer',
                    background: selectedFilter === filter
                      ? 'linear-gradient(45deg, rgba(0,245,255,0.2), rgba(255,0,153,0.2))'
                      : 'transparent',
                    border: '1px solid',
                    borderColor: selectedFilter === filter ? '#00f5ff' : 'rgba(0,245,255,0.3)',
                    color: selectedFilter === filter ? '#00f5ff' : 'white',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00f5ff',
                      boxShadow: '0 0 10px rgba(0,245,255,0.3)',
                    },
                  }}
                >
                  {filter}
                </Box>
              </motion.div>
            ))}
          </Box>

          <Grid container spacing={4}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.id}>
                <ProjectCard project={project} index={index} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects; 