import { updateUser } from "@/data-access/users";
import { UpdateUser } from "@/db/schema";

export async function updateUserUseCase(data: UpdateUser) {
    await updateUser(data);
}