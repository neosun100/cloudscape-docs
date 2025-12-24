# 模块 02: 导航组件

> **模块**: 导航组件  
> **组件数**: 6 个  
> **难度**: ⭐⭐⭐ 中等  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

导航组件负责应用的导航结构，帮助用户在不同页面和功能之间切换。

### 本模块包含的组件

1. **TopNavigation** - 顶部导航栏
2. **SideNavigation** - 侧边导航菜单
3. **BreadcrumbGroup** - 面包屑导航
4. **Tabs** - 标签页切换
5. **Wizard** - 多步骤向导
6. **AnchorNavigation** - 页内锚点导航

---

## 1. TopNavigation - 顶部导航栏

### 1.1 组件概述
全局顶部导航，包含 Logo、搜索、工具栏按钮和用户菜单。

### 1.2 完整 API
```typescript
interface TopNavigationProps {
  identity?: {
    href: string;
    title: string;
    logo?: { src: string; alt: string; };
  };
  search?: React.ReactNode;
  utilities?: Array<{
    type: 'button' | 'menu-dropdown';
    text?: string;
    iconName?: string;
    href?: string;
    items?: Array<{ id: string; text: string; }>;
    onClick?: () => void;
  }>;
}
```

### 1.3 实战示例
```typescript
<TopNavigation
  identity={{
    href: '/',
    title: '服务器管理平台',
    logo: { src: '/logo.svg', alt: 'Logo' }
  }}
  utilities={[
    { type: 'button', text: '文档', href: '/docs' },
    { 
      type: 'menu-dropdown',
      text: '管理员',
      iconName: 'user-profile',
      items: [
        { id: 'profile', text: '个人资料' },
        { id: 'signout', text: '退出' }
      ]
    }
  ]}
/>
```

---

## 2. SideNavigation - 侧边导航

### 2.1 组件概述
侧边栏导航菜单，支持多级菜单和分组。

### 2.2 完整 API
```typescript
interface SideNavigationProps {
  header?: { text: string; href: string; };
  items: Array<{
    type: 'link' | 'section' | 'divider' | 'link-group' | 'expandable-link-group';
    text?: string;
    href?: string;
    items?: Array</* 嵌套项 */>;
    defaultExpanded?: boolean;
  }>;
  activeHref?: string;
  onFollow?: (event: { detail: { href: string; } }) => void;
}
```

### 2.3 实战示例
```typescript
<SideNavigation
  header={{
    text: '我的应用',
    href: '/'
  }}
  items={[
    {
      type: 'section',
      text: '资源管理',
      items: [
        { type: 'link', text: '服务器', href: '/servers' },
        { type: 'link', text: '网络', href: '/network' },
        { type: 'link', text: '存储', href: '/storage' }
      ]
    },
    { type: 'divider' },
    {
      type: 'expandable-link-group',
      text: '监控',
      href: '/monitoring',
      defaultExpanded: true,
      items: [
        { type: 'link', text: '仪表盘', href: '/dashboard' },
        { type: 'link', text: '告警', href: '/alerts' },
        { type: 'link', text: '日志', href: '/logs' }
      ]
    },
    { type: 'divider' },
    { type: 'link', text: '设置', href: '/settings' }
  ]}
  activeHref={window.location.pathname}
  onFollow={(event) => {
    event.preventDefault();
    navigate(event.detail.href);
  }}
/>
```

---

## 3. BreadcrumbGroup - 面包屑

### 3.1 组件概述
显示当前页面在导航层级中的位置。

### 3.2 完整 API
```typescript
interface BreadcrumbGroupProps {
  items: Array<{
    text: string;
    href: string;
  }>;
  ariaLabel?: string;
  expandAriaLabel?: string;
  onFollow?: (event: { detail: { text: string; href: string; } }) => void;
}
```

### 3.3 实战示例
```typescript
<BreadcrumbGroup
  items={[
    { text: '首页', href: '/' },
    { text: '服务器', href: '/servers' },
    { text: 'srv-001', href: '/servers/srv-001' },
    { text: '配置', href: '#' }
  ]}
  ariaLabel="面包屑导航"
  onFollow={(event) => {
    event.preventDefault();
    navigate(event.detail.href);
  }}
/>
```

---

## 4. Tabs - 标签页

### 4.1 组件概述
标签页切换，支持懒加载和自定义渲染。

### 4.2 完整 API
```typescript
interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content?: React.ReactNode;
    disabled?: boolean;
    disabledReason?: string;
  }>;
  activeTabId?: string;
  onChange?: (event: { detail: { activeTabId: string; } }) => void;
  variant?: 'default' | 'container' | 'stacked';
  i18nStrings?: {
    scrollLeftAriaLabel?: string;
    scrollRightAriaLabel?: string;
  };
}
```

