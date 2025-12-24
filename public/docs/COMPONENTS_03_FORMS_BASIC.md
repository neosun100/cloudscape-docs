# 模块 03: 表单基础组件

> **模块**: 表单基础组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

表单基础组件是构建用户输入界面的核心元素，涵盖文本输入、选择和自动建议等常见交互模式。

### 本模块包含的组件

1. **Input** - 文本输入框
2. **Textarea** - 多行文本输入
3. **Select** - 下拉选择器
4. **Multiselect** - 多选选择器
5. **Autosuggest** - 自动建议输入

---

## 1. Input - 文本输入框

### 1.1 组件概述
单行文本输入组件，支持多种输入类型和验证状态。

### 1.2 完整 API
```typescript
interface InputProps {
  value: string;
  onChange: (event: { detail: { value: string } }) => void;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  autoComplete?: boolean;
  autoFocus?: boolean;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  step?: number;
  onBlur?: (event: { detail: { value: string } }) => void;
  onFocus?: (event: { detail: { value: string } }) => void;
  onKeyDown?: (event: CustomEvent) => void;
  onKeyUp?: (event: CustomEvent) => void;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  controlId?: string;
  name?: string;
}
```

### 1.3 基础示例

#### 示例 1: 基本文本输入
```typescript
function BasicInput() {
  const [value, setValue] = useState('');
  
  return (
    <FormField label="用户名" description="请输入您的用户名">
      <Input
        value={value}
        onChange={({ detail }) => setValue(detail.value)}
        placeholder="输入用户名"
      />
    </FormField>
  );
}
```

#### 示例 2: 密码输入
```typescript
function PasswordInput() {
  const [password, setPassword] = useState('');
  
  return (
    <FormField label="密码" constraintText="至少8个字符">
      <Input
        type="password"
        value={password}
        onChange={({ detail }) => setPassword(detail.value)}
        placeholder="输入密码"
      />
    </FormField>
  );
}
```

#### 示例 3: 数字输入
```typescript
function NumberInput() {
  const [port, setPort] = useState('');
  
  return (
    <FormField label="端口号" description="1-65535之间的数字">
      <Input
        type="number"
        inputMode="numeric"
        value={port}
        onChange={({ detail }) => setPort(detail.value)}
        placeholder="8080"
      />
    </FormField>
  );
}
```

### 1.4 进阶示例

#### 示例 1: 带验证的输入
```typescript
function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError('邮箱不能为空');
    } else if (!emailRegex.test(value)) {
      setError('请输入有效的邮箱地址');
    } else {
      setError('');
    }
  };
  
  return (
    <FormField 
      label="邮箱地址" 
      errorText={error}
      description="用于接收通知"
    >
      <Input
        type="email"
        value={email}
        onChange={({ detail }) => {
          setEmail(detail.value);
          validateEmail(detail.value);
        }}
        onBlur={({ detail }) => validateEmail(detail.value)}
        invalid={!!error}
        placeholder="user@example.com"
      />
    </FormField>
  );
}
```

#### 示例 2: 搜索输入框
```typescript
function SearchInput() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      // 执行搜索逻辑
      await searchAPI(searchTerm);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <FormField label="搜索服务器">
      <Input
        type="search"
        value={query}
        onChange={({ detail }) => setQuery(detail.value)}
        onKeyDown={(event) => {
          if (event.detail.key === 'Enter') {
            handleSearch(query);
          }
        }}
        placeholder="输入服务器名称或IP"
        disabled={isSearching}
      />
    </FormField>
  );
}
```

### 1.5 最佳实践

#### ✅ DO - 推荐做法
```typescript
// 使用合适的输入类型
<Input type="email" />  // 邮箱
<Input type="tel" />    // 电话
<Input type="url" />    // 网址

// 提供清晰的标签和描述
<FormField 
  label="API密钥" 
  description="从控制台获取的32位密钥"
  constraintText="必填项"
>
  <Input value={apiKey} onChange={setApiKey} />
</FormField>

// 实时验证用户输入
<Input
  value={value}
  onChange={handleChange}
  onBlur={handleValidation}
  invalid={hasError}
/>
```

