import { createChatRoom, getRoomBySlug, getRoomsWithAuthors } from "@/data-access/chat-rooms";

export async function createChatRoomUseCase(userId: string, name: string) {
	return await createChatRoom(userId, name);
}

export async function getRoomsWithAuthorsUseCase() {
    return await getRoomsWithAuthors();
}

export async function getRoomBySlugUseCase(slug: string) {
    return await getRoomBySlug(slug);
}