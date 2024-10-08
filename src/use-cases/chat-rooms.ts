import { createChatRoom, deleteRoom, editRoomName, getRoomBySlug, getRoomsWithAuthors } from "@/data-access/chat-rooms";
import { announceDeletedRoom } from "@/helpers/pusher";

export async function createChatRoomUseCase(userId: string, name: string) {
	return await createChatRoom(userId, name);
}

export async function getRoomsWithAuthorsUseCase() {
    return await getRoomsWithAuthors();
}

export async function getRoomBySlugUseCase(slug: string) {
    return await getRoomBySlug(slug);
}

export async function editRoomNameUseCase(userId: string, roomId: string, name: string) {
    const room = await getRoomBySlug(roomId);

    if(!room || room.authorId !== userId) {
        throw new Error("You are not authorized to edit this room.");
    }

    await editRoomName(roomId, name);
}

export async function deleteRoomUseCase(userId: string, roomId: string) {
    const room = await getRoomBySlug(roomId);

    if(!room || room.authorId !== userId) {
        throw new Error("You are not authorized to delete this room.");
    }

    await deleteRoom(roomId);

    await announceDeletedRoom(roomId);
}