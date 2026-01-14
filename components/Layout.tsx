import React, { ReactNode } from 'react';
import { Settings, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onOpenSettings: () => void;
  extraAction?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenSettings, extraAction }) => {
  return (
    <div className="flex flex-col h-screen bg-background text-textMain">
      <header className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg">
             <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Prompt<span className="text-primary">Architect</span></h1>
        </div>
        <div className="flex items-center gap-1">
          {extraAction}
          <button 
            onClick={onOpenSettings}
            className="p-2 hover:bg-surfaceHighlight rounded-md transition-colors text-textMuted hover:text-textMain"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};
