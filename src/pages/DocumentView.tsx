import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, SpaceBetween, Box, Spinner } from '@cloudscape-design/components';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export default function DocumentView() {
  const { id: moduleId } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!moduleId) return;

    const loadMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/docs/${moduleId}.md`);
        if (!response.ok) {
          throw new Error('文档未找到');
        }
        const text = await response.text();
        setContent(text);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
        setContent(`# ${moduleId} 文档\n\n文档加载失败，请检查文件是否存在。`);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [moduleId]);

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="xl">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  return (
    <SpaceBetween direction="vertical" size="l">
      <Header variant="h1">{moduleId} 文档</Header>
      {error && (
        <Container>
          <Box color="text-status-error" padding="s">
            {error}
          </Box>
        </Container>
      )}
      <MarkdownRenderer content={content} />
    </SpaceBetween>
  );
}