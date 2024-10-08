import { database } from "@/db";
import { chatRooms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createChatRoom(userId: string, name: string) {
	const [newChatRoom] = await database
		.insert(chatRooms)
		.values({
			authorId: userId,
			name,
			createdAt: new Date(),
		})
		.returning();

	return newChatRoom.id;
}

export async function getRoomsWithAuthors() {
	return await database.query.chatRooms.findMany({
		with: {
			author: true,
		},
	});
}

export async function getRoomBySlug(slug: string) {
	return await database.query.chatRooms.findFirst({
		where: eq(chatRooms.id, slug),
		with: {
			author: true,
			message: true,
		},
	});
}

export async function editRoomName(roomId: string, name: string) {
	await database.update(chatRooms).set({ name }).where(eq(chatRooms.id, roomId));
}

export async function deleteRoom(roomId: string) {
    await database.delete(chatRooms).where(eq(chatRooms.id, roomId));
}