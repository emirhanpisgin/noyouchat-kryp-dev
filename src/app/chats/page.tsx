import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoomsWithAuthorsUseCase } from "@/use-cases/chat-rooms";
import { User } from "lucide-react";
import Link from "next/link";
import NewRoomDialog from "../new-room-dialog";

export default async function Chats() {
    const rooms = await getRoomsWithAuthorsUseCase();

    return (
        <div className="px-2 mx-auto w-full text-center">
            <div className="text-2xl lg:text-3xl my-4 font-semibold flex items-center gap-3 justify-center">
                Sohbet Odaları
                <NewRoomDialog />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                {rooms.map((room) => (
                    <Link key={room.id} href={`/chats/${room.id}`}>
                        <Card className="hover:bg-accent/30 transition-colors duration-200">
                            <CardHeader>
                                <CardTitle className="text-left">{room.name}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <User strokeWidth={1} /> {room.author.name}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
