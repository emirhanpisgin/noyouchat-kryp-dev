import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import NewRoomDialog from "./new-room-dialog";
import { auth } from "@/lib/auth";
import LoginButton from "../components/login-button";

export default async function Home() {
    const session = await auth();

    return (
        <div className="grid place-items-center flex-1 px-2">
            <div className="text-center flex flex-col gap-2">
                <div className="font-semibold text-2xl">
                    NoYouChat <span className="font-normal">&#39;e hoşgeldin.</span>
                </div>
                <div className="text-xl text-balance">
                    Sohbet odaları oluşturabilir, katılabilir ve istediğiniz kadar sohbet edebilirsiniz.
                </div>
                <div className="flex gap-2 justify-center">
                    <Link className={buttonVariants()} href={"/chats"}>
                        Odalar
                    </Link>
                    {session?.user ? (
                        <NewRoomDialog />
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </div>
    );
}
