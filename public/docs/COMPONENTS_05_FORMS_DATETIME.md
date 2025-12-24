# 模块 05: 日期时间组件

> **模块**: 日期时间组件  
> **组件数**: 4 个  
> **难度**: ⭐⭐⭐ 中等  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

日期时间组件用于处理日期和时间的输入、选择和显示，提供直观的用户交互体验。

### 本模块包含的组件

1. **DatePicker** - 日期选择器
2. **DateRangePicker** - 日期范围选择器
3. **TimeInput** - 时间输入框
4. **Calendar** - 日历组件

---

## 1. DatePicker - 日期选择器

### 1.1 组件概述
单日期选择器，支持多种日期格式和本地化，提供日历弹窗选择。

### 1.2 完整 API
```typescript
interface DatePickerProps {
  value?: string;
  onChange?: (event: { detail: { value: string } }) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  controlId?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  locale?: string;
  startOfWeek?: number;
  isDateEnabled?: (date: Date) => boolean;
  dateDisabledReason?: (date: Date) => string;
  granularity?: 'day' | 'month' | 'year';
  openCalendarAriaLabel?: string;
  nextMonthAriaLabel?: string;
  previousMonthAriaLabel?: string;
  todayAriaLabel?: string;
  i18nStrings?: {
    todayAriaLabel?: string;
    nextMonthAriaLabel?: string;
    previousMonthAriaLabel?: string;
    renderMonthAriaLive?: (monthName: string, year: string) => string;
  };
}
```

### 1.3 基础示例
```typescript
import { DatePicker } from '@cloudscape-design/components';

function BasicDatePicker() {
  const [value, setValue] = useState('');

  return (
    <DatePicker
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      placeholder="选择日期"
      openCalendarAriaLabel="打开日历"
    />
  );
}
```

### 1.4 进阶示例
```typescript
// 带验证的日期选择器
function ValidatedDatePicker() {
  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleChange = ({ detail }) => {
    setValue(detail.value);
    // 验证日期不能是未来日期
    const selectedDate = new Date(detail.value);
    const today = new Date();
    setInvalid(selectedDate > today);
  };

  return (
    <FormField
      label="出生日期"
      errorText={invalid ? "出生日期不能是未来日期" : ""}
    >
      <DatePicker
        value={value}
        onChange={handleChange}
        invalid={invalid}
        isDateEnabled={(date) => date <= new Date()}
        dateDisabledReason={(date) => 
          date > new Date() ? "未来日期不可选" : ""
        }
      />
    </FormField>
  );
}

// 本地化日期选择器
function LocalizedDatePicker() {
  return (
    <DatePicker
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      locale="zh-CN"
      startOfWeek={1} // 周一开始
      i18nStrings={{
        todayAriaLabel: "今天",
        nextMonthAriaLabel: "下个月",
        previousMonthAriaLabel: "上个月",
        renderMonthAriaLive: (month, year) => `${year}年${month}`
      }}
    />
  );
}
```

### 1.5 最佳实践
- 使用 `isDateEnabled` 限制可选日期范围
- 提供清晰的错误提示和禁用原因
- 根据业务场景选择合适的 `granularity`
- 为无障碍访问提供完整的 aria 标签

### 1.6 常见场景
```typescript
// 工作日选择器
<DatePicker
  isDateEnabled={(date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 排除周末
  }}
  dateDisabledReason={(date) => {
    const day = date.getDay();
    return (day === 0 || day === 6) ? "周末不可选" : "";
  }}
/>

// 月份选择器
<DatePicker
  granularity="month"
  placeholder="选择月份"
/>
```

### 1.7 注意事项
- 日期格式遵循 ISO 8601 标准 (YYYY-MM-DD)
- `isDateEnabled` 会影响性能，避免复杂计算
- 在表单中使用时配合 FormField 组件
- 移动端会自动使用原生日期选择器

---

## 2. DateRangePicker - 日期范围选择器

