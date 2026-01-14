[English](README.md)


<div align="center">
  <h1>🎨 PromptArchitect - 提示词工程师</h1>
  
  <p>
    <strong>一个为 AI 画师打造的专业角色设计与提示词生成工具</strong>
  </p>
  
  <p>
    管理多角色配置，结构化字段组织提示词，管理变体，并利用 AI 驱动功能
  </p>

[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## ✨ 功能特性

### 🎭 角色管理
- **多角色支持**：同时创建、复制和管理多个角色配置。
- **结构化字段**：将角色细节分为6大类别：
  - 🧍 **基础外貌**: 年龄, 性别, 种族, 发型, 眼睛, 皮肤
  - 👗 **上装**: 衬衫, 夹克, 外套
  - 👖 **下装**: 裤子, 裙子, 腿部穿着, 鞋子
  - 💍 **配饰**: 项链, 头饰, 眼镜, 耳环
  - 🧍‍♀️ **身材 & 姿态**: 体型, 姿势, 表情
  - 🎨 **场景 & 风格**: 背景, 镜头, 光照

### 🪄 AI 驱动功能
- **智能填充**：通过以下方式生成角色配置：
  - 自然语言文本描述
  - 上传图片（视觉分析）
- **智能翻译**：翻译并优化提示词：
  - 生成为 Stable Diffusion 优化的英文提示词
  - 提供中文翻译以供参考
- **修改建议**：提交自然语言建议以：
  - 修改特定角色字段
  - 对整个角色配置进行整体更改
  - 追踪修改历史，提供前后对比

### 📋 变体管理
- 为每个字段存储多个变体
- 一键切换变体
- AI 更新字段时自动将原始值保存为变体

### 🌐 全局提示词
- 配置全局正面/负面提示词
- 应用于所有角色的提示词生成过程
- 预设提升质量的默认值

### 📤 提示词导出
- 生成包含正面和负面部分的完整提示词
- 单独复制正面/负面提示词
- 在输出中包含角色备注和标签

### 💾 数据持久化
- 自动本地存储保存/加载
- 基于浏览器的数据持久化
- 无需后端

## 🚀 快速开始

### 环境要求
- Node.js (v16 或更高)
- npm, pnpm, 或 yarn
- OpenAI API 密钥（或兼容的 API）

### 安装

1. **克隆并安装依赖**
   ```bash
   npm install
   # 或
   pnpm install
   # 或
   yarn install
   ```

2. **配置 API**
   
   在项目根目录创建一个 `.env.local` 文件：
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1
   VITE_OPENAI_API_MODEL=gpt-3.5-turbo
   ```
   
   或通过应用内 **设置** (页眉中的齿轮图标) 进行配置。

3. **运行开发服务器**
   ```bash
   npm run dev
   # 或
   pnpm dev
   # 或
   yarn dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   # 或
   pnpm build
   # 或
   yarn build
   ```

5. **预览生产版本**
   ```bash
   npm run preview
   # 或
   pnpm preview
   # 或
   yarn preview
   ```

## 📖 使用指南

### 创建角色

1. 点击 **"添加角色"** 按钮
2. 点击角色名称以重命名
3. 手动填写角色字段或使用 AI 智能填充

### AI 智能填充

1. 点击任一角色标题栏的 **魔法棒** 图标 (🪄)
2. 选择 **文字描述** 或 **上传图片**
3. 文字模式：用自然语言描述角色（例如：“一个赛博朋克风格的街头武士少女，留着霓虹蓝色的波波头，穿着高科技装甲夹克...”）
4. 图片模式：上传一张参考图
5. 点击 **"开始填充"** 以自动生成所有角色字段

### 管理变体

1. 在任一字段中输入一个值
2. 点击 **"+"** 按钮添加备选变体
3. 点击任一变体以替换主值
4. AI 更新字段时，原始值会自动保存为变体

### 翻译

1. 填写角色字段（支持中英文）
2. 点击角色标题栏的 **"翻译"** 按钮
3. AI 将会：
   - 将文本优化为英文提示词标签
   - 提供中文翻译以供参考
   - 将原始值保存为变体

### 修改建议

1. 点击任一字段或角色标题栏的 **对话框** 图标 (💬)
2. 用自然语言输入您的修改建议
3. 添加可选的补充说明
4. 点击 **"提交给AI"**
5. AI 将智能地更新目标字段或整个角色
6. 在 **修改建议** 面板中查看建议历史

### 生成提示词

1. 点击角色标题栏的 **"复制"** 按钮
2. 可选择：
   - **复制全部**：包含正面和负面的完整提示词
   - **仅复制正面**：仅正面提示词
   - **仅复制负面**：仅负面提示词
3. 粘贴到您的 AI 绘画工具中

### 全局提示词

1. 展开顶部的 **全局提示词** 部分
2. 编辑正面/负面提示词
3. 更改会自动应用于所有角色

### 复制标签

1. 在 **备注 & Tags** 部分使用 `#tag` 格式添加标签
2. 点击任一标签以复制到剪贴板

## 🛠️ 技术栈

- **框架**: React 19.2.3 with TypeScript
- **构建工具**: Vite 6.2.0
- **AI 集成**：OpenAI API（兼容 OpenRouter、本地 LLM）
- **UI 组件**：使用 Tailwind CSS 的自定义组件
- **状态管理**：React Context API
- **图标**: Lucide React
- **工具**: clsx, tailwind-merge

## 📁 项目结构

```
promptarchitect/
├── App.tsx                          # 主应用组件
├── components/                      # React 组件
│   ├── CharacterGrid.tsx            # 角色网格/表格视图
│   ├── FieldInput.tsx               # 带变体的独立字段输入
│   ├── GlobalPromptEditor.tsx       # 全局提示词编辑器
│   ├── Layout.tsx                   # 应用布局外壳
│   ├── MagicFillModal.tsx           # AI 智能填充模态框
│   ├── ModificationSuggestionModal.tsx  # 修改请求模态框
│   ├── ModificationSuggestionsList.tsx  # 修改历史面板
│   ├── SettingsModal.tsx            # API 设置配置
│   └── ui/                          # 共享 UI 组件
│       ├── Button.tsx
│       ├── ConfirmDialog.tsx
│       ├── CopyPromptDialog.tsx
│       └── Toaster.tsx
├── context/
│   └── AppContext.tsx               # 全局状态管理
├── services/
│   └── openaiService.ts             # OpenAI API 集成
├── constants.ts                     # 字段模板、默认值
├── types.ts                         # TypeScript 类型定义
└── ...
```

## ⚙️ 配置

### API 设置

在 **设置** (齿轮图标) 中配置您的 API：

| 设置 | 描述 | 默认值 |
|---|---|---|
| API 密钥 | 您的 OpenAI 或兼容的 API 密钥 | 必填 |
| 基础 URL | API 端点 URL | `https://api.openai.com/v1` |
| 模型 | 要使用的 AI 模型 | `gpt-3.5-turbo` |

### 兼容的 API

PromptArchitect 可与任何 OpenAI 兼容的 API 配合使用：

- **OpenAI**: GPT-3.5, GPT-4, GPT-4o, GPT-4-turbo
- **OpenRouter**: 访问超过100种模型，包括 Claude、Gemini、Mistral
- **本地 LLM**：Ollama、LM Studio、LocalAI
- **Azure OpenAI**: 自定义端点配置

## 🔒 隐私与安全

- **基于浏览器**：所有数据都存储在您浏览器的 LocalStorage 中
- **无后端**：无需服务器或数据库
- **无追踪**：无分析或遥测
- **API 密钥隐私**：API 密钥存储在本地，绝不会传输给第三方（配置的 API 端点除外）
- **OpenAI 浏览器警告**：该应用使用 `dangerouslyAllowBrowser: true` 进行客户端 API 调用。在生产环境中，为安全起见，API 调用应通过后端代理。

## 🤝 贡献

欢迎贡献！请随时提交 issue 或 pull request。

## 📄 许可证

MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🙏 致谢

- 使用 [React](https://reactjs.org/) 构建
- 由 [Vite](https://vitejs.dev/) 驱动
- 图标来自 [Lucide](https://lucide.dev/)
- 通过 [OpenAI API](https://openai.com/) 进行 AI 集成

## 📞 支持

如有问题或疑问：
- 在 GitHub 上开启一个 issue
- 查看现有 issue 以寻找解决方案

---

<div align="center">
  <p>为全球 AI 画师倾心打造 ❤️</p>
</div>
