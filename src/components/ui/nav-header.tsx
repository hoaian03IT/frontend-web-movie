"use client";
import React, { useId } from "react";
import { ButtonMenu } from "./button-menu";
import { ButtonHome } from "./button-home";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookmarkPlus, Building2, Film, Monitor, Search, Tag, UsersRound } from "lucide-react";
import { ButtonPremium } from "./button-premium";
import Link from "next/link";
import { Separator } from "./separator";

const searchCategories: Array<{
    label: string;
    value: string;
    icon: React.ReactNode;
}> = [
    {
        label: "All",
        value: "all",
        icon: <Search />,
    },
    {
        label: "Titles",
        value: "titles",
        icon: <Film />,
    },
    {
        label: "TV Episodes",
        value: "tv-episodes",
        icon: <Monitor />,
    },
    {
        label: "Celebs",
        value: "celebs",
        icon: <UsersRound />,
    },
    {
        label: "Companies",
        value: "companies",
        icon: <Building2 />,
    },
    {
        label: "Keywords",
        value: "keywords",
        icon: <Tag />,
    },
];

export function NavHeader() {
    const [selectedCategory, setSelectedCategory] = React.useState<string>(searchCategories[0].value);

    const inputId = useId();

    return (
        <nav className="mx-auto max-w-screen-xl flex items-center px-3 py-2 gap-2">
            <ButtonHome size="lg" />
            <ButtonMenu />
            <div className="flex-1 flex items-center bg-white rounded-sm">
                <div>
                    <Select onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    searchCategories.find((category) => category.value === selectedCategory)?.label
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 dark">
                            <SelectGroup defaultValue={selectedCategory}>
                                {searchCategories.map((category) => (
                                    <SelectItem
                                        key={category.value}
                                        value={category.value}
                                        className="flex items-center cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            {category.icon}
                                            {category.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Input id={inputId} className="flex-1 bg-white rounded-none border-t-0 border-b-0 border-zinc-300" />
                <label htmlFor={inputId} className="p-2">
                    <Search className="size-5" />
                </label>
            </div>
            <ButtonPremium />
            <Separator orientation="vertical" className="h-6 bg-zinc-600 w-[2px]" />
            <Link
                href="/watch-list"
                className="flex items-center bg-transparent text-white text-sm font-semibold hover:bg-zinc-900 h-9 px-4 py-2 rounded-sm">
                <BookmarkPlus />
                Watchlist
            </Link>
            <Link
                href="/sign-in"
                className="flex items-center bg-transparent text-white text-sm font-semibold hover:bg-zinc-900 h-9 px-4 py-2 rounded-sm">
                Sign In
            </Link>
        </nav>
    );
}
