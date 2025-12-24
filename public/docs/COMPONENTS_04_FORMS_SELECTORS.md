# 模块 04: 表单选择器组件

> **模块**: 表单选择器组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

表单选择器组件提供各种用户选择交互方式，包括单选、多选、开关切换等功能。

### 本模块包含的组件

1. **Checkbox** - 复选框
2. **RadioGroup** - 单选按钮组
3. **Toggle** - 开关切换
4. **SegmentedControl** - 分段控制器
5. **Tiles** - 瓦片选择器

---

## 1. Checkbox - 复选框

### 1.1 组件概述
用于多选场景，支持独立状态和组合使用。

### 1.2 完整 API
```typescript
interface CheckboxProps {
  checked: boolean;
  onChange: (event: { detail: { checked: boolean; } }) => void;
  children?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  name?: string;
  value?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  controlId?: string;
}
```

### 1.3 基础示例
```typescript
// 基本用法
<Checkbox
  checked={isChecked}
  onChange={({ detail }) => setIsChecked(detail.checked)}
>
  同意服务条款
</Checkbox>

// 带描述
<Checkbox
  checked={enableNotifications}
  onChange={({ detail }) => setEnableNotifications(detail.checked)}
  description="接收系统通知和更新提醒"
>
  启用通知
</Checkbox>

// 禁用状态
<Checkbox
  checked={false}
  disabled={true}
  onChange={() => {}}
>
  已禁用选项
</Checkbox>
```

### 1.4 进阶示例
```typescript
// 全选/部分选中状态
function CheckboxGroup() {
  const [items, setItems] = useState([
    { id: '1', name: '服务器 A', checked: false },
    { id: '2', name: '服务器 B', checked: true },
    { id: '3', name: '服务器 C', checked: false }
  ]);

  const checkedCount = items.filter(item => item.checked).length;
  const isAllChecked = checkedCount === items.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < items.length;

  return (
    <SpaceBetween size="s">
      <Checkbox
        checked={isAllChecked}
        indeterminate={isIndeterminate}
        onChange={({ detail }) => {
          setItems(items.map(item => ({ ...item, checked: detail.checked })));
        }}
      >
        全选服务器
      </Checkbox>
      
      <Box margin={{ left: 'l' }}>
        <SpaceBetween size="xs">
          {items.map(item => (
            <Checkbox
              key={item.id}
              checked={item.checked}
              onChange={({ detail }) => {
                setItems(items.map(i => 
                  i.id === item.id ? { ...i, checked: detail.checked } : i
                ));
              }}
            >
              {item.name}
            </Checkbox>
          ))}
        </SpaceBetween>
      </Box>
    </SpaceBetween>
  );
}

// 表单验证
function ValidatedCheckbox() {
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    // 提交表单
  };

  return (
    <FormField
      label="用户协议"
      errorText={showError ? "必须同意用户协议才能继续" : undefined}
    >
      <Checkbox
        checked={agreed}
        onChange={({ detail }) => {
          setAgreed(detail.checked);
          setShowError(false);
        }}
      >
        我已阅读并同意用户协议
      </Checkbox>
    </FormField>
  );
}
```

### 1.5 最佳实践
- 使用清晰的标签文本
- 提供描述信息解释选项含义
- 合理使用 indeterminate 状态表示部分选中
- 在表单中配合 FormField 使用

### 1.6 常见场景
- 权限设置
- 功能开关
- 批量操作选择
- 表单同意条款

### 1.7 注意事项
- `indeterminate` 状态仅用于视觉显示，不影响 `checked` 值
- 避免在单个选项中使用，应使用 Toggle
- 标签文本应简洁明确

---

## 2. RadioGroup - 单选按钮组

### 2.1 组件概述
用于单选场景，从多个选项中选择一个。

### 2.2 完整 API
```typescript
interface RadioGroupProps {
  value?: string;
  onChange: (event: { detail: { value: string; } }) => void;
  items: Array<{
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    controlId?: string;
  }>;
  name?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}
```

