import { lazy, Suspense } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { ProfileCard } from './components/ProfileCard';
import { HeroCard } from './components/HeroCard';
import { StatusCard } from './components/StatusCard';
import { TechStackCard } from './components/TechStackCard';
import { GitHubStatsCard } from './components/GitHubStatsCard';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { TimelineCard } from './components/TimelineCard';
import { ContactCard } from './components/ContactCard';
import { SocialLinksCard } from './components/SocialLinksCard';
import { OrionChat } from './components/OrionChat';
import { useTheme } from './hooks/useTheme';
import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';

// Code-split Three.js / @react-three/* out of the main bundle.
// The particle field is a subtle desktop embellishment — defer its load
// so it never blocks first paint.
const Background3D = lazy(() =>
  import('./components/Background3D').then((m) => ({ default: m.Background3D }))
);

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Skip mounting the WebGL background entirely on touch/coarse-pointer
  // devices (phones, tablets). Not worth the battery and GPU cost there.
  const isCoarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      {!isCoarsePointer && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}
      <div className="min-h-screen p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        <main className="bento-grid max-w-7xl mx-auto w-full relative z-10">
        {/* Row 1: Profile photo + Hero */}
        <ProfileCard />
        <HeroCard />

        {/* Row 2: Status + Tech Stack + GitHub Stats */}
        <StatusCard />
        <TechStackCard />
        <GitHubStatsCard />

        {/* Row 3: Projects carousel (full width) */}
        <ProjectsCarousel />

        {/* Row 4: Timeline + Contact + Social */}
        <TimelineCard />
        <ContactCard />
        <SocialLinksCard />

        {/* Row 5: Orion AI Chat */}
        <OrionChat />
      </main>
    </div>
    </>
  );
}
