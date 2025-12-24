import SideNavigation from '@cloudscape-design/components/side-navigation';
import type { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const navigationItems: SideNavigationProps.Item[] = [
  { type: 'link', text: '🏠 首页', href: '/' },
  { type: 'link', text: '📚 所有模块', href: '/modules' },
  { type: 'link', text: '🔍 组件索引', href: '/components' },
  { type: 'link', text: '🎨 官方 Demo', href: 'https://cloudscape.design/demos/', external: true },
  { type: 'divider' },
  { type: 'link', text: '01 - 布局组件', href: '/document/COMPONENTS_01_LAYOUT' },
  { type: 'link', text: '02 - 导航组件', href: '/document/COMPONENTS_02_NAVIGATION' },
  { type: 'link', text: '03 - 表单基础', href: '/document/COMPONENTS_03_FORMS_BASIC' },
  { type: 'link', text: '04 - 表单选择器', href: '/document/COMPONENTS_04_FORMS_SELECTORS' },
  { type: 'link', text: '05 - 表单日期', href: '/document/COMPONENTS_05_FORMS_DATETIME' },
  { type: 'link', text: '06 - 表单高级', href: '/document/COMPONENTS_06_FORMS_ADVANCED' },
  { type: 'link', text: '07 - 表单容器', href: '/document/COMPONENTS_07_FORMS_CONTAINERS' },
  { type: 'link', text: '08 - 表格 ⭐', href: '/document/COMPONENTS_08_TABLE' },
  { type: 'link', text: '09 - 数据列表', href: '/document/COMPONENTS_09_DATA_LISTS' },
  { type: 'link', text: '10 - 数据基础', href: '/document/COMPONENTS_10_DATA_BASIC' },
  { type: 'link', text: '11 - 图表 ⭐', href: '/document/COMPONENTS_11_CHARTS' },
  { type: 'link', text: '12 - 反馈组件', href: '/document/COMPONENTS_12_FEEDBACK' },
  { type: 'link', text: '13 - 容器组件', href: '/document/COMPONENTS_13_CONTAINERS' },
  { type: 'link', text: '14 - 按钮组件', href: '/document/COMPONENTS_14_BUTTONS' },
  { type: 'link', text: '15 - 工具组件', href: '/document/COMPONENTS_15_UTILITIES' },
  { type: 'link', text: '16 - 特殊组件', href: '/document/COMPONENTS_16_SPECIALIZED' },
  { type: 'link', text: '17 - 其他组件', href: '/document/COMPONENTS_17_MISC' },
  { type: 'divider' },
  { type: 'link', text: '📘 技术分析', href: '/document/CLOUDSCAPE_TECH_ANALYSIS' },
  { type: 'link', text: '📗 后台开发指南', href: '/document/CLOUDSCAPE_BACKEND_GUIDE' }
];

export const Navigation = () => {
  return (
    <SideNavigation
      header={{ text: 'Cloudscape Components', href: '/' }}
      items={navigationItems}
    />
  );
};