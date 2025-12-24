# 模块 10: 基础数据展示组件

> **模块**: 基础数据展示组件  
> **组件数**: 6 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

基础数据展示组件用于显示各种类型的数据和状态信息，是构建用户界面的基础元素。

### 本模块包含的组件

1. **KeyValuePairs** - 键值对展示
2. **StatusIndicator** - 状态指示器
3. **Badge** - 徽章标签
4. **ProgressBar** - 进度条
5. **Spinner** - 加载动画
6. **Icon** - 图标

---

## 1. KeyValuePairs - 键值对展示

### 1.1 组件概述
以键值对形式展示结构化数据，常用于详情页面和配置信息展示。

### 1.2 完整 API
```typescript
interface KeyValuePairsProps {
  items: Array<{
    label: string;
    value: React.ReactNode;
    info?: React.ReactNode;
    type?: 'group';
  }>;
  columns?: number;
  variant?: 'key-value' | 'inline';
}
```

### 1.3 基础示例
```typescript
<KeyValuePairs
  items={[
    { label: '服务器名称', value: 'web-server-01' },
    { label: 'IP 地址', value: '192.168.1.100' },
    { label: '状态', value: <StatusIndicator type="success">运行中</StatusIndicator> },
    { label: '创建时间', value: '2024-01-15 10:30:00' }
  ]}
/>
```

### 1.4 进阶示例
```typescript
// 多列布局
<KeyValuePairs
  columns={2}
  items={[
    { label: '实例 ID', value: 'i-1234567890abcdef0' },
    { label: '实例类型', value: 't3.medium' },
    { label: '可用区', value: 'us-east-1a' },
    { label: 'VPC ID', value: 'vpc-12345678' },
    { 
      label: '安全组', 
      value: (
        <div>
          <Badge color="blue">sg-web</Badge>
          <Badge color="green">sg-db</Badge>
        </div>
      )
    },
    { 
      label: '标签',
      value: (
        <div>
          <Badge>Environment: Production</Badge>
          <Badge>Team: Backend</Badge>
        </div>
      )
    }
  ]}
/>

// 分组展示
<KeyValuePairs
  items={[
    { type: 'group', label: '基本信息' },
    { label: '名称', value: 'my-database' },
    { label: '引擎', value: 'MySQL 8.0' },
    { type: 'group', label: '网络配置' },
    { label: '端点', value: 'db.example.com:3306' },
    { label: 'VPC', value: 'vpc-12345678' }
  ]}
/>

// 内联模式
<KeyValuePairs
  variant="inline"
  items={[
    { label: 'CPU', value: '2 vCPU' },
    { label: '内存', value: '4 GB' },
    { label: '存储', value: '20 GB SSD' }
  ]}
/>
```

### 1.5 最佳实践
- 使用分组来组织相关信息
- 对于复杂值使用 React 组件
- 合理设置列数以适应屏幕宽度
- 为重要信息添加 info 提示

### 1.6 常见场景
- 资源详情页面
- 配置信息展示
- 用户资料展示
- 系统信息面板

### 1.7 注意事项
- 避免在单个项目中放置过多内容
- 确保标签简洁明了
- 考虑移动端的显示效果

---

## 2. StatusIndicator - 状态指示器

### 2.1 组件概述
显示状态信息的视觉指示器，通过颜色和图标传达不同的状态。

### 2.2 完整 API
```typescript
interface StatusIndicatorProps {
  type?: 'success' | 'error' | 'warning' | 'info' | 'stopped' | 'pending' | 'in-progress' | 'loading';
  children?: React.ReactNode;
  iconAriaLabel?: string;
  colorOverride?: 'blue' | 'grey' | 'green' | 'red';
}
```

### 2.3 基础示例
```typescript
<StatusIndicator type="success">运行中</StatusIndicator>
<StatusIndicator type="error">已停止</StatusIndicator>
<StatusIndicator type="warning">警告</StatusIndicator>
<StatusIndicator type="info">信息</StatusIndicator>
<StatusIndicator type="pending">等待中</StatusIndicator>
<StatusIndicator type="in-progress">处理中</StatusIndicator>
<StatusIndicator type="loading">加载中</StatusIndicator>
```

