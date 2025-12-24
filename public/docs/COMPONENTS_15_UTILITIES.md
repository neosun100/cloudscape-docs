# 模块 15: 工具组件

> **模块**: 工具组件  
> **组件数**: 6 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

工具组件提供基础的布局、内容展示和标记功能，是构建复杂界面的基础工具。

### 本模块包含的组件

1. **Box** - 通用容器组件
2. **TextContent** - 富文本内容展示
3. **Link** - 链接组件
4. **Token** - 标记组件
5. **TokenGroup** - 标记组组件
6. **FileTokenGroup** - 文件标记组组件

---

## 1. Box - 通用容器

### 1.1 组件概述
通用容器组件，提供一致的间距、边框和背景样式。

### 1.2 完整 API
```typescript
interface BoxProps {
  children?: React.ReactNode;
  variant?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'strong' | 'small' | 'code' | 'pre' | 'samp' | 'sub' | 'sup';
  tagOverride?: string;
  margin?: SpacingSize | { top?: SpacingSize; right?: SpacingSize; bottom?: SpacingSize; left?: SpacingSize; horizontal?: SpacingSize; vertical?: SpacingSize; };
  padding?: SpacingSize | { top?: SpacingSize; right?: SpacingSize; bottom?: SpacingSize; left?: SpacingSize; horizontal?: SpacingSize; vertical?: SpacingSize; };
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  float?: 'left' | 'right';
  clear?: 'left' | 'right' | 'both';
  fontSize?: 'body-s' | 'body-m' | 'heading-xs' | 'heading-s' | 'heading-m' | 'heading-l' | 'heading-xl' | 'display-l';
  fontWeight?: 'light' | 'normal' | 'bold' | 'heavy';
  color?: 'inherit' | 'text-label' | 'text-body-secondary' | 'text-status-error' | 'text-status-success' | 'text-status-info' | 'text-status-warning' | 'text-inverted';
}

type SpacingSize = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
```

### 1.3 基础示例
```typescript
// 基本容器
<Box padding="m" margin="s">
  基本内容容器
</Box>

// 标题样式
<Box variant="h2" fontSize="heading-l" fontWeight="bold" margin={{ bottom: 'm' }}>
  页面标题
</Box>

// 卡片样式
<Box 
  padding="l" 
  margin="m"
  display="block"
  style={{ border: '1px solid #e9ebed', borderRadius: '8px' }}
>
  卡片内容
</Box>
```

### 1.4 进阶示例
```typescript
// 响应式布局
function ResponsiveLayout() {
  return (
    <Box display="flex" padding="m">
      <Box 
        padding="s" 
        margin={{ right: 'm' }}
        style={{ flex: '1', minWidth: '200px' }}
      >
        侧边栏内容
      </Box>
      <Box 
        padding="s"
        style={{ flex: '3' }}
      >
        主要内容区域
      </Box>
    </Box>
  );
}

// 状态指示器
function StatusIndicator({ status, children }) {
  const colorMap = {
    error: 'text-status-error',
    success: 'text-status-success',
    warning: 'text-status-warning',
    info: 'text-status-info'
  };

  return (
    <Box 
      display="inline-flex" 
      padding={{ horizontal: 's', vertical: 'xs' }}
      color={colorMap[status]}
      fontSize="body-s"
      fontWeight="bold"
    >
      {children}
    </Box>
  );
}
```

### 1.5 最佳实践
- 使用语义化的 variant 属性而不是 tagOverride
- 优先使用预定义的间距值保持一致性
- 合理使用 display 属性控制布局行为
- 避免过度嵌套 Box 组件

### 1.6 常见场景
- 创建一致的间距和布局
- 快速应用文本样式
- 构建响应式布局容器
- 实现状态指示和强调效果

### 1.7 注意事项
- Box 不提供边框和阴影，需要通过 style 属性添加
- 间距值基于设计系统，避免使用自定义数值
- 在表格或列表中使用时注意性能影响

---

## 2. TextContent - 富文本内容

### 2.1 组件概述
用于展示富文本内容，自动应用合适的排版样式。

### 2.2 完整 API
```typescript
interface TextContentProps {
  children: React.ReactNode;
}
```

