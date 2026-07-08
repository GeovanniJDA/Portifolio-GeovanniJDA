import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProjectorScreen, ArrowUpRight } from '@phosphor-icons/react';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { projects } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Duplicate items for seamless infinite loop (the -50% translation
// moves exactly one full set off-screen, then GSAP repeats from 0).
const carouselItems = [...projects, ...projects];

export function ProjectsCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Do not animate when the user prefers reduced motion
    if (prefersReducedMotion) return;

    // Declared outside gsap.context so the outer return() can call it.
    // gsap.context() never invokes the return value of its callback,
    // so listeners placed only inside there would never be removed.
    let ctxCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Compute the pixel distance to scroll one full set of items.
      // scrollWidth covers both duplicate sets; half of that is one set.
      // Add half the gap so the seam lands exactly on the gap boundary.
      const gapPx = parseFloat(getComputedStyle(track).gap || '24');
      const distance = track.scrollWidth / 2 + gapPx / 2;

      const tween = gsap.to(track, {
        x: -distance,
        repeat: -1,
        duration: 30,
        ease: 'none',
      });

      const container = containerRef.current;
      const pause = () => tween.pause();
      const play = () => tween.play();

      container?.addEventListener('mouseenter', pause);
      container?.addEventListener('mouseleave', play);

      // Store cleanup so the outer return() can call it explicitly.
      ctxCleanup = () => {
        container?.removeEventListener('mouseenter', pause);
        container?.removeEventListener('mouseleave', play);
      };
    }, containerRef);

    return () => {
      ctxCleanup?.();
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <GlassPanel colSpan="3" className="p-8 flex flex-col relative min-h-[400px] overflow-hidden">
      <TiltCard className="relative z-10 flex flex-col h-full w-full">
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <ProjectorScreen size={20} className="text-neon" /> Projetos em Destaque
        </h3>

        {/* carousel-container — mask fades edges, clips overflow */}
        <div
          ref={containerRef}
          className="carousel-container flex-1 flex items-center mt-4"
          style={{ overflow: 'hidden' }}
        >
          {/* carousel-track — GSAP targets this element directly */}
          <div
            ref={trackRef}
            style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}
          >
            {carouselItems.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                style={{ flexShrink: 0, width: '20rem' }}
                className="bg-chat border border-chat rounded-xl overflow-hidden flex flex-col group/project hover:border-neon transition-colors"
              >
                <div className="h-40 bg-gradient-to-br from-neutral-800 to-neutral-900 relative">
                  <div className="absolute inset-0 bg-neon opacity-20 group-hover/project:opacity-40 transition-opacity duration-500 mix-blend-overlay" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                  <p className="text-xs text-muted mb-4 flex-1">{project.description}</p>
                  <a
                    href={project.url}
                    className="text-neon text-sm font-semibold flex items-center gap-1 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
                  >
                    Ver Projeto <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
