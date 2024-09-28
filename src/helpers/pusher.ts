import { MessageWithUser } from "@/db/schema";
import { pusherServer } from "@/lib/pusher"

export async function announceNewMessage(roomId: string, message: MessageWithUser) {
    await pusherServer.trigger(roomId, "new-message", message);
}