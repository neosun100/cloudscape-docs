# 模块 07: 表单容器组件

> **模块**: 表单容器组件  
> **组件数**: 3 个  
> **难度**: ⭐⭐⭐⭐ 较难  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

表单容器组件提供表单结构和布局，管理表单状态、验证和提交流程。

### 本模块包含的组件

1. **Form** - 表单容器
2. **FormField** - 表单字段包装器
3. **PromptInput** - 智能提示输入框

---

## 1. Form - 表单容器

### 1.1 组件概述
表单的根容器，提供统一的表单布局、验证和提交管理。

### 1.2 完整 API
```typescript
interface FormProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  errorText?: string;
  errorIconAriaLabel?: string;
  warningText?: string;
  warningIconAriaLabel?: string;
  variant?: 'full-page' | 'embedded';
  onSubmit?: (event: React.FormEvent) => void;
}
```

### 1.3 基础示例

#### 示例 1: 简单表单
```typescript
<Form
  header={<Header variant="h1">创建服务器</Header>}
  description="配置新的服务器实例"
  actions={
    <SpaceBetween direction="horizontal" size="xs">
      <Button variant="link">取消</Button>
      <Button variant="primary">创建</Button>
    </SpaceBetween>
  }
>
  <FormField label="服务器名称">
    <Input placeholder="输入服务器名称" />
  </FormField>
  <FormField label="实例类型">
    <Select
      options={[
        { label: 't3.micro', value: 't3.micro' },
        { label: 't3.small', value: 't3.small' }
      ]}
    />
  </FormField>
</Form>
```

#### 示例 2: 嵌入式表单
```typescript
<Form
  variant="embedded"
  header={<Header variant="h2">编辑配置</Header>}
  actions={
    <Button variant="primary">保存</Button>
  }
>
  <FormField label="端口">
    <Input type="number" value="8080" />
  </FormField>
</Form>
```

#### 示例 3: 带错误状态的表单
```typescript
<Form
  header={<Header variant="h1">用户注册</Header>}
  errorText="请修正以下错误后重试"
  errorIconAriaLabel="错误"
  actions={
    <Button variant="primary">注册</Button>
  }
>
  <FormField 
    label="邮箱" 
    errorText="邮箱格式不正确"
  >
    <Input value="invalid-email" />
  </FormField>
</Form>
```

### 1.4 进阶示例

#### 示例 1: 完整的表单管理
```typescript
function ServerCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    region: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = '服务器名称不能为空';
    if (!formData.type) newErrors.type = '请选择实例类型';
    if (!formData.region) newErrors.region = '请选择区域';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await createServer(formData);
      navigate('/servers');
    } catch (error) {
      setErrors({ submit: '创建失败，请重试' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      header={<Header variant="h1">创建服务器</Header>}
      description="配置新的服务器实例，所有字段都是必填的"
      errorText={errors.submit}
      onSubmit={handleSubmit}
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="link" disabled={loading}>
            取消
          </Button>
          <Button 
            variant="primary" 
            loading={loading}
            type="submit"
          >
            创建服务器
          </Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween size="l">
        <FormField 
          label="服务器名称"
          description="用于标识服务器的唯一名称"
          errorText={errors.name}
        >
          <Input
            value={formData.name}
            onChange={({ detail }) => 
              setFormData({ ...formData, name: detail.value })
            }
            placeholder="例如：web-server-01"
          />
        </FormField>

        <FormField 
          label="实例类型"
          description="选择适合您工作负载的实例类型"
          errorText={errors.type}
        >
          <Select
            selectedOption={formData.type ? { value: formData.type } : null}
            onChange={({ detail }) =>
              setFormData({ ...formData, type: detail.selectedOption.value })
            }
            options={[
              { label: 't3.micro - 1 vCPU, 1 GB RAM', value: 't3.micro' },
              { label: 't3.small - 2 vCPU, 2 GB RAM', value: 't3.small' },
              { label: 't3.medium - 2 vCPU, 4 GB RAM', value: 't3.medium' }
            ]}
            placeholder="选择实例类型"
          />
        </FormField>

        <FormField 
          label="区域"
          errorText={errors.region}
        >
          <RadioGroup
            value={formData.region}
            onChange={({ detail }) =>
              setFormData({ ...formData, region: detail.value })
            }
            items={[
              { value: 'us-east-1', label: '美国东部 (弗吉尼亚北部)' },
              { value: 'us-west-2', label: '美国西部 (俄勒冈)' },
              { value: 'ap-southeast-1', label: '亚太地区 (新加坡)' }
            ]}
          />
        </FormField>
      </SpaceBetween>
    </Form>
  );
}
```