### 2.1 组件概述
日期范围选择器，支持选择开始和结束日期，提供预设范围选项。

### 2.2 完整 API
```typescript
interface DateRangePickerProps {
  value?: {
    type: 'absolute' | 'relative';
    startDate?: string;
    endDate?: string;
    amount?: number;
    unit?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
    key?: string;
  } | null;
  onChange?: (event: { detail: { value: DateRangePickerProps.Value } }) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  controlId?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  locale?: string;
  startOfWeek?: number;
  isDateEnabled?: (date: Date) => boolean;
  dateDisabledReason?: (date: Date) => string;
  relativeOptions?: Array<{
    key: string;
    amount: number;
    unit: string;
    type: 'relative';
  }>;
  isValidRange?: (range: DateRangePickerProps.Value | null) => { valid: boolean; errorReason?: string };
  i18nStrings?: {
    todayAriaLabel?: string;
    nextMonthAriaLabel?: string;
    previousMonthAriaLabel?: string;
    customRelativeRangeDurationLabel?: string;
    customRelativeRangeDurationPlaceholder?: string;
    customRelativeRangeOptionLabel?: string;
    customRelativeRangeOptionDescription?: string;
    customRelativeRangeUnitLabel?: string;
    formatRelativeRange?: (value: DateRangePickerProps.RelativeValue) => string;
    formatUnit?: (unit: string, value: number) => string;
    dateTimeConstraintText?: string;
    relativeModeTitle?: string;
    absoluteModeTitle?: string;
    relativeRangeSelectionHeading?: string;
    startDateLabel?: string;
    endDateLabel?: string;
    startTimeLabel?: string;
    endTimeLabel?: string;
    clearButtonLabel?: string;
    cancelButtonLabel?: string;
    applyButtonLabel?: string;
  };
}
```

### 2.3 基础示例
```typescript
function BasicDateRangePicker() {
  const [value, setValue] = useState(null);

  return (
    <DateRangePicker
      value={value}
      onChange={({ detail }) => setValue(detail.value)}
      placeholder="选择日期范围"
      relativeOptions={[
        { key: 'previous-5-minutes', amount: 5, unit: 'minute', type: 'relative' },
        { key: 'previous-30-minutes', amount: 30, unit: 'minute', type: 'relative' },
        { key: 'previous-1-hour', amount: 1, unit: 'hour', type: 'relative' },
        { key: 'previous-6-hours', amount: 6, unit: 'hour', type: 'relative' }
      ]}
    />
  );
}
```

### 2.4 进阶示例
```typescript
// 带验证的日期范围选择器
function ValidatedDateRangePicker() {
  const [value, setValue] = useState(null);

  const validateRange = (range) => {
    if (!range) return { valid: true };
    
    if (range.type === 'absolute') {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);
      
      if (diffDays > 90) {
        return { 
          valid: false, 
          errorReason: "日期范围不能超过90天" 
        };
      }
    }
    
    return { valid: true };
  };

  return (
    <FormField label="查询时间范围">
      <DateRangePicker
        value={value}
        onChange={({ detail }) => setValue(detail.value)}
        isValidRange={validateRange}
        relativeOptions={[
          { key: 'last-7-days', amount: 7, unit: 'day', type: 'relative' },
          { key: 'last-30-days', amount: 30, unit: 'day', type: 'relative' },
          { key: 'last-90-days', amount: 90, unit: 'day', type: 'relative' }
        ]}
        i18nStrings={{
          relativeModeTitle: "相对时间",
          absoluteModeTitle: "绝对时间",
          startDateLabel: "开始日期",
          endDateLabel: "结束日期",
          applyButtonLabel: "应用",
          cancelButtonLabel: "取消",
          clearButtonLabel: "清除"
        }}
      />
    </FormField>
  );
}

// 监控数据查询范围选择器
function MonitoringDateRangePicker() {
  const [timeRange, setTimeRange] = useState({
    type: 'relative',
    amount: 1,
    unit: 'hour'
  });

  return (
    <DateRangePicker
      value={timeRange}
      onChange={({ detail }) => setTimeRange(detail.value)}
      relativeOptions={[
        { key: 'last-15-minutes', amount: 15, unit: 'minute', type: 'relative' },
        { key: 'last-1-hour', amount: 1, unit: 'hour', type: 'relative' },
        { key: 'last-6-hours', amount: 6, unit: 'hour', type: 'relative' },
        { key: 'last-24-hours', amount: 24, unit: 'hour', type: 'relative' },
        { key: 'last-7-days', amount: 7, unit: 'day', type: 'relative' }
      ]}
      i18nStrings={{
        formatRelativeRange: (value) => {
          const unitMap = {
            minute: '分钟',
            hour: '小时', 
            day: '天'
          };
          return `过去 ${value.amount} ${unitMap[value.unit]}`;
        }
      }}
    />
  );
}
```

