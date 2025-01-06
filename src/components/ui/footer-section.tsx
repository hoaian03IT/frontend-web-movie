"use client";

import { FaInstagram, FaTiktok, FaYoutube, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import qrDownload from "@/assets/images/qr-download-app-mobile.png";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AmazonLogo } from "./amazon-logo";

const links: Array<{ label: string; href: string; typeLink: "internal" | "external"; smallImage: string | null }> = [
    {
        label: "Help",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "Site Index",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "IMDbPro",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "Box Office Mojo",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "License IMDb Data",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "Press Room",
        href: "/",
        typeLink: "internal",
        smallImage: null,
    },
    {
        label: "Advertising",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "Jobs",
        href: "/",
        typeLink: "external",
        smallImage: null,
    },
    {
        label: "Conditions of Use",
        href: "/",
        typeLink: "internal",
        smallImage: null,
    },
    {
        label: "Privacy Policy",
        href: "/",
        typeLink: "internal",
        smallImage: null,
    },
    {
        label: "Your Ads Privacy Choices",
        href: "/",
        typeLink: "internal",
        smallImage: null,
    },
];

export function FooterSection({}) {
    return (
        <div className="text-white">
            <div className="pt-12 pb-8 px-10 mx-auto max-w-screen-lg">
                <div className="px-10 grid grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col items-center border-2 border-zinc-800 rounded-md px-8 py-2">
                        <p className="text-xl font-semibold">Follow IMDb on social</p>
                        <div className="flex items-center justify-center flex-wrap gap-4">
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                className="p-4 rounded-full hover:bg-zinc-900 active:bg-zinc-700 transition-all">
                                <FaTiktok className="size-5" />
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                className="p-4 rounded-full hover:bg-zinc-900 active:bg-zinc-700 transition-all">
                                <FaInstagram className="size-6" />
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                className="p-4 rounded-full hover:bg-zinc-900 active:bg-zinc-700 transition-all">
                                <FaXTwitter className="size-6" />
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                className="p-4 rounded-full hover:bg-zinc-900 active:bg-zinc-700 transition-all">
                                <FaYoutube className="size-6" />
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                className="p-4 rounded-full hover:bg-zinc-900 active:bg-zinc-700 transition-all">
                                <FaFacebookSquare className="size-6" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-between border-2 border-zinc-800 rounded-md px-8 py-2">
                        <div className="space-y-2">
                            <p className="text-xl font-semibold">Get the IMDb app</p>
                            <p className="text-zinc-300">For Android and iOS</p>
                        </div>
                        <a
                            href="https://slyb.app.link/Aa96cLcBeAb"
                            target="_blank"
                            className="active:opacity-80 transition-all">
                            <Image
                                loading="eager"
                                src={qrDownload}
                                alt="QR download app"
                                className="size-16 rounded-sm"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-5 mx-auto max-w-screen-lg flex items-center justify-center flex-wrap gap-6">
                {links.map((link, index) =>
                    link.typeLink === "external" ? (
                        <a
                            key={index}
                            href={link.href}
                            className="text-zinc-300 flex items-center gap-1 hover:underline hover:text-white">
                            {link.label}
                            <ExternalLink className="size-3" />
                        </a>
                    ) : (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-zinc-300 flex items-center gap-1 hover:underline hover:text-white">
                            {link.label}
                        </Link>
                    )
                )}
            </div>
            <div className="flex justify-center mt-10 mb-6">
                <AmazonLogo />
            </div>
            <div className="flex justify-center py-2">
                <p className="text-sm text-zinc-300">© 1990-2025 by IMDb.com, Inc.</p>
            </div>
        </div>
    );
}
