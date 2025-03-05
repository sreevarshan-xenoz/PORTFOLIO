import { useEffect, useRef, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);
  const contextRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const [isHovering, setIsHovering] = useState(false);

  // Memoize particle creation
  const createParticles = useMemo(() => (width, height) => {
    const particleCount = Math.min(30, Math.floor((width * height) / 50000));
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      originalSize: Math.random() * 3 + 1,
      color: `hsla(${Math.random() * 60 + 180}, 100%, 50%, 0.3)`, // Cyan to blue range
    }));
  }, []);

  // Throttled resize handler
  const handleResize = useMemo(
    () =>
      throttle(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesRef.current = createParticles(canvas.width, canvas.height);
      }, 250),
    [createParticles]
  );

  // Mouse move handler
  const handleMouseMove = useMemo(
    () =>
      throttle((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 150,
        };
      }, 16),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    contextRef.current = ctx;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesRef.current = createParticles(canvas.width, canvas.height);

    const drawParticles = () => {
      if (!contextRef.current) return;
      const ctx = contextRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Particle behavior based on mouse proximity
        if (distance < mouse.radius && isHovering) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          // Push particles away from mouse
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
          
          // Increase particle size when near mouse
          particle.size = particle.originalSize * (1 + force);
        } else {
          // Return to original size
          particle.size = particle.originalSize;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Screen wrapping
        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections
      if (frameRef.current % 2 === 0) {
        ctx.beginPath();
        
        const maxDistance = 100;
        const maxDistanceSquared = maxDistance * maxDistance;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSquared = dx * dx + dy * dy;

            if (distSquared < maxDistanceSquared) {
              const opacity = (1 - Math.sqrt(distSquared) / maxDistance) * 0.5;
              ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      frameRef.current = requestAnimationFrame(drawParticles);
    };

    frameRef.current = requestAnimationFrame(drawParticles);
    
    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseenter', () => setIsHovering(true));
    canvas.addEventListener('mouseleave', () => setIsHovering(false));

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', () => setIsHovering(true));
      canvas.removeEventListener('mouseleave', () => setIsHovering(false));
      handleResize.cancel();
      handleMouseMove.cancel();
    };
  }, [createParticles, handleResize, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        zIndex: 1,
        pointerEvents: 'auto', // Changed to enable mouse interaction
        opacity: 0.5,
        willChange: 'transform',
        cursor: 'none', // Hide cursor for better effect
      }}
    />
  );
};

export default ParticlesBackground; 