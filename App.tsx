import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { CharacterGrid } from './components/CharacterGrid';
import { GlobalPromptEditor } from './components/GlobalPromptEditor';
import { SettingsModal } from './components/SettingsModal';
import { ModificationSuggestionsList } from './components/ModificationSuggestionsList';
import { Toaster } from './components/ui/Toaster';
import { MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  return (
    <AppProvider>
      <Layout
        onOpenSettings={() => setIsSettingsOpen(true)}
        extraAction={
          <button
            onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}
            className={`p-2 rounded-md transition-colors ${
              isSuggestionsOpen
                ? 'bg-primary/20 text-primary'
                : 'hover:bg-surfaceHighlight text-textMuted hover:text-textMain'
            }`}
            title={t('modificationSuggestions')}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        }
      >
        <div className="flex flex-col h-full gap-4">
          <GlobalPromptEditor />
          <div className="flex-1 min-h-0 flex gap-4 border-t border-border/50 pt-4">
            <div className={`flex-1 min-w-0 ${isSuggestionsOpen ? 'w-2/3' : ''}`}>
              <CharacterGrid />
            </div>
            {isSuggestionsOpen && (
              <div className="w-1/3 min-w-[350px] border-l border-border pl-4 overflow-auto">
                <div className="sticky top-0 bg-background pb-4 mb-4 border-b border-border">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    {t('modificationSuggestions')}
                  </h2>
                </div>
                <ModificationSuggestionsList />
              </div>
            )}
          </div>
        </div>
      </Layout>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
      <Toaster />
    </AppProvider>
  );
};

export default App;