#### 示例 2: 多步骤表单
```typescript
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    {
      title: '基本信息',
      content: (
        <SpaceBetween size="l">
          <FormField label="项目名称">
            <Input
              value={formData.projectName || ''}
              onChange={({ detail }) =>
                setFormData({ ...formData, projectName: detail.value })
              }
            />
          </FormField>
          <FormField label="描述">
            <Textarea
              value={formData.description || ''}
              onChange={({ detail }) =>
                setFormData({ ...formData, description: detail.value })
              }
            />
          </FormField>
        </SpaceBetween>
      )
    },
    {
      title: '配置',
      content: (
        <SpaceBetween size="l">
          <FormField label="环境">
            <Select
              selectedOption={formData.environment ? { value: formData.environment } : null}
              onChange={({ detail }) =>
                setFormData({ ...formData, environment: detail.selectedOption.value })
              }
              options={[
                { label: '开发', value: 'dev' },
                { label: '测试', value: 'test' },
                { label: '生产', value: 'prod' }
              ]}
            />
          </FormField>
        </SpaceBetween>
      )
    }
  ];

  return (
    <Form
      header={<Header variant="h1">{steps[currentStep].title}</Header>}
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {currentStep > 0 && (
            <Button 
              variant="normal"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              上一步
            </Button>
          )}
          <Button 
            variant="primary"
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {currentStep < steps.length - 1 ? '下一步' : '完成'}
          </Button>
        </SpaceBetween>
      }
    >
      {steps[currentStep].content}
    </Form>
  );
}
```

### 1.5 最佳实践

#### ✅ DO - 正确做法
```typescript
// 使用语义化的表单结构
<Form onSubmit={handleSubmit}>
  <SpaceBetween size="l">
    <FormField label="必填字段" constraintText="*">
      <Input required />
    </FormField>
  </SpaceBetween>
</Form>

// 提供清晰的错误反馈
<Form 
  errorText="表单包含错误，请检查并修正"
  errorIconAriaLabel="错误信息"
>

// 使用适当的表单变体
<Form variant="embedded"> {/* 用于对话框或侧边栏 */}
<Form variant="full-page"> {/* 用于独立页面 */}
```

#### ❌ DON'T - 错误做法
```typescript
// 不要忘记表单验证
<Form> {/* 缺少 onSubmit 和验证 */}

// 不要在表单内嵌套表单
<Form>
  <Form> {/* 错误：嵌套表单 */}
  </Form>
</Form>

// 不要忽略无障碍性
<Form errorText="错误"> {/* 缺少 errorIconAriaLabel */}
```

### 1.6 常见场景
- 用户注册/登录表单
- 资源创建/编辑表单
- 设置配置表单
- 多步骤向导表单
- 搜索过滤表单

### 1.7 注意事项
- 始终提供表单验证和错误处理
- 使用适当的表单变体（full-page vs embedded）
- 为错误和警告提供无障碍标签
- 考虑表单的提交状态和加载状态

---

## 2. FormField - 表单字段包装器

### 2.1 组件概述
为表单控件提供标签、描述、错误信息和约束文本的统一包装器。

### 2.2 完整 API
```typescript
interface FormFieldProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  constraintText?: React.ReactNode;
  errorText?: React.ReactNode;
  warningText?: React.ReactNode;
  info?: React.ReactNode;
  i18nStrings?: {
    errorIconAriaLabel?: string;
    warningIconAriaLabel?: string;
  };
  stretch?: boolean;
}
```

### 2.3 基础示例

#### 示例 1: 基本字段
```typescript
<FormField label="用户名">
  <Input placeholder="输入用户名" />
</FormField>
```

#### 示例 2: 带描述的字段
```typescript
<FormField 
  label="密码"
  description="密码必须包含至少8个字符，包括大小写字母和数字"
>
  <Input type="password" />
</FormField>
```

#### 示例 3: 带约束的字段
```typescript
<FormField 
  label="邮箱地址"
  constraintText="必填"
>
  <Input type="email" />
</FormField>
```

