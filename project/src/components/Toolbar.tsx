import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, List, AlignLeft, AlignCenter, 
  AlignRight, Type, ChevronDown, Strikethrough, Link, 
  Image, ListOrdered, Undo, Redo
} from 'lucide-react';

type ToolbarProps = {
  onFormatClick: (command: string, value?: string) => void;
};

const FontSizeOptions = [
  { value: '1', label: 'Small' },
  { value: '2', label: 'Normal' },
  { value: '3', label: 'Medium' },
  { value: '4', label: 'Large' },
  { value: '5', label: 'X-Large' },
  { value: '6', label: 'XX-Large' },
  { value: '7', label: 'XXX-Large' },
];

type DropdownProps = {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  label: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown className="ml-1 w-3 h-3" />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 py-1 bg-white rounded shadow-lg z-10 min-w-[150px]">
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-1 text-sm hover:bg-gray-100 ${
                option.value === value ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ToolbarButton: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  tooltip: string;
}> = ({ icon, active, onClick, tooltip }) => (
  <button
    className={`p-1.5 rounded hover:bg-gray-100 group relative ${
      active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'
    }`}
    onClick={onClick}
    title={tooltip}
  >
    {icon}
  </button>
);

const Toolbar: React.FC<ToolbarProps> = ({ onFormatClick }) => {
  const [fontSize, setFontSize] = useState('3');
  const [fontName, setFontName] = useState('Arial');
  
  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    onFormatClick('fontSize', size);
  };

  const handleFontNameChange = (font: string) => {
    setFontName(font);
    onFormatClick('fontName', font);
  };

  return (
    <div className="bg-white border-b border-gray-200 py-1 px-4 flex flex-wrap items-center space-x-1 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto w-full flex items-center space-x-1">
        <ToolbarButton 
          icon={<Undo className="w-4 h-4" />} 
          onClick={() => onFormatClick('undo')}
          tooltip="Undo"
        />
        <ToolbarButton 
          icon={<Redo className="w-4 h-4" />} 
          onClick={() => onFormatClick('redo')}
          tooltip="Redo"
        />

        <div className="mx-2 h-5 border-l border-gray-300"></div>

        <Dropdown
          options={[
            { value: 'Arial', label: 'Arial' },
            { value: 'Courier New', label: 'Courier New' },
            { value: 'Times New Roman', label: 'Times New Roman' },
            { value: 'Georgia', label: 'Georgia' },
          ]}
          value={fontName}
          onChange={handleFontNameChange}
          label={fontName}
        />

        <Dropdown
          options={FontSizeOptions}
          value={fontSize}
          onChange={handleFontSizeChange}
          label={`Size ${fontSize}`}
        />

        <div className="mx-2 h-5 border-l border-gray-300"></div>

        <ToolbarButton 
          icon={<Bold className="w-4 h-4" />} 
          onClick={() => onFormatClick('bold')}
          tooltip="Bold"
        />
        <ToolbarButton 
          icon={<Italic className="w-4 h-4" />} 
          onClick={() => onFormatClick('italic')}
          tooltip="Italic"
        />
        <ToolbarButton 
          icon={<Underline className="w-4 h-4" />} 
          onClick={() => onFormatClick('underline')}
          tooltip="Underline"
        />
        <ToolbarButton 
          icon={<Strikethrough className="w-4 h-4" />} 
          onClick={() => onFormatClick('strikeThrough')}
          tooltip="Strikethrough"
        />

        <div className="mx-2 h-5 border-l border-gray-300"></div>

        <ToolbarButton 
          icon={<AlignLeft className="w-4 h-4" />} 
          onClick={() => onFormatClick('justifyLeft')}
          tooltip="Align Left"
        />
        <ToolbarButton 
          icon={<AlignCenter className="w-4 h-4" />} 
          onClick={() => onFormatClick('justifyCenter')}
          tooltip="Align Center"
        />
        <ToolbarButton 
          icon={<AlignRight className="w-4 h-4" />} 
          onClick={() => onFormatClick('justifyRight')}
          tooltip="Align Right"
        />

        <div className="mx-2 h-5 border-l border-gray-300"></div>

        <ToolbarButton 
          icon={<List className="w-4 h-4" />} 
          onClick={() => onFormatClick('insertUnorderedList')}
          tooltip="Bullet List"
        />
        <ToolbarButton 
          icon={<ListOrdered className="w-4 h-4" />} 
          onClick={() => onFormatClick('insertOrderedList')}
          tooltip="Numbered List"
        />

        <div className="mx-2 h-5 border-l border-gray-300"></div>

        <ToolbarButton 
          icon={<Link className="w-4 h-4" />} 
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) onFormatClick('createLink', url);
          }}
          tooltip="Insert Link"
        />
        <ToolbarButton 
          icon={<Image className="w-4 h-4" />} 
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) onFormatClick('insertImage', url);
          }}
          tooltip="Insert Image"
        />
      </div>
    </div>
  );
};

export default Toolbar;