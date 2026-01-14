import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { MessageSquare, Check, Clock, Trash2, ChevronRight } from 'lucide-react';
import { FLATTENED_FIELDS } from '../constants';

export const ModificationSuggestionsList: React.FC = () => {
  const { modifications, characters, removeModification } = useApp();

  if (!modifications || modifications.length === 0) {
    return (
      <div className="text-center py-8 text-textMuted">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>暂无修改建议</p>
      </div>
    );
  }

  const sortedModifications = [...modifications].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const getCharacterName = (charId: string) => {
    const char = characters.find(c => c.id === charId);
    return char?.name || '未知角色';
  };

  const getFieldLabel = (fieldId: string | null) => {
    if (!fieldId) return '整体修改';
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

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
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
                    <span>已应用</span>
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
                  AI已根据建议更新了多个字段
                </div>
              ) : (
                <div className="space-y-2 mb-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-textMuted shrink-0 mt-1">原值:</span>
                    <div className="flex-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded break-all">
                      {mod.oldValue || '(空)'}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-textMuted shrink-0 mt-1">新值:</span>
                    <div className="flex-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded break-all">
                      {mod.newValue}
                    </div>
                  </div>
                </div>
              )}

              {mod.description && (
                <div className="text-xs text-textMuted bg-surfaceHighlight/10 px-2 py-1 rounded">
                  <span className="font-medium">用户建议:</span> {mod.description}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => removeModification(mod.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                title="删除记录"
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