#### ❌ DON'T - 避免做法
```typescript
// 不要使用模糊的占位符
<Input placeholder="输入内容" />  // ❌ 太模糊

// 不要忽略无障碍属性
<Input />  // ❌ 缺少标签

// 不要在onChange中执行重操作
<Input onChange={() => heavyOperation()} />  // ❌ 性能问题
```

### 1.6 常见场景
- **用户注册/登录**: 用户名、密码、邮箱输入
- **配置表单**: 服务器配置、API设置
- **搜索功能**: 全局搜索、筛选输入
- **数据录入**: 表格编辑、批量导入

### 1.7 注意事项
- 使用正确的`type`属性以获得最佳的移动端体验
- 对敏感信息使用`autoComplete="off"`
- 长表单中使用`autoFocus`要谨慎，避免影响用户体验
- 数字输入时结合`inputMode`属性优化移动端键盘

---

## 2. Textarea - 多行文本输入

### 2.1 组件概述
多行文本输入组件，适用于长文本内容的输入和编辑。

### 2.2 完整 API
```typescript
interface TextareaProps {
  value: string;
  onChange: (event: { detail: { value: string } }) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  autoFocus?: boolean;
  rows?: number;
  wrap?: 'soft' | 'hard';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  onBlur?: (event: { detail: { value: string } }) => void;
  onFocus?: (event: { detail: { value: string } }) => void;
  onKeyDown?: (event: CustomEvent) => void;
  onKeyUp?: (event: CustomEvent) => void;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  controlId?: string;
  name?: string;
}
```

### 2.3 基础示例

#### 示例 1: 基本多行输入
```typescript
function BasicTextarea() {
  const [description, setDescription] = useState('');
  
  return (
    <FormField label="项目描述" description="详细描述您的项目">
      <Textarea
        value={description}
        onChange={({ detail }) => setDescription(detail.value)}
        placeholder="输入项目描述..."
        rows={4}
      />
    </FormField>
  );
}
```

#### 示例 2: 评论输入框
```typescript
function CommentBox() {
  const [comment, setComment] = useState('');
  const maxLength = 500;
  
  return (
    <FormField 
      label="添加评论"
      constraintText={`${comment.length}/${maxLength} 字符`}
    >
      <Textarea
        value={comment}
        onChange={({ detail }) => {
          if (detail.value.length <= maxLength) {
            setComment(detail.value);
          }
        }}
        placeholder="分享您的想法..."
        rows={3}
      />
    </FormField>
  );
}
```

#### 示例 3: 配置文件编辑
```typescript
function ConfigEditor() {
  const [config, setConfig] = useState('');
  
  return (
    <FormField 
      label="配置文件" 
      description="JSON格式的配置内容"
    >
      <Textarea
        value={config}
        onChange={({ detail }) => setConfig(detail.value)}
        placeholder='{\n  "key": "value"\n}'
        rows={8}
        resize="vertical"
      />
    </FormField>
  );
}
```

### 2.4 进阶示例

#### 示例 1: 自动调整高度
```typescript
function AutoResizeTextarea() {
  const [content, setContent] = useState('');
  
  return (
    <FormField label="自适应文本框">
      <Textarea
        value={content}
        onChange={({ detail }) => setContent(detail.value)}
        placeholder="输入内容，高度会自动调整..."
        rows={2}
      />
    </FormField>
  );
}
```

#### 示例 2: 带验证的代码编辑器
```typescript
function CodeEditor() {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const validateJSON = (value: string) => {
    if (!value.trim()) {
      setIsValid(true);
      return;
    }
    
    try {
      JSON.parse(value);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };
  
  return (
    <FormField 
      label="JSON配置"
      errorText={!isValid ? 'JSON格式不正确' : undefined}
    >
      <Textarea
        value={code}
        onChange={({ detail }) => {
          setCode(detail.value);
          validateJSON(detail.value);
        }}
        invalid={!isValid}
        placeholder="输入有效的JSON..."
        rows={10}
        resize="both"
      />
    </FormField>
  );
}
```

