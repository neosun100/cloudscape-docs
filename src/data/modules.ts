export interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  componentCount: number;
  fileSize: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  importance: 'high' | 'medium' | 'low';
  filename: string;
  components: string[];
}

export const modules: ModuleMetadata[] = [
  {
    id: 'layout',
    title: '布局组件',
    description: '页面布局和空间组织的核心组件，包括应用布局、内容布局、栅格系统等',
    componentCount: 5,
    fileSize: '18 KB',
    difficulty: 'beginner',
    importance: 'high',
    filename: 'COMPONENTS_01_LAYOUT.md',
    components: ['AppLayout', 'ContentLayout', 'ColumnLayout', 'Grid', 'SpaceBetween']
  },
  {
    id: 'navigation',
    title: '导航组件',
    description: '用户导航和页面跳转的组件，包括顶部导航、侧边导航、面包屑等',
    componentCount: 6,
    fileSize: '9.5 KB',
    difficulty: 'beginner',
    importance: 'high',
    filename: 'COMPONENTS_02_NAVIGATION.md',
    components: ['TopNavigation', 'SideNavigation', 'BreadcrumbGroup', 'Tabs', 'Wizard', 'AnchorNavigation']
  },
  {
    id: 'forms-basic',
    title: '表单组件 - 基础输入',
    description: '基础的表单输入组件，包括文本输入、下拉选择、自动建议等',
    componentCount: 5,
    fileSize: '36 KB',
    difficulty: 'beginner',
    importance: 'high',
    filename: 'COMPONENTS_03_FORMS_BASIC.md',
    components: ['Input', 'Textarea', 'Select', 'Multiselect', 'Autosuggest']
  },
  {
    id: 'forms-selectors',
    title: '表单组件 - 选择器',
    description: '各种选择器组件，包括复选框、单选按钮、开关、分段控制等',
    componentCount: 5,
    fileSize: '21 KB',
    difficulty: 'beginner',
    importance: 'medium',
    filename: 'COMPONENTS_04_FORMS_SELECTORS.md',
    components: ['Checkbox', 'RadioGroup', 'Toggle', 'SegmentedControl', 'Tiles']
  },
  {
    id: 'forms-datetime',
    title: '表单组件 - 日期时间',
    description: '日期和时间相关的输入组件，包括日期选择器、时间输入、日历等',
    componentCount: 4,
    fileSize: '20 KB',
    difficulty: 'intermediate',
    importance: 'medium',
    filename: 'COMPONENTS_05_FORMS_DATETIME.md',
    components: ['DatePicker', 'DateRangePicker', 'TimeInput', 'Calendar']
  },
  {
    id: 'forms-advanced',
    title: '表单组件 - 高级',
    description: '高级表单组件，包括文件上传、滑块、属性编辑器、标签编辑器等',
    componentCount: 6,
    fileSize: '31 KB',
    difficulty: 'advanced',
    importance: 'medium',
    filename: 'COMPONENTS_06_FORMS_ADVANCED.md',
    components: ['FileUpload', 'FileDropzone', 'FileInput', 'Slider', 'AttributeEditor', 'TagEditor']
  },
  {
    id: 'forms-containers',
    title: '表单组件 - 容器',
    description: '表单容器和字段组织组件，包括表单、表单字段、提示输入等',
    componentCount: 3,
    fileSize: '20 KB',
    difficulty: 'intermediate',
    importance: 'medium',
    filename: 'COMPONENTS_07_FORMS_CONTAINERS.md',
    components: ['Form', 'FormField', 'PromptInput']
  },
  {
    id: 'table',
    title: '数据展示 - 表格',
    description: '功能强大的表格组件，支持排序、过滤、选择、可调整列宽、粘性表头等高级功能',
    componentCount: 1,
    fileSize: '48 KB',
    difficulty: 'advanced',
    importance: 'high',
    filename: 'COMPONENTS_08_TABLE.md',
    components: ['Table']
  },
  {
    id: 'data-lists',
    title: '数据展示 - 列表',
    description: '数据列表和集合展示组件，包括卡片、属性过滤器、文本过滤器等',
    componentCount: 5,
    fileSize: '30 KB',
    difficulty: 'intermediate',
    importance: 'high',
    filename: 'COMPONENTS_09_DATA_LISTS.md',
    components: ['Cards', 'PropertyFilter', 'TextFilter', 'CollectionPreferences', 'Pagination']
  },
  {
    id: 'data-basic',
    title: '数据展示 - 基础',
    description: '基础的数据展示组件，包括键值对、状态指示器、徽章、进度条等',
    componentCount: 6,
    fileSize: '17 KB',
    difficulty: 'beginner',
    importance: 'medium',
    filename: 'COMPONENTS_10_DATA_BASIC.md',
    components: ['KeyValuePairs', 'StatusIndicator', 'Badge', 'ProgressBar', 'Spinner', 'Icon']
  },
  {
    id: 'charts',
    title: '图表组件',
    description: '数据可视化图表组件，包括折线图、柱状图、饼图、面积图、混合图表等',
    componentCount: 5,
    fileSize: '18 KB',
    difficulty: 'advanced',
    importance: 'high',
    filename: 'COMPONENTS_11_CHARTS.md',
    components: ['LineChart', 'BarChart', 'PieChart', 'AreaChart', 'MixedLineBarChart']
  },
  {
    id: 'feedback',
    title: '反馈组件',
    description: '用户反馈和交互组件，包括警告、闪现条、模态框、弹出框、帮助面板等',
    componentCount: 6,
    fileSize: '19 KB',
    difficulty: 'intermediate',
    importance: 'high',
    filename: 'COMPONENTS_12_FEEDBACK.md',
    components: ['Alert', 'Flashbar', 'Modal', 'Popover', 'HelpPanel', 'Drawer']
  },
  {
    id: 'containers',
    title: '容器组件',
    description: '内容容器和布局组件，包括容器、标题、可展开区域、分割面板等',
    componentCount: 4,
    fileSize: '17 KB',
    difficulty: 'beginner',
    importance: 'medium',
    filename: 'COMPONENTS_13_CONTAINERS.md',
    components: ['Container', 'Header', 'ExpandableSection', 'SplitPanel']
  },
  {
    id: 'buttons',
    title: '按钮组件',
    description: '各种按钮和操作组件，包括按钮、按钮下拉菜单、按钮组、切换按钮等',
    componentCount: 5,
    fileSize: '22 KB',
    difficulty: 'beginner',
    importance: 'high',
    filename: 'COMPONENTS_14_BUTTONS.md',
    components: ['Button', 'ButtonDropdown', 'ButtonGroup', 'ToggleButton', 'CopyToClipboard']
  },
  {
    id: 'utilities',
    title: '工具组件',
    description: '实用工具组件，包括盒子、文本内容、链接、标记、标记组等',
    componentCount: 6,
    fileSize: '21 KB',
    difficulty: 'beginner',
    importance: 'medium',
    filename: 'COMPONENTS_15_UTILITIES.md',
    components: ['Box', 'TextContent', 'Link', 'Token', 'TokenGroup', 'FileTokenGroup']
  },
  {
    id: 'specialized',
    title: '特殊组件',
    description: '专门用途的特殊组件，包括代码编辑器、S3资源选择器、树视图等',
    componentCount: 5,
    fileSize: '16 KB',
    difficulty: 'advanced',
    importance: 'low',
    filename: 'COMPONENTS_16_SPECIALIZED.md',
    components: ['CodeEditor', 'S3ResourceSelector', 'TreeView', 'AnnotationContext', 'Hotspot']
  },
  {
    id: 'misc',
    title: '其他组件',
    description: '其他杂项组件，包括步骤、列表、面板布局、实时区域等',
    componentCount: 4,
    fileSize: '16 KB',
    difficulty: 'intermediate',
    importance: 'low',
    filename: 'COMPONENTS_17_MISC.md',
    components: ['Steps', 'List', 'PanelLayout', 'LiveRegion']
  }
];

export const getModuleById = (id: string): ModuleMetadata | undefined => {
  return modules.find(module => module.id === id);
};

export const getModulesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): ModuleMetadata[] => {
  return modules.filter(module => module.difficulty === difficulty);
};

export const getModulesByImportance = (importance: 'high' | 'medium' | 'low'): ModuleMetadata[] => {
  return modules.filter(module => module.importance === importance);
};

export const getTotalComponentCount = (): number => {
  return modules.reduce((total, module) => total + module.componentCount, 0);
};

export const getTotalFileSize = (): string => {
  const totalKB = modules.reduce((total, module) => {
    const sizeMatch = module.fileSize.match(/(\d+(?:\.\d+)?)/);
    return total + (sizeMatch ? parseFloat(sizeMatch[1]) : 0);
  }, 0);
  return `${totalKB} KB`;
};