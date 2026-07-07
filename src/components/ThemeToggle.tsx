import { Sun, Moon } from '@phosphor-icons/react';
import { Magnetic } from './Magnetic';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Magnetic className="fixed top-4 right-4 z-50">
      <button
        id="theme-toggle"
        onClick={onToggle}
        className="p-3 rounded-full glass-panel text-neon hover:bg-neon hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon cursor-none"
        aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </Magnetic>
  );
}
