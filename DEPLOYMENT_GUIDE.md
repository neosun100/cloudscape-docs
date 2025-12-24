# 🚀 Cloudscape 文档网站 - 部署指南

> **状态**: ✅ 构建完成，准备部署  
> **构建产物**: dist.tar.gz (513 KB)  
> **时间**: 2025-12-24 12:35

---

## 📦 已准备的文件

```
✅ dist/                    # 构建产物目录
   ├── index.html           # 主页面
   ├── _redirects           # SPA 路由配置
   ├── assets/              # JS 和 CSS 文件
   └── docs/                # 所有 Markdown 文档

✅ dist.tar.gz (513 KB)     # 压缩包（用于上传）
```

---

## 🌐 部署到 Cloudflare Pages

### 方式 1：使用 Cloudflare Dashboard（推荐）

#### 步骤 1：访问 Cloudflare Dashboard
```
https://dash.cloudflare.com
```

#### 步骤 2：进入 Pages
1. 登录后，点击左侧菜单的 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Upload assets**

#### 步骤 3：上传文件
1. 项目名称输入: `cloudscape-docs`
2. 点击 **Select from computer**
3. 选择文件: `/Users/jiasunm/Code/cloudscape-docs-site/dist.tar.gz`
4. 或者直接拖拽 `dist/` 目录中的所有文件

#### 步骤 4：完成部署
1. 点击 **Deploy site**
2. 等待部署完成（约 30 秒）
3. 获取网站地址: `https://cloudscape-docs.pages.dev`

---

### 方式 2：使用 Wrangler CLI

```bash
# 1. 登录 Cloudflare（会打开浏览器）
npx wrangler login

# 2. 部署
npx wrangler pages deploy dist --project-name=cloudscape-docs

# 3. 查看部署状态
npx wrangler pages deployment list --project-name=cloudscape-docs
```

---

### 方式 3：连接 Git 仓库（自动部署）

#### 步骤 1：推送到 GitHub

```bash
cd /Users/jiasunm/Code/cloudscape-docs-site

# 初始化 Git
git init
git add .
git commit -m "Initial commit: Cloudscape docs site"

# 推送到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/cloudscape-docs.git
git push -u origin main
```

#### 步骤 2：连接到 Cloudflare Pages

1. 访问 Cloudflare Dashboard
2. 进入 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages** → **Connect to Git**
5. 选择你的 GitHub 仓库
6. 配置构建设置：
   - **构建命令**: `npm run build`
   - **输出目录**: `dist`
   - **Node 版本**: 18 或更高
7. 点击 **Save and Deploy**

#### 优势
- ✅ 每次 push 自动部署
- ✅ 预览部署（PR）
- ✅ 回滚功能

---

## 🔧 部署后配置

### 1. 自定义域名（可选）

1. 在 Pages 项目设置中
2. 点击 **Custom domains**
3. 添加你的域名（例如: `docs.example.com`）
4. 按照提示配置 DNS

### 2. 环境变量（如需要）

目前网站是纯静态的，不需要环境变量。

### 3. 访问控制（可选）

如果需要限制访问：
1. 在 Pages 设置中
2. 启用 **Cloudflare Access**
3. 配置访问策略

---

## ✅ 部署检查清单

部署完成后，请验证：

- [ ] 网站可以访问
- [ ] 首页正常显示
- [ ] 侧边导航可以点击
- [ ] 模块列表页面正常
- [ ] 可以查看任意模块文档
- [ ] Markdown 渲染正确
- [ ] 代码高亮显示
- [ ] 代码复制功能正常
- [ ] 响应式布局正常
- [ ] 所有链接可以跳转

---

## 🐛 常见问题

### Q1: 部署后页面 404

**原因**: SPA 路由配置缺失

**解决**:
```bash
# 确保 dist/_redirects 文件存在
echo "/*    /index.html   200" > dist/_redirects

# 重新部署
```

### Q2: 文档加载失败

**原因**: 文档路径不正确

**解决**:
- 确保所有 .md 文件在 `dist/docs/` 目录
- 检查 `src/data/modules.ts` 中的 filename 是否正确

### Q3: 样式显示异常

**原因**: Cloudscape 样式未加载

**解决**:
- 确保 `src/main.tsx` 中导入了全局样式
- 检查 `@cloudscape-design/global-styles/index.css`

---

## 📊 部署信息

### 构建配置

```json
{
  "构建命令": "npm run build",
  "输出目录": "dist",
  "Node 版本": "18+",
  "包管理器": "npm"
}
```

### 文件大小

```
总大小: ~1.3 MB
Gzip 后: ~386 KB
文档数: 20+ 个
组件数: 96 个
```

### 性能指标

```
首次加载: < 2s
文档加载: < 100ms
代码高亮: 即时
```

---

## 🎉 部署完成后

### 获取网站地址

部署成功后，你会得到一个地址，格式为：
```
https://cloudscape-docs.pages.dev
```

或者如果配置了自定义域名：
```
https://docs.your-domain.com
```

### 分享给团队

将网站地址分享给团队成员，他们可以：
- 📖 学习 Cloudscape 组件
- 🔍 搜索和查找组件
- 📋 复制代码示例
- 💡 查看最佳实践

---

## 🔄 更新网站

### 更新文档内容

1. 修改 `/Users/jiasunm/Code/components/` 目录下的 Markdown 文件
2. 复制到项目：
   ```bash
   cp /Users/jiasunm/Code/components/COMPONENTS_*.md \
      /Users/jiasunm/Code/cloudscape-docs-site/public/docs/
   ```
3. 重新构建和部署：
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=cloudscape-docs
   ```

### 更新网站功能

1. 修改 `src/` 目录下的代码
2. 测试：`npm run dev`
3. 构建：`npm run build`
4. 部署：上传新的 dist 目录

---

## 📞 技术支持

### 项目位置
```
/Users/jiasunm/Code/cloudscape-docs-site
```

### 关键文件
- `src/App.tsx` - 路由配置
- `src/components/Layout.tsx` - 主布局
- `src/data/modules.ts` - 模块数据
- `public/docs/` - 所有文档

### 本地预览
```bash
cd /Users/jiasunm/Code/cloudscape-docs-site
npm run dev
```

---

**创建时间**: 2025-12-24  
**状态**: ✅ 准备部署  
**下一步**: 访问 Cloudflare Dashboard 完成部署
