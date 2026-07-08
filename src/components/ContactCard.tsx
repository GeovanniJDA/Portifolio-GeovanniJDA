import { PaperPlaneTilt } from '@phosphor-icons/react';
import { Magnetic } from './Magnetic';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { siteConfig } from '../data/content';

export function ContactCard() {
  return (
    <GlassPanel className="p-8 flex flex-col justify-between cursor-pointer hover:border-neon group">
      <TiltCard>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium">Vamos conversar?</h3>
          <PaperPlaneTilt size={20} className="text-muted group-hover:text-neon transition-colors" />
        </div>
        <p className="text-muted text-sm mb-6">Aberto para novos projetos e oportunidades freelance.</p>
        <Magnetic className="w-full">
          <a
            href={`mailto:${siteConfig.email}`}
            className="block w-full text-center bg-chat-input hover:bg-neon hover:text-black transition-colors rounded-xl py-3 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          >
            {siteConfig.email}
          </a>
        </Magnetic>
      </TiltCard>
    </GlassPanel>
  );
}