### 2.5 最佳实践

#### ✅ DO - 推荐做法
```typescript
// 设置合适的行数
<Textarea rows={4} />  // 短文本
<Textarea rows={8} />  // 长文本

// 提供字符计数
<FormField constraintText={`${text.length}/500 字符`}>
  <Textarea value={text} onChange={setText} />
</FormField>

// 允许垂直调整大小
<Textarea resize="vertical" />
```

#### ❌ DON'T - 避免做法
```typescript
// 不要设置过小的行数
<Textarea rows={1} />  // ❌ 太小

// 不要禁用所有调整大小
<Textarea resize="none" />  // ❌ 用户体验差

// 不要忽略长文本的处理
<Textarea />  // ❌ 没有限制可能导致性能问题
```

### 2.6 常见场景
- **内容创作**: 文章编辑、评论发布
- **配置管理**: JSON/YAML配置编辑
- **反馈收集**: 用户反馈、问题描述
- **代码输入**: 脚本编辑、SQL查询

### 2.7 注意事项
- 长文本输入时考虑性能优化，使用防抖处理
- 提供明确的字符限制和计数显示
- 考虑添加自动保存功能防止数据丢失
- 移动端使用时注意键盘遮挡问题

---

## 3. Select - 下拉选择器

### 3.1 组件概述
单选下拉选择器，提供从预定义选项中选择一个值的功能。

### 3.2 完整 API
```typescript
interface SelectProps {
  selectedOption: Option | null;
  onChange: (event: { detail: { selectedOption: Option } }) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  warning?: boolean;
  autoFocus?: boolean;
  expandToViewport?: boolean;
  filteringType?: 'auto' | 'manual' | 'none';
  filteringPlaceholder?: string;
  filteringAriaLabel?: string;
  statusType?: 'loading' | 'error' | 'finished';
  loadingText?: string;
  errorText?: string;
  recoveryText?: string;
  finishedText?: string;
  empty?: string;
  onLoadItems?: (event: { detail: { filteringText: string; firstPage: boolean; samePage: boolean; } }) => void;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  controlId?: string;
  name?: string;
}

interface Option {
  label?: string;
  value?: string;
  description?: string;
  disabled?: boolean;
  labelTag?: string;
  tags?: string[];
  filteringTags?: string[];
  __customIcon?: React.ReactNode;
}
```

### 3.3 基础示例

#### 示例 1: 基本选择器
```typescript
function BasicSelect() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const regions = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' }
  ];
  
  return (
    <FormField label="选择地区" description="选择服务器所在地区">
      <Select
        selectedOption={selectedRegion}
        onChange={({ detail }) => setSelectedRegion(detail.selectedOption)}
        options={regions}
        placeholder="请选择地区"
      />
    </FormField>
  );
}
```

#### 示例 2: 带描述的选择器
```typescript
function InstanceTypeSelect() {
  const [instanceType, setInstanceType] = useState(null);
  
  const instanceTypes = [
    {
      label: 't3.micro',
      value: 't3.micro',
      description: '1 vCPU, 1 GB RAM - 适合轻量级应用'
    },
    {
      label: 't3.small',
      value: 't3.small',
      description: '2 vCPU, 2 GB RAM - 适合小型应用'
    },
    {
      label: 'm5.large',
      value: 'm5.large',
      description: '2 vCPU, 8 GB RAM - 适合生产环境'
    }
  ];
  
  return (
    <FormField label="实例类型" description="选择合适的实例规格">
      <Select
        selectedOption={instanceType}
        onChange={({ detail }) => setInstanceType(detail.selectedOption)}
        options={instanceTypes}
        placeholder="选择实例类型"
      />
    </FormField>
  );
}
```

