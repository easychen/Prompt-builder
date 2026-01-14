import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { X, Upload, Image as ImageIcon, Type, Wand2, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from './ui/Toaster';

interface MagicFillModalProps {
  charId: string;
  onClose: () => void;
}

export const MagicFillModal: React.FC<MagicFillModalProps> = ({ charId, onClose }) => {
  const { t } = useTranslation();
  const { autoFillCharacter } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (activeTab === 'text' && !prompt.trim()) return;
    if (activeTab === 'image' && !image) return;

    setLoading(true);
    try {
      await autoFillCharacter(charId, prompt, image);
      toast(t('characterDetailsAutoGenerationSuccessful'));
      onClose();
    } catch (error: any) {
      toast(t('generationFailed', { message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-lg w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-border bg-surfaceHighlight/30">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">{t('aiSmartFill')}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>

        <div className="flex border-b border-border">
            <button
                onClick={() => setActiveTab('text')}
                className={clsx(
                    "flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                    activeTab === 'text' ? "bg-surfaceHighlight/20 text-primary border-b-2 border-primary" : "text-textMuted hover:text-textMain hover:bg-surfaceHighlight/10"
                )}
            >
                <Type className="w-4 h-4" /> {t('textDescription')}
            </button>
            <button
                onClick={() => setActiveTab('image')}
                className={clsx(
                    "flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                    activeTab === 'image' ? "bg-surfaceHighlight/20 text-primary border-b-2 border-primary" : "text-textMuted hover:text-textMain hover:bg-surfaceHighlight/10"
                )}
            >
                <ImageIcon className="w-4 h-4" /> {t('uploadImage')}
            </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === 'text' ? (
                <div className="space-y-4">
                    <p className="text-sm text-textMuted">
                        {t('describeCharacterInNaturalLanguage')}
                    </p>
                    <textarea
                        className="w-full h-40 bg-background border border-border rounded-md p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                        placeholder={t('cyberpunkStreetSamuraiExample')}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-sm text-textMuted">
                        {t('uploadReferenceImage')}
                    </p>

                    <div
                        className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-surfaceHighlight/10 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {image ? (
                            <img src={image} alt="Preview" className="max-h-48 rounded shadow-md object-contain" />
                        ) : (
                            <div className="text-center text-textMuted">
                                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <span className="text-xs">{t('clickToUploadImage')}</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    {image && (
                         <div className="flex justify-end">
                            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setImage(null); }}>{t('clearImage')}</Button>
                         </div>
                    )}
                </div>
            )}
        </div>

        <div className="p-4 bg-surfaceHighlight/30 border-t border-border flex justify-end gap-2 shrink-0">
          <Button variant="secondary" onClick={onClose}>{t('cancel')}</Button>
          <Button onClick={handleGenerate} disabled={loading} className="gap-2 min-w-[120px]">
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
             {loading ? t('generating') : t('startFilling')}
          </Button>
        </div>
      </div>
    </div>
  );
};