# 模块 09: 数据列表组件

> **模块**: 数据列表组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐⭐⭐ 较难  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

数据列表组件用于展示和管理大量结构化数据，提供筛选、排序、分页等功能。

### 本模块包含的组件

1. **Cards** - 卡片列表展示
2. **PropertyFilter** - 属性筛选器
3. **TextFilter** - 文本筛选器
4. **CollectionPreferences** - 集合偏好设置
5. **Pagination** - 分页导航

---

## 1. Cards - 卡片列表

### 1.1 组件概述
以卡片形式展示数据列表，支持选择、排序和筛选。

### 1.2 完整 API
```typescript
interface CardsProps<T> {
  items: T[];
  cardDefinition: {
    header?: (item: T) => React.ReactNode;
    sections?: Array<{
      id: string;
      header?: React.ReactNode;
      content: (item: T) => React.ReactNode;
    }>;
  };
  selectionType?: 'single' | 'multi';
  selectedItems?: T[];
  onSelectionChange?: (event: { detail: { selectedItems: T[] } }) => void;
  trackBy?: (item: T) => string;
  loading?: boolean;
  loadingText?: string;
  empty?: React.ReactNode;
  header?: React.ReactNode;
  filter?: React.ReactNode;
  pagination?: React.ReactNode;
  preferences?: React.ReactNode;
  cardsPerRow?: Array<{ cards: number; minWidth?: number }>;
}
```

### 1.3 基础示例
```typescript
const servers = [
  { id: '1', name: 'srv-001', status: 'running', cpu: 45 },
  { id: '2', name: 'srv-002', status: 'stopped', cpu: 0 }
];

<Cards
  items={servers}
  cardDefinition={{
    header: (item) => item.name,
    sections: [
      {
        id: 'status',
        header: '状态',
        content: (item) => (
          <StatusIndicator type={item.status === 'running' ? 'success' : 'stopped'}>
            {item.status}
          </StatusIndicator>
        )
      },
      {
        id: 'metrics',
        header: '指标',
        content: (item) => `CPU: ${item.cpu}%`
      }
    ]
  }}
  selectionType="multi"
  cardsPerRow={[
    { cards: 1 },
    { cards: 2, minWidth: 500 },
    { cards: 3, minWidth: 800 }
  ]}
/>
```