### 2.4 进阶示例
```typescript
// 服务器状态监控
function ServerStatus({ server }) {
  const getStatusType = (status) => {
    switch (status) {
      case 'running': return 'success';
      case 'stopped': return 'stopped';
      case 'starting': return 'in-progress';
      case 'error': return 'error';
      case 'maintenance': return 'warning';
      default: return 'info';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      running: '运行中',
      stopped: '已停止',
      starting: '启动中',
      error: '错误',
      maintenance: '维护中'
    };
    return statusMap[status] || '未知';
  };

  return (
    <StatusIndicator type={getStatusType(server.status)}>
      {getStatusText(server.status)}
    </StatusIndicator>
  );
}

// 自定义颜色
<StatusIndicator colorOverride="blue">自定义状态</StatusIndicator>

// 在表格中使用
<Table
  items={servers}
  columnDefinitions={[
    {
      id: 'name',
      header: '名称',
      cell: item => item.name
    },
    {
      id: 'status',
      header: '状态',
      cell: item => (
        <StatusIndicator type={getStatusType(item.status)}>
          {getStatusText(item.status)}
        </StatusIndicator>
      )
    }
  ]}
/>
```

### 2.5 最佳实践
- 保持状态文本简洁
- 使用标准的状态类型
- 在列表和表格中保持一致性
- 提供清晰的状态含义

### 2.6 常见场景
- 服务状态显示
- 任务执行状态
- 健康检查结果
- 连接状态指示

### 2.7 注意事项
- 避免过度使用自定义颜色
- 确保状态含义对用户清晰
- 考虑色盲用户的体验

---

## 3. Badge - 徽章标签

### 3.1 组件概述
小型标签组件，用于标记、分类和状态展示。

### 3.2 完整 API
```typescript
interface BadgeProps {
  color?: 'blue' | 'grey' | 'green' | 'red' | 'severity-critical' | 'severity-high' | 'severity-medium' | 'severity-low' | 'severity-neutral';
  children: React.ReactNode;
}
```

### 3.3 基础示例
```typescript
<Badge>默认</Badge>
<Badge color="blue">信息</Badge>
<Badge color="green">成功</Badge>
<Badge color="red">错误</Badge>
<Badge color="grey">禁用</Badge>
```

### 3.4 进阶示例
```typescript
// 标签管理
function TagList({ tags }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Badge key={tag.key} color={tag.color}>
          {tag.key}: {tag.value}
        </Badge>
      ))}
    </div>
  );
}

// 严重程度指示
function SeverityBadge({ severity }) {
  const severityConfig = {
    critical: { color: 'severity-critical', text: '严重' },
    high: { color: 'severity-high', text: '高' },
    medium: { color: 'severity-medium', text: '中' },
    low: { color: 'severity-low', text: '低' },
    info: { color: 'severity-neutral', text: '信息' }
  };

  const config = severityConfig[severity];
  return <Badge color={config.color}>{config.text}</Badge>;
}

// 在卡片中使用
<Container>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h3>API 服务</h3>
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge color="green">v2.1.0</Badge>
      <Badge color="blue">生产环境</Badge>
    </div>
  </div>
  <p>RESTful API 服务</p>
</Container>

// 计数徽章
function NotificationBadge({ count }) {
  if (count === 0) return null;
  
  return (
    <Badge color="red">
      {count > 99 ? '99+' : count}
    </Badge>
  );
}
```

### 3.5 最佳实践
- 使用合适的颜色表达含义
- 保持文本简短
- 避免在单个区域使用过多徽章
- 为严重程度使用专门的颜色

### 3.6 常见场景
- 资源标签
- 版本标识
- 状态标记
- 分类标签
- 计数显示

### 3.7 注意事项
- 不要用作按钮
- 避免颜色过载
- 确保文本可读性

---

## 4. ProgressBar - 进度条

### 4.1 组件概述
显示任务完成进度的可视化组件。

### 4.2 完整 API
```typescript
interface ProgressBarProps {
  value?: number;
  additionalInfo?: string;
  description?: string;
  label?: string;
  resultText?: string;
  status?: 'in-progress' | 'success' | 'error';
  variant?: 'standalone' | 'key-value';
}
```

