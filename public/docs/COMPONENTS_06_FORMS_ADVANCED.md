# 模块 06: 高级表单组件

> **模块**: 高级表单组件  
> **组件数**: 6 个  
> **难度**: ⭐⭐⭐⭐ 困难  
> **重要性**: ⭐⭐⭐⭐ 重要  
> **创建时间**: 2025-12-24

---

## 📖 模块说明

高级表单组件提供复杂的数据输入和编辑功能，适用于文件上传、数值调节、属性编辑等高级场景。

### 本模块包含的组件

1. **FileUpload** - 文件上传组件
2. **FileDropzone** - 拖拽文件上传区域
3. **FileInput** - 文件输入选择器
4. **Slider** - 滑块数值选择器
5. **AttributeEditor** - 属性编辑器
6. **TagEditor** - 标签编辑器

---

## 1. FileUpload - 文件上传组件

### 1.1 组件概述
完整的文件上传解决方案，支持多文件、进度显示、错误处理和文件预览。

### 1.2 完整 API
```typescript
interface FileUploadProps {
  value: File[];
  onChange: (event: { detail: { value: File[] } }) => void;
  multiple?: boolean;
  accept?: string;
  showFileLastModified?: boolean;
  showFileSize?: boolean;
  showFileThumbnail?: boolean;
  constraintText?: string;
  errorText?: string;
  warningText?: string;
  i18nStrings?: {
    uploadButtonText?: (multiple: boolean) => string;
    dropzoneText?: (multiple: boolean) => string;
    removeFileAriaLabel?: (index: number) => string;
    limitShowFewer?: string;
    limitShowMore?: string;
    errorIconAriaLabel?: string;
    warningIconAriaLabel?: string;
  };
  fileErrors?: Array<{
    file: File;
    errorMessage: string;
  }>;
  fileWarnings?: Array<{
    file: File;
    warningMessage: string;
  }>;
  tokenLimit?: number;
}
```

### 1.3 基础示例
```typescript
function BasicFileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      value={files}
      onChange={({ detail }) => setFiles(detail.value)}
      multiple
      accept="image/*,.pdf,.doc,.docx"
      constraintText="支持 JPG, PNG, PDF, DOC 格式，单个文件不超过 10MB"
      i18nStrings={{
        uploadButtonText: (multiple) => multiple ? "选择文件" : "选择文件",
        dropzoneText: (multiple) => multiple ? "拖拽文件到此处" : "拖拽文件到此处",
        removeFileAriaLabel: (index) => `删除文件 ${index + 1}`,
        limitShowFewer: "显示更少",
        limitShowMore: "显示更多"
      }}
    />
  );
}
```

### 1.4 进阶示例
```typescript
function AdvancedFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileErrors, setFileErrors] = useState<Array<{file: File, errorMessage: string}>>([]);

  const validateFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (file.size > maxSize) {
      return '文件大小不能超过 10MB';
    }
    if (!allowedTypes.includes(file.type)) {
      return '不支持的文件格式';
    }
    return null;
  };

  const handleFileChange = ({ detail }: { detail: { value: File[] } }) => {
    const newFiles = detail.value;
    const errors: Array<{file: File, errorMessage: string}> = [];
    
    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push({ file, errorMessage: error });
      }
    });
    
    setFileErrors(errors);
    setFiles(newFiles.filter(file => 
      !errors.some(error => error.file === file)
    ));
  };

  const uploadFiles = async () => {
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
      }
      setFiles([]);
    } catch (error) {
      console.error('上传失败:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SpaceBetween size="m">
      <FileUpload
        value={files}
        onChange={handleFileChange}
        multiple
        accept="image/*,.pdf"
        showFileSize
        showFileLastModified
        showFileThumbnail
        constraintText="支持 JPG, PNG, PDF 格式，单个文件不超过 10MB"
        fileErrors={fileErrors}
        tokenLimit={5}
        i18nStrings={{
          uploadButtonText: () => "选择文件",
          dropzoneText: () => "拖拽文件到此处或点击选择",
          removeFileAriaLabel: (index) => `删除第 ${index + 1} 个文件`
        }}
      />
      
      {files.length > 0 && (
        <Button
          variant="primary"
          loading={uploading}
          onClick={uploadFiles}
        >
          上传 {files.length} 个文件
        </Button>
      )}
    </SpaceBetween>
  );
}
```