#### 示例 3: 带标签的选择器
```typescript
function StatusSelect() {
  const [status, setStatus] = useState(null);
  
  const statusOptions = [
    {
      label: '运行中',
      value: 'running',
      labelTag: '正常',
      tags: ['active', 'healthy']
    },
    {
      label: '已停止',
      value: 'stopped',
      labelTag: '停止',
      tags: ['inactive']
    },
    {
      label: '维护中',
      value: 'maintenance',
      labelTag: '维护',
      tags: ['maintenance', 'unavailable']
    }
  ];
  
  return (
    <FormField label="服务器状态">
      <Select
        selectedOption={status}
        onChange={({ detail }) => setStatus(detail.selectedOption)}
        options={statusOptions}
        placeholder="选择状态"
      />
    </FormField>
  );
}
```

### 3.4 进阶示例

#### 示例 1: 带搜索的选择器
```typescript
function SearchableSelect() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('finished');
  
  const loadUsers = async (filteringText: string) => {
    setStatus('loading');
    try {
      const response = await fetch(`/api/users?search=${filteringText}`);
      const data = await response.json();
      setUsers(data.map(user => ({
        label: user.name,
        value: user.id,
        description: user.email
      })));
      setStatus('finished');
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <FormField label="选择用户">
      <Select
        selectedOption={selectedUser}
        onChange={({ detail }) => setSelectedUser(detail.selectedOption)}
        options={users}
        placeholder="搜索用户"
        filteringType="manual"
        filteringPlaceholder="输入用户名搜索"
        statusType={status}
        loadingText="搜索中..."
        errorText="搜索失败"
        empty="未找到用户"
        onLoadItems={({ detail }) => loadUsers(detail.filteringText)}
      />
    </FormField>
  );
}
```

#### 示例 2: 分组选择器
```typescript
function GroupedSelect() {
  const [selectedService, setSelectedService] = useState(null);
  
  const services = [
    {
      label: 'EC2 实例',
      options: [
        { label: 't3.micro', value: 'ec2-t3-micro' },
        { label: 't3.small', value: 'ec2-t3-small' }
      ]
    },
    {
      label: 'RDS 数据库',
      options: [
        { label: 'MySQL 8.0', value: 'rds-mysql' },
        { label: 'PostgreSQL 13', value: 'rds-postgres' }
      ]
    }
  ];
  
  // 扁平化选项并添加分组信息
  const flatOptions = services.flatMap(group =>
    group.options.map(option => ({
      ...option,
      labelTag: group.label
    }))
  );
  
  return (
    <FormField label="选择服务">
      <Select
        selectedOption={selectedService}
        onChange={({ detail }) => setSelectedService(detail.selectedOption)}
        options={flatOptions}
        placeholder="选择AWS服务"
        filteringType="auto"
      />
    </FormField>
  );
}
```

### 3.5 最佳实践

#### ✅ DO - 推荐做法
```typescript
// 提供清晰的标签和描述
<Select
  options={[{
    label: 't3.micro',
    value: 't3.micro',
    description: '1 vCPU, 1 GB RAM'
  }]}
/>

// 使用合适的占位符
<Select placeholder="请选择地区" />

// 长列表启用搜索
<Select filteringType="auto" />
```

#### ❌ DON'T - 避免做法
```typescript
// 不要使用过长的选项文本
<Select options={[{
  label: '这是一个非常非常长的选项文本...'  // ❌
}]} />

// 不要忘记处理空状态
<Select options={[]} />  // ❌ 应该显示空状态

// 不要在选项过多时禁用搜索
<Select options={manyOptions} filteringType="none" />  // ❌
```

### 3.6 常见场景
- **地区选择**: 服务器地区、时区选择
- **类型选择**: 实例类型、服务类型
- **状态筛选**: 订单状态、任务状态
- **用户选择**: 分配任务、权限管理

### 3.7 注意事项
- 选项超过10个时建议启用搜索功能
- 使用`description`提供额外信息帮助用户选择
- 异步加载数据时正确处理加载和错误状态
- 移动端考虑使用原生选择器以获得更好体验

---

## 4. Multiselect - 多选选择器

### 4.1 组件概述
多选下拉选择器，允许用户从预定义选项中选择多个值。

