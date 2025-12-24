import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Header, 
  SpaceBetween, 
  Box, 
  Spinner, 
  BreadcrumbGroup,
  Alert,
  Button
} from '@cloudscape-design/components';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { componentToModule } from '../utils/componentMapping';

export default function DocumentView() {
  const { id: moduleId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 组件名称重定向
  useEffect(() => {
    if (moduleId && !moduleId.startsWith('COMPONENTS_') && !moduleId.startsWith('CLOUDSCAPE_')) {
      const normalizedId = moduleId.toLowerCase().replace(/[-_]/g, '');
      const targetModule = componentToModule[normalizedId];
      
      if (targetModule) {
        navigate(`/document/${targetModule}`, { replace: true });
        return;
      }
    }
  }, [moduleId, navigate]);

  // 动态更新页面标题
  useEffect(() => {
    document.title = moduleId ? `${moduleId} - 文档` : '文档';
    return () => { document.title = '文档'; };
  }, [moduleId]);

  // 返回顶部按钮显示控制
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <SpaceBetween direction="vertical" size="l">
        <BreadcrumbGroup
          items={[
            { text: '首页', href: '/' },
            { text: '文档', href: '/docs' },
            { text: moduleId || '未知', href: '#' }
          ]}
          onFollow={(e) => {
            e.preventDefault();
            if (e.detail.href !== '#') navigate(e.detail.href);
          }}
        />
        
        <Header variant="h1">{moduleId} 文档</Header>
        
        {error && (
          <Alert
            type="error"
            header="加载失败"
            action={
              <Button onClick={() => window.location.reload()}>
                重试
              </Button>
            }
          >
            {error}。请检查网络连接或稍后重试。
          </Alert>
        )}
        
        {!error && <MarkdownRenderer content={content} />}
      </SpaceBetween>

      {showBackToTop && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <Button
            variant="primary"
            iconName="angle-up"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            ariaLabel="返回顶部"
          />
        </div>
      )}
    </div>
  );
}