### 1.5 最佳实践
- 提供清晰的文件格式和大小限制说明
- 实现客户端文件验证以提升用户体验
- 显示上传进度和错误信息
- 支持文件预览功能

### 1.6 常见场景
- 文档管理系统的文件上传
- 图片批量上传和处理
- 附件上传功能
- 导入数据文件

### 1.7 注意事项
- 始终在服务端进行文件验证
- 考虑大文件的分片上传
- 提供上传进度反馈
- 处理网络中断的重试机制

---

## 2. FileDropzone - 拖拽文件上传区域

### 2.1 组件概述
专门的拖拽上传区域，提供视觉反馈和文件处理功能。

### 2.2 完整 API
```typescript
interface FileDropzoneProps {
  children: React.ReactNode;
  onDropFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}
```

### 2.3 基础示例
```typescript
function BasicFileDropzone() {
  const handleDrop = (files: File[]) => {
    console.log('拖拽的文件:', files);
  };

  return (
    <FileDropzone
      onDropFiles={handleDrop}
      accept="image/*"
      multiple
    >
      <Box textAlign="center" padding="xxl">
        <Icon name="upload" size="big" />
        <Box variant="h3" padding={{ top: "s" }}>
          拖拽图片到此处
        </Box>
        <Box variant="p" color="text-body-secondary">
          支持 JPG, PNG 格式
        </Box>
      </Box>
    </FileDropzone>
  );
}
```

### 2.4 进阶示例
```typescript
function AdvancedFileDropzone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrop = async (files: File[]) => {
    const validFiles = files.filter(file => {
      return file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  return (
    <SpaceBetween size="m">
      <FileDropzone
        onDropFiles={handleDrop}
        accept="image/*"
        multiple
      >
        <Container>
          <Box textAlign="center" padding="xxl">
            <Icon 
              name={isDragOver ? "check" : "upload"} 
              size="big" 
              variant={isDragOver ? "success" : "normal"}
            />
            <Box variant="h3" padding={{ top: "s" }}>
              {isDragOver ? "释放文件" : "拖拽图片到此处"}
            </Box>
            <Box variant="p" color="text-body-secondary">
              支持 JPG, PNG 格式，单个文件不超过 5MB
            </Box>
          </Box>
        </Container>
      </FileDropzone>
      
      {uploadedFiles.length > 0 && (
        <Container header={<Header>已上传文件</Header>}>
          <SpaceBetween size="s">
            {uploadedFiles.map((file, index) => (
              <Box key={index}>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </Box>
            ))}
          </SpaceBetween>
        </Container>
      )}
    </SpaceBetween>
  );
}
```

### 2.5 最佳实践
- 提供清晰的拖拽区域视觉反馈
- 显示支持的文件格式和限制
- 实现拖拽状态的视觉变化
- 处理无效文件的错误提示

### 2.6 常见场景
- 批量图片上传
- 文档拖拽导入
- 配置文件上传
- 数据文件批量处理

### 2.7 注意事项
- 确保拖拽区域足够大且明显
- 提供备用的点击上传方式
- 处理拖拽过程中的视觉反馈
- 验证拖拽文件的有效性

---

## 3. FileInput - 文件输入选择器

### 3.1 组件概述
简单的文件选择输入组件，适用于单文件选择场景。

### 3.2 完整 API
```typescript
interface FileInputProps {
  value: File | null;
  onChange: (event: { detail: { value: File | null } }) => void;
  accept?: string;
  placeholder?: string;
  ariaLabel?: string;
  invalid?: boolean;
  warning?: boolean;
  controlId?: string;
}
```

### 3.3 基础示例
```typescript
function BasicFileInput() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FormField label="选择配置文件" constraintText="仅支持 JSON 格式">
      <FileInput
        value={file}
        onChange={({ detail }) => setFile(detail.value)}
        accept=".json"
        placeholder="选择 JSON 文件"
        ariaLabel="配置文件选择"
      />
    </FormField>
  );
}
```