### 1.4 进阶示例
```typescript
function ServerCards() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Cards
      items={servers}
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      loading={loading}
      loadingText="加载服务器..."
      empty={
        <Box textAlign="center" color="inherit">
          <b>没有服务器</b>
          <Box variant="p" color="inherit">
            点击创建按钮添加服务器
          </Box>
        </Box>
      }
      header={
        <Header
          counter={`(${servers.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>
                停止
              </Button>
              <Button variant="primary">创建服务器</Button>
            </SpaceBetween>
          }
        >
          服务器
        </Header>
      }
      cardDefinition={{
        header: (item) => (
          <Link href={`/servers/${item.id}`}>{item.name}</Link>
        ),
        sections: [
          {
            id: 'main',
            content: (item) => (
              <SpaceBetween size="s">
                <div>
                  <Box variant="awsui-key-label">状态</Box>
                  <StatusIndicator type={item.status === 'running' ? 'success' : 'stopped'}>
                    {item.status}
                  </StatusIndicator>
                </div>
                <div>
                  <Box variant="awsui-key-label">实例类型</Box>
                  {item.instanceType}
                </div>
                <div>
                  <Box variant="awsui-key-label">可用区</Box>
                  {item.availabilityZone}
                </div>
              </SpaceBetween>
            )
          }
        ]
      }}
    />
  );
}
```

### 1.5 最佳实践
- 使用 `trackBy` 优化大列表性能
- 提供有意义的空状态
- 合理设置响应式卡片布局
- 使用加载状态提升用户体验

### 1.6 常见场景
- 服务器/实例列表
- 产品目录展示
- 文件/文档管理
- 用户/团队管理

### 1.7 注意事项
- 避免在卡片中放置过多信息
- 确保卡片高度一致性
- 考虑移动端适配

---

## 2. PropertyFilter - 属性筛选器

### 2.1 组件概述
强大的属性筛选组件，支持多种数据类型和操作符。

### 2.2 完整 API
```typescript
interface PropertyFilterProps {
  query: Query;
  onChange: (event: { detail: Query }) => void;
  filteringProperties: Array<{
    key: string;
    propertyLabel: string;
    groupValuesLabel: string;
    operators?: Array<'=' | '!=' | ':' | '!:' | '<' | '<=' | '>' | '>='>;
  }>;
  filteringOptions?: Array<{
    propertyKey: string;
    value: string;
    label?: string;
  }>;
  customControl?: React.ReactNode;
  disabled?: boolean;
  countText?: string;
  enableTokenGroups?: boolean;
  expandToViewport?: boolean;
  hideOperations?: boolean;
  virtualScroll?: boolean;
  tokenLimit?: number;
  i18nStrings: {
    filteringAriaLabel: string;
    dismissAriaLabel: string;
    filteringPlaceholder: string;
    groupValuesText: string;
    groupPropertiesText: string;
    operatorsText: string;
    operationAndText: string;
    operationOrText: string;
    operatorLessText: string;
    operatorLessOrEqualText: string;
    operatorGreaterText: string;
    operatorGreaterOrEqualText: string;
    operatorContainsText: string;
    operatorDoesNotContainText: string;
    operatorEqualsText: string;
    operatorDoesNotEqualText: string;
    editTokenHeader: string;
    propertyText: string;
    operatorText: string;
    valueText: string;
    cancelActionText: string;
    applyActionText: string;
    allPropertiesLabel: string;
    tokenLimitShowMore: string;
    tokenLimitShowFewer: string;
    clearFiltersText: string;
    removeTokenButtonAriaLabel: (token: string) => string;
    enteredTextLabel: (text: string) => string;
  };
}
```

### 2.3 基础示例
```typescript
const [query, setQuery] = useState({ tokens: [], operation: 'and' });

<PropertyFilter
  query={query}
  onChange={({ detail }) => setQuery(detail)}
  filteringProperties={[
    {
      key: 'name',
      propertyLabel: '名称',
      groupValuesLabel: '名称值',
      operators: [':', '!:', '=', '!=']
    },
    {
      key: 'status',
      propertyLabel: '状态',
      groupValuesLabel: '状态值',
      operators: ['=', '!=']
    },
    {
      key: 'cpu',
      propertyLabel: 'CPU使用率',
      groupValuesLabel: 'CPU值',
      operators: ['=', '!=', '<', '<=', '>', '>=']
    }
  ]}
  filteringOptions={[
    { propertyKey: 'status', value: 'running', label: '运行中' },
    { propertyKey: 'status', value: 'stopped', label: '已停止' },
    { propertyKey: 'status', value: 'pending', label: '启动中' }
  ]}
  i18nStrings={{
    filteringAriaLabel: '筛选服务器',
    dismissAriaLabel: '关闭',
    filteringPlaceholder: '按属性筛选服务器',
    groupValuesText: '值',
    groupPropertiesText: '属性',
    operatorsText: '操作符',
    operationAndText: '且',
    operationOrText: '或',
    operatorLessText: '小于',
    operatorLessOrEqualText: '小于等于',
    operatorGreaterText: '大于',
    operatorGreaterOrEqualText: '大于等于',
    operatorContainsText: '包含',
    operatorDoesNotContainText: '不包含',
    operatorEqualsText: '等于',
    operatorDoesNotEqualText: '不等于',
    editTokenHeader: '编辑筛选条件',
    propertyText: '属性',
    operatorText: '操作符',
    valueText: '值',
    cancelActionText: '取消',
    applyActionText: '应用',
    allPropertiesLabel: '所有属性',
    tokenLimitShowMore: '显示更多',
    tokenLimitShowFewer: '显示更少',
    clearFiltersText: '清除筛选',
    removeTokenButtonAriaLabel: (token) => `删除筛选条件 ${token}`,
    enteredTextLabel: (text) => `使用: "${text}"`
  }}
