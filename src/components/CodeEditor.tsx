'use client';

import { Editor } from '@monaco-editor/react';
import { useRef, useState, useCallback, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  theme?: string;
  height?: number;
  onHeightChange?: (height: number) => void;
}

const STORAGE_KEY = 'code-editor-height';

export default function CodeEditor({ 
  code, 
  onChange, 
  language = 'javascript',
  theme = 'vs-dark',
  height = 384,
  onHeightChange
}: CodeEditorProps) {
  const editorRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  
  // Load saved height from localStorage or use default
  const [currentHeight, setCurrentHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) : height;
    }
    return height;
  });

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newHeight = e.clientY - rect.top;
    const minHeight = 200;
    const maxHeight = 800;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setCurrentHeight(newHeight);
      onHeightChange?.(newHeight);
    }
  }, [isResizing, onHeightChange]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Save height to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, currentHeight.toString());
    }
  }, [currentHeight]);

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="border border-gray-300 rounded-lg overflow-hidden"
        style={{ height: currentHeight }}
      >
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          theme={theme}
          onChange={onChange}
          onMount={handleEditorDidMount}
          key={`editor-${language}`}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            hover: {
              enabled: true,
              delay: 300,
            },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: {
              enabled: true,
            },
            fixedOverflowWidgets: true,
            domReadOnly: false,
            wordWrap: 'on',
            folding: true,
            foldingStrategy: 'indentation',
          }}
        />
      </div>
      
      {/* Resize handle */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 hover:bg-gray-300 cursor-ns-resize flex items-center justify-center"
        onMouseDown={handleMouseDown}
        style={{ cursor: isResizing ? 'ns-resize' : 'ns-resize' }}
      >
        <div className="w-8 h-1 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
} 