# 模块 13: 容器组件

> **模块**: 容器组件  
> **组件数**: 4 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

容器组件用于组织和包装内容，提供结构化的布局和交互功能。

### 本模块包含的组件

1. **Container** - 基础容器
2. **Header** - 页面标题头
3. **ExpandableSection** - 可展开区域
4. **SplitPanel** - 分割面板

---

## 1. Container - 基础容器

### 1.1 组件概述
基础内容容器，提供一致的内边距和背景样式。

### 1.2 完整 API
```typescript
interface ContainerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'stacked';
  disableContentPaddings?: boolean;
  disableHeaderPaddings?: boolean;
  fitHeight?: boolean;
  media?: {
    content: React.ReactNode;
    width?: string | number;
    position?: 'top' | 'side';
  };
}
```

### 1.3 基础示例
```typescript
// 基本容器
<Container>
  <p>这是容器内容</p>
</Container>

// 带标题的容器
<Container
  header={<Header variant="h2">服务器配置</Header>}
>
  <FormField label="服务器名称">
    <Input value="srv-001" />
  </FormField>
</Container>
```

### 1.4 进阶示例
```typescript
// 带媒体内容的容器
<Container
  header={<Header variant="h2">产品介绍</Header>}
  media={{
    content: <img src="/product.jpg" alt="产品图片" />,
    width: 300,
    position: 'side'
  }}
>
  <p>产品详细描述...</p>
</Container>

// 堆叠变体
<Container variant="stacked">
  <Container header="第一部分">
    <p>内容 1</p>
  </Container>
  <Container header="第二部分">
    <p>内容 2</p>
  </Container>
</Container>

// 自定义内边距
<Container
  disableContentPaddings
  header={<Header>自定义布局</Header>}
>
  <div style={{ padding: '20px', background: '#f5f5f5' }}>
    自定义内容区域
  </div>
</Container>
```

### 1.5 最佳实践
- 使用 Container 包装表单和内容区域
- 合理使用 variant 属性区分不同层级
- 在需要自定义布局时禁用默认内边距
- 使用 media 属性展示图片和视频内容

### 1.6 常见场景
```typescript
// 表单容器
<Container header={<Header variant="h2">创建用户</Header>}>
  <SpaceBetween size="l">
    <FormField label="用户名">
      <Input />
    </FormField>
    <FormField label="邮箱">
      <Input />
    </FormField>
  </SpaceBetween>
</Container>

// 信息展示容器
<Container header={<Header variant="h3">系统状态</Header>}>
  <KeyValuePairs
    items={[
      { label: 'CPU 使用率', value: '45%' },
      { label: '内存使用率', value: '67%' }
    ]}
  />
</Container>
```

### 1.7 注意事项
- Container 会自动提供响应式布局
- 避免过度嵌套 Container
- 使用 fitHeight 时注意父容器高度设置

---

## 2. Header - 页面标题头

### 2.1 组件概述
页面和区域的标题组件，支持多种变体和操作按钮。

### 2.2 完整 API
```typescript
interface HeaderProps {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'awsui-h1-sticky';
  description?: React.ReactNode;
  info?: React.ReactNode;
  counter?: string;
  actions?: React.ReactNode;
  headingTagOverride?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
```

### 2.3 基础示例
```typescript
// 基本标题
<Header variant="h1">服务器管理</Header>

// 带描述的标题
<Header
  variant="h2"
  description="管理您的云服务器实例"
>
  服务器列表
</Header>

// 带计数器的标题
<Header
  variant="h2"
  counter="(12)"
>
  活跃服务器
</Header>
```

### 2.4 进阶示例
```typescript
// 带操作按钮的标题
<Header
  variant="h1"
  actions={
    <SpaceBetween direction="horizontal" size="xs">
      <Button>刷新</Button>
      <Button variant="primary">创建服务器</Button>
    </SpaceBetween>
  }
  description="管理和监控您的服务器实例"
  info={<Link external>了解更多</Link>}
>
  服务器管理控制台
</Header>

// 粘性标题
<Header
  variant="awsui-h1-sticky"
  actions={<Button variant="primary">保存</Button>}
>
  编辑配置
</Header>

// 自定义标签层级
<Header
  variant="h2"
  headingTagOverride="h1"
  counter="(5)"
  info={<Popover content="帮助信息">?</Popover>}
>
  重要通知
</Header>
```

