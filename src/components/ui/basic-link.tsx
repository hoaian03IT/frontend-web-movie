import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export function BasicLink({ children, className, ...props }: { children: ReactNode; className?: string } & LinkProps) {
    return (
        <Link {...props} className={clsx("text-cyan-700 hover:underline hover:text-orange-700", className)}>
            {children}
        </Link>
    );
}
