import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Flashbar from '@cloudscape-design/components/flashbar';
import type { FlashbarProps } from '@cloudscape-design/components/flashbar';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setNotifications([{
      type: 'success',
      content: 'Code copied to clipboard',
      dismissible: true,
      onDismiss: () => setNotifications([]),
      id: Date.now().toString()
    }]);
  };

  return (
    <Container>
      <Flashbar items={notifications} />
      <ReactMarkdown
        components={{
          code(props) {
            const { children, className } = props;
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            if (match) {
              return (
                <Box margin={{ bottom: 's' }}>
                  <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                    >
                      {codeString}
                    </SyntaxHighlighter>
                    <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                      <Button
                        variant="icon"
                        iconName="copy"
                        onClick={() => copyToClipboard(codeString)}
                        ariaLabel="Copy code"
                      />
                    </div>
                  </div>
                </Box>
              );
            }
            
            return <code className={className}>{children}</code>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
};