import { database } from "@/db";
import { UpdateUser, User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUser(data: UpdateUser) {
	await database.update(users).set(data).where(eq(users.id, data.id));
}

export async function getUserById(userId: string) {
	return (await database.query.users.findFirst({
		where: eq(users.id, userId),
	}) as User)
}
