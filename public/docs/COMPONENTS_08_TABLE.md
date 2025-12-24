# 模块 08: Table 组件

> **模块**: Table 组件  
> **组件数**: 1 个核心组件  
> **难度**: ⭐⭐⭐⭐⭐ 高级  
> **重要性**: ⭐⭐⭐⭐⭐ 必学  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

Table 是 Cloudscape 中最重要和最复杂的组件之一，用于展示和操作结构化数据。它提供了丰富的功能，包括排序、过滤、选择、编辑等，是构建数据管理界面的核心组件。

### 本模块包含的功能

1. **基础表格** - 数据展示和基本交互
2. **排序功能** - 单列和多列排序
3. **过滤功能** - 内置过滤和自定义过滤
4. **选择功能** - 单选、多选和批量操作
5. **列管理** - 可调整列宽、隐藏列
6. **粘性功能** - 粘性表头和粘性列
7. **可展开行** - 嵌套内容展示
8. **内联编辑** - 单元格编辑
9. **虚拟滚动** - 大数据集性能优化
10. **状态管理** - 空状态和加载状态
11. **组件集成** - 与 PropertyFilter、Pagination 集成
12. **性能优化** - 最佳实践和优化技巧

---

## 1. 组件概述

### 1.1 Table 组件特点
- **数据驱动**: 通过 items 属性传入数据数组
- **列定义**: 通过 columnDefinitions 定义列结构和行为
- **高度可定制**: 支持自定义渲染、排序、过滤等
- **响应式设计**: 自动适应不同屏幕尺寸
- **无障碍支持**: 完整的键盘导航和屏幕阅读器支持

### 1.2 核心概念
```typescript
// 数据项类型
interface ServerItem {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'pending';
  cpu: number;
  memory: number;
  createdAt: string;
}

// 列定义类型
interface ColumnDefinition<T> {
  id: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  sortingField?: string;
  isRowHeader?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}
```

---

## 2. 完整 API

### 2.1 主要属性
```typescript
interface TableProps<T> {
  // 数据相关
  items: T[];
  columnDefinitions: ColumnDefinition<T>[];
  
  // 选择功能
  selectedItems?: T[];
  selectionType?: 'single' | 'multi';
  onSelectionChange?: (event: { detail: { selectedItems: T[] } }) => void;
  isItemDisabled?: (item: T) => boolean;
  
  // 排序功能
  sortingColumn?: ColumnDefinition<T>;
  sortingDescending?: boolean;
  onSortingChange?: (event: { detail: { sortingColumn: ColumnDefinition<T>; sortingDescending: boolean } }) => void;
  
  // 过滤功能
  filter?: React.ReactNode;
  
  // 分页
  pagination?: React.ReactNode;
  
  // 首选项
  preferences?: React.ReactNode;
  
  // 状态
  loading?: boolean;
  loadingText?: string;
  empty?: React.ReactNode;
  
  // 样式和行为
  variant?: 'borderless' | 'embedded' | 'full-page' | 'container';
  stickyHeader?: boolean;
  stickyColumns?: { first?: number; last?: number };
  stripedRows?: boolean;
  contentDensity?: 'comfortable' | 'compact';
  
  // 可展开行
  expandableRows?: {
    getItemChildren: (item: T) => T[];
    isItemExpandable: (item: T) => boolean;
    expandedItems?: T[];
    onExpandableItemToggle?: (event: { detail: { expandedItems: T[] } }) => void;
  };
  
  // 可调整列宽
  resizableColumns?: boolean;
  onColumnWidthsChange?: (event: { detail: { widths: number[] } }) => void;
  
  // 虚拟滚动
  virtualScroll?: boolean;
  
  // 事件处理
  onRowClick?: (event: { detail: { item: T } }) => void;
  onRowContextMenu?: (event: { detail: { item: T } }) => void;
  
  // 国际化
  ariaLabels?: {
    selectionGroupLabel?: string;
    itemSelectionLabel?: (data: SelectionState, item: T) => string;
    allItemsSelectionLabel?: (selectionState: SelectionState) => string;
    tableLabel?: string;
    activateEditLabel?: (column: ColumnDefinition<T>, item: T) => string;
    cancelEditLabel?: (column: ColumnDefinition<T>) => string;
    submitEditLabel?: (column: ColumnDefinition<T>) => string;
  };
  
  // 跟踪和标识
  trackBy?: string | ((item: T) => string);
  
  // 提交模式（内联编辑）
  submitEdit?: (item: T, column: ColumnDefinition<T>, newValue: any) => void;
  
  // 头部和页脚
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
```

---

## 3. 基础用法示例

