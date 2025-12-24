import AppLayout from '@cloudscape-design/components/app-layout';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Link from '@cloudscape-design/components/link';
import { Navigation } from './Navigation';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppLayout
      navigation={<Navigation />}
      navigationOpen={true}
      navigationWidth={280}
      tools={
        <HelpPanel header="帮助">
          <h3>使用指南</h3>
          <p>浏览左侧导航查看组件文档和示例代码。</p>
          
          <h3>快捷键</h3>
          <p>Ctrl/Cmd + K: 搜索</p>
          
          <h3>链接</h3>
          <Link external href="https://github.com/cloudscape-design/components">
            GitHub 仓库
          </Link>
          
          <h3>反馈</h3>
          <Link external href="https://github.com/cloudscape-design/components/issues">
            提交问题或建议
          </Link>
        </HelpPanel>
      }
      content={children}
      headerSelector="#header"
    />
  );
};