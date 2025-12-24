# 模块 17: 其他组件

> **模块**: 其他组件  
> **组件数**: 4 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐ 实用  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

其他实用组件，提供步骤指示、列表展示、面板布局和无障碍支持等功能。

### 本模块包含的组件

1. **Steps** - 步骤指示器
2. **List** - 列表组件
3. **PanelLayout** - 面板布局
4. **LiveRegion** - 实时区域（无障碍）

---

## 1. Steps - 步骤指示器

### 1.1 组件概述
显示多步骤流程的进度，支持线性和非线性导航。

### 1.2 完整 API
```typescript
interface StepsProps {
  steps: Array<{
    title: string;
    info?: React.ReactNode;
    description?: string;
    errorText?: string;
    isOptional?: boolean;
  }>;
  activeStepIndex: number;
  onStepActivated?: (event: { detail: { stepIndex: number; } }) => void;
  variant?: 'default' | 'small';
  i18nStrings?: {
    stepNumberLabel?: (stepNumber: number) => string;
    collapsedStepsLabel?: (stepNumber: number, stepsCount: number) => string;
  };
}
```

### 1.3 基础示例
```typescript
<Steps
  steps={[
    { title: '选择模板' },
    { title: '配置参数' },
    { title: '确认创建' }
  ]}
  activeStepIndex={1}
/>
```

### 1.4 进阶示例
```typescript
function DeploymentSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: '环境准备',
      description: '检查部署环境和依赖',
      info: <Icon name="status-info" />
    },
    {
      title: '代码部署',
      description: '上传和部署应用代码',
      errorText: currentStep === 1 ? '部署失败，请检查配置' : undefined
    },
    {
      title: '服务启动',
      description: '启动应用服务',
      isOptional: true
    },
    {
      title: '健康检查',
      description: '验证服务运行状态'
    }
  ];

  return (
    <Container>
      <Steps
        steps={steps}
        activeStepIndex={currentStep}
        onStepActivated={({ detail }) => setCurrentStep(detail.stepIndex)}
        i18nStrings={{
          stepNumberLabel: (n) => `步骤 ${n}`,
          collapsedStepsLabel: (n, total) => `步骤 ${n}/${total}`
        }}
      />
      
      <Box margin={{ top: 'l' }}>
        <Button onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}>
          下一步
        </Button>
      </Box>
    </Container>
  );
}
```

### 1.5 最佳实践
- 步骤数量控制在 3-7 个之间
- 提供清晰的步骤描述
- 使用错误状态指示问题步骤
- 支持跳转到已完成的步骤

### 1.6 常见场景
- 向导流程进度显示
- 部署状态跟踪
- 表单填写进度
- 任务执行状态

### 1.7 注意事项
- 不要在步骤间频繁跳转
- 错误步骤需要明确的错误信息
- 可选步骤要有明确标识

---

## 2. List - 列表组件

### 2.1 组件概述
通用列表组件，支持多种布局和交互模式。

### 2.2 完整 API
```typescript
interface ListProps {
  items: Array<{
    id: string;
    content: React.ReactNode;
    action?: React.ReactNode;
    description?: React.ReactNode;
  }>;
  variant?: 'default' | 'container';
  renderItem?: (item: any, index: number) => React.ReactNode;
  empty?: React.ReactNode;
  header?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}
```

### 2.3 基础示例
```typescript
<List
  items={[
    {
      id: '1',
      content: '服务器 srv-001',
      description: '运行中 • 2 vCPU • 4GB RAM'
    },
    {
      id: '2', 
      content: '服务器 srv-002',
      description: '已停止 • 4 vCPU • 8GB RAM'
    }
  ]}
/>
```

### 2.4 进阶示例
```typescript
function ServerList() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverItems = servers.map(server => ({
    id: server.id,
    content: (
      <Box>
        <Box display="flex" alignItems="center">
          <StatusIndicator type={server.status === 'running' ? 'success' : 'stopped'}>
            {server.name}
          </StatusIndicator>
          <Badge color={server.environment === 'prod' ? 'red' : 'blue'}>
            {server.environment}
          </Badge>
        </Box>
      </Box>
    ),
    description: (
      <Box color="text-body-secondary">
        <Box display="flex" columnGap="l">
          <span>{server.instanceType}</span>
          <span>{server.region}</span>
          <span>创建于 {server.createdAt}</span>
        </Box>
      </Box>
    ),
    action: (
      <ButtonDropdown
        items={[
          { id: 'start', text: '启动', disabled: server.status === 'running' },
          { id: 'stop', text: '停止', disabled: server.status === 'stopped' },
          { id: 'restart', text: '重启' },
          { id: 'terminate', text: '终止' }
        ]}
        onItemClick={({ detail }) => handleServerAction(server.id, detail.id)}
      >
        操作
      </ButtonDropdown>
    )
  }));

  return (
    <List
      variant="container"
      header={
        <Header
          counter={`(${servers.length})`}
          actions={
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              创建服务器
            </Button>
          }
        >
          服务器列表
        </Header>
      }
      items={serverItems}
      loading={loading}
      loadingText="加载服务器列表..."
      empty={
        <Box textAlign="center" color="inherit">
          <b>暂无服务器</b>
          <Box variant="p" color="inherit">
            点击"创建服务器"开始使用
          </Box>
        </Box>
      }
    />
  );
}
```

