"use client";
import { ThemeProvider } from "next-themes";
import { MessageProvider } from "./context/message-context";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <MessageProvider>
                {children}
            </MessageProvider>
        </ThemeProvider>
    );
}
