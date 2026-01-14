import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-lg w-full max-w-sm shadow-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-textMain">{title}</h3>
        <p className="text-sm text-textMuted">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
          <Button variant="danger" onClick={onConfirm}>{t('confirmDelete')}</Button>
        </div>
      </div>
    </div>
  );
};