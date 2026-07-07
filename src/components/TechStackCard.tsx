import { CodeBlock } from '@phosphor-icons/react';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { techStack } from '../data/content';

export function TechStackCard() {
  return (
    <GlassPanel className="p-8 hover:border-neon">
      <TiltCard>
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <CodeBlock size={20} className="text-neon" /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-chat-input text-muted px-4 py-2 rounded-xl text-sm font-medium border border-chat hover:border-neon hover:text-neon transition-all cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
