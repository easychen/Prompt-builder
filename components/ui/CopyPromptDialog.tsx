import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { X } from 'lucide-react';

interface CopyPromptDialogProps {
  isOpen: boolean;
  onCopyAll: () => void;
  onCopyPositive: () => void;
  onCopyNegative: () => void;
  onCancel: () => void;
}

export const CopyPromptDialog: React.FC<CopyPromptDialogProps> = ({
  isOpen,
  onCopyAll,
  onCopyPositive,
  onCopyNegative,
  onCancel
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-lg w-full max-w-sm shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-textMain">{t('copyPrompt')}</h3>
          <button
            onClick={onCancel}
            className="text-textMuted hover:text-textMain transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-textMuted">{t('selectWhatToCopy')}</p>
        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={onCopyAll} className="w-full">
            {t('copyAll')}
          </Button>
          <Button variant="secondary" onClick={onCopyPositive} className="w-full">
            {t('copyPositiveOnly')}
          </Button>
          <Button variant="secondary" onClick={onCopyNegative} className="w-full">
            {t('copyNegativeOnly')}
          </Button>
        </div>
        <Button variant="ghost" onClick={onCancel} className="w-full">
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};
