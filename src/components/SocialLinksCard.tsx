import { ShareNetwork, LinkedinLogo, XLogo } from '@phosphor-icons/react';
import { Magnetic } from './Magnetic';
import { GlassPanel } from './GlassPanel';
import { TiltCard } from './TiltCard';
import { siteConfig } from '../data/content';
import { type ComponentType } from 'react';
import { type IconProps } from '@phosphor-icons/react';

interface SocialLink {
  name: string;
  url: string;
  icon: ComponentType<IconProps>;
}

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: siteConfig.social.linkedin, icon: LinkedinLogo },
  { name: 'Twitter', url: siteConfig.social.twitter, icon: XLogo },
];

export function SocialLinksCard() {
  return (
    <GlassPanel className="p-8 flex flex-col justify-between group hover:border-neon">
      <TiltCard className="h-full flex flex-col">
        <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
          <ShareNetwork size={20} className="text-neon" /> Conecte-se
        </h3>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Magnetic key={link.name} className="flex-1 flex">
                <a
                  href={link.url}
                  aria-label={`Visitar perfil no ${link.name}`}
                  className="w-full flex flex-col items-center justify-center gap-2 bg-chat p-4 rounded-2xl border border-chat hover:border-neon transition-all group/social focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon cursor-none"
                >
                  <Icon size={30} className="text-muted group-hover/social:text-neon transition-colors" />
                  <span className="text-xs text-muted group-hover/social:text-neon transition-colors font-medium">{link.name}</span>
                </a>
              </Magnetic>
            );
          })}
        </div>
      </TiltCard>
    </GlassPanel>
  );
}