### 3.4 进阶示例
```typescript
function AdvancedFileInput() {
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validateFile = async (file: File | null) => {
    if (!file) {
      setIsValid(true);
      setErrorMessage('');
      return;
    }

    try {
      const text = await file.text();
      JSON.parse(text);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage('无效的 JSON 文件格式');
    }
  };

  const handleFileChange = ({ detail }: { detail: { value: File | null } }) => {
    setConfigFile(detail.value);
    validateFile(detail.value);
  };

  return (
    <FormField 
      label="应用配置文件" 
      constraintText="上传 JSON 格式的配置文件"
      errorText={!isValid ? errorMessage : undefined}
    >
      <FileInput
        value={configFile}
        onChange={handleFileChange}
        accept=".json,application/json"
        placeholder="选择配置文件"
        invalid={!isValid}
        ariaLabel="应用配置文件选择"
      />
    </FormField>
  );
}
```

### 3.5 最佳实践
- 明确指定接受的文件类型
- 提供有意义的占位符文本
- 实现文件内容验证
- 显示清晰的错误信息

### 3.6 常见场景
- 配置文件导入
- 证书文件上传
- 单个文档选择
- 数据文件导入

### 3.7 注意事项
- 限制文件类型以提升安全性
- 验证文件内容而非仅依赖扩展名
- 提供文件选择后的预览或确认
- 处理文件读取错误

---

## 4. Slider - 滑块数值选择器

### 4.1 组件概述
滑块组件用于在指定范围内选择数值，支持单值和范围选择。

### 4.2 完整 API
```typescript
interface SliderProps {
  value: number | [number, number];
  onChange: (event: { detail: { value: number | [number, number] } }) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  hideFillLine?: boolean;
  hideValue?: boolean;
  tickMarks?: boolean;
  referenceValues?: Array<{
    position: number;
    label?: string;
  }>;
  i18nStrings?: {
    valueTextRange?: (value: [number, number]) => string;
    valueText?: (value: number) => string;
  };
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}
```

### 4.3 基础示例
```typescript
function BasicSlider() {
  const [cpuLimit, setCpuLimit] = useState(50);
  const [memoryRange, setMemoryRange] = useState<[number, number]>([1, 8]);

  return (
    <SpaceBetween size="m">
      <FormField label="CPU 使用限制 (%)">
        <Slider
          value={cpuLimit}
          onChange={({ detail }) => setCpuLimit(detail.value as number)}
          min={0}
          max={100}
          step={5}
          tickMarks
          ariaLabel="CPU 使用限制"
        />
      </FormField>

      <FormField label="内存范围 (GB)">
        <Slider
          value={memoryRange}
          onChange={({ detail }) => setMemoryRange(detail.value as [number, number])}
          min={1}
          max={32}
          step={1}
          tickMarks
          ariaLabel="内存范围选择"
          i18nStrings={{
            valueTextRange: ([min, max]) => `${min} GB - ${max} GB`
          }}
        />
      </FormField>
    </SpaceBetween>
  );
}
```

