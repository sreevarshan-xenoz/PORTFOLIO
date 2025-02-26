import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LinkedIn, GitHub, Email, Twitter } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState(null);

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formState);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <GitHub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Email />, url: 'mailto:your.email@example.com', label: 'Email' },
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
      id="contact"
      sx={{
        py: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(0deg, rgba(5,7,20,1) 0%, rgba(10,15,45,0.8) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
              Get In Touch
            </Typography>
          </motion.div>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    p: 4,
                    background: 'rgba(10, 15, 45, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.3)',
                            transition: 'all 0.3s ease',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00f5ff',
                          },
                        },
                        mb: 2,
                        transform: focusedField === 'name' ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00f5ff',
                          },
                        },
                        mb: 2,
                        transform: focusedField === 'email' ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(0, 245, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00f5ff',
                          },
                        },
                        transform: focusedField === 'message' ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'linear-gradient(45deg, #00f5ff, #ff0099)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover::before': {
                        left: '100%',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(10, 15, 45, 0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
                    Let's Connect
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    Feel free to reach out for collaborations or just a friendly hello! I'm always open
                    to discussing new projects, creative ideas, or opportunities to be part of your
                    visions.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.label}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: '#00f5ff',
                            '&:hover': {
                              background: 'rgba(0, 245, 255, 0.1)',
                            },
                          }}
                          aria-label={social.label}
                        >
                          {social.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact; 