/>
```

### 2.4 进阶示例
```typescript
function ServerPropertyFilter() {
  const [query, setQuery] = useState({ tokens: [], operation: 'and' });
  const [filteredItems, setFilteredItems] = useState(servers);

  // 筛选逻辑
  useEffect(() => {
    const filtered = servers.filter(item => {
      return query.tokens.every(token => {
        const { propertyKey, operator, value } = token;
        const itemValue = item[propertyKey];
        
        switch (operator) {
          case '=': return itemValue === value;
          case '!=': return itemValue !== value;
          case ':': return String(itemValue).includes(value);
          case '!:': return !String(itemValue).includes(value);
          case '<': return Number(itemValue) < Number(value);
          case '<=': return Number(itemValue) <= Number(value);
          case '>': return Number(itemValue) > Number(value);
          case '>=': return Number(itemValue) >= Number(value);
          default: return true;
        }
      });
    });
    setFilteredItems(filtered);
  }, [query]);

  return (
    <SpaceBetween size="l">
      <PropertyFilter
        query={query}
        onChange={({ detail }) => setQuery(detail)}
        countText={`${filteredItems.length} 个匹配项`}
        enableTokenGroups
        expandToViewport
        filteringProperties={[
          {
            key: 'name',
            propertyLabel: '服务器名称',
            groupValuesLabel: '服务器名称',
            operators: [':', '!:', '=', '!=']
          },
          {
            key: 'instanceType',
            propertyLabel: '实例类型',
            groupValuesLabel: '实例类型',
            operators: ['=', '!=']
          },
          {
            key: 'status',
            propertyLabel: '状态',
            groupValuesLabel: '状态',
            operators: ['=', '!=']
          },
          {
            key: 'cpu',
            propertyLabel: 'CPU使用率(%)',
            groupValuesLabel: 'CPU使用率',
            operators: ['=', '!=', '<', '<=', '>', '>=']
          },
          {
            key: 'memory',
            propertyLabel: '内存使用率(%)',
            groupValuesLabel: '内存使用率',
            operators: ['=', '!=', '<', '<=', '>', '>=']
          }
        ]}
        filteringOptions={[
          { propertyKey: 'status', value: 'running', label: '运行中' },
          { propertyKey: 'status', value: 'stopped', label: '已停止' },
          { propertyKey: 'status', value: 'pending', label: '启动中' },
          { propertyKey: 'instanceType', value: 't3.micro', label: 't3.micro' },
          { propertyKey: 'instanceType', value: 't3.small', label: 't3.small' },
          { propertyKey: 'instanceType', value: 'm5.large', label: 'm5.large' }
        ]}
        i18nStrings={i18nStrings}
      />
      
      <Table
        items={filteredItems}
        columnDefinitions={columnDefinitions}
        header={<Header counter={`(${filteredItems.length})`}>服务器</Header>}
      />
    </SpaceBetween>
  );
}
```

### 2.5 最佳实践
- 提供预定义的筛选选项
- 使用合适的操作符类型
- 实现客户端或服务端筛选
- 保存用户筛选偏好

### 2.6 常见场景
- 数据表格筛选
- 日志查询界面
- 资源管理筛选
- 报表数据筛选

### 2.7 注意事项
- 大数据集考虑服务端筛选
- 提供清晰的筛选反馈
- 避免过于复杂的筛选条件

---

## 3. TextFilter - 文本筛选器

### 3.1 组件概述
简单的文本搜索筛选器，支持实时搜索和筛选计数。

### 3.2 完整 API
```typescript
interface TextFilterProps {
  filteringText: string;
  onChange: (event: { detail: { filteringText: string } }) => void;
  disabled?: boolean;
  countText?: string;
  filteringAriaLabel?: string;
  filteringPlaceholder?: string;
  filteringClearAriaLabel?: string;
}
```

### 3.3 基础示例
```typescript
const [filteringText, setFilteringText] = useState('');

