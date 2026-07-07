import { Pulse } from '@phosphor-icons/react';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { siteConfig } from '../data/content';

export function StatusCard() {
  return (
    <GlassPanel className="p-8 flex flex-col justify-between hover:border-neon group">
      <TiltCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Status Atual</h3>
          <Pulse size={20} className="text-neon" />
        </div>
        <div className="flex items-center gap-4 bg-chat p-4 rounded-2xl border border-chat group-hover:border-neon transition-colors">
          <div className="relative flex h-4 w-4" role="status" aria-label="Status: disponível">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-neon shadow-[0_0_12px_currentColor]" />
          </div>
          <div>
            <p className="font-bold text-neon">{siteConfig.statusText}</p>
            <p className="text-xs text-muted">{siteConfig.statusSubtext}</p>
          </div>
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