### 2.3 基础示例
```typescript
// 基本用法
<RadioGroup
  value={selectedSize}
  onChange={({ detail }) => setSelectedSize(detail.value)}
  items={[
    { value: 'small', label: '小型' },
    { value: 'medium', label: '中型' },
    { value: 'large', label: '大型' }
  ]}
/>

// 带描述
<RadioGroup
  value={instanceType}
  onChange={({ detail }) => setInstanceType(detail.value)}
  items={[
    {
      value: 't3.micro',
      label: 't3.micro',
      description: '1 vCPU, 1 GB RAM - 适合轻量级应用'
    },
    {
      value: 't3.small',
      label: 't3.small',
      description: '2 vCPU, 2 GB RAM - 适合小型应用'
    },
    {
      value: 't3.medium',
      label: 't3.medium',
      description: '2 vCPU, 4 GB RAM - 适合中等负载'
    }
  ]}
/>
```

### 2.4 进阶示例
```typescript
// 动态选项
function DynamicRadioGroup() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegions().then(data => {
      setRegions(data.map(region => ({
        value: region.id,
        label: region.name,
        description: `延迟: ${region.latency}ms`,
        disabled: !region.available
      })));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <FormField label="选择区域">
      <RadioGroup
        value={selectedRegion}
        onChange={({ detail }) => setSelectedRegion(detail.value)}
        items={regions}
      />
    </FormField>
  );
}

// 条件渲染
function ConditionalRadioGroup() {
  const [deploymentType, setDeploymentType] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <SpaceBetween size="m">
      <FormField label="部署类型">
        <RadioGroup
          value={deploymentType}
          onChange={({ detail }) => {
            setDeploymentType(detail.value);
            setShowAdvanced(detail.value === 'custom');
          }}
          items={[
            {
              value: 'quick',
              label: '快速部署',
              description: '使用默认配置快速创建'
            },
            {
              value: 'custom',
              label: '自定义部署',
              description: '手动配置所有参数'
            }
          ]}
        />
      </FormField>

      {showAdvanced && (
        <Container>
          <h3>高级配置</h3>
          {/* 高级配置选项 */}
        </Container>
      )}
    </SpaceBetween>
  );
}
```

### 2.5 最佳实践
- 选项数量控制在 2-7 个之间
- 提供默认选中项
- 使用描述文本解释复杂选项
- 按逻辑顺序排列选项

### 2.6 常见场景
- 配置选择
- 类型选择
- 优先级设置
- 模式切换

### 2.7 注意事项
- 必须提供 `name` 属性用于表单提交
- 避免选项过多，考虑使用 Select
- 确保选项互斥且完整

---

## 3. Toggle - 开关切换

### 3.1 组件概述
用于开启/关闭功能，提供即时反馈的二元选择。

### 3.2 完整 API
```typescript
interface ToggleProps {
  checked: boolean;
  onChange: (event: { detail: { checked: boolean; } }) => void;
  children?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  value?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  controlId?: string;
}
```

### 3.3 基础示例
```typescript
// 基本用法
<Toggle
  checked={isEnabled}
  onChange={({ detail }) => setIsEnabled(detail.checked)}
>
  启用自动备份
</Toggle>

// 带描述
<Toggle
  checked={enableSSL}
  onChange={({ detail }) => setEnableSSL(detail.checked)}
  description="启用 HTTPS 加密传输，提高安全性"
>
  SSL/TLS 加密
</Toggle>

// 禁用状态
<Toggle
  checked={true}
  disabled={true}
  onChange={() => {}}
  description="此功能已被管理员锁定"
>
  强制启用
</Toggle>
```

