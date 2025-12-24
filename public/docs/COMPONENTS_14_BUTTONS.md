# 模块 14: 按钮组件

> **模块**: 按钮组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐ 简单  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

按钮组件是用户界面中最基础的交互元素，用于触发操作、导航和状态切换。

### 本模块包含的组件

1. **Button** - 基础按钮
2. **ButtonDropdown** - 下拉按钮
3. **ButtonGroup** - 按钮组
4. **ToggleButton** - 切换按钮
5. **CopyToClipboard** - 复制按钮

---

## 1. Button - 基础按钮

### 1.1 组件概述
最基础的按钮组件，支持多种样式和状态，用于触发各种操作。

### 1.2 完整 API
```typescript
interface ButtonProps {
  variant?: 'primary' | 'normal' | 'link' | 'icon' | 'inline-icon';
  size?: 'small' | 'normal';
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  disabledReason?: string;
  iconName?: string;
  iconAlign?: 'left' | 'right';
  iconSvg?: React.ReactNode;
  iconUrl?: string;
  iconAlt?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  formAction?: 'none' | 'submit';
  fullWidth?: boolean;
  wrapText?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  onClick?: (event: CustomEvent) => void;
  onFollow?: (event: CustomEvent<{ href: string; target?: string; }>) => void;
  children?: React.ReactNode;
}
```

### 1.3 基础示例
```typescript
import Button from '@cloudscape-design/components/button';

// 基本按钮
<Button>默认按钮</Button>

// 主要按钮
<Button variant="primary">主要操作</Button>

// 带图标的按钮
<Button iconName="add-plus">添加项目</Button>

// 链接按钮
<Button variant="link" href="/help">帮助文档</Button>

// 加载状态
<Button loading loadingText="保存中...">保存</Button>

// 禁用状态
<Button disabled disabledReason="权限不足">删除</Button>
```

### 1.4 进阶示例
```typescript
// 异步操作按钮
function AsyncButton() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await saveData();
      showNotification('保存成功');
    } catch (error) {
      showNotification('保存失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      loading={loading}
      loadingText="保存中..."
      onClick={handleSave}
    >
      保存配置
    </Button>
  );
}

// 条件禁用按钮
function ConditionalButton({ hasPermission, isValid }) {
  const getDisabledReason = () => {
    if (!hasPermission) return '权限不足';
    if (!isValid) return '表单验证失败';
    return undefined;
  };

  return (
    <Button
      variant="primary"
      disabled={!hasPermission || !isValid}
      disabledReason={getDisabledReason()}
    >
      提交
    </Button>
  );
}

// 文件下载按钮
<Button
  iconName="download"
  href="/api/reports/export"
  download="report.csv"
  target="_blank"
>
  导出报告
</Button>
```

### 1.5 最佳实践
- 使用 `variant="primary"` 突出主要操作
- 异步操作时显示加载状态
- 提供清晰的禁用原因
- 图标与文字保持语义一致

### 1.6 常见场景
```typescript
// 表单提交
<Button variant="primary" formAction="submit">提交</Button>

// 危险操作
<Button variant="primary" iconName="remove">删除</Button>

// 次要操作
<Button>取消</Button>

// 帮助链接
<Button variant="link" iconName="external">查看文档</Button>
```

### 1.7 注意事项
- 避免在一个界面中使用过多主要按钮
- 加载状态下自动禁用点击
- 链接按钮需要提供 `href` 属性

---

## 2. ButtonDropdown - 下拉按钮

### 2.1 组件概述
带下拉菜单的按钮，用于提供多个相关操作选项。

### 2.2 完整 API
```typescript
interface ButtonDropdownProps {
  items: Array<{
    id: string;
    text: string;
    description?: string;
    disabled?: boolean;
    disabledReason?: string;
    iconName?: string;
    iconSvg?: React.ReactNode;
    iconUrl?: string;
    iconAlt?: string;
    href?: string;
    target?: string;
    rel?: string;
    items?: Array</* 嵌套项 */>;
  }>;
  variant?: 'primary' | 'normal' | 'icon';
  size?: 'small' | 'normal';
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  disabledReason?: string;
  expandToViewport?: boolean;
  mainAction?: {
    text: string;
    onClick?: (event: CustomEvent) => void;
  };
  ariaLabel?: string;
  onItemClick?: (event: CustomEvent<{ id: string; }>) => void;
  onItemFollow?: (event: CustomEvent<{ id: string; href: string; }>) => void;
  children?: React.ReactNode;
}
```

