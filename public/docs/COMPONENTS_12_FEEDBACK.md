# 模块 12: 反馈组件

> **模块**: 反馈组件  
> **组件数**: 6 个  
> **难度**: ⭐⭐⭐ 中等  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

反馈组件用于向用户传达系统状态、操作结果和重要信息，是用户体验的关键组成部分。

### 本模块包含的组件

1. **Alert** - 警告提示框
2. **Flashbar** - 闪现消息栏
3. **Modal** - 模态对话框
4. **Popover** - 弹出提示
5. **HelpPanel** - 帮助面板
6. **Drawer** - 抽屉面板

---

## 1. Alert - 警告提示框

### 1.1 组件概述
用于显示重要信息、警告或错误消息的静态提示框。

### 1.2 完整 API
```typescript
interface AlertProps {
  type?: 'error' | 'warning' | 'success' | 'info';
  visible?: boolean;
  dismissible?: boolean;
  dismissAriaLabel?: string;
  statusIconAriaLabel?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  buttonText?: string;
  onDismiss?: () => void;
  onButtonClick?: () => void;
}
```

### 1.3 基础示例
```typescript
<Alert type="success" header="操作成功">
  服务器已成功创建并启动。
</Alert>

<Alert type="error" dismissible onDismiss={() => setVisible(false)}>
  连接失败，请检查网络设置。
</Alert>
```

### 1.4 进阶示例
```typescript
// 带操作按钮的警告
<Alert
  type="warning"
  header="存储空间不足"
  action={
    <Button onClick={() => navigate('/storage')}>
      管理存储
    </Button>
  }
>
  当前存储使用率已达 85%，建议及时清理或扩容。
</Alert>

// 动态显示的错误提示
function ErrorAlert({ error, onRetry }) {
  if (!error) return null;
  
  return (
    <Alert
      type="error"
      dismissible
      header="操作失败"
      action={<Button onClick={onRetry}>重试</Button>}
      onDismiss={() => setError(null)}
    >
      {error.message}
    </Alert>
  );
}
```

### 1.5 最佳实践
- 使用合适的类型：error（错误）、warning（警告）、success（成功）、info（信息）
- 提供清晰的标题和描述
- 对于可恢复的错误，提供操作按钮
- 避免同时显示多个相同类型的 Alert

### 1.6 常见场景
- 表单验证错误提示
- 操作成功确认
- 系统状态警告
- 重要信息通知

### 1.7 注意事项
- Alert 是静态组件，不会自动消失
- 使用 dismissible 属性让用户可以关闭
- 避免在页面中堆积过多 Alert

---

## 2. Flashbar - 闪现消息栏

### 2.1 组件概述
用于显示临时消息的动态通知栏，支持多条消息和自动消失。

### 2.2 完整 API
```typescript
interface FlashbarProps {
  items: Array<{
    id?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    header?: string;
    content?: React.ReactNode;
    dismissible?: boolean;
    dismissLabel?: string;
    statusIconAriaLabel?: string;
    action?: React.ReactNode;
    buttonText?: string;
    onDismiss?: () => void;
    onButtonClick?: () => void;
  }>;
  stackItems?: boolean;
}
```

### 2.3 基础示例
```typescript
<Flashbar
  items={[
    {
      type: 'success',
      header: '保存成功',
      content: '配置已更新',
      dismissible: true,
      id: 'success-1'
    }
  ]}
/>
```

### 2.4 进阶示例
```typescript
// 完整的消息管理系统
function useFlashMessages() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { ...message, id }]);
    
    // 自动移除成功消息
    if (message.type === 'success') {
      setTimeout(() => removeMessage(id), 5000);
    }
  };

  const removeMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return { messages, addMessage, removeMessage };
}

function App() {
  const { messages, addMessage, removeMessage } = useFlashMessages();

  const handleSave = async () => {
    try {
      await saveData();
      addMessage({
        type: 'success',
        header: '保存成功',
        content: '数据已保存到服务器'
      });
    } catch (error) {
      addMessage({
        type: 'error',
        header: '保存失败',
        content: error.message,
        action: <Button onClick={handleSave}>重试</Button>
      });
    }
  };

  return (
    <>
      <Flashbar
        items={messages.map(msg => ({
          ...msg,
          dismissible: true,
          onDismiss: () => removeMessage(msg.id)
        }))}
      />
      <Button onClick={handleSave}>保存</Button>
    </>
  );
}
```

