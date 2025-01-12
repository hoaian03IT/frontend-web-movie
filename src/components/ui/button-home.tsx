import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { oswald } from "../fonts";

export function ButtonHome({ size = "md" }: { size: "sm" | "md" | "lg" | "xl" }) {
    return (
        <Button
            type="button"
            className={clsx(
                "text-black bg-yellow-500 hover:bg-yellow-500 rounded-sm",
                size === "sm"
                    ? "text-sm"
                    : size === "md"
                    ? "text-base"
                    : size === "lg"
                    ? "text-lg font-semibold"
                    : size === "xl"
                    ? "text-4xl h-max font-bold"
                    : ""
            )}>
            <Link href="/" className={oswald.className}>
                IMDb
            </Link>
        </Button>
    );
}
