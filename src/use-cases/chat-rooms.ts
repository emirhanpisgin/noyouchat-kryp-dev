import { createChatRoom } from "@/data-access/chat-rooms";

export async function createChatRoomUseCase(userId: string, name: string) {
	return await createChatRoom(userId, name);
}
