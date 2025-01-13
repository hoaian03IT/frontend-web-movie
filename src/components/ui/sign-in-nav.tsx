"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthCredentialsContext } from "@/contexts/auth-credentials-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";

const items = [
    { href: "/", label: "Your profile" },
    { href: "/", label: "Your watchlist" },
    { href: "/", label: "Your ratings" },
    { href: "/", label: "Your list" },
    { href: "/", label: "Account settings" },
];

export function SignInNav() {
    const { user, handleSignOut } = useContext(AuthCredentialsContext);

    const router = useRouter();

    return user.isLogged ? (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white text-sm font-semibold py-2 px-4">
                <FaCircleUser className="size-5" />
                {user.name.split(" ")[1]}
                <LuChevronDown className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark bg-zinc-800 py-3 pr-4" side="bottom" align="start">
                {items.map((item, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="text-base hover:bg-zinc-600 rounded-sm"
                        onClick={() => {
                            router.push(item.href);
                        }}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-zinc-500" />
                <DropdownMenuItem className="text-base hover:bg-zinc-600" onClick={handleSignOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Link
            href="/sign-in"
            className="flex items-center bg-transparent text-white text-sm font-semibold hover:bg-zinc-900 h-9 px-4 py-2 rounded-sm">
            Sign In
        </Link>
    );
}