### 2.3 基础示例
```typescript
<TextContent>
  <h1>文档标题</h1>
  <p>这是一段普通的文本内容，会自动应用合适的行高和间距。</p>
  <h2>子标题</h2>
  <p>另一段文本内容。</p>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </ul>
</TextContent>
```

### 2.4 进阶示例
```typescript
// 文档页面
function DocumentationPage({ content }) {
  return (
    <Container>
      <TextContent>
        <h1>API 文档</h1>
        <p>本文档介绍了 API 的使用方法和最佳实践。</p>
        
        <h2>快速开始</h2>
        <p>首先安装必要的依赖：</p>
        <pre><code>npm install @cloudscape-design/components</code></pre>
        
        <h3>基本用法</h3>
        <p>导入组件并使用：</p>
        <pre><code>{`import { Button } from '@cloudscape-design/components';

function App() {
  return <Button>点击我</Button>;
}`}</code></pre>
        
        <h2>注意事项</h2>
        <ul>
          <li>确保正确导入样式文件</li>
          <li>遵循组件的 API 规范</li>
          <li>注意浏览器兼容性</li>
        </ul>
      </TextContent>
    </Container>
  );
}

// 帮助内容
function HelpContent() {
  return (
    <TextContent>
      <h2>如何创建服务器？</h2>
      <ol>
        <li>点击"创建服务器"按钮</li>
        <li>填写服务器基本信息</li>
        <li>选择配置规格</li>
        <li>确认并提交</li>
      </ol>
      <p><strong>提示：</strong>创建过程可能需要几分钟时间。</p>
    </TextContent>
  );
}
```

### 2.5 最佳实践
- 用于展示结构化的文档内容
- 避免在 TextContent 内使用其他 Cloudscape 组件
- 保持内容的语义化结构
- 使用标准 HTML 标签获得最佳效果

### 2.6 常见场景
- 帮助文档和说明页面
- 博客文章和新闻内容
- API 文档和技术说明
- 用户指南和教程

### 2.7 注意事项
- TextContent 会重置内部元素的样式
- 不适合与其他 Cloudscape 组件混合使用
- 内容应该是纯 HTML 结构

---

## 3. Link - 链接组件

### 3.1 组件概述
统一的链接组件，支持内部导航和外部链接。

### 3.2 完整 API
```typescript
interface LinkProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'secondary';
  fontSize?: 'body-s' | 'body-m' | 'heading-xs' | 'heading-s' | 'heading-m' | 'heading-l' | 'heading-xl' | 'display-l';
  color?: 'normal' | 'inverted';
  onFollow?: (event: CustomEvent<{ href: string; external: boolean; }>) => void;
  ariaLabel?: string;
}
```

### 3.3 基础示例
```typescript
// 基本链接
<Link href="/dashboard">返回仪表盘</Link>

// 外部链接
<Link href="https://docs.aws.amazon.com" external>
  AWS 文档
</Link>

// 不同样式
<Link variant="secondary" fontSize="body-s">
  次要链接
</Link>
```

### 3.4 进阶示例
```typescript
// 导航链接
function NavigationLinks() {
  const navigate = useNavigate();
  
  return (
    <Box display="flex" padding="s">
      <Link 
        href="/servers"
        onFollow={(event) => {
          event.preventDefault();
          navigate(event.detail.href);
        }}
      >
        服务器
      </Link>
      <Box margin={{ left: 'm' }}>
        <Link 
          href="/network"
          onFollow={(event) => {
            event.preventDefault();
            navigate(event.detail.href);
          }}
        >
          网络
        </Link>
      </Box>
    </Box>
  );
}

// 条件链接
function ConditionalLink({ href, children, disabled }) {
  if (disabled) {
    return <Box color="text-body-secondary">{children}</Box>;
  }
  
  return <Link href={href}>{children}</Link>;
}

// 链接列表
function LinkList({ items }) {
  return (
    <Box>
      {items.map((item, index) => (
        <Box key={index} margin={{ bottom: 'xs' }}>
          <Link 
            href={item.href} 
            external={item.external}
            ariaLabel={item.ariaLabel}
          >
            {item.text}
          </Link>
        </Box>
      ))}
    </Box>
  );
}
```

### 3.5 最佳实践
- 为外部链接设置 external 属性
- 使用 onFollow 处理单页应用导航
- 提供有意义的 ariaLabel
- 避免链接文本过长

