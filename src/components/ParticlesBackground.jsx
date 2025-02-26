import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Don't render on mobile

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Significantly reduced velocities
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.3; // Reduced opacity
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen instead of bouncing (more efficient)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    // Create particles
    const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 50000));
    const particles = Array.from({ length: particleCount }, () => new Particle());
    particlesRef.current = particles;

    // Pre-calculate some values
    const maxDistance = 120; // Reduced connection distance
    const maxDistanceSquared = maxDistance * maxDistance;

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create off-screen buffer for particles
      const particleBuffer = new Path2D();
      
      particles.forEach(particle => {
        particle.update();
        particleBuffer.moveTo(particle.x, particle.y);
        particleBuffer.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
      });

      // Draw all particles at once
      ctx.fillStyle = 'rgba(0, 245, 255, 0.3)';
      ctx.fill(particleBuffer);

      // Only draw connections every 2 frames
      if (frameRef.current % 2 === 0) {
        // Draw connections
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
        ctx.lineWidth = 0.5;

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

    // Start animation
    frameRef.current = requestAnimationFrame(drawParticles);

    // Efficient resize handler
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.forEach(particle => particle.init());
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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