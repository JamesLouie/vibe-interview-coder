import "./globals.css";
import { ChatProvider } from "@/contexts/ChatContext";
import ChatHotkeyProvider from "@/components/ChatHotkeyProvider";

export const metadata = {
  title: "Minimal Next App",
  description: "A minimal Next.js starter template.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          {children}
          <ChatHotkeyProvider />
        </ChatProvider>
      </body>
    </html>
  );
}