### 3.6 常见场景
- 页面间导航
- 外部资源链接
- 面包屑导航
- 帮助和文档链接

### 3.7 注意事项
- external 链接会在新标签页打开
- onFollow 事件需要手动处理 preventDefault
- 链接颜色会根据主题自动调整

---

## 4. Token - 标记组件

### 4.1 组件概述
用于显示标签、状态或可移除的项目。

### 4.2 完整 API
```typescript
interface TokenProps {
  children: React.ReactNode;
  dismissLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onDismiss?: () => void;
}
```

### 4.3 基础示例
```typescript
// 基本标记
<Token>标签名称</Token>

// 可移除标记
<Token 
  onDismiss={() => console.log('移除标记')}
  dismissLabel="移除标签"
>
  可移除标签
</Token>

// 只读标记
<Token readOnly>只读标签</Token>

// 禁用标记
<Token disabled>禁用标签</Token>
```

### 4.4 进阶示例
```typescript
// 标签管理器
function TagManager() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'AWS']);
  
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  
  return (
    <Box display="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
      {tags.map((tag, index) => (
        <Token
          key={index}
          onDismiss={() => removeTag(index)}
          dismissLabel={`移除 ${tag}`}
        >
          {tag}
        </Token>
      ))}
    </Box>
  );
}

// 状态标记
function StatusToken({ status }) {
  const statusConfig = {
    active: { text: '运行中', color: 'success' },
    stopped: { text: '已停止', color: 'error' },
    pending: { text: '处理中', color: 'warning' }
  };
  
  const config = statusConfig[status];
  
  return (
    <Token readOnly>
      <Box display="inline-flex" style={{ alignItems: 'center' }}>
        <Box 
          style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%',
            backgroundColor: config.color === 'success' ? '#037f0c' : 
                           config.color === 'error' ? '#d91515' : '#ff9900',
            marginRight: '6px'
          }} 
        />
        {config.text}
      </Box>
    </Token>
  );
}

// 过滤器标记
function FilterTokens({ filters, onRemoveFilter }) {
  return (
    <Box display="flex" style={{ gap: '4px', flexWrap: 'wrap' }}>
      {filters.map((filter) => (
        <Token
          key={filter.id}
          onDismiss={() => onRemoveFilter(filter.id)}
          dismissLabel={`移除过滤器 ${filter.label}`}
        >
          {filter.label}: {filter.value}
        </Token>
      ))}
    </Box>
  );
}
```

### 4.5 最佳实践
- 为可移除标记提供清晰的 dismissLabel
- 使用 readOnly 显示状态信息
- 保持标记文本简洁
- 合理使用 disabled 状态

### 4.6 常见场景
- 标签和分类管理
- 搜索过滤器显示
- 状态指示器
- 选中项目展示

### 4.7 注意事项
- onDismiss 和 readOnly 不能同时使用
- 标记内容应该简短明了
- 避免在标记内使用复杂的交互元素

---

## 5. TokenGroup - 标记组

### 5.1 组件概述
管理一组相关标记，支持限制显示数量和展开/收起。

### 5.2 完整 API
```typescript
interface TokenGroupProps {
  items: Array<{
    label: string;
    labelTag?: string;
    tags?: string[];
    description?: string;
    dismissLabel?: string;
  }>;
  limit?: number;
  hasShowMore?: boolean;
  readOnly?: boolean;
  onDismiss?: (event: { detail: { itemIndex: number; } }) => void;
  i18nStrings?: {
    limitShowFewer?: string;
    limitShowMore?: string;
  };
}
```

### 5.3 基础示例
```typescript
// 基本标记组
<TokenGroup
  items={[
    { label: 'React' },
    { label: 'TypeScript' },
    { label: 'AWS' },
    { label: 'Cloudscape' }
  ]}
/>

// 限制显示数量
<TokenGroup
  items={items}
  limit={3}
  hasShowMore={true}
  i18nStrings={{
    limitShowFewer: '显示更少',
    limitShowMore: '显示更多'
  }}
/>
```

