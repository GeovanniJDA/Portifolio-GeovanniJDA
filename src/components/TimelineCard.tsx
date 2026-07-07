import { HourglassMedium } from '@phosphor-icons/react';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { timeline } from '../data/content';

export function TimelineCard() {
  return (
    <GlassPanel colSpan="2" className="p-8 hover:border-neon">
      <TiltCard>
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <HourglassMedium size={20} className="text-neon" /> Cronologia Profissional
        </h3>
        <div className="timeline">
          {timeline.map((entry) => (
            <div key={entry.id} className="timeline-item">
              <span className="text-sm text-neon font-bold">{entry.period}</span>
              <h4 className="text-lg font-bold mt-1">{entry.role}</h4>
              <p className="text-muted">{entry.company}</p>
              <p className="text-sm text-muted mt-2">{entry.description}</p>
            </div>
          ))}
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