### 2.5 最佳实践
- 保持标题层级的语义化
- 使用 description 提供上下文信息
- 将主要操作放在 actions 中
- 合理使用 counter 显示数量信息

### 2.6 常见场景
```typescript
// 页面主标题
<Header
  variant="h1"
  description="创建和配置新的服务器实例"
  actions={<Button variant="primary">创建</Button>}
>
  创建服务器
</Header>

// 区域标题
<Header
  variant="h2"
  counter="(3)"
  actions={<Button iconName="refresh" />}
>
  运行中的实例
</Header>

// 表格标题
<Header
  variant="h3"
  counter={`(${items.length})`}
  actions={
    <SpaceBetween direction="horizontal" size="xs">
      <Button>导出</Button>
      <Button variant="primary">添加</Button>
    </SpaceBetween>
  }
>
  用户列表
</Header>
```

### 2.7 注意事项
- 确保标题层级的逻辑性
- 避免在 actions 中放置过多按钮
- 使用 info 属性提供帮助信息

---

## 3. ExpandableSection - 可展开区域

### 3.1 组件概述
可折叠的内容区域，用于隐藏次要信息或节省空间。

### 3.2 完整 API
```typescript
interface ExpandableSectionProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  headerText?: string;
  headerDescription?: string;
  headerCounter?: string;
  headerActions?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: { detail: { expanded: boolean } }) => void;
  variant?: 'default' | 'footer' | 'navigation' | 'container' | 'stacked';
  disableContentPaddings?: boolean;
  headingTagOverride?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
```

### 3.3 基础示例
```typescript
// 基本可展开区域
<ExpandableSection headerText="高级设置">
  <FormField label="调试模式">
    <Checkbox checked={debugMode} />
  </FormField>
</ExpandableSection>

// 默认展开
<ExpandableSection
  headerText="网络配置"
  defaultExpanded
>
  <SpaceBetween size="m">
    <FormField label="IP 地址">
      <Input />
    </FormField>
    <FormField label="端口">
      <Input />
    </FormField>
  </SpaceBetween>
</ExpandableSection>
```

### 3.4 进阶示例
```typescript
// 受控模式
function ControlledExpandableSection() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <ExpandableSection
      headerText="安全设置"
      headerDescription="配置访问控制和权限"
      headerCounter="(3 项配置)"
      expanded={expanded}
      onChange={({ detail }) => setExpanded(detail.expanded)}
      headerActions={
        <Button
          iconName="external"
          variant="icon"
          ariaLabel="在新窗口打开"
        />
      }
    >
      <SpaceBetween size="m">
        <FormField label="启用 SSL">
          <Checkbox />
        </FormField>
        <FormField label="访问密钥">
          <Input type="password" />
        </FormField>
        <FormField label="IP 白名单">
          <Textarea />
        </FormField>
      </SpaceBetween>
    </ExpandableSection>
  );
}

// 不同变体
<SpaceBetween size="m">
  <ExpandableSection
    variant="container"
    headerText="容器变体"
  >
    <p>带容器样式的内容</p>
  </ExpandableSection>
  
  <ExpandableSection
    variant="stacked"
    headerText="堆叠变体"
  >
    <p>堆叠样式的内容</p>
  </ExpandableSection>
  
  <ExpandableSection
    variant="footer"
    headerText="页脚变体"
  >
    <p>页脚样式的内容</p>
  </ExpandableSection>
</SpaceBetween>

// 自定义标题
<ExpandableSection
  header={
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name="settings" />
      <span>自定义标题</span>
      <Badge color="blue">新功能</Badge>
    </div>
  }
  disableContentPaddings
>
  <div style={{ padding: '16px', background: '#f9f9f9' }}>
    自定义内容区域
  </div>
</ExpandableSection>
```