### 4.2 完整 API
```typescript
interface MultiselectProps {
  selectedOptions: Option[];
  onChange: (event: { detail: { selectedOptions: Option[] } }) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  warning?: boolean;
  autoFocus?: boolean;
  expandToViewport?: boolean;
  filteringType?: 'auto' | 'manual' | 'none';
  filteringPlaceholder?: string;
  filteringAriaLabel?: string;
  statusType?: 'loading' | 'error' | 'finished';
  loadingText?: string;
  errorText?: string;
  recoveryText?: string;
  finishedText?: string;
  empty?: string;
  onLoadItems?: (event: { detail: { filteringText: string; firstPage: boolean; samePage: boolean; } }) => void;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  controlId?: string;
  name?: string;
  deselectAriaLabel?: (option: Option) => string;
  keepOpen?: boolean;
  tokenLimit?: number;
}
```

### 4.3 基础示例

#### 示例 1: 基本多选
```typescript
function BasicMultiselect() {
  const [selectedTags, setSelectedTags] = useState([]);
  
  const tags = [
    { label: '前端', value: 'frontend' },
    { label: '后端', value: 'backend' },
    { label: '数据库', value: 'database' },
    { label: '运维', value: 'devops' },
    { label: '测试', value: 'testing' }
  ];
  
  return (
    <FormField label="技能标签" description="选择您的技能领域">
      <Multiselect
        selectedOptions={selectedTags}
        onChange={({ detail }) => setSelectedTags(detail.selectedOptions)}
        options={tags}
        placeholder="选择技能标签"
      />
    </FormField>
  );
}
```

#### 示例 2: 权限选择
```typescript
function PermissionSelect() {
  const [permissions, setPermissions] = useState([]);
  
  const permissionOptions = [
    {
      label: '读取',
      value: 'read',
      description: '查看资源内容'
    },
    {
      label: '写入',
      value: 'write',
      description: '修改资源内容'
    },
    {
      label: '删除',
      value: 'delete',
      description: '删除资源'
    },
    {
      label: '管理',
      value: 'admin',
      description: '完全控制权限'
    }
  ];
  
  return (
    <FormField label="用户权限" description="选择用户可执行的操作">
      <Multiselect
        selectedOptions={permissions}
        onChange={({ detail }) => setPermissions(detail.selectedOptions)}
        options={permissionOptions}
        placeholder="选择权限"
        tokenLimit={3}
      />
    </FormField>
  );
}
```

#### 示例 3: 服务器标签
```typescript
function ServerTags() {
  const [serverTags, setServerTags] = useState([]);
  
  const tagOptions = [
    { label: 'production', value: 'prod', labelTag: '环境' },
    { label: 'staging', value: 'staging', labelTag: '环境' },
    { label: 'web-server', value: 'web', labelTag: '类型' },
    { label: 'database', value: 'db', labelTag: '类型' },
    { label: 'high-cpu', value: 'cpu', labelTag: '规格' },
    { label: 'high-memory', value: 'memory', labelTag: '规格' }
  ];
  
  return (
    <FormField label="服务器标签" description="为服务器添加分类标签">
      <Multiselect
        selectedOptions={serverTags}
        onChange={({ detail }) => setServerTags(detail.selectedOptions)}
        options={tagOptions}
        placeholder="添加标签"
        filteringType="auto"
        keepOpen={true}
      />
    </FormField>
  );
}
```

### 4.4 进阶示例

#### 示例 1: 动态加载选项
```typescript
function DynamicMultiselect() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('finished');
  
  const loadUsers = async (filteringText: string) => {
    if (filteringText.length < 2) return;
    
    setStatus('loading');
    try {
      const response = await fetch(`/api/users?search=${filteringText}`);
      const data = await response.json();
      setUsers(data.map(user => ({
        label: user.name,
        value: user.id,
        description: user.email,
        tags: [user.department]
      })));
      setStatus('finished');
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <FormField label="项目成员" description="搜索并添加项目成员">
      <Multiselect
        selectedOptions={selectedUsers}
        onChange={({ detail }) => setSelectedUsers(detail.selectedOptions)}
        options={users}
        placeholder="搜索用户"
        filteringType="manual"
        filteringPlaceholder="输入姓名或邮箱"
        statusType={status}
        loadingText="搜索中..."
        errorText="搜索失败，请重试"
        empty="未找到匹配的用户"
        onLoadItems={({ detail }) => loadUsers(detail.filteringText)}
        deselectAriaLabel={(option) => `移除 ${option.label}`}
      />
    </FormField>
  );
}
```