### 3 实战示例
```typescript
// 基础用法
<Tabs
  tabs={[
    {
      id: 'overview',
      label: '概览',
      content: <div>概览内容</div>
    },
    {
      id: 'config',
      label: '配置',
      content: <div>配置内容</div>
    },
    {
      id: 'logs',
      label: '日志',
      content: <div>日志内容</div>
    }
  ]}
/>

// 受控模式
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Tabs
      activeTabId={activeTab}
      onChange={({ detail }) => setActiveTab(detail.activeTabId)}
      tabs={tabs}
    />
  );
}

// 懒加载内容
<Tabs
  tabs={[
    {
      id: 'tab1',
      label: '标签 1',
      content: <LazyComponent />  // 只在激活时渲染
    }
  ]}
/>
```

---

## 5. Wizard - 向导

### 5.1 组件概述
多步骤流程向导，适合复杂的配置和创建流程。

### 5.2 完整 API
```typescript
interface WizardProps {
  steps: Array<{
    title: string;
    info?: React.ReactNode;
    description?: string;
    content: React.ReactNode;
    errorText?: string;
    isOptional?: boolean;
  }>;
  activeStepIndex: number;
  onNavigate: (event: { detail: { requestedStepIndex: number; reason: string; } }) => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  isLoadingNextStep?: boolean;
  allowSkipTo?: boolean;
  i18nStrings: {
    stepNumberLabel: (stepNumber: number) => string;
    collapsedStepsLabel: (stepNumber: number, stepsCount: number) => string;
    cancelButton: string;
    previousButton: string;
    nextButton: string;
    submitButton: string;
    optional: string;
  };
}
```

### 5.3 实战示例
```typescript
function ServerCreationWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    {
      title: '基本信息',
      content: (
        <Container>
          <FormField label="服务器名称">
            <Input
              value={formData.name || ''}
              onChange={({ detail }) => 
                setFormData({ ...formData, name: detail.value })
              }
            />
          </FormField>
        </Container>
      )
    },
    {
      title: '网络配置',
      content: (
        <Container>
          <FormField label="IP 地址">
            <Input
              value={formData.ip || ''}
              onChange={({ detail }) =>
                setFormData({ ...formData, ip: detail.value })
              }
            />
          </FormField>
        </Container>
      )
    },
    {
      title: '确认',
      content: (
        <Container>
          <h3>请确认配置</h3>
          <KeyValuePairs
            items={[
              { label: '名称', value: formData.name },
              { label: 'IP', value: formData.ip }
            ]}
          />
        </Container>
      )
    }
  ];

  return (
    <Wizard
      steps={steps}
      activeStepIndex={activeStep}
      onNavigate={({ detail }) => setActiveStep(detail.requestedStepIndex)}
      onSubmit={() => createServer(formData)}
      i18nStrings={{
        stepNumberLabel: (n) => `步骤 ${n}`,
        collapsedStepsLabel: (n, total) => `步骤 ${n}/${total}`,
        cancelButton: '取消',
        previousButton: '上一步',
        nextButton: '下一步',
        submitButton: '创建',
        optional: '可选'
      }}
    />
  );
}
```

---

## 6. AnchorNavigation - 锚点导航

### 6.1 组件概述
页内锚点导航，自动高亮当前可见区域。

### 6.2 完整 API
```typescript
interface AnchorNavigationProps {
  anchors: Array<{
    text: string;
    href: string;
    level?: number;
    info?: React.ReactNode;
  }>;
  activeHref?: string;
  onFollow?: (event: { detail: { href: string; } }) => void;
  ariaLabel?: string;
}
```

### 6.3 实战示例
```typescript
<AnchorNavigation
  anchors={[
    { text: '概述', href: '#overview', level: 1 },
    { text: '配置', href: '#config', level: 1 },
    { text: '基本配置', href: '#config-basic', level: 2 },
    { text: '高级配置', href: '#config-advanced', level: 2 },
    { text: '监控', href: '#monitoring', level: 1 }
  ]}
  onFollow={(event) => {
    event.preventDefault();
    document.querySelector(event.detail.href)?.scrollIntoView({
      behavior: 'smooth'
    });
  }}
/>
```

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 全局导航 | TopNavigation |
| 页面菜单 | SideNavigation |
| 路径导航 | BreadcrumbGroup |
| 内容切换 | Tabs |
| 多步流程 | Wizard |
| 页内导航 | AnchorNavigation |

### 最佳实践

```typescript
// ✅ 组合使用导航组件
<AppLayout
  navigation={<SideNavigation items={items} />}
  breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
  content={
    <Tabs tabs={tabs} />
  }
/>

// ✅ 使用受控模式管理状态
const [activeTab, setActiveTab] = useState('tab1');
<Tabs activeTabId={activeTab} onChange={...} />

// ✅ 提供完整的国际化字符串
<Wizard i18nStrings={{ /* 所有字符串 */ }} />
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：布局组件](./COMPONENTS_01_LAYOUT.md) | [下一模块：表单基础](./COMPONENTS_03_FORMS_BASIC.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 11:41
