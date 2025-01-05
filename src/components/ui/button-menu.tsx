import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Film, Monitor } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { ButtonHome } from "./button-home";
import Link from "next/link";

const categories = [
    {
        label: "Movies",
        icon: <Film className="text-yellow-500" />,
        children: [
            { href: "/", label: "Release Calender" },
            { href: "/", label: "Top 250 Movies" },
            { href: "/", label: "Most Popular Movies" },
            { href: "/", label: "Browse Movies by Genre" },
            { href: "/", label: "Top Box Office" },
        ],
    },
    {
        label: "TV Shows",
        icon: <Monitor className="text-yellow-500" />,
        children: [
            { href: "/", label: "What's on TV & Streaming" },
            { href: "/", label: "Top 250 TV Shows" },
            { href: "/", label: "Most Popular TV Shows" },
            { href: "/", label: "Browse TV Shows by Genre" },
        ],
    },
    {
        label: "Celebs",
        icon: <Monitor className="text-yellow-500" />,
        children: [
            { href: "/", label: "Born Today" },
            { href: "/", label: "Most popular Celebs" },
            { href: "/", label: "Celebrity News" },
        ],
    },
];

export function ButtonMenu() {
    return (
        <Sheet defaultOpen={false}>
            <SheetTrigger asChild>
                <Button className="bg-transparent">
                    <AlignJustify />
                    <span className="font-semibold">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="top" aria-describedby="menu" className="dark bg-zinc-800">
                <div className="max-w-screen-xl mx-auto px-3">
                    <SheetHeader>
                        <div className="flex justify-between items-center">
                            <SheetTitle>
                                <ButtonHome size="xl" />
                            </SheetTitle>
                            <SheetClose className="bg-yellow-500 rounded-full p-3">
                                <IoMdClose className="size-6" />
                            </SheetClose>
                        </div>
                    </SheetHeader>
                    {/* Empty sheet description for clearing warns */}
                    <SheetDescription></SheetDescription>
                    <div className="mt-20 flex justify-between">
                        {categories.map((category, index) => (
                            <div key={index}>
                                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                                    {category.icon}
                                    {category.label}
                                </h3>
                                <ul className="ml-8">
                                    {category.children.map((child, index) => (
                                        <li key={index} className="py-2 text-gray-200 hover:text-white">
                                            <Link href={child.href}>{child.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
