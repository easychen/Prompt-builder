import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TEMPLATE_CATEGORIES } from '../constants';
import { FieldInput } from './FieldInput';
import { Button } from './ui/Button';
import { Plus, Trash2, Copy, StickyNote, Languages, Loader2, Wand2, MessageSquare } from 'lucide-react';
import { useToast } from './ui/Toaster';
import { MagicFillModal } from './MagicFillModal';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { CopyPromptDialog } from './ui/CopyPromptDialog';
import { ModificationSuggestionModal } from './ModificationSuggestionModal';

export const CharacterGrid: React.FC = () => {
  const { characters, addCharacter, removeCharacter, updateCharacterName, duplicateCharacter, generatePrompt, generatePositivePrompt, generateNegativePrompt, updateCharacterNotes, translateCharacter } = useApp();
  const { toast } = useToast();
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [magicFillCharId, setMagicFillCharId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [modSuggestionCharId, setModSuggestionCharId] = useState<string | null>(null);
  const [copyPromptCharId, setCopyPromptCharId] = useState<string | null>(null);

  const handleCopyPrompt = (charId: string) => {
    setCopyPromptCharId(charId);
  };

  const handleCopyAll = () => {
    if (!copyPromptCharId) return;
    const prompt = generatePrompt(copyPromptCharId);
    navigator.clipboard.writeText(prompt);
    toast("提示词已复制到剪贴板！");
    setCopyPromptCharId(null);
  };

  const handleCopyPositive = () => {
    if (!copyPromptCharId) return;
    const prompt = generatePositivePrompt(copyPromptCharId);
    navigator.clipboard.writeText(prompt);
    toast("正面提示词已复制到剪贴板！");
    setCopyPromptCharId(null);
  };

  const handleCopyNegative = () => {
    const prompt = generateNegativePrompt();
    navigator.clipboard.writeText(prompt);
    toast("负面提示词已复制到剪贴板！");
    setCopyPromptCharId(null);
  };

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast(`已复制: ${tag}`);
  };

  const handleTranslateAll = async (charId: string) => {
    setTranslatingId(charId);
    try {
        await translateCharacter(charId);
        toast("角色字段翻译完成。");
    } catch (e: any) {
        toast(`翻译错误: ${e.message}`);
    } finally {
        setTranslatingId(null);
    }
  };

  return (
    <>
      <div className="h-full w-full overflow-auto custom-scrollbar">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-separate border-spacing-0">
            {/* Header Row */}
            <thead className="bg-surface sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="sticky left-0 z-30 w-48 bg-surface border-b border-r border-border p-2 text-left text-xs font-medium text-textMuted uppercase tracking-wider">
                  字段
                </th>
                {characters.map((char) => (
                  <th key={char.id} className="min-w-[300px] w-[300px] border-b border-r border-border p-2 bg-surface">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                         <input 
                          value={char.name}
                          onChange={(e) => updateCharacterName(char.id, e.target.value)}
                          className="bg-transparent font-bold text-textMain focus:outline-none focus:border-b focus:border-primary w-full"
                        />
                         <button 
                           onClick={() => duplicateCharacter(char.id)}
                           className="text-textMuted hover:text-primary transition-colors p-1"
                           title="复制角色"
                         >
                           <Copy className="w-3.5 h-3.5" />
                         </button>
                         <button 
                           onClick={() => setDeleteConfirmId(char.id)}
                           className="text-textMuted hover:text-red-500 transition-colors p-1"
                           title="删除角色"
                         >
                           <Trash2 className="w-3.5 h-3.5" />
                         </button>
                         <button 
                           onClick={() => setModSuggestionCharId(char.id)}
                           className="text-textMuted hover:text-primary transition-colors p-1"
                           title="提交角色修改建议"
                         >
                           <MessageSquare className="w-3.5 h-3.5" />
                         </button>
                         
                         <div className="ml-auto">
                             <button 
                                 onClick={() => setMagicFillCharId(char.id)}
                                 className="bg-primary/20 hover:bg-primary/40 text-primary p-1 rounded-md transition-colors"
                                 title="AI 自动填充"
                             >
                                 <Wand2 className="w-4 h-4" />
                             </button>
                         </div>
                      </div>
                      
                      <div className="flex gap-2">
                          <Button 
                              size="sm" 
                              variant="secondary" 
                              className="flex-1 gap-1"
                              onClick={() => handleTranslateAll(char.id)}
                              disabled={translatingId === char.id}
                              title="使用 OpenAI 翻译并生成中文对照"
                          >
                              {translatingId === char.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                  <Languages className="w-3 h-3" />
                              )}
                              翻译
                          </Button>
                          <Button 
                              size="sm" 
                              variant="primary" 
                              className="flex-1 gap-1"
                              onClick={() => handleCopyPrompt(char.id)}
                          >
                              <Copy className="w-3 h-3" /> 复制
                          </Button>
                      </div>
                    </div>
                  </th>
                ))}
                <th className="min-w-[100px] border-b border-border bg-surface p-2 align-bottom">
                   <Button onClick={addCharacter} variant="secondary" size="sm" className="w-full gap-1">
                      <Plus className="w-4 h-4" /> 添加角色
                   </Button>
                </th>
              </tr>
            </thead>

            <tbody className="bg-background">
              {TEMPLATE_CATEGORIES.map((category) => (
                <React.Fragment key={category.id}>
                  {/* Category Header Row */}
                  <tr>
                      <td className="sticky left-0 z-10 bg-surfaceHighlight/20 border-r border-b border-border px-3 py-1.5 font-semibold text-xs text-primary" colSpan={characters.length + 2}>
                          {category.name}
                      </td>
                  </tr>
                  {/* Field Rows */}
                  {category.fields.map((field) => (
                    <tr key={field.id} className="group hover:bg-surface/30 transition-colors">
                      <td className="sticky left-0 z-10 w-48 bg-background group-hover:bg-surface/30 border-r border-b border-border p-3 text-sm text-textMuted font-medium align-top">
                        {field.label}
                      </td>
                      {characters.map((char) => (
                        <td key={`${char.id}-${field.id}`} className="border-r border-b border-border p-2 align-top bg-background group-hover:bg-surface/30">
                          <FieldInput 
                              characterId={char.id} 
                              field={field} 
                              value={char.fields[field.id]} 
                          />
                        </td>
                      ))}
                      <td className="border-b border-border bg-background group-hover:bg-surface/30"></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              
              {/* Notes Row */}
               <tr>
                  <td className="sticky left-0 z-10 w-48 bg-surfaceHighlight/10 border-r border-b border-border p-3 text-sm text-textMain font-bold align-top flex items-center gap-2 h-full">
                    <StickyNote className="w-4 h-4" /> 备注 & Tags
                  </td>
                  {characters.map((char) => (
                      <td key={`${char.id}-notes`} className="border-r border-b border-border p-2 align-top bg-surfaceHighlight/5">
                          <div className="flex flex-col gap-2">
                               <textarea
                                  value={char.notes}
                                  onChange={(e) => updateCharacterNotes(char.id, e.target.value)}
                                  className="w-full h-32 bg-background border border-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                                  placeholder="#tag1 #tag2 备注..."
                              />
                              <div className="flex flex-wrap gap-1">
                                  {char.notes.match(/#[\w-]+/g)?.map((tag, idx) => (
                                      <button 
                                          key={idx}
                                          onClick={() => handleCopyTag(tag)}
                                          className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded hover:bg-primary/30 transition-colors"
                                      >
                                          {tag}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </td>
                  ))}
                  <td className="border-b border-border bg-surfaceHighlight/5"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {magicFillCharId && (
          <MagicFillModal 
              charId={magicFillCharId} 
              onClose={() => setMagicFillCharId(null)} 
          />
      )}

      {modSuggestionCharId && (
        <ModificationSuggestionModal
          characterId={modSuggestionCharId}
          fieldLabel="角色整体修改"
          currentValue=""
          onClose={() => setModSuggestionCharId(null)}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="删除角色"
        message="确定要删除这个角色吗？此操作无法撤销。"
        onConfirm={() => {
            if(deleteConfirmId) removeCharacter(deleteConfirmId);
            setDeleteConfirmId(null);
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <CopyPromptDialog
        isOpen={!!copyPromptCharId}
        onCopyAll={handleCopyAll}
        onCopyPositive={handleCopyPositive}
        onCopyNegative={handleCopyNegative}
        onCancel={() => setCopyPromptCharId(null)}
      />
    </>
  );
};
