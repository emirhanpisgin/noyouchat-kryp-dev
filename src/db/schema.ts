import { boolean, timestamp, pgTable, text, primaryKey, integer } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
	messages: many(messages),
	chatRooms: many(chatRooms),
}));

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	})
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	})
);

export const chatRooms = pgTable("chatRoom", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	authorId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const chatRoomsRelations = relations(chatRooms, ({ one, many }) => ({
	author: one(users, {
		fields: [chatRooms.authorId],
		references: [users.id],
	}),
	message: many(messages),
}));

export const messages = pgTable("message", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	text: text("text").notNull(),
	roomId: text("roomId")
		.notNull()
		.references(() => chatRooms.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
	user: one(users, {
		fields: [messages.userId],
		references: [users.id],
	}),
	chatRoom: one(chatRooms, {
		fields: [messages.roomId],
		references: [chatRooms.id],
	}),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdateUser = Omit<NewUser, "id"> & { id: string };

export type ChatRoom = typeof chatRooms.$inferSelect;
export type NewChatRoom = typeof chatRooms.$inferInsert;
export type UpdateChatRoom = Omit<NewChatRoom, "id"> & { id: string };

export type Message = typeof messages.$inferSelect;
export type MessageWithUser = Message & { user: User };
export type NewMessage = typeof messages.$inferInsert;
export type UpdateMessage = Omit<NewMessage, "id"> & { id: string };
