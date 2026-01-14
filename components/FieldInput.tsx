import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldValue, TemplateField } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowRightLeft, Plus, X, MessageSquare } from 'lucide-react';
import { ModificationSuggestionModal } from './ModificationSuggestionModal';

interface FieldInputProps {
  characterId: string;
  field: TemplateField;
  value?: FieldValue;
}

export const FieldInput: React.FC<FieldInputProps> = ({ characterId, field, value }) => {
  const { t } = useTranslation();
  const { updateCharacterField, addVariant, removeVariant, swapVariant } = useApp();
  const [newVariant, setNewVariant] = useState("");
  const [showModModal, setShowModModal] = useState(false);

  const currentValue = value?.value || "";
  const variants = value?.variants || [];
  const translation = value?.translation || "";

  const handleAddVariant = () => {
    if(newVariant.trim()) {
        addVariant(characterId, field.id, newVariant);
        setNewVariant("");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative group/input">
          <div className="flex items-start gap-1">
            <textarea
              className="flex-1 min-h-[42px] bg-surface border border-border rounded-md py-2 px-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none overflow-hidden"
              placeholder={field.placeholder}
              value={currentValue}
              onChange={(e) => updateCharacterField(characterId, field.id, e.target.value)}
              rows={Math.max(1, Math.ceil(currentValue.length / 30))}
              style={{ height: 'auto' }}
            />
            <button
              onClick={() => setShowModModal(true)}
              className="mt-1 p-1.5 text-textMuted hover:text-primary hover:bg-primary/10 rounded-md transition-colors shrink-0"
              title={t('submitModificationSuggestion')}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
          {translation && (
             <div className="text-[10px] text-textMuted mt-1 px-1">
               {translation}
             </div>
          )}
        </div>

        {/* Variants Section */}
        {(variants.length > 0) && (
          <div className="flex flex-col gap-1">
              {variants.map((v, idx) => (
                  <div key={idx} className="group flex items-center justify-between gap-2 text-xs bg-surfaceHighlight/20 rounded px-2 py-1 border border-transparent hover:border-border/50">
                      <span
                          className="truncate cursor-pointer flex-1 text-textMuted hover:text-textMain"
                          onClick={() => swapVariant(characterId, field.id, idx)}
                          title={t('clickToReplaceCurrentValue')}
                      >
                          {v}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => swapVariant(characterId, field.id, idx)} className="hover:text-primary"><ArrowRightLeft className="w-3 h-3" /></button>
                          <button onClick={() => removeVariant(characterId, field.id, idx)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                      </div>
                  </div>
              ))}
          </div>
        )}

        {/* Quick Add Variant */}
        <div className="flex items-center gap-1 mt-1 opacity-50 hover:opacity-100 transition-opacity">
               <input
                  type="text"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddVariant()}
                  placeholder={t('addVariant')}
                  className="flex-1 bg-transparent border-b border-border text-[10px] focus:outline-none focus:border-primary px-1 py-0.5"
               />
               <button onClick={handleAddVariant} disabled={!newVariant} className="text-textMuted hover:text-primary disabled:opacity-30">
                  <Plus className="w-3 h-3" />
               </button>
        </div>
      </div>

      {showModModal && (
        <ModificationSuggestionModal
          characterId={characterId}
          fieldId={field.id}
          fieldLabel={field.label}
          currentValue={currentValue}
          onClose={() => setShowModModal(false)}
        />
      )}
    </>
  );
};
