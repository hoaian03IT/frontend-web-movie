import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import clsx from "clsx";
import { oswald } from "../fonts";
import imdbproBanner from "@/assets/images/imdbpro_navbar_Q1_2024.png";
import Image from "next/image";
import Link from "next/link";

export function ButtonPremium() {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className={clsx("bg-transparent gap-0 text-base", oswald.className)}>
                        IMDb<strong className="text-sky-400">Pro</strong>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="relative p-0 rounded-none" side="bottom" align="end">
                    <Image loading="eager" className="w-[580px]" src={imdbproBanner} alt="IMDbPro" />
                    <Link
                        href="/purchase-pro"
                        className="py-1 px-10 absolute bottom-[32px] left-[154px] bg-yellow-400 text-black hover:bg-yellow-300 rounded-2xl">
                        Try IMDbPro for FREE
                    </Link>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
