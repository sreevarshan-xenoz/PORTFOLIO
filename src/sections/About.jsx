import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'SQL', level: 85 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <Box
      id="about"
      sx={{
        py: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                mb: 6,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About Me
            </Typography>
          </motion.div>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                variants={itemVariants}
                style={{ height: '100%' }}
              >
                <Paper
                  component={motion.div}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(10, 15, 45, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
                    Who I Am
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    A passionate Full Stack Developer with a keen eye for design and a love for creating
                    seamless user experiences. I specialize in building modern web applications using
                    cutting-edge technologies.
                  </Typography>
                  <Typography variant="body1">
                    With a background in both front-end and back-end development, I bring ideas to life
                    through clean code and creative problem-solving.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(10, 15, 45, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {skills.map((skill, index) => (
                      <Box key={skill.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{skill.name}</Typography>
                          <Typography variant="body2" color="primary">
                            {skill.level}%
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: '100%',
                            height: '4px',
                            background: 'rgba(0, 245, 255, 0.1)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #00f5ff, #ff0099)',
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} style={{ marginTop: '4rem' }}>
            <Paper
              sx={{
                p: 4,
                background: 'rgba(10, 15, 45, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: 4, color: 'primary.main' }}>
                Experience
              </Typography>
              <Box sx={{ position: 'relative' }}>
                {/* Vertical line */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '15px',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(180deg, #00f5ff, #ff0099)',
                  }}
                />
                
                {/* Experience items */}
                {['2023', '2022', '2021'].map((year, index) => (
                  <Box
                    key={year}
                    sx={{
                      position: 'relative',
                      pl: 5,
                      pb: 4,
                      '&:last-child': { pb: 0 },
                    }}
                  >
                    {/* Timeline dot */}
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.2 }}
                      sx={{
                        position: 'absolute',
                        left: '8px',
                        top: '0',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#00f5ff',
                        boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
                      }}
                    />
                    
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      {year}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Position Title
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Description of your role and achievements. Add your actual experience here.
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 