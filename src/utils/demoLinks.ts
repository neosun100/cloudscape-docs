// Cloudscape 官方组件 Demo 链接映射
export const componentDemoLinks: Record<string, string> = {
  // 布局
  'applayout': 'https://cloudscape.design/components/app-layout/',
  'contentlayout': 'https://cloudscape.design/components/content-layout/',
  'columnlayout': 'https://cloudscape.design/components/column-layout/',
  'grid': 'https://cloudscape.design/components/grid/',
  'spacebetween': 'https://cloudscape.design/components/space-between/',
  
  // 导航
  'topnavigation': 'https://cloudscape.design/components/top-navigation/',
  'sidenavigation': 'https://cloudscape.design/components/side-navigation/',
  'breadcrumbgroup': 'https://cloudscape.design/components/breadcrumb-group/',
  'tabs': 'https://cloudscape.design/components/tabs/',
  'wizard': 'https://cloudscape.design/components/wizard/',
  
  // 表单
  'input': 'https://cloudscape.design/components/input/',
  'textarea': 'https://cloudscape.design/components/textarea/',
  'select': 'https://cloudscape.design/components/select/',
  'multiselect': 'https://cloudscape.design/components/multiselect/',
  'autosuggest': 'https://cloudscape.design/components/autosuggest/',
  'checkbox': 'https://cloudscape.design/components/checkbox/',
  'radiogroup': 'https://cloudscape.design/components/radio-group/',
  'toggle': 'https://cloudscape.design/components/toggle/',
  'datepicker': 'https://cloudscape.design/components/date-picker/',
  'daterangepicker': 'https://cloudscape.design/components/date-range-picker/',
  'fileupload': 'https://cloudscape.design/components/file-upload/',
  'slider': 'https://cloudscape.design/components/slider/',
  'form': 'https://cloudscape.design/components/form/',
  'formfield': 'https://cloudscape.design/components/form-field/',
  
  // 数据展示
  'table': 'https://cloudscape.design/components/table/',
  'cards': 'https://cloudscape.design/components/cards/',
  'propertyfilter': 'https://cloudscape.design/components/property-filter/',
  'pagination': 'https://cloudscape.design/components/pagination/',
  'statusindicator': 'https://cloudscape.design/components/status-indicator/',
  'badge': 'https://cloudscape.design/components/badge/',
  'progressbar': 'https://cloudscape.design/components/progress-bar/',
  'spinner': 'https://cloudscape.design/components/spinner/',
  'icon': 'https://cloudscape.design/components/icon/',
  
  // 图表
  'linechart': 'https://cloudscape.design/components/line-chart/',
  'barchart': 'https://cloudscape.design/components/bar-chart/',
  'piechart': 'https://cloudscape.design/components/pie-chart/',
  'areachart': 'https://cloudscape.design/components/area-chart/',
  'mixedlinebarchart': 'https://cloudscape.design/components/mixed-line-bar-chart/',
  
  // 反馈
  'alert': 'https://cloudscape.design/components/alert/',
  'flashbar': 'https://cloudscape.design/components/flashbar/',
  'modal': 'https://cloudscape.design/components/modal/',
  'popover': 'https://cloudscape.design/components/popover/',
  
  // 容器
  'container': 'https://cloudscape.design/components/container/',
  'header': 'https://cloudscape.design/components/header/',
  'expandablesection': 'https://cloudscape.design/components/expandable-section/',
  
  // 按钮
  'button': 'https://cloudscape.design/components/button/',
  'buttondropdown': 'https://cloudscape.design/components/button-dropdown/',
  'buttongroup': 'https://cloudscape.design/components/button-group/',
  
  // 工具
  'box': 'https://cloudscape.design/components/box/',
  'link': 'https://cloudscape.design/components/link/',
  
  // 特殊
  'codeeditor': 'https://cloudscape.design/components/code-editor/',
  'treeview': 'https://cloudscape.design/components/tree-view/'
};

// 获取组件的 Demo 链接
export function getComponentDemoLink(componentName: string): string | undefined {
  const normalized = componentName.toLowerCase().replace(/[-_]/g, '');
  return componentDemoLinks[normalized];
}

// Cloudscape 官方 Demo 页面
export const officialDemos = {
  main: 'https://cloudscape.design/demos/',
  patterns: 'https://cloudscape.design/patterns/',
  components: 'https://cloudscape.design/components/'
};
