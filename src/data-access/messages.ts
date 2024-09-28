import { database } from "@/db";
import { messages } from "@/db/schema";
import { getUserById } from "./users";

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
