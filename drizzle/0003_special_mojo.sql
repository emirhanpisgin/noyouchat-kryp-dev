ALTER TABLE "chatRoom" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "chatRoom" ALTER COLUMN "createdAt" DROP NOT NULL;