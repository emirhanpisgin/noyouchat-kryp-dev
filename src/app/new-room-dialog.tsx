"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerAction } from "zsa-react";
import { createChatRoomAction } from "./actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function NewRoomDialog() {
    const { toast } = useToast();
    const [roomName, setRoomName] = useState("");
    const router = useRouter();
    const { isPending, execute, isSuccess } = useServerAction(createChatRoomAction, {
        onError: () => {
            toast({
                title: "Oda Oluşturulamadı",
                description: "Odanızı oluştururken bir sorun oluştu, lütfen tekrar deneyin.",
            });
        },
        onSuccess: (data) => {
            router.push(`/chats/${data.data}`);
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Oda Oluştur
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Oda</DialogTitle>
                    <DialogDescription>Bilgileri doldurarak yeni bir oda oluşturabilirsin.</DialogDescription>
                </DialogHeader><div className="flex flex-col gap-2">
                    <Label>
                        Oda İsmi
                        <Input disabled={isPending || isSuccess} className="mt-2" placeholder="Oda İsmi..." value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    </Label>
                    <div className="flex justify-end gap-2">
                        <DialogClose className={buttonVariants({
                            variant: "outline",
                        })} >
                            İptal
                        </DialogClose>
                        <Button onClick={() => execute(roomName)} disabled={isPending || !roomName.length || isSuccess}>
                            {isPending && "Oda Oluşturuluyor..."}
                            {!isPending && !isSuccess && "Oluştur"}
                            {isSuccess && "Yönlendiriliyor..."}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
