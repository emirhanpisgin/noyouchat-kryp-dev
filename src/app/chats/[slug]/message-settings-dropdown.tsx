import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MessageWithUser } from "@/db/schema";
import { toast } from "@/hooks/use-toast";
import { Ellipsis, Trash } from "lucide-react";
import { useServerAction } from "zsa-react";
import { deleteMessageAction } from "./actions";

export default function MessageSettingsDialog({ message }: { message: MessageWithUser }) {
    const { isPending, execute } = useServerAction(deleteMessageAction, {
        onSuccess() {
            toast({
                title: "Başarılı",
                description: "Mesaj başarıyla silindi.",
            });
        }
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
                <DropdownMenuLabel>{new Date(message.createdAt).toLocaleString("tr-TR")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => execute({
                    messageId: message.id,
                })} className="text-red-500 flex gap-1 items-center cursor-pointer"><Trash className="size-4" /> Mesajı Sil</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}
