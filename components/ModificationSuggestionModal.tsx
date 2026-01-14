import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { MessageSquare, Send, X, Check, Clock, Loader2 } from 'lucide-react';

interface ModificationSuggestionModalProps {
  characterId: string;
  fieldId?: string;
  fieldLabel?: string;
  currentValue?: string;
  onClose: () => void;
}

export const ModificationSuggestionModal: React.FC<ModificationSuggestionModalProps> = ({
  characterId,
  fieldId,
  fieldLabel,
  currentValue = '',
  onClose
}) => {
  const { t } = useTranslation();
  const { processModificationWithAI, isProcessingAI } = useApp();
  const [suggestion, setSuggestion] = useState('');
  const [description, setDescription] = useState('');

  const defaultFieldLabel = t('character');

  const handleSubmit = async () => {
    if (!suggestion.trim()) return;

    try {
      await processModificationWithAI(
        characterId,
        fieldId || null,
        suggestion.trim(),
        description.trim()
      );
      onClose();
    } catch (error: any) {
      console.error('Failed to process suggestion:', error);
      alert(t('processingFailed', { message: error.message }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-lg w-full p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-textMain">
              {t('submitModificationSuggestion')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-textMuted hover:text-textMain transition-colors"
            disabled={isProcessingAI}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              {t('modificationTarget')}
            </label>
            <div className="text-sm text-textMain bg-surfaceHighlight/10 p-2 rounded border border-border">
              {fieldLabel || defaultFieldLabel}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              {t('currentValue')}
            </label>
            <div className="text-sm text-textMain bg-surfaceHighlight/5 p-2 rounded border border-border break-all">
              {currentValue || t('empty')}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              {t('modificationSuggestion')} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              disabled={isProcessingAI}
              className="w-full min-h-[100px] bg-background border border-border rounded p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none disabled:opacity-50"
              placeholder={t('changeHairColorExample')}
            />
            <p className="text-xs text-textMuted mt-1">
              {t('aiWillAutoGenerateFields')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">
              {t('additionalInformation')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isProcessingAI}
              className="w-full min-h-[80px] bg-background border border-border rounded p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none disabled:opacity-50"
              placeholder={t('optionalAdditionalInformation')}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isProcessingAI}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!suggestion.trim() || isProcessingAI}
            className="flex-1 gap-2"
          >
            {isProcessingAI ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('aiProcessing')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t('submitToAI')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