### 3.4 进阶示例
```typescript
// 异步切换
function AsyncToggle() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async ({ detail }) => {
    setLoading(true);
    try {
      await updateFeatureStatus(detail.checked);
      setEnabled(detail.checked);
    } catch (error) {
      // 恢复原状态
      console.error('切换失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Toggle
      checked={enabled}
      onChange={handleToggle}
      disabled={loading}
    >
      {loading ? '正在切换...' : '实时监控'}
    </Toggle>
  );
}

// 依赖关系
function DependentToggles() {
  const [mainFeature, setMainFeature] = useState(false);
  const [subFeature1, setSubFeature1] = useState(false);
  const [subFeature2, setSubFeature2] = useState(false);

  const handleMainToggle = ({ detail }) => {
    setMainFeature(detail.checked);
    if (!detail.checked) {
      // 关闭主功能时，同时关闭子功能
      setSubFeature1(false);
      setSubFeature2(false);
    }
  };

  return (
    <SpaceBetween size="m">
      <Toggle
        checked={mainFeature}
        onChange={handleMainToggle}
      >
        启用高级功能
      </Toggle>

      <Box margin={{ left: 'l' }}>
        <SpaceBetween size="s">
          <Toggle
            checked={subFeature1}
            onChange={({ detail }) => setSubFeature1(detail.checked)}
            disabled={!mainFeature}
          >
            子功能 A
          </Toggle>
          
          <Toggle
            checked={subFeature2}
            onChange={({ detail }) => setSubFeature2(detail.checked)}
            disabled={!mainFeature}
          >
            子功能 B
          </Toggle>
        </SpaceBetween>
      </Box>
    </SpaceBetween>
  );
}
```

### 3.5 最佳实践
- 用于即时生效的功能开关
- 提供清晰的状态反馈
- 避免用于需要确认的操作
- 合理使用禁用状态

### 3.6 常见场景
- 功能开关
- 通知设置
- 隐私控制
- 系统配置

### 3.7 注意事项
- 与 Checkbox 的区别：Toggle 用于状态切换，Checkbox 用于选择
- 避免用于破坏性操作
- 状态变化应该立即生效

---

## 4. SegmentedControl - 分段控制器

### 4.1 组件概述
紧凑的单选控件，适合相关选项的快速切换。

### 4.2 完整 API
```typescript
interface SegmentedControlProps {
  selectedId?: string;
  onChange: (event: { detail: { selectedId: string; } }) => void;
  options: Array<{
    id: string;
    text: string;
    iconName?: string;
    disabled?: boolean;
  }>;
  label?: string;
}
```

### 4.3 基础示例
```typescript
// 基本用法
<SegmentedControl
  selectedId={viewMode}
  onChange={({ detail }) => setViewMode(detail.selectedId)}
  options={[
    { id: 'list', text: '列表' },
    { id: 'grid', text: '网格' },
    { id: 'card', text: '卡片' }
  ]}
/>

// 带图标
<SegmentedControl
  selectedId={chartType}
  onChange={({ detail }) => setChartType(detail.selectedId)}
  options={[
    { id: 'line', text: '折线图', iconName: 'line-chart' },
    { id: 'bar', text: '柱状图', iconName: 'bar-chart' },
    { id: 'pie', text: '饼图', iconName: 'pie-chart' }
  ]}
/>
```

### 4.4 进阶示例
```typescript
// 动态选项
function DynamicSegmentedControl() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [customPeriod, setCustomPeriod] = useState('');

  const periods = [
    { id: '1d', text: '1天' },
    { id: '7d', text: '7天' },
    { id: '30d', text: '30天' },
    { id: 'custom', text: '自定义' }
  ];

  return (
    <SpaceBetween size="s">
      <SegmentedControl
        selectedId={selectedPeriod}
        onChange={({ detail }) => setSelectedPeriod(detail.selectedId)}
        options={periods}
        label="时间范围"
      />
      
      {selectedPeriod === 'custom' && (
        <Input
          value={customPeriod}
          onChange={({ detail }) => setCustomPeriod(detail.value)}
          placeholder="输入天数"
          type="number"
        />
      )}
    </SpaceBetween>
  );
}

// 响应式布局
function ResponsiveSegmentedControl() {
  const [layout, setLayout] = useState('auto');
  
  const layoutOptions = [
    { id: 'auto', text: '自动', iconName: 'settings' },
    { id: 'mobile', text: '手机', iconName: 'mobile' },
    { id: 'tablet', text: '平板', iconName: 'tablet' },
    { id: 'desktop', text: '桌面', iconName: 'desktop' }
  ];

  return (
    <Container>
      <SpaceBetween size="m">
        <FormField label="预览模式">
          <SegmentedControl
            selectedId={layout}
            onChange={({ detail }) => setLayout(detail.selectedId)}
            options={layoutOptions}
          />
        </FormField>
        
        <Box className={`preview-${layout}`}>
          {/* 预览内容 */}
        </Box>
      </SpaceBetween>
    </Container>
  );
}
```

