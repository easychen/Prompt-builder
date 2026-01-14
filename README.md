<div align="center">
  <h1>🎨 PromptArchitect</h1>
  
  <p>
    <strong>A professional character design and prompt generation tool for AI artists</strong>
  </p>
  
  <p>
    Manage multi-character profiles, organize prompts by specific fields, manage variants, and leverage AI-powered features
  </p>

[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## ✨ Features

### 🎭 Character Management
- **Multi-Character Support**: Create, duplicate, and manage multiple character profiles simultaneously
- **Structured Fields**: Organize character details into 6 categories:
  - 🧍 **基础外貌** (Basic Appearance): Age, Gender, Race, Hair, Eyes, Skin
  - 👗 **上装** (Outfit Top): Shirts, Jackets, Coats
  - 👖 **下装** (Outfit Bottom): Pants, Skirts, Legwear, Shoes
  - 💍 **配饰** (Accessories): Necklaces, Headwear, Glasses, Earrings
  - 🧍‍♀️ **身材 & 姿态** (Body & Pose): Body type, Pose, Expression
  - 🎨 **场景 & 风格** (Environment & Style): Background, Camera, Lighting

### 🪄 AI-Powered Features
- **Smart Auto-Fill**: Generate character profiles from:
  - Natural language text descriptions
  - Image uploads (visual analysis)
- **Intelligent Translation**: Translate and optimize prompts with:
  - English prompt generation (optimized for Stable Diffusion)
  - Chinese translation for reference
- **Modification Suggestions**: Submit natural language suggestions to:
  - Modify specific character fields
  - Apply holistic changes to entire character profiles
  - Track modification history with before/after comparisons

### 📋 Variant Management
- Store multiple variants for each field
- One-click swap between variants
- Automatically preserve original values as variants during updates

### 🌐 Global Prompts
- Configure global positive/negative prompts
- Applied to all characters during prompt generation
- Pre-configured with quality-enhancing defaults

### 📤 Prompt Export
- Generate complete prompts with positive and negative components
- Copy positive/negative prompts separately
- Include character notes and tags in output

### 💾 Data Persistence
- Automatic local storage save/load
- Browser-based data persistence
- No backend required

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm, pnpm, or yarn
- OpenAI API key (or compatible API)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Configure API Settings**
   
   Create a `.env.local` file in the project root:
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1
   VITE_OPENAI_API_MODEL=gpt-3.5-turbo
   ```
   
   Or configure in-app via **Settings** (gear icon in the header)

3. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   # or
   pnpm build
   # or
   yarn build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   # or
   pnpm preview
   # or
   yarn preview
   ```

## 📖 Usage Guide

### Creating Characters

1. Click the **"添加角色"** (Add Character) button
2. Rename the character by clicking on its name
3. Fill in character fields manually or use AI auto-fill

### AI Auto-Fill

1. Click the **Magic Wand** icon (🪄) on any character header
2. Choose **Text Description** or **Upload Image**
3. For text: Describe the character in natural language (e.g., "A cyberpunk street samurai girl with neon blue bob cut, wearing high-tech armor jacket...")
4. For image: Upload a reference image
5. Click **"开始填充"** (Start Fill) to auto-generate all character fields

### Managing Variants

1. Enter a value in any field
2. Click the **"+"** button to add alternative variants
3. Click on any variant to swap it with the main value
4. Original values are automatically saved as variants when AI updates fields

### Translation

1. Fill in character fields (supports English or Chinese)
2. Click the **"翻译"** (Translate) button on character header
3. AI will:
   - Optimize text into English prompt tags
   - Provide Chinese translation for reference
   - Save original value as variant

### Modification Suggestions

1. Click the **Message Square** icon (💬) on any field or character header
2. Enter your modification suggestion in natural language
3. Add optional supplementary description
4. Click **"提交给AI"** (Submit to AI)
5. AI will intelligently update the target field or entire character
6. View suggestion history in the **Modification Suggestions** panel

### Generating Prompts

1. Click the **"复制"** (Copy) button on character header
2. Choose from:
   - **Copy All**: Full prompt with positive + negative
   - **Copy Positive**: Only the positive prompt
   - **Copy Negative**: Only the negative prompt
3. Paste into your AI image generation tool

### Global Prompts

1. Expand the **Global Prompts** section at the top
2. Edit positive/negative prompts
3. Changes apply to all characters automatically

### Copying Tags

1. Add tags in the **备注 & Tags** (Notes & Tags) section using `#tag` format
2. Click any tag to copy it to clipboard

## 🛠️ Tech Stack

- **Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Integration**: OpenAI API (compatible with OpenRouter, local LLMs)
- **UI Components**: Custom components with Tailwind CSS styling
- **State Management**: React Context API
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
promptarchitect/
├── App.tsx                          # Main application component
├── components/                      # React components
│   ├── CharacterGrid.tsx            # Character grid/table view
│   ├── FieldInput.tsx               # Individual field input with variants
│   ├── GlobalPromptEditor.tsx       # Global prompts editor
│   ├── Layout.tsx                   # App layout shell
│   ├── MagicFillModal.tsx           # AI auto-fill modal
│   ├── ModificationSuggestionModal.tsx  # Modification request modal
│   ├── ModificationSuggestionsList.tsx  # Modification history panel
│   ├── SettingsModal.tsx            # API settings configuration
│   └── ui/                          # Shared UI components
│       ├── Button.tsx
│       ├── ConfirmDialog.tsx
│       ├── CopyPromptDialog.tsx
│       └── Toaster.tsx
├── context/
│   └── AppContext.tsx               # Global state management
├── services/
│   └── openaiService.ts             # OpenAI API integration
├── constants.ts                     # Field templates, defaults
├── types.ts                         # TypeScript type definitions
└── ...
```

## ⚙️ Configuration

### API Settings

Configure your API in **Settings** (gear icon):

| Setting | Description | Default |
|---------|-------------|---------|
| API Key | Your OpenAI or compatible API key | Required |
| Base URL | API endpoint URL | `https://api.openai.com/v1` |
| Model | AI model to use | `gpt-3.5-turbo` |

### Compatible APIs

PromptArchitect works with any OpenAI-compatible API:

- **OpenAI**: GPT-3.5, GPT-4, GPT-4o, GPT-4-turbo
- **OpenRouter**: Access to 100+ models including Claude, Gemini, Mistral
- **Local LLMs**: Ollama, LM Studio, LocalAI
- **Azure OpenAI**: Custom endpoint configuration

## 🔒 Privacy & Security

- **Browser-Based**: All data is stored locally in your browser's LocalStorage
- **No Backend**: No server or database required
- **No Tracking**: No analytics or telemetry
- **API Key Privacy**: API keys are stored locally and never transmitted to third parties (except to the configured API endpoint)
- **OpenAI Browser Warning**: The app uses `dangerouslyAllowBrowser: true` for client-side API calls. In production, API calls should go through a backend proxy for security.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- AI integration via [OpenAI API](https://openai.com/)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions

---

<div align="center">
  <p>Made with ❤️ for AI artists worldwide</p>
</div>
