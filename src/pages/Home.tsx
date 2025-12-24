import { Container, Header, Cards, SpaceBetween, Box, Button } from '@cloudscape-design/components';

const modules = [
  { name: 'Button', description: '按钮组件' },
  { name: 'Input', description: '输入框组件' },
  { name: 'Table', description: '表格组件' },
  { name: 'Form', description: '表单组件' },
  { name: 'Modal', description: '模态框组件' },
  { name: 'Navigation', description: '导航组件' },
  { name: 'Layout', description: '布局组件' },
  { name: 'Cards', description: '卡片组件' },
  { name: 'Charts', description: '图表组件' },
  { name: 'DatePicker', description: '日期选择器' },
  { name: 'Select', description: '选择器组件' },
  { name: 'Pagination', description: '分页组件' },
  { name: 'Breadcrumb', description: '面包屑导航' },
  { name: 'Alert', description: '警告提示组件' },
  { name: 'Progress', description: '进度条组件' },
  { name: 'Tabs', description: '标签页组件' },
  { name: 'Sidebar', description: '侧边栏组件' }
];

export default function Home() {
  return (
    <SpaceBetween direction="vertical" size="l">
      <Container header={<Header variant="h1">Cloudscape 文档</Header>}>
        <Box>欢迎使用 Cloudscape Design System 文档站点。这里包含了所有组件的详细说明和使用示例。</Box>
      </Container>

      <Container header={<Header variant="h2">快速开始</Header>}>
        <SpaceBetween direction="vertical" size="m">
          <Box>安装 Cloudscape 组件库：</Box>
          <Box variant="code" padding="s">
            npm install @cloudscape-design/components @cloudscape-design/global-styles
          </Box>
          <Button variant="primary" href="/modules">查看所有模块</Button>
        </SpaceBetween>
      </Container>

      <Container header={<Header variant="h2">组件模块</Header>}>
        <Cards
          cardDefinition={{
            header: item => item.name,
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
    </SpaceBetween>
  );
}