### 2.5 最佳实践
- 使用一致的列表项结构
- 提供有意义的空状态
- 合理使用加载状态
- 操作按钮放在右侧

### 2.6 常见场景
- 资源列表展示
- 搜索结果显示
- 配置项管理
- 历史记录查看

### 2.7 注意事项
- 避免列表项过于复杂
- 长列表考虑分页或虚拟滚动
- 保持操作的一致性

---

## 3. PanelLayout - 面板布局

### 3.1 组件概述
灵活的面板布局组件，支持侧边栏和主内容区域的组合。

### 3.2 完整 API
```typescript
interface PanelLayoutProps {
  navigation?: React.ReactNode;
  navigationOpen?: boolean;
  navigationWidth?: number;
  onNavigationChange?: (event: { detail: { open: boolean; } }) => void;
  content: React.ReactNode;
  tools?: React.ReactNode;
  toolsOpen?: boolean;
  toolsWidth?: number;
  onToolsChange?: (event: { detail: { open: boolean; } }) => void;
  ariaLabels?: {
    navigation?: string;
    navigationClose?: string;
    content?: string;
    tools?: string;
    toolsClose?: string;
  };
}
```

### 3.3 基础示例
```typescript
<PanelLayout
  navigation={
    <SideNavigation
      items={[
        { type: 'link', text: '仪表盘', href: '/dashboard' },
        { type: 'link', text: '服务器', href: '/servers' }
      ]}
    />
  }
  content={
    <ContentLayout header={<Header>主要内容</Header>}>
      <Container>
        <p>这里是主要内容区域</p>
      </Container>
    </ContentLayout>
  }
/>
```

### 3.4 进阶示例
```typescript
function AdminPanel() {
  const [navOpen, setNavOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);

  return (
    <PanelLayout
      navigation={
        <SideNavigation
          header={{ text: '管理控制台', href: '/' }}
          items={[
            {
              type: 'section',
              text: '资源',
              items: [
                { type: 'link', text: '服务器', href: '/servers' },
                { type: 'link', text: '网络', href: '/network' },
                { type: 'link', text: '存储', href: '/storage' }
              ]
            },
            {
              type: 'section', 
              text: '监控',
              items: [
                { type: 'link', text: '指标', href: '/metrics' },
                { type: 'link', text: '日志', href: '/logs' },
                { type: 'link', text: '告警', href: '/alerts' }
              ]
            }
          ]}
        />
      }
      navigationOpen={navOpen}
      navigationWidth={280}
      onNavigationChange={({ detail }) => setNavOpen(detail.open)}
      
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button onClick={() => setToolsOpen(!toolsOpen)}>
                    {toolsOpen ? '隐藏' : '显示'}工具面板
                  </Button>
                  <Button variant="primary">创建资源</Button>
                </SpaceBetween>
              }
            >
              服务器管理
            </Header>
          }
        >
          <Table
            items={servers}
            columnDefinitions={columnDefs}
            onSelectionChange={({ detail }) => 
              setSelectedServer(detail.selectedItems[0])
            }
          />
        </ContentLayout>
      }
      
      tools={selectedServer && (
        <Container>
          <Header variant="h2">服务器详情</Header>
          <ColumnLayout columns={1} variant="text-grid">
            <div>
              <Box variant="awsui-key-label">名称</Box>
              <div>{selectedServer.name}</div>
            </div>
            <div>
              <Box variant="awsui-key-label">状态</Box>
              <StatusIndicator type={selectedServer.status === 'running' ? 'success' : 'stopped'}>
                {selectedServer.status}
              </StatusIndicator>
            </div>
            <div>
              <Box variant="awsui-key-label">实例类型</Box>
              <div>{selectedServer.instanceType}</div>
            </div>
          </ColumnLayout>
        </Container>
      )}
      toolsOpen={toolsOpen}
      toolsWidth={320}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      
      ariaLabels={{
        navigation: '主导航',
        navigationClose: '关闭导航',
        content: '主内容',
        tools: '工具面板',
        toolsClose: '关闭工具面板'
      }}
    />
  );
}
```

