import { GithubLogo } from '@phosphor-icons/react';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { siteConfig } from '../data/content';

export function GitHubStatsCard() {
  return (
    <GlassPanel className="p-8 group hover:border-neon">
      <TiltCard>
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <GithubLogo size={20} className="text-neon" /> GitHub Stats
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minWidth: 0 }}>
          <div className="bg-chat p-3 rounded-2xl border border-chat text-center">
            <span className="block text-2xl font-bold text-neon text-shadow overflow-hidden text-ellipsis whitespace-nowrap">
              {siteConfig.stats.contributions}
            </span>
            <span className="text-xs text-muted">Contribuições</span>
          </div>
          <div className="bg-chat p-3 rounded-2xl border border-chat text-center">
            <span className="block text-2xl font-bold text-neon text-shadow overflow-hidden text-ellipsis whitespace-nowrap">
              {siteConfig.stats.repos}
            </span>
            <span className="text-xs text-muted">Repositórios</span>
          </div>
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
