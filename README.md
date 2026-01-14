<div align="center">
  <h1>🎨 PromptArchitect - 提示词工程师</h1>
  
  <p>
    <strong>A professional character design and prompt generation tool for AI artists</strong><br/>
    <strong>一个为 AI 画师打造的专业角色设计与提示词生成工具</strong>
  </p>
  
  <p>
    Manage multi-character profiles, organize prompts by specific fields, manage variants, and leverage AI-powered features <br/>
    管理多角色配置，结构化字段组织提示词，管理变体，并利用 AI 驱动功能
  </p>

[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## ✨ Features / 功能特性

### 🎭 Character Management / 角色管理
- **Multi-Character Support**: Create, duplicate, and manage multiple character profiles simultaneously / **多角色支持**：同时创建、复制和管理多个角色配置。
- **Structured Fields**: Organize character details into 6 categories: / **结构化字段**：将角色细节分为6大类别：
  - 🧍 **基础外貌** (Basic Appearance): Age, Gender, Race, Hair, Eyes, Skin
  - 👗 **上装** (Outfit Top): Shirts, Jackets, Coats
  - 👖 **下装** (Outfit Bottom): Pants, Skirts, Legwear, Shoes
  - 💍 **配饰** (Accessories): Necklaces, Headwear, Glasses, Earrings
  - 🧍‍♀️ **身材 & 姿态** (Body & Pose): Body type, Pose, Expression
  - 🎨 **场景 & 风格** (Environment & Style): Background, Camera, Lighting

### 🪄 AI-Powered Features / AI 驱动功能
- **Smart Auto-Fill**: Generate character profiles from: / **智能填充**：通过以下方式生成角色配置：
  - Natural language text descriptions / 自然语言文本描述
  - Image uploads (visual analysis) / 上传图片（视觉分析）
- **Intelligent Translation**: Translate and optimize prompts with: / **智能翻译**：翻译并优化提示词：
  - English prompt generation (optimized for Stable Diffusion) / 生成为 Stable Diffusion 优化的英文提示词
  - Chinese translation for reference / 提供中文翻译以供参考
- **Modification Suggestions**: Submit natural language suggestions to: / **修改建议**：提交自然语言建议以：
  - Modify specific character fields / 修改特定角色字段
  - Apply holistic changes to entire character profiles / 对整个角色配置进行整体更改
  - Track modification history with before/after comparisons / 追踪修改历史，提供前后对比

### 📋 Variant Management / 变体管理
- Store multiple variants for each field / 为每个字段存储多个变体
- One-click swap between variants / 一键切换变体
- Automatically preserve original values as variants during updates / AI 更新字段时自动将原始值保存为变体

### 🌐 Global Prompts / 全局提示词
- Configure global positive/negative prompts / 配置全局正面/负面提示词
- Applied to all characters during prompt generation / 应用于所有角色的提示词生成过程
- Pre-configured with quality-enhancing defaults / 预设提升质量的默认值

### 📤 Prompt Export / 提示词导出
- Generate complete prompts with positive and negative components / 生成包含正面和负面部分的完整提示词
- Copy positive/negative prompts separately / 单独复制正面/负面提示词
- Include character notes and tags in output / 在输出中包含角色备注和标签

### 💾 Data Persistence / 数据持久化
- Automatic local storage save/load / 自动本地存储保存/加载
- Browser-based data persistence / 基于浏览器的数据持久化
- No backend required / 无需后端

## 🚀 Quick Start / 快速开始

### Prerequisites / 环境要求
- Node.js (v16 or higher)
- npm, pnpm, or yarn
- OpenAI API key (or compatible API) / OpenAI API 密钥（或兼容的 API）

### Installation / 安装

1. **Clone and Install Dependencies / 克隆并安装依赖**
   ```bash
   npm install
   # or / 或
   pnpm install
   # or / 或
   yarn install
   ```

2. **Configure API Settings / 配置 API**
   
   Create a `.env.local` file in the project root: / 在项目根目录创建一个 `.env.local` 文件：
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1
   VITE_OPENAI_API_MODEL=gpt-3.5-turbo
   ```
   
   Or configure in-app via **Settings** (gear icon in the header) / 或通过应用内 **设置** (页眉中的齿轮图标) 进行配置。

3. **Run Development Server / 运行开发服务器**
   ```bash
   npm run dev
   # or / 或
   pnpm dev
   # or / 或
   yarn dev
   ```

4. **Build for Production / 构建生产版本**
   ```bash
   npm run build
   # or / 或
   pnpm build
   # or / 或
   yarn build
   ```

5. **Preview Production Build / 预览生产版本**
   ```bash
   npm run preview
   # or / 或
   pnpm preview
   # or / 或
   yarn preview
   ```

## 📖 Usage Guide / 使用指南

### Creating Characters / 创建角色

1. Click the **"添加角色"** (Add Character) button / 点击 **"添加角色"** 按钮
2. Rename the character by clicking on its name / 点击角色名称以重命名
3. Fill in character fields manually or use AI auto-fill / 手动填写角色字段或使用 AI 智能填充

### AI Auto-Fill / AI 智能填充

1. Click the **Magic Wand** icon (🪄) on any character header / 点击任一角色标题栏的 **魔法棒** 图标 (🪄)
2. Choose **Text Description** or **Upload Image** / 选择 **文字描述** 或 **上传图片**
3. For text: Describe the character in natural language (e.g., "A cyberpunk street samurai girl with neon blue bob cut, wearing high-tech armor jacket...") / 文字模式：用自然语言描述角色（例如：“一个赛博朋克风格的街头武士少女，留着霓虹蓝色的波波头，穿着高科技装甲夹克...”）
4. For image: Upload a reference image / 图片模式：上传一张参考图
5. Click **"开始填充"** (Start Fill) to auto-generate all character fields / 点击 **"开始填充"** 以自动生成所有角色字段

### Managing Variants / 管理变体

1. Enter a value in any field / 在任一字段中输入一个值
2. Click the **"+"** button to add alternative variants / 点击 **"+"** 按钮添加备选变体
3. Click on any variant to swap it with the main value / 点击任一变体以替换主值
4. Original values are automatically saved as variants when AI updates fields / AI 更新字段时，原始值会自动保存为变体

### Translation / 翻译

1. Fill in character fields (supports English or Chinese) / 填写角色字段（支持中英文）
2. Click the **"翻译"** (Translate) button on character header / 点击角色标题栏的 **"翻译"** 按钮
3. AI will: / AI 将会：
   - Optimize text into English prompt tags / 将文本优化为英文提示词标签
   - Provide Chinese translation for reference / 提供中文翻译以供参考
   - Save original value as variant / 将原始值保存为变体

### Modification Suggestions / 修改建议

1. Click the **Message Square** icon (💬) on any field or character header / 点击任一字段或角色标题栏的 **对话框** 图标 (💬)
2. Enter your modification suggestion in natural language / 用自然语言输入您的修改建议
3. Add optional supplementary description / 添加可选的补充说明
4. Click **"提交给AI"** (Submit to AI) / 点击 **"提交给AI"**
5. AI will intelligently update the target field or entire character / AI 将智能地更新目标字段或整个角色
6. View suggestion history in the **Modification Suggestions** panel / 在 **修改建议** 面板中查看建议历史

### Generating Prompts / 生成提示词

1. Click the **"复制"** (Copy) button on character header / 点击角色标题栏的 **"复制"** 按钮
2. Choose from: / 可选择：
   - **Copy All**: Full prompt with positive + negative / **复制全部**：包含正面和负面的完整提示词
   - **Copy Positive**: Only the positive prompt / **仅复制正面**：仅正面提示词
   - **Copy Negative**: Only the negative prompt / **仅复制负面**：仅负面提示词
3. Paste into your AI image generation tool / 粘贴到您的 AI 绘画工具中

### Global Prompts / 全局提示词

1. Expand the **Global Prompts** section at the top / 展开顶部的 **全局提示词** 部分
2. Edit positive/negative prompts / 编辑正面/负面提示词
3. Changes apply to all characters automatically / 更改会自动应用于所有角色

### Copying Tags / 复制标签

1. Add tags in the **备注 & Tags** (Notes & Tags) section using `#tag` format / 在 **备注 & Tags** 部分使用 `#tag` 格式添加标签
2. Click any tag to copy it to clipboard / 点击任一标签以复制到剪贴板

## 🛠️ Tech Stack / 技术栈

- **Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Integration**: OpenAI API (compatible with OpenRouter, local LLMs) / **AI 集成**：OpenAI API（兼容 OpenRouter、本地 LLM）
- **UI Components**: Custom components with Tailwind CSS styling / **UI 组件**：使用 Tailwind CSS 的自定义组件
- **State Management**: React Context API / **状态管理**：React Context API
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure / 项目结构

```
promptarchitect/
├── App.tsx                          # Main application component / 主应用组件
├── components/                      # React components / React 组件
│   ├── CharacterGrid.tsx            # Character grid/table view / 角色网格/表格视图
│   ├── FieldInput.tsx               # Individual field input with variants / 带变体的独立字段输入
│   ├── GlobalPromptEditor.tsx       # Global prompts editor / 全局提示词编辑器
│   ├── Layout.tsx                   # App layout shell / 应用布局外壳
│   ├── MagicFillModal.tsx           # AI auto-fill modal / AI 智能填充模态框
│   ├── ModificationSuggestionModal.tsx  # Modification request modal / 修改请求模态框
│   ├── ModificationSuggestionsList.tsx  # Modification history panel / 修改历史面板
│   ├── SettingsModal.tsx            # API settings configuration / API 设置配置
│   └── ui/                          # Shared UI components / 共享 UI 组件
│       ├── Button.tsx
│       ├── ConfirmDialog.tsx
│       ├── CopyPromptDialog.tsx
│       └── Toaster.tsx
├── context/
│   └── AppContext.tsx               # Global state management / 全局状态管理
├── services/
│   └── openaiService.ts             # OpenAI API integration / OpenAI API 集成
├── constants.ts                     # Field templates, defaults / 字段模板、默认值
├── types.ts                         # TypeScript type definitions / TypeScript 类型定义
└── ...
```

## ⚙️ Configuration / 配置

### API Settings / API 设置

Configure your API in **Settings** (gear icon): / 在 **设置** (齿轮图标) 中配置您的 API：

| Setting / 设置 | Description / 描述 | Default / 默认值 |
|---|---|---|
| API Key / API 密钥 | Your OpenAI or compatible API key / 您的 OpenAI 或兼容的 API 密钥 | Required / 必填 |
| Base URL / 基础 URL | API endpoint URL / API 端点 URL | `https://api.openai.com/v1` |
| Model / 模型 | AI model to use / 要使用的 AI 模型 | `gpt-3.5-turbo` |

### Compatible APIs / 兼容的 API

PromptArchitect works with any OpenAI-compatible API: / PromptArchitect 可与任何 OpenAI 兼容的 API 配合使用：

- **OpenAI**: GPT-3.5, GPT-4, GPT-4o, GPT-4-turbo
- **OpenRouter**: Access to 100+ models including Claude, Gemini, Mistral / 访问超过100种模型，包括 Claude、Gemini、Mistral
- **Local LLMs**: Ollama, LM Studio, LocalAI / **本地 LLM**：Ollama、LM Studio、LocalAI
- **Azure OpenAI**: Custom endpoint configuration / 自定义端点配置

## 🔒 Privacy & Security / 隐私与安全

- **Browser-Based**: All data is stored locally in your browser's LocalStorage / **基于浏览器**：所有数据都存储在您浏览器的 LocalStorage 中
- **No Backend**: No server or database required / **无后端**：无需服务器或数据库
- **No Tracking**: No analytics or telemetry / **无追踪**：无分析或遥测
- **API Key Privacy**: API keys are stored locally and never transmitted to third parties (except to the configured API endpoint) / **API 密钥隐私**：API 密钥存储在本地，绝不会传输给第三方（配置的 API 端点除外）
- **OpenAI Browser Warning**: The app uses `dangerouslyAllowBrowser: true` for client-side API calls. In production, API calls should go through a backend proxy for security. / **OpenAI 浏览器警告**：该应用使用 `dangerouslyAllowBrowser: true` 进行客户端 API 调用。在生产环境中，为安全起见，API 调用应通过后端代理。

## 🤝 Contributing / 贡献

Contributions are welcome! Please feel free to submit issues or pull requests. / 欢迎贡献！请随时提交 issue 或 pull request。

## 📄 License / 许可证

MIT License - see LICENSE file for details / MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🙏 Acknowledgments / 致谢

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- AI integration via [OpenAI API](https://openai.com/)

## 📞 Support / 支持

For issues or questions: /如有问题或疑问：
- Open an issue on GitHub / 在 GitHub 上开启一个 issue
- Check existing issues for solutions / 查看现有 issue 以寻找解决方案

---

<div align="center">
  <p>Made with ❤️ for AI artists worldwide / 为全球 AI 画师倾心打造</p>
</div>