### 2.5 最佳实践
- 提供常用的相对时间选项
- 使用 `isValidRange` 验证范围合理性
- 为不同业务场景定制预设选项
- 提供完整的国际化字符串

### 2.6 常见场景
```typescript
// 日志查询范围
const logQueryOptions = [
  { key: 'last-5-minutes', amount: 5, unit: 'minute', type: 'relative' },
  { key: 'last-15-minutes', amount: 15, unit: 'minute', type: 'relative' },
  { key: 'last-1-hour', amount: 1, unit: 'hour', type: 'relative' },
  { key: 'last-24-hours', amount: 24, unit: 'hour', type: 'relative' }
];

// 报表时间范围
const reportOptions = [
  { key: 'last-7-days', amount: 7, unit: 'day', type: 'relative' },
  { key: 'last-30-days', amount: 30, unit: 'day', type: 'relative' },
  { key: 'last-3-months', amount: 3, unit: 'month', type: 'relative' },
  { key: 'last-1-year', amount: 1, unit: 'year', type: 'relative' }
];
```

### 2.7 注意事项
- 相对时间基于当前时间计算
- 绝对时间使用 ISO 8601 格式
- 验证函数会在每次值变化时调用
- 移动端体验需要特别优化

---

## 3. TimeInput - 时间输入框

### 3.1 组件概述
时间输入组件，支持小时、分钟、秒的输入，提供12/24小时制切换。

### 3.2 完整 API
```typescript
interface TimeInputProps {
  value?: string;
  onChange?: (event: { detail: { value: string } }) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  warning?: boolean;
  controlId?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  format?: 'hh:mm' | 'hh:mm:ss';
  use24Hour?: boolean;
  autoComplete?: boolean;
}
```

### 3.3 基础示例
```typescript
function BasicTimeInput() {
  const [time, setTime] = useState('');

  return (
    <TimeInput
      value={time}
      onChange={({ detail }) => setTime(detail.value)}
      placeholder="选择时间"
      format="hh:mm"
      use24Hour={true}
    />
  );
}
```