### 4.4 进阶示例
```typescript
function AdvancedSlider() {
  const [bandwidth, setBandwidth] = useState(100);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 500]);

  const bandwidthReferenceValues = [
    { position: 10, label: '基础' },
    { position: 100, label: '标准' },
    { position: 1000, label: '高性能' }
  ];

  const formatBandwidth = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} Gbps`;
    }
    return `${value} Mbps`;
  };

  const formatPrice = ([min, max]: [number, number]) => {
    return `¥${min} - ¥${max}`;
  };

  return (
    <SpaceBetween size="l">
      <Container header={<Header>服务器配置</Header>}>
        <SpaceBetween size="m">
          <FormField 
            label="网络带宽" 
            constraintText="选择适合的带宽配置"
          >
            <Slider
              value={bandwidth}
              onChange={({ detail }) => setBandwidth(detail.value as number)}
              min={1}
              max={10000}
              step={1}
              referenceValues={bandwidthReferenceValues}
              i18nStrings={{
                valueText: formatBandwidth
              }}
              ariaLabel="网络带宽选择"
            />
          </FormField>

          <FormField 
            label="价格范围" 
            constraintText="设置可接受的价格区间"
          >
            <Slider
              value={priceRange}
              onChange={({ detail }) => setPriceRange(detail.value as [number, number])}
              min={1}
              max={1000}
              step={10}
              tickMarks
              i18nStrings={{
                valueTextRange: formatPrice
              }}
              ariaLabel="价格范围选择"
            />
          </FormField>
        </SpaceBetween>
      </Container>

      <Container header={<Header>当前配置</Header>}>
        <KeyValuePairs
          items={[
            { label: '带宽', value: formatBandwidth(bandwidth) },
            { label: '价格范围', value: formatPrice(priceRange) }
          ]}
        />
      </Container>
    </SpaceBetween>
  );
}
```

### 4.5 最佳实践
- 提供合理的步长和范围
- 使用参考值标记重要节点
- 格式化显示值以提升可读性
- 提供清晰的标签和说明

### 4.6 常见场景
- 资源配置调整
- 价格范围筛选
- 性能参数设置
- 时间范围选择

### 4.7 注意事项
- 确保步长设置合理
- 考虑移动设备的触摸操作
- 提供键盘导航支持
- 显示当前值和范围

---

## 5. AttributeEditor - 属性编辑器

### 5.1 组件概述
动态键值对编辑器，支持添加、删除和修改属性，适用于配置管理和元数据编辑。

### 5.2 完整 API
```typescript
interface AttributeEditorProps {
  items: Array<{
    key: string;
    value: string;
  }>;
  onAddButtonClick: () => void;
  onRemoveButtonClick: (event: { detail: { itemIndex: number } }) => void;
  addButtonText?: string;
  removeButtonText?: string;
  definition: Array<{
    key: string;
    label: string;
    control: (item: any, itemIndex: number) => React.ReactNode;
    errorText?: (item: any) => string | null;
    warningText?: (item: any) => string | null;
  }>;
  isItemRemovable?: (item: any) => boolean;
  empty?: React.ReactNode;
  additionalInfo?: React.ReactNode;
  disableAddButton?: boolean;
  i18nStrings?: {
    keyHeader?: string;
    valueHeader?: string;
    optional?: string;
    keySuggestion?: string;
    valueSuggestion?: string;
    keyError?: string;
    valueError?: string;
    duplicateKeyError?: string;
    entryLimitReachedError?: (entryLimit: number) => string;
    entryLimitAvailableError?: (availableEntries: number) => string;
    removeButtonAriaLabel?: (item: any) => string;
  };
}
```

### 5.3 基础示例
```typescript
function BasicAttributeEditor() {
  const [attributes, setAttributes] = useState([
    { key: 'environment', value: 'production' },
    { key: 'version', value: '1.0.0' }
  ]);

  const definition = [
    {
      key: 'key',
      label: '属性名',
      control: (item: any, index: number) => (
        <Input
          value={item.key}
          onChange={({ detail }) => {
            const newItems = [...attributes];
            newItems[index] = { ...newItems[index], key: detail.value };
            setAttributes(newItems);
          }}
          placeholder="输入属性名"
        />
      )
    },
    {
      key: 'value',
      label: '属性值',
      control: (item: any, index: number) => (
        <Input
          value={item.value}
          onChange={({ detail }) => {
            const newItems = [...attributes];
            newItems[index] = { ...newItems[index], value: detail.value };
            setAttributes(newItems);
          }}
          placeholder="输入属性值"
        />
      )
    }
  ];

  return (
    <AttributeEditor
      items={attributes}
      definition={definition}
      onAddButtonClick={() => {
        setAttributes([...attributes, { key: '', value: '' }]);
      }}
      onRemoveButtonClick={({ detail }) => {
        const newItems = [...attributes];
        newItems.splice(detail.itemIndex, 1);
        setAttributes(newItems);
      }}
      addButtonText="添加属性"
      removeButtonText="删除"
      empty="暂无属性"
    />
  );
}
```

### 5.4 进阶示例
```typescript
function AdvancedAttributeEditor() {
  const [serverConfig, setServerConfig] = useState([
    { key: 'max_connections', value: '1000', type: 'number' },
    { key: 'enable_ssl', value: 'true', type: 'boolean' },
    { key: 'log_level', value: 'info', type: 'select' }
  ]);

  const validateKey = (item: any) => {
    if (!item.key) return '属性名不能为空';
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(item.key)) {
      return '属性名只能包含字母、数字和下划线，且不能以数字开头';
    }
    return null;
  };

  const validateValue = (item: any) => {
    if (!item.value) return '属性值不能为空';
    if (item.type === 'number' && isNaN(Number(item.value))) {
      return '请输入有效的数字';
    }
    return null;
  };

  const definition = [
    {
      key: 'key',
      label: '配置项',
      control: (item: any, index: number) => (
        <Input
          value={item.key}
          onChange={({ detail }) => updateItem(index, 'key', detail.value)}
          placeholder="配置项名称"
          invalid={!!validateKey(item)}
        />
      ),
      errorText: validateKey
    },
    {
      key: 'type',
      label: '类型',
      control: (item: any, index: number) => (
        <Select
          selectedOption={{ label: item.type, value: item.type }}
          onChange={({ detail }) => updateItem(index, 'type', detail.selectedOption.value)}
          options={[
            { label: '字符串', value: 'string' },
            { label: '数字', value: 'number' },
            { label: '布尔值', value: 'boolean' },
            { label: '选择', value: 'select' }
          ]}
        />
      )
    },
    {
      key: 'value',
      label: '值',
      control: (item: any, index: number) => {
        switch (item.type) {
          case 'boolean':
            return (
              <Select
                selectedOption={{ 
                  label: item.value === 'true' ? '是' : '否', 
                  value: item.value 
                }}
                onChange={({ detail }) => updateItem(index, 'value', detail.selectedOption.value)}
                options={[
                  { label: '是', value: 'true' },
                  { label: '否', value: 'false' }
                ]}
              />
            );
          case 'select':
            return (
              <Select
                selectedOption={{ label: item.value, value: item.value }}
                onChange={({ detail }) => updateItem(index, 'value', detail.selectedOption.value)}
                options={[
                  { label: 'debug', value: 'debug' },
                  { label: 'info', value: 'info' },
                  { label: 'warn', value: 'warn' },
                  { label: 'error', value: 'error' }
                ]}
              />
            );
          default:
            return (
              <Input
                value={item.value}
                onChange={({ detail }) => updateItem(index, 'value', detail.value)}
                placeholder="输入值"
                invalid={!!validateValue(item)}
                type={item.type === 'number' ? 'number' : 'text'}
              />
            );
        }
      },
      errorText: validateValue
    }
  ];

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...serverConfig];
    newItems[index] = { ...newItems[index], [field]: value };
    setServerConfig(newItems);
  };

  return (
    <Container header={<Header>服务器配置</Header>}>
      <AttributeEditor
        items={serverConfig}
        definition={definition}
        onAddButtonClick={() => {
          setServerConfig([...serverConfig, { key: '', value: '', type: 'string' }]);
        }}
        onRemoveButtonClick={({ detail }) => {
          const newItems = [...serverConfig];
          newItems.splice(detail.itemIndex, 1);
          setServerConfig(newItems);
        }}
        addButtonText="添加配置项"
        removeButtonText="删除"
        empty="暂无配置项"
        additionalInfo="配置项将在服务器重启后生效"
        i18nStrings={{
          keyHeader: '配置项',
          valueHeader: '值',
          removeButtonAriaLabel: (item) => `删除配置项 ${item.key}`
        }}
      />
    </Container>
  );
}
```

### 5.5 最佳实践
- 提供输入验证和错误提示
- 支持不同类型的值输入控件
- 实现键名的唯一性检查
- 提供预设选项和建议

### 5.6 常见场景
- 环境变量配置
- 元数据标签编辑
- API 参数设置
- 自定义属性管理

### 5.7 注意事项
- 验证键名的有效性和唯一性
- 根据值类型提供合适的输入控件
- 处理大量属性时的性能优化
- 提供导入导出功能

---

## 6. TagEditor - 标签编辑器

### 6.1 组件概述
标签编辑器用于管理标签集合，支持添加、删除标签，以及标签验证和建议。

### 6.2 完整 API
```typescript
interface TagEditorProps {
  tags: Array<{
    key?: string;
    value?: string;
    existing?: boolean;
    markedForRemoval?: boolean;
  }>;
  onChange: (event: { detail: { tags: Array<any> } }) => void;
  loading?: boolean;
  loadingText?: string;
  tagLimit?: number;
  keySuggestions?: Array<{ value: string; label?: string }>;
  valueSuggestions?: Array<{ value: string; label?: string }>;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  removeButtonAriaLabel?: (tag: any) => string;
  tagLimitReachedText?: string;
  i18nStrings?: {
    keyHeader?: string;
    valueHeader?: string;
    optional?: string;
    keySuggestion?: string;
    valueSuggestion?: string;
    tooManyKeysSuggestion?: string;
    tooManyValuesSuggestion?: string;
    keysSuggestionLoading?: string;
    keysSuggestionError?: string;
    valuesSuggestionLoading?: string;
    valuesSuggestionError?: string;
    emptyTags?: string;
    tooManyTags?: string;
    removeButton?: string;
    undoButton?: string;
    undoPrompt?: string;
    loading?: string;
    keyError?: string;
    valueError?: string;
    duplicateKeyError?: string;
    invalidKeyError?: string;
    invalidValueError?: string;
    awsPrefixError?: string;
    maxKeyCharLengthError?: string;
    maxValueCharLengthError?: string;
    reachMaxTags?: string;
    reachMaxKeyLength?: string;
    reachMaxValueLength?: string;
    duplicateKeys?: string;
    invalidKeys?: string;
    invalidValues?: string;
  };
}
```

### 6.3 基础示例
```typescript
function BasicTagEditor() {
  const [tags, setTags] = useState([
    { key: 'Environment', value: 'Production' },
    { key: 'Team', value: 'Backend' }
  ]);

  return (
    <FormField 
      label="资源标签" 
      constraintText="添加标签以便管理和分类资源"
    >
      <TagEditor
        tags={tags}
        onChange={({ detail }) => setTags(detail.tags)}
        keyPlaceholder="输入标签键"
        valuePlaceholder="输入标签值"
        removeButtonAriaLabel={(tag) => `删除标签 ${tag.key}`}
        tagLimit={10}
        i18nStrings={{
          keyHeader: '键',
          valueHeader: '值',
          optional: '可选',
          removeButton: '删除',
          tagLimitReachedText: '已达到标签数量限制',
          emptyTags: '暂无标签'
        }}
      />
    </FormField>
  );
}
```

### 6.4 进阶示例
```typescript
function AdvancedTagEditor() {
  const [resourceTags, setResourceTags] = useState([
    { key: 'Project', value: 'WebApp', existing: true },
    { key: 'Owner', value: 'DevTeam', existing: true }
  ]);
  
  const [loading, setLoading] = useState(false);

  // 预定义的标签键建议
  const keySuggestions = [
    { value: 'Environment', label: 'Environment - 环境' },
    { value: 'Project', label: 'Project - 项目' },
    { value: 'Owner', label: 'Owner - 负责人' },
    { value: 'CostCenter', label: 'CostCenter - 成本中心' },
    { value: 'Department', label: 'Department - 部门' }
  ];

  // 根据键动态获取值建议
  const getValueSuggestions = (key: string) => {
    const suggestions: Record<string, Array<{value: string, label?: string}>> = {
      'Environment': [
        { value: 'Development', label: 'Development - 开发环境' },
        { value: 'Testing', label: 'Testing - 测试环境' },
        { value: 'Staging', label: 'Staging - 预发布环境' },
        { value: 'Production', label: 'Production - 生产环境' }
      ],
      'Project': [
        { value: 'WebApp', label: 'WebApp - Web应用' },
        { value: 'MobileApp', label: 'MobileApp - 移动应用' },
        { value: 'DataPipeline', label: 'DataPipeline - 数据管道' }
      ],
      'Department': [
        { value: 'Engineering', label: 'Engineering - 工程部' },
        { value: 'Marketing', label: 'Marketing - 市场部' },
        { value: 'Sales', label: 'Sales - 销售部' }
      ]
    };
    return suggestions[key] || [];
  };

  const handleTagsChange = ({ detail }: { detail: { tags: Array<any> } }) => {
    setResourceTags(detail.tags);
  };

  const validateTags = () => {
    setLoading(true);
    // 模拟验证过程
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <SpaceBetween size="m">
      <Container header={<Header>资源标签管理</Header>}>
        <SpaceBetween size="s">
          <TagEditor
            tags={resourceTags}
            onChange={handleTagsChange}
            loading={loading}
            loadingText="验证标签中..."
            tagLimit={20}
            keySuggestions={keySuggestions}
            valueSuggestions={resourceTags.length > 0 ? 
              getValueSuggestions(resourceTags[resourceTags.length - 1]?.key || '') : []
            }
            keyPlaceholder="选择或输入标签键"
            valuePlaceholder="选择或输入标签值"
            i18nStrings={{
              keyHeader: '标签键',
              valueHeader: '标签值',
              optional: '可选',
              keySuggestion: '建议的键',
              valueSuggestion: '建议的值',
              removeButton: '删除',
              undoButton: '撤销',
              undoPrompt: '撤销删除',
              emptyTags: '暂无标签，点击添加第一个标签',
              tooManyTags: '标签数量过多',
              duplicateKeyError: '标签键不能重复',
              invalidKeyError: '无效的标签键',
              invalidValueError: '无效的标签值',
              maxKeyCharLengthError: '标签键长度不能超过 128 个字符',
              maxValueCharLengthError: '标签值长度不能超过 256 个字符'
            }}
            removeButtonAriaLabel={(tag) => `删除标签 ${tag.key}:${tag.value}`}
          />
          
          <Button onClick={validateTags} loading={loading}>
            验证标签
          </Button>
        </SpaceBetween>
      </Container>

      {resourceTags.length > 0 && (
        <Container header={<Header>标签预览</Header>}>
          <KeyValuePairs
            items={resourceTags.map(tag => ({
              label: tag.key,
              value: tag.value
            }))}
          />
        </Container>
      )}
    </SpaceBetween>
  );
}
```

### 6.5 最佳实践
- 提供常用标签的建议列表
- 实现标签键值的验证规则
- 支持批量操作和导入导出
- 显示标签使用统计和建议

### 6.6 常见场景
- 云资源标签管理
- 文档分类标签
- 用户兴趣标签
- 产品特性标签

### 6.7 注意事项
- 限制标签数量和长度
- 验证标签键值的格式
- 处理重复标签的情况
- 提供标签删除的撤销功能

---

## 模块总结

### 组件选择指南

| 场景 | 推荐组件 |
|------|----------|
| 多文件上传 | FileUpload |
| 拖拽上传 | FileDropzone |
| 单文件选择 | FileInput |
| 数值范围选择 | Slider |
| 键值对编辑 | AttributeEditor |
| 标签管理 | TagEditor |

### 最佳实践

```typescript
// ✅ 文件上传组合使用
<SpaceBetween size="m">
  <FileDropzone onDropFiles={handleDrop}>
    <FileUpload value={files} onChange={handleChange} />
  </FileDropzone>
</SpaceBetween>

// ✅ 滑块配置管理
<Slider
  value={value}
  onChange={handleChange}
  referenceValues={referencePoints}
  i18nStrings={{ valueText: formatValue }}
/>

// ✅ 属性编辑器验证
<AttributeEditor
  items={items}
  definition={definitionWithValidation}
  onAddButtonClick={handleAdd}
  onRemoveButtonClick={handleRemove}
/>
```

### 性能优化建议
- 大文件上传使用分片上传
- 属性编辑器使用虚拟滚动
- 标签编议器实现防抖搜索
- 滑块组件避免频繁更新

---

[返回主索引](./COMPONENTS_INDEX.md) | [上一模块：表单基础](./COMPONENTS_05_FORMS_BASIC.md) | [下一模块：数据展示](./COMPONENTS_07_DATA_DISPLAY.md)

**模块状态**: ✅ 已完成  
**最后更新**: 2025-12-24 12:15