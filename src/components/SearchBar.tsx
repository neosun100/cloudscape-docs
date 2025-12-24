
import { useState } from 'react';
import { Autosuggest } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  value: string;
  label: string;
  type: 'module' | 'component' | 'content';
  path: string;
}

const searchData: SearchResult[] = [
  { value: 'button', label: 'Button', type: 'component', path: '/components/button' },
  { value: 'input', label: 'Input', type: 'component', path: '/components/input' },
  { value: 'table', label: 'Table', type: 'component', path: '/components/table' },
  { value: 'form', label: 'Form', type: 'module', path: '/patterns/form' },
  { value: 'layout', label: 'Layout', type: 'module', path: '/patterns/layout' },
];

export default function SearchBar() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const handleLoadItems = ({ detail }: any) => {
    const filterText = detail.filteringText.toLowerCase();
    const filtered = searchData.filter(item =>
      item.label.toLowerCase().includes(filterText) ||
      item.value.toLowerCase().includes(filterText)
    );
    setOptions(filtered);
  };

  const handleSelect = ({ detail }: any) => {
    const selected = options.find(option => option.value === detail.value);
    if (selected) {
      navigate(selected.path);
      setValue('');
    }
  };

  return (
    <Autosuggest
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      options={options.map(option => ({
        value: option.value,
        label: option.label,
        description: option.type
      }))}
      onLoadItems={handleLoadItems}
      onSelect={handleSelect}
      placeholder="搜索组件、模块或文档..."
      empty="未找到匹配结果"
    />
  );
}