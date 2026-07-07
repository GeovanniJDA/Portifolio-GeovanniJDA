import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX(-py * 12);
      rotateY(px * 12);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </div>
  );
}
