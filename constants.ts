import { TemplateCategory, GlobalPrompts } from './types';

export const DEFAULT_GLOBAL_PROMPTS: GlobalPrompts = {
  positive: "masterpiece, best quality, ultra detailed, cinematic lighting, 8k, sharp focus, natural skin texture",
  negative: "low quality, blurry, lowres, bad anatomy, extra limbs, extra fingers, deformed body, distorted face, watermark, text artifacts, bad hands, missing fingers"
};

export const DEFAULT_SETTINGS = {
  apiKey: "",
  apiBaseUrl: "https://api.openai.com/v1",
  apiModel: "gpt-3.5-turbo"
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "appearance",
    name: "🧍 基础外貌",
    fields: [
      { id: "age_gender", label: "年龄 & 性别", category: "appearance", placeholder: "例如: 20yo girl" },
      { id: "race", label: "种族", category: "appearance", placeholder: "例如: asian, european" },
      { id: "hair", label: "发型", category: "appearance", placeholder: "例如: long wavy hair" },
      { id: "hair_color", label: "发色", category: "appearance", placeholder: "例如: platinum blonde" },
      { id: "eyes", label: "眼睛", category: "appearance", placeholder: "例如: blue eyes, detailed iris" },
      { id: "skin", label: "肤色 & 质感", category: "appearance", placeholder: "例如: pale skin, soft lighting" },
    ]
  },
  {
    id: "outfit_top",
    name: "👗 上装",
    fields: [
      { id: "top", label: "上身衣物", category: "outfit_top", placeholder: "例如: white shirt, off-shoulder" },
      { id: "jacket", label: "外套", category: "outfit_top", placeholder: "例如: leather jacket, cardigan" },
    ]
  },
  {
    id: "outfit_bottom",
    name: "👖 下装",
    fields: [
      { id: "bottom", label: "下身衣物", category: "outfit_bottom", placeholder: "例如: pleated skirt, jeans" },
      { id: "legwear", label: "袜子/腿饰", category: "outfit_bottom", placeholder: "例如: black thigh-highs, pantyhose" },
      { id: "shoes", label: "鞋子", category: "outfit_bottom", placeholder: "例如: sneakers, high heels" },
    ]
  },
  {
    id: "accessories",
    name: "💍 配饰",
    fields: [
      { id: "neck", label: "颈部饰品", category: "accessories", placeholder: "例如: choker, necklace" },
      { id: "head", label: "头饰", category: "accessories", placeholder: "例如: hair clip, hat" },
      { id: "other_acc", label: "其他配饰", category: "accessories", placeholder: "例如: glasses, earrings" },
    ]
  },
  {
    id: "body",
    name: "🧍‍♀️ 身材 & 姿态",
    fields: [
      { id: "body_type", label: "体型", category: "body", placeholder: "例如: slim, curvy" },
      { id: "pose", label: "姿势/动作", category: "body", placeholder: "例如: standing, sitting, looking at viewer" },
      { id: "expression", label: "表情", category: "body", placeholder: "例如: smiling, blushing" },
    ]
  },
  {
    id: "environment",
    name: "🎨 场景 & 风格",
    fields: [
      { id: "background", label: "背景", category: "environment", placeholder: "例如: city street, bedroom" },
      { id: "camera", label: "镜头/视角", category: "environment", placeholder: "例如: cowboy shot, from below" },
      { id: "lighting", label: "光影", category: "environment", placeholder: "例如: sunset, neon lights" },
    ]
  }
];

export const FLATTENED_FIELDS = TEMPLATE_CATEGORIES.flatMap(c => c.fields);
