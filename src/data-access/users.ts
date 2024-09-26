import { database } from "@/db";
import { UpdateUser, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUser(data: UpdateUser) {
    await database.update(users).set(data).where(eq(users.id, data.id));
}