### 2.3 基础示例
```typescript
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

// 基本下拉按钮
<ButtonDropdown
  items={[
    { id: 'edit', text: '编辑', iconName: 'edit' },
    { id: 'copy', text: '复制', iconName: 'copy' },
    { id: 'delete', text: '删除', iconName: 'remove' }
  ]}
  onItemClick={({ detail }) => handleAction(detail.id)}
>
  操作
</ButtonDropdown>

// 带主操作的下拉按钮
<ButtonDropdown
  variant="primary"
  mainAction={{
    text: '创建实例',
    onClick: () => createInstance()
  }}
  items={[
    { id: 'template', text: '从模板创建' },
    { id: 'import', text: '导入配置' }
  ]}
/>
```

### 2.4 进阶示例
```typescript
// 分组菜单
<ButtonDropdown
  items={[
    {
      text: '文件操作',
      items: [
        { id: 'new', text: '新建文件', iconName: 'add-plus' },
        { id: 'open', text: '打开文件', iconName: 'folder-open' }
      ]
    },
    {
      text: '编辑操作', 
      items: [
        { id: 'cut', text: '剪切', iconName: 'cut' },
        { id: 'copy', text: '复制', iconName: 'copy' },
        { id: 'paste', text: '粘贴', iconName: 'paste' }
      ]
    }
  ]}
  onItemClick={({ detail }) => handleMenuAction(detail.id)}
>
  文件
</ButtonDropdown>

// 条件菜单项
function ConditionalDropdown({ permissions }) {
  const items = [
    { id: 'view', text: '查看详情' },
    ...(permissions.edit ? [{ id: 'edit', text: '编辑' }] : []),
    ...(permissions.delete ? [{ 
      id: 'delete', 
      text: '删除',
      disabled: !permissions.canDelete,
      disabledReason: '存在依赖项'
    }] : [])
  ];

  return (
    <ButtonDropdown items={items} onItemClick={handleAction}>
      管理
    </ButtonDropdown>
  );
}

// 链接菜单项
<ButtonDropdown
  items={[
    { id: 'docs', text: '文档', href: '/docs', target: '_blank' },
    { id: 'api', text: 'API 参考', href: '/api-docs' },
    { id: 'support', text: '技术支持', href: '/support' }
  ]}
  onItemFollow={({ detail }) => trackLinkClick(detail.id)}
>
  帮助
</ButtonDropdown>
```

### 2.5 最佳实践
- 相关操作分组显示
- 危险操作放在菜单底部
- 提供图标增强识别度
- 使用描述文字解释复杂操作

### 2.6 常见场景
```typescript
// 批量操作
<ButtonDropdown
  items={[
    { id: 'start', text: '启动选中项' },
    { id: 'stop', text: '停止选中项' },
    { id: 'delete', text: '删除选中项' }
  ]}
  disabled={selectedItems.length === 0}
  disabledReason="请先选择项目"
>
  批量操作
</ButtonDropdown>

// 导出选项
<ButtonDropdown
  items={[
    { id: 'csv', text: 'CSV 格式' },
    { id: 'excel', text: 'Excel 格式' },
    { id: 'pdf', text: 'PDF 格式' }
  ]}
>
  导出
</ButtonDropdown>
```

### 2.7 注意事项
- 菜单项过多时考虑分组
- 避免嵌套层级过深
- 主操作应该是最常用的操作

---

## 3. ButtonGroup - 按钮组

### 3.1 组件概述
将相关按钮组合在一起，提供统一的视觉效果和间距。

### 3.2 完整 API
```typescript
interface ButtonGroupProps {
  variant?: 'primary' | 'normal';
  size?: 'small' | 'normal';
  ariaLabel?: string;
  children: React.ReactNode;
}
```

### 3.3 基础示例
```typescript
import ButtonGroup from '@cloudscape-design/components/button-group';
import Button from '@cloudscape-design/components/button';

// 基本按钮组
<ButtonGroup>
  <Button>取消</Button>
  <Button variant="primary">确认</Button>
</ButtonGroup>

// 工具栏按钮组
<ButtonGroup>
  <Button iconName="undo">撤销</Button>
  <Button iconName="redo">重做</Button>
  <Button iconName="copy">复制</Button>
  <Button iconName="paste">粘贴</Button>
</ButtonGroup>
```