### 4.3 基础示例
```typescript
<ProgressBar
  value={65}
  label="上传进度"
  description="正在上传文件..."
  additionalInfo="65%"
/>
```

### 4.4 进阶示例
```typescript
// 文件上传进度
function FileUploadProgress({ file, progress, status }) {
  return (
    <ProgressBar
      value={progress}
      status={status}
      label={file.name}
      description={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
      additionalInfo={`${progress}%`}
      resultText={status === 'success' ? '上传完成' : status === 'error' ? '上传失败' : undefined}
    />
  );
}

// 系统资源使用率
function ResourceUsage({ resource }) {
  const getStatus = (value) => {
    if (value >= 90) return 'error';
    if (value >= 75) return 'warning';
    return 'in-progress';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ProgressBar
        value={resource.cpu}
        status={getStatus(resource.cpu)}
        label="CPU 使用率"
        additionalInfo={`${resource.cpu}%`}
      />
      <ProgressBar
        value={resource.memory}
        status={getStatus(resource.memory)}
        label="内存使用率"
        additionalInfo={`${resource.memory}%`}
      />
      <ProgressBar
        value={resource.disk}
        status={getStatus(resource.disk)}
        label="磁盘使用率"
        additionalInfo={`${resource.disk}%`}
      />
    </div>
  );
}

// 键值对模式
<KeyValuePairs
  items={[
    {
      label: '存储使用情况',
      value: (
        <ProgressBar
          variant="key-value"
          value={78}
          additionalInfo="156 GB / 200 GB"
        />
      )
    }
  ]}
/>

// 任务进度跟踪
function TaskProgress({ tasks }) {
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <ProgressBar
      value={progress}
      label="任务完成进度"
      description={`已完成 ${completedTasks} / ${tasks.length} 个任务`}
      additionalInfo={`${Math.round(progress)}%`}
      status={progress === 100 ? 'success' : 'in-progress'}
      resultText={progress === 100 ? '所有任务已完成' : undefined}
    />
  );
}
```

### 4.5 最佳实践
- 提供清晰的标签和描述
- 显示具体的进度信息
- 根据进度值设置合适的状态
- 在完成时显示结果文本

### 4.6 常见场景
- 文件上传/下载
- 数据处理进度
- 系统资源监控
- 任务完成度
- 配额使用情况

### 4.7 注意事项
- 确保进度值准确
- 避免进度条跳跃
- 提供有意义的描述信息

---

## 5. Spinner - 加载动画

### 5.1 组件概述
显示加载状态的动画组件，用于表示正在进行的操作。

### 5.2 完整 API
```typescript
interface SpinnerProps {
  size?: 'normal' | 'big';
  variant?: 'normal' | 'disabled' | 'inverted';
}
```

### 5.3 基础示例
```typescript
<Spinner />
<Spinner size="big" />
<Spinner variant="disabled" />
<Spinner variant="inverted" />
```

### 5.4 进阶示例
```typescript
// 页面加载状态
function PageLoader({ loading, children }) {
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spinner size="big" />
          <div style={{ marginTop: '16px' }}>加载中...</div>
        </div>
      </div>
    );
  }
  return children;
}

// 按钮加载状态
function LoadingButton({ loading, onClick, children }) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      iconName={loading ? undefined : 'refresh'}
    >
      {loading && <Spinner />}
      {loading ? '处理中...' : children}
    </Button>
  );
}

// 表格加载状态
function DataTable({ data, loading }) {
  if (loading) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '40px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <Spinner />
            <div style={{ marginTop: '8px' }}>加载数据中...</div>
          </div>
        </div>
      </Container>
    );
  }

  return <Table items={data} columnDefinitions={columns} />;
}

// 内联加载
function InlineLoader({ text = '加载中...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Spinner />
      <span>{text}</span>
    </div>
  );
}
```

### 5.5 最佳实践
- 为长时间操作提供加载指示
- 在合适的位置显示加载状态
- 配合文本说明加载内容
- 避免过度使用动画

### 5.6 常见场景
- 页面初始加载
- 数据获取
- 表单提交
- 文件处理
- API 调用

