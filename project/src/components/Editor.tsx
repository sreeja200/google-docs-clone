import React, { useState, useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import MenuBar from './MenuBar';
import { formatDoc } from '../utils/editorUtils';

const Editor: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Enable editing
      editorRef.current.contentEditable = 'true';
      editorRef.current.focus();

      // Add event listener to handle paste events
      const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertText', false, text);
      };

      editorRef.current.addEventListener('paste', handlePaste);

      return () => {
        editorRef.current?.removeEventListener('paste', handlePaste);
      };
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  const handleTitleFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleBlur = () => {
    setIsTitleFocused(false);
    // If title is empty, reset to default
    if (!documentTitle.trim()) {
      setDocumentTitle('Untitled Document');
    }
  };

  const handleFormatClick = (command: string, value: string = '') => {
    if (editorRef.current) {
      // Focus the editor before applying the format
      editorRef.current.focus();
      formatDoc(command, value);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <MenuBar />
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center">
          <input
            type="text"
            value={documentTitle}
            onChange={handleTitleChange}
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            className={`font-sans text-lg outline-none border-b-2 transition-colors w-full 
              ${isTitleFocused ? 'border-blue-500' : 'border-transparent'}`}
          />
        </div>
      </div>
      <Toolbar onFormatClick={handleFormatClick} />
      <div className="flex-1 overflow-auto bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto bg-white shadow-sm min-h-[1100px] px-16 py-12">
          <div
            ref={editorRef}
            className="outline-none min-h-[1100px] prose max-w-none"
            onInput={() => {
              // Handle document changes here
              // You can add auto-save functionality or other features
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;