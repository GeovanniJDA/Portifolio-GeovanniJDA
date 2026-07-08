// Convention: every internal grid/flex container whose children hold variable-length text MUST set min-w-0 (className) or minWidth:0 (inline style) on those children to prevent min-width:auto blowout.
import { type ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  colSpan?: 'default' | '2' | '3';
}

export function GlassPanel({ children, className = '', colSpan = 'default' }: GlassPanelProps) {
  const spanClasses = {
    default: '',
    '2': 'md:col-span-2',
    '3': 'md:col-span-2 lg:col-span-3',
  };

  return (
    <div
      className={`glass-panel rounded-[2rem] min-w-0 ${spanClasses[colSpan]} ${className}`}
    >
      {children}
    </div>
  );
}