### 3.4 进阶示例
```typescript
// 表单操作按钮组
function FormActions({ onSave, onCancel, onReset, isDirty, isValid }) {
  return (
    <ButtonGroup>
      <Button onClick={onReset} disabled={!isDirty}>
        重置
      </Button>
      <Button onClick={onCancel}>
        取消
      </Button>
      <Button 
        variant="primary" 
        onClick={onSave}
        disabled={!isValid}
      >
        保存
      </Button>
    </ButtonGroup>
  );
}

// 分页按钮组
function PaginationButtons({ currentPage, totalPages, onPageChange }) {
  return (
    <ButtonGroup>
      <Button 
        iconName="angle-left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        上一页
      </Button>
      <Button disabled>
        {currentPage} / {totalPages}
      </Button>
      <Button 
        iconName="angle-right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        下一页
      </Button>
    </ButtonGroup>
  );
}

// 视图切换按钮组
function ViewToggle({ view, onViewChange }) {
  return (
    <ButtonGroup>
      <Button 
        variant={view === 'list' ? 'primary' : 'normal'}
        iconName="list"
        onClick={() => onViewChange('list')}
      >
        列表
      </Button>
      <Button 
        variant={view === 'grid' ? 'primary' : 'normal'}
        iconName="grid"
        onClick={() => onViewChange('grid')}
      >
        网格
      </Button>
      <Button 
        variant={view === 'card' ? 'primary' : 'normal'}
        iconName="cards"
        onClick={() => onViewChange('card')}
      >
        卡片
      </Button>
    </ButtonGroup>
  );
}
```

### 3.5 最佳实践
- 将相关功能的按钮组合
- 主要操作放在右侧
- 保持按钮数量适中（3-5个）
- 使用一致的按钮尺寸

### 3.6 常见场景
```typescript
// 对话框按钮
<ButtonGroup>
  <Button>取消</Button>
  <Button variant="primary">确认</Button>
</ButtonGroup>

// 编辑工具栏
<ButtonGroup>
  <Button iconName="format-bold">粗体</Button>
  <Button iconName="format-italic">斜体</Button>
  <Button iconName="format-underline">下划线</Button>
</ButtonGroup>

// 状态操作
<ButtonGroup>
  <Button iconName="play">启动</Button>
  <Button iconName="pause">暂停</Button>
  <Button iconName="stop">停止</Button>
</ButtonGroup>
```

### 3.7 注意事项
- 避免在按钮组中混用不同尺寸
- 确保按钮之间的逻辑关联性
- 考虑移动端的触摸友好性

---

## 4. ToggleButton - 切换按钮

### 4.1 组件概述
用于在两个状态之间切换的按钮，类似开关功能。

### 4.2 完整 API
```typescript
interface ToggleButtonProps {
  pressed?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  size?: 'small' | 'normal';
  iconName?: string;
  iconSvg?: React.ReactNode;
  iconUrl?: string;
  iconAlt?: string;
  pressedIconName?: string;
  pressedIconSvg?: React.ReactNode;
  pressedIconUrl?: string;
  pressedIconAlt?: string;
  pressedText?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  onChange?: (event: CustomEvent<{ pressed: boolean; }>) => void;
  children?: React.ReactNode;
}
```

### 4.3 基础示例
```typescript
import ToggleButton from '@cloudscape-design/components/toggle-button';

// 基本切换按钮
<ToggleButton
  pressed={isBookmarked}
  onChange={({ detail }) => setIsBookmarked(detail.pressed)}
  iconName="star"
  pressedIconName="star-filled"
>
  收藏
</ToggleButton>

// 通知开关
<ToggleButton
  pressed={notificationsEnabled}
  onChange={({ detail }) => setNotificationsEnabled(detail.pressed)}
  iconName="notification"
  pressedText="已开启"
>
  通知
</ToggleButton>
```

