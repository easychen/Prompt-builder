export interface FieldValue {
  value: string;
  variants: string[];
  translation?: string; // Stores the Chinese translation
}

export interface Character {
  id: string;
  name: string;
  fields: Record<string, FieldValue>; // Keyed by TemplateField.id
  notes: string; // Tags and general notes
}

export interface TemplateField {
  id: string;
  label: string;
  category: string;
  placeholder?: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  fields: TemplateField[];
}

export interface GlobalPrompts {
  positive: string;
  negative: string;
}

export interface AppSettings {
  apiKey: string;
  apiBaseUrl: string;
  apiModel: string;
}

export interface AppState {
  characters: Character[];
  globalPrompts: GlobalPrompts;
  settings: AppSettings;
}

export type GenerationFormat = 'comma' | 'newline';

export interface ModificationSuggestion {
  id: string;
  characterId: string;
  fieldId: string | null;
  oldValue: string;
  newValue: string;
  description: string;
  timestamp: number;
  applied: boolean;
}

export interface AppStateWithModifications extends AppState {
  modifications: ModificationSuggestion[];
}