#### 示例 2: 带验证的多选
```typescript
function ValidatedMultiselect() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');
  
  const services = [
    { label: 'EC2', value: 'ec2' },
    { label: 'S3', value: 's3' },
    { label: 'RDS', value: 'rds' },
    { label: 'Lambda', value: 'lambda' },
    { label: 'CloudFront', value: 'cloudfront' }
  ];
  
  const validateSelection = (options: Option[]) => {
    if (options.length === 0) {
      setError('至少选择一个服务');
    } else if (options.length > 3) {
      setError('最多只能选择3个服务');
    } else {
      setError('');
    }
  };
  
  const handleChange = ({ detail }: { detail: { selectedOptions: Option[] } }) => {
    setSelectedServices(detail.selectedOptions);
    validateSelection(detail.selectedOptions);
  };
  
  return (
    <FormField 
      label="AWS服务" 
      description="选择要使用的AWS服务"
      errorText={error}
      constraintText="最多选择3个服务"
    >
      <Multiselect
        selectedOptions={selectedServices}
        onChange={handleChange}
        options={services}
        placeholder="选择AWS服务"
        invalid={!!error}
        tokenLimit={3}
      />
    </FormField>
  );
}
```

### 4.5 最佳实践

#### ✅ DO - 推荐做法
```typescript
// 设置合理的token限制
<Multiselect tokenLimit={5} />

// 提供取消选择的无障碍标签
<Multiselect
  deselectAriaLabel={(option) => `移除 ${option.label}`}
/>

// 长列表启用搜索
<Multiselect filteringType="auto" />

// 验证选择数量
const validateSelection = (options) => {
  if (options.length > maxLimit) {
    setError(`最多选择${maxLimit}项`);
  }
};
```

#### ❌ DON'T - 避免做法
```typescript
// 不要设置过低的token限制
<Multiselect tokenLimit={1} />  // ❌ 应该用Select

// 不要忽略选择数量验证
<Multiselect />  // ❌ 没有限制可能导致性能问题

// 不要在必须选择时没有默认值
<Multiselect required />  // ❌ 应该有默认选中项
```

### 4.6 常见场景
- **标签管理**: 文章标签、产品分类
- **权限分配**: 用户权限、角色管理
- **成员选择**: 项目成员、团队分配
- **功能配置**: 启用功能、服务选择

### 4.7 注意事项
- 选中项过多时使用`tokenLimit`控制显示数量
- 提供清晰的取消选择交互和无障碍支持
- 异步搜索时注意防抖处理避免频繁请求
- 考虑选择数量限制和相应的用户提示

---

## 5. Autosuggest - 自动建议输入

### 5.1 组件概述
自动建议输入组件，在用户输入时提供实时建议，支持自由输入和选择建议。

### 5.2 完整 API
```typescript
interface AutosuggestProps {
  value: string;
  onChange: (event: { detail: { value: string } }) => void;
  options: Option[];
  onSelect?: (event: { detail: { value: string; selectedOption: Option } }) => void;
  onLoadItems?: (event: { detail: { filteringText: string; firstPage: boolean; samePage: boolean; } }) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  autoFocus?: boolean;
  expandToViewport?: boolean;
  enteredTextLabel?: (value: string) => string;
  statusType?: 'loading' | 'error' | 'finished';
  loadingText?: string;
  errorText?: string;
  recoveryText?: string;
  finishedText?: string;
  empty?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  controlId?: string;
  name?: string;
}
```

### 5.3 基础示例

