"use client";
import { signIn, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

export default function ProfileButton({ user }: { user?: User }) {

    if (!user) {
        return (
            <Button onClick={() => signIn("google")}>
                Giriş Yap
            </Button>
        );
    }

    return (
        <Button onClick={() => signOut()}>
            Çıkış Yap
        </Button>
    );
}
