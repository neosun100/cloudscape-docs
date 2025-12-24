import { useState } from 'react';
import { Container, Header, Cards, SpaceBetween, Box, Button, ColumnLayout, Input, Badge } from '@cloudscape-design/components';
import { modules, getTotalComponentCount, getTotalFileSize } from '../data/modules';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'red';
      default: return 'grey';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'red';
      case 'medium': return 'blue';
      case 'low': return 'grey';
      default: return 'grey';
    }
  };

  return (
    <SpaceBetween direction="vertical" size="l">
      <Container header={<Header variant="h1">Cloudscape 文档</Header>}>
        <Box>欢迎使用 Cloudscape Design System 文档站点。这里包含了所有组件的详细说明和使用示例。</Box>
      </Container>

      <Container header={<Header variant="h2">统计信息</Header>}>
        <ColumnLayout columns={3} variant="text-grid">
          <Box>
            <Box variant="h3" color="text-status-info">{modules.length}</Box>
            <Box variant="small">总模块数</Box>
          </Box>
          <Box>
            <Box variant="h3" color="text-status-success">{getTotalComponentCount()}</Box>
            <Box variant="small">总组件数</Box>
          </Box>
          <Box>
            <Box variant="h3" color="text-status-warning">{getTotalFileSize()}</Box>
            <Box variant="small">文档大小</Box>
          </Box>
        </ColumnLayout>
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
        <SpaceBetween direction="vertical" size="m">
          <Input
            placeholder="搜索模块..."
            value={searchTerm}
            onChange={({ detail }) => setSearchTerm(detail.value)}
          />
          <Cards
            cardDefinition={{
              header: item => item.title,
              sections: [
                {
                  content: item => (
                    <SpaceBetween direction="vertical" size="xs">
                      <Box>{item.description}</Box>
                      <SpaceBetween direction="horizontal" size="xs">
                        <Badge color={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                        <Badge color={getImportanceColor(item.importance)}>{item.importance}</Badge>
                        <Badge>{item.componentCount} 组件</Badge>
                      </SpaceBetween>
                    </SpaceBetween>
                  )
                }
              ]
            }}
            cardsPerRow={[
              { cards: 1 },
              { minWidth: 500, cards: 2 },
              { minWidth: 800, cards: 3 }
            ]}
            items={filteredModules}
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}