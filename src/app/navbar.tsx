import { auth } from "@/lib/auth";
import ProfileButton from "./profile-button";

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="flex items-center border-b p-4">
            <div className="text-3xl font-semibold flex-1">
                NoYouChat
            </div>
            <div>
                <ProfileButton user={session?.user} />
            </div>
        </div>
    );
}
