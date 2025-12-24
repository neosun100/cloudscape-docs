# Cloudscape 设计系统 - 完整文档与交互式网站

[English](README.md) | [简体中文](README_CN.md) | [繁體中文](README_TW.md) | [日本語](README_JP.md)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Cloudscape](https://img.shields.io/badge/Cloudscape-3.0-orange.svg)](https://cloudscape.design)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

> Cloudscape 设计系统的完整文档系统和交互式网站 - AWS 开源设计系统，用于构建直观的 Web 应用程序。

**在线演示**: https://cloudscape-docs.pages.dev

---

## 📖 项目简介

本项目为 Cloudscape 设计系统提供了完整的文档系统，包括：

- **26 个 Markdown 文档** - 涵盖所有 96 个组件的完整指南
- **交互式网站** - 使用 Cloudscape 组件构建，部署在 Cloudflare Pages
- **500+ 代码示例** - 生产就绪的代码片段
- **200+ 最佳实践** - 经过验证的模式和反模式

---

## ✨ 功能特性

### 文档系统
- ✅ **17 个模块指南** - 按组件类别组织
- ✅ **96 个组件参考** - 完整的 API 文档
- ✅ **技术分析** - 架构和功能分析
- ✅ **后端开发指南** - 构建管理后台

### 交互式网站
- ✅ **Cloudscape UI** - 使用官方组件构建
- ✅ **Markdown 渲染** - 实时文档渲染
- ✅ **代码高亮** - 使用 Prism 语法高亮
- ✅ **一键复制** - 即时复制代码示例
- ✅ **响应式设计** - 适配所有屏幕尺寸
- ✅ **快速加载** - 全球 CDN 分发

---

## 🚀 快速开始

### 查看文档网站

访问: https://cloudscape-docs.pages.dev

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/cloudscape-docs.git
cd cloudscape-docs

# 安装依赖
cd cloudscape-docs-site
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

---

## 📦 安装部署

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 安装依赖

```bash
cd cloudscape-docs-site
npm install
```

### 生产构建

```bash
npm run build
```

构建输出将在 `dist/` 目录中。

---

## 🌐 部署

### 部署到 Cloudflare Pages

#### 方法 1: Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
cd cloudscape-docs-site
wrangler pages deploy dist --project-name=cloudscape-docs
```

#### 方法 2: 控制台上传

1. 访问 [Cloudflare 控制台](https://dash.cloudflare.com)
2. 进入 **Workers & Pages**
3. 点击 **创建应用程序** → **Pages** → **上传资源**
4. 上传 `dist/` 目录或 `dist.tar.gz`
5. 项目名称: `cloudscape-docs`
6. 点击 **部署站点**

#### 方法 3: Git 集成

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 配置构建设置:
   - **构建命令**: `npm run build`
   - **输出目录**: `dist`
   - **Node 版本**: 18+
4. 每次推送自动部署

---

## 📁 项目结构

```
cloudscape-docs/
├── components/                      # 原始 Cloudscape 组件项目
│   ├── COMPONENTS_01_LAYOUT.md     # 模块 01: 布局组件
│   ├── COMPONENTS_02_NAVIGATION.md # 模块 02: 导航组件
│   ├── ... (17 个模块文档)
│   ├── CLOUDSCAPE_TECH_ANALYSIS.md # 技术分析
│   └── CLOUDSCAPE_BACKEND_GUIDE.md # 后端开发指南
│
└── cloudscape-docs-site/           # 文档网站
    ├── public/
    │   └── docs/                   # 所有 Markdown 文档
    ├── src/
    │   ├── components/             # React 组件
    │   │   ├── Layout.tsx          # 主布局
    │   │   ├── Navigation.tsx      # 侧边栏导航
    │   │   └── MarkdownRenderer.tsx # Markdown 渲染器
    │   ├── pages/                  # 页面组件
    │   │   ├── Home.tsx            # 首页
    │   │   ├── ModuleList.tsx      # 模块列表
    │   │   └── DocumentView.tsx    # 文档查看器
    │   ├── data/
    │   │   └── modules.ts          # 模块元数据
    │   ├── App.tsx                 # 路由配置
    │   └── main.tsx                # 应用入口
    ├── package.json
    ├── vite.config.ts
    └── README.md
```

---

## 🛠️ 技术栈

### 文档网站

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| TypeScript | 5.9+ | 类型安全 |
| Vite | 7.3 | 构建工具 |
| Cloudscape Design System | 3.0 | UI 组件 |
| React Router | 6 | 客户端路由 |
| react-markdown | Latest | Markdown 渲染 |
| react-syntax-highlighter | Latest | 代码高亮 |

### 部署

- **Cloudflare Pages** - 静态托管与全球 CDN
- **GitHub** - 版本控制和 CI/CD

---

## 📚 文档模块

### 组件模块 (17 个)

1. **布局组件** (5 个组件) - AppLayout, ContentLayout, Grid 等
2. **导航组件** (6 个组件) - TopNavigation, SideNavigation, Tabs 等
3. **表单组件 - 基础** (5 个组件) - Input, Select, Textarea 等
4. **表单组件 - 选择器** (5 个组件) - Checkbox, RadioGroup, Toggle 等
5. **表单组件 - 日期时间** (4 个组件) - DatePicker, DateRangePicker 等
6. **表单组件 - 高级** (6 个组件) - FileUpload, Slider 等
7. **表单组件 - 容器** (3 个组件) - Form, FormField 等
8. **数据展示 - 表格** (1 个组件) ⭐ - 完整的 Table 指南
9. **数据展示 - 列表** (5 个组件) - Cards, PropertyFilter 等
10. **数据展示 - 基础** (6 个组件) - StatusIndicator, Badge 等
11. **图表** (5 个组件) ⭐ - LineChart, BarChart, PieChart 等
12. **反馈** (6 个组件) - Alert, Modal, Popover 等
13. **容器** (4 个组件) - Container, Header 等
14. **按钮** (5 个组件) - Button, ButtonDropdown 等
15. **工具** (6 个组件) - Box, Link, Token 等
16. **专用** (5 个组件) - CodeEditor, TreeView 等
17. **其他** (4 个组件) - Steps, List 等

### 参考文档

- **技术分析** - 技术栈和功能分析
- **后端开发指南** - 构建管理后台

**总计**: 96 个组件，500+ 代码示例，200+ 最佳实践

---

## 💻 开发指南

### 本地开发

```bash
cd cloudscape-docs-site

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

---

## 🔧 配置说明

### 环境变量

文档网站无需环境变量配置。

### 自定义配置

#### 更新导航

编辑 `src/components/Navigation.tsx` 修改侧边栏导航。

#### 添加新文档

1. 将 Markdown 文件放在 `public/docs/` 中
2. 更新 `src/data/modules.ts` 中的模块元数据
3. 重新构建和部署

#### 自定义样式

Cloudscape 组件提供完整样式，无需额外 CSS。

---

## 📖 使用示例

### 浏览文档

1. 访问 https://cloudscape-docs.pages.dev
2. 点击侧边栏导航中的模块
3. 阅读带有语法高亮的文档
4. 点击复制按钮复制代码示例

### 搜索组件

使用浏览器搜索 (Ctrl/Cmd + F) 查找特定组件。

### 复制代码示例

点击任何代码块右上角的复制按钮。

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

### 开发规范

- 遵循现有代码风格
- 为新功能添加测试
- 更新文档
- 确保所有测试通过

---

## 📝 更新日志

### 版本 1.0.0 (2025-12-24)

**新增**:
- 包含 26 个 Markdown 文档的完整文档系统
- 使用 Cloudscape 组件构建的交互式网站
- 涵盖所有 96 个组件的 17 个模块指南
- 技术分析和后端开发指南
- 部署到 Cloudflare Pages

---

## 📄 许可证

本项目基于 Apache License 2.0 许可证 - 详见 [LICENSE](LICENSE) 文件。

Cloudscape 设计系统同样基于 Apache 2.0 许可证。

---

## 🙏 致谢

- [Cloudscape Design System](https://cloudscape.design) - AWS 开源设计系统
- [React](https://react.dev) - UI 框架
- [Vite](https://vitejs.dev) - 构建工具
- [Cloudflare Pages](https://pages.cloudflare.com) - 托管平台

---

## 📞 联系与支持

- **文档**: https://cloudscape-docs.pages.dev
- **Cloudscape 官方**: https://cloudscape.design
- **问题反馈**: [GitHub Issues](https://github.com/YOUR_USERNAME/cloudscape-docs/issues)

---

## ⭐ Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/cloudscape-docs&type=Date)](https://star-history.com/#YOUR_USERNAME/cloudscape-docs)

---

## 📱 关注公众号

![公众号](https://img.aws.xin/uPic/扫码_搜索联合传播样式-标准色版.png)

---

**使用 Cloudscape 设计系统用 ❤️ 创建**

**最后更新**: 2025-12-24