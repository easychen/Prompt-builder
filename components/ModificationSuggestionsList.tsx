import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { MessageSquare, Check, Clock, Trash2, ChevronRight } from 'lucide-react';
import { FLATTENED_FIELDS } from '../constants';

export const ModificationSuggestionsList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { modifications, characters, removeModification } = useApp();

  if (!modifications || modifications.length === 0) {
    return (
      <div className="text-center py-8 text-textMuted">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>{t('noModificationSuggestionsYet')}</p>
      </div>
    );
  }

  const sortedModifications = [...modifications].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const getCharacterName = (charId: string) => {
    const char = characters.find(c => c.id === charId);
    return char?.name || t('unknownCharacter');
  };

  const getFieldLabel = (fieldId: string | null) => {
    if (!fieldId) return t('overallModification');
    const field = FLATTENED_FIELDS.find(f => f.id === fieldId);
    return field?.label || fieldId;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('justNow');
    if (diffMins < 60) return t('minutesAgo', { count: diffMins });
    if (diffHours < 24) return t('hoursAgo', { count: diffHours });
    if (diffDays < 7) return t('daysAgo', { count: diffDays });
    return date.toLocaleDateString(i18n.language);
  };

  return (
    <div className="space-y-3">
      {sortedModifications.map((mod) => (
        <div
          key={mod.id}
          className={`bg-surface border border-border rounded-lg p-4 ${
            mod.applied ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs text-textMuted">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(mod.timestamp)}</span>
                </div>
                {mod.applied && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <Check className="w-3 h-3" />
                    <span>{t('applied')}</span>
                  </div>
                )}
              </div>

              <div className="text-sm text-textMain mb-2">
                <span className="font-medium text-primary">
                  {getCharacterName(mod.characterId)}
                </span>
                <ChevronRight className="w-3 h-3 inline mx-1 text-textMuted" />
                <span className="text-textMuted">{getFieldLabel(mod.fieldId)}</span>
              </div>

              {!mod.fieldId && mod.newValue === 'Multiple fields updated' ? (
                <div className="text-xs text-textMuted bg-surfaceHighlight/10 px-2 py-1 rounded mb-2">
                  {t('aiUpdatedMultipleFields')}
                </div>
              ) : (
                <div className="space-y-2 mb-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-textMuted shrink-0 mt-1">{t('oldValue')}</span>
                    <div className="flex-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded break-all">
                      {mod.oldValue || t('empty')}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-textMuted shrink-0 mt-1">{t('newValue')}</span>
                    <div className="flex-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded break-all">
                      {mod.newValue}
                    </div>
                  </div>
                </div>
              )}

              {mod.description && (
                <div className="text-xs text-textMuted bg-surfaceHighlight/10 px-2 py-1 rounded">
                  <span className="font-medium">{t('userSuggestion')}</span> {mod.description}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => removeModification(mod.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                title={t('deleteRecord')}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
