import { createMessage } from "@/data-access/messages";
import { announceNewMessage } from "@/helpers/pusher";

export async function createMessageUseCase(roomId: string, userId: string, message: string) {
    const newMessage = await createMessage(roomId, userId, message);

    await announceNewMessage(roomId, newMessage);
}