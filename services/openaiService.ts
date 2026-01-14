import OpenAI from 'openai';
import { TemplateField } from '../types';

export const translateText = async (
  text: string, 
  apiKey: string, 
  baseUrl: string,
  model: string = "gpt-3.5-turbo"
): Promise<{ english: string, chinese: string }> => {
  if (!text.trim()) return { english: "", chinese: "" };
  if (!apiKey) throw new Error("缺少 API Key，请在设置中配置。");

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseUrl,
    dangerouslyAllowBrowser: true 
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are a helpful assistant for AI Art Prompt generation. 
          The user will provide a description (in English or Chinese). 
          Your task:
          1. Translate/Optimize the input into concise, comma-separated English descriptive tags for Stable Diffusion.
          2. Provide a concise Chinese translation of these tags.
          
          Return JSON format:
          {
            "english": "string (tags)",
            "chinese": "string (translation)"
          }`
        },
        { 
          role: "user", 
          content: text 
        }
      ],
      model: model,
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return { english: "", chinese: "" };
    
    return JSON.parse(content);
  } catch (error: any) {
    console.error("Translation error:", error);
    throw new Error(error.message || "Failed to translate text.");
  }
};

export const generateCharacterFields = async (
  prompt: string,
  imageBase64: string | null,
  availableFields: TemplateField[],
  apiKey: string,
  baseUrl: string,
  model: string
): Promise<Record<string, string>> => {
  if (!apiKey) throw new Error("API Key is missing.");

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseUrl,
    dangerouslyAllowBrowser: true 
  });

  // Construct a mapping of fields for the system prompt
  const fieldSchema = availableFields.reduce((acc, field) => {
    acc[field.id] = `string (description of ${field.label}, ${field.placeholder || ''})`;
    return acc;
  }, {} as Record<string, string>);

  const systemPrompt = `
    You are an expert AI Character Designer. 
    Your task is to analyze the user's input (text description or image) and extract visual details to fill a structured character profile.
    
    Output strictly valid JSON where keys are the field IDs provided below.
    Translate all values into concise English prompt tags (e.g., "blue eyes", "long wavy hair").
    If a detail is not present in the input, leave the value as an empty string.

    Target Fields Schema:
    ${JSON.stringify(fieldSchema, null, 2)}
  `;

  const messages: any[] = [
    { role: "system", content: systemPrompt }
  ];

  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "text", text: prompt || "Analyze this character image and fill the profile fields." },
        { type: "image_url", image_url: { url: imageBase64 } }
      ]
    });
  } else {
    messages.push({
      role: "user",
      content: prompt
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from AI");

    return JSON.parse(content);
  } catch (error: any) {
    console.error("Generation error:", error);
    throw new Error(error.message || "Failed to generate character profile.");
  }
};

export const generateFieldFromSuggestion = async (
  currentCharacter: any,
  fieldId: string | null,
  suggestion: string,
  description: string,
  availableFields: TemplateField[],
  apiKey: string,
  baseUrl: string,
  model: string
): Promise<Record<string, string>> => {
  if (!apiKey) throw new Error("API Key is missing.");

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseUrl,
    dangerouslyAllowBrowser: true
  });

  const fieldSchema = availableFields.reduce((acc, field) => {
    acc[field.id] = `string (description of ${field.label}, ${field.placeholder || ''})`;
    return acc;
  }, {} as Record<string, string>);

  let systemPrompt = "";
  
  if (fieldId) {
    const targetField = availableFields.find(f => f.id === fieldId);
    systemPrompt = `
      You are an AI Art Prompt optimization expert.
      You will receive:
      1. Current character profile with all fields
      2. A specific field to modify
      3. User's modification suggestion
      
      Your task: Analyze the suggestion and optimize the target field while maintaining consistency with the overall character.
      
      Rules:
      - If modifying a specific field, focus on that field but consider the whole character context
      - Output strictly valid JSON where key is the field ID
      - Translate all values into concise English prompt tags (e.g., "blue eyes", "long wavy hair")
      - If the suggestion is unclear or invalid, keep the current value
      
      Target Field: ${targetField?.label} (${fieldId})
      Current Value: ${currentCharacter.fields[fieldId]?.value || ""}
      
      Available Fields:
      ${JSON.stringify(fieldSchema, null, 2)}
    `;
  } else {
    systemPrompt = `
      You are an AI Art Prompt optimization expert.
      You will receive:
      1. Current character profile with all fields
      2. User's modification suggestion for the entire character
      
      Your task: Analyze the suggestion and regenerate the character profile accordingly.
      
      Rules:
      - Generate values only for fields that need to change based on the suggestion
      - Keep existing values unchanged if not mentioned in the suggestion
      - Output strictly valid JSON where keys are field IDs
      - Translate all values into concise English prompt tags (e.g., "blue eyes", "long wavy hair")
      - If the suggestion is unclear, keep current values
      
      Available Fields:
      ${JSON.stringify(fieldSchema, null, 2)}
    `;
  }

  const characterContext = JSON.stringify(currentCharacter, null, 2);

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { 
          role: "system", 
          content: systemPrompt
        },
        { 
          role: "user", 
          content: `Current Character Profile:\n${characterContext}\n\nModification Suggestion:\n${suggestion}\n\nAdditional Notes:\n${description || "None"}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from AI");

    return JSON.parse(content);
  } catch (error: any) {
    console.error("Suggestion processing error:", error);
    throw new Error(error.message || "Failed to process modification suggestion.");
  }
};
