# 模块 16: 特殊组件

> **模块**: 特殊组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐⭐⭐ 高级  
> **重要性**: ⭐⭐⭐ 专业场景  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

特殊组件提供高级功能，适用于特定的专业场景，如代码编辑、资源选择、树形结构等。

### 本模块包含的组件

1. **CodeEditor** - 代码编辑器
2. **S3ResourceSelector** - S3 资源选择器
3. **TreeView** - 树形视图
4. **AnnotationContext** - 注释上下文
5. **Hotspot** - 热点标记

---

## 1. CodeEditor - 代码编辑器

### 1.1 组件概述
基于 Monaco Editor 的代码编辑器，支持语法高亮、自动补全、错误提示等功能。

### 1.2 完整 API
```typescript
interface CodeEditorProps {
  value: string;
  language?: string;
  onChange?: (event: { detail: { value: string } }) => void;
  preferences?: {
    wrapLines?: boolean;
    showLineNumbers?: boolean;
    showGutter?: boolean;
  };
  loading?: boolean;
  readOnly?: boolean;
  onDelayedChange?: (event: { detail: { value: string } }) => void;
  onValidate?: (event: { detail: { annotations: Array<any> } }) => void;
  themes?: {
    light: Array<string>;
    dark: Array<string>;
  };
  i18nStrings?: {
    loadingState?: string;
    errorState?: string;
    errorStateRecovery?: string;
  };
}
```

### 1.3 基础示例
```typescript
import CodeEditor from '@cloudscape-design/components/code-editor';

function BasicCodeEditor() {
  const [code, setCode] = useState('console.log("Hello World");');

  return (
    <CodeEditor
      value={code}
      language="javascript"
      onChange={({ detail }) => setCode(detail.value)}
      preferences={{
        wrapLines: true,
        showLineNumbers: true,
        showGutter: true
      }}
    />
  );
}
```

### 1.4 进阶示例
```typescript
function AdvancedCodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('json');
  const [annotations, setAnnotations] = useState([]);

  return (
    <SpaceBetween size="m">
      <FormField label="编程语言">
        <Select
          selectedOption={{ label: language, value: language }}
          onChange={({ detail }) => setLanguage(detail.selectedOption.value)}
          options={[
            { label: 'JavaScript', value: 'javascript' },
            { label: 'JSON', value: 'json' },
            { label: 'YAML', value: 'yaml' },
            { label: 'Python', value: 'python' }
          ]}
        />
      </FormField>
      
      <CodeEditor
        value={code}
        language={language}
        onChange={({ detail }) => setCode(detail.value)}
        onValidate={({ detail }) => setAnnotations(detail.annotations)}
        preferences={{
          wrapLines: true,
          showLineNumbers: true,
          showGutter: true
        }}
        themes={{
          light: ['cloud9_day', 'github'],
          dark: ['cloud9_night', 'monokai']
        }}
        i18nStrings={{
          loadingState: '正在加载编辑器...',
          errorState: '编辑器加载失败',
          errorStateRecovery: '重试'
        }}
      />
      
      {annotations.length > 0 && (
        <Alert type="error" header="代码错误">
          {annotations.map((annotation, index) => (
            <div key={index}>
              第 {annotation.row + 1} 行: {annotation.text}
            </div>
          ))}
        </Alert>
      )}
    </SpaceBetween>
  );
}
```

### 1.5 最佳实践
- 使用 `onDelayedChange` 避免频繁更新
- 设置合适的 `language` 获得语法高亮
- 启用 `showLineNumbers` 便于调试
- 处理 `onValidate` 事件显示错误信息

### 1.6 常见场景
- 配置文件编辑 (JSON/YAML)
- 脚本编写和调试
- API 响应查看
- 模板编辑

### 1.7 注意事项
- 需要异步加载 Monaco Editor
- 大文件可能影响性能
- 移动端体验有限

---

