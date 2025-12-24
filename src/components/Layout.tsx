import AppLayout from '@cloudscape-design/components/app-layout';
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
      toolsHide={true}
      content={children}
      headerSelector="#header"
    />
  );
};