### 3.4 进阶示例
```typescript
// 工作时间设置
function WorkingHoursInput() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [invalid, setInvalid] = useState(false);

  const validateTimeRange = (start, end) => {
    if (!start || !end) return false;
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return endMinutes <= startMinutes;
  };

  const handleStartTimeChange = ({ detail }) => {
    setStartTime(detail.value);
    setInvalid(validateTimeRange(detail.value, endTime));
  };

  const handleEndTimeChange = ({ detail }) => {
    setEndTime(detail.value);
    setInvalid(validateTimeRange(startTime, detail.value));
  };

  return (
    <SpaceBetween size="m">
      <FormField label="开始时间">
        <TimeInput
          value={startTime}
          onChange={handleStartTimeChange}
          format="hh:mm"
          use24Hour={true}
          invalid={invalid}
        />
      </FormField>
      <FormField 
        label="结束时间"
        errorText={invalid ? "结束时间必须晚于开始时间" : ""}
      >
        <TimeInput
          value={endTime}
          onChange={handleEndTimeChange}
          format="hh:mm"
          use24Hour={true}
          invalid={invalid}
        />
      </FormField>
    </SpaceBetween>
  );
}

// 定时任务时间设置
function ScheduleTimeInput() {
  const [scheduleTime, setScheduleTime] = useState('');
  const [format, setFormat] = useState('hh:mm:ss');

  return (
    <SpaceBetween size="m">
      <FormField label="执行时间">
        <TimeInput
          value={scheduleTime}
          onChange={({ detail }) => setScheduleTime(detail.value)}
          format={format}
          use24Hour={true}
          placeholder="00:00:00"
        />
      </FormField>
      <FormField label="时间格式">
        <RadioGroup
          value={format}
          onChange={({ detail }) => setFormat(detail.value)}
          items={[
            { value: 'hh:mm', label: '小时:分钟' },
            { value: 'hh:mm:ss', label: '小时:分钟:秒' }
          ]}
        />
      </FormField>
    </SpaceBetween>
  );
}
```

### 3.5 最佳实践
- 根据业务需求选择合适的时间格式
- 提供清晰的时间范围验证
- 考虑用户的时区和本地化需求
- 在移动端优化输入体验

### 3.6 常见场景
```typescript
// 会议时间安排
<TimeInput
  value={meetingTime}
  onChange={({ detail }) => setMeetingTime(detail.value)}
  format="hh:mm"
  use24Hour={false} // 12小时制
/>

// 系统维护时间窗口
<TimeInput
  value={maintenanceTime}
  onChange={({ detail }) => setMaintenanceTime(detail.value)}
  format="hh:mm:ss"
  use24Hour={true}
  placeholder="维护开始时间"
/>
```

### 3.7 注意事项
- 时间格式为 HH:MM 或 HH:MM:SS
- `use24Hour` 影响显示格式，不影响值格式
- 在表单验证中注意时间范围检查
- 考虑不同时区的时间处理

---

## 4. Calendar - 日历组件

### 4.1 组件概述
独立的日历显示组件，支持日期选择、事件标记和自定义渲染。

### 4.2 完整 API
```typescript
interface CalendarProps {
  value?: string;
  onChange?: (event: { detail: { value: string } }) => void;
  locale?: string;
  startOfWeek?: number;
  isDateEnabled?: (date: Date) => boolean;
  dateDisabledReason?: (date: Date) => string;
  granularity?: 'day' | 'month' | 'year';
  todayAriaLabel?: string;
  nextMonthAriaLabel?: string;
  previousMonthAriaLabel?: string;
  i18nStrings?: {
    todayAriaLabel?: string;
    nextMonthAriaLabel?: string;
    previousMonthAriaLabel?: string;
    renderMonthAriaLive?: (monthName: string, year: string) => string;
  };
}
```

### 4.3 基础示例
```typescript
function BasicCalendar() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Calendar
      value={selectedDate}
      onChange={({ detail }) => setSelectedDate(detail.value)}
      locale="zh-CN"
      startOfWeek={1}
    />
  );
}
```