### 2.4 进阶示例

#### 示例 1: 完整的字段配置
```typescript
<FormField
  label="服务器配置"
  description="选择适合您应用的服务器配置"
  constraintText="必填 - 创建后无法更改"
  info={<Link href="/docs/server-types">了解更多配置选项</Link>}
  errorText={errors.serverType}
  warningText="高性能配置会产生额外费用"
  i18nStrings={{
    errorIconAriaLabel: "错误",
    warningIconAriaLabel: "警告"
  }}
>
  <Select
    selectedOption={selectedServerType}
    onChange={({ detail }) => setSelectedServerType(detail.selectedOption)}
    options={serverTypeOptions}
    placeholder="选择服务器类型"
  />
</FormField>
```

#### 示例 2: 动态验证字段
```typescript
function ValidatedFormField({ value, onChange, ...props }) {
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    // 实时验证
    if (value && value.length < 3) {
      setError('至少需要3个字符');
      setWarning('');
    } else if (value && value.length < 6) {
      setError('');
      setWarning('建议使用6个或更多字符');
    } else {
      setError('');
      setWarning('');
    }
  }, [value]);

  return (
    <FormField
      {...props}
      errorText={error}
      warningText={warning}
    >
      <Input
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormField>
  );
}
```

### 2.5 最佳实践

#### ✅ DO - 正确做法
```typescript
// 提供清晰的标签和描述
<FormField 
  label="API 密钥"
  description="用于访问 API 的安全密钥，请妥善保管"
  constraintText="必填"
>

// 使用适当的错误和警告
<FormField
  errorText="密钥格式不正确"
  warningText="密钥即将过期"
>

// 为复杂字段提供帮助信息
<FormField
  info={<Link>查看配置指南</Link>}
>
```

#### ❌ DON'T - 错误做法
```typescript
// 不要使用模糊的标签
<FormField label="输入"> {/* 太模糊 */}

// 不要忽略错误状态的无障碍性
<FormField errorText="错误"> {/* 缺少 errorIconAriaLabel */}

// 不要在 FormField 外使用表单控件
<Input /> {/* 应该包装在 FormField 中 */}
```

### 2.6 常见场景
- 所有表单输入控件的包装
- 复杂表单的字段组织
- 动态表单验证
- 多语言表单标签
- 条件显示的字段

### 2.7 注意事项
- 每个表单控件都应该包装在 FormField 中
- 提供有意义的标签和描述
- 使用 constraintText 标明必填字段
- 为错误和警告图标提供无障碍标签

---

## 3. PromptInput - 智能提示输入框

### 3.1 组件概述
带有智能提示功能的输入框，支持自动完成、建议和多种输入模式。

### 3.2 完整 API
```typescript
interface PromptInputProps {
  value: string;
  onChange: (event: { detail: { value: string } }) => void;
  onAction?: (event: { detail: { actionId: string } }) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  disableBrowserAutocorrect?: boolean;
  actionButtonIconName?: string;
  actionButtonAriaLabel?: string;
  maxRows?: number;
  minRows?: number;
  autoComplete?: boolean;
  spellcheck?: boolean;
  invalid?: boolean;
  warning?: boolean;
}
```

### 3.3 基础示例

#### 示例 1: 基本提示输入
```typescript
<PromptInput
  value={query}
  onChange={({ detail }) => setQuery(detail.value)}
  placeholder="输入您的问题..."
  actionButtonIconName="send"
  actionButtonAriaLabel="发送"
  onAction={() => handleSubmit()}
/>
```

#### 示例 2: 多行输入
```typescript
<PromptInput
  value={message}
  onChange={({ detail }) => setMessage(detail.value)}
  placeholder="输入详细描述..."
  minRows={3}
  maxRows={10}
  actionButtonIconName="add-plus"
  actionButtonAriaLabel="添加"
/>
```

#### 示例 3: 带验证的输入
```typescript
<PromptInput
  value={command}
  onChange={({ detail }) => setCommand(detail.value)}
  placeholder="输入命令..."
  invalid={!isValidCommand(command)}
  warning={hasWarning(command)}
  actionButtonIconName="play"
  actionButtonAriaLabel="执行"
/>
```

### 3.4 进阶示例

