"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { createMessageUseCase } from "@/use-cases/messages";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createMessageAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			roomId: z.string(),
			message: z.string().min(1),
		})
	)
	.handler(async ({ ctx, input }) => {
		await createMessageUseCase(input.roomId, ctx.id!, input.message);

        revalidatePath(`/chats/${input.roomId}`);
	});