### 4.5 最佳实践
- 选项数量控制在 2-5 个
- 选项应该相关且互斥
- 使用简短的标签文本
- 提供默认选中项

### 4.6 常见场景
- 视图模式切换
- 时间范围选择
- 排序方式
- 显示选项

### 4.7 注意事项
- 不适合不相关的选项
- 避免选项过多导致拥挤
- 在移动端考虑触摸友好性

---

## 5. Tiles - 瓦片选择器

### 5.1 组件概述
可视化的选择器，支持单选和多选，适合展示丰富内容的选项。

### 5.2 完整 API
```typescript
interface TilesProps {
  value?: string | string[];
  onChange: (event: { detail: { value: string | string[]; } }) => void;
  items: Array<{
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    image?: React.ReactNode;
    disabled?: boolean;
    controlId?: string;
  }>;
  columns?: number;
  ariaLabel?: string;
}
```

### 5.3 基础示例
```typescript
// 单选模式
<Tiles
  value={selectedTemplate}
  onChange={({ detail }) => setSelectedTemplate(detail.value)}
  items={[
    {
      value: 'web',
      label: 'Web 应用',
      description: '适合网站和 Web 应用程序'
    },
    {
      value: 'api',
      label: 'API 服务',
      description: '适合 RESTful API 和微服务'
    },
    {
      value: 'database',
      label: '数据库',
      description: '适合数据存储和分析'
    }
  ]}
  columns={3}
/>

// 多选模式
<Tiles
  value={selectedFeatures}
  onChange={({ detail }) => setSelectedFeatures(detail.value)}
  items={[
    {
      value: 'ssl',
      label: 'SSL 证书',
      description: '自动管理 HTTPS 证书'
    },
    {
      value: 'cdn',
      label: 'CDN 加速',
      description: '全球内容分发网络'
    },
    {
      value: 'backup',
      label: '自动备份',
      description: '定期数据备份'
    }
  ]}
/>
```