#### 示例 1: 基本自动建议
```typescript
function BasicAutosuggest() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  
  const cities = [
    '北京', '上海', '广州', '深圳', '杭州', 
    '南京', '武汉', '成都', '西安', '重庆'
  ];
  
  useEffect(() => {
    if (value.length > 0) {
      const filtered = cities
        .filter(city => city.includes(value))
        .map(city => ({ label: city, value: city }));
      setOptions(filtered);
    } else {
      setOptions([]);
    }
  }, [value]);
  
  return (
    <FormField label="城市" description="输入城市名称">
      <Autosuggest
        value={value}
        onChange={({ detail }) => setValue(detail.value)}
        options={options}
        placeholder="输入城市名称"
        enteredTextLabel={(value) => `使用 "${value}"`}
      />
    </FormField>
  );
}
```

#### 示例 2: 邮箱域名建议
```typescript
function EmailAutosuggest() {
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const commonDomains = [
    '@gmail.com', '@qq.com', '@163.com', 
    '@126.com', '@sina.com', '@hotmail.com'
  ];
  
  useEffect(() => {
    if (email.includes('@')) {
      const [username, domain] = email.split('@');
      if (domain.length > 0) {
        const filtered = commonDomains
          .filter(d => d.includes(domain))
          .map(d => ({
            label: username + d,
            value: username + d
          }));
        setSuggestions(filtered);
      }
    } else if (email.length > 0) {
      const emailSuggestions = commonDomains.map(domain => ({
        label: email + domain,
        value: email + domain
      }));
      setSuggestions(emailSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [email]);
  
  return (
    <FormField label="邮箱地址" description="输入您的邮箱">
      <Autosuggest
        value={email}
        onChange={({ detail }) => setEmail(detail.value)}
        onSelect={({ detail }) => setEmail(detail.value)}
        options={suggestions}
        placeholder="输入邮箱地址"
      />
    </FormField>
  );
}
```

#### 示例 3: 标签输入
```typescript
function TagAutosuggest() {
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  const predefinedTags = [
    'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Java', 'Go', 'Rust'
  ];
  
  useEffect(() => {
    if (tagInput.length > 0) {
      const filtered = predefinedTags
        .filter(tag => 
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !selectedTags.includes(tag)
        )
        .map(tag => ({ label: tag, value: tag }));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [tagInput, selectedTags]);
  
  const handleSelect = ({ detail }) => {
    setSelectedTags([...selectedTags, detail.value]);
    setTagInput('');
  };
  
  return (
    <div>
      <FormField label="技术标签" description="输入或选择技术标签">
        <Autosuggest
          value={tagInput}
          onChange={({ detail }) => setTagInput(detail.value)}
          onSelect={handleSelect}
          options={suggestions}
          placeholder="输入技术名称"
          enteredTextLabel={(value) => `添加 "${value}"`}
        />
      </FormField>
      
      {selectedTags.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          {selectedTags.map(tag => (
            <span key={tag} style={{ 
              display: 'inline-block', 
              margin: '2px',
              padding: '4px 8px',
              background: '#e3f2fd',
              borderRadius: '4px'
            }}>
              {tag}
              <button onClick={() => 
                setSelectedTags(selectedTags.filter(t => t !== tag))
              }>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 5.4 进阶示例

#### 示例 1: 异步搜索建议
```typescript
function AsyncAutosuggest() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState('finished');
  
  const searchAPI = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }
    
    setStatus('loading');
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setSuggestions(data.map(item => ({
        label: item.title,
        value: item.id,
        description: item.description
      })));
      setStatus('finished');
    } catch (error) {
      setStatus('error');
    }
  };
  
  // 防抖处理
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAPI(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <FormField label="搜索内容" description="输入关键词搜索">
      <Autosuggest
        value={query}
        onChange={({ detail }) => setQuery(detail.value)}
        options={suggestions}
        statusType={status}
        loadingText="搜索中..."
        errorText="搜索失败"
        empty="未找到相关内容"
        placeholder="输入搜索关键词"
      />
    </FormField>
  );
}
```

#### 示例 2: 智能命令输入
```typescript
function CommandAutosuggest() {
  const [command, setCommand] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const commands = [
    { 
      label: 'create server', 
      value: 'create server',
      description: '创建新的服务器实例'
    },
    { 
      label: 'list servers', 
      value: 'list servers',
      description: '列出所有服务器'
    },
    { 
      label: 'delete server', 
      value: 'delete server',
      description: '删除指定服务器'
    },
    { 
      label: 'restart service', 
      value: 'restart service',
      description: '重启指定服务'
    }
  ];
  
  useEffect(() => {
    if (command.length > 0) {
      const filtered = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(command.toLowerCase()) ||
        cmd.description.includes(command)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(commands.slice(0, 5)); // 显示常用命令
    }
  }, [command]);
  
  const executeCommand = (cmd: string) => {
    console.log('执行命令:', cmd);
    setCommand('');
  };
  
  return (
    <FormField label="命令行" description="输入命令或选择预设命令">
      <Autosuggest
        value={command}
        onChange={({ detail }) => setCommand(detail.value)}
        onSelect={({ detail }) => executeCommand(detail.value)}
        options={suggestions}
        placeholder="输入命令..."
        enteredTextLabel={(value) => `执行 "${value}"`}
      />
    </FormField>
  );
}
```

### 5.5 最佳实践

#### ✅ DO - 推荐做法
```typescript
// 提供自定义输入选项
<Autosuggest
  enteredTextLabel={(value) => `使用 "${value}"`}
