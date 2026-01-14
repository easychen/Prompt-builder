import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

export const GlobalPromptEditor: React.FC = () => {
  const { globalPrompts, updateGlobalPrompts } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="px-4 pt-4 shrink-0">
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-2 bg-surfaceHighlight/20 hover:bg-surfaceHighlight/40 transition-colors text-xs font-semibold uppercase tracking-wider text-textMuted"
        >
          <span>全局提示词 (Global Prompts)</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-green-400">正向提示词 (前缀)</label>
              <textarea 
                className="w-full h-24 bg-background border border-border rounded-md p-2 text-sm text-textMain focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 outline-none resize-none"
                value={globalPrompts.positive}
                onChange={(e) => updateGlobalPrompts({ positive: e.target.value })}
                placeholder="masterpiece, best quality..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-red-400">负面提示词 (Negative Prompt)</label>
              <textarea 
                className="w-full h-24 bg-background border border-border rounded-md p-2 text-sm text-textMain focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 outline-none resize-none"
                value={globalPrompts.negative}
                onChange={(e) => updateGlobalPrompts({ negative: e.target.value })}
                placeholder="low quality, bad anatomy..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};