### 4.4 进阶示例
```typescript
// 事件日历
function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events] = useState({
    '2024-01-15': ['会议', '培训'],
    '2024-01-20': ['项目评审'],
    '2024-01-25': ['团建活动']
  });

  const hasEvent = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events[dateStr]?.length > 0;
  };

  return (
    <SpaceBetween size="m">
      <Calendar
        value={selectedDate}
        onChange={({ detail }) => setSelectedDate(detail.value)}
        isDateEnabled={(date) => {
          // 高亮有事件的日期
          return true;
        }}
        dateDisabledReason={(date) => {
          const dateStr = date.toISOString().split('T')[0];
          const dayEvents = events[dateStr];
          return dayEvents ? `事件: ${dayEvents.join(', ')}` : '';
        }}
      />
      {selectedDate && events[selectedDate] && (
        <Container>
          <h3>{selectedDate} 的事件</h3>
          <ul>
            {events[selectedDate].map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </Container>
      )}
    </SpaceBetween>
  );
}

// 工作日历
function WorkCalendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const workdays = ['2024-01-15', '2024-01-16', '2024-01-17'];
  const holidays = ['2024-01-20', '2024-01-21'];

  return (
    <Calendar
      value={selectedDate}
      onChange={({ detail }) => setSelectedDate(detail.value)}
      isDateEnabled={(date) => {
        const dateStr = date.toISOString().split('T')[0];
        // 节假日不可选
        return !holidays.includes(dateStr);
      }}
      dateDisabledReason={(date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (holidays.includes(dateStr)) return '节假日';
        if (workdays.includes(dateStr)) return '工作日';
        return '';
      }}
      i18nStrings={{
        todayAriaLabel: "今天",
        nextMonthAriaLabel: "下个月", 
        previousMonthAriaLabel: "上个月"
      }}
    />
  );
}
```

### 4.5 最佳实践
- 使用 `isDateEnabled` 控制日期可选性
- 通过 `dateDisabledReason` 提供提示信息
- 合理设置 `startOfWeek` 符合本地习惯
- 提供完整的无障碍访问支持

### 4.6 常见场景
```typescript
// 预约日历
<Calendar
  isDateEnabled={(date) => {
    const day = date.getDay();
    const today = new Date();
    return date >= today && day !== 0 && day !== 6; // 未来工作日
  }}
  dateDisabledReason={(date) => {
    const day = date.getDay();
    if (date < new Date()) return '过去日期不可选';
    if (day === 0 || day === 6) return '周末不营业';
    return '';
  }}
/>

// 月份选择日历
<Calendar
  granularity="month"
  value={selectedMonth}
  onChange={({ detail }) => setSelectedMonth(detail.value)}
/>
```

### 4.7 注意事项
- 日历组件占用较大空间，适合独立展示
- 在移动端考虑响应式布局
- 事件处理要考虑性能优化
- 本地化设置影响日期显示格式

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 单日期选择 | DatePicker |
| 日期范围查询 | DateRangePicker |
| 时间设置 | TimeInput |
| 日历展示 | Calendar |

### 最佳实践

```typescript
// ✅ 组合使用日期时间组件
<SpaceBetween size="m">
  <FormField label="日期">
    <DatePicker value={date} onChange={setDate} />
  </FormField>
  <FormField label="时间">
    <TimeInput value={time} onChange={setTime} />
  </FormField>
</SpaceBetween>

// ✅ 提供验证和错误处理
<DateRangePicker
  isValidRange={(range) => ({
    valid: isValidBusinessRange(range),
    errorReason: "超出业务允许范围"
  })}
/>

// ✅ 本地化配置
<DatePicker
  locale="zh-CN"
  startOfWeek={1}
  i18nStrings={chineseStrings}
/>
```

### 常见模式

```typescript
// 查询表单的时间范围
function QueryForm() {
  const [timeRange, setTimeRange] = useState(null);
  
  return (
    <Form>
      <FormField label="查询时间">
        <DateRangePicker
          value={timeRange}
          onChange={({ detail }) => setTimeRange(detail.value)}
          relativeOptions={commonRelativeOptions}
        />
      </FormField>
    </Form>
  );
}

// 定时任务配置
function ScheduleConfig() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  return (
    <SpaceBetween size="m">
      <DatePicker value={date} onChange={setDate} />
      <TimeInput value={time} onChange={setTime} format="hh:mm:ss" />
    </SpaceBetween>
  );
}
```

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：表单基础](./COMPONENTS_03_FORMS_BASIC.md) | [下一模块：表单高级](./COMPONENTS_06_FORMS_ADVANCED.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15