/>

// 异步搜索使用防抖
const debouncedSearch = useCallback(
  debounce((term) => searchAPI(term), 300),
  []
);

// 显示加载和错误状态
<Autosuggest
  statusType={status}
  loadingText="搜索中..."
  errorText="搜索失败"
/>
```

#### ❌ DON'T - 避免做法
```typescript
// 不要在每次输入时立即搜索
onChange={() => searchAPI(value)}  // ❌ 没有防抖

// 不要忽略空状态处理
<Autosuggest options={[]} />  // ❌ 应该显示提示

// 不要使用过长的建议文本
{ label: '这是一个非常长的建议...' }  // ❌
```

### 5.6 常见场景
- **搜索输入**: 全局搜索、智能搜索
- **地址输入**: 地址自动补全、邮编建议
- **标签输入**: 动态标签、分类选择
- **命令输入**: CLI界面、快捷操作

### 5.7 注意事项
- 异步搜索必须使用防抖避免频繁请求
- 提供`enteredTextLabel`支持自由输入
- 建议列表不宜过长，控制在10项以内
- 移动端注意键盘和建议列表的交互体验

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 单行文本输入 | Input |
| 多行文本输入 | Textarea |
| 单选下拉 | Select |
| 多选下拉 | Multiselect |
| 智能建议输入 | Autosuggest |

### 最佳实践

```typescript
// ✅ 统一的表单验证
const [errors, setErrors] = useState({});

const validateField = (name: string, value: any) => {
  // 验证逻辑
  setErrors(prev => ({ ...prev, [name]: error }));
};

// ✅ 表单状态管理
const [formData, setFormData] = useState({});

const updateField = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  validateField(field, value);
};

// ✅ 无障碍支持
<FormField 
  label="必填字段"
  constraintText="必填项"
  errorText={errors.field}
>
  <Input
    value={formData.field}
    onChange={({ detail }) => updateField('field', detail.value)}
    invalid={!!errors.field}
    ariaDescribedby="field-description"
  />
</FormField>
```

### 性能优化

```typescript
// ✅ 防抖处理
const debouncedValidation = useCallback(
  debounce((value) => validateField(value), 300),
  []
);

// ✅ 异步加载优化
const loadOptions = useCallback(async (query: string) => {
  if (query.length < 2) return [];
  
  const controller = new AbortController();
  try {
    const response = await fetch(`/api/search?q=${query}`, {
      signal: controller.signal
    });
    return await response.json();
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('搜索失败:', error);
    }
  }
}, []);
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：导航组件](./COMPONENTS_02_NAVIGATION.md) | [下一模块：表单进阶](./COMPONENTS_04_FORMS_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15