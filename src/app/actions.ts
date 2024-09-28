"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { createChatRoomUseCase } from "@/use-cases/chat-rooms";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createChatRoomAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ ctx, input }) => {
		const newRoom = await createChatRoomUseCase(ctx.id!, input);

        revalidatePath("/chats");

        return newRoom;
	});
