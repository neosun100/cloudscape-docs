# 模块 01: 布局组件

> **模块**: 布局组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐ 中等  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

布局组件是 Cloudscape 应用的基础，负责页面的整体结构和内容组织。掌握这些组件是使用 Cloudscape 的第一步。

### 本模块包含的组件

1. **AppLayout** - 应用主布局（最重要）
2. **ContentLayout** - 内容布局
3. **ColumnLayout** - 列布局
4. **Grid** - 网格布局
5. **SpaceBetween** - 间距布局（最常用）

### 学习顺序建议

```
1. SpaceBetween（最简单，最常用）
   ↓
2. AppLayout（核心布局）
   ↓
3. ContentLayout（配合 AppLayout）
   ↓
4. ColumnLayout（响应式列布局）
   ↓
5. Grid（复杂网格布局）
```

---

## 目录

1. [AppLayout - 应用主布局](#1-applayout---应用主布局)
2. [ContentLayout - 内容布局](#2-contentlayout---内容布局)
3. [ColumnLayout - 列布局](#3-columnlayout---列布局)
4. [Grid - 网格布局](#4-grid---网格布局)
5. [SpaceBetween - 间距布局](#5-spacebetween---间距布局)
6. [模块总结](#模块总结)

---

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



---

## 模块总结

### 组件对比

| 组件 | 用途 | 响应式 | 复杂度 | 使用频率 |
|------|------|--------|--------|----------|
| AppLayout | 应用整体框架 | ✅ | ⭐⭐⭐⭐ | 每个应用 1 次 |
| ContentLayout | 页面内容结构 | ✅ | ⭐⭐ | 每个页面 1 次 |
| SpaceBetween | 元素间距 | ❌ | ⭐ | 非常频繁 |
| ColumnLayout | 多列布局 | ✅ | ⭐⭐ | 经常使用 |
| Grid | 精确网格布局 | ✅ | ⭐⭐⭐ | 偶尔使用 |

### 选择指南

**什么时候用 SpaceBetween？**
- ✅ 需要在元素之间添加统一间距
- ✅ 垂直或水平排列元素
- ✅ 最常用的布局组件

**什么时候用 ColumnLayout？**
- ✅ 需要多列响应式布局
- ✅ 列数会根据屏幕大小变化
- ✅ 内容块大小相似

**什么时候用 Grid？**
- ✅ 需要精确控制列宽和位置
- ✅ 复杂的响应式布局
- ✅ 需要偏移和推拉

**什么时候用 ContentLayout？**
- ✅ 在 AppLayout 内部组织页面内容
- ✅ 需要 Hero Header
- ✅ 需要侧边栏

### 综合示例：完整页面布局

```typescript
import {
  AppLayout,
  ContentLayout,
  SideNavigation,
  TopNavigation,
  BreadcrumbGroup,
  Header,
  Container,
  SpaceBetween,
  ColumnLayout,
  Button
} from '@cloudscape-design/components';

function CompletePage() {
  return (
    <>
      {/* 顶部导航 */}
      <TopNavigation
        identity={{ href: '/', title: '我的应用' }}
        utilities={[
          { type: 'button', text: '文档' },
          { type: 'menu-dropdown', text: '用户', iconName: 'user-profile', items: [] }
        ]}
      />
      
      {/* 应用布局 */}
      <AppLayout
        navigation={
          <SideNavigation
            items={[
              { type: 'link', text: '仪表盘', href: '/dashboard' },
              { type: 'link', text: '服务器', href: '/servers' }
            ]}
          />
        }
        
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: '首页', href: '/' },
              { text: '服务器', href: '/servers' }
            ]}
          />
        }
        
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button>刷新</Button>
                    <Button variant="primary">新建服务器</Button>
                  </SpaceBetween>
                }
              >
                服务器管理
              </Header>
            }
          >
            <SpaceBetween size="l">
              {/* 统计卡片 */}
              <ColumnLayout columns={4} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">总数</Box>
                  <Box variant="h2">128</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">运行中</Box>
                  <Box variant="h2" color="text-status-success">115</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">已停止</Box>
                  <Box variant="h2" color="text-status-error">8</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">告警</Box>
                  <Box variant="h2" color="text-status-warning">5</Box>
                </div>
              </ColumnLayout>
              
              {/* 服务器列表 */}
              <Container>
                <Table
                  items={servers}
                  columnDefinitions={columnDefs}
                />
              </Container>
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
```

### 布局组件组合模式

**模式 1：标准后台页面**
```
AppLayout
└── ContentLayout
    └── SpaceBetween
        ├── Container（统计）
        ├── Container（表格）
        └── Container（图表）
```

**模式 2：仪表盘页面**
```
AppLayout
└── ContentLayout
    └── SpaceBetween
        ├── ColumnLayout（统计卡片）
        └── Grid（图表网格）
```

**模式 3：表单页面**
```
AppLayout
└── ContentLayout
    └── Form
        └── SpaceBetween
            ├── Container（基本信息）
            ├── Container（高级配置）
            └── 按钮组
```

---

## 🎓 学习检查清单

完成本模块后，你应该能够：

- [ ] 使用 AppLayout 创建完整的应用框架
- [ ] 理解 navigationOpen、toolsOpen 等状态管理
- [ ] 使用 ContentLayout 组织页面内容
- [ ] 使用 SpaceBetween 控制元素间距
- [ ] 使用 ColumnLayout 创建响应式多列布局
- [ ] 使用 Grid 实现复杂的网格布局
- [ ] 理解响应式断点系统
- [ ] 知道何时使用哪个布局组件
- [ ] 能够组合多个布局组件构建完整页面

---

## 📚 相关资源

- [官方文档 - AppLayout](https://cloudscape.design/components/app-layout/)
- [官方文档 - ContentLayout](https://cloudscape.design/components/content-layout/)
- [官方文档 - SpaceBetween](https://cloudscape.design/components/space-between/)
- [返回主索引](./COMPONENTS_INDEX.md)
- [下一模块：导航组件](./COMPONENTS_02_NAVIGATION.md)

---

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 09:54  
**下一步**: 学习导航组件模块
