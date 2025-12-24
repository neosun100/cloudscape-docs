# Cloudscape Design System - Complete Documentation & Interactive Website

[English](README.md) | [简体中文](README_CN.md) | [繁體中文](README_TW.md) | [日本語](README_JP.md)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Cloudscape](https://img.shields.io/badge/Cloudscape-3.0-orange.svg)](https://cloudscape.design)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

> Complete documentation system and interactive website for Cloudscape Design System - AWS's open-source design system for building intuitive web applications.

**Live Demo**: https://cloudscape-docs.pages.dev

---

## 📖 Overview

This project provides a comprehensive documentation system for Cloudscape Design System, including:

- **26 Markdown Documents** - Complete guides covering all 96 components
- **Interactive Website** - Built with Cloudscape components, deployed on Cloudflare Pages
- **500+ Code Examples** - Production-ready code snippets
- **200+ Best Practices** - Proven patterns and anti-patterns

---

## ✨ Features

### Documentation System
- ✅ **17 Module Guides** - Organized by component categories
- ✅ **96 Component References** - Complete API documentation
- ✅ **Technical Analysis** - Architecture and capabilities
- ✅ **Backend Development Guide** - Building admin dashboards

### Interactive Website
- ✅ **Cloudscape UI** - Built with official components
- ✅ **Markdown Rendering** - Real-time document rendering
- ✅ **Code Highlighting** - Syntax highlighting with Prism
- ✅ **One-Click Copy** - Copy code examples instantly
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Fast Loading** - Global CDN delivery

---

## 🚀 Quick Start

### View Documentation Website

Visit: https://cloudscape-docs.pages.dev

### Run Locally

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/cloudscape-docs.git
cd cloudscape-docs

# Install dependencies
cd cloudscape-docs-site
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Install Dependencies

```bash
cd cloudscape-docs-site
npm install
```

### Build for Production

```bash
npm run build
```

Build output will be in `dist/` directory.

---

## 🌐 Deployment

### Deploy to Cloudflare Pages

#### Method 1: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
cd cloudscape-docs-site
wrangler pages deploy dist --project-name=cloudscape-docs
```

#### Method 2: Dashboard Upload

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages**
3. Click **Create application** → **Pages** → **Upload assets**
4. Upload `dist/` directory or `dist.tar.gz`
5. Project name: `cloudscape-docs`
6. Click **Deploy site**

#### Method 3: Git Integration

1. Push code to GitHub
2. Connect repository in Cloudflare Pages
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **Node version**: 18+
4. Auto-deploy on every push

---

## 📁 Project Structure

```
cloudscape-docs/
├── components/                      # Original Cloudscape components project
│   ├── COMPONENTS_01_LAYOUT.md     # Module 01: Layout Components
│   ├── COMPONENTS_02_NAVIGATION.md # Module 02: Navigation Components
│   ├── ... (17 module documents)
│   ├── CLOUDSCAPE_TECH_ANALYSIS.md # Technical analysis
│   └── CLOUDSCAPE_BACKEND_GUIDE.md # Backend development guide
│
└── cloudscape-docs-site/           # Documentation website
    ├── public/
    │   └── docs/                   # All Markdown documents
    ├── src/
    │   ├── components/             # React components
    │   │   ├── Layout.tsx          # Main layout
    │   │   ├── Navigation.tsx      # Sidebar navigation
    │   │   └── MarkdownRenderer.tsx # Markdown renderer
    │   ├── pages/                  # Page components
    │   │   ├── Home.tsx            # Homepage
    │   │   ├── ModuleList.tsx      # Module list
    │   │   └── DocumentView.tsx    # Document viewer
    │   ├── data/
    │   │   └── modules.ts          # Module metadata
    │   ├── App.tsx                 # Router configuration
    │   └── main.tsx                # Application entry
    ├── package.json
    ├── vite.config.ts
    └── README.md
```

---

## 🛠️ Tech Stack

### Documentation Website

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5.9+ | Type safety |
| Vite | 7.3 | Build tool |
| Cloudscape Design System | 3.0 | UI components |
| React Router | 6 | Client-side routing |
| react-markdown | Latest | Markdown rendering |
| react-syntax-highlighter | Latest | Code highlighting |

### Deployment

- **Cloudflare Pages** - Static hosting with global CDN
- **GitHub** - Version control and CI/CD

---

## 📚 Documentation Modules

### Component Modules (17)

1. **Layout Components** (5 components) - AppLayout, ContentLayout, Grid, etc.
2. **Navigation Components** (6 components) - TopNavigation, SideNavigation, Tabs, etc.
3. **Form Components - Basic** (5 components) - Input, Select, Textarea, etc.
4. **Form Components - Selectors** (5 components) - Checkbox, RadioGroup, Toggle, etc.
5. **Form Components - DateTime** (4 components) - DatePicker, DateRangePicker, etc.
6. **Form Components - Advanced** (6 components) - FileUpload, Slider, etc.
7. **Form Components - Containers** (3 components) - Form, FormField, etc.
8. **Data Display - Table** (1 component) ⭐ - Complete Table guide
9. **Data Display - Lists** (5 components) - Cards, PropertyFilter, etc.
10. **Data Display - Basic** (6 components) - StatusIndicator, Badge, etc.
11. **Charts** (5 components) ⭐ - LineChart, BarChart, PieChart, etc.
12. **Feedback** (6 components) - Alert, Modal, Popover, etc.
13. **Containers** (4 components) - Container, Header, etc.
14. **Buttons** (5 components) - Button, ButtonDropdown, etc.
15. **Utilities** (6 components) - Box, Link, Token, etc.
16. **Specialized** (5 components) - CodeEditor, TreeView, etc.
17. **Misc** (4 components) - Steps, List, etc.

### Reference Documents

- **Technical Analysis** - Technology stack and capabilities
- **Backend Development Guide** - Building admin dashboards

**Total**: 96 components, 500+ code examples, 200+ best practices

---

## 💻 Development

### Local Development

```bash
cd cloudscape-docs-site

# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:5173
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔧 Configuration

### Environment Variables

No environment variables required for the documentation website.

### Customization

#### Update Navigation

Edit `src/components/Navigation.tsx` to modify sidebar navigation.

#### Add New Documents

1. Place Markdown file in `public/docs/`
2. Update `src/data/modules.ts` with module metadata
3. Rebuild and redeploy

#### Customize Styles

Cloudscape components provide complete styling. No additional CSS needed.

---

## 📖 Usage Examples

### Browse Documentation

1. Visit https://cloudscape-docs.pages.dev
2. Click module in sidebar navigation
3. Read documentation with syntax-highlighted code
4. Click copy button to copy code examples

### Search Components

Use browser's search (Ctrl/Cmd + F) to find specific components.

### Copy Code Examples

Click the copy button in the top-right corner of any code block.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 Changelog

### Version 1.0.0 (2025-12-24)

**Added**:
- Complete documentation system with 26 Markdown documents
- Interactive website built with Cloudscape components
- 17 module guides covering all 96 components
- Technical analysis and backend development guide
- Deployed to Cloudflare Pages

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

Cloudscape Design System is also licensed under Apache 2.0.

---

## 🙏 Acknowledgments

- [Cloudscape Design System](https://cloudscape.design) - AWS's open-source design system
- [React](https://react.dev) - UI framework
- [Vite](https://vitejs.dev) - Build tool
- [Cloudflare Pages](https://pages.cloudflare.com) - Hosting platform

---

## 📞 Contact & Support

- **Documentation**: https://cloudscape-docs.pages.dev
- **Cloudscape Official**: https://cloudscape.design
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/cloudscape-docs/issues)

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/cloudscape-docs&type=Date)](https://star-history.com/#YOUR_USERNAME/cloudscape-docs)

---

## 📱 关注公众号

![公众号](https://img.aws.xin/uPic/扫码_搜索联合传播样式-标准色版.png)

---

**Created with ❤️ using Cloudscape Design System**

**Last Updated**: 2025-12-24