### 5.7 注意事项
- 不要在快速操作中使用
- 确保加载状态及时更新
- 考虑用户体验和性能

---

## 6. Icon - 图标

### 6.1 组件概述
显示系统图标的组件，支持 Cloudscape 设计系统的所有内置图标。

### 6.2 完整 API
```typescript
interface IconProps {
  name: string;
  size?: 'inherit' | 'normal' | 'medium' | 'big';
  variant?: 'normal' | 'disabled' | 'error' | 'warning' | 'success' | 'link' | 'inverted' | 'subtle';
  url?: string;
  alt?: string;
  svg?: React.ReactNode;
}
```

### 6.3 基础示例
```typescript
<Icon name="settings" />
<Icon name="user-profile" size="big" />
<Icon name="status-positive" variant="success" />
<Icon name="status-negative" variant="error" />
<Icon name="external" variant="link" />
```

### 6.4 进阶示例
```typescript
// 导航图标
function NavigationItem({ icon, text, href }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name={icon} />
      <a href={href}>{text}</a>
    </div>
  );
}

// 状态图标
function StatusIcon({ status }) {
  const iconConfig = {
    success: { name: 'status-positive', variant: 'success' },
    error: { name: 'status-negative', variant: 'error' },
    warning: { name: 'status-warning', variant: 'warning' },
    info: { name: 'status-info', variant: 'normal' }
  };

  const config = iconConfig[status];
  return <Icon name={config.name} variant={config.variant} />;
}

// 自定义 SVG 图标
<Icon
  svg={
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
    </svg>
  }
  alt="自定义图标"
/>

// 外部图标
<Icon
  url="/custom-icon.svg"
  alt="外部图标"
  size="medium"
/>

// 按钮中的图标
<Button iconName="add-plus">添加</Button>
<Button iconName="download" variant="icon" ariaLabel="下载" />

// 表单字段图标
<FormField
  label="搜索"
  stretch
>
  <div style={{ position: 'relative' }}>
    <Input placeholder="输入搜索关键词..." />
    <div style={{ 
      position: 'absolute', 
      right: '8px', 
      top: '50%', 
      transform: 'translateY(-50%)' 
    }}>
      <Icon name="search" variant="subtle" />
    </div>
  </div>
</FormField>
```

### 6.5 最佳实践
- 使用语义化的图标名称
- 保持图标大小一致
- 为图标提供合适的变体
- 在按钮和链接中合理使用图标

### 6.6 常见场景
- 导航菜单
- 按钮装饰
- 状态指示
- 操作提示
- 品牌标识

### 6.7 注意事项
- 确保图标含义清晰
- 避免过度装饰
- 考虑无障碍访问
- 保持设计一致性

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 结构化数据展示 | KeyValuePairs |
| 状态信息显示 | StatusIndicator |
| 标签和分类 | Badge |
| 进度展示 | ProgressBar |
| 加载状态 | Spinner |
| 视觉装饰 | Icon |

### 最佳实践

```typescript
// ✅ 组合使用展示组件
<Container>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <h3>服务器详情</h3>
    <Badge color="green">运行中</Badge>
  </div>
  
  <KeyValuePairs
    items={[
      { 
        label: '状态', 
        value: <StatusIndicator type="success">正常</StatusIndicator> 
      },
      { 
        label: 'CPU 使用率', 
        value: <ProgressBar variant="key-value" value={45} additionalInfo="45%" /> 
      }
    ]}
  />
</Container>

// ✅ 合理使用加载状态
function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spinner size="big" />
        <div style={{ marginTop: '16px' }}>加载数据中...</div>
      </div>
    );
  }

  return <DataDisplay data={data} />;
}

// ✅ 一致的状态表示
const statusConfig = {
  running: { indicator: 'success', badge: 'green', text: '运行中' },
  stopped: { indicator: 'stopped', badge: 'grey', text: '已停止' },
  error: { indicator: 'error', badge: 'red', text: '错误' }
};
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：高级表单](./COMPONENTS_09_FORMS_ADVANCED.md) | [下一模块：高级数据展示](./COMPONENTS_11_DATA_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15