### 3.5 最佳实践
- 合理设置面板宽度
- 提供面板开关控制
- 响应式设计考虑
- 无障碍标签完整

### 3.6 常见场景
- 管理后台布局
- 详情页面设计
- 多面板应用
- 工具栏集成

### 3.7 注意事项
- 避免面板过窄或过宽
- 考虑移动端适配
- 保持布局的一致性

---

## 4. LiveRegion - 实时区域

### 4.1 组件概述
无障碍实时区域，用于向屏幕阅读器宣布动态内容变化。

### 4.2 完整 API
```typescript
interface LiveRegionProps {
  children?: React.ReactNode;
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}
```

### 4.3 基础示例
```typescript
<LiveRegion politeness="polite">
  操作已完成
</LiveRegion>
```

### 4.4 进阶示例
```typescript
function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [liveMessage, setLiveMessage] = useState('');

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // 向屏幕阅读器宣布
    setLiveMessage(`${type === 'error' ? '错误：' : ''}${message}`);
    
    // 清除实时消息
    setTimeout(() => setLiveMessage(''), 100);
    
    // 自动移除通知
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  return (
    <div>
      {/* 实时区域 - 对屏幕阅读器可见 */}
      <LiveRegion politeness="assertive">
        {liveMessage}
      </LiveRegion>
      
      {/* 可视化通知 */}
      <Box position="fixed" top="20px" right="20px" zIndex={1000}>
        <SpaceBetween size="s">
          {notifications.map(notification => (
            <Alert
              key={notification.id}
              type={notification.type}
              dismissible
              onDismiss={() => 
                setNotifications(prev => prev.filter(n => n.id !== notification.id))
              }
            >
              {notification.message}
            </Alert>
          ))}
        </SpaceBetween>
      </Box>
      
      {/* 触发通知的按钮 */}
      <SpaceBetween direction="horizontal" size="s">
        <Button onClick={() => addNotification('操作成功完成', 'success')}>
          成功通知
        </Button>
        <Button onClick={() => addNotification('发生了一个错误', 'error')}>
          错误通知
        </Button>
        <Button onClick={() => addNotification('这是一条信息', 'info')}>
          信息通知
        </Button>
      </SpaceBetween>
    </div>
  );
}

// 表单验证示例
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  const [liveMessage, setLiveMessage] = useState('');

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (!value.trim()) {
      newErrors[name] = '此字段为必填项';
      setLiveMessage(`${name}字段错误：此字段为必填项`);
    } else {
      delete newErrors[name];
      if (errors[name]) {
        setLiveMessage(`${name}字段验证通过`);
      }
    }
    
    setErrors(newErrors);
    setTimeout(() => setLiveMessage(''), 100);
  };

  return (
    <form>
      <LiveRegion politeness="assertive">
        {liveMessage}
      </LiveRegion>
      
      <FormField
        label="用户名"
        errorText={errors.username}
      >
        <Input
          onBlur={({ detail }) => validateField('username', detail.value)}
        />
      </FormField>
      
      <FormField
        label="邮箱"
        errorText={errors.email}
      >
        <Input
          type="email"
          onBlur={({ detail }) => validateField('email', detail.value)}
        />
      </FormField>
    </form>
  );
}
```

### 4.5 最佳实践
- 使用适当的 politeness 级别
- 避免过于频繁的更新
- 提供有意义的消息内容
- 配合可视化反馈使用

### 4.6 常见场景
- 表单验证反馈
- 操作结果通知
- 加载状态更新
- 错误消息宣布

### 4.7 注意事项
- 不要滥用 assertive 模式
- 消息要简洁明了
- 避免重复或无意义的更新
- 测试屏幕阅读器兼容性

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 流程进度 | Steps |
| 数据列表 | List |
| 复杂布局 | PanelLayout |
| 无障碍通知 | LiveRegion |

### 最佳实践

```typescript
// ✅ 组合使用提升用户体验
<PanelLayout
  content={
    <div>
      <Steps steps={wizardSteps} activeStepIndex={currentStep} />
      <List items={dataItems} loading={loading} />
    </div>
  }
/>

// ✅ 无障碍支持
<LiveRegion politeness="polite">
  {statusMessage}
</LiveRegion>

// ✅ 响应式设计
<PanelLayout
  navigationWidth={isMobile ? 240 : 280}
  toolsWidth={isMobile ? 280 : 320}
/>
```

### 性能优化

```typescript
// ✅ 列表虚拟化
const VirtualizedList = memo(({ items }) => (
  <List
    items={items.slice(0, 100)} // 分页加载
    renderItem={memo(ListItem)}
  />
));

// ✅ 面板懒加载
<PanelLayout
  tools={toolsOpen && <LazyToolsPanel />}
/>
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：高级组件](./COMPONENTS_16_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15