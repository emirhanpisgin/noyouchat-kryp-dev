import { createMessage, deleteMessage, getUserMessageById } from "@/data-access/messages";
import { announceDeletedMessage, announceNewMessage } from "@/helpers/pusher";
import { get } from "http";

export async function createMessageUseCase(roomId: string, userId: string, message: string) {
    const newMessage = await createMessage(roomId, userId, message);

    await announceNewMessage(roomId, newMessage);
}

export async function deleteMessageUseCase(userId: string, messageId: string) {
    const message = await getUserMessageById(userId, messageId);

    if (!message) {
        throw new Error("Message not found.");
    }

    await deleteMessage(userId, messageId);

    await announceDeletedMessage(message.roomId, messageId);
}