import { database } from "@/db";
import { uploadUserImage } from "@/helpers/uploadthing";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(database),
	providers: [Google],
	callbacks: {
		async signIn({ user }) {
			let userImage = user.image;

			if (!user.image?.includes("utfs.io")) {
				user.image = await uploadUserImage(userImage!, user.id!);
			}

			return true;
		},
	},
});
