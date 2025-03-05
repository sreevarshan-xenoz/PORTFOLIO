import { useEffect, useRef, useMemo } from 'react';
import throttle from 'lodash/throttle';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);
  const contextRef = useRef(null);

  // Memoize particle creation
  const createParticles = useMemo(() => (width, height) => {
    const particleCount = Math.min(20, Math.floor((width * height) / 70000)); // Reduced count
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.05, // Reduced velocity
      vy: (Math.random() - 0.5) * 0.05,
      size: Math.random() * 2 + 0.5, // Smaller particles
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 768) return; // Don't render on mobile

    const ctx = canvas.getContext('2d', { alpha: true });
    contextRef.current = ctx;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesRef.current = createParticles(canvas.width, canvas.height);

    const drawParticles = () => {
      if (!contextRef.current) return;
      const ctx = contextRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Batch particle drawing
      ctx.beginPath();
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Efficient screen wrapping
        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;

        ctx.moveTo(particle.x, particle.y);
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      });

      ctx.fillStyle = 'rgba(0, 245, 255, 0.3)';
      ctx.fill();

      // Draw connections every other frame
      if (frameRef.current % 2 === 0) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
        ctx.lineWidth = 0.5;

        const maxDistance = 100;
        const maxDistanceSquared = maxDistance * maxDistance;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSquared = dx * dx + dy * dy;

            if (distSquared < maxDistanceSquared) {
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
            }
          }
        }
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(drawParticles);
    };

    frameRef.current = requestAnimationFrame(drawParticles);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [createParticles, handleResize]);

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
        pointerEvents: 'none',
        opacity: 0.5,
        willChange: 'transform',
      }}
    />
  );
};

export default ParticlesBackground; 