### 2.5 最佳实践
- 成功消息自动消失，错误消息需手动关闭
- 限制同时显示的消息数量
- 为每条消息提供唯一 ID
- 使用 stackItems 属性控制消息堆叠

### 2.6 常见场景
- API 操作结果通知
- 表单提交反馈
- 系统状态更新
- 批量操作进度

### 2.7 注意事项
- 避免消息过多影响用户体验
- 重要错误消息不应自动消失
- 考虑消息的优先级和分类

---

## 3. Modal - 模态对话框

### 3.1 组件概述
模态对话框用于显示重要内容或收集用户输入，会阻止用户与背景内容交互。

### 3.2 完整 API
```typescript
interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'max';
  closeAriaLabel?: string;
  disableContentPaddings?: boolean;
}
```

### 3.3 基础示例
```typescript
<Modal
  visible={showModal}
  onDismiss={() => setShowModal(false)}
  header="确认删除"
  footer={
    <Box float="right">
      <SpaceBetween direction="horizontal" size="xs">
        <Button variant="link" onClick={() => setShowModal(false)}>
          取消
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          删除
        </Button>
      </SpaceBetween>
    </Box>
  }
>
  确定要删除服务器 "srv-001" 吗？此操作不可撤销。
</Modal>
```

### 3.4 进阶示例
```typescript
// 表单模态框
function CreateServerModal({ visible, onDismiss, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 't2.micro'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
      onDismiss();
    } catch (error) {
      // 处理错误
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="创建服务器"
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>
              取消
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              创建
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="l">
        <FormField label="服务器名称">
          <Input
            value={formData.name}
            onChange={({ detail }) =>
              setFormData({ ...formData, name: detail.value })
            }
          />
        </FormField>
        <FormField label="实例类型">
          <Select
            selectedOption={{ value: formData.type }}
            onChange={({ detail }) =>
              setFormData({ ...formData, type: detail.selectedOption.value })
            }
            options={[
              { value: 't2.micro', label: 't2.micro' },
              { value: 't2.small', label: 't2.small' }
            ]}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
}

// 多步骤模态框
function MultiStepModal({ visible, onDismiss }) {
  const [step, setStep] = useState(1);
  
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header={`配置向导 - 步骤 ${step}/3`}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDismiss}>
              取消
            </Button>
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)}>
                上一步
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => step < 3 ? setStep(step + 1) : onDismiss()}
            >
              {step < 3 ? '下一步' : '完成'}
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {step === 1 && <div>步骤 1 内容</div>}
      {step === 2 && <div>步骤 2 内容</div>}
      {step === 3 && <div>步骤 3 内容</div>}
    </Modal>
  );
}
```

### 3.5 最佳实践
- 提供清晰的标题和操作按钮
- 使用合适的尺寸（small/medium/large）
- 重要操作需要确认对话框
- 支持 ESC 键关闭

### 3.6 常见场景
- 确认删除操作
- 表单输入对话框
- 详细信息展示
- 多步骤配置向导

### 3.7 注意事项
- 避免嵌套模态框
- 确保模态框内容可滚动
- 提供明确的关闭方式
- 考虑移动端体验

---

## 4. Popover - 弹出提示

### 4.1 组件概述
轻量级的弹出提示，用于显示补充信息或简单的交互内容。

### 4.2 完整 API
```typescript
interface PopoverProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
  dismissButton?: boolean;
  dismissAriaLabel?: string;
  fixedWidth?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'small' | 'medium' | 'large';
  triggerType?: 'click' | 'hover';
  renderWithPortal?: boolean;
}
```

### 4.3 基础示例
```typescript
<Popover
  content="这是一个帮助提示，解释了该字段的用途。"
  position="top"
  triggerType="hover"
>
  <Button iconName="status-info" variant="icon" />
</Popover>
```

