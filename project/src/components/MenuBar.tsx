import React, { useState } from 'react';
import { ChevronDown, FileText, Save, FolderOpen, FilePlus, MoreHorizontal, Share, Image, Table, Link, ListOrdered, List, Type, AlignLeft, Undo, Redo, Copy, Cast as Paste, Nut as Cut, Search, SpellCheck, Printer as Print } from 'lucide-react';

const MenuItem: React.FC<{
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ label, icon, active, hasSubmenu, onClick, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 100);
    setTimeoutId(timeout);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSubmenu && onClick) {
      e.stopPropagation();
      onClick();
      setIsOpen(false);
    } else if (hasSubmenu) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`px-4 py-2 text-sm rounded hover:bg-gray-100 flex items-center w-full text-left ${
          active || isOpen ? 'bg-gray-100' : ''
        }`}
        onClick={handleClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {hasSubmenu && <ChevronDown className="ml-1 w-3 h-3" />}
      </button>
      {hasSubmenu && isOpen && (
        <div 
          className="absolute left-0 top-full mt-1 py-1 bg-white rounded shadow-lg z-10 min-w-[200px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const MenuBar: React.FC = () => {
  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4">
      <div className="max-w-5xl mx-auto flex items-center">
        <div className="flex items-center">
          <div className="p-2">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex space-x-1">
            <MenuItem 
              label="File" 
              hasSubmenu 
              children={
                <>
                  <MenuItem label="New\" icon={<FilePlus className="w-4 h-4" />} onClick={() => handleCommand('delete')} />
                  <MenuItem label="Open" icon={<FolderOpen className="w-4 h-4" />} onClick={() => {}} />
                  <MenuItem label="Save" icon={<Save className="w-4 h-4" />} onClick={() => {}} />
                  <MenuItem label="Print" icon={<Print className="w-4 h-4" />} onClick={() => window.print()} />
                </>
              }
            />
            <MenuItem 
              label="Edit" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Undo\" icon={<Undo className="w-4 h-4" />} onClick={() => handleCommand('undo')} />
                  <MenuItem label="Redo" icon={<Redo className="w-4 h-4" />} onClick={() => handleCommand('redo')} />
                  <div className="border-t border-gray-200 my-1" />
                  <MenuItem label="Cut" icon={<Cut className="w-4 h-4" />} onClick={() => handleCommand('cut')} />
                  <MenuItem label="Copy" icon={<Copy className="w-4 h-4" />} onClick={() => handleCommand('copy')} />
                  <MenuItem label="Paste" icon={<Paste className="w-4 h-4" />} onClick={() => handleCommand('paste')} />
                </>
              }
            />
            <MenuItem 
              label="View" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Mode\" icon={<Type className="w-4 h-4" />} onClick={() => {}} />
                  <MenuItem label="Show ruler" onClick={() => {}} />
                  <MenuItem label="Show word count" onClick={() => {}} />
                  <MenuItem label="Full screen" onClick={() => {}} />
                </>
              }
            />
            <MenuItem 
              label="Insert" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Image\" icon={<Image className="w-4 h-4" />} onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) handleCommand('insertImage', url);
                  }} />
                  <MenuItem label="Table" icon={<Table className="w-4 h-4" />} onClick={() => handleCommand('insertHTML', '<table><tr><td>Cell</td></tr></table>')} />
                  <MenuItem label="Link" icon={<Link className="w-4 h-4" />} onClick={() => {
                    const url = prompt('Enter URL:');
                    if (url) handleCommand('createLink', url);
                  }} />
                  <MenuItem label="Bullet list" icon={<List className="w-4 h-4" />} onClick={() => handleCommand('insertUnorderedList')} />
                  <MenuItem label="Numbered list" icon={<ListOrdered className="w-4 h-4" />} onClick={() => handleCommand('insertOrderedList')} />
                </>
              }
            />
            <MenuItem 
              label="Format" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Bold\" onClick={() => handleCommand('bold')} />
                  <MenuItem label="Italic" onClick={() => handleCommand('italic')} />
                  <MenuItem label="Underline" onClick={() => handleCommand('underline')} />
                  <div className="border-t border-gray-200 my-1" />
                  <MenuItem label="Align left" icon={<AlignLeft className="w-4 h-4" />} onClick={() => handleCommand('justifyLeft')} />
                  <MenuItem label="Center" onClick={() => handleCommand('justifyCenter')} />
                  <MenuItem label="Align right" onClick={() => handleCommand('justifyRight')} />
                </>
              }
            />
            <MenuItem 
              label="Tools" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Spelling and grammar\" icon={<SpellCheck className="w-4 h-4" />} onClick={() => {}} />
                  <MenuItem label="Word count" onClick={() => {}} />
                  <MenuItem label="Find and replace" icon={<Search className="w-4 h-4" />} onClick={() => {}} />
                </>
              }
            />
            <MenuItem 
              label="Help" 
              hasSubmenu
              children={
                <>
                  <MenuItem label="Documentation\" onClick={() => {}} />
                  <MenuItem label="Keyboard shortcuts" onClick={() => {}} />
                  <MenuItem label="About" onClick={() => {}} />
                </>
              }
            />
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1.5 text-sm font-medium flex items-center transition-colors">
            <Share className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;