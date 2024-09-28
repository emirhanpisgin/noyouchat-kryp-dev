import { database } from "@/db";
import { messages } from "@/db/schema";
import { getUserById } from "./users";
import { and, eq } from "drizzle-orm";

export async function createMessage(roomId: string, userId: string, message: string) {
	const [newMessage] = await database
		.insert(messages)
		.values({
			roomId,
			userId,
			text: message,
		})
		.returning();

	const user = await getUserById(userId);

	return {
		...newMessage,
		user,
	};
}

export async function getUserMessageById(userId: string, messageId: string) {
	return await database.query.messages.findFirst({
		where: and(eq(messages.id, messageId), eq(messages.userId, userId)),
	});
}

export async function deleteMessage(userId: string, messageId: string) {
	await database.delete(messages).where(and(eq(messages.id, messageId), eq(messages.userId, userId)));
}
