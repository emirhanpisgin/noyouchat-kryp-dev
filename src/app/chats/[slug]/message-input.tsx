"use client";

import { AutosizeTextarea, AutosizeTextAreaRef } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useServerAction } from "zsa-react";
import { createMessageAction } from "./actions";
import { LoaderCircle, SendHorizontal } from "lucide-react";

export default function MessageInput({ roomId }: { roomId: string }) {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const { data, error, execute, isPending } = useServerAction(createMessageAction, {
        onFinish() {
            setMessage("");
            inputRef.current?.focus();
        }
    });

    return (
        <div className="border-t flex p-2 gap-2">
            <AutosizeTextarea maxLength={200} ref={inputRef as React.RefObject<AutosizeTextAreaRef>} autoFocus className="resize-none font-medium flex-1 h-[38px]" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isPending} placeholder="Mesaj..." />
            <Button size={"icon"} className="m-[1px]" disabled={isPending} onClick={() => execute({
                message,
                roomId
            })}>
                {isPending ? <LoaderCircle className="animate-spin"/> : <SendHorizontal />}
            </Button>
        </div>
    );
}
