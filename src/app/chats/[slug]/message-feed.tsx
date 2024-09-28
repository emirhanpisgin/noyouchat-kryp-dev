"use client";

import { MessageWithUser } from "@/db/schema";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMessages } from "@/components/context/message-context";
import { pusherClient } from "@/lib/pusher";
import { Ellipsis } from "lucide-react";
import MessageSettingsDropdown from "./message-settings-dropdown";

export default function MessageFeed({ previousMessages, roomId, userId }: { previousMessages: MessageWithUser[], roomId: string, userId: string }) {
    const feedEndRef = useRef<HTMLDivElement | null>(null);
    const { messages, setMessages } = useMessages();

    const scrollToBottom = () => {
        feedEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        if (previousMessages.length > 0) {
            setMessages((prev) => ({
                ...prev,
                [roomId]: previousMessages,
            }));
        }

        const channel = pusherClient.subscribe(roomId);

        channel.bind("new-message", (message: MessageWithUser) => {
            setMessages((prev) => ({
                ...prev,
                [roomId]: [...(prev[roomId] ?? []), message],
            }));
        });

        channel.bind("delete-message", (messageId: string) => {
            setMessages((prev) => ({
                ...prev,
                [roomId]: (prev[roomId] ?? []).filter((message) => message.id !== messageId),
            }));
        });

        return () => {
            channel.unsubscribe();
            channel.unbind("new-message");
            channel.unbind("delete-message");
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="min-h-full overflow-y-auto flex flex-col justify-end">
            {(messages[roomId] ?? [] as MessageWithUser[]).map((message) => (
                <div key={message.id} className="flex gap-2 px-3 py-1 hover:bg-accent/30 transition-colors group">
                    <span className="size-10">
                        <Image src={message.user.image!} alt="User" sizes="100vw" width={0} height={0} className="w-full rounded-full" />
                    </span>
                    <div className="flex flex-col flex-1">
                        <div className="flex gap-2 items-center">
                            <div className="font-medium text-base lg:text-lg">
                                {message.user.name}
                            </div>
                            <div className="text-xs lg:text-sm text-foreground/50 flex-1" title={message.createdAt.toLocaleString("tr-TR")}>
                                {new Date(message.createdAt).toLocaleTimeString("tr-TR")}
                            </div>
                            {userId === message.userId && <div>
                                <MessageSettingsDropdown message={message} />
                            </div>}
                        </div>
                        <div className="break-all flex-1 text-sm lg:text-base">
                            {message.text}
                        </div>
                    </div>
                </div>
            ))}
            {messages[roomId]?.length === 0 && (
                <div className="text-center text-foreground/50 p-3">
                    Henüz hiç mesaj yok.
                </div>
            )}

            <div ref={feedEndRef} />
        </div>
    );
}
