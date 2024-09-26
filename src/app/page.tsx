import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
                    <Link className={buttonVariants({
                        variant: "outline"
                    })} href={"/chats/new"}>
                        Oda Oluştur
                    </Link>
                </div>
            </div>
        </div>
    );
}
