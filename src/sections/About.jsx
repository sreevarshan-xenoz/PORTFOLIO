import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import CodeTerminal from '../components/CodeTerminal';
import SkillsOrbit from '../components/SkillsOrbit';
import Timeline3D from '../components/Timeline3D';

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
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(10, 15, 45, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: 2,
                    height: '100%',
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
                <CodeTerminal />
              </motion.div>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8, mb: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  textAlign: 'center',
                  color: 'primary.main',
                }}
              >
                Skills & Technologies
              </Typography>
              <SkillsOrbit />
            </motion.div>
          </Box>

          <Box sx={{ mt: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  textAlign: 'center',
                  color: 'primary.main',
                }}
              >
                Experience Timeline
              </Typography>
              <Timeline3D />
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 