import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getRoomBySlugUseCase } from "@/use-cases/chat-rooms";
import { ArrowLeft, Hash, User } from "lucide-react";
import Link from "next/link";
import MessageInput from "./message-input";
import LoginButton from "@/components/login-button";
import MessageFeed from "./message-feed";
import { getPreviousMessages } from "./loaders";
import SettingsDialog from "./settings-dialog";

export default async function ChatRoom({ params: { slug } }: { params: { slug: string } }) {
    const session = await auth();

    if (!session) {
        return (
            <div className="flex-1 grid place-items-center px-2 text-balance text-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-2xl font-semibold">Odaları kullanabilmek için giriş yapmalısın.</div>
                    <LoginButton />
                </div>
            </div>
        );
    }

    const room = await getRoomBySlugUseCase(slug);

    if (!room) {
        return (
            <div className="flex-1 grid place-items-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="text-2xl font-semibold">Aradığın odayı bulamadık &#58;&#40;</div>
                    <Link href={"/chats"} className={buttonVariants({
                        variant: "outline"
                    })}>
                        Odalar
                    </Link>
                </div>
            </div>
        );
    }

    const messages = await getPreviousMessages(room.id);

    return (
        <div className="flex flex-col h-full">
            <div className="border-b flex gap-3 items-center text-xl p-3">
                <Link href={"/chats"} className={buttonVariants({
                    variant: "outline",
                    size: "icon"
                })}>
                    <ArrowLeft />
                </Link>
                <div className="flex flex-col flex-1 justify-center">
                    <div className="flex gap-1 items-center">
                        <Hash /> {room.name}
                    </div>
                    <div className="flex items-center gap-1 text-foreground/50">
                        <User className="size-4"/> <span className="text-xs">{room.author.name}</span>
                    </div>
                </div>
                {session.user?.id === room.authorId && (
                    <SettingsDialog room={room} />
                )}
            </div>
            <div className="flex-grow overflow-y-auto">
                <MessageFeed previousMessages={messages} roomId={room.id} />
            </div>
            <MessageInput roomId={room.id} />
        </div>
    );
}
