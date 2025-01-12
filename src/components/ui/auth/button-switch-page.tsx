"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";

export function ButtonSwitchPage({ content, href }: { content: string; href: string }) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(href);
    };
    return (
        <Button
            onClick={handleRedirect}
            type="button"
            className="w-full rounded-3xl border border-zinc-300 bg-white shadow-none text-black hover:bg-stone-50">
            {content}
        </Button>
    );
}
