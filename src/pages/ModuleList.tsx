import { Container, Header, Cards, Link } from '@cloudscape-design/components';

const modules = [
  { id: 'button', name: 'Button', description: '按钮组件，支持多种样式和状态' },
  { id: 'input', name: 'Input', description: '输入框组件，支持验证和格式化' },
  { id: 'table', name: 'Table', description: '表格组件，支持排序、筛选和分页' },
  { id: 'form', name: 'Form', description: '表单组件，提供完整的表单解决方案' },
  { id: 'modal', name: 'Modal', description: '模态框组件，用于显示重要信息' },
  { id: 'navigation', name: 'Navigation', description: '导航组件，提供站点导航功能' },
  { id: 'layout', name: 'Layout', description: '布局组件，帮助构建页面结构' },
  { id: 'cards', name: 'Cards', description: '卡片组件，展示结构化内容' },
  { id: 'charts', name: 'Charts', description: '图表组件，数据可视化解决方案' },
  { id: 'datepicker', name: 'DatePicker', description: '日期选择器，支持多种日期格式' },
  { id: 'select', name: 'Select', description: '选择器组件，支持单选和多选' },
  { id: 'pagination', name: 'Pagination', description: '分页组件，处理大量数据展示' },
  { id: 'breadcrumb', name: 'Breadcrumb', description: '面包屑导航，显示当前位置' },
  { id: 'alert', name: 'Alert', description: '警告提示组件，显示重要消息' },
  { id: 'progress', name: 'Progress', description: '进度条组件，显示任务进度' },
  { id: 'tabs', name: 'Tabs', description: '标签页组件，组织相关内容' },
  { id: 'sidebar', name: 'Sidebar', description: '侧边栏组件，提供辅助导航' }
];

export default function ModuleList() {
  return (
    <Container header={<Header variant="h1">组件模块列表</Header>}>
      <Cards
        cardDefinition={{
          header: item => (
            <Link href={`/document/${item.id}`} fontSize="heading-m">
              {item.name}
            </Link>
          ),
          sections: [
            {
              content: item => item.description
            }
          ]
        }}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 2 },
          { minWidth: 800, cards: 3 }
        ]}
        items={modules}
      />
    </Container>
  );
}