import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // How far the element pulls (e.g. 0.3 = 30%)
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const element = magneticRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = element.getBoundingClientRect();
        
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        xTo(x * strength);
        yTo(y * strength);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, magneticRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, strength]);

  return (
    <div ref={magneticRef} className={`w-fit h-fit ${className}`}>
      {children}
    </div>
  );
}