### 3.1 最简单的表格
```typescript
import Table from '@cloudscape-design/components/table';

const servers = [
  { id: '1', name: 'srv-001', status: 'running', cpu: 45, memory: 2048 },
  { id: '2', name: 'srv-002', status: 'stopped', cpu: 0, memory: 4096 },
  { id: '3', name: 'srv-003', status: 'pending', cpu: 20, memory: 1024 }
];

const columnDefinitions = [
  {
    id: 'name',
    header: '服务器名称',
    cell: item => item.name,
    isRowHeader: true
  },
  {
    id: 'status',
    header: '状态',
    cell: item => (
      <StatusIndicator type={item.status === 'running' ? 'success' : 'error'}>
        {item.status}
      </StatusIndicator>
    )
  },
  {
    id: 'cpu',
    header: 'CPU 使用率',
    cell: item => `${item.cpu}%`
  },
  {
    id: 'memory',
    header: '内存',
    cell: item => `${item.memory} MB`
  }
];

function BasicTable() {
  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      variant="full-page"
      stickyHeader
    />
  );
}
```

### 3.2 带头部和空状态的表格
```typescript
function TableWithHeader() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServers().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      loading={loading}
      loadingText="正在加载服务器列表..."
      empty={
        <Box textAlign="center" color="inherit">
          <b>没有服务器</b>
          <Box variant="p" color="inherit">
            您还没有创建任何服务器。
          </Box>
          <Button>创建服务器</Button>
        </Box>
      }
      header={
        <Header
          counter={`(${items.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>刷新</Button>
              <Button variant="primary">创建服务器</Button>
            </SpaceBetween>
          }
        >
          服务器列表
        </Header>
      }
    />
  );
}
```

---

## 4. 排序功能

### 4.1 客户端排序
```typescript
function SortableTable() {
  const [items, setItems] = useState(servers);
  const [sortingColumn, setSortingColumn] = useState(columnDefinitions[0]);
  const [sortingDescending, setSortingDescending] = useState(false);

  // 排序后的数据
  const sortedItems = useMemo(() => {
    if (!sortingColumn?.sortingField) return items;
    
    return [...items].sort((a, b) => {
      const aVal = a[sortingColumn.sortingField];
      const bVal = b[sortingColumn.sortingField];
      
      let result = 0;
      if (typeof aVal === 'string') {
        result = aVal.localeCompare(bVal);
      } else {
        result = aVal - bVal;
      }
      
      return sortingDescending ? -result : result;
    });
  }, [items, sortingColumn, sortingDescending]);

  const sortableColumnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => item.name,
      sortingField: 'name',
      isRowHeader: true
    },
    {
      id: 'status',
      header: '状态',
      cell: item => item.status,
      sortingField: 'status'
    },
    {
      id: 'cpu',
      header: 'CPU 使用率',
      cell: item => `${item.cpu}%`,
      sortingField: 'cpu'
    },
    {
      id: 'memory',
      header: '内存',
      cell: item => `${item.memory} MB`,
      sortingField: 'memory'
    }
  ];

  return (
    <Table
      items={sortedItems}
      columnDefinitions={sortableColumnDefinitions}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setSortingDescending(detail.sortingDescending);
      }}
    />
  );
}
```

### 4.2 服务器端排序
```typescript
function ServerSortedTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortingColumn, setSortingColumn] = useState();
  const [sortingDescending, setSortingDescending] = useState(false);

  const fetchData = async (sortField, sortDesc) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/servers?sort=${sortField}&desc=${sortDesc}`);
      const data = await response.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSortingChange = ({ detail }) => {
    setSortingColumn(detail.sortingColumn);
    setSortingDescending(detail.sortingDescending);
    fetchData(detail.sortingColumn?.sortingField, detail.sortingDescending);
  };

  return (
    <Table
      items={items}
      columnDefinitions={sortableColumnDefinitions}
      loading={loading}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={handleSortingChange}
    />
  );
}
```

---

## 5. 过滤功能

### 5.1 简单文本过滤
```typescript
import TextFilter from '@cloudscape-design/components/text-filter';

function FilterableTable() {
  const [items, setItems] = useState(servers);
  const [filteringText, setFilteringText] = useState('');

  const filteredItems = useMemo(() => {
    if (!filteringText) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.status.toLowerCase().includes(filteringText.toLowerCase())
    );
  }, [items, filteringText]);

  return (
    <Table
      items={filteredItems}
      columnDefinitions={columnDefinitions}
      filter={
        <TextFilter
          filteringText={filteringText}
          onChange={({ detail }) => setFilteringText(detail.filteringText)}
          filteringPlaceholder="搜索服务器..."
          filteringAriaLabel="过滤服务器"
        />
      }
    />
  );
}
```

