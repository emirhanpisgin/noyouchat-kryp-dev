DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_roomId_chatRoom_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."chatRoom"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