## 2. S3ResourceSelector - S3 资源选择器

### 2.1 组件概述
专用于选择 S3 存储桶和对象的组件，提供浏览、搜索、筛选功能。

### 2.2 完整 API
```typescript
interface S3ResourceSelectorProps {
  resource: {
    uri?: string;
  };
  viewHref?: string;
  selectableItemsTypes?: Array<'buckets' | 'objects' | 'versions'>;
  bucketsVisibleColumns?: Array<string>;
  objectsVisibleColumns?: Array<string>;
  versionsVisibleColumns?: Array<string>;
  fetchBuckets?: () => Promise<{ buckets: Array<any> }>;
  fetchObjects?: (bucketName: string, path?: string) => Promise<{ objects: Array<any> }>;
  fetchVersions?: (bucketName: string, objectKey: string) => Promise<{ versions: Array<any> }>;
  onSelectionChange?: (event: { detail: { resource: any } }) => void;
  i18nStrings?: {
    inContextSelectLabel?: string;
    inContextBrowseLabel?: string;
    inContextViewLabel?: string;
    modalTitle?: string;
    modalCancelButton?: string;
    modalSubmitButton?: string;
  };
}
```

### 2.3 基础示例
```typescript
function BasicS3Selector() {
  const [selectedResource, setSelectedResource] = useState({ uri: '' });

  return (
    <S3ResourceSelector
      resource={selectedResource}
      selectableItemsTypes={['buckets', 'objects']}
      onSelectionChange={({ detail }) => setSelectedResource(detail.resource)}
    />
  );
}
```

### 2.4 进阶示例
```typescript
function AdvancedS3Selector() {
  const [resource, setResource] = useState({ uri: 's3://my-bucket/' });

  return (
    <FormField label="选择 S3 资源">
      <S3ResourceSelector
        resource={resource}
        selectableItemsTypes={['buckets', 'objects', 'versions']}
        bucketsVisibleColumns={['Name', 'CreationDate', 'Region']}
        objectsVisibleColumns={['Key', 'LastModified', 'Size']}
        onSelectionChange={({ detail }) => setResource(detail.resource)}
        i18nStrings={{
          modalTitle: 'S3 资源选择器',
          modalCancelButton: '取消',
          modalSubmitButton: '选择'
        }}
      />
    </FormField>
  );
}
```

### 2.5 最佳实践
- 实现错误处理和重试机制
- 使用分页处理大量对象
- 缓存存储桶列表提升性能

### 2.6 常见场景
- 数据管道配置
- 备份文件选择
- 日志文件分析

### 2.7 注意事项
- 需要正确的 AWS 权限
- 大存储桶可能加载缓慢

---

## 3. TreeView - 树形视图

### 3.1 组件概述
层次结构数据展示组件，支持展开/折叠、选择等交互。

### 3.2 完整 API
```typescript
interface TreeViewProps {
  items: Array<TreeItem>;
  multiSelect?: boolean;
  selectedItems?: Array<TreeItem>;
  expandedItems?: Array<TreeItem>;
  onSelectionChange?: (event: { detail: { selectedItems: Array<TreeItem> } }) => void;
  onExpandChange?: (event: { detail: { expandedItems: Array<TreeItem> } }) => void;
}

interface TreeItem {
  text: string;
  value: string;
  children?: Array<TreeItem>;
  disabled?: boolean;
}
```

### 3.3 基础示例
```typescript
function BasicTreeView() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);

  const items = [
    {
      text: '根目录',
      value: 'root',
      children: [
        {
          text: '文档',
          value: 'docs',
          children: [
            { text: 'README.md', value: 'readme' },
            { text: 'API.md', value: 'api' }
          ]
        }
      ]
    }
  ];

  return (
    <TreeView
      items={items}
      selectedItems={selectedItems}
      expandedItems={expandedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      onExpandChange={({ detail }) => setExpandedItems(detail.expandedItems)}
    />
  );
}
```

