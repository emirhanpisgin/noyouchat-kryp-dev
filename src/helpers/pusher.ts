import { MessageWithUser } from "@/db/schema";
import { pusherServer } from "@/lib/pusher"

export async function announceNewMessage(roomId: string, message: MessageWithUser) {
    await pusherServer.trigger(roomId, "new-message", message);
}

export async function announceDeletedMessage(roomId: string, messageId: string) {
    await pusherServer.trigger(roomId, "delete-message", messageId);
}

export async function announceDeletedRoom(roomId: string) {
    await pusherServer.trigger(roomId, "delete-room", roomId);
}