# 模块 11: 图表组件

> **模块**: 图表组件  
> **组件数**: 5 个  
> **难度**: ⭐⭐⭐⭐ 高级  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

图表组件用于数据可视化，支持多种图表类型和交互功能，适用于监控仪表盘、数据分析等场景。

### 本模块包含的组件

1. **LineChart** - 折线图
2. **BarChart** - 柱状图
3. **PieChart** - 饼图
4. **AreaChart** - 面积图
5. **MixedLineBarChart** - 混合图表

---

## 1. LineChart - 折线图

### 1.1 组件概述
用于显示数据随时间变化的趋势，支持多系列、阈值线和交互功能。

### 1.2 完整 API
```typescript
interface LineChartProps {
  series: Array<{
    title: string;
    type: 'line' | 'threshold';
    data: Array<{ x: number | Date; y: number; }>;
    color?: string;
    valueFormatter?: (value: number) => string;
  }>;
  xDomain?: [number | Date, number | Date];
  yDomain?: [number, number];
  xTitle?: string;
  yTitle?: string;
  height?: number;
  hideFilter?: boolean;
  hideLegend?: boolean;
  statusType?: 'loading' | 'finished' | 'error';
  loadingText?: string;
  errorText?: string;
  recoveryText?: string;
  onFilterChange?: (event: { detail: { visibleSeries: string[]; } }) => void;
  i18nStrings?: {
    filterLabel?: string;
    filterPlaceholder?: string;
    legendAriaLabel?: string;
  };
}
```

### 1.3 基础示例
```typescript
<LineChart
  series={[
    {
      title: 'CPU 使用率',
      type: 'line',
      data: [
        { x: new Date('2023-01-01'), y: 45 },
        { x: new Date('2023-01-02'), y: 52 },
        { x: new Date('2023-01-03'), y: 38 }
      ],
      valueFormatter: (value) => `${value}%`
    }
  ]}
  xTitle="时间"
  yTitle="使用率 (%)"
  height={300}
/>
```

### 1.4 进阶示例
```typescript
// 多系列 + 阈值线
<LineChart
  series={[
    {
      title: 'CPU 使用率',
      type: 'line',
      data: cpuData,
      color: '#1f77b4'
    },
    {
      title: '内存使用率',
      type: 'line', 
      data: memoryData,
      color: '#ff7f0e'
    },
    {
      title: '告警阈值',
      type: 'threshold',
      data: [{ x: startDate, y: 80 }, { x: endDate, y: 80 }],
      color: '#d62728'
    }
  ]}
  xDomain={[startDate, endDate]}
  yDomain={[0, 100]}
  onFilterChange={({ detail }) => {
    setVisibleSeries(detail.visibleSeries);
  }}
/>

// 下钻功能
function DrillDownLineChart() {
  const [timeRange, setTimeRange] = useState('1h');
  const [selectedPoint, setSelectedPoint] = useState(null);

  return (
    <Container>
      <Header
        actions={
          <Select
            selectedOption={{ value: timeRange }}
            onChange={({ detail }) => setTimeRange(detail.selectedOption.value)}
            options={[
              { value: '1h', label: '1小时' },
              { value: '24h', label: '24小时' },
              { value: '7d', label: '7天' }
            ]}
          />
        }
      >
        服务器性能监控
      </Header>
      
      <LineChart
        series={getSeriesData(timeRange)}
        height={400}
        onFilterChange={handleDrillDown}
      />
      
      {selectedPoint && (
        <Modal visible onDismiss={() => setSelectedPoint(null)}>
          <Box>详细数据: {selectedPoint.value}</Box>
        </Modal>
      )}
    </Container>
  );
}
```

### 1.5 最佳实践
```typescript
// ✅ 数据格式化
const formatValue = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

// ✅ 响应式高度
const chartHeight = useBreakpoint({
  default: 300,
  xs: 200,
  s: 250,
  m: 300,
  l: 400
});

// ✅ 错误处理
<LineChart
  statusType={isLoading ? 'loading' : hasError ? 'error' : 'finished'}
  loadingText="加载中..."
  errorText="数据加载失败"
  recoveryText="重试"
/>
```

---

## 2. BarChart - 柱状图

### 2.1 组件概述
用于比较不同类别的数据，支持水平和垂直方向、分组和堆叠模式。

