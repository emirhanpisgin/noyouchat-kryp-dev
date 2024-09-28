"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { deleteRoomUseCase, editRoomNameUseCase } from "@/use-cases/chat-rooms";
import { createMessageUseCase, deleteMessageUseCase } from "@/use-cases/messages";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createMessageAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			roomId: z.string(),
			message: z.string().min(1).max(200),
		})
	)
	.handler(async ({ ctx, input }) => {
		await createMessageUseCase(input.roomId, ctx.id!, input.message);

        revalidatePath(`/chats/${input.roomId}`);
	});

export const deleteMessageAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            messageId: z.string(),
        })
    )
    .handler(async ({ ctx, input }) => {
        await deleteMessageUseCase(ctx.id!, input.messageId);
    });

export const editRoomNameAction = authenticatedAction
    .createServerAction()
	.input(
		z.object({
			roomId: z.string(),
			name: z.string().min(1),
		})
	)
    .handler(async ({ ctx, input }) => {
        await editRoomNameUseCase(ctx.id!, input.roomId, input.name);

        revalidatePath(`/chats/${input.roomId}`);
    });

export const deleteRoomAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            roomId: z.string(),
        })
    )
    .handler(async ({ ctx, input }) => {
        await deleteRoomUseCase(ctx.id!, input.roomId);
    });