### 3.4 进阶示例
```typescript
function AdvancedTreeView() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);

  const organizationData = [
    {
      text: '技术部',
      value: 'tech',
      children: [
        {
          text: '前端团队',
          value: 'frontend',
          children: [
            { text: '张三 - 高级工程师', value: 'zhang' },
            { text: '李四 - 工程师', value: 'li' }
          ]
        },
        {
          text: '后端团队',
          value: 'backend',
          children: [
            { text: '王五 - 架构师', value: 'wang' },
            { text: '赵六 - 工程师', value: 'zhao' }
          ]
        }
      ]
    }
  ];

  return (
    <SpaceBetween size="m">
      <Header>组织架构</Header>
      <TreeView
        items={organizationData}
        multiSelect={true}
        selectedItems={selectedItems}
        expandedItems={expandedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        onExpandChange={({ detail }) => setExpandedItems(detail.expandedItems)}
      />
      {selectedItems.length > 0 && (
        <Alert header="已选择">
          {selectedItems.map(item => item.text).join(', ')}
        </Alert>
      )}
    </SpaceBetween>
  );
}
```

### 3.5 最佳实践
- 使用受控模式管理展开状态
- 提供多选功能时显示选择结果
- 合理设置初始展开项

### 3.6 常见场景
- 文件系统浏览
- 组织架构展示
- 分类目录管理

### 3.7 注意事项
- 深层嵌套可能影响性能
- 移动端交互体验需优化

---

## 4. AnnotationContext - 注释上下文

### 4.1 组件概述
为其他组件提供注释功能的上下文组件，支持热点标记和弹出说明。

### 4.2 完整 API
```typescript
interface AnnotationContextProps {
  children: React.ReactNode;
  currentStepIndex?: number;
  totalLocalSteps?: number;
  labels?: {
    nextButtonLabel?: string;
    previousButtonLabel?: string;
    finishButtonLabel?: string;
    labelDismiss?: string;
  };
  onStepChange?: (event: { detail: { step: number; reason: string } }) => void;
  onFinish?: (event: { detail: { reason: string } }) => void;
}
```

### 4.3 基础示例
```typescript
function BasicAnnotationContext() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AnnotationContext
      currentStepIndex={currentStep}
      totalLocalSteps={3}
      onStepChange={({ detail }) => setCurrentStep(detail.step)}
      onFinish={() => console.log('引导完成')}
      labels={{
        nextButtonLabel: '下一步',
        previousButtonLabel: '上一步',
        finishButtonLabel: '完成',
        labelDismiss: '关闭'
      }}
    >
      <Container>
        <SpaceBetween size="m">
          <Hotspot hotspotId="step-1">
            <Button variant="primary">开始操作</Button>
          </Hotspot>
          
          <Hotspot hotspotId="step-2">
            <Input placeholder="输入内容" />
          </Hotspot>
          
          <Hotspot hotspotId="step-3">
            <Button>提交</Button>
          </Hotspot>
        </SpaceBetween>
      </Container>
    </AnnotationContext>
  );
}
```

