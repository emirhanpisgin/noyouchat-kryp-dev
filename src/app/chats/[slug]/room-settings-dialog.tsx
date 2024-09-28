"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChatRoom } from "@/db/schema";
import { Settings, Check, Save, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteRoomAction, editRoomNameAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function RoomSettingsDialog({ room }: { room: ChatRoom }) {
    const [roomName, setRoomName] = useState(room.name);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [confirmScreen, setConfirmScreen] = useState(false);
    const { toast } = useToast();
    const { isPending: isEditPending, execute: executeRename } = useServerAction(editRoomNameAction, {
        onSuccess() {
            toast({
                title: "Başarılı",
                description: "Oda ismi başarıyla güncellendi.",
            });
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), 2000);
        }
    });

    const { isPending: isDeletePending, execute: executeDelete } = useServerAction(deleteRoomAction, {})

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
                    <div className="flex flex-col gap-2">
                        <Label>
                            Oda İsmi
                        </Label>
                        <div className="flex gap-2">
                            <Input disabled={isEditPending} className="flex-1" placeholder="Oda İsmi..." value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                            <Button size={"icon"} className="overflow-hidden disabled:opacity-100" disabled={isEditPending || !roomName.length || roomName === room.name} onClick={() => executeRename({
                                roomId: room.id,
                                name: roomName
                            })}>
                                {showCheckmark ? <Check className="animate-peek text-green-500" /> : <Save />}
                            </Button>
                        </div>
                    </div>
                    {confirmScreen ? (
                        <div className="flex flex-col gap-2">
                            <Label>
                                Odayı Silmek istediğine emin misin?
                                Bu işlem geri alınamaz!
                            </Label>
                            <div className="flex gap-2">
                                <Button variant={"outline"} disabled={isDeletePending} onClick={() => setConfirmScreen(false)}>
                                    İptal
                                </Button>
                                <Button variant={"outline"} disabled={isDeletePending} className="text-red-500" onClick={() => executeDelete({
                                    roomId: room.id
                                })}>
                                    {isDeletePending ? <LoaderCircle className="animate-spin" /> : "Sil"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Label>
                                Odayı Sil
                            </Label>
                            <Button variant={"outline"} className="text-red-500" onClick={() => setConfirmScreen(true)}>
                                Sil
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}