### 4.4 进阶示例
```typescript
// 功能开关组
function FeatureToggles({ features, onFeatureChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <ToggleButton
        pressed={features.autoSave}
        onChange={({ detail }) => 
          onFeatureChange('autoSave', detail.pressed)
        }
        iconName="check"
      >
        自动保存
      </ToggleButton>
      
      <ToggleButton
        pressed={features.darkMode}
        onChange={({ detail }) => 
          onFeatureChange('darkMode', detail.pressed)
        }
        iconName="moon"
        pressedIconName="sun"
        pressedText="浅色模式"
      >
        深色模式
      </ToggleButton>
      
      <ToggleButton
        pressed={features.notifications}
        onChange={({ detail }) => 
          onFeatureChange('notifications', detail.pressed)
        }
        iconName="notification"
        pressedIconName="notification-off"
      >
        通知
      </ToggleButton>
    </div>
  );
}

// 视图选项切换
function ViewOptions({ options, onOptionChange }) {
  return (
    <ButtonGroup>
      <ToggleButton
        pressed={options.showGrid}
        onChange={({ detail }) => 
          onOptionChange('showGrid', detail.pressed)
        }
        iconName="grid"
      >
        网格
      </ToggleButton>
      
      <ToggleButton
        pressed={options.showLabels}
        onChange={({ detail }) => 
          onOptionChange('showLabels', detail.pressed)
        }
        iconName="tag"
      >
        标签
      </ToggleButton>
      
      <ToggleButton
        pressed={options.showDetails}
        onChange={({ detail }) => 
          onOptionChange('showDetails', detail.pressed)
        }
        iconName="view-full"
      >
        详情
      </ToggleButton>
    </ButtonGroup>
  );
}

// 权限控制的切换
function PermissionToggle({ permission, hasAccess, onToggle }) {
  return (
    <ToggleButton
      pressed={permission.enabled}
      disabled={!hasAccess}
      disabledReason={!hasAccess ? '权限不足' : undefined}
      onChange={({ detail }) => onToggle(permission.id, detail.pressed)}
      iconName={permission.enabled ? 'check' : 'close'}
    >
      {permission.name}
    </ToggleButton>
  );
}
```

### 4.5 最佳实践
- 提供清晰的状态指示
- 使用合适的图标表示状态
- 状态变化要有即时反馈
- 考虑提供状态说明文字

### 4.6 常见场景
```typescript
// 列表项操作
<ToggleButton
  pressed={item.isSelected}
  onChange={({ detail }) => toggleSelection(item.id, detail.pressed)}
  iconName="check"
>
  选择
</ToggleButton>

// 功能启用/禁用
<ToggleButton
  pressed={service.enabled}
  onChange={({ detail }) => toggleService(service.id, detail.pressed)}
  iconName="status-positive"
  pressedIconName="status-negative"
>
  服务状态
</ToggleButton>

// 显示/隐藏控制
<ToggleButton
  pressed={showAdvanced}
  onChange={({ detail }) => setShowAdvanced(detail.pressed)}
  iconName="expand"
  pressedIconName="collapse"
>
  高级选项
</ToggleButton>
```

### 4.7 注意事项
- 确保状态变化的视觉反馈明显
- 避免与单选/多选功能混淆
- 考虑提供状态变化的确认机制

---

## 5. CopyToClipboard - 复制按钮

### 5.1 组件概述
专门用于复制文本到剪贴板的按钮组件，提供复制反馈。

### 5.2 完整 API
```typescript
interface CopyToClipboardProps {
  copyText: string;
  copyButtonText?: string;
  copySuccessText?: string;
  copyErrorText?: string;
  textToCopy?: string; // 已废弃，使用 copyText
  variant?: 'button' | 'icon';
  size?: 'small' | 'normal';
  disabled?: boolean;
  onCopyResult?: (event: CustomEvent<{ 
    text: string; 
    success: boolean; 
  }>) => void;
}
```

### 5.3 基础示例
```typescript
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';

// 基本复制按钮
<CopyToClipboard
  copyText="https://example.com/api/v1/users"
  copyButtonText="复制链接"
  copySuccessText="已复制"
/>

// 图标样式
<CopyToClipboard
  variant="icon"
  copyText={apiKey}
  copyButtonText="复制 API 密钥"
/>
```

