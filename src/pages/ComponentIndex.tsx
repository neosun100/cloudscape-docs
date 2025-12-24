import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Input, Table, SpaceBetween } from '@cloudscape-design/components';

interface ComponentInfo {
  name: string;
  module: string;
  moduleId: string;
  description: string;
}

const allComponents: ComponentInfo[] = [
  // 布局组件
  { name: 'AppLayout', module: '01 - 布局组件', moduleId: 'COMPONENTS_01_LAYOUT', description: '应用主布局' },
  { name: 'ContentLayout', module: '01 - 布局组件', moduleId: 'COMPONENTS_01_LAYOUT', description: '内容布局' },
  { name: 'ColumnLayout', module: '01 - 布局组件', moduleId: 'COMPONENTS_01_LAYOUT', description: '列布局' },
  { name: 'Grid', module: '01 - 布局组件', moduleId: 'COMPONENTS_01_LAYOUT', description: '网格布局' },
  { name: 'SpaceBetween', module: '01 - 布局组件', moduleId: 'COMPONENTS_01_LAYOUT', description: '间距布局' },
  
  // 导航组件
  { name: 'TopNavigation', module: '02 - 导航组件', moduleId: 'COMPONENTS_02_NAVIGATION', description: '顶部导航' },
  { name: 'SideNavigation', module: '02 - 导航组件', moduleId: 'COMPONENTS_02_NAVIGATION', description: '侧边导航' },
  { name: 'BreadcrumbGroup', module: '02 - 导航组件', moduleId: 'COMPONENTS_02_NAVIGATION', description: '面包屑' },
  { name: 'Tabs', module: '02 - 导航组件', moduleId: 'COMPONENTS_02_NAVIGATION', description: '标签页' },
  { name: 'Wizard', module: '02 - 导航组件', moduleId: 'COMPONENTS_02_NAVIGATION', description: '向导' },
  
  // 表单基础
  { name: 'Input', module: '03 - 表单基础', moduleId: 'COMPONENTS_03_FORMS_BASIC', description: '输入框' },
  { name: 'Textarea', module: '03 - 表单基础', moduleId: 'COMPONENTS_03_FORMS_BASIC', description: '多行文本' },
  { name: 'Select', module: '03 - 表单基础', moduleId: 'COMPONENTS_03_FORMS_BASIC', description: '下拉选择' },
  { name: 'Multiselect', module: '03 - 表单基础', moduleId: 'COMPONENTS_03_FORMS_BASIC', description: '多选' },
  { name: 'Autosuggest', module: '03 - 表单基础', moduleId: 'COMPONENTS_03_FORMS_BASIC', description: '自动建议' },
  
  // 表单选择器
  { name: 'Checkbox', module: '04 - 表单选择器', moduleId: 'COMPONENTS_04_FORMS_SELECTORS', description: '复选框' },
  { name: 'RadioGroup', module: '04 - 表单选择器', moduleId: 'COMPONENTS_04_FORMS_SELECTORS', description: '单选组' },
  { name: 'Toggle', module: '04 - 表单选择器', moduleId: 'COMPONENTS_04_FORMS_SELECTORS', description: '开关' },
  
  // 表单日期
  { name: 'DatePicker', module: '05 - 表单日期', moduleId: 'COMPONENTS_05_FORMS_DATETIME', description: '日期选择' },
  { name: 'DateRangePicker', module: '05 - 表单日期', moduleId: 'COMPONENTS_05_FORMS_DATETIME', description: '日期范围' },
  
  // 表单高级
  { name: 'FileUpload', module: '06 - 表单高级', moduleId: 'COMPONENTS_06_FORMS_ADVANCED', description: '文件上传' },
  { name: 'Slider', module: '06 - 表单高级', moduleId: 'COMPONENTS_06_FORMS_ADVANCED', description: '滑块' },
  
  // 表单容器
  { name: 'Form', module: '07 - 表单容器', moduleId: 'COMPONENTS_07_FORMS_CONTAINERS', description: '表单' },
  { name: 'FormField', module: '07 - 表单容器', moduleId: 'COMPONENTS_07_FORMS_CONTAINERS', description: '表单字段' },
  
  // 表格
  { name: 'Table', module: '08 - 表格', moduleId: 'COMPONENTS_08_TABLE', description: '数据表格' },
  
  // 数据列表
  { name: 'Cards', module: '09 - 数据列表', moduleId: 'COMPONENTS_09_DATA_LISTS', description: '卡片列表' },
  { name: 'PropertyFilter', module: '09 - 数据列表', moduleId: 'COMPONENTS_09_DATA_LISTS', description: '属性过滤器' },
  { name: 'Pagination', module: '09 - 数据列表', moduleId: 'COMPONENTS_09_DATA_LISTS', description: '分页' },
  
  // 数据基础
  { name: 'StatusIndicator', module: '10 - 数据基础', moduleId: 'COMPONENTS_10_DATA_BASIC', description: '状态指示器' },
  { name: 'Badge', module: '10 - 数据基础', moduleId: 'COMPONENTS_10_DATA_BASIC', description: '徽章' },
  { name: 'ProgressBar', module: '10 - 数据基础', moduleId: 'COMPONENTS_10_DATA_BASIC', description: '进度条' },
  { name: 'Spinner', module: '10 - 数据基础', moduleId: 'COMPONENTS_10_DATA_BASIC', description: '加载指示器' },
  { name: 'Icon', module: '10 - 数据基础', moduleId: 'COMPONENTS_10_DATA_BASIC', description: '图标' },
  
  // 图表
  { name: 'LineChart', module: '11 - 图表', moduleId: 'COMPONENTS_11_CHARTS', description: '折线图' },
  { name: 'BarChart', module: '11 - 图表', moduleId: 'COMPONENTS_11_CHARTS', description: '柱状图' },
  { name: 'PieChart', module: '11 - 图表', moduleId: 'COMPONENTS_11_CHARTS', description: '饼图' },
  
  // 反馈
  { name: 'Alert', module: '12 - 反馈组件', moduleId: 'COMPONENTS_12_FEEDBACK', description: '警告框' },
  { name: 'Modal', module: '12 - 反馈组件', moduleId: 'COMPONENTS_12_FEEDBACK', description: '模态框' },
  { name: 'Flashbar', module: '12 - 反馈组件', moduleId: 'COMPONENTS_12_FEEDBACK', description: '通知栏' },
  
  // 容器
  { name: 'Container', module: '13 - 容器组件', moduleId: 'COMPONENTS_13_CONTAINERS', description: '容器' },
  { name: 'Header', module: '13 - 容器组件', moduleId: 'COMPONENTS_13_CONTAINERS', description: '标题' },
  
  // 按钮
  { name: 'Button', module: '14 - 按钮组件', moduleId: 'COMPONENTS_14_BUTTONS', description: '按钮' },
  { name: 'ButtonDropdown', module: '14 - 按钮组件', moduleId: 'COMPONENTS_14_BUTTONS', description: '按钮下拉' },
  { name: 'ButtonGroup', module: '14 - 按钮组件', moduleId: 'COMPONENTS_14_BUTTONS', description: '按钮组' },
  
  // 工具
  { name: 'Box', module: '15 - 工具组件', moduleId: 'COMPONENTS_15_UTILITIES', description: '盒子' },
  { name: 'Link', module: '15 - 工具组件', moduleId: 'COMPONENTS_15_UTILITIES', description: '链接' },
  
  // 特殊
  { name: 'CodeEditor', module: '16 - 特殊组件', moduleId: 'COMPONENTS_16_SPECIALIZED', description: '代码编辑器' },
  { name: 'TreeView', module: '16 - 特殊组件', moduleId: 'COMPONENTS_16_SPECIALIZED', description: '树视图' }
];

export default function ComponentIndex() {
  const [filterText, setFilterText] = useState('');

  const filteredComponents = allComponents.filter(comp =>
    comp.name.toLowerCase().includes(filterText.toLowerCase()) ||
    comp.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="按组件名称查找对应的文档模块">
        组件索引
      </Header>

      <Container>
        <Table
          items={filteredComponents}
          columnDefinitions={[
            {
              id: 'name',
              header: '组件名称',
              cell: item => <Link to={`/document/${item.moduleId}`}>{item.name}</Link>,
              sortingField: 'name'
            },
            {
              id: 'description',
              header: '说明',
              cell: item => item.description
            },
            {
              id: 'module',
              header: '所属模块',
              cell: item => item.module,
              sortingField: 'module'
            }
          ]}
          filter={
            <Input
              type="search"
              placeholder="搜索组件名称..."
              value={filterText}
              onChange={({ detail }) => setFilterText(detail.value)}
            />
          }
          header={<Header counter={`(${filteredComponents.length})`}>所有组件</Header>}
          empty="未找到匹配的组件"
        />
      </Container>
    </SpaceBetween>
  );
}
