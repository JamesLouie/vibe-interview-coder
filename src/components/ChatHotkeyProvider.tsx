"use client";
import { useState, useEffect } from "react";
import ChatButton from "./ChatButton";

export default function ChatHotkeyProvider() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleHotkey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const active = document.activeElement;
        if (
          active &&
          (active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            (active as HTMLElement).isContentEditable)
        ) {
          return;
        }
        e.preventDefault();
        setChatOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, []);

  return <ChatButton isOpen={chatOpen} setIsOpen={setChatOpen} />;
} 