### 5.2 PropertyFilter 高级过滤
```typescript
import PropertyFilter from '@cloudscape-design/components/property-filter';

function AdvancedFilterTable() {
  const [items, setItems] = useState(servers);
  const [query, setQuery] = useState({ tokens: [], operation: 'and' });

  const filteringProperties = [
    {
      key: 'name',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '服务器名称',
      groupValuesLabel: '服务器名称值'
    },
    {
      key: 'status',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '状态',
      groupValuesLabel: '状态值'
    },
    {
      key: 'cpu',
      operators: ['=', '!=', '>', '<', '>=', '<='],
      propertyLabel: 'CPU 使用率',
      groupValuesLabel: 'CPU 使用率值'
    }
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return query.tokens.every(token => {
        const { propertyKey, operator, value } = token;
        const itemValue = item[propertyKey];
        
        switch (operator) {
          case ':':
            return String(itemValue).toLowerCase().includes(value.toLowerCase());
          case '!:':
            return !String(itemValue).toLowerCase().includes(value.toLowerCase());
          case '=':
            return String(itemValue) === value;
          case '!=':
            return String(itemValue) !== value;
          case '>':
            return Number(itemValue) > Number(value);
          case '<':
            return Number(itemValue) < Number(value);
          default:
            return true;
        }
      });
    });
  }, [items, query]);

  return (
    <Table
      items={filteredItems}
      columnDefinitions={columnDefinitions}
      filter={
        <PropertyFilter
          query={query}
          onChange={({ detail }) => setQuery(detail)}
          filteringProperties={filteringProperties}
          filteringPlaceholder="搜索服务器"
          filteringAriaLabel="过滤服务器"
          filteringOptions={[
            { propertyKey: 'status', value: 'running' },
            { propertyKey: 'status', value: 'stopped' },
            { propertyKey: 'status', value: 'pending' }
          ]}
        />
      }
    />
  );
}
```

---

## 6. 选择功能

### 6.1 单选模式
```typescript
function SingleSelectionTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      selectionType="single"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        itemSelectionLabel: (data, item) => `选择 ${item.name}`,
        selectionGroupLabel: "服务器选择"
      }}
    />
  );
}
```

