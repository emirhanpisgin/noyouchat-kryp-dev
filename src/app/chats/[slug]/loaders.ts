import { database } from "@/db";
import { messages } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getPreviousMessages(roomId: string) {
	const previousMessages = await database.query.messages.findMany({
		where: eq(messages.roomId, roomId),
		orderBy: [asc(messages.createdAt)],
		limit: 50,
		with: {
			user: true,
		},
	});

	return previousMessages;
}
