import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { settings, updateSettings } = useApp();
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [baseUrl, setBaseUrl] = useState(settings.apiBaseUrl);
  const [apiModel, setApiModel] = useState(settings.apiModel);

  const handleSave = () => {
    updateSettings({ apiKey, apiBaseUrl: baseUrl, apiModel });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-surfaceHighlight/30">
          <h2 className="font-semibold text-lg">设置</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">OpenAI API Key</label>
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="sk-..."
            />
            <p className="text-xs text-textMuted mt-1">Key 仅存储在本地浏览器中，绝不会上传到我们的服务器。</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">API Base URL</label>
            <input 
              type="text" 
              value={baseUrl} 
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="https://api.openai.com/v1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">模型 (Model)</label>
            <input 
              type="text" 
              value={apiModel} 
              onChange={(e) => setApiModel(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="gpt-3.5-turbo"
            />
          </div>
        </div>

        <div className="p-4 bg-surfaceHighlight/30 border-t border-border flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>保存设置</Button>
        </div>
      </div>
    </div>
  );
};