<TextFilter
  filteringText={filteringText}
  onChange={({ detail }) => setFilteringText(detail.filteringText)}
  countText={`${filteredItems.length} 个匹配项`}
  filteringPlaceholder="搜索服务器"
  filteringAriaLabel="搜索服务器"
  filteringClearAriaLabel="清除搜索"
/>
```

### 3.4 进阶示例
```typescript
function ServerTextFilter() {
  const [filteringText, setFilteringText] = useState('');
  const [filteredItems, setFilteredItems] = useState(servers);

  // 实时搜索
  useEffect(() => {
    const filtered = servers.filter(item =>
      item.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.instanceType.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.status.toLowerCase().includes(filteringText.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [filteringText]);

  return (
    <SpaceBetween size="l">
      <TextFilter
        filteringText={filteringText}
        onChange={({ detail }) => setFilteringText(detail.filteringText)}
        countText={`${filteredItems.length} 个匹配项`}
        filteringPlaceholder="按名称、类型或状态搜索"
        filteringAriaLabel="搜索服务器"
        filteringClearAriaLabel="清除搜索条件"
      />
      
      <Table
        items={filteredItems}
        columnDefinitions={columnDefinitions}
        empty={
          <Box textAlign="center" color="inherit">
            <b>没有找到匹配的服务器</b>
            <Box variant="p" color="inherit">
              尝试调整搜索条件
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}
```

### 3.5 最佳实践
- 提供搜索范围提示
- 实现防抖优化性能
- 显示搜索结果计数
- 支持清除搜索功能

### 3.6 常见场景
- 简单列表搜索
- 快速数据查找
- 配合其他筛选器使用
- 移动端友好搜索

### 3.7 注意事项
- 大数据集使用防抖
- 考虑搜索性能优化
- 提供清晰的无结果状态

---

## 4. CollectionPreferences - 集合偏好设置

### 4.1 组件概述
用户可自定义的集合显示偏好，包括页面大小、可见列、排序等。

### 4.2 完整 API
```typescript
interface CollectionPreferencesProps {
  preferences: {
    pageSize?: number;
    visibleContent?: string[];
    wrapLines?: boolean;
    stripedRows?: boolean;
    contentDensity?: 'comfortable' | 'compact';
    stickyColumns?: { first?: number; last?: number };
    custom?: Record<string, any>;
  };
  onConfirm: (event: { detail: typeof preferences }) => void;
  onCancel?: () => void;
  disabled?: boolean;
  pageSizePreference?: {
    title: string;
    options: Array<{ value: number; label: string }>;
  };
  wrapLinesPreference?: {
    label: string;
    description: string;
  };
  stripedRowsPreference?: {
    label: string;
    description: string;
  };
  contentDensityPreference?: {
    title: string;
    description: string;
    options: Array<{
      value: 'comfortable' | 'compact';
      label: string;
      description: string;
    }>;
  };
  visibleContentPreference?: {
    title: string;
    options: Array<{
      label: string;
      value: string;
      editable?: boolean;
    }>;
  };
  stickyColumnsPreference?: {
    firstColumns: {
      title: string;
      description: string;
      options: Array<{ label: string; value: number }>;
    };
    lastColumns: {
      title: string;
      description: string;
      options: Array<{ label: string; value: number }>;
    };
  };
  customPreference?: (preferences: any, setPreferences: (prefs: any) => void) => React.ReactNode;
}
```

### 3.3 基础示例
```typescript
const [preferences, setPreferences] = useState({
  pageSize: 10,
  visibleContent: ['name', 'status', 'instanceType'],
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable'
});

<CollectionPreferences
  preferences={preferences}
  onConfirm={({ detail }) => setPreferences(detail)}
  pageSizePreference={{
    title: '页面大小',
    options: [
      { value: 10, label: '10 个服务器' },
      { value: 20, label: '20 个服务器' },
      { value: 50, label: '50 个服务器' }
    ]
  }}
  visibleContentPreference={{
    title: '选择可见列',
    options: [
      { label: '服务器名称', value: 'name' },
      { label: '状态', value: 'status' },
      { label: '实例类型', value: 'instanceType' },
      { label: 'CPU使用率', value: 'cpu' },
      { label: '内存使用率', value: 'memory' }
    ]
  }}
  wrapLinesPreference={{
    label: '换行显示',
    description: '选择是否在单元格中换行显示长文本'
  }}
  stripedRowsPreference={{
    label: '条纹行',
    description: '选择是否显示交替的行背景色'
  }}
  contentDensityPreference={{
    title: '内容密度',
    description: '选择表格行的高度',
    options: [
      {
        value: 'comfortable',
        label: '舒适',
        description: '更高的行高，便于阅读'
      },
      {
        value: 'compact',
        label: '紧凑',
        description: '较低的行高，显示更多内容'
      }
    ]
  }}
/>
```

### 4.4 进阶示例
```typescript
function ServerTableWithPreferences() {
  const [preferences, setPreferences] = useState({
    pageSize: 20,
    visibleContent: ['name', 'status', 'instanceType', 'cpu'],
    wrapLines: false,
    stripedRows: true,
    contentDensity: 'comfortable',
    stickyColumns: { first: 1, last: 0 }
  });

  const columnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => <Link href={`/servers/${item.id}`}>{item.name}</Link>,
      sortingField: 'name',
      isRowHeader: true
    },
    {
      id: 'status',
      header: '状态',
      cell: item => (
        <StatusIndicator type={item.status === 'running' ? 'success' : 'stopped'}>
          {item.status}
        </StatusIndicator>
      )
    },
    {
      id: 'instanceType',
      header: '实例类型',
      cell: item => item.instanceType
    },
    {
      id: 'cpu',
      header: 'CPU使用率',
      cell: item => `${item.cpu}%`
    },
    {
      id: 'memory',
      header: '内存使用率',
      cell: item => `${item.memory}%`
    },
    {
      id: 'actions',
      header: '操作',
      cell: item => (
        <ButtonDropdown
          items={[
            { id: 'start', text: '启动' },
            { id: 'stop', text: '停止' },
            { id: 'reboot', text: '重启' }
          ]}
        >
          操作
        </ButtonDropdown>
      )
    }
  ].filter(col => preferences.visibleContent.includes(col.id));

  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      preferences={
        <CollectionPreferences
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: '页面大小',
            options: [
              { value: 10, label: '10 个服务器' },
              { value: 20, label: '20 个服务器' },
              { value: 50, label: '50 个服务器' },
              { value: 100, label: '100 个服务器' }
            ]
          }}
          visibleContentPreference={{
            title: '选择可见列',
            options: [
              { label: '服务器名称', value: 'name' },
              { label: '状态', value: 'status' },
              { label: '实例类型', value: 'instanceType' },
              { label: 'CPU使用率', value: 'cpu' },
              { label: '内存使用率', value: 'memory' },
              { label: '操作', value: 'actions' }
            ]
          }}
          wrapLinesPreference={{
            label: '换行显示',
            description: '在单元格中换行显示长文本'
          }}
          stripedRowsPreference={{
            label: '条纹行',
            description: '显示交替的行背景色以提高可读性'
          }}
          contentDensityPreference={{
            title: '内容密度',
            description: '选择表格行的高度',
            options: [
              {
                value: 'comfortable',
                label: '舒适',
                description: '更高的行高，便于阅读'
              },
              {
                value: 'compact',
                label: '紧凑',
                description: '较低的行高，在屏幕上显示更多内容'
              }
            ]
          }}
          stickyColumnsPreference={{
            firstColumns: {
              title: '固定首列',
              description: '选择要固定在左侧的列数',
              options: [
                { label: '无', value: 0 },
                { label: '第一列', value: 1 },
                { label: '前两列', value: 2 }
              ]
            },
            lastColumns: {
              title: '固定末列',
              description: '选择要固定在右侧的列数',
              options: [
                { label: '无', value: 0 },
                { label: '最后一列', value: 1 }
              ]
            }
          }}
        />
      }
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
    />
  );
}
```

### 4.5 最佳实践
- 提供合理的默认设置
- 保存用户偏好到本地存储
- 提供重置到默认值功能
- 考虑不同屏幕尺寸的适配

### 4.6 常见场景
- 数据表格自定义
- 仪表盘布局设置
- 列表视图配置
- 用户个性化设置

### 4.7 注意事项
- 避免过多配置选项
- 确保配置的即时预览
- 考虑配置的持久化存储

---

## 5. Pagination - 分页导航

### 5.1 组件概述
分页导航组件，支持页码跳转和页面大小调整。

### 5.2 完整 API
```typescript
interface PaginationProps {
  currentPageIndex: number;
  pagesCount: number;
  onChange: (event: { detail: { currentPageIndex: number } }) => void;
  disabled?: boolean;
  ariaLabels?: {
    nextPageLabel?: string;
    previousPageLabel?: string;
    pageLabel?: (pageNumber: number) => string;
  };
  openEnd?: boolean;
}
```

### 5.3 基础示例
```typescript
const [currentPageIndex, setCurrentPageIndex] = useState(1);
const pageSize = 10;
const totalItems = 150;
const pagesCount = Math.ceil(totalItems / pageSize);

