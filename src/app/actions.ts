"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { createChatRoomUseCase } from "@/use-cases/chat-rooms";
import { z } from "zod";

export const createChatRoomAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ ctx, input }) => {
		return await createChatRoomUseCase(ctx.id!, input);
	});