### 2.2 完整 API
```typescript
interface BarChartProps {
  series: Array<{
    title: string;
    type: 'bar';
    data: Array<{ x: string | number; y: number; }>;
    color?: string;
  }>;
  xScaleType?: 'linear' | 'categorical';
  yScaleType?: 'linear' | 'log';
  stackedBars?: boolean;
  horizontalBars?: boolean;
  xTitle?: string;
  yTitle?: string;
  height?: number;
  hideFilter?: boolean;
  hideLegend?: boolean;
}
```

### 2.3 基础示例
```typescript
<BarChart
  series={[
    {
      title: '服务器数量',
      type: 'bar',
      data: [
        { x: '北京', y: 45 },
        { x: '上海', y: 38 },
        { x: '深圳', y: 52 }
      ]
    }
  ]}
  xTitle="地区"
  yTitle="数量"
/>
```

### 2.4 进阶示例
```typescript
// 分组柱状图
<BarChart
  series={[
    {
      title: '在线服务器',
      type: 'bar',
      data: regionData.map(d => ({ x: d.region, y: d.online })),
      color: '#2ecc71'
    },
    {
      title: '离线服务器',
      type: 'bar', 
      data: regionData.map(d => ({ x: d.region, y: d.offline })),
      color: '#e74c3c'
    }
  ]}
  xTitle="地区"
  yTitle="服务器数量"
/>

// 堆叠柱状图
<BarChart
  series={stackedSeries}
  stackedBars={true}
  height={350}
/>

// 水平柱状图
<BarChart
  series={series}
  horizontalBars={true}
  height={400}
/>
```

---

## 3. PieChart - 饼图

### 3.1 组件概述
用于显示数据的组成比例，支持环形图和详细标签。

### 3.2 完整 API
```typescript
interface PieChartProps {
  data: Array<{
    title: string;
    value: number;
    color?: string;
  }>;
  size?: 'small' | 'medium' | 'large';
  innerRadius?: number;
  hideDescriptions?: boolean;
  hideTitles?: boolean;
  hideFilter?: boolean;
  hideLegend?: boolean;
  variant?: 'pie' | 'donut';
  statusType?: 'loading' | 'finished' | 'error';
  detailPopoverContent?: (datum: any) => React.ReactNode;
  segmentDescription?: (datum: any, sum: number) => string;
}
```

### 3.3 基础示例
```typescript
<PieChart
  data={[
    { title: 'Linux', value: 65, color: '#3498db' },
    { title: 'Windows', value: 25, color: '#e74c3c' },
    { title: 'macOS', value: 10, color: '#95a5a6' }
  ]}
  size="medium"
/>
```

### 3.4 进阶示例
```typescript
// 环形图 + 详细信息
<PieChart
  data={osDistribution}
  variant="donut"
  size="large"
  detailPopoverContent={(datum) => (
    <Box>
      <div>系统: {datum.title}</div>
      <div>数量: {datum.value}</div>
      <div>占比: {((datum.value / total) * 100).toFixed(1)}%</div>
    </Box>
  )}
  segmentDescription={(datum, sum) => 
    `${datum.title}: ${datum.value} (${((datum.value / sum) * 100).toFixed(1)}%)`
  }
/>

// 交互式饼图
function InteractivePieChart() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  
  return (
    <Container>
      <PieChart
        data={data}
        onFilterChange={({ detail }) => {
          setSelectedSegment(detail.highlightedSegment);
        }}
      />
      
      {selectedSegment && (
        <Alert type="info">
          选中: {selectedSegment.title} - {selectedSegment.value}
        </Alert>
      )}
    </Container>
  );
}
```

---

## 4. AreaChart - 面积图

### 4.1 组件概述
用于显示数据随时间的累积变化，支持堆叠和流式布局。

### 4.2 完整 API
```typescript
interface AreaChartProps {
  series: Array<{
    title: string;
    type: 'area';
    data: Array<{ x: number | Date; y: number; }>;
    color?: string;
  }>;
  stackedAreas?: boolean;
  xDomain?: [number | Date, number | Date];
  yDomain?: [number, number];
  xTitle?: string;
  yTitle?: string;
  height?: number;
}
```

### 4.3 基础示例
```typescript
<AreaChart
  series={[
    {
      title: '网络流量',
      type: 'area',
      data: trafficData,
      color: '#3498db'
    }
  ]}
  xTitle="时间"
  yTitle="流量 (MB/s)"
/>
```