### 5.4 进阶示例
```typescript
// 技能标签组
function SkillTokenGroup() {
  const [skills, setSkills] = useState([
    { label: 'React', description: '前端框架' },
    { label: 'Node.js', description: '后端运行时' },
    { label: 'AWS', description: '云服务平台' },
    { label: 'Docker', description: '容器化技术' },
    { label: 'Kubernetes', description: '容器编排' }
  ]);
  
  const handleDismiss = ({ detail }) => {
    setSkills(skills.filter((_, index) => index !== detail.itemIndex));
  };
  
  return (
    <TokenGroup
      items={skills.map(skill => ({
        label: skill.label,
        description: skill.description,
        dismissLabel: `移除 ${skill.label}`
      }))}
      limit={3}
      hasShowMore={true}
      onDismiss={handleDismiss}
      i18nStrings={{
        limitShowFewer: '收起',
        limitShowMore: `查看全部 ${skills.length} 项`
      }}
    />
  );
}

// 过滤条件组
function FilterTokenGroup({ filters, onUpdateFilters }) {
  const handleDismiss = ({ detail }) => {
    const newFilters = filters.filter((_, index) => index !== detail.itemIndex);
    onUpdateFilters(newFilters);
  };
  
  return (
    <Box>
      <Box margin={{ bottom: 's' }}>
        <Box fontSize="body-s" fontWeight="bold">当前过滤条件：</Box>
      </Box>
      <TokenGroup
        items={filters.map(filter => ({
          label: `${filter.field}: ${filter.value}`,
          dismissLabel: `移除过滤条件 ${filter.field}`
        }))}
        onDismiss={handleDismiss}
      />
    </Box>
  );
}

// 分类标记组
function CategoryTokenGroup({ categories, selectedCategories, onToggleCategory }) {
  return (
    <TokenGroup
      items={categories.map(category => ({
        label: category.name,
        labelTag: selectedCategories.includes(category.id) ? 'selected' : undefined,
        description: `${category.count} 项`
      }))}
      readOnly={true}
    />
  );
}
```

### 5.5 最佳实践
- 使用 limit 和 hasShowMore 处理大量标记
- 提供有意义的 description 信息
- 合理设置 dismissLabel 提升可访问性
- 使用 readOnly 模式显示信息性标记

### 5.6 常见场景
- 技能和标签展示
- 搜索过滤器管理
- 分类和标签选择
- 属性和特征展示

### 5.7 注意事项
- limit 设置过小可能影响用户体验
- onDismiss 回调中正确处理索引
- 大量标记时考虑性能优化

---

## 6. FileTokenGroup - 文件标记组

### 6.1 组件概述
专门用于显示文件列表的标记组，支持文件信息展示和操作。

### 6.2 完整 API
```typescript
interface FileTokenGroupProps {
  items: Array<{
    file?: File;
    name?: string;
    size?: number;
    lastModified?: number;
    type?: string;
    src?: string;
    alt?: string;
    description?: string;
    tags?: string[];
    dismissLabel?: string;
  }>;
  showFileLastModified?: boolean;
  showFileSize?: boolean;
  showFileThumbnail?: boolean;
  readOnly?: boolean;
  onDismiss?: (event: { detail: { itemIndex: number; } }) => void;
  i18nStrings?: {
    formatFileLastModified?: (date: Date) => string;
    formatFileSize?: (sizeInBytes: number) => string;
    removeFileAriaLabel?: (index: number) => string;
  };
}
```

### 6.3 基础示例
```typescript
// 基本文件列表
<FileTokenGroup
  items={[
    { name: 'document.pdf', size: 1024000, type: 'application/pdf' },
    { name: 'image.jpg', size: 512000, type: 'image/jpeg' },
    { name: 'data.csv', size: 256000, type: 'text/csv' }
  ]}
  showFileSize={true}
  showFileLastModified={true}
/>

// 可移除文件
<FileTokenGroup
  items={files}
  onDismiss={({ detail }) => removeFile(detail.itemIndex)}
  showFileSize={true}
  i18nStrings={{
    formatFileSize: (bytes) => `${(bytes / 1024).toFixed(1)} KB`,
    removeFileAriaLabel: (index) => `移除文件 ${files[index].name}`
  }}
/>
```

