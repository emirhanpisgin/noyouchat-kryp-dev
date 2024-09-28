import { MessageWithUser } from '@/db/schema';
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface MessageContextType {
    messages: Messages;
    setMessages: React.Dispatch<React.SetStateAction<Messages>>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
    children: ReactNode;
}

interface Messages {
    [roomId: string]: MessageWithUser[];
}

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Messages>({});

    return (
        <MessageContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export function useMessages() {
    const context = useContext(MessageContext);

    if (!context) throw "";

    return context;
}

export { MessageContext, MessageProvider };