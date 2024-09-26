"use client";
import { signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogIn, LogOut, User as UserIcon, UserPen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";

export default function ProfileButton({ user }: { user?: User }) {

    if (!user) {
        return (
            <Button size={"icon"} variant={"outline"} onClick={() => signIn("google")}>
                <LogIn />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({
                size: "icon",
                variant: "outline",
            })}>
                <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 mr-2">
                <div className="font-semibold flex gap-2 items-center border-b p-2">
                    <span className="size-9">
                        <Image src={user.image!} alt="User" sizes="100vw" width={0} height={0} className="w-full rounded-full" />
                    </span>
                    {user.name}
                </div>
                <div className="flex justify-center p-2 gap-2">
                    <Link href="/profile/edit" className={buttonVariants({
                        size: "icon",
                        variant: "outline",
                    })}>
                        <UserPen />
                    </Link>
                    <Button variant={"outline"} size={"icon"} onClick={() => signOut()}>
                        <LogOut />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
