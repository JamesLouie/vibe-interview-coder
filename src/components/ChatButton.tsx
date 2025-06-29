'use client';

import { Dispatch, SetStateAction, useRef, useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';

interface ChatButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ChatButton({ isOpen, setIsOpen }: ChatButtonProps) {
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const prevIsOpen = useRef(isOpen);

  // If chat is opened (from closed), set shouldFocusInput to true
  useEffect(() => {
    if (!prevIsOpen.current && isOpen) {
      setShouldFocusInput(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // After focusing, reset shouldFocusInput
  useEffect(() => {
    if (shouldFocusInput) {
      const timeout = setTimeout(() => setShouldFocusInput(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [shouldFocusInput]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 z-50 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} focusInput={shouldFocusInput} />}
    </>
  );
} 