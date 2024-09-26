import { database } from "@/db";
import { uploadUserImage } from "@/helpers/uploadthing";
import { updateUserUseCase } from "@/use-cases/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database),
	providers: [Google],
	callbacks: {
		async signIn({ user }) {
			const userImage = user.image;

			if (!user.image?.includes("utfs.io")) {
				const uploadedImage = await uploadUserImage(userImage!, user.id!);

				await updateUserUseCase({
					id: user.id!,
					image: uploadedImage,
				});
			}

			return true;
		},
	},
});