### 6.4 进阶示例
```typescript
// 文件上传组件
function FileUploader() {
  const [files, setFiles] = useState([]);
  
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      type: file.type
    }))]);
  };
  
  const handleRemoveFile = ({ detail }) => {
    setFiles(files.filter((_, index) => index !== detail.itemIndex));
  };
  
  return (
    <Box>
      <input 
        type="file" 
        multiple 
        onChange={handleFileSelect}
        style={{ marginBottom: '16px' }}
      />
      
      {files.length > 0 && (
        <FileTokenGroup
          items={files}
          onDismiss={handleRemoveFile}
          showFileSize={true}
          showFileLastModified={true}
          showFileThumbnail={true}
          i18nStrings={{
            formatFileSize: (bytes) => {
              if (bytes < 1024) return `${bytes} B`;
              if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
              return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
            },
            formatFileLastModified: (date) => date.toLocaleDateString('zh-CN'),
            removeFileAriaLabel: (index) => `移除文件 ${files[index].name}`
          }}
        />
      )}
    </Box>
  );
}

// 文档管理器
function DocumentManager({ documents, onRemoveDocument }) {
  return (
    <Box>
      <Box margin={{ bottom: 'm' }}>
        <Box fontSize="heading-s" fontWeight="bold">已上传文档</Box>
      </Box>
      
      <FileTokenGroup
        items={documents.map(doc => ({
          name: doc.filename,
          size: doc.size,
          lastModified: doc.uploadTime,
          type: doc.mimeType,
          description: doc.description,
          tags: doc.tags,
          dismissLabel: `删除文档 ${doc.filename}`
        }))}
        onDismiss={({ detail }) => onRemoveDocument(detail.itemIndex)}
        showFileSize={true}
        showFileLastModified={true}
        i18nStrings={{
          formatFileSize: (bytes) => formatBytes(bytes),
          formatFileLastModified: (date) => formatDate(date),
          removeFileAriaLabel: (index) => `删除 ${documents[index].filename}`
        }}
      />
    </Box>
  );
}

// 图片预览组
function ImagePreviewGroup({ images, onRemoveImage }) {
  return (
    <FileTokenGroup
      items={images.map(image => ({
        name: image.name,
        size: image.size,
        src: image.url,
        alt: image.alt || image.name,
        type: image.type
      }))}
      onDismiss={onRemoveImage}
      showFileThumbnail={true}
      showFileSize={true}
    />
  );
}
```

### 6.5 最佳实践
- 启用文件大小和修改时间显示
- 为图片文件启用缩略图预览
- 提供本地化的格式化函数
- 合理处理大文件的显示

### 6.6 常见场景
- 文件上传界面
- 文档管理系统
- 图片库和相册
- 附件列表展示

### 6.7 注意事项
- 大量文件时注意性能影响
- 缩略图加载可能影响页面性能
- 文件类型检测依赖 MIME 类型
- 移除操作需要确认机制

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 通用容器布局 | Box |
| 富文本内容 | TextContent |
| 导航链接 | Link |
| 标签管理 | Token |
| 批量标记 | TokenGroup |
| 文件列表 | FileTokenGroup |

### 最佳实践

```typescript
// ✅ 使用 Box 创建一致的布局
<Box padding="m" margin="s" display="flex">
  <Box fontSize="heading-m" fontWeight="bold">标题</Box>
</Box>

// ✅ 组合使用工具组件
<Box padding="l">
  <TextContent>
    <h1>帮助文档</h1>
    <p>查看 <Link href="/api">API 文档</Link> 了解更多。</p>
  </TextContent>
  
  <Box margin={{ top: 'm' }}>
    <TokenGroup items={tags} limit={5} hasShowMore={true} />
  </Box>
</Box>

// ✅ 提供完整的国际化支持
<FileTokenGroup
  items={files}
  i18nStrings={{
    formatFileSize: formatBytes,
    formatFileLastModified: formatDate,
    removeFileAriaLabel: (index) => `移除 ${files[index].name}`
  }}
/>
```

### 性能优化

```typescript
// ✅ 大量标记时使用虚拟化
const MemoizedTokenGroup = React.memo(TokenGroup);

// ✅ 文件组件懒加载缩略图
<FileTokenGroup
  items={files}
  showFileThumbnail={files.length < 20} // 限制缩略图数量
/>
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据可视化](./COMPONENTS_14_VISUALIZATION.md) | [下一模块：高级组件](./COMPONENTS_16_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15