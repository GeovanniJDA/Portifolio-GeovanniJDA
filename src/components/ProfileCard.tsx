import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';

export function ProfileCard() {
  return (
    <GlassPanel className="p-1.5 flex flex-col relative overflow-hidden min-h-[320px] group">
      <TiltCard className="w-full h-full">
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative min-h-[300px]">
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale hover:grayscale-0"
            role="img"
            aria-label="Foto de perfil"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
            <span className="relative flex h-2.5 w-2.5" role="status" aria-label="Disponível para trabalho">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon" />
            </span>
            <span className="text-xs font-medium text-gray-200">Open to work</span>
          </div>
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