### 4.4 进阶示例
```typescript
function AdvancedAnnotationContext() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(false);

  const steps = [
    {
      title: '创建项目',
      content: '点击此按钮开始创建新项目',
      hotspotId: 'create-button'
    },
    {
      title: '填写信息',
      content: '在此处输入项目名称和描述',
      hotspotId: 'form-fields'
    },
    {
      title: '确认设置',
      content: '检查配置并点击保存',
      hotspotId: 'save-button'
    }
  ];

  return (
    <SpaceBetween size="m">
      <Button onClick={() => setShowGuide(true)}>
        开始引导
      </Button>
      
      {showGuide && (
        <AnnotationContext
          currentStepIndex={currentStep}
          totalLocalSteps={steps.length}
          onStepChange={({ detail }) => setCurrentStep(detail.step)}
          onFinish={() => {
            setShowGuide(false);
            setCurrentStep(0);
          }}
        >
          <Container header={<Header>项目管理</Header>}>
            <SpaceBetween size="m">
              <Hotspot 
                hotspotId="create-button"
                direction="right"
              >
                <Button variant="primary">创建项目</Button>
              </Hotspot>
              
              <FormField label="项目信息">
                <Hotspot hotspotId="form-fields">
                  <SpaceBetween size="s">
                    <Input placeholder="项目名称" />
                    <Textarea placeholder="项目描述" />
                  </SpaceBetween>
                </Hotspot>
              </FormField>
              
              <Hotspot hotspotId="save-button">
                <Button>保存项目</Button>
              </Hotspot>
            </SpaceBetween>
          </Container>
        </AnnotationContext>
      )}
    </SpaceBetween>
  );
}
```

### 4.5 最佳实践
- 保持引导步骤简洁明了
- 提供跳过和关闭选项
- 合理安排热点位置

### 4.6 常见场景
- 新用户引导
- 功能介绍
- 操作教程

### 4.7 注意事项
- 避免过多步骤造成用户疲劳
- 确保热点位置准确

---

## 5. Hotspot - 热点标记

### 5.1 组件概述
在界面元素上添加热点标记，配合 AnnotationContext 使用提供交互式引导。

### 5.2 完整 API
```typescript
interface HotspotProps {
  children: React.ReactNode;
  hotspotId: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}
```

### 5.3 基础示例
```typescript
function BasicHotspot() {
  return (
    <Hotspot hotspotId="example-hotspot" direction="right">
      <Button variant="primary">重要按钮</Button>
    </Hotspot>
  );
}
```

### 5.4 进阶示例
```typescript
function AdvancedHotspot() {
  return (
    <SpaceBetween size="m">
      <Hotspot hotspotId="navigation" direction="bottom">
        <SideNavigation
          items={[
            { type: 'link', text: '首页', href: '/' },
            { type: 'link', text: '设置', href: '/settings' }
          ]}
        />
      </Hotspot>
      
      <Container>
        <Hotspot hotspotId="main-content" direction="top">
          <SpaceBetween size="m">
            <Header>主要内容区域</Header>
            <div>这里是页面的主要内容</div>
          </SpaceBetween>
        </Hotspot>
      </Container>
      
      <Hotspot hotspotId="actions" direction="left">
        <ButtonGroup>
          <Button>取消</Button>
          <Button variant="primary">确认</Button>
        </ButtonGroup>
      </Hotspot>
    </SpaceBetween>
  );
}
```

### 5.5 最佳实践
- 选择合适的方向避免遮挡
- 确保热点 ID 唯一性
- 与 AnnotationContext 配合使用

### 5.6 常见场景
- 功能高亮
- 操作指引
- 重要提示

### 5.7 注意事项
- 热点位置需要精确计算
- 考虑不同屏幕尺寸的适配

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 代码编辑 | CodeEditor |
| S3 资源选择 | S3ResourceSelector |
| 层次数据展示 | TreeView |
| 用户引导 | AnnotationContext + Hotspot |

### 最佳实践

```typescript
// ✅ 组合使用注释组件
<AnnotationContext currentStepIndex={step}>
  <Hotspot hotspotId="step-1">
    <CodeEditor value={code} language="json" />
  </Hotspot>
</AnnotationContext>

// ✅ 处理异步数据加载
<S3ResourceSelector
  fetchBuckets={async () => {
    try {
      return await loadBuckets();
    } catch (error) {
      showError(error);
      return { buckets: [] };
    }
  }}
/>

// ✅ 使用受控模式管理状态
<TreeView
  selectedItems={selected}
  expandedItems={expanded}
  onSelectionChange={handleSelection}
/>
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据可视化](./COMPONENTS_15_VISUALIZATION.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24
```