### 5.4 进阶示例
```typescript
// 代码复制组件
function CodeBlock({ code, language }) {
  return (
    <div style={{ position: 'relative' }}>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '16px',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
        <code>{code}</code>
      </pre>
      <div style={{ 
        position: 'absolute', 
        top: '8px', 
        right: '8px' 
      }}>
        <CopyToClipboard
          variant="icon"
          copyText={code}
          copyButtonText="复制代码"
          copySuccessText="代码已复制"
          onCopyResult={({ detail }) => {
            if (detail.success) {
              trackEvent('code_copied', { language });
            }
          }}
        />
      </div>
    </div>
  );
}

// 配置信息复制
function ConfigDisplay({ config }) {
  const configText = JSON.stringify(config, null, 2);
  
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>配置信息</h3>
        <CopyToClipboard
          copyText={configText}
          copyButtonText="复制配置"
          copySuccessText="配置已复制到剪贴板"
          onCopyResult={({ detail }) => {
            showNotification(
              detail.success ? '配置复制成功' : '复制失败，请手动选择',
              detail.success ? 'success' : 'error'
            );
          }}
        />
      </div>
      <pre style={{ background: '#f9f9f9', padding: '12px' }}>
        {configText}
      </pre>
    </Container>
  );
}

// 分享链接组件
function ShareLink({ url, title }) {
  const shareText = `${title} - ${url}`;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    }}>
      <Input value={url} readOnly />
      <CopyToClipboard
        variant="icon"
        copyText={shareText}
        copyButtonText="复制分享链接"
        copySuccessText="链接已复制"
      />
    </div>
  );
}

// 批量复制选项
function BatchCopyOptions({ items }) {
  const copyAllIds = () => items.map(item => item.id).join('\n');
  const copyAllNames = () => items.map(item => item.name).join('\n');
  const copyAllUrls = () => items.map(item => item.url).join('\n');

  return (
    <ButtonGroup>
      <CopyToClipboard
        copyText={copyAllIds()}
        copyButtonText="复制 ID"
        size="small"
      />
      <CopyToClipboard
        copyText={copyAllNames()}
        copyButtonText="复制名称"
        size="small"
      />
      <CopyToClipboard
        copyText={copyAllUrls()}
        copyButtonText="复制链接"
        size="small"
      />
    </ButtonGroup>
  );
}
```

### 5.5 最佳实践
- 提供清晰的复制成功反馈
- 复制内容要有实际价值
- 考虑复制失败的降级方案
- 在代码块和配置信息中使用

### 5.6 常见场景
```typescript
// API 端点复制
<CopyToClipboard
  copyText="curl -X GET https://api.example.com/users"
  copyButtonText="复制 cURL 命令"
/>

// 错误信息复制
<CopyToClipboard
  copyText={errorDetails}
  copyButtonText="复制错误信息"
  variant="icon"
/>

// 邀请链接复制
<CopyToClipboard
  copyText={inviteUrl}
  copyButtonText="复制邀请链接"
  copySuccessText="邀请链接已复制，可以分享给其他人"
/>
```

### 5.7 注意事项
- 浏览器兼容性考虑
- 复制内容的格式化
- 提供复制失败时的用户指导
- 避免复制敏感信息

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 基础操作 | Button |
| 多个操作选项 | ButtonDropdown |
| 相关按钮组合 | ButtonGroup |
| 状态切换 | ToggleButton |
| 文本复制 | CopyToClipboard |

### 最佳实践

```typescript
// ✅ 合理使用按钮层级
<ButtonGroup>
  <Button>取消</Button>           {/* 次要操作 */}
  <Button variant="primary">保存</Button>  {/* 主要操作 */}
</ButtonGroup>

// ✅ 提供操作反馈
<Button 
  loading={saving}
  loadingText="保存中..."
  onClick={handleSave}
>
  保存
</Button>

// ✅ 组合使用按钮组件
<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
  <ButtonDropdown items={actions}>操作</ButtonDropdown>
  <ToggleButton pressed={enabled} onChange={handleToggle}>
    启用功能
  </ToggleButton>
  <CopyToClipboard copyText={data} variant="icon" />
</div>
```

### 常见模式

```typescript
// 表单操作区
function FormActions({ onSave, onCancel, isDirty, isValid }) {
  return (
    <ButtonGroup>
      <Button onClick={onCancel}>取消</Button>
      <Button 
        variant="primary"
        disabled={!isDirty || !isValid}
        onClick={onSave}
      >
        保存更改
      </Button>
    </ButtonGroup>
  );
}

// 工具栏
function Toolbar({ selectedItems, onAction }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ButtonDropdown
        items={[
          { id: 'edit', text: '编辑' },
          { id: 'duplicate', text: '复制' },
          { id: 'delete', text: '删除' }
        ]}
        disabled={selectedItems.length === 0}
        onItemClick={({ detail }) => onAction(detail.id)}
      >
        操作
      </ButtonDropdown>
      
      <ToggleButton
        pressed={showDetails}
        onChange={({ detail }) => setShowDetails(detail.pressed)}
      >
        显示详情
      </ToggleButton>
    </div>
  );
}
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据可视化](./COMPONENTS_13_VISUALIZATION.md) | [下一模块：反馈组件](./COMPONENTS_15_FEEDBACK.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15