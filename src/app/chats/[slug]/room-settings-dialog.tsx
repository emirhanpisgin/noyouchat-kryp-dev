"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChatRoom } from "@/db/schema";
import { Settings, Check, Save } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { editRoomNameAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function RoomSettingsDialog({ room }: { room: ChatRoom }) {
    const [roomName, setRoomName] = useState(room.name);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const { toast } = useToast();
    const { isPending, execute } = useServerAction(editRoomNameAction, {
        onSuccess() {
            toast({
                title: "Başarılı",
                description: "Oda ismi başarıyla güncellendi.",
            });
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), 2000);
        }
    });

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({
                size: "icon",
                variant: "outline"
            })}>
                <Settings />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Oda Ayarları</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label>
                        Oda İsmi
                        <div className="mt-2 flex gap-2">
                            <Input disabled={isPending} className="flex-1" placeholder="Oda İsmi..." value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                            <Button size={"icon"} className="overflow-hidden disabled:opacity-100" disabled={isPending || !roomName.length || roomName === room.name} onClick={() => execute({
                                roomId: room.id,
                                name: roomName
                            })}>
                                {showCheckmark ? <Check className="animate-peek text-green-500"/> : <Save />}
                            </Button>
                        </div>
                    </Label>
                </div>
            </DialogContent>
        </Dialog>
    );
}