### 4.4 进阶示例
```typescript
// 复杂内容的弹出框
<Popover
  header="服务器状态"
  content={
    <SpaceBetween size="s">
      <div>
        <Box variant="awsui-key-label">CPU 使用率</Box>
        <ProgressBar value={75} />
      </div>
      <div>
        <Box variant="awsui-key-label">内存使用率</Box>
        <ProgressBar value={60} />
      </div>
      <Button size="small" onClick={() => navigate('/monitoring')}>
        查看详情
      </Button>
    </SpaceBetween>
  }
  size="large"
  dismissButton
>
  <StatusIndicator type="success">运行中</StatusIndicator>
</Popover>

// 表单字段帮助
function FormFieldWithHelp({ label, helpText, children }) {
  return (
    <FormField
      label={
        <SpaceBetween direction="horizontal" size="xs">
          {label}
          <Popover
            content={helpText}
            position="top"
            triggerType="click"
            dismissButton
          >
            <Button iconName="status-info" variant="icon" />
          </Popover>
        </SpaceBetween>
      }
    >
      {children}
    </FormField>
  );
}
```

### 4.5 最佳实践
- 内容简洁明了，避免过长文本
- 使用合适的触发方式（hover/click）
- 重要信息使用 click 触发
- 提供关闭按钮（dismissButton）

### 4.6 常见场景
- 字段帮助说明
- 状态详情展示
- 快速操作菜单
- 补充信息提示

### 4.7 注意事项
- 避免在 Popover 中放置复杂交互
- 考虑移动端的触发方式
- 确保内容在视窗内完整显示
- 不要嵌套使用 Popover

---

## 5. HelpPanel - 帮助面板

### 5.1 组件概述
侧边帮助面板，提供上下文相关的帮助信息和文档链接。

### 5.2 完整 API
```typescript
interface HelpPanelProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}
```

### 5.3 基础示例
```typescript
<HelpPanel header="关于服务器">
  <p>服务器是运行应用程序的虚拟机实例。</p>
  <h4>相关链接</h4>
  <ul>
    <li><Link href="/docs/servers">服务器文档</Link></li>
    <li><Link href="/docs/pricing">价格说明</Link></li>
  </ul>
</HelpPanel>
```

### 5.4 进阶示例
```typescript
// 动态帮助内容
function ContextualHelpPanel({ currentPage }) {
  const [helpContent, setHelpContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHelpContent(currentPage).then(content => {
      setHelpContent(content);
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <HelpPanel
      header={helpContent?.title}
      loading={loading}
      loadingText="加载帮助内容..."
      footer={
        <Link href={`/docs/${currentPage}`} external>
          查看完整文档
        </Link>
      }
    >
      {helpContent?.content}
    </HelpPanel>
  );
}

// 分步骤帮助
function StepByStepHelp() {
  return (
    <HelpPanel header="创建服务器">
      <SpaceBetween size="l">
        <div>
          <h4>步骤 1: 选择实例类型</h4>
          <p>根据应用需求选择合适的 CPU 和内存配置。</p>
        </div>
        <div>
          <h4>步骤 2: 配置网络</h4>
          <p>设置 VPC、子网和安全组规则。</p>
        </div>
        <div>
          <h4>步骤 3: 存储配置</h4>
          <p>选择存储类型和大小。</p>
        </div>
      </SpaceBetween>
    </HelpPanel>
  );
}
```

### 5.5 最佳实践
- 提供与当前页面相关的帮助内容
- 包含相关文档链接
- 使用清晰的标题和结构
- 支持搜索和导航

### 5.6 常见场景
- 页面功能说明
- 操作步骤指导
- 相关文档链接
- 常见问题解答

### 5.7 注意事项
- 内容要与当前上下文相关
- 避免信息过载
- 定期更新帮助内容
- 考虑多语言支持

---

## 6. Drawer - 抽屉面板

### 6.1 组件概述
从页面边缘滑出的面板，用于显示详细信息或辅助功能。

### 6.2 完整 API
```typescript
interface DrawerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}
```

### 6.3 基础示例
```typescript
<Drawer header="服务器详情">
  <SpaceBetween size="l">
    <KeyValuePairs
      items={[
        { label: '实例 ID', value: 'i-1234567890abcdef0' },
        { label: '状态', value: '运行中' },
        { label: '实例类型', value: 't2.micro' }
      ]}
    />
  </SpaceBetween>
</Drawer>
```