### 5.4 进阶示例
```typescript
// 带图片的瓦片
function ImageTiles() {
  const [selectedOS, setSelectedOS] = useState('');

  const osOptions = [
    {
      value: 'ubuntu',
      label: 'Ubuntu 22.04',
      description: '最新 LTS 版本',
      image: <img src="/ubuntu-logo.svg" alt="Ubuntu" width="48" height="48" />
    },
    {
      value: 'centos',
      label: 'CentOS 8',
      description: '企业级 Linux',
      image: <img src="/centos-logo.svg" alt="CentOS" width="48" height="48" />
    },
    {
      value: 'windows',
      label: 'Windows Server 2022',
      description: '微软服务器系统',
      image: <img src="/windows-logo.svg" alt="Windows" width="48" height="48" />
    }
  ];

  return (
    <FormField label="选择操作系统">
      <Tiles
        value={selectedOS}
        onChange={({ detail }) => setSelectedOS(detail.value)}
        items={osOptions}
        columns={3}
      />
    </FormField>
  );
}

// 复杂内容瓦片
function ComplexTiles() {
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      value: 'basic',
      label: (
        <Box>
          <Box fontSize="heading-m" fontWeight="bold">基础版</Box>
          <Box fontSize="heading-l" color="text-status-success">¥99/月</Box>
        </Box>
      ),
      description: (
        <SpaceBetween size="xs">
          <div>• 2 CPU 核心</div>
          <div>• 4GB 内存</div>
          <div>• 50GB 存储</div>
          <div>• 基础支持</div>
        </SpaceBetween>
      )
    },
    {
      value: 'pro',
      label: (
        <Box>
          <Box fontSize="heading-m" fontWeight="bold">专业版</Box>
          <Box fontSize="heading-l" color="text-status-success">¥299/月</Box>
        </Box>
      ),
      description: (
        <SpaceBetween size="xs">
          <div>• 4 CPU 核心</div>
          <div>• 8GB 内存</div>
          <div>• 200GB 存储</div>
          <div>• 优先支持</div>
        </SpaceBetween>
      )
    }
  ];

  return (
    <Tiles
      value={selectedPlan}
      onChange={({ detail }) => setSelectedPlan(detail.value)}
      items={plans}
      columns={2}
    />
  );
}

// 条件禁用
function ConditionalTiles() {
  const [userTier, setUserTier] = useState('basic');
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      value: 'compute',
      label: '计算服务',
      description: '虚拟机和容器',
      disabled: false
    },
    {
      value: 'ai',
      label: 'AI 服务',
      description: '机器学习和 AI 模型',
      disabled: userTier === 'basic'
    },
    {
      value: 'enterprise',
      label: '企业服务',
      description: '专属企业功能',
      disabled: userTier !== 'enterprise'
    }
  ];

  return (
    <SpaceBetween size="m">
      <FormField label="用户等级">
        <Select
          selectedOption={{ label: userTier, value: userTier }}
          onChange={({ detail }) => setUserTier(detail.selectedOption.value)}
          options={[
            { label: '基础', value: 'basic' },
            { label: '专业', value: 'pro' },
            { label: '企业', value: 'enterprise' }
          ]}
        />
      </FormField>

      <FormField label="选择服务">
        <Tiles
          value={selectedService}
          onChange={({ detail }) => setSelectedService(detail.value)}
          items={services}
          columns={3}
        />
      </FormField>
    </SpaceBetween>
  );
}
```

### 5.5 最佳实践
- 使用清晰的视觉层次
- 保持瓦片大小一致
- 提供足够的描述信息
- 合理设置列数

### 5.6 常见场景
- 模板选择
- 套餐选择
- 功能配置
- 产品展示

### 5.7 注意事项
- 避免瓦片内容过于复杂
- 确保在不同屏幕尺寸下的可用性
- 合理使用禁用状态

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 多项选择 | Checkbox |
| 单项选择 | RadioGroup |
| 功能开关 | Toggle |
| 快速切换 | SegmentedControl |
| 可视化选择 | Tiles |

### 最佳实践

```typescript
// ✅ 合理组合使用
<SpaceBetween size="m">
  <FormField label="服务配置">
    <Tiles value={serviceType} onChange={...} items={services} />
  </FormField>
  
  <FormField label="高级选项">
    <SpaceBetween size="s">
      <Toggle checked={enableSSL} onChange={...}>SSL 加密</Toggle>
      <Toggle checked={enableBackup} onChange={...}>自动备份</Toggle>
    </SpaceBetween>
  </FormField>
  
  <FormField label="通知设置">
    <Checkbox checked={agreeTerms} onChange={...}>
      同意服务条款
    </Checkbox>
  </FormField>
</SpaceBetween>

// ✅ 提供清晰的标签和描述
<RadioGroup
  items={[
    {
      value: 'option1',
      label: '选项名称',
      description: '详细说明选项的作用和影响'
    }
  ]}
/>

// ✅ 处理状态依赖
const handleMainToggle = ({ detail }) => {
  setMainFeature(detail.checked);
  if (!detail.checked) {
    // 关闭依赖功能
    setSubFeatures([]);
  }
};
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：表单基础](./COMPONENTS_03_FORMS_BASIC.md) | [下一模块：数据展示](./COMPONENTS_05_DATA_DISPLAY.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15