### 3.5 最佳实践
- 将次要或高级功能放在可展开区域中
- 使用描述性的标题文本
- 合理设置默认展开状态
- 在表单中使用分组相关字段

### 3.6 常见场景
```typescript
// 表单分组
<SpaceBetween size="l">
  <Container header="基本信息">
    <FormField label="名称">
      <Input />
    </FormField>
  </Container>
  
  <ExpandableSection headerText="高级配置">
    <SpaceBetween size="m">
      <FormField label="超时时间">
        <Input />
      </FormField>
      <FormField label="重试次数">
        <Input />
      </FormField>
    </SpaceBetween>
  </ExpandableSection>
  
  <ExpandableSection headerText="监控设置">
    <FormField label="启用监控">
      <Checkbox />
    </FormField>
  </ExpandableSection>
</SpaceBetween>

// 详情页面
<SpaceBetween size="l">
  <Container header="服务器概览">
    <KeyValuePairs items={basicInfo} />
  </Container>
  
  <ExpandableSection
    headerText="系统信息"
    headerCounter="(8 项)"
    defaultExpanded
  >
    <KeyValuePairs items={systemInfo} />
  </ExpandableSection>
  
  <ExpandableSection headerText="网络配置">
    <KeyValuePairs items={networkInfo} />
  </ExpandableSection>
</SpaceBetween>
```

### 3.7 注意事项
- 避免嵌套过多层级的可展开区域
- 确保重要信息不被隐藏在折叠区域中
- 使用合适的变体匹配页面设计

---

## 4. SplitPanel - 分割面板

### 4.1 组件概述
可调整大小的分割面板，用于显示主内容和辅助信息。

### 4.2 完整 API
```typescript
interface SplitPanelProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  hidePreferencesButton?: boolean;
  closeBehavior?: 'hide' | 'collapse';
  size?: number;
  split?: 'vertical' | 'horizontal';
  position?: 'side' | 'bottom';
  i18nStrings?: {
    preferencesTitle?: string;
    preferencesPositionLabel?: string;
    preferencesPositionDescription?: string;
    preferencesPositionSide?: string;
    preferencesPositionBottom?: string;
    preferencesConfirm?: string;
    preferencesCancel?: string;
    closeButtonAriaLabel?: string;
    openButtonAriaLabel?: string;
    resizeHandleAriaLabel?: string;
  };
}
```

### 4.3 基础示例
```typescript
// 基本分割面板
<SplitPanel header="详细信息">
  <Container>
    <p>这里显示选中项的详细信息</p>
  </Container>
</SplitPanel>

// 侧边分割面板
<SplitPanel
  header="属性面板"
  position="side"
  size={300}
>
  <SpaceBetween size="m">
    <FormField label="名称">
      <Input value="服务器-001" readOnly />
    </FormField>
    <FormField label="状态">
      <StatusIndicator type="success">运行中</StatusIndicator>
    </FormField>
  </SpaceBetween>
</SplitPanel>
```

### 4.4 进阶示例
```typescript
// 完整配置的分割面板
function ServerDetailPanel({ selectedServer }) {
  return (
    <SplitPanel
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button iconName="refresh">刷新</Button>
              <Button variant="primary">编辑</Button>
            </SpaceBetween>
          }
        >
          {selectedServer?.name || '选择服务器'}
        </Header>
      }
      position="side"
      size={400}
      closeBehavior="collapse"
      i18nStrings={{
        preferencesTitle: '面板设置',
        preferencesPositionLabel: '面板位置',
        preferencesPositionSide: '侧边',
        preferencesPositionBottom: '底部',
        closeButtonAriaLabel: '关闭面板',
        openButtonAriaLabel: '打开面板'
      }}
    >
      {selectedServer ? (
        <SpaceBetween size="l">
          <Container header="基本信息">
            <KeyValuePairs
              items={[
                { label: 'ID', value: selectedServer.id },
                { label: '类型', value: selectedServer.type },
                { label: '状态', value: selectedServer.status }
              ]}
            />
          </Container>
          
          <Container header="监控数据">
            <LineChart
              series={[
                {
                  title: 'CPU 使用率',
                  type: 'line',
                  data: selectedServer.cpuData
                }
              ]}
              xDomain={[0, 24]}
              yDomain={[0, 100]}
            />
          </Container>
          
          <Container header="操作">
            <SpaceBetween size="xs">
              <Button>启动</Button>
              <Button>停止</Button>
              <Button>重启</Button>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      ) : (
        <Box textAlign="center" color="text-status-inactive">
          <b>选择一个服务器查看详情</b>
          <Box variant="p" color="text-status-inactive">
            从左侧列表中选择服务器以查看详细信息
          </Box>
        </Box>
      )}
    </SplitPanel>
  );
}

// 底部分割面板
<SplitPanel
  header="日志输出"
  position="bottom"
  size={200}
  split="horizontal"
>
  <Container>
    <pre style={{ 
      fontSize: '12px', 
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap'
    }}>
      {logData}
    </pre>
  </Container>
</SplitPanel>
```