### 4.4 进阶示例
```typescript
// 堆叠面积图
<AreaChart
  series={[
    {
      title: '入站流量',
      type: 'area',
      data: inboundData,
      color: '#2ecc71'
    },
    {
      title: '出站流量', 
      type: 'area',
      data: outboundData,
      color: '#e74c3c'
    }
  ]}
  stackedAreas={true}
  height={350}
/>
```

---

## 5. MixedLineBarChart - 混合图表

### 5.1 组件概述
结合折线图和柱状图，适用于显示不同类型的相关数据。

### 5.2 完整 API
```typescript
interface MixedLineBarChartProps {
  series: Array<{
    title: string;
    type: 'line' | 'bar';
    data: Array<{ x: number | Date | string; y: number; }>;
    color?: string;
    yAxis?: 'left' | 'right';
  }>;
  xDomain?: [number | Date, number | Date];
  yDomain?: [number, number];
  secondaryYDomain?: [number, number];
  xTitle?: string;
  yTitle?: string;
  secondaryYTitle?: string;
  height?: number;
}
```

### 5.3 基础示例
```typescript
<MixedLineBarChart
  series={[
    {
      title: '请求数量',
      type: 'bar',
      data: requestData,
      yAxis: 'left'
    },
    {
      title: '响应时间',
      type: 'line', 
      data: responseTimeData,
      yAxis: 'right'
    }
  ]}
  yTitle="请求数"
  secondaryYTitle="响应时间 (ms)"
/>
```

### 5.4 进阶示例
```typescript
// 复杂监控仪表盘
function MonitoringDashboard() {
  return (
    <SpaceBetween size="l">
      <Container header={<Header>系统性能概览</Header>}>
        <MixedLineBarChart
          series={[
            {
              title: 'CPU 使用率',
              type: 'line',
              data: cpuData,
              yAxis: 'left',
              color: '#3498db'
            },
            {
              title: '活跃连接数',
              type: 'bar',
              data: connectionData, 
              yAxis: 'right',
              color: '#2ecc71'
            }
          ]}
          height={400}
          yTitle="CPU 使用率 (%)"
          secondaryYTitle="连接数"
        />
      </Container>
      
      <ColumnLayout columns={2}>
        <Container header={<Header>流量分布</Header>}>
          <PieChart data={trafficDistribution} />
        </Container>
        
        <Container header={<Header>错误率趋势</Header>}>
          <LineChart series={errorRateSeries} />
        </Container>
      </ColumnLayout>
    </SpaceBetween>
  );
}
```

---

## 常见场景

### 监控仪表盘
```typescript
function ServerMonitoringDashboard() {
  const [timeRange, setTimeRange] = useState('1h');
  const [refreshInterval, setRefreshInterval] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval * 1000);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Select
              selectedOption={{ value: timeRange }}
              onChange={({ detail }) => setTimeRange(detail.selectedOption.value)}
              options={timeRangeOptions}
            />
            <Button iconName="refresh" onClick={refreshData}>
              刷新
            </Button>
          </SpaceBetween>
        }
      >
        服务器监控
      </Header>

      <ColumnLayout columns={3}>
        <Container header={<Header>CPU 使用率</Header>}>
          <LineChart
            series={[{
              title: 'CPU',
              type: 'line',
              data: cpuData,
              valueFormatter: (v) => `${v}%`
            }]}
            height={200}
            hideLegend
          />
        </Container>

        <Container header={<Header>内存使用</Header>}>
          <AreaChart
            series={[{
              title: '内存',
              type: 'area', 
              data: memoryData
            }]}
            height={200}
            hideLegend
          />
        </Container>

        <Container header={<Header>磁盘分布</Header>}>
          <PieChart
            data={diskUsage}
            size="small"
            variant="donut"
          />
        </Container>
      </ColumnLayout>

      <Container header={<Header>网络流量</Header>}>
        <MixedLineBarChart
          series={[
            {
              title: '入站流量',
              type: 'area',
              data: inboundTraffic,
              yAxis: 'left'
            },
            {
              title: '连接数',
              type: 'line',
              data: connectionCount,
              yAxis: 'right'
            }
          ]}
          height={300}
        />
      </Container>
    </SpaceBetween>
  );
}
```

