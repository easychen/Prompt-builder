import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, Character, AppSettings, GlobalPrompts, FieldValue, ModificationSuggestion } from '../types';
import { DEFAULT_GLOBAL_PROMPTS, DEFAULT_SETTINGS, FLATTENED_FIELDS } from '../constants';
import { translateText, generateCharacterFields, generateFieldFromSuggestion } from '../services/openaiService';

interface AppContextType extends AppState {
  addCharacter: () => void;
  removeCharacter: (id: string) => void;
  updateCharacterName: (id: string, name: string) => void;
  updateCharacterField: (charId: string, fieldId: string, value: string) => void;
  addVariant: (charId: string, fieldId: string, value: string) => void;
  removeVariant: (charId: string, fieldId: string, index: number) => void;
  swapVariant: (charId: string, fieldId: string, variantIndex: number) => void;
  updateCharacterNotes: (charId: string, notes: string) => void;
  updateGlobalPrompts: (prompts: Partial<GlobalPrompts>) => void;
  updateSettings: (settings: AppSettings) => void;
  translateCharacter: (charId: string) => Promise<void>;
  autoFillCharacter: (charId: string, prompt: string, imageBase64: string | null) => Promise<void>;
  generatePrompt: (charId: string) => string;
  duplicateCharacter: (charId: string) => void;
  modifications: ModificationSuggestion[];
  addModification: (charId: string, fieldId: string | null, oldValue: string, newValue: string, description: string) => void;
  applyModification: (modificationId: string) => void;
  removeModification: (modificationId: string) => void;
  processModificationWithAI: (charId: string, fieldId: string | null, suggestion: string, description: string) => Promise<void>;
  isProcessingAI: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'prompt-architect-data-v1';

const generateId = () => {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
            characters: parsed.characters || [],
            globalPrompts: { ...DEFAULT_GLOBAL_PROMPTS, ...parsed.globalPrompts },
            settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
            modifications: parsed.modifications || []
        };
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      characters: [
        { id: generateId(), name: '角色 A', fields: {}, notes: '' }
      ],
      globalPrompts: DEFAULT_GLOBAL_PROMPTS,
      settings: DEFAULT_SETTINGS,
      modifications: []
    };
  });

  const [isProcessingAI, setIsProcessingAI] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addCharacter = () => {
    const newChar: Character = {
      id: generateId(),
      name: `新角色`,
      fields: {},
      notes: ''
    };
    setState(prev => ({ ...prev, characters: [...prev.characters, newChar] }));
  };

  const removeCharacter = (id: string) => {
    setState(prev => ({ ...prev, characters: prev.characters.filter(c => c.id !== id) }));
  };

  const duplicateCharacter = (id: string) => {
    const char = state.characters.find(c => c.id === id);
    if (!char) return;
    const newChar: Character = {
        ...JSON.parse(JSON.stringify(char)),
        id: generateId(),
        name: `${char.name} (复制)`
    };
    setState(prev => ({ ...prev, characters: [...prev.characters, newChar] }));
  };

  const updateCharacterName = (id: string, name: string) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => c.id === id ? { ...c, name } : c)
    }));
  };

  const updateCharacterField = (charId: string, fieldId: string, value: string) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => {
        if (c.id !== charId) return c;
        const currentField = c.fields[fieldId] || { value: '', variants: [] };
        return {
          ...c,
          fields: {
            ...c.fields,
            [fieldId]: { ...currentField, value }
          }
        };
      })
    }));
  };

  const addVariant = (charId: string, fieldId: string, value: string) => {
     if(!value.trim()) return;
     setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => {
        if (c.id !== charId) return c;
        const currentField = c.fields[fieldId] || { value: '', variants: [] };
        if (currentField.variants.includes(value)) return c;
        return {
          ...c,
          fields: {
            ...c.fields,
            [fieldId]: { ...currentField, variants: [...currentField.variants, value] }
          }
        };
      })
    }));
  };

  const removeVariant = (charId: string, fieldId: string, index: number) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => {
        if (c.id !== charId) return c;
        const currentField = c.fields[fieldId];
        if(!currentField) return c;
        const newVariants = [...currentField.variants];
        newVariants.splice(index, 1);
        return {
          ...c,
          fields: {
            ...c.fields,
            [fieldId]: { ...currentField, variants: newVariants }
          }
        };
      })
    }));
  };

  const swapVariant = (charId: string, fieldId: string, variantIndex: number) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => {
        if (c.id !== charId) return c;
        const currentField = c.fields[fieldId];
        if(!currentField) return c;
        
        const currentValue = currentField.value;
        const variantValue = currentField.variants[variantIndex];
        
        const newVariants = [...currentField.variants];
        newVariants[variantIndex] = currentValue;
        const cleanedVariants = newVariants.filter(v => v.trim() !== "");

        return {
          ...c,
          fields: {
            ...c.fields,
            [fieldId]: { ...currentField, value: variantValue, variants: cleanedVariants }
          }
        };
      })
    }));
  };

  const updateCharacterNotes = (charId: string, notes: string) => {
    setState(prev => ({
      ...prev,
      characters: prev.characters.map(c => c.id === charId ? { ...c, notes } : c)
    }));
  };

  const updateGlobalPrompts = (prompts: Partial<GlobalPrompts>) => {
    setState(prev => ({ ...prev, globalPrompts: { ...prev.globalPrompts, ...prompts } }));
  };

  const updateSettings = (settings: AppSettings) => {
    setState(prev => ({ ...prev, settings }));
  };

  const translateCharacter = async (charId: string) => {
    const char = state.characters.find(c => c.id === charId);
    if (!char) return;

    const promises = FLATTENED_FIELDS.map(async (field) => {
        const val = char.fields[field.id]?.value;
        if (!val?.trim()) return null;
        try {
            const { english, chinese } = await translateText(
                val, 
                state.settings.apiKey, 
                state.settings.apiBaseUrl, 
                state.settings.apiModel
            );
            return { fieldId: field.id, original: val, english, chinese };
        } catch (e) {
            console.error(`Error translating field ${field.id}:`, e);
            throw e; 
        }
    });

    try {
        const results = await Promise.all(promises);
        
        setState(prev => ({
            ...prev,
            characters: prev.characters.map(c => {
                if (c.id !== charId) return c;
                const newFields = { ...c.fields };

                results.forEach(res => {
                    if (!res) return;
                    const { fieldId, original, english, chinese } = res;
                    const currentField = newFields[fieldId] || { value: '', variants: [] };
                    
                    const newVariants = [...currentField.variants];
                    if (original && original !== english && !newVariants.includes(original)) {
                        newVariants.unshift(original);
                    }
                    
                    newFields[fieldId] = {
                        value: english,
                        variants: newVariants,
                        translation: chinese
                    };
                });

                return { ...c, fields: newFields };
            })
        }));
    } catch (e) {
        throw new Error("One or more fields failed to translate. Check your API key and network.");
    }
  };

  const autoFillCharacter = async (charId: string, prompt: string, imageBase64: string | null) => {
    const char = state.characters.find(c => c.id === charId);
    if (!char) return;

    try {
      const generatedFields = await generateCharacterFields(
        prompt,
        imageBase64,
        FLATTENED_FIELDS,
        state.settings.apiKey,
        state.settings.apiBaseUrl,
        state.settings.apiModel
      );

      setState(prev => ({
        ...prev,
        characters: prev.characters.map(c => {
          if (c.id !== charId) return c;
          const newFields = { ...c.fields };

          Object.entries(generatedFields).forEach(([key, val]) => {
            const cleanVal = (val as string).trim();
            if (!cleanVal) return;

            const currentField = newFields[key] || { value: '', variants: [] };
            
            if (currentField.value !== cleanVal) {
               const newVariants = currentField.value && !currentField.variants.includes(currentField.value)
                 ? [currentField.value, ...currentField.variants]
                 : currentField.variants;
                
               newFields[key] = {
                  value: cleanVal,
                  variants: newVariants,
                  translation: currentField.translation
               };
             }
          });

          return { ...c, fields: newFields };
        })
      }));

    } catch (e) {
       throw e;
    }
  };

  const generatePrompt = (charId: string): string => {
    const char = state.characters.find(c => c.id === charId);
    if (!char) return "";

    const positiveParts = [state.globalPrompts.positive];
    
    FLATTENED_FIELDS.forEach(field => {
      const val = char.fields[field.id]?.value;
      if (val?.trim()) {
        positiveParts.push(val.trim());
      }
    });

    if (char.notes.trim()) {
      positiveParts.push(char.notes.replace(/\n/g, ', '));
    }

    let fullPrompt = positiveParts.filter(Boolean).join(', ');

    if (state.globalPrompts.negative.trim()) {
        fullPrompt += `\n\nNegative Prompt:\n${state.globalPrompts.negative}`;
    }

    return fullPrompt;
  };

  const addModification = (charId: string, fieldId: string | null, oldValue: string, newValue: string, description: string) => {
    const modification: ModificationSuggestion = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      characterId: charId,
      fieldId,
      oldValue,
      newValue,
      description,
      timestamp: Date.now(),
      applied: false
    };
    
    setState(prev => ({
      ...prev,
      modifications: [...(prev.modifications || []), modification]
    }));
    console.log("修改建议已提交");
  };

  const applyModification = (modificationId: string) => {
    setState(prev => {
      const modification = prev.modifications?.find(m => m.id === modificationId);
      if (!modification) return prev;
      
      const updatedModifications = prev.modifications?.map(m => 
        m.id === modificationId ? { ...m, applied: true } : m
      );
      
      if (modification.fieldId) {
        const updatedCharacters = prev.characters.map(c => {
          if (c.id === modification.characterId) {
            const currentField = c.fields[modification.fieldId!] || { value: '', variants: [] };
            const newVariants = currentField.value && !currentField.variants.includes(modification.oldValue)
              ? [modification.oldValue, ...currentField.variants]
              : currentField.variants;
            
            return {
              ...c,
              fields: {
                ...c.fields,
                [modification.fieldId]: {
                  ...currentField,
                  value: modification.newValue,
                  variants: newVariants
                }
              }
            };
          }
          return c;
        });
        
        return {
          ...prev,
          characters: updatedCharacters,
          modifications: updatedModifications
        };
      } else {
        return {
          ...prev,
          modifications: updatedModifications
        };
      }
    });
    console.log("修改已应用");
  };

  const removeModification = (modificationId: string) => {
    setState(prev => ({
      ...prev,
      modifications: prev.modifications?.filter(m => m.id !== modificationId) || []
    }));
  };

  const processModificationWithAI = async (charId: string, fieldId: string | null, suggestion: string, description: string) => {
    setIsProcessingAI(true);
    
    try {
      const char = state.characters.find(c => c.id === charId);
      if (!char) throw new Error("Character not found");

      const oldValue = fieldId ? (char.fields[fieldId]?.value || '') : '';
      
      const generatedFields = await generateFieldFromSuggestion(
        char,
        fieldId,
        suggestion,
        description,
        FLATTENED_FIELDS,
        state.settings.apiKey,
        state.settings.apiBaseUrl,
        state.settings.apiModel
      );

      setState(prev => {
        const updatedCharacters = prev.characters.map(c => {
          if (c.id !== charId) return c;
          
          const newFields = { ...c.fields };

          Object.entries(generatedFields).forEach(([key, val]) => {
            const cleanVal = (val as string).trim();
            if (!cleanVal) return;

            const currentField = newFields[key] || { value: '', variants: [] };
            
            if (currentField.value !== cleanVal) {
               const newVariants = currentField.value && !currentField.variants.includes(currentField.value)
                 ? [currentField.value, ...currentField.variants]
                 : currentField.variants;
              
               newFields[key] = {
                  value: cleanVal,
                  variants: newVariants,
                  translation: currentField.translation
               };
             }
          });

          return { ...c, fields: newFields };
        });

        const modification: ModificationSuggestion = {
          id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          characterId: charId,
          fieldId,
          oldValue,
          newValue: fieldId ? (generatedFields[fieldId] || '') : 'Multiple fields updated',
          description,
          timestamp: Date.now(),
          applied: true
        };

        return {
          ...prev,
          characters: updatedCharacters,
          modifications: [...(prev.modifications || []), modification]
        };
      });

    } catch (error: any) {
      console.error("AI Processing error:", error);
      throw error;
    } finally {
      setIsProcessingAI(false);
    }
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addCharacter,
      removeCharacter,
      updateCharacterName,
      updateCharacterField,
      addVariant,
      removeVariant,
      swapVariant,
      updateCharacterNotes,
      updateGlobalPrompts,
      updateSettings,
      translateCharacter,
      autoFillCharacter,
      generatePrompt,
      duplicateCharacter,
      modifications: state.modifications || [],
      addModification,
      applyModification,
      removeModification,
      processModificationWithAI,
      isProcessingAI
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