### 4.5 最佳实践
- 用于显示主从关系的内容
- 合理设置初始大小
- 提供完整的国际化字符串
- 根据内容类型选择合适的位置

### 4.6 常见场景
```typescript
// 主从列表
function ServerManagement() {
  const [selectedServer, setSelectedServer] = useState(null);
  
  return (
    <AppLayout
      content={
        <Table
          items={servers}
          selectedItems={selectedServer ? [selectedServer] : []}
          onSelectionChange={({ detail }) => 
            setSelectedServer(detail.selectedItems[0])
          }
          columns={[
            { id: 'name', header: '名称' },
            { id: 'status', header: '状态' }
          ]}
        />
      }
      splitPanel={
        <SplitPanel
          header="服务器详情"
          position="side"
        >
          {selectedServer && (
            <ServerDetails server={selectedServer} />
          )}
        </SplitPanel>
      }
    />
  );
}

// 代码编辑器
<AppLayout
  content={
    <Container header="代码编辑">
      <CodeEditor
        language="javascript"
        value={code}
        onChange={setCode}
      />
    </Container>
  }
  splitPanel={
    <SplitPanel
      header="控制台输出"
      position="bottom"
      size={150}
    >
      <pre>{consoleOutput}</pre>
    </SplitPanel>
  }
/>
```

### 4.7 注意事项
- 确保分割面板内容有意义
- 避免在小屏幕上使用侧边面板
- 合理设置最小和最大尺寸
- 考虑用户的使用偏好设置

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 基础内容包装 | Container |
| 页面标题 | Header |
| 可选内容 | ExpandableSection |
| 主从内容 | SplitPanel |

### 最佳实践

```typescript
// ✅ 合理组合容器组件
<Container
  header={<Header variant="h2">服务器配置</Header>}
>
  <SpaceBetween size="l">
    <FormField label="基本设置">
      <Input />
    </FormField>
    
    <ExpandableSection headerText="高级设置">
      <FormField label="调试模式">
        <Checkbox />
      </FormField>
    </ExpandableSection>
  </SpaceBetween>
</Container>

// ✅ 使用分割面板显示详情
<AppLayout
  content={<MainContent />}
  splitPanel={
    <SplitPanel header="详情">
      <DetailContent />
    </SplitPanel>
  }
/>

// ✅ 保持标题层级的语义化
<Header variant="h1">页面标题</Header>
<Container header={<Header variant="h2">区域标题</Header>}>
  <Header variant="h3">子区域标题</Header>
</Container>
```

### 常见错误

```typescript
// ❌ 过度嵌套容器
<Container>
  <Container>
    <Container>
      <p>内容</p>
    </Container>
  </Container>
</Container>

// ✅ 合理使用容器
<Container header="主要内容">
  <p>内容</p>
</Container>

// ❌ 标题层级混乱
<Header variant="h3">主标题</Header>
<Header variant="h1">子标题</Header>

// ✅ 保持层级逻辑
<Header variant="h1">主标题</Header>
<Header variant="h2">子标题</Header>
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据可视化](./COMPONENTS_12_VISUALIZATION.md) | [下一模块：工具组件](./COMPONENTS_14_UTILITIES.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15