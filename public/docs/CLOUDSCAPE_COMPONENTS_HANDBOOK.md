# Cloudscape 组件实战完全指南

> **文档定位**: 深度实战手册 - 每个组件的完整使用指南  
> **创建时间**: 2025-12-24  
> **适用版本**: Cloudscape Design System 3.0+  
> **目标**: 通过本文档掌握所有组件的实战使用

---

## 📖 使用说明

本文档按组件类别组织，每个组件包含：
- ✅ **完整 API 说明** - 所有属性和方法
- ✅ **基础示例** - 快速上手
- ✅ **进阶示例** - 复杂场景
- ✅ **最佳实践** - 避坑指南
- ✅ **常见场景** - 实际应用
- ✅ **注意事项** - 易错点

---

## 目录

### 第一部分：布局组件
1. [AppLayout - 应用主布局](#1-applayout---应用主布局)
2. [ContentLayout - 内容布局](#2-contentlayout---内容布局)
3. [ColumnLayout - 列布局](#3-columnlayout---列布局)
4. [Grid - 网格布局](#4-grid---网格布局)
5. [SpaceBetween - 间距布局](#5-spacebetween---间距布局)

### 第二部分：导航组件
6. [TopNavigation - 顶部导航](#6-topnavigation---顶部导航)
7. [SideNavigation - 侧边导航](#7-sidenavigation---侧边导航)
8. [BreadcrumbGroup - 面包屑](#8-breadcrumbgroup---面包屑)
9. [Tabs - 标签页](#9-tabs---标签页)
10. [Wizard - 向导](#10-wizard---向导)

### 第三部分：表单组件
11. [Input - 输入框](#11-input---输入框)
12. [Textarea - 多行文本](#12-textarea---多行文本)
13. [Select - 下拉选择](#13-select---下拉选择)
14. [Multiselect - 多选](#14-multiselect---多选)
15. [Autosuggest - 自动建议](#15-autosuggest---自动建议)
16. [Checkbox - 复选框](#16-checkbox---复选框)
17. [RadioGroup - 单选组](#17-radiogroup---单选组)
18. [Toggle - 开关](#18-toggle---开关)
19. [DatePicker - 日期选择](#19-datepicker---日期选择)
20. [DateRangePicker - 日期范围](#20-daterangepicker---日期范围)

### 第四部分：数据展示组件
21. [Table - 表格](#21-table---表格)
22. [Cards - 卡片列表](#22-cards---卡片列表)
23. [PropertyFilter - 属性过滤器](#23-propertyfilter---属性过滤器)
24. [Pagination - 分页](#24-pagination---分页)

### 第五部分：反馈组件
25. [Alert - 警告框](#25-alert---警告框)
26. [Flashbar - 通知栏](#26-flashbar---通知栏)
27. [Modal - 模态框](#27-modal---模态框)
28. [Popover - 弹出框](#28-popover---弹出框)

### 第六部分：按钮组件
29. [Button - 按钮](#29-button---按钮)
30. [ButtonDropdown - 按钮下拉](#30-buttondropdown---按钮下拉)
31. [ButtonGroup - 按钮组](#31-buttongroup---按钮组)

---

## 第一部分：布局组件

---

## 1. AppLayout - 应用主布局

### 1.1 组件概述

AppLayout 是 Cloudscape 的核心布局组件，提供完整的应用框架。

**核心功能：**
- 顶部导航栏
- 侧边导航（可折叠）
- 主内容区域
- 工具面板（右侧）
- 分割面板（底部/侧边）
- 面包屑
- 通知栏
- 抽屉系统

### 1.2 完整 API

```typescript
interface AppLayoutProps {
  // 导航相关
  navigation?: React.ReactNode;           // 侧边导航内容
  navigationOpen?: boolean;               // 导航是否打开
  navigationWidth?: number;               // 导航宽度（默认 280px）
  navigationHide?: boolean;               // 隐藏导航
  onNavigationChange?: (open: boolean) => void;  // 导航状态变化

  // 工具面板
  tools?: React.ReactNode;                // 工具面板内容
  toolsOpen?: boolean;                    // 工具面板是否打开
  toolsWidth?: number;                    // 工具面板宽度（默认 290px）
  toolsHide?: boolean;                    // 隐藏工具面板
  onToolsChange?: (open: boolean) => void;  // 工具面板状态变化

  // 内容区域
  content?: React.ReactNode;              // 主内容
  contentType?: 'default' | 'table' | 'cards' | 'form' | 'wizard' | 'dashboard';
  
  // 面包屑
  breadcrumbs?: React.ReactNode;          // 面包屑内容
  
  // 通知
  notifications?: React.ReactNode;        // 通知栏内容
  stickyNotifications?: boolean;          // 通知栏是否粘性定位
  
  // 分割面板
  splitPanel?: React.ReactNode;           // 分割面板内容
  splitPanelOpen?: boolean;               // 分割面板是否打开
  splitPanelPreferences?: {               // 分割面板偏好设置
    position: 'bottom' | 'side';
  };
  onSplitPanelToggle?: (open: boolean) => void;
  onSplitPanelPreferencesChange?: (preferences) => void;
  
  // 抽屉
  drawers?: Array<{                       // 抽屉配置
    id: string;
    content: React.ReactNode;
    trigger: {
      iconName: string;
    };
    ariaLabels: {
      drawerName: string;
      closeButton: string;
    };
  }>;
  activeDrawerId?: string;                // 当前激活的抽屉
  onDrawerChange?: (drawerId: string | null) => void;
  
  // 其他
  disableContentPaddings?: boolean;       // 禁用内容区域内边距
  maxContentWidth?: number;               // 最大内容宽度
  minContentWidth?: number;               // 最小内容宽度
  headerSelector?: string;                // 粘性头部选择器
  footerSelector?: string;                // 粘性底部选择器
  
  // 国际化
  ariaLabels?: {
    navigation?: string;
    navigationClose?: string;
    navigationToggle?: string;
    notifications?: string;
    tools?: string;
    toolsClose?: string;
    toolsToggle?: string;
  };
}
```

### 1.3 基础示例

#### 示例 1：最简单的布局

```typescript
import { AppLayout, SideNavigation } from '@cloudscape-design/components';

function BasicLayout() {
  return (
    <AppLayout
      navigation={
        <SideNavigation
          items={[
            { type: 'link', text: '首页', href: '/' },
            { type: 'link', text: '服务器', href: '/servers' },
            { type: 'link', text: '设置', href: '/settings' }
          ]}
        />
      }
      content={
        <div>
          <h1>主内容区域</h1>
          <p>这里是页面的主要内容</p>
        </div>
      }
    />
  );
}
```

#### 示例 2：带工具面板的布局

```typescript
import { AppLayout, HelpPanel } from '@cloudscape-design/components';
import { useState } from 'react';

function LayoutWithTools() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <AppLayout
      navigation={<SideNavigation items={navItems} />}
      tools={
        <HelpPanel header={<h2>帮助</h2>}>
          <p>这里是帮助内容</p>
        </HelpPanel>
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      content={<MainContent />}
    />
  );
}
```

### 1.4 进阶示例

#### 示例 3：完整功能的布局

```typescript
import {
  AppLayout,
  SideNavigation,
  BreadcrumbGroup,
  Flashbar,
  SplitPanel,
  HelpPanel
} from '@cloudscape-design/components';
import { useState } from 'react';

function FullFeaturedLayout() {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      type: 'success',
      content: '操作成功',
      dismissible: true,
      onDismiss: () => setNotifications([]),
      id: '1'
    }
  ]);

  return (
    <AppLayout
      // 导航
      navigation={
        <SideNavigation
          header={{ text: '我的应用', href: '/' }}
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
            {
              type: 'section',
              text: '监控',
              items: [
                { type: 'link', text: '仪表盘', href: '/dashboard' },
                { type: 'link', text: '告警', href: '/alerts' }
              ]
            },
            { type: 'divider' },
            { type: 'link', text: '设置', href: '/settings' }
          ]}
        />
      }
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      
      // 面包屑
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: '首页', href: '/' },
            { text: '服务器', href: '/servers' },
            { text: '详情', href: '#' }
          ]}
        />
      }
      
      // 通知
      notifications={<Flashbar items={notifications} />}
      stickyNotifications
      
      // 工具面板
      tools={
        <HelpPanel
          header={<h2>服务器管理帮助</h2>}
          footer={
            <div>
              <h3>了解更多</h3>
              <ul>
                <li><a href="#">文档</a></li>
                <li><a href="#">视频教程</a></li>
              </ul>
            </div>
          }
        >
          <p>在这里可以管理您的服务器实例。</p>
          <p>支持的操作：</p>
          <ul>
            <li>启动/停止服务器</li>
            <li>修改配置</li>
            <li>查看日志</li>
          </ul>
        </HelpPanel>
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      
      // 分割面板
      splitPanel={
        <SplitPanel header="服务器日志">
          <pre>
            [2025-12-24 00:00:00] Server started
            [2025-12-24 00:00:01] Listening on port 8080
          </pre>
        </SplitPanel>
      }
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
      
      // 主内容
      content={
        <div>
          <h1>服务器管理</h1>
          {/* 主要内容 */}
        </div>
      }
      
      // 内容类型（影响布局样式）
      contentType="table"
      
      // 国际化
      ariaLabels={{
        navigation: '侧边导航',
        navigationClose: '关闭导航',
        navigationToggle: '切换导航',
        tools: '工具面板',
        toolsClose: '关闭工具面板',
        toolsToggle: '切换工具面板'
      }}
    />
  );
}
```

#### 示例 4：带抽屉的布局

```typescript
import { AppLayout } from '@cloudscape-design/components';
import { useState } from 'react';

function LayoutWithDrawers() {
  const [activeDrawerId, setActiveDrawerId] = useState(null);

  return (
    <AppLayout
      navigation={<SideNavigation items={navItems} />}
      content={<MainContent />}
      
      // 抽屉配置
      drawers={[
        {
          id: 'security',
          content: (
            <div>
              <h2>安全设置</h2>
              <p>配置安全相关选项</p>
            </div>
          ),
          trigger: {
            iconName: 'security'
          },
          ariaLabels: {
            drawerName: '安全设置',
            closeButton: '关闭安全设置'
          }
        },
        {
          id: 'notifications',
          content: (
            <div>
              <h2>通知中心</h2>
              <p>查看所有通知</p>
            </div>
          ),
          trigger: {
            iconName: 'notification'
          },
          ariaLabels: {
            drawerName: '通知中心',
            closeButton: '关闭通知中心'
          }
        }
      ]}
      activeDrawerId={activeDrawerId}
      onDrawerChange={({ detail }) => setActiveDrawerId(detail.activeDrawerId)}
    />
  );
}
```

### 1.5 最佳实践

#### ✅ DO - 推荐做法

```typescript
// 1. 使用受控组件管理状态
const [navigationOpen, setNavigationOpen] = useState(true);

<AppLayout
  navigationOpen={navigationOpen}
  onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
/>

// 2. 根据内容类型设置 contentType
<AppLayout
  contentType="table"  // 表格页面
  content={<Table {...props} />}
/>

// 3. 使用粘性通知
<AppLayout
  notifications={<Flashbar items={notifications} />}
  stickyNotifications  // 通知栏固定在顶部
/>

// 4. 提供完整的 aria 标签
<AppLayout
  ariaLabels={{
    navigation: '主导航',
    navigationClose: '关闭导航',
    navigationToggle: '打开/关闭导航'
  }}
/>
```

#### ❌ DON'T - 避免做法

```typescript
// 1. 不要在内容区域使用固定定位
<AppLayout
  content={
    <div style={{ position: 'fixed' }}>  // ❌ 会破坏布局
      内容
    </div>
  }
/>

// 2. 不要同时隐藏所有面板
<AppLayout
  navigationHide
  toolsHide
  // ❌ 用户无法访问任何辅助功能
/>

// 3. 不要在 content 中直接使用 margin
<AppLayout
  content={
    <div style={{ margin: '20px' }}>  // ❌ 使用 disableContentPaddings
      内容
    </div>
  }
/>

// 正确做法：
<AppLayout
  disableContentPaddings
  content={
    <div style={{ padding: '20px' }}>  // ✅
      内容
    </div>
  }
/>
```

### 1.6 常见场景

#### 场景 1：持久化导航状态

```typescript
import { AppLayout } from '@cloudscape-design/components';
import { useState, useEffect } from 'react';

function PersistentLayout() {
  const [navigationOpen, setNavigationOpen] = useState(() => {
    // 从 localStorage 读取
    const saved = localStorage.getItem('navigationOpen');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // 保存到 localStorage
    localStorage.setItem('navigationOpen', JSON.stringify(navigationOpen));
  }, [navigationOpen]);

  return (
    <AppLayout
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      navigation={<SideNavigation items={navItems} />}
      content={<MainContent />}
    />
  );
}
```

#### 场景 2：响应式布局

```typescript
import { AppLayout } from '@cloudscape-design/components';
import { useState, useEffect } from 'react';

function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [navigationOpen, setNavigationOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setNavigationOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppLayout
      navigationOpen={navigationOpen}
      onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
      navigation={<SideNavigation items={navItems} />}
      content={<MainContent />}
    />
  );
}
```

### 1.7 注意事项

⚠️ **重要提示：**

1. **性能优化**
   - AppLayout 会重新渲染所有子组件
   - 使用 `React.memo` 优化大型内容组件
   - 避免在 content 中进行昂贵的计算

2. **Z-index 层级**
   - AppLayout 使用固定的 z-index
   - 自定义浮层组件需要注意层级关系
   - Modal 和 Popover 会自动处理

3. **滚动行为**
   - 默认情况下，内容区域可滚动
   - 使用 `contentType="table"` 时，表格会自动处理滚动
   - 分割面板会影响滚动区域

4. **移动端**
   - 虽然官方不支持移动浏览器
   - 但在桌面浏览器缩小窗口时会自动适配
   - 导航会自动变为可折叠状态

---

## 2. ContentLayout - 内容布局

### 2.1 组件概述

ContentLayout 用于在 AppLayout 的内容区域内创建标准化的页面布局。

**核心功能：**
- Hero Header（带背景图的大标题）
- 主内容区域
- 侧边内容
- 固定宽度/流式布局

### 2.2 完整 API

```typescript
interface ContentLayoutProps {
  // 头部
  header?: React.ReactNode;              // 页面头部（通常是 Header 组件）
  
  // 内容
  children?: React.ReactNode;            // 主内容
  
  // 侧边内容
  secondaryContent?: React.ReactNode;    // 侧边栏内容
  
  // 布局选项
  disableOverlap?: boolean;              // 禁用头部与内容重叠效果
  defaultPadding?: boolean;              // 使用默认内边距
  
  // 其他
  variant?: 'default' | 'text-only';     // 布局变体
}
```

### 2.3 基础示例

#### 示例 1：基础内容布局

```typescript
import { ContentLayout, Header, Container } from '@cloudscape-design/components';

function BasicContentLayout() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="管理您的服务器实例"
        >
          服务器管理
        </Header>
      }
    >
      <Container>
        <p>这里是主要内容</p>
      </Container>
    </ContentLayout>
  );
}
```

#### 示例 2：带侧边栏的布局

```typescript
import { ContentLayout, Header, Container, SpaceBetween } from '@cloudscape-design/components';

function LayoutWithSidebar() {
  return (
    <ContentLayout
      header={
        <Header variant="h1">
          服务器详情
        </Header>
      }
      secondaryContent={
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">快速操作</Header>}>
            <Button>启动</Button>
            <Button>停止</Button>
            <Button>重启</Button>
          </Container>
          
          <Container header={<Header variant="h2">相关资源</Header>}>
            <Link href="/network">网络配置</Link>
            <Link href="/storage">存储配置</Link>
          </Container>
        </SpaceBetween>
      }
    >
      <Container>
        <h2>服务器信息</h2>
        <KeyValuePairs
          items={[
            { label: 'ID', value: 'srv-12345' },
            { label: 'IP', value: '192.168.1.100' },
            { label: '状态', value: '运行中' }
          ]}
        />
      </Container>
    </ContentLayout>
  );
}
```

### 2.4 进阶示例

#### 示例 3：Hero Header 布局

```typescript
import { ContentLayout, Header, Container } from '@cloudscape-design/components';

function HeroHeaderLayout() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="欢迎使用我们的服务器管理平台"
          actions={
            <Button variant="primary">开始使用</Button>
          }
        >
          <div style={{
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            padding: '60px 0',
            color: 'white'
          }}>
            服务器管理平台
          </div>
        </Header>
      }
      disableOverlap={false}  // 启用重叠效果
    >
      <SpaceBetween size="l">
        <Container>
          <h2>功能特性</h2>
          <ColumnLayout columns={3}>
            <div>
              <h3>高性能</h3>
              <p>快速响应</p>
            </div>
            <div>
              <h3>易用性</h3>
              <p>简单操作</p>
            </div>
            <div>
              <h3>安全性</h3>
              <p>数据保护</p>
            </div>
          </ColumnLayout>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}
```

### 2.5 最佳实践

```typescript
// ✅ 使用 Header 组件作为头部
<ContentLayout
  header={
    <Header
      variant="h1"
      description="描述文本"
      actions={<Button>操作</Button>}
    >
      页面标题
    </Header>
  }
>
  {children}
</ContentLayout>

// ✅ 使用 SpaceBetween 组织内容
<ContentLayout header={header}>
  <SpaceBetween size="l">
    <Container>内容 1</Container>
    <Container>内容 2</Container>
  </SpaceBetween>
</ContentLayout>

// ❌ 不要在 ContentLayout 外使用 Header
<div>
  <Header>标题</Header>  {/* ❌ 应该放在 ContentLayout 的 header 属性中 */}
  <ContentLayout>
    内容
  </ContentLayout>
</div>
```

### 2.6 注意事项

⚠️ **重要提示：**

1. ContentLayout 应该在 AppLayout 的 content 中使用
2. 使用 `disableOverlap={false}` 时，头部会与内容重叠，适合 Hero Header
3. 侧边栏内容在小屏幕上会自动移到底部

---

## 3. ColumnLayout - 列布局

### 3.1 组件概述

ColumnLayout 提供响应式的多列布局，自动适配屏幕大小。

### 3.2 完整 API

```typescript
interface ColumnLayoutProps {
  columns?: number | {                   // 列数配置
    default?: number;                    // 默认列数
    xxs?: number;                        // 超小屏（< 465px）
    xs?: number;                         // 小屏（< 688px）
    s?: number;                          // 中屏（< 912px）
    m?: number;                          // 大屏（< 1120px）
    l?: number;                          // 超大屏（< 1320px）
    xl?: number;                         // 特大屏（>= 1320px）
  };
  
  variant?: 'default' | 'text-grid';     // 布局变体
  borders?: 'none' | 'vertical' | 'horizontal' | 'all';  // 边框
  disableGutters?: boolean;              // 禁用列间距
  minColumnWidth?: number;               // 最小列宽（px）
  
  children?: React.ReactNode;            // 子元素
}
```

### 3.3 基础示例

```typescript
import { ColumnLayout, Container } from '@cloudscape-design/components';

// 示例 1：固定列数
function FixedColumns() {
  return (
    <ColumnLayout columns={3}>
      <Container>列 1</Container>
      <Container>列 2</Container>
      <Container>列 3</Container>
    </ColumnLayout>
  );
}

// 示例 2：响应式列数
function ResponsiveColumns() {
  return (
    <ColumnLayout
      columns={{
        default: 1,
        xs: 2,
        s: 3,
        m: 4
      }}
    >
      <Container>项目 1</Container>
      <Container>项目 2</Container>
      <Container>项目 3</Container>
      <Container>项目 4</Container>
    </ColumnLayout>
  );
}

// 示例 3：文本网格变体
function TextGrid() {
  return (
    <ColumnLayout columns={2} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">服务器名称</Box>
        <div>server-001</div>
      </div>
      <div>
        <Box variant="awsui-key-label">IP 地址</Box>
        <div>192.168.1.100</div>
      </div>
      <div>
        <Box variant="awsui-key-label">状态</Box>
        <div>运行中</div>
      </div>
      <div>
        <Box variant="awsui-key-label">CPU</Box>
        <div>45%</div>
      </div>
    </ColumnLayout>
  );
}
```

### 3.4 最佳实践

```typescript
// ✅ 使用响应式配置
<ColumnLayout
  columns={{
    default: 1,  // 移动端单列
    s: 2,        // 平板双列
    m: 3,        // 桌面三列
    l: 4         // 大屏四列
  }}
>
  {items.map(item => <Container key={item.id}>{item.content}</Container>)}
</ColumnLayout>

// ✅ 设置最小列宽防止内容挤压
<ColumnLayout columns={4} minColumnWidth={200}>
  {items}
</ColumnLayout>

// ❌ 不要在列中使用固定宽度
<ColumnLayout columns={3}>
  <div style={{ width: '300px' }}>  {/* ❌ 会破坏响应式 */}
    内容
  </div>
</ColumnLayout>
```

---

*（由于篇幅限制，这是第一部分。我将继续创建后续部分...）*


## 4. Grid - 网格布局

### 4.1 组件概述

Grid 提供 12 列网格系统，类似 Bootstrap Grid。

### 4.2 完整 API

```typescript
interface GridProps {
  gridDefinition?: Array<{              // 网格定义
    colspan?: number | {                // 列跨度
      default?: number;
      xxs?: number;
      xs?: number;
      s?: number;
      m?: number;
      l?: number;
      xl?: number;
    };
    offset?: number | {                 // 偏移量
      default?: number;
      xxs?: number;
      // ... 其他断点
    };
    push?: number | { /* ... */ };      // 推送
    pull?: number | { /* ... */ };      // 拉取
  }>;
  
  disableGutters?: boolean;             // 禁用间距
  children?: React.ReactNode;
}
```

### 4.3 实战示例

```typescript
import { Grid, Container } from '@cloudscape-design/components';

// 示例 1：基础网格
function BasicGrid() {
  return (
    <Grid
      gridDefinition={[
        { colspan: 12 },      // 全宽
        { colspan: 6 },       // 半宽
        { colspan: 6 },       // 半宽
        { colspan: 4 },       // 三分之一
        { colspan: 4 },
        { colspan: 4 }
      ]}
    >
      <Container>12 列</Container>
      <Container>6 列</Container>
      <Container>6 列</Container>
      <Container>4 列</Container>
      <Container>4 列</Container>
      <Container>4 列</Container>
    </Grid>
  );
}

// 示例 2：响应式网格
function ResponsiveGrid() {
  return (
    <Grid
      gridDefinition={[
        {
          colspan: {
            default: 12,  // 移动端全宽
            xs: 6,        // 小屏半宽
            s: 4,         // 中屏三分之一
            m: 3          // 大屏四分之一
          }
        },
        {
          colspan: {
            default: 12,
            xs: 6,
            s: 4,
            m: 3
          }
        },
        {
          colspan: {
            default: 12,
            xs: 6,
            s: 4,
            m: 3
          }
        },
        {
          colspan: {
            default: 12,
            xs: 6,
            s: 4,
            m: 3
          }
        }
      ]}
    >
      <Container>项目 1</Container>
      <Container>项目 2</Container>
      <Container>项目 3</Container>
      <Container>项目 4</Container>
    </Grid>
  );
}

// 示例 3：带偏移的网格
function GridWithOffset() {
  return (
    <Grid
      gridDefinition={[
        { colspan: 8, offset: 2 },  // 居中 8 列，左右各偏移 2 列
        { colspan: 6, offset: 3 }   // 居中 6 列，左右各偏移 3 列
      ]}
    >
      <Container>居中内容（8列）</Container>
      <Container>居中内容（6列）</Container>
    </Grid>
  );
}

// 示例 4：复杂布局
function ComplexGrid() {
  return (
    <Grid
      gridDefinition={[
        // 头部：全宽
        { colspan: 12 },
        // 主内容：8列
        { colspan: { default: 12, m: 8 } },
        // 侧边栏：4列
        { colspan: { default: 12, m: 4 } },
        // 底部：三列
        { colspan: { default: 12, s: 4 } },
        { colspan: { default: 12, s: 4 } },
        { colspan: { default: 12, s: 4 } }
      ]}
    >
      <Container>
        <Header variant="h1">页面标题</Header>
      </Container>
      
      <Container>
        <h2>主要内容</h2>
        <p>这里是主要内容区域</p>
      </Container>
      
      <Container>
        <h2>侧边栏</h2>
        <p>相关链接和信息</p>
      </Container>
      
      <Container>底部项目 1</Container>
      <Container>底部项目 2</Container>
      <Container>底部项目 3</Container>
    </Grid>
  );
}
```

### 4.4 最佳实践

```typescript
// ✅ 使用响应式配置
<Grid
  gridDefinition={[
    {
      colspan: {
        default: 12,  // 始终从移动端开始
        s: 6,
        m: 4
      }
    }
  ]}
>
  {children}
</Grid>

// ✅ 确保列数总和为 12
<Grid
  gridDefinition={[
    { colspan: 8 },
    { colspan: 4 }  // 8 + 4 = 12 ✅
  ]}
>
  {children}
</Grid>

// ❌ 避免列数超过 12
<Grid
  gridDefinition={[
    { colspan: 8 },
    { colspan: 6 }  // 8 + 6 = 14 ❌ 会换行
  ]}
>
  {children}
</Grid>
```

---

## 5. SpaceBetween - 间距布局

### 5.1 组件概述

SpaceBetween 是最常用的布局组件，用于在子元素之间添加统一间距。

### 5.2 完整 API

```typescript
interface SpaceBetweenProps {
  size?: 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';  // 间距大小
  direction?: 'vertical' | 'horizontal';  // 方向
  alignItems?: 'start' | 'center' | 'end';  // 对齐方式
  children?: React.ReactNode;
}
```

**间距大小对应：**
- `xxxs`: 4px
- `xxs`: 8px
- `xs`: 12px
- `s`: 16px
- `m`: 20px
- `l`: 24px
- `xl`: 32px
- `xxl`: 40px

### 5.3 实战示例

```typescript
import { SpaceBetween, Container, Button } from '@cloudscape-design/components';

// 示例 1：垂直间距（最常用）
function VerticalSpacing() {
  return (
    <SpaceBetween size="l">
      <Container>
        <h2>第一个容器</h2>
      </Container>
      <Container>
        <h2>第二个容器</h2>
      </Container>
      <Container>
        <h2>第三个容器</h2>
      </Container>
    </SpaceBetween>
  );
}

// 示例 2：水平间距
function HorizontalSpacing() {
  return (
    <SpaceBetween direction="horizontal" size="s">
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </SpaceBetween>
  );
}

// 示例 3：对齐方式
function AlignedSpacing() {
  return (
    <SpaceBetween direction="horizontal" size="m" alignItems="center">
      <div style={{ height: '100px', background: '#eee' }}>高元素</div>
      <div style={{ height: '50px', background: '#ddd' }}>矮元素</div>
      <div style={{ height: '75px', background: '#ccc' }}>中等元素</div>
    </SpaceBetween>
  );
}

// 示例 4：嵌套使用
function NestedSpacing() {
  return (
    <SpaceBetween size="l">
      <Container>
        <SpaceBetween size="s">
          <h2>标题</h2>
          <p>描述文本</p>
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary">主要操作</Button>
            <Button>次要操作</Button>
          </SpaceBetween>
        </SpaceBetween>
      </Container>
      
      <Container>
        <h2>另一个区块</h2>
      </Container>
    </SpaceBetween>
  );
}

// 示例 5：表单布局
function FormLayout() {
  return (
    <form>
      <SpaceBetween size="l">
        <FormField label="用户名">
          <Input />
        </FormField>
        
        <FormField label="邮箱">
          <Input type="email" />
        </FormField>
        
        <FormField label="密码">
          <Input type="password" />
        </FormField>
        
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="primary">提交</Button>
          <Button>取消</Button>
        </SpaceBetween>
      </SpaceBetween>
    </form>
  );
}
```

### 5.4 最佳实践

```typescript
// ✅ 使用 SpaceBetween 而不是 margin
<SpaceBetween size="l">
  <Container>内容 1</Container>
  <Container>内容 2</Container>
</SpaceBetween>

// ❌ 不要使用 margin
<div>
  <Container style={{ marginBottom: '24px' }}>内容 1</Container>
  <Container>内容 2</Container>
</div>

// ✅ 根据内容重要性选择间距
<SpaceBetween size="xxl">  {/* 大间距：分隔主要区块 */}
  <Section1 />
  <Section2 />
</SpaceBetween>

<SpaceBetween size="s">  {/* 小间距：相关内容 */}
  <Label />
  <Input />
  <HelpText />
</SpaceBetween>

// ✅ 按钮组使用水平间距
<SpaceBetween direction="horizontal" size="xs">
  <Button variant="primary">确定</Button>
  <Button>取消</Button>
</SpaceBetween>
```

### 5.5 间距选择指南

```typescript
// 页面级别区块
<SpaceBetween size="xxl">  // 40px
  <Header />
  <MainContent />
  <Footer />
</SpaceBetween>

// 主要内容区块
<SpaceBetween size="l">  // 24px
  <Container>区块 1</Container>
  <Container>区块 2</Container>
</SpaceBetween>

// 表单字段
<SpaceBetween size="m">  // 20px
  <FormField />
  <FormField />
</SpaceBetween>

// 相关内容
<SpaceBetween size="s">  // 16px
  <Label />
  <Input />
  <Description />
</SpaceBetween>

// 紧密相关的元素
<SpaceBetween size="xs">  // 12px
  <Button />
  <Button />
</SpaceBetween>
```

---

## 第二部分：导航组件

---

## 6. TopNavigation - 顶部导航

### 6.1 组件概述

TopNavigation 提供应用顶部的全局导航栏。

### 6.2 完整 API

```typescript
interface TopNavigationProps {
  // 身份标识
  identity?: {
    href: string;
    title: string;
    logo?: {
      src: string;
      alt: string;
    };
  };
  
  // 搜索
  search?: React.ReactNode;
  
  // 工具栏
  utilities?: Array<{
    type: 'button' | 'menu-dropdown';
    text?: string;
    title?: string;
    description?: string;
    iconName?: string;
    iconUrl?: string;
    iconSvg?: React.ReactNode;
    iconAlt?: string;
    badge?: boolean;
    disableUtilityCollapse?: boolean;
    href?: string;
    external?: boolean;
    externalIconAriaLabel?: string;
    onClick?: () => void;
    onFollow?: () => void;
    items?: Array<{
      id: string;
      text: string;
      href?: string;
      external?: boolean;
      disabled?: boolean;
      items?: Array</* 嵌套项 */>;
    }>;
  }>;
  
  // 国际化
  i18nStrings?: {
    searchIconAriaLabel?: string;
    searchDismissIconAriaLabel?: string;
    overflowMenuTriggerText?: string;
    overflowMenuTitleText?: string;
    overflowMenuBackIconAriaLabel?: string;
    overflowMenuDismissIconAriaLabel?: string;
  };
}
```

### 6.3 实战示例

```typescript
import { TopNavigation, Input } from '@cloudscape-design/components';
import { useState } from 'react';

// 示例 1：基础顶部导航
function BasicTopNav() {
  return (
    <TopNavigation
      identity={{
        href: '/',
        title: '我的应用',
        logo: {
          src: '/logo.png',
          alt: '应用 Logo'
        }
      }}
      utilities={[
        {
          type: 'button',
          text: '文档',
          href: '/docs',
          external: true
        },
        {
          type: 'button',
          iconName: 'notification',
          title: '通知',
          ariaLabel: '通知',
          badge: true,
          onClick: () => console.log('打开通知')
        },
        {
          type: 'menu-dropdown',
          text: '用户名',
          description: 'user@example.com',
          iconName: 'user-profile',
          items: [
            { id: 'profile', text: '个人资料' },
            { id: 'settings', text: '设置' },
            { id: 'signout', text: '退出登录' }
          ]
        }
      ]}
    />
  );
}

// 示例 2：带搜索的顶部导航
function TopNavWithSearch() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: '服务器管理'
      }}
      search={
        <Input
          type="search"
          placeholder="搜索服务器..."
          value={searchValue}
          onChange={({ detail }) => setSearchValue(detail.value)}
        />
      }
      utilities={[
        {
          type: 'button',
          text: '新建服务器',
          variant: 'primary-button',
          onClick: () => console.log('新建')
        },
        {
          type: 'menu-dropdown',
          text: '管理员',
          iconName: 'user-profile',
          items: [
            {
              id: 'profile',
              text: '个人资料',
              href: '/profile'
            },
            {
              id: 'team',
              text: '团队管理',
              items: [
                { id: 'members', text: '成员列表' },
                { id: 'roles', text: '角色权限' }
              ]
            },
            { id: 'divider-1', type: 'divider' },
            {
              id: 'signout',
              text: '退出登录',
              onClick: () => handleSignOut()
            }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: '搜索',
        searchDismissIconAriaLabel: '关闭搜索',
        overflowMenuTriggerText: '更多',
        overflowMenuTitleText: '全部',
        overflowMenuBackIconAriaLabel: '返回',
        overflowMenuDismissIconAriaLabel: '关闭菜单'
      }}
    />
  );
}

// 示例 3：完整功能的顶部导航
function FullFeaturedTopNav() {
  const [notifications, setNotifications] = useState([
    { id: '1', text: '服务器 srv-001 已启动', time: '2分钟前' },
    { id: '2', text: '备份任务完成', time: '10分钟前' }
  ]);

  return (
    <TopNavigation
      identity={{
        href: '/',
        title: '云管理平台',
        logo: {
          src: '/logo.svg',
          alt: '平台 Logo'
        }
      }}
      
      search={
        <Autosuggest
          placeholder="搜索资源..."
          options={[
            { value: 'srv-001', label: '服务器 srv-001' },
            { value: 'net-001', label: '网络 net-001' }
          ]}
        />
      }
      
      utilities={[
        // 帮助文档
        {
          type: 'button',
          text: '文档',
          href: 'https://docs.example.com',
          external: true,
          externalIconAriaLabel: '在新窗口打开'
        },
        
        // 通知
        {
          type: 'menu-dropdown',
          iconName: 'notification',
          ariaLabel: '通知',
          badge: notifications.length > 0,
          title: '通知',
          items: notifications.length > 0 ? [
            ...notifications.map(n => ({
              id: n.id,
              text: n.text,
              description: n.time
            })),
            { id: 'divider', type: 'divider' },
            { id: 'view-all', text: '查看全部通知', href: '/notifications' }
          ] : [
            { id: 'empty', text: '暂无通知', disabled: true }
          ]
        },
        
        // 设置
        {
          type: 'menu-dropdown',
          iconName: 'settings',
          ariaLabel: '设置',
          items: [
            { id: 'preferences', text: '偏好设置', href: '/preferences' },
            { id: 'billing', text: '账单管理', href: '/billing' },
            { id: 'api-keys', text: 'API 密钥', href: '/api-keys' }
          ]
        },
        
        // 用户菜单
        {
          type: 'menu-dropdown',
          text: '张三',
          description: 'admin@example.com',
          iconName: 'user-profile',
          items: [
            {
              id: 'profile',
              text: '个人资料',
              href: '/profile'
            },
            {
              id: 'organization',
              text: '组织管理',
              items: [
                { id: 'members', text: '成员管理', href: '/org/members' },
                { id: 'teams', text: '团队管理', href: '/org/teams' },
                { id: 'roles', text: '角色权限', href: '/org/roles' }
              ]
            },
            { id: 'divider-1', type: 'divider' },
            {
              id: 'switch-role',
              text: '切换角色',
              items: [
                { id: 'admin', text: '管理员' },
                { id: 'developer', text: '开发者' },
                { id: 'viewer', text: '查看者' }
              ]
            },
            { id: 'divider-2', type: 'divider' },
            {
              id: 'signout',
              text: '退出登录',
              onClick: () => handleSignOut()
            }
          ],
          onItemClick: ({ detail }) => {
            console.log('点击菜单项:', detail.id);
          }
        }
      ]}
    />
  );
}
```

### 6.4 最佳实践

```typescript
// ✅ 使用 identity 设置品牌
<TopNavigation
  identity={{
    href: '/',
    title: '应用名称',
    logo: { src: '/logo.svg', alt: 'Logo' }
  }}
/>

// ✅ 重要操作使用 badge 提示
{
  type: 'menu-dropdown',
  iconName: 'notification',
  badge: hasUnreadNotifications,  // 有未读通知时显示徽章
  items: notificationItems
}

// ✅ 用户菜单放在最右侧
utilities={[
  { type: 'button', text: '文档' },
  { type: 'button', iconName: 'notification' },
  { type: 'menu-dropdown', text: '用户', iconName: 'user-profile' }  // 最后
]}

// ❌ 不要放置过多工具栏项
utilities={[
  // ... 超过 5 个项目会自动收起到溢出菜单
]}
```

### 6.5 注意事项

⚠️ **重要提示：**

1. **响应式行为**
   - 小屏幕时，工具栏项会自动收起到溢出菜单
   - 使用 `disableUtilityCollapse` 可以防止特定项被收起

2. **搜索框**
   - 搜索框会占据较大空间
   - 建议使用 Autosuggest 提供搜索建议

3. **菜单嵌套**
   - 支持二级菜单嵌套
   - 不建议超过两级

---

*（继续下一个组件...）*
