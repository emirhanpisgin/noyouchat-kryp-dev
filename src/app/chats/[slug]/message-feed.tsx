"use client";

import { MessageWithUser } from "@/db/schema";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMessages } from "@/components/context/message-context";
import { pusherClient } from "@/lib/pusher";
import MessageSettingsDropdown from "./message-settings-dropdown";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function MessageFeed({ previousMessages, roomId, userId }: { previousMessages: MessageWithUser[], roomId: string, userId: string }) {
    const feedEndRef = useRef<HTMLDivElement | null>(null);
    const [pendingMessages, setPendingMessages] = useState<string[]>([]);
    const { messages, setMessages } = useMessages();
    const router = useRouter();
    const { toast } = useToast();

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

        channel.bind("delete-room", () => {
            setMessages((prev) => {
                const newMessages = { ...prev };
                delete newMessages[roomId];
                return newMessages;
            });

            channel.unsubscribe();
            toast({
                title: "Bildirim",
                description: "Katıldığınız oda yöneticisi tarafından silindi, anasayfaya yönlendiriliyorsunuz.",
            });
            router.push("/chats");
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="min-h-full overflow-y-auto flex flex-col justify-end">
            {(messages[roomId] ?? [] as MessageWithUser[]).map((message) => (
                <div key={message.id} className={cn("flex gap-2 px-3 py-1 relative hover:bg-accent/30 transition-[colors,opacity] group", pendingMessages.includes(message.id) ? "opacity-30" : "")}>
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
                                <MessageSettingsDropdown message={message} addPendingMessage={(messageId: string) => setPendingMessages(prev => [...prev, messageId])} />
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
