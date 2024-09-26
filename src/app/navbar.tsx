import { auth } from "@/lib/auth";
import ProfileButton from "./profile-button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="flex items-center border-b p-4">
            <Link href={"/"} className="text-3xl font-semibold flex-1">
                NoYouChat
            </Link>
            <div className="flex gap-2">
                <ModeToggle />
                <ProfileButton user={session?.user} />
            </div>
        </div>
    );
}
