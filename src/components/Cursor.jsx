import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Cursor = ({ mousePosition }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const frameRef = useRef(null);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateCursorPosition = () => {
      cursorX.set(mousePosition.x);
      cursorY.set(mousePosition.y);
      frameRef.current = requestAnimationFrame(updateCursorPosition);
    };

    frameRef.current = requestAnimationFrame(updateCursorPosition);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [mousePosition, cursorX, cursorY, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      const shouldHover = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.getAttribute('data-hoverable');
      
      if (shouldHover !== isHovering) {
        setIsHovering(shouldHover);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isHovering, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          pointerEvents: 'none',
          zIndex: 9999,
          height: '10px',
          width: '10px',
          backgroundColor: '#00f5ff',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          willChange: 'transform',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          pointerEvents: 'none',
          zIndex: 9998,
          height: '40px',
          width: '40px',
          border: '2px solid rgba(0, 245, 255, 0.5)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          willChange: 'transform',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};

export default Cursor; 