### 6.2 多选模式与批量操作
```typescript
function MultiSelectionTable() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState(servers);

  const handleBulkDelete = () => {
    const remainingItems = items.filter(item => 
      !selectedItems.some(selected => selected.id === item.id)
    );
    setItems(remainingItems);
    setSelectedItems([]);
  };

  const handleBulkStart = () => {
    const updatedItems = items.map(item => {
      if (selectedItems.some(selected => selected.id === item.id)) {
        return { ...item, status: 'running' };
      }
      return item;
    });
    setItems(updatedItems);
    setSelectedItems([]);
  };

  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      header={
        <Header
          counter={`(${items.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button 
                disabled={selectedItems.length === 0}
                onClick={handleBulkStart}
              >
                启动选中的服务器
              </Button>
              <Button 
                disabled={selectedItems.length === 0}
                onClick={handleBulkDelete}
              >
                删除选中的服务器
              </Button>
              <Button variant="primary">创建服务器</Button>
            </SpaceBetween>
          }
        >
          服务器列表
        </Header>
      }
      ariaLabels={{
        itemSelectionLabel: (data, item) => `选择 ${item.name}`,
        allItemsSelectionLabel: data => 
          data.selectedItems.length === items.length ? "取消全选" : "全选",
        selectionGroupLabel: "服务器选择"
      }}
    />
  );
}
```

### 6.3 条件禁用选择
```typescript
function ConditionalSelectionTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      isItemDisabled={item => item.status === 'pending'}
      ariaLabels={{
        itemSelectionLabel: (data, item) => 
          item.status === 'pending' 
            ? `${item.name} 正在处理中，无法选择`
            : `选择 ${item.name}`,
        selectionGroupLabel: "服务器选择"
      }}
    />
  );
}
```

---

## 7. 可调整列宽

### 7.1 基础列宽调整
```typescript
function ResizableColumnsTable() {
  const [columnWidths, setColumnWidths] = useState([200, 120, 150, 120]);

  const resizableColumnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => item.name,
      width: columnWidths[0],
      minWidth: 120
    },
    {
      id: 'status',
      header: '状态',
      cell: item => item.status,
      width: columnWidths[1],
      minWidth: 80
    },
    {
      id: 'cpu',
      header: 'CPU 使用率',
      cell: item => `${item.cpu}%`,
      width: columnWidths[2],
      minWidth: 100
    },
    {
      id: 'memory',
      header: '内存',
      cell: item => `${item.memory} MB`,
      width: columnWidths[3],
      minWidth: 100
    }
  ];

  return (
    <Table
      items={servers}
      columnDefinitions={resizableColumnDefinitions}
      resizableColumns
      onColumnWidthsChange={({ detail }) => setColumnWidths(detail.widths)}
    />
  );
}
```

---

## 8. 粘性表头和粘性列

### 8.1 粘性表头
```typescript
function StickyHeaderTable() {
  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      stickyHeader
      variant="full-page"
    />
  );
}
```

### 8.2 粘性列
```typescript
function StickyColumnsTable() {
  const extendedColumnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => item.name,
      isRowHeader: true,
      width: 200
    },
    {
      id: 'status',
      header: '状态',
      cell: item => item.status,
      width: 120
    },
    {
      id: 'cpu',
      header: 'CPU',
      cell: item => `${item.cpu}%`,
      width: 100
    },
    {
      id: 'memory',
      header: '内存',
      cell: item => `${item.memory} MB`,
      width: 120
    },
    {
      id: 'disk',
      header: '磁盘',
      cell: item => `${item.disk || 50} GB`,
      width: 120
    },
    {
      id: 'network',
      header: '网络',
      cell: item => `${item.network || 100} Mbps`,
      width: 120
    },
    {
      id: 'actions',
      header: '操作',
      cell: item => (
        <SpaceBetween direction="horizontal" size="xs">
          <Button size="small">编辑</Button>
          <Button size="small">删除</Button>
        </SpaceBetween>
      ),
      width: 150
    }
  ];

  return (
    <Table
      items={servers}
      columnDefinitions={extendedColumnDefinitions}
      stickyHeader
      stickyColumns={{ first: 1, last: 1 }}
      variant="full-page"
    />
  );
}
```

---

## 9. 可展开行

### 9.1 基础可展开行
```typescript
function ExpandableRowsTable() {
  const [expandedItems, setExpandedItems] = useState([]);

  const serversWithDetails = servers.map(server => ({
    ...server,
    details: {
      ip: '192.168.1.' + server.id,
      region: 'us-east-1',
      instanceType: 't3.medium',
      tags: ['production', 'web-server']
    }
  }));

  const expandableColumnDefinitions = [
    ...columnDefinitions,
    {
      id: 'expand',
      header: '',
      cell: () => null,
      width: 50
    }
  ];

  return (
    <Table
      items={serversWithDetails}
      columnDefinitions={expandableColumnDefinitions}
      expandableRows={{
        getItemChildren: item => [item.details],
        isItemExpandable: () => true,
        expandedItems,
        onExpandableItemToggle: ({ detail }) => setExpandedItems(detail.expandedItems)
      }}
    />
  );
}
```

### 9.2 嵌套表格展开
```typescript
function NestedTableExpansion() {
  const [expandedItems, setExpandedItems] = useState([]);

  const getServerLogs = (serverId) => [
    { id: 1, timestamp: '2023-12-24 10:00:00', level: 'INFO', message: '服务启动' },
    { id: 2, timestamp: '2023-12-24 10:05:00', level: 'WARN', message: 'CPU 使用率较高' },
    { id: 3, timestamp: '2023-12-24 10:10:00', level: 'ERROR', message: '连接超时' }
  ];

  const logColumnDefinitions = [
    {
      id: 'timestamp',
      header: '时间',
      cell: item => item.timestamp
    },
    {
      id: 'level',
      header: '级别',
      cell: item => (
        <Badge color={item.level === 'ERROR' ? 'red' : item.level === 'WARN' ? 'yellow' : 'blue'}>
          {item.level}
        </Badge>
      )
    },
    {
      id: 'message',
      header: '消息',
      cell: item => item.message
    }
  ];

  return (
    <Table
      items={servers}
      columnDefinitions={columnDefinitions}
      expandableRows={{
        getItemChildren: item => [{
          id: `${item.id}-logs`,
          content: (
            <Container>
              <Header>服务器日志</Header>
              <Table
                items={getServerLogs(item.id)}
                columnDefinitions={logColumnDefinitions}
                variant="embedded"
              />
            </Container>
          )
        }],
        isItemExpandable: () => true,
        expandedItems,
        onExpandableItemToggle: ({ detail }) => setExpandedItems(detail.expandedItems)
      }}
    />
  );
}
```

---

## 10. 内联编辑

### 10.1 基础内联编辑
```typescript
function InlineEditTable() {
  const [items, setItems] = useState(servers);
  const [editingCell, setEditingCell] = useState(null);

  const handleSubmitEdit = (item, column, newValue) => {
    setItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === item.id
          ? { ...prevItem, [column.id]: newValue }
          : prevItem
      )
    );
    setEditingCell(null);
  };

  const editableColumnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => item.name,
      editConfig: {
        ariaLabel: '服务器名称',
        editIconAriaLabel: '编辑服务器名称',
        errorIconAriaLabel: '服务器名称错误',
        editingCell: (item, { currentValue, setValue }) => (
          <Input
            autoFocus
            value={currentValue ?? item.name}
            onChange={event => setValue(event.detail.value)}
          />
        )
      }
    },
    {
      id: 'cpu',
      header: 'CPU 使用率',
      cell: item => `${item.cpu}%`,
      editConfig: {
        ariaLabel: 'CPU 使用率',
        editIconAriaLabel: '编辑 CPU 使用率',
        editingCell: (item, { currentValue, setValue }) => (
          <Input
            autoFocus
            type="number"
            value={currentValue ?? item.cpu}
            onChange={event => setValue(Number(event.detail.value))}
          />
        )
      }
    },
    {
      id: 'status',
      header: '状态',
      cell: item => item.status,
      editConfig: {
        ariaLabel: '状态',
        editIconAriaLabel: '编辑状态',
        editingCell: (item, { currentValue, setValue }) => (
          <Select
            autoFocus
            selectedOption={{ value: currentValue ?? item.status }}
            onChange={event => setValue(event.detail.selectedOption.value)}
            options={[
              { value: 'running', label: '运行中' },
              { value: 'stopped', label: '已停止' },
              { value: 'pending', label: '处理中' }
            ]}
          />
        )
      }
    }
  ];

  return (
    <Table
      items={items}
      columnDefinitions={editableColumnDefinitions}
      submitEdit={handleSubmitEdit}
      ariaLabels={{
        activateEditLabel: (column, item) => `编辑 ${item.name} 的 ${column.header}`,
        cancelEditLabel: column => `取消编辑 ${column.header}`,
        submitEditLabel: column => `提交 ${column.header} 的更改`
      }}
    />
  );
}
```

---

## 11. 虚拟滚动

### 11.1 大数据集虚拟滚动
```typescript
function VirtualScrollTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 生成大量数据
    const generateLargeDataset = () => {
      const data = [];
      for (let i = 1; i <= 10000; i++) {
        data.push({
          id: i.toString(),
          name: `srv-${i.toString().padStart(4, '0')}`,
          status: ['running', 'stopped', 'pending'][i % 3],
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 8192) + 1024,
          createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      return data;
    };

    setTimeout(() => {
      setItems(generateLargeDataset());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      loading={loading}
      virtualScroll
      variant="full-page"
      stickyHeader
      header={
        <Header counter={`(${items.length})`}>
          大数据集服务器列表
        </Header>
      }
    />
  );
}
```

---

## 12. 空状态和加载状态

### 12.1 多种空状态
```typescript
function EmptyStatesTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const EmptyState = () => (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        <Icon name="server" size="big" />
      </Box>
      <Box variant="h2" padding={{ bottom: 's' }} color="inherit">
        没有服务器
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        您还没有创建任何服务器。创建您的第一个服务器开始使用。
      </Box>
      <Button variant="primary" iconName="add-plus">
        创建服务器
      </Button>
    </Box>
  );

  const ErrorState = () => (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        <Icon name="status-warning" size="big" />
      </Box>
      <Box variant="h2" padding={{ bottom: 's' }} color="inherit">
        加载失败
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        无法加载服务器列表。请检查网络连接并重试。
      </Box>
      <Button onClick={() => window.location.reload()}>
        重新加载
      </Button>
    </Box>
  );

  const NoMatchState = () => (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        <Icon name="search" size="big" />
      </Box>
      <Box variant="h2" padding={{ bottom: 's' }} color="inherit">
        没有匹配结果
      </Box>
      <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        没有找到符合当前筛选条件的服务器。
      </Box>
      <Button>清除筛选条件</Button>
    </Box>
  );

  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      loading={loading}
      loadingText="正在加载服务器列表..."
      empty={error ? <ErrorState /> : <EmptyState />}
    />
  );
}
```

---

## 13. 与 PropertyFilter/Pagination 集成

### 13.1 完整集成示例
```typescript
import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

function IntegratedTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  // 分页状态
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 过滤状态
  const [filterQuery, setFilterQuery] = useState({ tokens: [], operation: 'and' });
  
  // 排序状态
  const [sortingColumn, setSortingColumn] = useState();
  const [sortingDescending, setSortingDescending] = useState(false);
  
  // 首选项状态
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    visibleContent: ['name', 'status', 'cpu', 'memory'],
    stripedRows: false,
    contentDensity: 'comfortable'
  });

  const filteringProperties = [
    {
      key: 'name',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '服务器名称',
      groupValuesLabel: '服务器名称值'
    },
    {
      key: 'status',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '状态',
      groupValuesLabel: '状态值'
    }
  ];

  const columnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => item.name,
      sortingField: 'name',
      isRowHeader: true
    },
    {
      id: 'status',
      header: '状态',
      cell: item => (
        <StatusIndicator type={item.status === 'running' ? 'success' : 'error'}>
          {item.status}
        </StatusIndicator>
      ),
      sortingField: 'status'
    },
    {
      id: 'cpu',
      header: 'CPU 使用率',
      cell: item => `${item.cpu}%`,
      sortingField: 'cpu'
    },
    {
      id: 'memory',
      header: '内存',
      cell: item => `${item.memory} MB`,
      sortingField: 'memory'
    }
  ].filter(column => preferences.visibleContent.includes(column.id));

  const collectionPreferencesProps = {
    title: '首选项',
    confirmLabel: '确认',
    cancelLabel: '取消',
    preferences,
    onConfirm: ({ detail }) => setPreferences(detail),
    pageSizePreference: {
      title: '页面大小',
      options: [
        { value: 10, label: '10 个服务器' },
        { value: 20, label: '20 个服务器' },
        { value: 50, label: '50 个服务器' }
      ]
    },
    visibleContentPreference: {
      title: '选择可见列',
      options: [
        { id: 'name', label: '服务器名称' },
        { id: 'status', label: '状态' },
        { id: 'cpu', label: 'CPU 使用率' },
        { id: 'memory', label: '内存' }
      ]
    },
    stripedRowsPreference: {
      label: '条纹行',
      description: '为表格行添加交替背景色'
    },
    contentDensityPreference: {
      label: '紧凑模式',
      description: '减少行高以显示更多内容'
    }
  };

  return (
    <Table
      items={items.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize)}
      columnDefinitions={columnDefinitions}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      loading={loading}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setSortingDescending(detail.sortingDescending);
      }}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      filter={
        <PropertyFilter
          query={filterQuery}
          onChange={({ detail }) => setFilterQuery(detail)}
          filteringProperties={filteringProperties}
          filteringPlaceholder="搜索服务器"
        />
      }
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          pagesCount={Math.ceil(items.length / pageSize)}
          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
        />
      }
      preferences={<CollectionPreferences {...collectionPreferencesProps} />}
      header={
        <Header
          counter={`(${items.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>
                批量操作
              </Button>
              <Button variant="primary">创建服务器</Button>
            </SpaceBetween>
          }
        >
          服务器管理
        </Header>
      }
    />
  );
}
```

---

## 14. 性能优化

### 14.1 优化技巧
```typescript
// 1. 使用 useMemo 缓存计算结果
const sortedAndFilteredItems = useMemo(() => {
  let result = [...items];
  
  // 应用过滤
  if (filterQuery.tokens.length > 0) {
    result = applyFiltering(result, filterQuery);
  }
  
  // 应用排序
  if (sortingColumn) {
    result = applySorting(result, sortingColumn, sortingDescending);
  }
  
  return result;
}, [items, filterQuery, sortingColumn, sortingDescending]);

// 2. 使用 useCallback 缓存事件处理器
const handleSelectionChange = useCallback(({ detail }) => {
  setSelectedItems(detail.selectedItems);
}, []);

// 3. 使用 trackBy 优化渲染
<Table
  items={items}
  columnDefinitions={columnDefinitions}
  trackBy="id" // 或者 item => item.id
/>

// 4. 延迟加载大数据集
const [visibleItems, setVisibleItems] = useState([]);
const [hasMore, setHasMore] = useState(true);

const loadMoreItems = useCallback(async () => {
  const newItems = await fetchItems(visibleItems.length, 50);
  setVisibleItems(prev => [...prev, ...newItems]);
  setHasMore(newItems.length === 50);
}, [visibleItems.length]);
```

### 14.2 内存优化
```typescript
// 使用虚拟滚动处理大数据集
function OptimizedLargeTable() {
  const [items] = useState(() => generateLargeDataset(100000));
  
  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      virtualScroll
      stickyHeader
      variant="full-page"
    />
  );
}

// 分页处理大数据集
function PaginatedLargeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;
  
  const visibleItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);
  
  return (
    <Table
      items={visibleItems}
      columnDefinitions={columnDefinitions}
      pagination={
        <Pagination
          currentPageIndex={currentPage}
          pagesCount={Math.ceil(items.length / pageSize)}
          onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
        />
      }
    />
  );
}
```

---

## 15. 完整的服务器管理实战案例

### 15.1 完整功能实现
```typescript
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Table, Header, Button, SpaceBetween, StatusIndicator,
  PropertyFilter, Pagination, CollectionPreferences,
  Modal, Box, FormField, Input, Select, Badge,
  Container, ColumnLayout, KeyValuePairs
} from '@cloudscape-design/components';

function ServerManagementTable() {
  // 数据状态
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  
  // 表格状态
  const [sortingColumn, setSortingColumn] = useState();
  const [sortingDescending, setSortingDescending] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterQuery, setFilterQuery] = useState({ tokens: [], operation: 'and' });
  
  // 模态框状态
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingServer, setEditingServer] = useState(null);
  
  // 首选项状态
  const [preferences, setPreferences] = useState({
    pageSize: 20,
    visibleContent: ['name', 'status', 'cpu', 'memory', 'region', 'actions'],
    stripedRows: true,
    contentDensity: 'comfortable'
  });

  // 数据获取
  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/servers');
      const data = await response.json();
      setServers(data);
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    } finally {
      setLoading(false);
    }
  };

  // 列定义
  const columnDefinitions = [
    {
      id: 'name',
      header: '服务器名称',
      cell: item => (
        <Box>
          <Box variant="strong">{item.name}</Box>
          <Box variant="small" color="text-body-secondary">{item.id}</Box>
        </Box>
      ),
      sortingField: 'name',
      isRowHeader: true,
      width: 200
    },
    {
      id: 'status',
      header: '状态',
      cell: item => (
        <StatusIndicator 
          type={
            item.status === 'running' ? 'success' :
            item.status === 'stopped' ? 'stopped' :
            item.status === 'pending' ? 'pending' : 'error'
          }
        >
          {item.status}
        </StatusIndicator>
      ),
      sortingField: 'status',
      width: 120
    },
    {
      id: 'cpu',
      header: 'CPU 使用率',
      cell: item => (
        <Box>
          <Box>{item.cpu}%</Box>
          <Box variant="small" color="text-body-secondary">
            {item.cpuCores} 核心
          </Box>
        </Box>
      ),
      sortingField: 'cpu',
      width: 120
    },
    {
      id: 'memory',
      header: '内存',
      cell: item => (
        <Box>
          <Box>{(item.memoryUsed / 1024).toFixed(1)} GB</Box>
          <Box variant="small" color="text-body-secondary">
            / {(item.memoryTotal / 1024).toFixed(1)} GB
          </Box>
        </Box>
      ),
      sortingField: 'memoryUsed',
      width: 120
    },
    {
      id: 'region',
      header: '区域',
      cell: item => (
        <Box>
          <Box>{item.region}</Box>
          <Box variant="small" color="text-body-secondary">{item.availabilityZone}</Box>
        </Box>
      ),
      sortingField: 'region',
      width: 150
    },
    {
      id: 'tags',
      header: '标签',
      cell: item => (
        <SpaceBetween direction="horizontal" size="xs">
          {item.tags?.slice(0, 2).map(tag => (
            <Badge key={tag} color="blue">{tag}</Badge>
          ))}
          {item.tags?.length > 2 && (
            <Badge>+{item.tags.length - 2}</Badge>
          )}
        </SpaceBetween>
      ),
      width: 200
    },
    {
      id: 'actions',
      header: '操作',
      cell: item => (
        <SpaceBetween direction="horizontal" size="xs">
          <Button 
            size="small" 
            onClick={() => handleStartStop(item)}
            disabled={item.status === 'pending'}
          >
            {item.status === 'running' ? '停止' : '启动'}
          </Button>
          <Button 
            size="small" 
            onClick={() => setEditingServer(item)}
          >
            编辑
          </Button>
          <Button 
            size="small" 
            onClick={() => handleDelete([item])}
            disabled={item.status === 'running'}
          >
            删除
          </Button>
        </SpaceBetween>
      ),
      width: 200
    }
  ].filter(column => preferences.visibleContent.includes(column.id));

  // 过滤属性
  const filteringProperties = [
    {
      key: 'name',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '服务器名称',
      groupValuesLabel: '服务器名称值'
    },
    {
      key: 'status',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '状态',
      groupValuesLabel: '状态值'
    },
    {
      key: 'region',
      operators: [':', '!:', '=', '!='],
      propertyLabel: '区域',
      groupValuesLabel: '区域值'
    },
    {
      key: 'tags',
      operators: [':', '!:'],
      propertyLabel: '标签',
      groupValuesLabel: '标签值'
    }
  ];

  // 数据处理
  const { filteredItems, paginatedItems } = useMemo(() => {
    let filtered = [...servers];
    
    // 应用过滤
    if (filterQuery.tokens.length > 0) {
      filtered = filtered.filter(item => {
        return filterQuery.tokens.every(token => {
          const { propertyKey, operator, value } = token;
          const itemValue = String(item[propertyKey] || '').toLowerCase();
          const searchValue = value.toLowerCase();
          
          switch (operator) {
            case ':':
              return itemValue.includes(searchValue);
            case '!:':
              return !itemValue.includes(searchValue);
            case '=':
              return itemValue === searchValue;
            case '!=':
              return itemValue !== searchValue;
            default:
              return true;
          }
        });
      });
    }
    
    // 应用排序
    if (sortingColumn?.sortingField) {
      filtered.sort((a, b) => {
        const aVal = a[sortingColumn.sortingField];
        const bVal = b[sortingColumn.sortingField];
        
        let result = 0;
        if (typeof aVal === 'string') {
          result = aVal.localeCompare(bVal);
        } else {
          result = aVal - bVal;
        }
        
        return sortingDescending ? -result : result;
      });
    }
    
    // 分页
    const startIndex = (currentPageIndex - 1) * preferences.pageSize;
    const paginated = filtered.slice(startIndex, startIndex + preferences.pageSize);
    
    return { filteredItems: filtered, paginatedItems: paginated };
  }, [servers, filterQuery, sortingColumn, sortingDescending, currentPageIndex, preferences.pageSize]);

  // 事件处理
  const handleSelectionChange = useCallback(({ detail }) => {
    setSelectedItems(detail.selectedItems);
  }, []);

  const handleSortingChange = useCallback(({ detail }) => {
    setSortingColumn(detail.sortingColumn);
    setSortingDescending(detail.sortingDescending);
  }, []);

  const handleStartStop = async (server) => {
    const action = server.status === 'running' ? 'stop' : 'start';
    try {
      await fetch(`/api/servers/${server.id}/${action}`, { method: 'POST' });
      await fetchServers();
    } catch (error) {
      console.error(`Failed to ${action} server:`, error);
    }
  };

  const handleDelete = (items) => {
    setSelectedItems(items);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map(item =>
          fetch(`/api/servers/${item.id}`, { method: 'DELETE' })
        )
      );
      await fetchServers();
      setSelectedItems([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete servers:', error);
    }
  };

  return (
    <>
      <Table
        items={paginatedItems}
        columnDefinitions={columnDefinitions}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={handleSelectionChange}
        loading={loading}
        loadingText="正在加载服务器列表..."
        sortingColumn={sortingColumn}
        sortingDescending={sortingDescending}
        onSortingChange={handleSortingChange}
        stripedRows={preferences.stripedRows}
        contentDensity={preferences.contentDensity}
        stickyHeader
        variant="full-page"
        filter={
          <PropertyFilter
            query={filterQuery}
            onChange={({ detail }) => setFilterQuery(detail)}
            filteringProperties={filteringProperties}
            filteringPlaceholder="搜索服务器 (例如: status = running)"
            filteringAriaLabel="过滤服务器"
          />
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={Math.ceil(filteredItems.length / preferences.pageSize)}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            ariaLabels={{
              nextPageLabel: '下一页',
              previousPageLabel: '上一页',
              pageLabel: pageNumber => `第 ${pageNumber} 页`
            }}
          />
        }
        preferences={
          <CollectionPreferences
            title="首选项"
            confirmLabel="确认"
            cancelLabel="取消"
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
                { id: 'name', label: '服务器名称' },
                { id: 'status', label: '状态' },
                { id: 'cpu', label: 'CPU 使用率' },
                { id: 'memory', label: '内存' },
                { id: 'region', label: '区域' },
                { id: 'tags', label: '标签' },
                { id: 'actions', label: '操作' }
              ]
            }}
            stripedRowsPreference={{
              label: '条纹行',
              description: '为表格行添加交替背景色'
            }}
            contentDensityPreference={{
              label: '紧凑模式',
              description: '减少行高以显示更多内容'
            }}
          />
        }
        header={
          <Header
            counter={`(${filteredItems.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={fetchServers} iconName="refresh">
                  刷新
                </Button>
                <Button 
                  disabled={selectedItems.length === 0}
                  onClick={() => handleDelete(selectedItems)}
                >
                  删除选中项
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setShowCreateModal(true)}
                  iconName="add-plus"
                >
                  创建服务器
                </Button>
              </SpaceBetween>
            }
          >
            服务器管理
          </Header>
        }
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              <Icon name="server" size="big" />
            </Box>
            <Box variant="h2" padding={{ bottom: 's' }} color="inherit">
              没有服务器
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              您还没有创建任何服务器。创建您的第一个服务器开始使用。
            </Box>
            <Button 
              variant="primary" 
              onClick={() => setShowCreateModal(true)}
              iconName="add-plus"
            >
              创建服务器
            </Button>
          </Box>
        }
      />

      {/* 删除确认模态框 */}
      <Modal
        visible={showDeleteModal}
        onDismiss={() => setShowDeleteModal(false)}
        header="删除服务器"
        closeAriaLabel="关闭模态框"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button onClick={() => setShowDeleteModal(false)}>
                取消
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                删除
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <Box>
          确定要删除以下 {selectedItems.length} 个服务器吗？此操作无法撤销。
        </Box>
        <Box margin={{ top: 's' }}>
          {selectedItems.map(item => (
            <Box key={item.id} margin={{ bottom: 'xs' }}>
              • {item.name} ({item.id})
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
}
```

---

## 模块总结

### 最佳实践

1. **性能优化**
   - 使用 `useMemo` 缓存计算结果
   - 使用 `useCallback` 缓存事件处理器
   - 为大数据集启用虚拟滚动
   - 使用 `trackBy` 优化渲染

2. **用户体验**
   - 提供清晰的空状态和加载状态
   - 使用粘性表头提高可用性
   - 支持键盘导航和无障碍访问
   - 提供丰富的过滤和排序选项

3. **数据管理**
   - 实现客户端和服务器端排序
   - 支持复杂的过滤条件
   - 提供批量操作功能
   - 处理异步数据加载

4. **组件集成**
   - 与 PropertyFilter 集成实现高级过滤
   - 与 Pagination 集成处理大数据集
   - 与 CollectionPreferences 集成提供个性化设置
   - 与 Modal 集成实现复杂交互

### 常见问题

1. **Q: 如何处理大数据集？**
   A: 使用虚拟滚动、分页或服务器端分页

2. **Q: 如何实现复杂的过滤逻辑？**
   A: 使用 PropertyFilter 组件配合自定义过滤函数

3. **Q: 如何优化表格性能？**
   A: 使用 React.memo、useMemo、useCallback 和 trackBy

4. **Q: 如何实现内联编辑？**
   A: 使用 editConfig 属性定义可编辑列

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：高级表单](./COMPONENTS_07_FORMS_ADVANCED.md) | [下一模块：数据可视化](./COMPONENTS_09_DATA_VISUALIZATION.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15
```
```