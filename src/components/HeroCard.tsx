import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { siteConfig } from '../data/content';

export function HeroCard() {
  return (
    <GlassPanel colSpan="2" className="p-8 flex flex-col justify-between group">
      <TiltCard>
        <div className="flex items-center justify-between mb-8">
          <span className="bg-neon text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {siteConfig.role}
          </span>
          <div className="flex gap-2" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          {siteConfig.tagline}{' '}
          <span className="text-shadow">{siteConfig.taglineHighlight}</span>
        </h1>
        <p className="text-muted text-lg max-w-xl">
          {siteConfig.bio}
        </p>
      </TiltCard>
      <div className="neon-line w-full mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </GlassPanel>
  );
}
