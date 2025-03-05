import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isHoverable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('[data-hoverable]') ||
        target.tagName === 'CANVAS';
      
      setIsHovering(isHoverable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

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
          height: '8px',
          width: '8px',
          backgroundColor: '#00f5ff',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
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
          border: '1px solid rgba(0, 245, 255, 0.5)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(0, 245, 255, 0.8)' : 'rgba(0, 245, 255, 0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      />
      {isHovering && (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: cursorXSpring,
            y: cursorYSpring,
            pointerEvents: 'none',
            zIndex: 9997,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Cursor; 