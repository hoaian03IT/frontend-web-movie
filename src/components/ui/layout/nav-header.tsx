import { ButtonMenu } from "@/components/ui/button-menu";
import { ButtonHome } from "@/components/ui/button-home";
import { BookmarkPlus } from "lucide-react";
import { ButtonPremium } from "@/components/ui/button-premium";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SearchComponent } from "../search";
import { SignInNav } from "../sign-in-nav";

export function NavHeader() {
    return (
        <nav className="mx-auto max-w-screen-xl flex items-center px-3 py-2 gap-2">
            <ButtonHome size="lg" />
            <ButtonMenu />
            <SearchComponent />
            <ButtonPremium />
            <Separator orientation="vertical" className="h-6 bg-zinc-600 w-[2px]" />
            <Link
                href="/watch-list"
                className="flex items-center gap-2 bg-transparent text-white text-sm font-semibold hover:bg-zinc-900 h-9 px-4 py-2 rounded-sm">
                <BookmarkPlus />
                Watchlist
            </Link>
            <SignInNav />
        </nav>
    );
}
