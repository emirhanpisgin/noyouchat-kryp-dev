import { database } from "@/db";
import { uploadUserImage } from "@/helpers/uploadthing";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { updateUserUseCase } from "@/use-cases/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database),
	providers: [Google, Discord],
	callbacks: {
		async session({ session, user }) {
			if (session.user && user.image) {
				const userImage = session.user.image;

				if (!userImage?.includes("utfs.io") && userImage) {
					const uploadedImage = await uploadUserImage(userImage, user.id);

					await updateUserUseCase({
						id: user.id,
						image: uploadedImage,
					});

					session.user.image = uploadedImage;
				}
			}

			return session;
		},
	},
});