<Pagination
  currentPageIndex={currentPageIndex}
  pagesCount={pagesCount}
  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
  ariaLabels={{
    nextPageLabel: '下一页',
    previousPageLabel: '上一页',
    pageLabel: (pageNumber) => `第 ${pageNumber} 页`
  }}
/>
```

### 5.4 进阶示例
```typescript
function ServerTableWithPagination() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const totalItems = servers.length;
  const pagesCount = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPageIndex - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = servers.slice(startIndex, endIndex);

  const handlePageChange = ({ detail }) => {
    setLoading(true);
    setCurrentPageIndex(detail.currentPageIndex);
    
    // 模拟异步加载
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <SpaceBetween size="l">
      <Table
        items={currentItems}
        columnDefinitions={columnDefinitions}
        loading={loading}
        loadingText="加载中..."
        header={
          <Header
            counter={`(${startIndex + 1}-${endIndex} / ${totalItems})`}
            info={
              <Link variant="info">
                关于服务器
              </Link>
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>刷新</Button>
                <Button variant="primary">创建服务器</Button>
              </SpaceBetween>
            }
          >
            服务器
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={pagesCount}
            onChange={handlePageChange}
            disabled={loading}
            ariaLabels={{
              nextPageLabel: '下一页',
              previousPageLabel: '上一页',
              pageLabel: (pageNumber) => `转到第 ${pageNumber} 页`
            }}
          />
        }
        preferences={
          <CollectionPreferences
            preferences={{ pageSize }}
            onConfirm={({ detail }) => {
              setPageSize(detail.pageSize);
              setCurrentPageIndex(1); // 重置到第一页
            }}
            pageSizePreference={{
              title: '页面大小',
              options: [
                { value: 10, label: '10 个服务器' },
                { value: 20, label: '20 个服务器' },
                { value: 50, label: '50 个服务器' },
                { value: 100, label: '100 个服务器' }
              ]
            }}
          />
        }
      />
    </SpaceBetween>
  );
}
```

### 5.5 最佳实践
- 显示当前页面范围信息
- 提供页面大小选择
- 在数据加载时禁用分页
- 考虑无限滚动替代方案

### 5.6 常见场景
- 数据表格分页
- 搜索结果分页
- 文章列表分页
- API 数据分页加载

### 5.7 注意事项
- 大数据集使用服务端分页
- 保持分页状态的 URL 同步
- 提供跳转到指定页面功能

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 卡片式数据展示 | Cards |
| 复杂条件筛选 | PropertyFilter |
| 简单文本搜索 | TextFilter |
| 用户偏好设置 | CollectionPreferences |
| 数据分页导航 | Pagination |

### 完整数据列表实现

```typescript
function CompleteDataList() {
  // 状态管理
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 筛选状态
  const [filterQuery, setFilterQuery] = useState({ tokens: [], operation: 'and' });
  const [textFilter, setTextFilter] = useState('');
  
  // 分页状态
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [preferences, setPreferences] = useState({
    pageSize: 20,
    visibleContent: ['name', 'status', 'instanceType'],
    wrapLines: false,
    stripedRows: true,
    contentDensity: 'comfortable'
  });

  // 计算分页数据
  const pagesCount = Math.ceil(filteredItems.length / preferences.pageSize);
  const startIndex = (currentPageIndex - 1) * preferences.pageSize;
  const currentItems = filteredItems.slice(startIndex, startIndex + preferences.pageSize);

  return (
    <SpaceBetween size="l">
      {/* 筛选器 */}
      <SpaceBetween size="s">
        <PropertyFilter
          query={filterQuery}
          onChange={({ detail }) => setFilterQuery(detail)}
          filteringProperties={filteringProperties}
          filteringOptions={filteringOptions}
          countText={`${filteredItems.length} 个匹配项`}
          i18nStrings={propertyFilterI18n}
        />
        
        <TextFilter
          filteringText={textFilter}
          onChange={({ detail }) => setTextFilter(detail.filteringText)}
          countText={`${filteredItems.length} 个匹配项`}
          filteringPlaceholder="搜索..."
        />
      </SpaceBetween>

      {/* 数据展示 */}
      <Cards
        items={currentItems}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        loading={loading}
        cardDefinition={cardDefinition}
        selectionType="multi"
        header={
          <Header
            counter={`(${filteredItems.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button disabled={selectedItems.length === 0}>
                  批量操作
                </Button>
                <Button variant="primary">创建</Button>
              </SpaceBetween>
            }
          >
            数据列表
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={pagesCount}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            ariaLabels={{
              nextPageLabel: '下一页',
              previousPageLabel: '上一页',
              pageLabel: (pageNumber) => `第 ${pageNumber} 页`
            }}
          />
        }
        preferences={
          <CollectionPreferences
            preferences={preferences}
            onConfirm={({ detail }) => {
              setPreferences(detail);
              setCurrentPageIndex(1);
            }}
            pageSizePreference={pageSizePreference}
            visibleContentPreference={visibleContentPreference}
            wrapLinesPreference={wrapLinesPreference}
            stripedRowsPreference={stripedRowsPreference}
            contentDensityPreference={contentDensityPreference}
          />
        }
      />
    </SpaceBetween>
  );
}
```

### 最佳实践总结

```typescript
// ✅ 组合使用数据列表组件
<SpaceBetween size="l">
  <PropertyFilter />
  <TextFilter />
  <Cards 
    pagination={<Pagination />}
    preferences={<CollectionPreferences />}
  />
</SpaceBetween>

// ✅ 实现完整的筛选逻辑
const applyFilters = (items, propertyQuery, textQuery) => {
  return items
    .filter(item => matchesPropertyFilter(item, propertyQuery))
    .filter(item => matchesTextFilter(item, textQuery));
};

// ✅ 优化大数据集性能
const [debouncedFilter] = useDebounce(filterText, 300);
useEffect(() => {
  // 应用筛选
}, [debouncedFilter]);

// ✅ 保存用户偏好
useEffect(() => {
  localStorage.setItem('tablePreferences', JSON.stringify(preferences));
}, [preferences]);
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据展示](./COMPONENTS_08_DATA_DISPLAY.md) | [下一模块：反馈组件](./COMPONENTS_10_FEEDBACK.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15