### 数据分析
```typescript
function DataAnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');

  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Select
                  selectedOption={{ value: selectedMetric }}
                  onChange={({ detail }) => setSelectedMetric(detail.selectedOption.value)}
                  options={metricOptions}
                />
                <Button variant="primary" iconName="download">
                  导出数据
                </Button>
              </SpaceBetween>
            }
          >
            业务数据分析
          </Header>
        }
      >
        <LineChart
          series={getAnalyticsData(selectedMetric, comparisonPeriod)}
          height={400}
          onFilterChange={handleDrillDown}
        />
      </Container>

      <ColumnLayout columns={2}>
        <Container header={<Header>地区分布</Header>}>
          <BarChart
            series={regionDistribution}
            horizontalBars
            height={300}
          />
        </Container>

        <Container header={<Header>产品占比</Header>}>
          <PieChart
            data={productDistribution}
            detailPopoverContent={(datum) => (
              <KeyValuePairs
                items={[
                  { label: '产品', value: datum.title },
                  { label: '销量', value: datum.value },
                  { label: '占比', value: `${datum.percentage}%` }
                ]}
              />
            )}
          />
        </Container>
      </ColumnLayout>
    </SpaceBetween>
  );
}
```

---

## 性能优化

### 数据处理优化
```typescript
// ✅ 数据采样
const sampleData = useMemo(() => {
  if (rawData.length > 1000) {
    return rawData.filter((_, index) => index % Math.ceil(rawData.length / 1000) === 0);
  }
  return rawData;
}, [rawData]);

// ✅ 虚拟化大数据集
const VirtualizedChart = ({ data }) => {
  const [visibleRange, setVisibleRange] = useState([0, 100]);
  
  const visibleData = useMemo(() => 
    data.slice(visibleRange[0], visibleRange[1])
  , [data, visibleRange]);

  return (
    <LineChart
      series={[{ title: 'Data', type: 'line', data: visibleData }]}
      onZoom={({ detail }) => setVisibleRange(detail.range)}
    />
  );
};

// ✅ 防抖更新
const debouncedUpdateChart = useCallback(
  debounce((newData) => {
    setChartData(newData);
  }, 300),
  []
);
```

### 渲染优化
```typescript
// ✅ 条件渲染
const ChartContainer = ({ isVisible, data }) => {
  if (!isVisible) return <div>图表已隐藏</div>;
  
  return (
    <LineChart
      series={data}
      height={300}
    />
  );
};

// ✅ 懒加载
const LazyChart = lazy(() => import('./HeavyChart'));

function ChartWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyChart />
    </Suspense>
  );
}
```

---

## 注意事项

### 数据格式
```typescript
// ❌ 错误的数据格式
const badData = [
  { x: '2023-01-01', y: '45' }, // y 应该是数字
  { x: 1672531200, y: 52 }     // 时间格式不一致
];

// ✅ 正确的数据格式
const goodData = [
  { x: new Date('2023-01-01'), y: 45 },
  { x: new Date('2023-01-02'), y: 52 }
];
```

### 颜色和可访问性
```typescript
// ✅ 使用可访问的颜色
const accessibleColors = [
  '#1f77b4', // 蓝色
  '#ff7f0e', // 橙色  
  '#2ca02c', // 绿色
  '#d62728', // 红色
  '#9467bd'  // 紫色
];

// ✅ 提供替代文本
<LineChart
  series={series}
  ariaLabel="CPU 使用率趋势图，显示过去24小时的数据"
/>
```

### 响应式设计
```typescript
// ✅ 响应式图表
const ResponsiveChart = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  
  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <LineChart
      series={series}
      height={Math.max(200, containerWidth * 0.4)}
    />
  );
};
```

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 趋势分析 | LineChart |
| 数据比较 | BarChart |
| 比例显示 | PieChart |
| 累积数据 | AreaChart |
| 多维度数据 | MixedLineBarChart |

### 最佳实践

```typescript
// ✅ 统一的图表配置
const chartConfig = {
  height: 300,
  colors: ['#3498db', '#e74c3c', '#2ecc71'],
  i18nStrings: {
    filterLabel: '筛选',
    legendAriaLabel: '图例'
  }
};

// ✅ 错误边界
<ErrorBoundary fallback={<Alert type="error">图表加载失败</Alert>}>
  <LineChart {...props} />
</ErrorBoundary>

// ✅ 加载状态
<LineChart
  statusType={isLoading ? 'loading' : 'finished'}
  loadingText="数据加载中..."
/>
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：数据展示](./COMPONENTS_10_DATA_DISPLAY.md) | [下一模块：高级组件](./COMPONENTS_12_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 11:41