#### 示例 1: AI 聊天输入框
```typescript
function ChatInput() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('发送失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <FormField>
      <PromptInput
        value={message}
        onChange={({ detail }) => setMessage(detail.value)}
        onAction={handleSend}
        placeholder="输入消息... (Shift+Enter 换行)"
        actionButtonIconName={isLoading ? "loading" : "send"}
        actionButtonAriaLabel={isLoading ? "发送中..." : "发送消息"}
        disabled={isLoading}
        minRows={1}
        maxRows={8}
        autoFocus
        onKeyPress={handleKeyPress}
      />
    </FormField>
  );
}
```

#### 示例 2: 命令行输入框
```typescript
function CommandInput() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const executeCommand = async () => {
    if (!command.trim()) return;
    
    try {
      const result = await runCommand(command);
      setHistory(prev => [...prev, command]);
      setCommand('');
      setHistoryIndex(-1);
      onCommandResult(result);
    } catch (error) {
      onCommandError(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const isValidCommand = (cmd) => {
    const validCommands = ['ls', 'cd', 'pwd', 'mkdir', 'rm'];
    const firstWord = cmd.trim().split(' ')[0];
    return validCommands.includes(firstWord);
  };

  return (
    <FormField 
      label="命令行"
      description="输入系统命令，使用上下箭头键浏览历史"
    >
      <PromptInput
        value={command}
        onChange={({ detail }) => setCommand(detail.value)}
        onAction={executeCommand}
        placeholder="输入命令..."
        actionButtonIconName="play"
        actionButtonAriaLabel="执行命令"
        invalid={command && !isValidCommand(command)}
        disableBrowserAutocorrect
        spellcheck={false}
        onKeyDown={handleKeyDown}
      />
    </FormField>
  );
}
```

### 3.5 最佳实践

#### ✅ DO - 正确做法
```typescript
// 提供清晰的占位符文本
<PromptInput 
  placeholder="描述您遇到的问题..."
  actionButtonAriaLabel="提交问题"
/>

// 使用适当的行数限制
<PromptInput 
  minRows={2}
  maxRows={6}
/>

// 为操作按钮提供无障碍标签
<PromptInput
  actionButtonIconName="send"
  actionButtonAriaLabel="发送消息"
/>

// 处理键盘事件
<PromptInput
  onKeyPress={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    }
  }}
/>
```

#### ❌ DON'T - 错误做法
```typescript
// 不要忘记操作按钮的无障碍标签
<PromptInput actionButtonIconName="send" /> {/* 缺少 aria-label */}

// 不要设置过大的行数限制
<PromptInput maxRows={50} /> {/* 太大，影响用户体验 */}

// 不要在不需要时禁用拼写检查
<PromptInput spellcheck={false} /> {/* 对于普通文本输入应该启用 */}
```

### 3.6 常见场景
- AI 聊天机器人输入
- 命令行界面
- 代码编辑器
- 搜索查询输入
- 反馈和评论输入
- 多行文本编辑

### 3.7 注意事项
- 合理设置 minRows 和 maxRows 以平衡界面和功能
- 为操作按钮提供清晰的图标和无障碍标签
- 考虑键盘快捷键（如 Enter 提交，Shift+Enter 换行）
- 根据使用场景决定是否启用自动完成和拼写检查
- 处理长文本输入时的性能优化

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 表单容器 | Form |
| 字段包装 | FormField |
| 智能输入 | PromptInput |

### 最佳实践

```typescript
// ✅ 完整的表单结构
<Form
  header={<Header>创建资源</Header>}
  onSubmit={handleSubmit}
  actions={<Button variant="primary">创建</Button>}
>
  <SpaceBetween size="l">
    <FormField 
      label="名称" 
      constraintText="必填"
      errorText={errors.name}
    >
      <Input value={name} onChange={setName} />
    </FormField>
    
    <FormField label="描述">
      <PromptInput
        value={description}
        onChange={setDescription}
        placeholder="输入描述..."
        minRows={3}
      />
    </FormField>
  </SpaceBetween>
</Form>

// ✅ 表单验证和错误处理
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!name) newErrors.name = '名称不能为空';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：表单基础](./COMPONENTS_06_FORMS_BASIC.md) | [下一模块：数据展示](./COMPONENTS_08_DATA_DISPLAY.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24