### 6.4 进阶示例
```typescript
// 详情抽屉
function ServerDetailsDrawer({ serverId }) {
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serverId) {
      fetchServerDetails(serverId).then(data => {
        setServer(data);
        setLoading(false);
      });
    }
  }, [serverId]);

  return (
    <Drawer
      header={server ? `服务器: ${server.name}` : '服务器详情'}
      loading={loading}
      loadingText="加载服务器信息..."
    >
      {server && (
        <SpaceBetween size="l">
          <Container header="基本信息">
            <KeyValuePairs
              items={[
                { label: '实例 ID', value: server.id },
                { label: '状态', value: server.status },
                { label: '实例类型', value: server.instanceType },
                { label: '可用区', value: server.availabilityZone }
              ]}
            />
          </Container>
          
          <Container header="网络信息">
            <KeyValuePairs
              items={[
                { label: '私有 IP', value: server.privateIp },
                { label: '公有 IP', value: server.publicIp },
                { label: 'VPC ID', value: server.vpcId }
              ]}
            />
          </Container>

          <Container header="监控">
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">CPU 使用率</Box>
                <ProgressBar value={server.cpuUsage} />
              </div>
              <div>
                <Box variant="awsui-key-label">内存使用率</Box>
                <ProgressBar value={server.memoryUsage} />
              </div>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      )}
    </Drawer>
  );
}

// 配置抽屉
function ConfigurationDrawer({ onSave }) {
  const [config, setConfig] = useState({
    autoScaling: false,
    monitoring: true,
    backupEnabled: false
  });

  return (
    <Drawer
      header="配置设置"
      footer={
        <Box float="right">
          <Button variant="primary" onClick={() => onSave(config)}>
            保存配置
          </Button>
        </Box>
      }
    >
      <SpaceBetween size="l">
        <FormField>
          <Checkbox
            checked={config.autoScaling}
            onChange={({ detail }) =>
              setConfig({ ...config, autoScaling: detail.checked })
            }
          >
            启用自动扩缩容
          </Checkbox>
        </FormField>
        
        <FormField>
          <Checkbox
            checked={config.monitoring}
            onChange={({ detail }) =>
              setConfig({ ...config, monitoring: detail.checked })
            }
          >
            启用详细监控
          </Checkbox>
        </FormField>
        
        <FormField>
          <Checkbox
            checked={config.backupEnabled}
            onChange={({ detail }) =>
              setConfig({ ...config, backupEnabled: detail.checked })
            }
          >
            启用自动备份
          </Checkbox>
        </FormField>
      </SpaceBetween>
    </Drawer>
  );
}
```

### 6.5 最佳实践
- 用于显示详细信息或辅助功能
- 保持内容结构清晰
- 支持加载状态显示
- 提供适当的操作按钮

### 6.6 常见场景
- 资源详情展示
- 配置面板
- 帮助文档
- 辅助工具面板

### 6.7 注意事项
- 内容要有良好的组织结构
- 考虑加载性能
- 支持键盘导航
- 适配不同屏幕尺寸

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 静态提示信息 | Alert |
| 动态消息通知 | Flashbar |
| 重要操作确认 | Modal |
| 补充信息提示 | Popover |
| 上下文帮助 | HelpPanel |
| 详情信息展示 | Drawer |

### 最佳实践

```typescript
// ✅ 统一的消息管理
const useNotifications = () => {
  const [messages, setMessages] = useState([]);
  
  const notify = (type, message) => {
    setMessages(prev => [...prev, { id: Date.now(), type, message }]);
  };
  
  return { messages, notify };
};

// ✅ 确认对话框模式
const useConfirmDialog = () => {
  const [dialog, setDialog] = useState(null);
  
  const confirm = (message, onConfirm) => {
    setDialog({ message, onConfirm });
  };
  
  return { dialog, confirm };
};

// ✅ 帮助内容管理
const HelpProvider = ({ children }) => {
  const [helpContent, setHelpContent] = useState(null);
  
  return (
    <AppLayout
      tools={helpContent && <HelpPanel>{helpContent}</HelpPanel>}
      content={children}
    />
  );
};
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据展示](./COMPONENTS_11_DATA_DISPLAY.md) | [下一模块：高级组件](./COMPONENTS_13_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15